// app/(root)/(modules)/payroll/(global-masters)/define-department/page.tsx
import FormCom from '@/components/modules/payroll/globalMasters/defineDepartment/FormCom';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Page() {
  const user = await getCurrentUser();
  return <FormCom user={user} />;
}
