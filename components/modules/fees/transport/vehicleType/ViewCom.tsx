// components/modules/fees/transport/vehicleType/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { VehicleTypeRecord } from '@/api/fees/vehicleTypes';
import { useVehicleTypesList } from '@/lib/hooks/useModuleData/useFeesData';
import { emptyVehicleType } from '@/lib/emptyRecords/fees/emptyVehicleType';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom() {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: vehicleTypes, isLoading } = useVehicleTypesList();

  return (
    <ListView<VehicleTypeRecord | typeof emptyVehicleType>
      title='Vehicle Types List'
      data={vehicleTypes}
      isLoading={isLoading}
      emptyRecord={emptyVehicleType}
      tabPath={tabPath}
      columns={[
        { title: 'Vehicle Name', value: (item) => item.vehicle_name },
        { title: 'Modified Date', value: (item) => moment('updated_at' in item ? item.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
