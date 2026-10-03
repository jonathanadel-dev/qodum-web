// app/api/clubs/options/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'


// Club dropdown options (active session)
export async function GET() {
    const auth = await authenticate()
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const clubs = await prisma.club.findMany({
        where: { session: academic_year.id },
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
    })
    return NextResponse.json(clubs)
}
