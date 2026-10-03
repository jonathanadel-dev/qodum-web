// app/api/vehicle-types/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { VehicleTypeValidation } from '@/lib/validations/fees/transport/vehicelType.validation'


const MODULE = 'fees'
const PAGE = 'define-vehicle-type'


// Fetch vehicle types for the active session
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const vehicleTypes = await prisma.vehicleType.findMany({
        where: { session: academic_year.id },
        orderBy: { vehicle_name: 'asc' },
    })
    return NextResponse.json(vehicleTypes)
}


// Create a vehicle type
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(VehicleTypeValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.vehicleType.findFirst({
        where: { session: academic_year.id, vehicle_name: body.data.vehicle_name },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Vehicle type already exists' }, { status: 409 })

    try {
        const vehicleType = await prisma.vehicleType.create({
            data: { vehicle_name: body.data.vehicle_name, session: academic_year.id },
        })
        return NextResponse.json(vehicleType, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
