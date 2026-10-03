import z from 'zod'
import { SectionValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/section.validation'
import { request } from '../common/utils'


export type SectionPayload = z.output<typeof SectionValidation>


// CRUD operations
export const fetchSections = () => request<any[]>('/api/sections')
export const createSection = (values: SectionPayload) =>
    request('/api/sections', { method: 'POST', body: JSON.stringify(values) })
export const modifySection = ({ id, ...values }: SectionPayload & { id: number | string }) =>
    request(`/api/sections/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteSection = ({ id }: { id: number | string }) =>
    request(`/api/sections/${id}`, { method: 'DELETE' })