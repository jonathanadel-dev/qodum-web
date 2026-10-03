// app/api/health-terms/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { TermValidation } from '@/lib/validations/admission/globalMasters/studentHealthMaster/term.validation'


const MODULE = 'admission'
const PAGE = 'define-term'


// Fetch health terms (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const terms = await prisma.term.findMany({
        where: { session: academic_year.id },
        orderBy: { term_name: 'asc' },
    })
    return NextResponse.json(terms)
}


// Create health term
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(TermValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.term.findFirst({
        where: { session: academic_year.id, term_name: body.data.term_name },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Term already exists' }, { status: 409 })

    try {
        const term = await prisma.term.create({
            data: { term_name: body.data.term_name, session: academic_year.id },
        })
        return NextResponse.json(term, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
