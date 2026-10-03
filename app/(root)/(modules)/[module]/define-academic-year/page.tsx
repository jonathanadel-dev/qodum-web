// app/(root)/(modules)/[module]/define-academic-year/page.tsx
import { notFound } from 'next/navigation';
import FormCom from '@/components/modules/shared/Year/Form';
import { getCurrentUser } from '@/lib/auth/session';
import { resolvePermissionKey } from '@/lib/utils';

export default async function Page({ params }: { params: Promise<{ module: string }> }) {
    const { module: moduleSlug } = await params;
    if (!resolvePermissionKey(`/${moduleSlug}/define-academic-year`)) notFound();

    const user = await getCurrentUser();

    return (
        <FormCom user={user} kind='academic' />
    )
}