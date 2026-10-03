// components/modules/admission/globalMasters/defineNationality/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { NationalityRecord } from '@/api/admission/nationalities';
import { useNationalitiesList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyNationality } from '@/lib/emptyRecords/admission/emptyNationality';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: nationalities, isLoading } = useNationalitiesList();

  return (
    <ListView<NationalityRecord | typeof emptyNationality>
      title='Nationalities List'
      data={nationalities}
      isLoading={isLoading}
      emptyRecord={emptyNationality}
      tabPath={tabPath}
      columns={[
        { title: 'Name', value: (record) => record.name },
        { title: 'Modified Date', value: (record) => moment('updated_at' in record ? record.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
