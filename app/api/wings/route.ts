// app/api/wings/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { WingValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/wing.validation'


const MODULE = 'fees'
const PAGE = 'define-wing'


// Fetch wings (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const wings = await prisma.wing.findMany({
        where: { session: academic_year.id },
        orderBy: { wing: 'asc' },
    })
    return NextResponse.json(wings)
}


// Create wing
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(WingValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const exists = await prisma.wing.findFirst({
        where: { session: academic_year.id, wing: body.data.wing },
        select: { id: true },
    })
    if (exists) return NextResponse.json({ error: 'Wing already exists' }, { status: 409 })

    try {
        const wing = await prisma.wing.create({
            data: { wing: body.data.wing, session: academic_year.id },
        })
        return NextResponse.json(wing, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}