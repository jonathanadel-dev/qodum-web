// components/modules/admission/globalMasters/defineHouse/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { HouseRecord } from '@/api/admission/houses';
import { useHousesList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyHouse } from '@/lib/emptyRecords/admission/emptyHouse';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: houses, isLoading } = useHousesList();

  return (
    <ListView<HouseRecord | typeof emptyHouse>
      title='Houses List'
      data={houses}
      isLoading={isLoading}
      emptyRecord={emptyHouse}
      tabPath={tabPath}
      columns={[
        { title: 'House Name', value: (record) => record.house_name },
        { title: 'Modified Date', value: (record) => moment('updated_at' in record ? record.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
