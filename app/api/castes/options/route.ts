// app/api/castes/options/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'


// Caste dropdown options (active session)
export async function GET() {
    const auth = await authenticate()
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const castes = await prisma.caste.findMany({
        where: { session: academic_year.id },
        select: { id: true, caste_name: true },
        orderBy: { caste_name: 'asc' },
    })
    return NextResponse.json(castes)
}
