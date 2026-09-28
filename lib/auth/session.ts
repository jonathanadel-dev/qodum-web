import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { verifyToken } from './jwt'
import { JWTPayload } from 'jose'

const COOKIE_NAME = 'qodum_session'

export type CurrentUser = {
    id: number
    name: string
    user_name: string
    designation: string | null
    email: string | null
    mobile: string | null
    profile_picture: string | null
    is_active: boolean | null
    permissions: {
        module_name: string
        page_name: string
        add: boolean
        modify: boolean
        delete: boolean
        print: boolean
        read_only: boolean
    }[]
    is_admin: boolean | null
}

export async function setAuthCookie(token: string) {
    const store = await cookies()
    store.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30
    })
}

export async function getUserFromCookie(): Promise<JWTPayload | null> {
    const store = await cookies()
    const token = store.get(COOKIE_NAME)?.value
    if (!token) return null
    return verifyToken(token)
}

export async function clearAuthCookie() {
    const store = await cookies()
    store.delete(COOKIE_NAME)
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
    try {
        const payload = await getUserFromCookie()
        if (!payload || typeof payload.user_id !== 'number') return null

        const activeSession = await prisma.academicYear.findFirst({ where: { is_active: true } })

        const user = await prisma.user.findUnique({
            where: { id: payload.user_id },
            omit: { password: true, is_reset_password: true },
            include: {
                permissions: {
                    where: { session: activeSession?.id ?? -1 },
                    select: {
                        add: true,
                        modify: true,
                        delete: true,
                        print: true,
                        read_only: true,
                        permission_item: { select: { module_name: true, page_name: true } },
                    },
                },
            },
        })

        if (!user) return null

        const permissions = user.permissions.map((p) => ({
            module_name: p.permission_item.module_name,
            page_name: p.permission_item.page_name,
            add: p.add,
            modify: p.modify,
            delete: p.delete,
            print: p.print,
            read_only: p.read_only,
        }))

        return {
            id: user.id,
            name: user.name,
            user_name: user.user_name,
            designation: user.designation,
            email: user.email,
            mobile: user.mobile,
            profile_picture: user.profile_picture,
            is_active: user.is_active,
            permissions,
            is_admin: user.is_admin,
        }
    } catch (error) {
        return null
    }
}