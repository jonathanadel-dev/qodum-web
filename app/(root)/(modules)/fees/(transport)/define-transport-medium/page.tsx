// app/(root)/(modules)/fees/(transport)/define-transport-medium/page.tsx
import FormCom from '@/components/modules/fees/transport/transportMedium/FormCom';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Page() {
  const user = await getCurrentUser();
  return <FormCom user={user} />;
}
