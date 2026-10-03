'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import { useYearsList } from '@/lib/hooks/useModuleData/useSessionsData';
import { emptyYear } from '@/lib/emptyRecords/emptyYear';
import ListView from '@/components/shared/crud/ListView';
import { YearKind } from '@/api/sessions';
import { getModuleSlug, getTabPath } from '@/lib/utils';

export default function ViewCom ({ kind }: { kind: YearKind }) {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: years, isLoading } = useYearsList(kind, getModuleSlug(pathname));

  return (
    <ListView
      title={kind === 'academic' ? 'Academic Years List' : 'Financial Years List'}
      data={years as any[]}
      isLoading={isLoading}
      emptyRecord={emptyYear}
      tabPath={tabPath}
      columns={[
        { title: 'Year Name', value: (r) => r.year_name },
        { title: 'Is Active', value: (r) => (r.is_active ? 'True' : 'False') },
        { title: 'Start Date', value: (r) => moment(r.start_date).format('D-MMM-yy') },
        { title: 'End Date', value: (r) => moment(r.end_date).format('D-MMM-yy') },
        { title: 'Modified Date', value: (r) => moment(r.updated_at).format('D-MMM-yy') },
      ]}
    />
  );
};