// app/api/concession-types/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { ConcessionTypeValidation } from '@/lib/validations/fees/feeMaster/defineAndAssignConcession/concessionType.validation'


const MODULE = 'fees'
const PAGE = 'define-concession-type'


type Context = { params: Promise<{ id: string }> }


// Update concession type
export async function PATCH(request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await parseBody(ConcessionTypeValidation, request)
    if ('response' in body) return body.response

    const current = await prisma.concessionType.findUnique({
        where: { id },
        select: { session: true },
    })
    if (!current) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    const duplicate = await prisma.concessionType.findFirst({
        where: { session: current.session, type: body.data.type, id: { not: id } },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Concession type already exists' }, { status: 409 })

    try {
        const concessionType = await prisma.concessionType.update({ where: { id }, data: body.data })
        return NextResponse.json(concessionType)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete concession type
export async function DELETE(_request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    try {
        await prisma.concessionType.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        if ((error as { code?: string })?.code === 'P2003') {
            return NextResponse.json({ error: 'Cannot delete: records still reference this concession type' }, { status: 409 })
        }
        return handleApiError(error)
    }
}
