// app/(root)/(modules)/fees/(fee-master)/(define-and-assign-concession)/define-concession-type/page.tsx
import FormCom from '@/components/modules/fees/feeMaster/defineAndAssignConcession/concessionType/FormCom';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Page() {
  const user = await getCurrentUser();
  return <FormCom user={user} />;
}
