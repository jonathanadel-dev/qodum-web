// app/api/narration-masters/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { NarrationMasterValidation } from '@/lib/validations/accounts/globalMasters/narrationMaster'


const MODULE = 'accounts'
const PAGE = 'define-narration-master'


// Fetch narration masters for the active academic session
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const narrations = await prisma.narrationMaster.findMany({
        where: { session: academic_year.id },
        orderBy: { narration: 'asc' },
    })
    return NextResponse.json(narrations)
}


// Create a narration master
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(NarrationMasterValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.narrationMaster.findFirst({
        where: { session: academic_year.id, narration: body.data.narration },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Narration already exists' }, { status: 409 })

    try {
        const narration = await prisma.narrationMaster.create({
            data: {
                narration: body.data.narration,
                voucher_type: body.data.voucher_type,
                session: academic_year.id,
            },
        })
        return NextResponse.json(narration, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
