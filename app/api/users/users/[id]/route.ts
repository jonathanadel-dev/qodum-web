import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/lib/api/common/handle-error'
import { UpdateUserApiSchema } from '@/lib/validations/users/manageUsers/user.api.validation'


const MODULE = 'users'
const PAGE = 'create-user'


// Param type
type Context = { params: Promise<{ id: string }> }

const parseId = (raw: string) => {
    const id = Number(raw)
    return Number.isInteger(id) ? id : null
}

// A non-admin must never modify or delete an admin account
async function checkTarget(id: number, callerIsAdmin: boolean | null) {
    const target = await prisma.user.findUnique({ where: { id }, select: { is_admin: true } })
    if (!target) return NextResponse.json({ error: 'Record not found' }, { status: 404 })
    if (target.is_admin && !callerIsAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    return null
}


// Update user
export async function PATCH(request: NextRequest, { params }: Context) {

    // Auth check
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response


    // ID check
    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })


    // Data validation
    const parsed = UpdateUserApiSchema.safeParse(await request.json().catch(() => null))
    if (!parsed.success) {
        return NextResponse.json(
            { error: 'Invalid data', details: parsed.error.flatten().fieldErrors },
            { status: 400 }
        )
    }


    // Is user changing an admin's data?
    const blocked = await checkTarget(id, auth.user.is_admin)
    if (blocked) return blocked


    // Updating user
    const { password, schools, ...data } = parsed.data
    try {
        const user = await prisma.user.update({
            where: { id },
            data: {
                ...data,
                ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
                ...(schools ? { schools: { set: schools.map((schoolId) => ({ id: schoolId })) } } : {}),
            },
            omit: { password: true },
        })
        return NextResponse.json(user)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete user
export async function DELETE(_request: NextRequest, { params }: Context) {

    // Auth check
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response


    // ID check
    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    if (id === auth.user.id) {
        return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 })
    }


    // Is user changing an admin's data?
    const blocked = await checkTarget(id, auth.user.is_admin)
    if (blocked) return blocked


    // Deleting the user
    try {
        await prisma.user.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        return handleApiError(error)
    }
}