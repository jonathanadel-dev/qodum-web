// app/api/admission-documents/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { DocumentCrudValidation } from '@/lib/validations/admission/globalMasters/document/documentCrud.validation'


const MODULE = 'admission'
const PAGE = 'define-document-type'


// Fetch documents and their type labels (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const documents = await prisma.document.findMany({
        where: { session: academic_year.id },
        include: { documenType: { select: { document_type: true } } },
        orderBy: { document_name: 'asc' },
    })
    return NextResponse.json(documents.map(({ documenType, ...document }) => ({
        ...document,
        document_type_id: String(document.document_type),
        document_type_label: documenType.document_type,
    })))
}


// Create document
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(DocumentCrudValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const documentType = await prisma.documentType.findFirst({
        where: { id: body.data.document_type_id, session: academic_year.id },
        select: { id: true },
    })
    if (!documentType) return NextResponse.json({ error: 'Select a valid document type for the active session' }, { status: 400 })

    const duplicate = await prisma.document.findFirst({
        where: { session: academic_year.id, document_name: body.data.document_name },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Document name already exists' }, { status: 409 })

    try {
        const document = await prisma.document.create({
            data: {
                session: academic_year.id,
                document_type: documentType.id,
                document_name: body.data.document_name,
            },
            include: { documenType: { select: { document_type: true } } },
        })
        return NextResponse.json({
            ...document,
            document_type_id: String(document.document_type),
            document_type_label: document.documenType.document_type,
        }, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
