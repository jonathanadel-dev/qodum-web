// components/modules/admission/globalMasters/defineRemark/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { RemarkRecord } from '@/api/admission/remarks';
import { useRemarksList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyRemark } from '@/lib/emptyRecords/admission/emptyRemark';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: remarks, isLoading } = useRemarksList();

  return (
    <ListView<RemarkRecord | typeof emptyRemark>
      title='Remarks List'
      data={remarks}
      isLoading={isLoading}
      emptyRecord={emptyRemark}
      tabPath={tabPath}
      columns={[
        { title: 'Remark', value: (item) => item.remark },
        { title: 'Modified Date', value: (item) => moment('updated_at' in item ? item.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
