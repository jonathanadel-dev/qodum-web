// app/api/streams/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { StreamValidation } from '@/lib/validations/admission/globalMasters/stream.validation'


const MODULE = 'admission'
const PAGE = 'define-stream'


// Fetch streams (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const streams = await prisma.stream.findMany({
        where: { session: academic_year.id },
        orderBy: { stream_name: 'asc' },
    })
    return NextResponse.json(streams)
}


// Create stream
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(StreamValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.stream.findFirst({
        where: { session: academic_year.id, stream_name: body.data.stream_name },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Stream already exists' }, { status: 409 })

    try {
        const stream = await prisma.stream.create({
            data: { stream_name: body.data.stream_name, session: academic_year.id },
        })
        return NextResponse.json(stream, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
