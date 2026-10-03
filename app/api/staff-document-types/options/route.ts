// app/api/staff-document-types/options/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth/authorize'
import { getActiveSession } from '@/lib/auth/activeSession'


// Fetch staff document type options for the active session
export async function GET() {
    const auth = await authenticate()
    if ('response' in auth) return auth.response

    const { academic_year } = await getActiveSession()
    if (!academic_year) return NextResponse.json([])

    const documentTypes = await prisma.staffDocumentType.findMany({
        where: { session: academic_year.id },
        select: { id: true, document_type: true },
        orderBy: { document_type: 'asc' },
    })
    return NextResponse.json(documentTypes)
}
