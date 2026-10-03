// app/api/departments/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { DepartmentValidation } from '@/lib/validations/payroll/globalMasters/department.validation'


const MODULE = 'payroll'
const PAGE = 'define-department'


// Fetch departments for the active session
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const departments = await prisma.department.findMany({
        where: { session: academic_year.id },
        orderBy: { department: 'asc' },
    })
    return NextResponse.json(departments)
}


// Create a department
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(DepartmentValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.department.findFirst({
        where: { session: academic_year.id, department: body.data.department },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Department already exists' }, { status: 409 })

    try {
        const department = await prisma.department.create({
            data: { department: body.data.department, session: academic_year.id },
        })
        return NextResponse.json(department, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
