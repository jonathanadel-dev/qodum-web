// api/fees/concessions.ts
import z from 'zod'
import { ConcessionValidation } from '@/lib/validations/fees/feeMaster/defineAndAssignConcession/concession.validation'
import { request } from '../common/utils'


export type ConcessionPayload = z.output<typeof ConcessionValidation>
export type ConcessionRecord = ConcessionPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchConcessions = () => request<ConcessionRecord[]>('/api/concessions')
export const createConcession = (values: ConcessionPayload) =>
    request('/api/concessions', { method: 'POST', body: JSON.stringify(values) })
export const modifyConcession = ({ id, ...values }: ConcessionPayload & { id: number | string }) =>
    request(`/api/concessions/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteConcession = ({ id }: { id: number | string }) =>
    request(`/api/concessions/${id}`, { method: 'DELETE' })
