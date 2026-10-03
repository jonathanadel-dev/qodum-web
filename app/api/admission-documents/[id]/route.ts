// app/api/admission-documents/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { DocumentCrudValidation } from '@/lib/validations/admission/globalMasters/document/documentCrud.validation'


const MODULE = 'admission'
const PAGE = 'define-document-type'


type Context = { params: Promise<{ id: string }> }


// Update document
export async function PATCH(request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await parseBody(DocumentCrudValidation, request)
    if ('response' in body) return body.response

    const current = await prisma.document.findUnique({
        where: { id },
        select: { session: true },
    })
    if (!current) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    const documentType = await prisma.documentType.findFirst({
        where: { id: body.data.document_type_id, session: current.session },
        select: { id: true },
    })
    if (!documentType) return NextResponse.json({ error: 'Select a valid document type for this session' }, { status: 400 })

    const duplicate = await prisma.document.findFirst({
        where: { session: current.session, document_name: body.data.document_name, id: { not: id } },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Document name already exists' }, { status: 409 })

    try {
        const document = await prisma.document.update({
            where: { id },
            data: {
                document_type: documentType.id,
                document_name: body.data.document_name,
            },
            include: { documenType: { select: { document_type: true } } },
        })
        return NextResponse.json({
            ...document,
            document_type_id: String(document.document_type),
            document_type_label: document.documenType.document_type,
        })
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete document
export async function DELETE(_request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    try {
        await prisma.document.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        if ((error as { code?: string })?.code === 'P2003') {
            return NextResponse.json({ error: 'Cannot delete: records still reference this document' }, { status: 409 })
        }
        return handleApiError(error)
    }
}
