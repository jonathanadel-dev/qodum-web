// api/payroll/professions.ts
import z from 'zod'
import { request } from '../common/utils'
import { ProfessionValidation } from '@/lib/validations/payroll/globalMasters/preofession.validation'


export type ProfessionPayload = z.output<typeof ProfessionValidation>
export type ProfessionRecord = ProfessionPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchProfessions = () => request<ProfessionRecord[]>('/api/professions')
export const createProfession = (values: ProfessionPayload) =>
    request('/api/professions', { method: 'POST', body: JSON.stringify(values) })
export const modifyProfession = ({ id, ...values }: ProfessionPayload & { id: number | string }) =>
    request(`/api/professions/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteProfession = ({ id }: { id: number | string }) =>
    request(`/api/professions/${id}`, { method: 'DELETE' })


// Dropdown options
export const fetchProfessionsOptions = () =>
    request<{ id: number; profession: string }[]>('/api/professions/options')
