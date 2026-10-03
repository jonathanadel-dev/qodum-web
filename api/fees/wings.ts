// api/wings.ts
import { request } from '../common/utils'


// Wings dropdown options
export const fetchWingsOptions = () => request<{ id: number; wing: string }[]>('/api/wings/options')