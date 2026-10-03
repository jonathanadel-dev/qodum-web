// api/admission/castes.ts
import z from 'zod'
import { CasteValidation } from '@/lib/validations/admission/globalMasters/caste.validation'
import { request } from '../common/utils'


export type CastePayload = z.output<typeof CasteValidation>
export type CasteRecord = CastePayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchCastes = () => request<CasteRecord[]>('/api/castes')
export const createCaste = (values: CastePayload) =>
    request('/api/castes', { method: 'POST', body: JSON.stringify(values) })
export const modifyCaste = ({ id, ...values }: CastePayload & { id: number | string }) =>
    request(`/api/castes/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteCaste = ({ id }: { id: number | string }) =>
    request(`/api/castes/${id}`, { method: 'DELETE' })


// Caste dropdown options
export const fetchCastesOptions = () =>
    request<{ id: number; caste_name: string }[]>('/api/castes/options')
