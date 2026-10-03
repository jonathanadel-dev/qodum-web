// app/api/cadet-types/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { CadetTypeValidation } from '@/lib/validations/admission/globalMasters/cadetType.validation'


const MODULE = 'admission'
const PAGE = 'define-cadet-type'


// Fetch cadet types (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const cadetTypes = await prisma.cadetType.findMany({
        where: { session: academic_year.id },
        orderBy: { name: 'asc' },
    })
    return NextResponse.json(cadetTypes)
}


// Create cadet type
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(CadetTypeValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.cadetType.findFirst({
        where: { session: academic_year.id, name: body.data.name },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Cadet type already exists' }, { status: 409 })

    try {
        const cadetType = await prisma.cadetType.create({
            data: { name: body.data.name, session: academic_year.id },
        })
        return NextResponse.json(cadetType, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
