'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import { useSectionsList } from '@/lib/hooks/useModuleData/useFeesData';
import { emptySection } from '@/lib/emptyRecords/fees/emptySection';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: sections, isLoading } = useSectionsList();
  console.log(sections);

  return (
    <ListView
      title='Sections List'
      data={sections}
      isLoading={isLoading}
      emptyRecord={emptySection}
      tabPath={tabPath}
      columns={[
        { title: 'Section Name', value: (r) => r.section_name },
        { title: 'Order No.', value: (r) => r.order_no },
        { title: 'Created Date', value: (r) => moment(r.created_at).format('D-MMM-yy') },
        { title: 'Modified Date', value: (r) => moment(r.updated_at).format('D-MMM-yy') },
      ]}
    />
  );
};