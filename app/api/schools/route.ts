import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'


const MODULE = 'fees'
const PAGE = 'school-global-details'


// Fetch schools
export async function GET() {

    // Authorization check
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response


    // Schools
    const schools = await prisma.school.findMany({})
    return NextResponse.json(schools);
}