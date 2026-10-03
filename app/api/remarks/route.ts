// app/api/remarks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { RemarkValidation } from '@/lib/validations/admission/globalMasters/remark.validation'


const MODULE = 'admission'
const PAGE = 'define-remark'


// Fetch remarks (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const remarks = await prisma.remark.findMany({
        where: { session: academic_year.id },
        orderBy: { remark: 'asc' },
    })
    return NextResponse.json(remarks)
}


// Create remark
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(RemarkValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.remark.findFirst({
        where: { session: academic_year.id, remark: body.data.remark },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Remark already exists' }, { status: 409 })

    try {
        const remark = await prisma.remark.create({
            data: { remark: body.data.remark, session: academic_year.id },
        })
        return NextResponse.json(remark, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
