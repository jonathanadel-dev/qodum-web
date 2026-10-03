// api/admission/documentTypes.ts
import z from 'zod'
import { DocumentTypeValidation } from '@/lib/validations/admission/globalMasters/document/documentType.validation'
import { request } from '../common/utils'


export type DocumentTypePayload = z.output<typeof DocumentTypeValidation>
export type DocumentTypeRecord = DocumentTypePayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchDocumentTypes = () => request<DocumentTypeRecord[]>('/api/admission-document-types')
export const createDocumentType = (values: DocumentTypePayload) =>
    request('/api/admission-document-types', { method: 'POST', body: JSON.stringify(values) })
export const modifyDocumentType = ({ id, ...values }: DocumentTypePayload & { id: number | string }) =>
    request(`/api/admission-document-types/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteDocumentType = ({ id }: { id: number | string }) =>
    request(`/api/admission-document-types/${id}`, { method: 'DELETE' })
export const fetchDocumentTypesOptions = () =>
    request<{ id: number; document_type: string }[]>('/api/admission-document-types/options')
