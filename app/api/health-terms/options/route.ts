// app/api/health-terms/options/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'


// Health term dropdown options (active session)
export async function GET() {
    const auth = await authenticate()
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const terms = await prisma.term.findMany({
        where: { session: academic_year.id },
        select: { id: true, term_name: true },
        orderBy: { term_name: 'asc' },
    })
    return NextResponse.json(terms)
}
