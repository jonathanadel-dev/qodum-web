// components/modules/accounts/globalMasters/defineNarrationMaster/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { NarrationMasterRecord } from '@/api/accounts/narrationMasters';
import { useNarrationMastersList } from '@/lib/hooks/useModuleData/useAccountsData';
import { emptyNarrationMaster } from '@/lib/emptyRecords/accounts/emptyNarrationMaster';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

const formatVoucherType = (value: string) =>
  value.replace(/([A-Z])/g, ' $1').trim();

export default function ViewCom() {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: narrations, isLoading } = useNarrationMastersList();

  return (
    <ListView<NarrationMasterRecord | typeof emptyNarrationMaster>
      title='Narrations List'
      data={narrations}
      isLoading={isLoading}
      emptyRecord={emptyNarrationMaster}
      tabPath={tabPath}
      columns={[
        { title: 'Narration', value: (item) => item.narration },
        { title: 'Voucher Type', value: (item) => formatVoucherType(item.voucher_type) },
        { title: 'Modified Date', value: (item) => moment('updated_at' in item ? item.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
