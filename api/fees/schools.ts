// api/schools.ts
import z from 'zod'
import { SchoolValidation } from '@/lib/validations/fees/globalMasters/defineSchool/schoolGlobalDetails.validation'
import { request } from "../common/utils"


export type SchoolPayload = z.output<typeof SchoolValidation>


// CRUD operations
export const fetchSchools = () => request<any[]>('/api/schools')
export const createSchool = (values: SchoolPayload) =>
    request('/api/schools', { method: 'POST', body: JSON.stringify(values) })
export const modifySchool = ({ id, ...values }: Partial<SchoolPayload> & { id: number | string }) =>
    request(`/api/schools/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteSchool = ({ id }: { id: number | string }) =>
    request(`/api/schools/${id}`, { method: 'DELETE' })


// Fetch schools options
export const fetchSchoolsOptions = () => request<{ id: number; school_name: string }[]>('/api/schools/options')