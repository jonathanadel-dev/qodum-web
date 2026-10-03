import HomePage from '@/components/layout/homeLayout';
import { getActiveSession } from '@/lib/auth/activeSession';
import { getCurrentUser } from '@/lib/auth/session';


export default async function Page () {

  const [user, session] = await Promise.all([getCurrentUser(), getActiveSession()]);


  return (
    <HomePage user={user} session={session} />
  );
};