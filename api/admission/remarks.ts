// api/admission/remarks.ts
import z from 'zod'
import { RemarkValidation } from '@/lib/validations/admission/globalMasters/remark.validation'
import { request } from '../common/utils'


export type RemarkPayload = z.output<typeof RemarkValidation>
export type RemarkRecord = RemarkPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchRemarks = () => request<RemarkRecord[]>('/api/remarks')
export const createRemark = (values: RemarkPayload) =>
    request('/api/remarks', { method: 'POST', body: JSON.stringify(values) })
export const modifyRemark = ({ id, ...values }: RemarkPayload & { id: number | string }) =>
    request(`/api/remarks/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteRemark = ({ id }: { id: number | string }) =>
    request(`/api/remarks/${id}`, { method: 'DELETE' })
