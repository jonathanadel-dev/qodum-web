// app/api/staff-document-types/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { StaffDocumentTypeValidation } from '@/lib/validations/payroll/globalMasters/document/staffDocumentType.validation'


const MODULE = 'payroll'
const PAGE = 'define-document-type'


type Context = { params: Promise<{ id: string }> }


// Update a staff document type
export async function PATCH(request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await parseBody(StaffDocumentTypeValidation, request)
    if ('response' in body) return body.response

    const current = await prisma.staffDocumentType.findUnique({
        where: { id },
        select: { session: true },
    })
    if (!current) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    const duplicate = await prisma.staffDocumentType.findFirst({
        where: {
            session: current.session,
            document_type: body.data.document_type,
            id: { not: id },
        },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Document type already exists' }, { status: 409 })

    try {
        const documentType = await prisma.staffDocumentType.update({
            where: { id },
            data: body.data,
        })
        return NextResponse.json(documentType)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete a staff document type
export async function DELETE(_request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    try {
        await prisma.staffDocumentType.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        if ((error as { code?: string })?.code === 'P2003') {
            return NextResponse.json({ error: 'Cannot delete: staff documents still reference this document type' }, { status: 409 })
        }
        return handleApiError(error)
    }
}
