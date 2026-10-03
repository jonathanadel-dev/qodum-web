// app/(root)/(modules)/accounts/(global-masters)/define-narration-master/page.tsx
import FormCom from '@/components/modules/accounts/globalMasters/defineNarrationMaster/FormCom';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Page() {
  const user = await getCurrentUser();
  return <FormCom user={user} />;
}
