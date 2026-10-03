import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { ClassValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/class.validation'


const MODULE = 'fees'
const PAGE = 'define-class'


// Fetch classes (active session)
export async function GET() {

    // Authorization check
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response


    // Classes
    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const classes = await prisma.class.findMany({
        where: { session: academic_year.id },
        include: { wing: { select: { wing: true } }, school_ref: { select: { school_name: true } } },
        orderBy: { order: 'asc' },
    })
    return NextResponse.json(
        classes.map(({ wing, school_ref, ...c }) => ({ ...c, wing_label: wing.wing, school_label: school_ref.school_name }))
    )
}


// Create class
export async function POST(request: NextRequest) {

    // Authorization check
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response


    // Data validation check
    const body = await parseBody(ClassValidation, request)
    if ('response' in body) return body.response
    const { class_name, order, wing_id, school_id } = body.data


    // Every class is created inside the active academic session
    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })
    const session = academic_year.id


    // Class name must be unique within the session
    const exists = await prisma.class.findFirst({ where: { session, class_name }, select: { id: true } })
    if (exists) return NextResponse.json({ error: 'Class name already exists' }, { status: 409 })


    // Adding class (an taken order pushes the following classes down)
    try {
        const created = await prisma.$transaction(async (tx) => {
            const taken = await tx.class.findFirst({ where: { session, order }, select: { id: true } })
            if (taken) {
                await tx.class.updateMany({ where: { session, order: { gte: order } }, data: { order: { increment: 1 } } })
            }
            return tx.class.create({
                data: { class_name, order, wing_id: Number(wing_id), school_id: Number(school_id), session, is_admission_opened: true },
            })
        })
        return NextResponse.json(created, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}