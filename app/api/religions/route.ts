// app/api/religions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { ReligionValidation } from '@/lib/validations/admission/globalMasters/religion.validation'


const MODULE = 'admission'
const PAGE = 'define-religion'


// Fetch religions (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const religions = await prisma.religion.findMany({
        where: { session: academic_year.id },
        orderBy: { religion_name: 'asc' },
    })
    return NextResponse.json(religions)
}


// Create religion
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(ReligionValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.religion.findFirst({
        where: { session: academic_year.id, religion_name: body.data.religion_name },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Religion already exists' }, { status: 409 })

    try {
        const religion = await prisma.religion.create({
            data: { religion_name: body.data.religion_name, session: academic_year.id },
        })
        return NextResponse.json(religion, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
