// api/fees/concessionTypes.ts
import z from 'zod'
import { ConcessionTypeValidation } from '@/lib/validations/fees/feeMaster/defineAndAssignConcession/concessionType.validation'
import { request } from '../common/utils'


export type ConcessionTypePayload = z.output<typeof ConcessionTypeValidation>
export type ConcessionTypeRecord = ConcessionTypePayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchConcessionTypes = () => request<ConcessionTypeRecord[]>('/api/concession-types')
export const createConcessionType = (values: ConcessionTypePayload) =>
    request('/api/concession-types', { method: 'POST', body: JSON.stringify(values) })
export const modifyConcessionType = ({ id, ...values }: ConcessionTypePayload & { id: number | string }) =>
    request(`/api/concession-types/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteConcessionType = ({ id }: { id: number | string }) =>
    request(`/api/concession-types/${id}`, { method: 'DELETE' })


// Concession type dropdown options
export const fetchConcessionTypesOptions = () =>
    request<{ id: number; type: string }[]>('/api/concession-types/options')
