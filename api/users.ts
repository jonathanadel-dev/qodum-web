import { request, toIds } from './common/utils'


// User payload
export type UserPayload = {
    name: string
    user_name: string
    password?: string
    is_reset_password?: boolean
    designation?: string | null
    email?: string | null
    mobile?: string | null
    profile_picture?: string | null
    is_active?: boolean
    enable_otp?: boolean
    schools?: (string | number)[]
}


// Fetch users
export const fetchUsers = async () => {
    const users = await request<any[]>('/api/users')
    return users.map((u) => ({ ...u, schools: (u.schools ?? []).map(String) }))
}


// Create user
export const createUser = ({ schools, ...values }: UserPayload) =>
    request('/api/users', { method: 'POST', body: JSON.stringify({ ...values, schools: toIds(schools) }) })


// Modify user
export const modifyUser = ({ id, schools, ...values }: Partial<UserPayload> & { id: number | string }) =>
    request(`/api/users/${id}`, { method: 'PATCH', body: JSON.stringify({ ...values, schools: toIds(schools) }) })


// Delete user
export const deleteUser = ({ id }: { id: number | string }) =>
    request(`/api/users/${id}`, { method: 'DELETE' })