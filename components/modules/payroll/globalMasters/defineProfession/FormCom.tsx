// components/modules/payroll/globalMasters/defineProfession/FormCom.tsx
'use client';
import moment from 'moment';
import { mutate as globalMutate } from 'swr';
import { usePathname } from 'next/navigation';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { useToast } from '@/components/ui/use-toast';
import { ProfessionValidation } from '@/lib/validations/payroll/globalMasters/preofession.validation';
import { createProfession, deleteProfession, modifyProfession } from '@/api/payroll/professions';
import { useProfessionsList } from '@/lib/hooks/useModuleData/sePayrollData';
import { useCrudForm } from '@/lib/hooks/useCrudForm';
import { usePermission } from '@/lib/hooks/usePermission';
import { emptyProfession } from '@/lib/emptyRecords/payroll/emptyProfession';
import DynamicField, { FieldConfig } from '@/components/shared/crud/DynamicFields';
import CrudButtons from '@/components/shared/crud/CrudButtons';
import PrintButton from '@/components/shared/crud/PrintButton';
import { CurrentUser } from '@/lib/auth/session';
import { getTabPath } from '@/lib/utils';

export default function FormCom({ user }: { user: CurrentUser | null }) {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);
  const { toast } = useToast();


  const { data: professions, mutate: mutateProfessions } = useProfessionsList();


  const permissions = usePermission(user);


  const { form, mode, isLoading, save, remove, cancel } = useCrudForm({
    emptyRecord: emptyProfession,
    updateSchema: ProfessionValidation,
    actions: {
      create: async (values) => {
        if (professions.some((item) => item.profession === values.profession)) {
          throw new Error('Profession already exists');
        }
        await createProfession(values);
        toast({ title: 'Added Successfully!' });
      },
      modify: async (values) => {
        await modifyProfession(values);
        toast({ title: 'Updated Successfully!' });
      },
      remove: async (id) => {
        await deleteProfession({ id });
        toast({ title: 'Deleted Successfully!' });
      },
    },
    onDone: () => {
      mutateProfessions();
      globalMutate('professions-options');
    },
    onError: (error) => {
      toast({ title: error instanceof Error ? error.message : 'Something went wrong', variant: 'error' });
    },
  });


  const fields: FieldConfig[] = [
    { type: 'text', name: 'profession', label: 'Profession' },
  ];

  return (
    <div className='w-full max-w-xl mx-auto mb-10 rounded-[8px] border border-[#E8E8E8] bg-white overflow-hidden'>
      <h2 className='w-full py-3 text-sm text-center font-bold rounded-t-lg bg-[#e7f0f7] text-main-color border-b border-[#F0F0F0]'>
        Define Profession
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
                    data={professions}
                    title='Professions List'
                    filename='Professions List'
                    sheetName='Professions'
                    columns={[
                      { title: 'Profession', width: 120, value: (item: any) => item?.profession },
                      { title: 'Modified Date', width: 100, value: (item: any) => moment(item?.updated_at).format('D-MMM-yy') },
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
