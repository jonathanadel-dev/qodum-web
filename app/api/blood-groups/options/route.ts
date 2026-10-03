// app/api/blood-groups/options/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'


// Blood group dropdown options (active session)
export async function GET() {
    const auth = await authenticate()
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const bloodGroups = await prisma.bloodGroup.findMany({
        where: { session: academic_year.id },
        select: { id: true, blood_group: true },
        orderBy: { blood_group: 'asc' },
    })
    return NextResponse.json(bloodGroups)
}
