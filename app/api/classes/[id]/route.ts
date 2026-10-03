import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { ClassValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/class.validation'


const MODULE = 'fees'
const PAGE = 'define-class'


// Param type
type Context = { params: Promise<{ id: string }> }


// Update class
export async function PATCH(request: NextRequest, { params }: Context) {

    // Auth check
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response


    // ID check
    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })


    // Data validation
    const body = await parseBody(ClassValidation, request)
    if ('response' in body) return body.response
    const { class_name, order, wing_id, school_id } = body.data
    const wingId = Number(wing_id)
    const schoolId = Number(school_id)


    // Current record
    const current = await prisma.class.findUnique({
        where: { id },
        select: { session: true, order: true, wing_id: true, school_id: true },
    })
    if (!current) return NextResponse.json({ error: 'Record not found' }, { status: 404 })
    const { session } = current


    // Class name must be unique within the session
    const duplicate = await prisma.class.findFirst({ where: { session, class_name, id: { not: id } }, select: { id: true } })
    if (duplicate) return NextResponse.json({ error: 'Class name already exists' }, { status: 409 })


    // Updating class (moving the order shifts the classes in between)
    try {
        const updated = await prisma.$transaction(async (tx) => {
            if (order > current.order) {
                await tx.class.updateMany({
                    where: { session, order: { gt: current.order, lte: order } },
                    data: { order: { decrement: 1 } },
                })
            } else if (order < current.order) {
                await tx.class.updateMany({
                    where: { session, order: { gte: order, lt: current.order } },
                    data: { order: { increment: 1 } },
                })
            }

            // Fee heads depend on the wing and school, so they are reset only when one of them changes
            const affiliationChanged = wingId !== current.wing_id || schoolId !== current.school_id
            return tx.class.update({
                where: { id },
                data: {
                    class_name,
                    order,
                    wing_id: wingId,
                    school_id: schoolId,
                    ...(affiliationChanged ? { affiliated_heads: { group_name: '', heads: [] } } : {}),
                },
            })
        })
        return NextResponse.json(updated)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete class
export async function DELETE(_request: NextRequest, { params }: Context) {

    // Auth check
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response


    // ID check
    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const target = await prisma.class.findUnique({ where: { id }, select: { session: true, order: true } })
    if (!target) return NextResponse.json({ error: 'Record not found' }, { status: 404 })


    // Deleting the class (the classes after it move up one place)
    try {
        await prisma.$transaction(async (tx) => {
            await tx.class.delete({ where: { id } })
            await tx.class.updateMany({
                where: { session: target.session, order: { gt: target.order } },
                data: { order: { decrement: 1 } },
            })
        })
        return NextResponse.json({ id })
    } catch (error) {
        // Admissions, slots, prospectuses or enquiries still belong to this class
        if ((error as { code?: string })?.code === 'P2003') {
            return NextResponse.json({ error: 'Cannot delete: records exist for this class' }, { status: 409 })
        }
        return handleApiError(error)
    }
}