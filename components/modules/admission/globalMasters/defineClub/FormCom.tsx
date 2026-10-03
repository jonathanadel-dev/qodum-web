// components/modules/admission/globalMasters/defineClub/FormCom.tsx
'use client';
import moment from 'moment';
import { mutate as globalMutate } from 'swr';
import { usePathname } from 'next/navigation';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { useToast } from '@/components/ui/use-toast';
import { ClubValidation } from '@/lib/validations/admission/globalMasters/club.validation';
import { createClub, deleteClub, modifyClub } from '@/api/admission/clubs';
import { useClubsList } from '@/lib/hooks/useModuleData/useAdmissionData';
import { useCrudForm } from '@/lib/hooks/useCrudForm';
import { usePermission } from '@/lib/hooks/usePermission';
import { emptyClub } from '@/lib/emptyRecords/admission/emptyClub';
import DynamicField, { FieldConfig } from '@/components/shared/crud/DynamicFields';
import CrudButtons from '@/components/shared/crud/CrudButtons';
import PrintButton from '@/components/shared/crud/PrintButton';
import { CurrentUser } from '@/lib/auth/session';
import { getTabPath } from '@/lib/utils';

export default function FormCom ({ user }: { user: CurrentUser | null }) {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);
  const { toast } = useToast();


  const { data: clubs, mutate: mutateClubs } = useClubsList();


  const permissions = usePermission(user);


  const { form, mode, isLoading, save, remove, cancel } = useCrudForm({
    emptyRecord: emptyClub,
    updateSchema: ClubValidation,
    actions: {
      create: async (values) => {
        if (clubs.some((record) => record.name === values.name)) {
          throw new Error('Club already exists');
        }
        await createClub(values);
        toast({ title: 'Added Successfully!' });
      },
      modify: async (values) => {
        await modifyClub(values);
        toast({ title: 'Updated Successfully!' });
      },
      remove: async (id) => {
        await deleteClub({ id });
        toast({ title: 'Deleted Successfully!' });
      },
    },
    onDone: () => {
      mutateClubs();
      globalMutate('clubs-options');
    },
    onError: (error) => {
      toast({ title: error instanceof Error ? error.message : 'Something went wrong', variant: 'error' });
    },
  });


  const fields: FieldConfig[] = [
    { type: 'text', name: 'name', label: 'Name' },
  ];

  return (
    <div className='w-full max-w-xl mx-auto mb-10 rounded-[8px] border border-[#E8E8E8] bg-white overflow-hidden'>
      <h2 className='w-full py-3 text-sm text-center font-bold rounded-t-lg bg-[#e7f0f7] text-main-color border-b border-[#F0F0F0]'>
        Define Club
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
                    data={clubs}
                    title='Clubs List'
                    filename='Clubs List'
                    sheetName='Clubs'
                    columns={[
                      { title: 'Club Name', width: 120, value: (record: any) => record?.name },
                      { title: 'Modified Date', width: 100, value: (record: any) => moment(record?.updated_at).format('D-MMM-yy') },
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
