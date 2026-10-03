// app/api/clubs/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { ClubValidation } from '@/lib/validations/admission/globalMasters/club.validation'


const MODULE = 'admission'
const PAGE = 'define-club'


// Fetch clubs (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const clubs = await prisma.club.findMany({
        where: { session: academic_year.id },
        orderBy: { name: 'asc' },
    })
    return NextResponse.json(clubs)
}


// Create club
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(ClubValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.club.findFirst({
        where: { session: academic_year.id, name: body.data.name },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Club already exists' }, { status: 409 })

    try {
        const club = await prisma.club.create({
            data: { name: body.data.name, session: academic_year.id },
        })
        return NextResponse.json(club, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
