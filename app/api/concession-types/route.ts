// app/api/concession-types/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { ConcessionTypeValidation } from '@/lib/validations/fees/feeMaster/defineAndAssignConcession/concessionType.validation'


const MODULE = 'fees'
const PAGE = 'define-concession-type'


// Fetch concession types (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const concessionTypes = await prisma.concessionType.findMany({
        where: { session: academic_year.id },
        orderBy: { type: 'asc' },
    })
    return NextResponse.json(concessionTypes)
}


// Create concession type
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(ConcessionTypeValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.concessionType.findFirst({
        where: { session: academic_year.id, type: body.data.type },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Concession type already exists' }, { status: 409 })

    try {
        const concessionType = await prisma.concessionType.create({
            data: { type: body.data.type, session: academic_year.id },
        })
        return NextResponse.json(concessionType, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
