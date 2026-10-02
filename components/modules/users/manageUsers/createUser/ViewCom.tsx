'use client';
import { usePathname } from 'next/navigation';
import { useUsersList } from '@/lib/hooks/useModuleData/useUsersData';
import { emptyUser } from '@/lib/emptyRecords/users/emptyUser';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: users, isLoading } = useUsersList();

  return (
    <ListView
      title='Users List'
      data={users}
      isLoading={isLoading}
      emptyRecord={emptyUser}
      tabPath={tabPath}
      hidden={["profile_picture", "enable_otp", "schools"]}
    />
  );
};