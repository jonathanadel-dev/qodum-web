// app/api/religions/options/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'


// Religion dropdown options (active session)
export async function GET() {
    const auth = await authenticate()
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const religions = await prisma.religion.findMany({
        where: { session: academic_year.id },
        select: { id: true, religion_name: true },
        orderBy: { religion_name: 'asc' },
    })
    return NextResponse.json(religions)
}
