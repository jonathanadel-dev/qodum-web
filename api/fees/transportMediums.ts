// api/fees/transportMediums.ts
import z from 'zod'
import { request } from '../common/utils'
import { TransportMediumValidation } from '@/lib/validations/fees/transport/transportlMedium.validation'


export type TransportMediumPayload = z.output<typeof TransportMediumValidation>
export type TransportMediumRecord = TransportMediumPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchTransportMediums = () => request<TransportMediumRecord[]>('/api/transport-mediums')
export const createTransportMedium = (values: TransportMediumPayload) =>
    request('/api/transport-mediums', { method: 'POST', body: JSON.stringify(values) })
export const modifyTransportMedium = ({ id, ...values }: TransportMediumPayload & { id: number | string }) =>
    request(`/api/transport-mediums/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteTransportMedium = ({ id }: { id: number | string }) =>
    request(`/api/transport-mediums/${id}`, { method: 'DELETE' })


// Dropdown options
export const fetchTransportMediumsOptions = () =>
    request<{ id: number; transport_medium: string }[]>('/api/transport-mediums/options')
