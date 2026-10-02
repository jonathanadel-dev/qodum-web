// proxy.ts
import { NextRequest, NextResponse } from 'next/server'
import { JWTPayload, jwtVerify } from 'jose'

const COOKIE_NAME = 'qodum_session'

const PROTECTED_MODULES = [
    'admission', 'fees', 'attendance', 'payroll', 'marks-entry',
    'examinations', 'time-table', 'accounts', 'stocks', 'library',
    'users', 'qodum-care',
] as const

type ModuleKey = typeof PROTECTED_MODULES[number]

export type Token = JWTPayload & {
    user_id: number
    user_name: string,
    is_admin: boolean,
    permissions: Record<ModuleKey, boolean>
}

async function verifySessionToken(request: NextRequest) {
    const token = request.cookies.get(COOKIE_NAME)?.value
    if (!token) return null

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET)
        )
        return payload as Token;
    } catch {
        return null
    }
}

export async function proxy(request: NextRequest) {

    const path = request.nextUrl.pathname
    const user = await verifySessionToken(request)
    const routeKey = PROTECTED_MODULES.find(m => path.startsWith(`/${m}`))


    if (!user && path !== '/sign-in') {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    };

    if(user && path === '/sign-in') {
        return NextResponse.redirect(new URL('/', request.url))
    }
    
    if (routeKey && !user?.is_admin && !user?.permissions?.[routeKey]) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/', '/sign-in',
        '/admission/:path*',
        '/fees/:path*',
        '/attendance/:path*',
        '/payroll/:path*',
        '/marks-entry/:path*',
        '/examinations/:path*',
        '/time-table/:path*',
        '/accounts/:path*',
        '/stocks/:path*',
        '/library/:path*',
        '/users/:path*',
        '/qodum-care/:path*'
    ],
}