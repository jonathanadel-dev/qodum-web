// app/api/vehicle-types/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { VehicleTypeValidation } from '@/lib/validations/fees/transport/vehicelType.validation'


const MODULE = 'fees'
const PAGE = 'define-vehicle-type'


type Context = { params: Promise<{ id: string }> }


// Update a vehicle type
export async function PATCH(request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'modify')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await parseBody(VehicleTypeValidation, request)
    if ('response' in body) return body.response

    const current = await prisma.vehicleType.findUnique({
        where: { id },
        select: { session: true },
    })
    if (!current) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    const duplicate = await prisma.vehicleType.findFirst({
        where: {
            session: current.session,
            vehicle_name: body.data.vehicle_name,
            id: { not: id },
        },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Vehicle type already exists' }, { status: 409 })

    try {
        const vehicleType = await prisma.vehicleType.update({
            where: { id },
            data: body.data,
        })
        return NextResponse.json(vehicleType)
    } catch (error) {
        return handleApiError(error)
    }
}


// Delete a vehicle type
export async function DELETE(_request: NextRequest, { params }: Context) {
    const auth = await authorize(MODULE, PAGE, 'delete')
    if ('response' in auth) return auth.response

    const id = parseId((await params).id)
    if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    try {
        await prisma.vehicleType.delete({ where: { id } })
        return NextResponse.json({ id })
    } catch (error) {
        if ((error as { code?: string })?.code === 'P2003') {
            return NextResponse.json({ error: 'Cannot delete: vehicle details still reference this vehicle type' }, { status: 409 })
        }
        return handleApiError(error)
    }
}
