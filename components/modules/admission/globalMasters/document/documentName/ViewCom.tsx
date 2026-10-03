// components/modules/admission/globalMasters/document/documentName/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { AdmissionDocumentRecord } from '@/api/admission/documents';
import { useAdmissionDocumentsList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyDocument } from '@/lib/emptyRecords/admission/emptyDocument';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: documents, isLoading } = useAdmissionDocumentsList();

  return (
    <ListView<AdmissionDocumentRecord | typeof emptyDocument>
      title='Documents List'
      data={documents}
      isLoading={isLoading}
      emptyRecord={emptyDocument}
      tabPath={tabPath}
      columns={[
        { title: 'Document Type', value: (document) => document.document_type_label },
        { title: 'Document Name', value: (document) => document.document_name },
        { title: 'Modified Date', value: (document) => moment('updated_at' in document ? document.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
