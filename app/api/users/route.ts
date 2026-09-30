import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { CreateUserValidation } from '@/lib/validations/users/manageUsers/user.validation'
import { parseBody } from '@/api/common/parse-body'


const MODULE = 'users'
const PAGE = 'create-user'


// Fetch users
export async function GET() {

    // Authorization check
    const auth = await authorize(MODULE, PAGE, 'any')
    if ('response' in auth) return auth.response


    // Users
    const users = await prisma.user.findMany({
        omit: { password: true },
        include: { schools: { select: { id: true } } },
        orderBy: { name: 'asc' },
    })
    return NextResponse.json(users.map((u) => ({ ...u, schools: u.schools.map((s) => s.id) })))
}


// Create user
export async function POST(request: NextRequest) {

    // Authorization check
    const auth = await authorize(MODULE, PAGE, 'add')
    if ('response' in auth) return auth.response


    // Data validation check
    const body = await parseBody(CreateUserValidation, request)
    if ('response' in body) return body.response
    const { password, schools, ...data } = body.data


    // Adding user
    try {
        const user = await prisma.user.create({
            data: {
                ...data,
                password: await bcrypt.hash(password, 10),
                ...(schools ? { schools: { connect: schools.map((id) => ({ id })) } } : {}),
            },
            omit: { password: true },
        })
        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}