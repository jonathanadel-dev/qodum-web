// components/modules/admission/globalMasters/studentHealthMaster/defineTerm/FormCom.tsx
'use client';
import moment from 'moment';
import { mutate as globalMutate } from 'swr';
import { usePathname } from 'next/navigation';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { useToast } from '@/components/ui/use-toast';
import { TermValidation } from '@/lib/validations/admission/globalMasters/studentHealthMaster/term.validation';
import { createTerm, deleteTerm, modifyTerm } from '@/api/admission/terms';
import { useTermsList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { useCrudForm } from '@/lib/hooks/useCrudForm';
import { usePermission } from '@/lib/hooks/usePermission';
import { emptyTerm } from '@/lib/emptyRecords/admission/emptyTerm';
import DynamicField, { FieldConfig } from '@/components/shared/crud/DynamicFields';
import CrudButtons from '@/components/shared/crud/CrudButtons';
import PrintButton from '@/components/shared/crud/PrintButton';
import { CurrentUser } from '@/lib/auth/session';
import { getTabPath } from '@/lib/utils';

export default function FormCom ({ user }: { user: CurrentUser | null }) {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);
  const { toast } = useToast();


  const { data: terms, mutate: mutateTerms } = useTermsList();


  const permissions = usePermission(user);


  const { form, mode, isLoading, save, remove, cancel } = useCrudForm({
    emptyRecord: emptyTerm,
    updateSchema: TermValidation,
    actions: {
      create: async (values) => {
        if (terms.some((term) => term.term_name === values.term_name)) {
          throw new Error('Term already exists');
        }
        await createTerm(values);
        toast({ title: 'Added Successfully!' });
      },
      modify: async (values) => {
        await modifyTerm(values);
        toast({ title: 'Updated Successfully!' });
      },
      remove: async (id) => {
        await deleteTerm({ id });
        toast({ title: 'Deleted Successfully!' });
      },
    },
    onDone: () => {
      mutateTerms();
      globalMutate('health-terms-options');
    },
    onError: (error) => {
      toast({ title: error instanceof Error ? error.message : 'Something went wrong', variant: 'error' });
    },
  });


  const fields: FieldConfig[] = [
    { type: 'text', name: 'term_name', label: 'Term Name' },
  ];

  return (
    <div className='w-full max-w-xl mx-auto mb-10 rounded-[8px] border border-[#E8E8E8] bg-white overflow-hidden'>
      <h2 className='w-full py-3 text-sm text-center font-bold rounded-t-lg bg-[#e7f0f7] text-main-color border-b border-[#F0F0F0]'>
        Define Health Term
      </h2>
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
                    data={terms}
                    title='Health Terms List'
                    filename='Health Terms List'
                    sheetName='Health Terms'
                    columns={[
                      { title: 'Term Name', width: 120, value: (term: any) => term?.term_name },
                      { title: 'Modified Date', width: 100, value: (term: any) => moment(term?.updated_at).format('D-MMM-yy') },
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
