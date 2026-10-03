// api/fees/wings.ts
import z from 'zod'
import { WingValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/wing.validation'
import { request } from '../common/utils'


export type WingPayload = z.output<typeof WingValidation>
export type WingRecord = WingPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchWings = () => request<WingRecord[]>('/api/wings')
export const createWing = (values: WingPayload) =>
    request('/api/wings', { method: 'POST', body: JSON.stringify(values) })
export const modifyWing = ({ id, ...values }: WingPayload & { id: number | string }) =>
    request(`/api/wings/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteWing = ({ id }: { id: number | string }) =>
    request(`/api/wings/${id}`, { method: 'DELETE' })


// Wings dropdown options
export const fetchWingsOptions = () => request<{ id: number; wing: string }[]>('/api/wings/options')