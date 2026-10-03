// app/api/nationalities/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { NationalityValidation } from '@/lib/validations/admission/globalMasters/nationality.validation'


const MODULE = 'admission'
const PAGE = 'define-nationality'


// Fetch nationalities (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const nationalities = await prisma.nationality.findMany({
        where: { session: academic_year.id },
        orderBy: { name: 'asc' },
    })
    return NextResponse.json(nationalities)
}


// Create nationality
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(NationalityValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.nationality.findFirst({
        where: { session: academic_year.id, name: body.data.name },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Nationality already exists' }, { status: 409 })

    try {
        const nationality = await prisma.nationality.create({
            data: { name: body.data.name, session: academic_year.id },
        })
        return NextResponse.json(nationality, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
