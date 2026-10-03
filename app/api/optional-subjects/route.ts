// app/api/optional-subjects/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { OptionalSubjectValidation } from '@/lib/validations/admission/globalMasters/optionalSubject.validation'


const MODULE = 'admission'
const PAGE = 'define-optional-subject'


// Fetch optional subjects (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const subjects = await prisma.optionalSubject.findMany({
        where: { session: academic_year.id },
        orderBy: { subject_name: 'asc' },
    })
    return NextResponse.json(subjects)
}


// Create optional subject
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(OptionalSubjectValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.optionalSubject.findFirst({
        where: { session: academic_year.id, subject_name: body.data.subject_name },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Optional subject already exists' }, { status: 409 })

    try {
        const subject = await prisma.optionalSubject.create({
            data: { subject_name: body.data.subject_name, session: academic_year.id },
        })
        return NextResponse.json(subject, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
