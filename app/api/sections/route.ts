import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { SectionValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/section.validation'


const MODULE = 'fees'
const PAGE = 'define-section'


// Fetch sections (active session)
export async function GET() {

    // Authorization check
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response


    // Sections
    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const sections = await prisma.section.findMany({
        where: { session: academic_year.id },
        orderBy: { order_no: 'asc' },
    })
    return NextResponse.json(sections)
}


// Create section
export async function POST(request: NextRequest) {

    // Authorization check
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response


    // Data validation check
    const body = await parseBody(SectionValidation, request)
    if ('response' in body) return body.response


    // Every section is created inside the active academic session
    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })


    // Section name must be unique within the session
    const exists = await prisma.section.findFirst({
        where: { session: academic_year.id, section_name: body.data.section_name },
        select: { id: true },
    })
    if (exists) return NextResponse.json({ error: 'Section name already exists' }, { status: 409 })


    // Adding section
    try {
        const section = await prisma.section.create({ data: { ...body.data, session: academic_year.id } })
        return NextResponse.json(section, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}