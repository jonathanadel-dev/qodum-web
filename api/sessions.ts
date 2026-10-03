import z from 'zod'
import { YearValidation } from '@/lib/validations/year.validation'
import { request } from './common/utils'


// Types
export type YearKind = 'academic' | 'financial'
export type YearPayload = z.output<typeof YearValidation>
export type YearRow = {
    id: number
    year_name: string
    start_date: string
    end_date: string
    is_active: boolean
    created_at: string
    updated_at: string
}


// CRUD operations
const url = (kind: YearKind, moduleSlug: string, id?: number | string) =>
    `/api/${kind === 'academic' ? 'academic-years' : 'financial-years'}${id ? `/${id}` : ''}?module=${encodeURIComponent(moduleSlug)}`
export const fetchYears = (kind: YearKind, moduleSlug: string) => request<YearRow[]>(url(kind, moduleSlug))
export const createYear = (kind: YearKind, moduleSlug: string, values: YearPayload) =>
    request(url(kind, moduleSlug), { method: 'POST', body: JSON.stringify(values) })
export const modifyYear = (kind: YearKind, moduleSlug: string, { id, ...values }: YearPayload & { id: number | string }) =>
    request(url(kind, moduleSlug, id), { method: 'PATCH', body: JSON.stringify(values) })
export const deleteYear = (kind: YearKind, moduleSlug: string, id: number | string) =>
    request(url(kind, moduleSlug, id), { method: 'DELETE' })