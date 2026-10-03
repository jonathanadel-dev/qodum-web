// components/modules/admission/globalMasters/defineClub/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { ClubRecord } from '@/api/admission/clubs';
import { useClubsList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyClub } from '@/lib/emptyRecords/admission/emptyClub';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: clubs, isLoading } = useClubsList();

  return (
    <ListView<ClubRecord | typeof emptyClub>
      title='Clubs List'
      data={clubs}
      isLoading={isLoading}
      emptyRecord={emptyClub}
      tabPath={tabPath}
      columns={[
        { title: 'Club Name', value: (record) => record.name },
        { title: 'Modified Date', value: (record) => moment('updated_at' in record ? record.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
