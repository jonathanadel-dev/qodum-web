import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { WingValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/wing.validation'


const MODULE = 'fees'
const PAGE = 'define-wing'


type Context = { params: Promise<{ id: string }> }


// Update wing
export async function PATCH(request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await parseBody(WingValidation, request)
    if ('response' in body) return body.response

    const current = await prisma.wing.findUnique({
        where: { id },
        select: { session: true },
    })
    if (!current) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    const duplicate = await prisma.wing.findFirst({
        where: { session: current.session, wing: body.data.wing, id: { not: id } },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Wing already exists' }, { status: 409 })

    try {
        const wing = await prisma.wing.update({ where: { id }, data: body.data })
        return NextResponse.json(wing)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete wing
export async function DELETE(_request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    try {
        await prisma.wing.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        if ((error as { code?: string })?.code === 'P2003') {
            return NextResponse.json({ error: 'Cannot delete: classes still belong to this wing' }, { status: 409 })
        }
        return handleApiError(error)
    }
}
