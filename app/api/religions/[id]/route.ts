// app/api/religions/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { ReligionValidation } from '@/lib/validations/admission/globalMasters/religion.validation'


const MODULE = 'admission'
const PAGE = 'define-religion'


type Context = { params: Promise<{ id: string }> }


// Update religion
export async function PATCH(request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await parseBody(ReligionValidation, request)
    if ('response' in body) return body.response

    const current = await prisma.religion.findUnique({
        where: { id },
        select: { session: true },
    })
    if (!current) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    const duplicate = await prisma.religion.findFirst({
        where: { session: current.session, religion_name: body.data.religion_name, id: { not: id } },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Religion already exists' }, { status: 409 })

    try {
        const religion = await prisma.religion.update({ where: { id }, data: body.data })
        return NextResponse.json(religion)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete religion
export async function DELETE(_request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    try {
        await prisma.religion.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        if ((error as { code?: string })?.code === 'P2003') {
            return NextResponse.json({ error: 'Cannot delete: records still reference this religion' }, { status: 409 })
        }
        return handleApiError(error)
    }
}
