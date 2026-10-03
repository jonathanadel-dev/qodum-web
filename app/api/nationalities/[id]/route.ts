// app/api/nationalities/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { NationalityValidation } from '@/lib/validations/admission/globalMasters/nationality.validation'


const MODULE = 'admission'
const PAGE = 'define-nationality'


type Context = { params: Promise<{ id: string }> }


// Update nationality
export async function PATCH(request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await parseBody(NationalityValidation, request)
    if ('response' in body) return body.response

    const current = await prisma.nationality.findUnique({
        where: { id },
        select: { session: true },
    })
    if (!current) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    const duplicate = await prisma.nationality.findFirst({
        where: { session: current.session, name: body.data.name, id: { not: id } },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Nationality already exists' }, { status: 409 })

    try {
        const nationality = await prisma.nationality.update({ where: { id }, data: body.data })
        return NextResponse.json(nationality)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete nationality
export async function DELETE(_request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    try {
        await prisma.nationality.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        if ((error as { code?: string })?.code === 'P2003') {
            return NextResponse.json({ error: 'Cannot delete: records still reference this nationality' }, { status: 409 })
        }
        return handleApiError(error)
    }
}
