// components/modules/admission/globalMasters/document/documentName/FormCom.tsx
'use client';
import moment from 'moment';
import Link from 'next/link';
import { mutate as globalMutate } from 'swr';
import { usePathname } from 'next/navigation';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { useToast } from '@/components/ui/use-toast';
import { DocumentCrudValidation } from '@/lib/validations/admission/globalMasters/document/documentCrud.validation';
import { createAdmissionDocument, deleteAdmissionDocument, modifyAdmissionDocument } from '@/api/admission/documents';
import { useAdmissionDocumentsList, useDocumentTypesOptions } from '@/lib/hooks/useModuleData/useAdmissionData';
import { useCrudForm } from '@/lib/hooks/useCrudForm';
import { usePermission } from '@/lib/hooks/usePermission';
import { emptyDocument } from '@/lib/emptyRecords/admission/emptyDocument';
import DynamicField, { FieldConfig } from '@/components/shared/crud/DynamicFields';
import CrudButtons from '@/components/shared/crud/CrudButtons';
import PrintButton from '@/components/shared/crud/PrintButton';
import { CurrentUser } from '@/lib/auth/session';
import { getTabPath } from '@/lib/utils';

export default function FormCom ({ user }: { user: CurrentUser | null }) {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);
  const typeTabPath = tabPath.replace('/define-document', '/define-document-type');
  const { toast } = useToast();


  const { data: documents, mutate: mutateDocuments } = useAdmissionDocumentsList();
  const { data: documentTypes, isLoading: isLoadingDocumentTypes } = useDocumentTypesOptions();


  const permissions = usePermission(user, '/admission/define-document-type');


  const { form, mode, isLoading, save, remove, cancel, record } = useCrudForm({
    emptyRecord: emptyDocument,
    updateSchema: DocumentCrudValidation,
    actions: {
      create: async (values) => {
        if (documents.some((document) => document.document_name === values.document_name)) {
          throw new Error('Document name already exists');
        }
        await createAdmissionDocument(values);
        toast({ title: 'Added Successfully!' });
      },
      modify: async (values) => {
        if (documents.some((document) => document.id !== Number(record.id) && document.document_name === values.document_name)) {
          throw new Error('Document name already exists');
        }
        await modifyAdmissionDocument(values);
        toast({ title: 'Updated Successfully!' });
      },
      remove: async (id) => {
        await deleteAdmissionDocument({ id });
        toast({ title: 'Deleted Successfully!' });
      },
    },
    onDone: () => {
      mutateDocuments();
      globalMutate('admission-document-types-options');
    },
    onError: (error) => {
      toast({ title: error instanceof Error ? error.message : 'Something went wrong', variant: 'error' });
    },
  });


  const fields: FieldConfig[] = [
    {
      type: 'select',
      name: 'document_type_id',
      label: 'Document Type',
      options: documentTypes.map((item) => ({ value: String(item.id), label: item.document_type })),
      loading: isLoadingDocumentTypes,
    },
    { type: 'text', name: 'document_name', label: 'Document Name' },
  ];

  return (
    <div className='w-full max-w-xl mx-auto mb-10 rounded-[8px] border border-[#E8E8E8] bg-white overflow-hidden'>
      <h2 className='w-full py-3 text-sm text-center font-bold rounded-t-lg bg-[#e7f0f7] text-main-color border-b border-[#F0F0F0]'>
        Define Document
      </h2>
      <div className='flex justify-center border-b border-[#F0F0F0] py-3'>
        <Link href={typeTabPath} className='px-4 py-2 rounded-full text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE]'>
          Manage Document Types
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={save} className='flex flex-col gap-6 p-5 sm:p-8'>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5'>
            {fields.map((field) => <DynamicField key={field.name} field={field} control={form.control} />)}
          </div>

          <div className='flex justify-center pt-5 border-t border-[#F0F0F0]'>
            {isLoading ? <LoadingIcon /> : (
              <CrudButtons
                mode={mode}
                permissions={permissions}
                viewHref={`${tabPath}/view`}
                onSave={save}
                onDelete={remove}
                onCancel={cancel}
                printSlot={
                  <PrintButton
                    data={documents}
                    title='Documents List'
                    filename='Documents List'
                    sheetName='Documents'
                    columns={[
                      { title: 'Document Type', width: 120, value: (document: any) => document?.document_type_label },
                      { title: 'Document Name', width: 120, value: (document: any) => document?.document_name },
                      { title: 'Modified Date', width: 100, value: (document: any) => moment(document?.updated_at).format('D-MMM-yy') },
                    ]}
                  />
                }
              />
            )}
          </div>

        </form>
      </Form>
    </div>
  );
}
