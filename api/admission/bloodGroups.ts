// api/admission/bloodGroups.ts
import z from 'zod'
import { BloodGroupValidation } from '@/lib/validations/admission/globalMasters/bloodGroup.validation'
import { request } from '../common/utils'


export type BloodGroupPayload = z.output<typeof BloodGroupValidation>
export type BloodGroupRecord = BloodGroupPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchBloodGroups = () => request<BloodGroupRecord[]>('/api/blood-groups')
export const createBloodGroup = (values: BloodGroupPayload) =>
    request('/api/blood-groups', { method: 'POST', body: JSON.stringify(values) })
export const modifyBloodGroup = ({ id, ...values }: BloodGroupPayload & { id: number | string }) =>
    request(`/api/blood-groups/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteBloodGroup = ({ id }: { id: number | string }) =>
    request(`/api/blood-groups/${id}`, { method: 'DELETE' })


// Blood group dropdown options
export const fetchBloodGroupsOptions = () =>
    request<{ id: number; blood_group: string }[]>('/api/blood-groups/options')
