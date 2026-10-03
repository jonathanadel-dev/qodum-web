import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { SchoolValidation } from '@/lib/validations/fees/globalMasters/defineSchool/schoolGlobalDetails.validation'


const MODULE = 'fees'
const PAGE = 'school-global-details'


// Param type
type Context = { params: Promise<{ id: string }> }


// Update school
export async function PATCH(request: NextRequest, { params }: Context) {

    // Auth check
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response


    // ID check
    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })


    // Data validation
    const body = await parseBody(SchoolValidation.partial(), request)
    if ('response' in body) return body.response


    // Updating school
    try {
        const school = await prisma.school.update({ where: { id }, data: body.data })
        return NextResponse.json(school)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete school
export async function DELETE(_request: NextRequest, { params }: Context) {

    // Auth check
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response


    // ID check
    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })


    // Deleting the school
    try {
        await prisma.school.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        // Classes, admission settings or stationary details still belong to this school
        if ((error as { code?: string })?.code === 'P2003') {
            return NextResponse.json({ error: 'Cannot delete: records exist for this school' }, { status: 409 })
        }
        return handleApiError(error)
    }
}