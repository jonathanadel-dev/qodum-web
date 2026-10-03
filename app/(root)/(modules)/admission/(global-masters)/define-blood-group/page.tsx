// app/(root)/(modules)/admission/(global-masters)/define-blood-group/page.tsx
import FormCom from '@/components/modules/admission/globalMasters/defineBloodGroup/FormCom';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Page() {
  const user = await getCurrentUser();
  return <FormCom user={user} />;
}
