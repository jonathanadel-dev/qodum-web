// app/api/houses/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { HouseValidation } from '@/lib/validations/admission/globalMasters/house.validation'


const MODULE = 'admission'
const PAGE = 'define-house'


// Fetch houses (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const houses = await prisma.house.findMany({
        where: { session: academic_year.id },
        orderBy: { house_name: 'asc' },
    })
    return NextResponse.json(houses)
}


// Create house
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(HouseValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.house.findFirst({
        where: { session: academic_year.id, house_name: body.data.house_name },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'House already exists' }, { status: 409 })

    try {
        const house = await prisma.house.create({
            data: { house_name: body.data.house_name, session: academic_year.id },
        })
        return NextResponse.json(house, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
