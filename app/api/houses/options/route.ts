// app/api/houses/options/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'


// House dropdown options (active session)
export async function GET() {
    const auth = await authenticate()
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const houses = await prisma.house.findMany({
        where: { session: academic_year.id },
        select: { id: true, house_name: true },
        orderBy: { house_name: 'asc' },
    })
    return NextResponse.json(houses)
}
