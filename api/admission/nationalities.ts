// api/admission/nationalities.ts
import z from 'zod'
import { NationalityValidation } from '@/lib/validations/admission/globalMasters/nationality.validation'
import { request } from '../common/utils'


export type NationalityPayload = z.output<typeof NationalityValidation>
export type NationalityRecord = NationalityPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchNationalities = () => request<NationalityRecord[]>('/api/nationalities')
export const createNationality = (values: NationalityPayload) =>
    request('/api/nationalities', { method: 'POST', body: JSON.stringify(values) })
export const modifyNationality = ({ id, ...values }: NationalityPayload & { id: number | string }) =>
    request(`/api/nationalities/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteNationality = ({ id }: { id: number | string }) =>
    request(`/api/nationalities/${id}`, { method: 'DELETE' })


// Nationality dropdown options
export const fetchNationalitiesOptions = () =>
    request<{ id: number; name: string }[]>('/api/nationalities/options')
