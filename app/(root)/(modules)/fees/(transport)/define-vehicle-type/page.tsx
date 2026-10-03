// app/(root)/(modules)/fees/(transport)/define-vehicle-type/page.tsx
import FormCom from '@/components/modules/fees/transport/vehicleType/FormCom';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Page() {
  const user = await getCurrentUser();
  return <FormCom user={user} />;
}
