import { CreateUserValidation } from '@/lib/validations/users/manageUsers/user.validation'
import { request } from './common/utils'
import z from 'zod'

export type UserPayload = z.output<typeof CreateUserValidation>

export const fetchUsers = () => request<any[]>('/api/users')

export const createUser = (values: UserPayload) =>
    request('/api/users', { method: 'POST', body: JSON.stringify(values) })

export const modifyUser = ({ id, ...values }: Partial<UserPayload> & { id: number | string }) =>
    request(`/api/users/${id}`, { method: 'PATCH', body: JSON.stringify(values) })

export const deleteUser = ({ id }: { id: number | string }) =>
    request(`/api/users/${id}`, { method: 'DELETE' })