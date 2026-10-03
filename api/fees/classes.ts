import z from 'zod'
import { ClassValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/class.validation'
import { request } from '../common/utils'


export type ClassPayload = z.output<typeof ClassValidation>


// CRUD operations
export const fetchClasses = () => request<any[]>('/api/classes')
export const createClass = (values: ClassPayload) =>
    request('/api/classes', { method: 'POST', body: JSON.stringify(values) })
export const modifyClass = ({ id, ...values }: ClassPayload & { id: number | string }) =>
    request(`/api/classes/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteClass = ({ id }: { id: number | string }) =>
    request(`/api/classes/${id}`, { method: 'DELETE' })