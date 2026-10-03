// app/(root)/(modules)/payroll/(global-masters)/define-document-type/page.tsx
import PrismaFormCom from '@/components/modules/payroll/globalMasters/document/documentType/FormCom';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Page() {
  const user = await getCurrentUser();
  return <PrismaFormCom user={user} />;
}
