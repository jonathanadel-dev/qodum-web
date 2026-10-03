// components/modules/fees/transport/transportMedium/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { TransportMediumRecord } from '@/api/fees/transportMediums';
import { useTransportMediumsList } from '@/lib/hooks/useModuleData/useFeesData';
import { emptyTransportMedium } from '@/lib/emptyRecords/fees/emptyTransportMedium';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom() {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: transportMediums, isLoading } = useTransportMediumsList();

  return (
    <ListView<TransportMediumRecord | typeof emptyTransportMedium>
      title='Transport Mediums List'
      data={transportMediums}
      isLoading={isLoading}
      emptyRecord={emptyTransportMedium}
      tabPath={tabPath}
      columns={[
        { title: 'Transport Medium', value: (item) => item.transport_medium },
        { title: 'Modified Date', value: (item) => moment('updated_at' in item ? item.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
