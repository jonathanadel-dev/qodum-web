import { CreateUserValidation } from '@/lib/validations/users/manageUsers/user.validation'
import { request } from '../common/utils'
import z from 'zod'


export type UserPayload = z.output<typeof CreateUserValidation>


// CRUD operations
export const fetchUsers = () => request<any[]>('/api/users')
export const createUser = (values: UserPayload) =>
    request('/api/users', { method: 'POST', body: JSON.stringify(values) })
export const modifyUser = ({ id, ...values }: Partial<UserPayload> & { id: number | string }) =>
    request(`/api/users/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteUser = ({ id }: { id: number | string }) =>
    request(`/api/users/${id}`, { method: 'DELETE' })


// Permissions
export type UserPermissionRow = {
    permission_item_id: number
    module_name: string
    page_name: string
    add: boolean
    modify: boolean
    delete: boolean
    print: boolean
    read_only: boolean
}
export const fetchUserPermissions = (id: number | string) =>
    request<{ session: { id: number; year_name: string }; permissions: UserPermissionRow[] }>(`/api/users/${id}/permissions`)
export const saveUserPermissions = ({ id, permissions }: { id: number | string; permissions: UserPermissionRow[] }) =>
    request(`/api/users/${id}/permissions`, { method: 'PUT', body: JSON.stringify({ permissions }) })