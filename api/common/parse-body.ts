import { NextResponse } from 'next/server'
import type { z } from 'zod'

// Validates the JSON body. Returns { data } or { response }
export async function parseBody<S extends z.ZodTypeAny>(schema: S, req: Request) {
    const parsed = schema.safeParse(await req.json().catch(() => null))
    if (!parsed.success) {
        return {
            response: NextResponse.json(
                { error: 'Invalid data', details: parsed.error.flatten().fieldErrors },
                { status: 400 }
            ),
        }
    }
    // Cast lives here once: with strictNullChecks off, Zod types every key as optional
    return { data: parsed.data as Required<z.output<S>> }
}