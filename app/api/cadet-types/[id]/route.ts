// app/api/cadet-types/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { CadetTypeValidation } from '@/lib/validations/admission/globalMasters/cadetType.validation'


const MODULE = 'admission'
const PAGE = 'define-cadet-type'


type Context = { params: Promise<{ id: string }> }


// Update cadet type
export async function PATCH(request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await parseBody(CadetTypeValidation, request)
    if ('response' in body) return body.response

    const current = await prisma.cadetType.findUnique({
        where: { id },
        select: { session: true },
    })
    if (!current) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    const duplicate = await prisma.cadetType.findFirst({
        where: { session: current.session, name: body.data.name, id: { not: id } },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Cadet type already exists' }, { status: 409 })

    try {
        const cadetType = await prisma.cadetType.update({ where: { id }, data: body.data })
        return NextResponse.json(cadetType)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete cadet type
export async function DELETE(_request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    try {
        await prisma.cadetType.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        if ((error as { code?: string })?.code === 'P2003') {
            return NextResponse.json({ error: 'Cannot delete: records still reference this cadet type' }, { status: 409 })
        }
        return handleApiError(error)
    }
}
