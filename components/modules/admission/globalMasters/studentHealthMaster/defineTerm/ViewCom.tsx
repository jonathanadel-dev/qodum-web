// components/modules/admission/globalMasters/studentHealthMaster/defineTerm/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { TermRecord } from '@/api/admission/terms';
import { useTermsList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyTerm } from '@/lib/emptyRecords/admission/emptyTerm';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: terms, isLoading } = useTermsList();

  return (
    <ListView<TermRecord | typeof emptyTerm>
      title='Health Terms List'
      data={terms}
      isLoading={isLoading}
      emptyRecord={emptyTerm}
      tabPath={tabPath}
      columns={[
        { title: 'Term Name', value: (term) => term.term_name },
        { title: 'Modified Date', value: (term) => moment('updated_at' in term ? term.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
