// api/admission/clubs.ts
import z from 'zod'
import { ClubValidation } from '@/lib/validations/admission/globalMasters/club.validation'
import { request } from '../common/utils'


export type ClubPayload = z.output<typeof ClubValidation>
export type ClubRecord = ClubPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchClubs = () => request<ClubRecord[]>('/api/clubs')
export const createClub = (values: ClubPayload) =>
    request('/api/clubs', { method: 'POST', body: JSON.stringify(values) })
export const modifyClub = ({ id, ...values }: ClubPayload & { id: number | string }) =>
    request(`/api/clubs/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteClub = ({ id }: { id: number | string }) =>
    request(`/api/clubs/${id}`, { method: 'DELETE' })


// Club dropdown options
export const fetchClubsOptions = () =>
    request<{ id: number; name: string }[]>('/api/clubs/options')
