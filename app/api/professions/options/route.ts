// app/api/professions/options/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'


// Fetch profession options for the active session
export async function GET() {
    const auth = await authenticate()
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const professions = await prisma.profession.findMany({
        where: { session: academic_year.id },
        select: { id: true, profession: true },
        orderBy: { profession: 'asc' },
    })
    return NextResponse.json(professions)
}
