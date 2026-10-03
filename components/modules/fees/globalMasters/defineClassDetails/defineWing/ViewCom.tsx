'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { WingRecord } from '@/api/fees/wings';
import { useWingsList } from '@/lib/hooks/useModuleData/useFeesData';
import { emptyWing } from '@/lib/emptyRecords/fees/emptyWing';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: wings, isLoading } = useWingsList();

  return (
    <ListView<WingRecord | typeof emptyWing>
      title='Wings List'
      data={wings}
      isLoading={isLoading}
      emptyRecord={emptyWing}
      tabPath={tabPath}
      columns={[
        { title: 'Wing Name', value: (r) => r.wing },
        { title: 'Modified Date', value: (r) => moment(r.updated_at).format('D-MMM-yy') },
      ]}
    />
  );
}
