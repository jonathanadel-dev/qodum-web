// components/modules/fees/feeMaster/defineAndAssignConcession/concession/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { ConcessionRecord } from '@/api/fees/concessions';
import { useConcessionsList } from '@/lib/hooks/useModuleData/useFeesData';
import { emptyConcession } from '@/lib/emptyRecords/fees/emptyConcession';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: concessions, isLoading } = useConcessionsList();

  return (
    <ListView<ConcessionRecord | typeof emptyConcession>
      title='Concessions List'
      data={concessions}
      isLoading={isLoading}
      emptyRecord={emptyConcession}
      tabPath={tabPath}
      columns={[
        { title: 'Concession Name', value: (concession) => concession.name },
        { title: 'Modified Date', value: (concession) => moment('updated_at' in concession ? concession.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
