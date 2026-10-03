// components/modules/admission/globalMasters/defineStream/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { StreamRecord } from '@/api/admission/streams';
import { useStreamsList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyStream } from '@/lib/emptyRecords/admission/emptyStream';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: streams, isLoading } = useStreamsList();

  return (
    <ListView<StreamRecord | typeof emptyStream>
      title='Streams List'
      data={streams}
      isLoading={isLoading}
      emptyRecord={emptyStream}
      tabPath={tabPath}
      columns={[
        { title: 'Stream Name', value: (stream) => stream.stream_name },
        { title: 'Modified Date', value: (stream) => moment('updated_at' in stream ? stream.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
