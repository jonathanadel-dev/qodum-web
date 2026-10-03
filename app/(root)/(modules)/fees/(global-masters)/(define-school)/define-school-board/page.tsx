// app/(root)/(modules)/fees/(global-masters)/(define-school)/define-school-board/page.tsx
import FormCom from '@/components/modules/fees/globalMasters/defineSchool/defineSchoolBoard/FormCom';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Page() {
  const user = await getCurrentUser();
  return <FormCom user={user} />;
}
