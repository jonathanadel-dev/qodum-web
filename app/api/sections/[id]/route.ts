import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { SectionValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/section.validation'


const MODULE = 'fees'
const PAGE = 'define-section'


// Param type
type Context = { params: Promise<{ id: string }> }


// Update section
export async function PATCH(request: NextRequest, { params }: Context) {

    // Auth check
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response


    // ID check
    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })


    // Data validation
    const body = await parseBody(SectionValidation, request)
    if ('response' in body) return body.response


    // Current record
    const current = await prisma.section.findUnique({ where: { id }, select: { session: true } })
    if (!current) return NextResponse.json({ error: 'Record not found' }, { status: 404 })


    // Section name must be unique within the session
    const duplicate = await prisma.section.findFirst({
        where: { session: current.session, section_name: body.data.section_name, id: { not: id } },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Section name already exists' }, { status: 409 })


    // Updating section
    try {
        const section = await prisma.section.update({ where: { id }, data: body.data })
        return NextResponse.json(section)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete section
export async function DELETE(_request: NextRequest, { params }: Context) {

    // Auth check
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response


    // ID check
    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })


    // Deleting the section (its links to classes go with it)
    try {
        await prisma.section.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        return handleApiError(error)
    }
}