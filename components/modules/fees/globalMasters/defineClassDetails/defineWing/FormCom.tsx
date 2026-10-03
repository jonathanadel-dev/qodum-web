'use client';
import moment from 'moment';
import { mutate as globalMutate } from 'swr';
import { usePathname } from 'next/navigation';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { useToast } from '@/components/ui/use-toast';
import { WingValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/wing.validation';
import { createWing, deleteWing, modifyWing } from '@/api/fees/wings';
import { useWingsList } from '@/lib/hooks/useModuleData/useFeesData';
import { useCrudForm } from '@/lib/hooks/useCrudForm';
import { usePermission } from '@/lib/hooks/usePermission';
import { emptyWing } from '@/lib/emptyRecords/fees/emptyWing';
import DynamicField, { FieldConfig } from '@/components/shared/crud/DynamicFields';
import CrudButtons from '@/components/shared/crud/CrudButtons';
import PrintButton from '@/components/shared/crud/PrintButton';
import { CurrentUser } from '@/lib/auth/session';
import { getTabPath } from '@/lib/utils';

export default function FormCom ({ user }: { user: CurrentUser | null }) {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);
  const { toast } = useToast();


  const { data: wings, mutate: mutateWings } = useWingsList();


  const permissions = usePermission(user);


  const { form, mode, isLoading, save, remove, cancel } = useCrudForm({
    emptyRecord: emptyWing,
    updateSchema: WingValidation,
    actions: {
      create: async (values) => {
        if (wings.some((w) => w.wing === values.wing)) {
          throw new Error('Wing already exists');
        }
        await createWing(values);
        toast({ title: 'Added Successfully!' });
      },
      modify: async (values) => {
        await modifyWing(values);
        toast({ title: 'Updated Successfully!' });
      },
      remove: async (id) => {
        await deleteWing({ id });
        toast({ title: 'Deleted Successfully!' });
      },
    },
    onDone: () => {
      mutateWings();
      globalMutate('wings-options');
    },
    onError: (error) => {
      toast({ title: error instanceof Error ? error.message : 'Something went wrong', variant: 'error' });
    },
  });


  const fields: FieldConfig[] = [
    { type: 'text', name: 'wing', label: 'Wing Name' },
  ];

  return (
    <div className='w-full max-w-xl mx-auto mb-10 rounded-[8px] border border-[#E8E8E8] bg-white overflow-hidden'>
      <h2 className='w-full py-3 text-sm text-center font-bold rounded-t-lg bg-[#e7f0f7] text-main-color border-b border-[#F0F0F0]'>
        Define Wing
      </h2>
      <Form {...form}>
        <form onSubmit={save} className='flex flex-col gap-6 p-5 sm:p-8'>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5'>
            {fields.map((f) => <DynamicField key={f.name} field={f} control={form.control} />)}
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
                    data={wings}
                    title='Wings List'
                    filename='Wings List'
                    sheetName='Wings'
                    columns={[
                      { title: 'Wing Name', width: 100, value: (w: any) => w?.wing },
                      { title: 'Modified Date', width: 100, value: (w: any) => moment(w?.updated_at).format('D-MMM-yy') },
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
