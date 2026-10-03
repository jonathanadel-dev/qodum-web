'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import { useClassesList } from '@/lib/hooks/useModuleData/useFeesData';
import { emptyClass } from '@/lib/emptyRecords/fees/emptyClass';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: classes, isLoading } = useClassesList();

  return (
    <ListView
      title='Classes List'
      data={classes}
      isLoading={isLoading}
      emptyRecord={emptyClass}
      tabPath={tabPath}
      columns={[
        { title: 'Class Name', value: (r) => r.class_name },
        { title: 'Order', value: (r) => r.order },
        { title: 'Wing', value: (r) => r.wing_label ?? '' },
        { title: 'School', value: (r) => r.school_label ?? '' },
        { title: 'Modified Date', value: (r) => moment(r.updated_at).format('D-MMM-yy') },
      ]}
    />
  );
};