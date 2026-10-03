// app/api/departments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { DepartmentValidation } from '@/lib/validations/payroll/globalMasters/department.validation'


const MODULE = 'payroll'
const PAGE = 'define-department'


type Context = { params: Promise<{ id: string }> }


// Update a department
export async function PATCH(request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await parseBody(DepartmentValidation, request)
    if ('response' in body) return body.response

    const current = await prisma.department.findUnique({
        where: { id },
        select: { session: true },
    })
    if (!current) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    const duplicate = await prisma.department.findFirst({
        where: {
            session: current.session,
            department: body.data.department,
            id: { not: id },
        },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Department already exists' }, { status: 409 })

    try {
        const department = await prisma.department.update({
            where: { id },
            data: body.data,
        })
        return NextResponse.json(department)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete a department
export async function DELETE(_request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    try {
        await prisma.department.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        if ((error as { code?: string })?.code === 'P2003') {
            return NextResponse.json({ error: 'Cannot delete: records still reference this department' }, { status: 409 })
        }
        return handleApiError(error)
    }
}
