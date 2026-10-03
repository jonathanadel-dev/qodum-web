import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { SchoolValidation } from '@/lib/validations/fees/globalMasters/defineSchool/schoolGlobalDetails.validation'


const MODULE = 'fees'
const PAGE = 'school-global-details'


// Fetch schools
export async function GET() {

    // Authorization check
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response


    // Schools
    const schools = await prisma.school.findMany({ orderBy: { school_name: 'asc' } })
    return NextResponse.json(schools);
}


// Create school
export async function POST(request: NextRequest) {

    // Authorization check
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response


    // Data validation check
    const body = await parseBody(SchoolValidation, request)
    if ('response' in body) return body.response


    // Every school is created inside the active academic session
    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })


    // Adding school
    try {
        const school = await prisma.school.create({ data: { ...body.data, session: academic_year.id } })
        return NextResponse.json(school, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}