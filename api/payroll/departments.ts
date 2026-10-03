// api/payroll/departments.ts
import z from 'zod'
import { request } from '../common/utils'
import { DepartmentValidation } from '@/lib/validations/payroll/globalMasters/department.validation'


export type DepartmentPayload = z.output<typeof DepartmentValidation>
export type DepartmentRecord = DepartmentPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchDepartments = () => request<DepartmentRecord[]>('/api/departments')
export const createDepartment = (values: DepartmentPayload) =>
    request('/api/departments', { method: 'POST', body: JSON.stringify(values) })
export const modifyDepartment = ({ id, ...values }: DepartmentPayload & { id: number | string }) =>
    request(`/api/departments/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteDepartment = ({ id }: { id: number | string }) =>
    request(`/api/departments/${id}`, { method: 'DELETE' })


// Dropdown options
export const fetchDepartmentsOptions = () =>
    request<{ id: number; department: string }[]>('/api/departments/options')
