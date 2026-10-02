import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth/authorize'


// Schools dropwown options
export async function GET() {

    const auth = await authenticate()
    if ('response' in auth) return auth.response

    const schools = await prisma.school.findMany({
        select: { id: true, school_name: true },
        orderBy: { school_name: 'asc' },
    })
    return NextResponse.json(schools)

}