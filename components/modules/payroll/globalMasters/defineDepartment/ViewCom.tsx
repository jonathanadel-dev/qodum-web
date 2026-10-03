// components/modules/payroll/globalMasters/defineDepartment/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { DepartmentRecord } from '@/api/payroll/departments';
import { useDepartmentsList } from '@/lib/hooks/useModuleData/sePayrollData';
import { emptyDepartment } from '@/lib/emptyRecords/payroll/emptyDepartment';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom() {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: departments, isLoading } = useDepartmentsList();

  return (
    <ListView<DepartmentRecord | typeof emptyDepartment>
      title='Departments List'
      data={departments}
      isLoading={isLoading}
      emptyRecord={emptyDepartment}
      tabPath={tabPath}
      columns={[
        { title: 'Department', value: (item) => item.department },
        { title: 'Modified Date', value: (item) => moment('updated_at' in item ? item.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
