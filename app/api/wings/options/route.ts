import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'


// Wings dropdown options (active session)
export async function GET() {

    const auth = await authenticate()
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const wings = await prisma.wing.findMany({
        where: { session: academic_year.id },
        select: { id: true, wing: true },
        orderBy: { wing: 'asc' },
    })
    return NextResponse.json(wings)
}