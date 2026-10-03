// components/modules/payroll/globalMasters/defineProfession/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { ProfessionRecord } from '@/api/payroll/professions';
import { useProfessionsList } from '@/lib/hooks/useModuleData/sePayrollData';
import { emptyProfession } from '@/lib/emptyRecords/payroll/emptyProfession';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom() {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: professions, isLoading } = useProfessionsList();

  return (
    <ListView<ProfessionRecord | typeof emptyProfession>
      title='Professions List'
      data={professions}
      isLoading={isLoading}
      emptyRecord={emptyProfession}
      tabPath={tabPath}
      columns={[
        { title: 'Profession', value: (item) => item.profession },
        { title: 'Modified Date', value: (item) => moment('updated_at' in item ? item.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
