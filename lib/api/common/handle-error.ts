import { NextResponse } from 'next/server'

export function handleApiError(error: unknown) {
    const code = (error as { code?: string })?.code

    if (code === 'P2002') return NextResponse.json({ error: 'Already exists' }, { status: 409 })
    if (code === 'P2025') return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
}