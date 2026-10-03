// app/api/streams/options/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'


// Stream dropdown options (active session)
export async function GET() {
    const auth = await authenticate()
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const streams = await prisma.stream.findMany({
        where: { session: academic_year.id },
        select: { id: true, stream_name: true },
        orderBy: { stream_name: 'asc' },
    })
    return NextResponse.json(streams)
}
