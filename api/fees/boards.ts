// api/fees/boards.ts
import z from 'zod'
import { BoardValidation } from '@/lib/validations/fees/globalMasters/defineSchool/board'
import { request } from '../common/utils'


export type BoardPayload = z.output<typeof BoardValidation>
export type BoardRecord = BoardPayload & {
    id: number
    session: number
    created_at: string
    updated_at: string
}


// CRUD operations
export const fetchBoards = () => request<BoardRecord[]>('/api/boards')
export const createBoard = (values: BoardPayload) =>
    request('/api/boards', { method: 'POST', body: JSON.stringify(values) })
export const modifyBoard = ({ id, ...values }: BoardPayload & { id: number | string }) =>
    request(`/api/boards/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
export const deleteBoard = ({ id }: { id: number | string }) =>
    request(`/api/boards/${id}`, { method: 'DELETE' })


// Boards dropdown options (active session)
export const fetchBoardsOptions = () =>
    request<{ id: number; board: string; is_default: boolean | null }[]>('/api/boards/options')