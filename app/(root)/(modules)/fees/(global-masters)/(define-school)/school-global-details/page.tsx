import FormCom from '@/components/modules/fees/globalMasters/defineSchool/schoolGlobalDetails/FormCom';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Page() {

  const user = await getCurrentUser();

  return (
    <FormCom user={user} />
  );
}