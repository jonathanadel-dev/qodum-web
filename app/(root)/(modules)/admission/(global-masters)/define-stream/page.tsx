// app/(root)/(modules)/admission/(global-masters)/define-stream/page.tsx
import FormCom from '@/components/modules/admission/globalMasters/defineStream/FormCom';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Page() {
  const user = await getCurrentUser();
  return <FormCom user={user} />;
}
