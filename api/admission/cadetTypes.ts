// api/admission/cadetTypes.ts
import z from 'zod'
import { CadetTypeValidation } from '@/lib/validations/admission/globalMasters/cadetType.validation'
import { request } from '../common/utils'


export type CadetTypePayload = z.output<typeof CadetTypeValidation>
export type CadetTypeRecord = CadetTypePayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchCadetTypes = () => request<CadetTypeRecord[]>('/api/cadet-types')
export const createCadetType = (values: CadetTypePayload) =>
    request('/api/cadet-types', { method: 'POST', body: JSON.stringify(values) })
export const modifyCadetType = ({ id, ...values }: CadetTypePayload & { id: number | string }) =>
    request(`/api/cadet-types/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteCadetType = ({ id }: { id: number | string }) =>
    request(`/api/cadet-types/${id}`, { method: 'DELETE' })


// Cadet type dropdown options
export const fetchCadetTypesOptions = () =>
    request<{ id: number; name: string }[]>('/api/cadet-types/options')
