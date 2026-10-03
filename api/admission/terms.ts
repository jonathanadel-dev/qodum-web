// api/admission/terms.ts
import z from 'zod'
import { TermValidation } from '@/lib/validations/admission/globalMasters/studentHealthMaster/term.validation'
import { request } from '../common/utils'


export type TermPayload = z.output<typeof TermValidation>
export type TermRecord = TermPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchTerms = () => request<TermRecord[]>('/api/health-terms')
export const createTerm = (values: TermPayload) =>
    request('/api/health-terms', { method: 'POST', body: JSON.stringify(values) })
export const modifyTerm = ({ id, ...values }: TermPayload & { id: number | string }) =>
    request(`/api/health-terms/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteTerm = ({ id }: { id: number | string }) =>
    request(`/api/health-terms/${id}`, { method: 'DELETE' })


// Health term dropdown options
export const fetchTermsOptions = () =>
    request<{ id: number; term_name: string }[]>('/api/health-terms/options')
