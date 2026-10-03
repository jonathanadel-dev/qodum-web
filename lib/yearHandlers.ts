// lib/sessions/yearHandlers.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { parseId } from '@/lib/utils'
import { YearValidation } from '@/lib/validations/year.validation'


// Both models share the same shape, so one set of handlers serves both
type Kind = 'academicYear' | 'financialYear'
type Db = Pick<typeof prisma, 'academicYear' | 'financialYear'>
type Context = { params: Promise<{ id: string }> }

const PAGES = { academicYear: 'define-academic-year', financialYear: 'define-financial-year' } as const
const OTHER = { academicYear: 'financialYear', financialYear: 'academicYear' } as const

const model = (kind: Kind, db: Db = prisma) => db[kind] as unknown as typeof prisma.academicYear
const getModule = (request: NextRequest) => request.nextUrl.searchParams.get('module') ?? ''

const toDate = (s: string) => new Date(`${s}T00:00:00.000Z`)
const toDay = (d: Date) => d.toISOString().slice(0, 10)
const serialize = (r: any) => ({ ...r, start_date: toDay(r.start_date), end_date: toDay(r.end_date) })

const shiftDate = (d: Date, years: number) => {
    const next = new Date(d)
    next.setUTCFullYear(next.getUTCFullYear() + years)
    return next
}
const shiftName = (name: string, years: number) => {
    const m = /^(\d{4})-(\d{4})$/.exec(name)
    return m ? `${Number(m[1]) + years}-${Number(m[2]) + years}` : null
}

const missingModule = () => NextResponse.json({ error: 'Module is required' }, { status: 400 })


// List + create
export const collectionHandlers = (kind: Kind) => ({

    GET: async (request: NextRequest) => {
        const moduleSlug = getModule(request)
        if (!moduleSlug) return missingModule()

        const auth = await authorize(moduleSlug, PAGES[kind], 'any')
        if ('response' in auth) return auth.response

        const rows = await model(kind).findMany({ orderBy: { start_date: 'desc' } })
        return NextResponse.json(rows.map(serialize))
    },

    POST: async (request: NextRequest) => {
        const moduleSlug = getModule(request)
        if (!moduleSlug) return missingModule()

        const auth = await authorize(moduleSlug, PAGES[kind], 'add')
        if ('response' in auth) return auth.response

        const body = await parseBody(YearValidation, request)
        if ('response' in body) return body.response
        const { create_other, upcoming, ...data } = body.data

        // The record itself + the upcoming ones (each shifted by one more year)
        const first = {
            year_name: data.year_name,
            start_date: toDate(data.start_date),
            end_date: toDate(data.end_date),
            is_active: data.is_active,
        }
        const next: typeof first[] = []
        for (let i = 1; i <= (upcoming ?? 0); i++) {
            const year_name = shiftName(first.year_name, i)
            if (!year_name) {
                return NextResponse.json({ error: 'Year name must look like 2025-2026 to create upcoming sessions' }, { status: 400 })
            }
            next.push({ year_name, start_date: shiftDate(first.start_date, i), end_date: shiftDate(first.end_date, i), is_active: false })
        }

        try {
            const created = await prisma.$transaction(async (tx) => {
                const created = await model(kind, tx).create({ data: first })
                if (first.is_active) {
                    await model(kind, tx).updateMany({ where: { id: { not: created.id } }, data: { is_active: false } })
                }
                if (next.length) await model(kind, tx).createMany({ data: next })

                // Same sessions in the other model (existing ones are left alone)
                if (create_other) {
                    const other = model(OTHER[kind], tx)
                    await other.createMany({ data: [first, ...next], skipDuplicates: true })
                    if (first.is_active) {
                        await other.updateMany({ data: { is_active: false } })
                        await other.updateMany({ where: { year_name: first.year_name }, data: { is_active: true } })
                    }
                }
                return created
            })
            return NextResponse.json(serialize(created), { status: 201 })
        } catch (error) {
            return handleApiError(error)
        }
    },
})


// Update + delete
export const itemHandlers = (kind: Kind) => ({

    PATCH: async (request: NextRequest, { params }: Context) => {
        const moduleSlug = getModule(request)
        if (!moduleSlug) return missingModule()

        const auth = await authorize(moduleSlug, PAGES[kind], 'modify')
        if ('response' in auth) return auth.response

        const id = parseId((await params).id)
        if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

        const body = await parseBody(YearValidation, request)
        if ('response' in body) return body.response
        const { year_name, start_date, end_date, is_active } = body.data

        try {
            const updated = await prisma.$transaction(async (tx) => {
                const updated = await model(kind, tx).update({
                    where: { id },
                    data: { year_name, start_date: toDate(start_date), end_date: toDate(end_date), is_active },
                })
                if (is_active) {
                    await model(kind, tx).updateMany({ where: { id: { not: id } }, data: { is_active: false } })
                }
                return updated
            })
            return NextResponse.json(serialize(updated))
        } catch (error) {
            return handleApiError(error)
        }
    },

    DELETE: async (request: NextRequest, { params }: Context) => {
        const moduleSlug = getModule(request)
        if (!moduleSlug) return missingModule()

        const auth = await authorize(moduleSlug, PAGES[kind], 'delete')
        if ('response' in auth) return auth.response

        const id = parseId((await params).id)
        if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

        const target = await model(kind).findUnique({ where: { id }, select: { is_active: true } })
        if (!target) return NextResponse.json({ error: 'Record not found' }, { status: 404 })
        if (target.is_active) return NextResponse.json({ error: 'The active session cannot be deleted' }, { status: 409 })

        try {
            await model(kind).delete({ where: { id } })
            return NextResponse.json({ id })
        } catch (error) {
            // Records still belong to this session
            if ((error as { code?: string })?.code === 'P2003') {
                return NextResponse.json({ error: 'Cannot delete: records exist for this session' }, { status: 409 })
            }
            return handleApiError(error)
        }
    },
})