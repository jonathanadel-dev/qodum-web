// components/modules/admission/globalMasters/defineCaste/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { CasteRecord } from '@/api/admission/castes';
import { useCastesList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyCaste } from '@/lib/emptyRecords/admission/emptyCaste';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: castes, isLoading } = useCastesList();

  return (
    <ListView<CasteRecord | typeof emptyCaste>
      title='Castes List'
      data={castes}
      isLoading={isLoading}
      emptyRecord={emptyCaste}
      tabPath={tabPath}
      columns={[
        { title: 'Caste Name', value: (record) => record.caste_name },
        { title: 'Modified Date', value: (record) => moment('updated_at' in record ? record.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
