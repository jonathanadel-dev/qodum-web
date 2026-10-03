// app/api/blood-groups/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { BloodGroupValidation } from '@/lib/validations/admission/globalMasters/bloodGroup.validation'


const MODULE = 'admission'
const PAGE = 'define-blood-group'


// Fetch blood groups (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const bloodGroups = await prisma.bloodGroup.findMany({
        where: { session: academic_year.id },
        orderBy: { blood_group: 'asc' },
    })
    return NextResponse.json(bloodGroups)
}


// Create blood group
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(BloodGroupValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.bloodGroup.findFirst({
        where: { session: academic_year.id, blood_group: body.data.blood_group },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Blood group already exists' }, { status: 409 })

    try {
        const bloodGroup = await prisma.bloodGroup.create({
            data: { blood_group: body.data.blood_group, session: academic_year.id },
        })
        return NextResponse.json(bloodGroup, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
