// api/admission/houses.ts
import z from 'zod'
import { HouseValidation } from '@/lib/validations/admission/globalMasters/house.validation'
import { request } from '../common/utils'


export type HousePayload = z.output<typeof HouseValidation>
export type HouseRecord = HousePayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchHouses = () => request<HouseRecord[]>('/api/houses')
export const createHouse = (values: HousePayload) =>
    request('/api/houses', { method: 'POST', body: JSON.stringify(values) })
export const modifyHouse = ({ id, ...values }: HousePayload & { id: number | string }) =>
    request(`/api/houses/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteHouse = ({ id }: { id: number | string }) =>
    request(`/api/houses/${id}`, { method: 'DELETE' })


// House dropdown options
export const fetchHousesOptions = () =>
    request<{ id: number; house_name: string }[]>('/api/houses/options')
