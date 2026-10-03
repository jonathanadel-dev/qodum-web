// components/modules/fees/globalMasters/defineSchool/schoolGlobalDetails/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import { useSchoolsList } from '@/lib/hooks/useModuleData/useFeesData';
import { emptySchool } from '@/lib/emptyRecords/fees/emptySchool';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: schools, isLoading } = useSchoolsList();

  return (
    <ListView
      title='Schools List'
      data={schools}
      isLoading={isLoading}
      emptyRecord={emptySchool}
      tabPath={tabPath}
      columns={[
        { title: 'School Name', value: (r) => r.school_name },
        { title: 'Short Name', value: (r) => r.school_short_name ?? '' },
        { title: 'School Address', value: (r) => r.school_address },
        { title: 'Mobile', value: (r) => r.mobile ?? '' },
        { title: 'Email', value: (r) => r.email ?? '' },
        { title: 'Prefix', value: (r) => r.prefix },
        { title: 'School No.', value: (r) => r.school_no ?? '' },
        { title: 'Affiliation To', value: (r) => r.affiliation_to ?? '' },
        { title: 'Affiliation No.', value: (r) => r.affiliation_no ?? '' },
        { title: 'UDISE Code', value: (r) => r.udise_code ?? '' },
        { title: 'School Status', value: (r) => r.school_status ?? '' },
        { title: 'Created Date', value: (r) => moment(r.created_at).format('D-MMM-yy') },
      ]}
    />
  );
};