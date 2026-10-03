import { cache } from 'react'
import { prisma } from '@/lib/prisma'


// Types
export type YearInfo = { id: number; year_name: string }
export type ActiveSession = { academic_year: YearInfo | null; financial_year: YearInfo | null }


// Active academic + financial year (deduped per request)
export const getActiveSession = cache(async (): Promise<ActiveSession> => {
    const select = { id: true, year_name: true }
    const orderBy = { id: 'desc' as const }
    const [academic_year, financial_year] = await Promise.all([
        prisma.academicYear.findFirst({ where: { is_active: true }, select, orderBy }),
        prisma.financialYear.findFirst({ where: { is_active: true }, select, orderBy }),
    ])
    return { academic_year, financial_year }
})