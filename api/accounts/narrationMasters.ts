// api/accounts/narrationMasters.ts
import z from 'zod'
import { request } from '../common/utils'
import { NarrationMasterValidation } from '@/lib/validations/accounts/globalMasters/narrationMaster'


export type NarrationMasterPayload = z.output<typeof NarrationMasterValidation>
export type NarrationMasterRecord = NarrationMasterPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchNarrationMasters = () =>
    request<NarrationMasterRecord[]>('/api/narration-masters')
export const createNarrationMaster = (values: NarrationMasterPayload) =>
    request('/api/narration-masters', { method: 'POST', body: JSON.stringify(values) })
export const modifyNarrationMaster = ({ id, ...values }: NarrationMasterPayload & { id: number | string }) =>
    request(`/api/narration-masters/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteNarrationMaster = ({ id }: { id: number | string }) =>
    request(`/api/narration-masters/${id}`, { method: 'DELETE' })
