// api/admission/optionalSubjects.ts
import z from 'zod'
import { OptionalSubjectValidation } from '@/lib/validations/admission/globalMasters/optionalSubject.validation'
import { request } from '../common/utils'


export type OptionalSubjectPayload = z.output<typeof OptionalSubjectValidation>
export type OptionalSubjectRecord = OptionalSubjectPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchOptionalSubjects = () => request<OptionalSubjectRecord[]>('/api/optional-subjects')
export const createOptionalSubject = (values: OptionalSubjectPayload) =>
    request('/api/optional-subjects', { method: 'POST', body: JSON.stringify(values) })
export const modifyOptionalSubject = ({ id, ...values }: OptionalSubjectPayload & { id: number | string }) =>
    request(`/api/optional-subjects/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteOptionalSubject = ({ id }: { id: number | string }) =>
    request(`/api/optional-subjects/${id}`, { method: 'DELETE' })


// Optional subject dropdown options
export const fetchOptionalSubjectsOptions = () =>
    request<{ id: number; subject_name: string }[]>('/api/optional-subjects/options')
