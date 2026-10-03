import { request } from './common/utils'


// Boards dropdown options (active session)
export const fetchBoardsOptions = () =>
    request<{ id: number; board: string; is_default: boolean | null }[]>('/api/boards/options')