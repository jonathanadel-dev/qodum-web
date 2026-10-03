// api/fees/vehicleTypes.ts
import z from 'zod'
import { request } from '../common/utils'
import { VehicleTypeValidation } from '@/lib/validations/fees/transport/vehicelType.validation'


export type VehicleTypePayload = z.output<typeof VehicleTypeValidation>
export type VehicleTypeRecord = VehicleTypePayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchVehicleTypes = () => request<VehicleTypeRecord[]>('/api/vehicle-types')
export const createVehicleType = (values: VehicleTypePayload) =>
    request('/api/vehicle-types', { method: 'POST', body: JSON.stringify(values) })
export const modifyVehicleType = ({ id, ...values }: VehicleTypePayload & { id: number | string }) =>
    request(`/api/vehicle-types/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteVehicleType = ({ id }: { id: number | string }) =>
    request(`/api/vehicle-types/${id}`, { method: 'DELETE' })


// Dropdown options
export const fetchVehicleTypesOptions = () =>
    request<{ id: number; vehicle_name: string }[]>('/api/vehicle-types/options')
