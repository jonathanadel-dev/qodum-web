// api/admission/streams.ts
import z from 'zod'
import { StreamValidation } from '@/lib/validations/admission/globalMasters/stream.validation'
import { request } from '../common/utils'


export type StreamPayload = z.output<typeof StreamValidation>
export type StreamRecord = StreamPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchStreams = () => request<StreamRecord[]>('/api/streams')
export const createStream = (values: StreamPayload) =>
    request('/api/streams', { method: 'POST', body: JSON.stringify(values) })
export const modifyStream = ({ id, ...values }: StreamPayload & { id: number | string }) =>
    request(`/api/streams/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteStream = ({ id }: { id: number | string }) =>
    request(`/api/streams/${id}`, { method: 'DELETE' })


// Stream dropdown options
export const fetchStreamsOptions = () =>
    request<{ id: number; stream_name: string }[]>('/api/streams/options')
