// app/api/transport-mediums/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { TransportMediumValidation } from '@/lib/validations/fees/transport/transportlMedium.validation'


const MODULE = 'fees'
const PAGE = 'define-transport-medium'


// Fetch transport mediums for the active session
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const transportMediums = await prisma.transportMedium.findMany({
        where: { session: academic_year.id },
        orderBy: { transport_medium: 'asc' },
    })
    return NextResponse.json(transportMediums)
}


// Create a transport medium
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(TransportMediumValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.transportMedium.findFirst({
        where: { session: academic_year.id, transport_medium: body.data.transport_medium },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Transport medium already exists' }, { status: 409 })

    try {
        const transportMedium = await prisma.transportMedium.create({
            data: { transport_medium: body.data.transport_medium, session: academic_year.id },
        })
        return NextResponse.json(transportMedium, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
