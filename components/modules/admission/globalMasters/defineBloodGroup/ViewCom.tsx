// components/modules/admission/globalMasters/defineBloodGroup/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { BloodGroupRecord } from '@/api/admission/bloodGroups';
import { useBloodGroupsList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyBloodGroup } from '@/lib/emptyRecords/admission/emptyBloodGroup';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: bloodGroups, isLoading } = useBloodGroupsList();

  return (
    <ListView<BloodGroupRecord | typeof emptyBloodGroup>
      title='Blood Groups List'
      data={bloodGroups}
      isLoading={isLoading}
      emptyRecord={emptyBloodGroup}
      tabPath={tabPath}
      columns={[
        { title: 'Blood Group', value: (record) => record.blood_group },
        { title: 'Modified Date', value: (record) => moment('updated_at' in record ? record.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
