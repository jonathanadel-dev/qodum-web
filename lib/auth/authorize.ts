import { NextResponse } from 'next/server'
import { getCurrentUser, CurrentUser } from '@/lib/auth/session'


// Types
type Action = 'add' | 'modify' | 'delete' | 'print' | 'read_only' | 'any'
type AuthResult = { user: CurrentUser } | { response: NextResponse }


// Authorize
export async function authorize( module_name: string, page_name: string, action: Action ): Promise<AuthResult> {

    // Verifying the user exists and is active
    const user = await getCurrentUser()
    if (!user) {
        return { response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
    }
    if (user.is_active === false) {
        return { response: NextResponse.json({ error: 'Account is inactive' }, { status: 403 }) }
    }


    // Check if the user has the right permissions
    if (user.is_admin) return { user }
    const grant = user.permissions.find((p) => p.module_name === module_name && p.page_name === page_name)
    const allowed = !grant
        ? false
        : action === 'any'
            ? grant.add || grant.modify || grant.delete || grant.print || grant.read_only
            : grant[action]


    // Response
    if (!allowed) {
        return { response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
    }
    return { user }
}