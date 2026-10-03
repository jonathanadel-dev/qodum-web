// components/modules/admission/globalMasters/defineOptionalSubject/ViewCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import type { OptionalSubjectRecord } from '@/api/admission/optionalSubjects';
import { useOptionalSubjectsList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { emptyOptionalSubject } from '@/lib/emptyRecords/admission/emptyOptionalSubject';
import ListView from '@/components/shared/crud/ListView';
import { getTabPath } from '@/lib/utils';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { data: subjects, isLoading } = useOptionalSubjectsList();

  return (
    <ListView<OptionalSubjectRecord | typeof emptyOptionalSubject>
      title='Optional Subjects List'
      data={subjects}
      isLoading={isLoading}
      emptyRecord={emptyOptionalSubject}
      tabPath={tabPath}
      columns={[
        { title: 'Subject Name', value: (subject) => subject.subject_name },
        { title: 'Modified Date', value: (subject) => moment('updated_at' in subject ? subject.updated_at : '').format('D-MMM-yy') },
      ]}
    />
  );
}
