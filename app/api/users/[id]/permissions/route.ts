// app/api/users/[id]/permissions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'


const MODULE = 'users'
const PAGE = 'user-permission'

type Context = { params: Promise<{ id: string }> }

type Flags = { add: boolean; modify: boolean; delete: boolean; print: boolean; read_only: boolean }

const UpdatePermissionsValidation = z.object({
    permissions: z.array(z.object({
        permission_item_id: z.number().int(),
        add: z.boolean(),
        modify: z.boolean(),
        delete: z.boolean(),
        print: z.boolean(),
        read_only: z.boolean(),
    })).max(2000),
})


// Admins have full access anyway, so their grants are never edited
async function checkTarget(id: number) {
    const target = await prisma.user.findUnique({ where: { id }, select: { is_admin: true } })
    if (!target) return NextResponse.json({ error: 'Record not found' }, { status: 404 })
    if (target.is_admin) return NextResponse.json({ error: 'Admin permissions cannot be edited' }, { status: 403 })
    return null
}

const activeSession = () =>
    prisma.academicYear.findFirst({ where: { is_active: true }, select: { id: true, year_name: true } })


// Fetch a user's permissions (every permission item, defaulting to false)
export async function GET(_request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'read_only')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const session = await activeSession()
    if (!session) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const [items, grants] = await Promise.all([
        prisma.permissionItem.findMany({ orderBy: { id: 'asc' } }),
        prisma.userPermission.findMany({ where: { user_id: id, session: session.id } }),
    ])
    const byItem = new Map(grants.map((g) => [g.permission_item_id, g]))

    return NextResponse.json({
        session,
        permissions: items.map((item) => {
            const g = byItem.get(item.id)
            return {
                permission_item_id: item.id,
                module_name: item.module_name,
                page_name: item.page_name,
                add: g?.add ?? false,
                modify: g?.modify ?? false,
                delete: g?.delete ?? false,
                print: g?.print ?? false,
                read_only: g?.read_only ?? false,
            }
        }),
    })
}


// Save a user's permissions (only the rows sent)
export async function PUT(request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    if (id === auth.user.id) {
        return NextResponse.json({ error: 'You cannot change your own permissions' }, { status: 403 })
    }

    const body = await parseBody(UpdatePermissionsValidation, request)
    if ('response' in body) return body.response

    const blocked = await checkTarget(id)
    if (blocked) return blocked

    const session = await activeSession()
    if (!session) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })


    // One entry per permission item (last one wins), then group items that share the same flags
    const byItem = new Map<number, Flags>()
    for (const permission of body.data.permissions) {
        const { permission_item_id, add, modify, delete: remove, print, read_only } = permission
        byItem.set(permission_item_id, {
            add: add ?? false,
            modify: modify ?? false,
            delete: remove ?? false,
            print: print ?? false,
            read_only: read_only ?? false,
        })
    }

    const groups = new Map<string, { flags: Flags; ids: number[] }>()
    byItem.forEach((flags, itemId) => {
        const key = [flags.add, flags.modify, flags.delete, flags.print, flags.read_only].map(Number).join('')
        const group = groups.get(key) ?? { flags, ids: [] }
        group.ids.push(itemId)
        groups.set(key, group)
    })

    try {
        await prisma.$transaction(async (tx) => {

            // Insert the rows that don't exist yet
            const createData: Array<Flags & { user_id: number; permission_item_id: number; session: number }> = []
            byItem.forEach((flags, permission_item_id) => {
                createData.push({ ...flags, user_id: id, permission_item_id, session: session.id })
            })
            await tx.userPermission.createMany({
                data: createData,
                skipDuplicates: true,
            })

            // Update by flag combination (also touches the rows just created, with the same values)
            const groupedPermissions: Array<{ flags: Flags; ids: number[] }> = []
            groups.forEach((group) => groupedPermissions.push(group))
            for (const { flags, ids } of groupedPermissions) {
                await tx.userPermission.updateMany({
                    where: { user_id: id, session: session.id, permission_item_id: { in: ids } },
                    data: flags,
                })
            }

        }, { timeout: 20000, maxWait: 10000 })

        return NextResponse.json({ id })
    } catch (error) {
        return handleApiError(error)
    }
}