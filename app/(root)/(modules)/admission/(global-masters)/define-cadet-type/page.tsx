// app/(root)/(modules)/admission/(global-masters)/define-cadet-type/page.tsx
import FormCom from '@/components/modules/admission/globalMasters/defineCadetType/FormCom';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Page() {
  const user = await getCurrentUser();
  return <FormCom user={user} />;
}
