// components/modules/fees/feeMaster/defineAndAssignConcession/concessionType/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { ConcessionTypeRecord } from '@/api/fees/concessionTypes';
import { useConcessionTypesList } from '@/lib/hooks/useModuleData/useFeesData';
import { emptyConcessionType } from '@/lib/emptyRecords/fees/emptyConcessionType';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: concessionTypes, isLoading } = useConcessionTypesList();

  return (
    <ListView<ConcessionTypeRecord | typeof emptyConcessionType>
      title='Concession Types List'
      data={concessionTypes}
      isLoading={isLoading}
      emptyRecord={emptyConcessionType}
      tabPath={tabPath}
      columns={[
        { title: 'Concession Type', value: (item) => item.type },
        { title: 'Modified Date', value: (item) => moment('updated_at' in item ? item.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
