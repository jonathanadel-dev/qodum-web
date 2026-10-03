// api/admission/documents.ts
import z from 'zod'
import { DocumentCrudValidation } from '@/lib/validations/admission/globalMasters/document/documentCrud.validation'
import { request } from '../common/utils'


export type DocumentPayload = z.output<typeof DocumentCrudValidation>
export type AdmissionDocumentRecord = Omit<DocumentPayload, 'document_type_id'> & {
    id: number
    session: number
    document_type_id: string
    document_type_label: string
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchAdmissionDocuments = () => request<AdmissionDocumentRecord[]>('/api/admission-documents')
export const createAdmissionDocument = (values: DocumentPayload) =>
    request('/api/admission-documents', { method: 'POST', body: JSON.stringify(values) })
export const modifyAdmissionDocument = ({ id, ...values }: DocumentPayload & { id: number | string }) =>
    request(`/api/admission-documents/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteAdmissionDocument = ({ id }: { id: number | string }) =>
    request(`/api/admission-documents/${id}`, { method: 'DELETE' })
