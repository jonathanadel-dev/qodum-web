// api/admission/religions.ts
import z from 'zod'
import { ReligionValidation } from '@/lib/validations/admission/globalMasters/religion.validation'
import { request } from '../common/utils'


export type ReligionPayload = z.output<typeof ReligionValidation>
export type ReligionRecord = ReligionPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchReligions = () => request<ReligionRecord[]>('/api/religions')
export const createReligion = (values: ReligionPayload) =>
    request('/api/religions', { method: 'POST', body: JSON.stringify(values) })
export const modifyReligion = ({ id, ...values }: ReligionPayload & { id: number | string }) =>
    request(`/api/religions/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteReligion = ({ id }: { id: number | string }) =>
    request(`/api/religions/${id}`, { method: 'DELETE' })


// Religion dropdown options
export const fetchReligionsOptions = () =>
    request<{ id: number; religion_name: string }[]>('/api/religions/options')
