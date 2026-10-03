// app/api/professions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { ProfessionValidation } from '@/lib/validations/payroll/globalMasters/preofession.validation'


const MODULE = 'payroll'
const PAGE = 'define-profession'


// Fetch professions for the active session
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const professions = await prisma.profession.findMany({
        where: { session: academic_year.id },
        orderBy: { profession: 'asc' },
    })
    return NextResponse.json(professions)
}


// Create a profession
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(ProfessionValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.profession.findFirst({
        where: { session: academic_year.id, profession: body.data.profession },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Profession already exists' }, { status: 409 })

    try {
        const profession = await prisma.profession.create({
            data: { profession: body.data.profession, session: academic_year.id },
        })
        return NextResponse.json(profession, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
