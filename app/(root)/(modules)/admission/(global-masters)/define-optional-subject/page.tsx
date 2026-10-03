// app/(root)/(modules)/admission/(global-masters)/define-optional-subject/page.tsx
import FormCom from '@/components/modules/admission/globalMasters/defineOptionalSubject/FormCom';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Page() {
  const user = await getCurrentUser();
  return <FormCom user={user} />;
}
