// api/payroll/staffDocumentTypes.ts
import z from 'zod'
import { request } from '../common/utils'
import { StaffDocumentTypeValidation } from '@/lib/validations/payroll/globalMasters/document/staffDocumentType.validation'


export type StaffDocumentTypePayload = z.output<typeof StaffDocumentTypeValidation>
export type StaffDocumentTypeRecord = StaffDocumentTypePayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchStaffDocumentTypes = () =>
    request<StaffDocumentTypeRecord[]>('/api/staff-document-types')
export const createStaffDocumentType = (values: StaffDocumentTypePayload) =>
    request('/api/staff-document-types', { method: 'POST', body: JSON.stringify(values) })
export const modifyStaffDocumentType = ({ id, ...values }: StaffDocumentTypePayload & { id: number | string }) =>
    request(`/api/staff-document-types/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteStaffDocumentType = ({ id }: { id: number | string }) =>
    request(`/api/staff-document-types/${id}`, { method: 'DELETE' })


// Dropdown options
export const fetchStaffDocumentTypesOptions = () =>
    request<{ id: number; document_type: string }[]>('/api/staff-document-types/options')
