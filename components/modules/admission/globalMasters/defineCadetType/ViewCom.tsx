// components/modules/admission/globalMasters/defineCadetType/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { CadetTypeRecord } from '@/api/admission/cadetTypes';
import { useCadetTypesList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyCadetType } from '@/lib/emptyRecords/admission/emptyCadetType';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: cadetTypes, isLoading } = useCadetTypesList();

  return (
    <ListView<CadetTypeRecord | typeof emptyCadetType>
      title='Cadet Types List'
      data={cadetTypes}
      isLoading={isLoading}
      emptyRecord={emptyCadetType}
      tabPath={tabPath}
      columns={[
        { title: 'Name', value: (record) => record.name },
        { title: 'Modified Date', value: (record) => moment('updated_at' in record ? record.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
