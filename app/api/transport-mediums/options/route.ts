// app/api/transport-mediums/options/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'


// Fetch transport medium options for the active session
export async function GET() {
    const auth = await authenticate()
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const transportMediums = await prisma.transportMedium.findMany({
        where: { session: academic_year.id },
        select: { id: true, transport_medium: true },
        orderBy: { transport_medium: 'asc' },
    })
    return NextResponse.json(transportMediums)
}
