// components/modules/fees/globalMasters/defineSchool/defineSchoolBoard/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { BoardRecord } from '@/api/fees/boards';
import { useBoardsList } from '@/lib/hooks/useModuleData/useFeesData';
import { emptyBoard } from '@/lib/emptyRecords/fees/emptyBoard';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: boards, isLoading } = useBoardsList();

  return (
    <ListView<BoardRecord | typeof emptyBoard>
      title='Boards List'
      data={boards}
      isLoading={isLoading}
      emptyRecord={emptyBoard}
      tabPath={tabPath}
      columns={[
        { title: 'Board Name', value: (r) => r.board },
        { title: 'Is Default', value: (r) => r.is_default ? 'True' : 'False' },
        { title: 'Modified Date', value: (r) => moment('updated_at' in r ? r.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
