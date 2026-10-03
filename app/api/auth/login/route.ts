// app/api/auth/login/route.ts
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { loginSchema } from "@/lib/validations/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { signToken } from '@/lib/auth/jwt';
import { setAuthCookie } from '@/lib/auth/session';
import { getActiveSession } from '@/lib/auth/activeSession';

type UserPermissionWithItem = {
  add: boolean
  modify: boolean
  delete: boolean
  print: boolean
  read_only: boolean
  permission_item: { module_name: string }
}

function buildModulePermissions(permissions: UserPermissionWithItem[] = []) {
  const map = {
    admission: false,
    fees: false,
    attendance: false,
    payroll: false,
    'marks-entry': false,
    examinations: false,
    'time-table': false,
    accounts: false,
    stocks: false,
    library: false,
    users: false,
    'qodum-care': false,
  }

  for (const permission of permissions) {
    const key = permission.permission_item.module_name

    if (key in map) {
      const hasAnyGrant =
        permission.add || permission.modify || permission.delete || permission.print || permission.read_only

      if (hasAnyGrant) {
        map[key as keyof typeof map] = true
      }
    }
  }

  return map
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const result = loginSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.flatten().fieldErrors },
                { status: 400 }
            )
        }

        const { username, password } = result.data

        const { academic_year: activeSession } = await getActiveSession()

        const user = await prisma.user.findUnique({
            where: { user_name: username },
            include: activeSession
                ? { permissions: { where: { session: activeSession.id }, include: { permission_item: true } } }
                : undefined,
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid username or password' },
                { status: 401 }
            )
        }

        const match = bcrypt.compareSync(password, user.password)

        if (!match) {
            return NextResponse.json(
                { error: 'Invalid username or password' },
                { status: 401 }
            )
        }

        const permissions = buildModulePermissions((user as any).permissions ?? [])

        const token = await signToken({
            user_id: user.id,
            user_name: user.user_name,
            is_admin: user.is_admin,
            permissions,
        })
        await setAuthCookie(token)

        return NextResponse.json(
            { user_id: user.id, user_name: user.user_name, is_admin: user.is_admin, permissions },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({ error: 'Log in: Something went wrong' }, { status: 500 })
    }
}