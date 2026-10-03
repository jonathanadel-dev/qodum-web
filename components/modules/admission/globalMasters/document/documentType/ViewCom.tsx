// components/modules/admission/globalMasters/document/documentType/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { DocumentTypeRecord } from '@/api/admission/documentTypes';
import { useDocumentTypesList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyDocumentType } from '@/lib/emptyRecords/admission/emptyDocumentType';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: documentTypes, isLoading } = useDocumentTypesList();

  return (
    <ListView<DocumentTypeRecord | typeof emptyDocumentType>
      title='Document Types List'
      data={documentTypes}
      isLoading={isLoading}
      emptyRecord={emptyDocumentType}
      tabPath={tabPath}
      columns={[
        { title: 'Document Type', value: (item) => item.document_type },
        { title: 'Modified Date', value: (item) => moment('updated_at' in item ? item.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
