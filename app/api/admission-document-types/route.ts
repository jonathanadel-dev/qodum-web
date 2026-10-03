// app/api/admission-document-types/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { DocumentTypeValidation } from '@/lib/validations/admission/globalMasters/document/documentType.validation'


const MODULE = 'admission'
const PAGE = 'define-document-type'


// Fetch document types (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const documentTypes = await prisma.documentType.findMany({
        where: { session: academic_year.id },
        orderBy: { document_type: 'asc' },
    })
    return NextResponse.json(documentTypes)
}


// Create document type
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(DocumentTypeValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.documentType.findFirst({
        where: { session: academic_year.id, document_type: body.data.document_type },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Document type already exists' }, { status: 409 })

    try {
        const documentType = await prisma.documentType.create({
            data: { document_type: body.data.document_type, session: academic_year.id },
        })
        return NextResponse.json(documentType, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
