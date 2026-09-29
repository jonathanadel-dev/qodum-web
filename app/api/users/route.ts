import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { authorize } from '@/lib/auth/authorize'
import { handleApiError } from '@/api/common/handle-error'
import { CreateUserApiSchema } from '@/lib/validations/users/manageUsers/user.api.validation'


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
    const parsed = CreateUserApiSchema.safeParse(await request.json().catch(() => null))
    if (!parsed.success) {
        return NextResponse.json(
            { error: 'Invalid data', details: parsed.error.flatten().fieldErrors },
            { status: 400 }
        )
    }
    const { password, schools, ...data } = parsed.data


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