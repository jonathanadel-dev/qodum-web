// app/api/boards/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'
import { handleApiError } from '@/api/common/handle-error'
import { parseBody } from '@/api/common/parse-body'
import { BoardValidation } from '@/lib/validations/fees/globalMasters/defineSchool/board'


const MODULE = 'fees'
const PAGE = 'define-school-board'


// Fetch boards (active session)
export async function GET() {
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const boards = await prisma.board.findMany({
        where: { session: academic_year.id },
        orderBy: { board: 'asc' },
    })
    return NextResponse.json(boards)
}


// Create board
export async function POST(request: NextRequest) {
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response

    const body = await parseBody(BoardValidation, request)
    if ('response' in body) return body.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json({ error: 'No active academic session' }, { status: 409 })

    const duplicate = await prisma.board.findFirst({
        where: { session: academic_year.id, board: body.data.board },
        select: { id: true },
    })
    if (duplicate) return NextResponse.json({ error: 'Board already exists' }, { status: 409 })

    try {
        const board = await prisma.$transaction(async (tx) => {
            if (body.data.is_default) {
                await tx.board.updateMany({
                    where: { session: academic_year.id },
                    data: { is_default: false },
                })
            }
            return tx.board.create({
                data: { ...body.data, session: academic_year.id },
            })
        })
        return NextResponse.json(board, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}
