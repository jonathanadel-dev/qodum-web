// app/api/castes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { CasteValidation } from '@/lib/validations/admission/globalMasters/caste.validation'


const MODULE = 'admission'
const PAGE = 'define-caste'


// Fetch castes (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const castes = await prisma.caste.findMany({
        where: { session: academic_year.id },
        orderBy: { caste_name: 'asc' },
    })
    return NextResponse.json(castes)
}


// Create caste
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(CasteValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.caste.findFirst({
        where: { session: academic_year.id, caste_name: body.data.caste_name },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Caste name already exists' }, { status: 409 })

    try {
        const caste = await prisma.caste.create({
            data: { caste_name: body.data.caste_name, session: academic_year.id },
        })
        return NextResponse.json(caste, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
