// components/modules/payroll/globalMasters/document/documentType/PrismaViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { StaffDocumentTypeRecord } from '@/api/payroll/staffDocumentTypes';
import { useStaffDocumentTypesList } from '@/lib/hooks/useModuleData/sePayrollData';
import { emptyStaffDocumentType } from '@/lib/emptyRecords/payroll/emptyStaffDocumentType';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function PrismaViewCom() {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: documentTypes, isLoading } = useStaffDocumentTypesList();

  return (
    <ListView<StaffDocumentTypeRecord | typeof emptyStaffDocumentType>
      title='Staff Document Types List'
      data={documentTypes}
      isLoading={isLoading}
      emptyRecord={emptyStaffDocumentType}
      tabPath={tabPath}
      columns={[
        { title: 'Document Type', value: (item) => item.document_type },
        { title: 'Modified Date', value: (item) => moment('updated_at' in item ? item.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
