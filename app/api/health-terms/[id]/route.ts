// app/api/health-terms/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { TermValidation } from '@/lib/validations/admission/globalMasters/studentHealthMaster/term.validation'


const MODULE = 'admission'
const PAGE = 'define-term'


type Context = { params: Promise<{ id: string }> }


// Update health term
export async function PATCH(request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await parseBody(TermValidation, request)
    if ('response' in body) return body.response

    const current = await prisma.term.findUnique({
        where: { id },
        select: { session: true },
    })
    if (!current) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    const duplicate = await prisma.term.findFirst({
        where: { session: current.session, term_name: body.data.term_name, id: { not: id } },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Term already exists' }, { status: 409 })

    try {
        const term = await prisma.term.update({ where: { id }, data: body.data })
        return NextResponse.json(term)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete health term
export async function DELETE(_request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    try {
        await prisma.term.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        if ((error as { code?: string })?.code === 'P2003') {
            return NextResponse.json({ error: 'Cannot delete: records still reference this term' }, { status: 409 })
        }
        return handleApiError(error)
    }
}
