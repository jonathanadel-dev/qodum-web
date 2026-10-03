import { notFound } from 'next/navigation';
import ViewCom from '@/components/modules/shared/Year/View';
import { resolvePermissionKey } from '@/lib/utils';

export default async function Page({ params }: { params: Promise<{ module: string }> }) {
    const { module: moduleSlug } = await params;
    if (!resolvePermissionKey(`/${moduleSlug}/define-financial-year`)) notFound();

    return (
        <ViewCom kind='financial' />
    );
}