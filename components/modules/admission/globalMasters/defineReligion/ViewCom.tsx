// components/modules/admission/globalMasters/defineReligion/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { ReligionRecord } from '@/api/admission/religions';
import { useReligionsList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyReligion } from '@/lib/emptyRecords/admission/emptyReligion';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: religions, isLoading } = useReligionsList();

  return (
    <ListView<ReligionRecord | typeof emptyReligion>
      title='Religions List'
      data={religions}
      isLoading={isLoading}
      emptyRecord={emptyReligion}
      tabPath={tabPath}
      columns={[
        { title: 'Religion Name', value: (religion) => religion.religion_name },
        { title: 'Modified Date', value: (religion) => moment('updated_at' in religion ? religion.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
