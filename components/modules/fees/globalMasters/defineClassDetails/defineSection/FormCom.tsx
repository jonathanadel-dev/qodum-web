'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { useToast } from '@/components/ui/use-toast';
import { SectionValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/section.validation';
import { createSection, deleteSection, modifySection } from '@/api/fees/sections';
import { useSectionsList } from '@/lib/hooks/useModuleData/useFeesData';
import { useCrudForm } from '@/lib/hooks/useCrudForm';
import { usePermission } from '@/lib/hooks/usePermission';
import { emptySection } from '@/lib/emptyRecords/fees/emptySection';
import DynamicField, { FieldConfig } from '@/components/shared/crud/DynamicFields';
import CrudButtons from '@/components/shared/crud/CrudButtons';
import PrintButton from '@/components/shared/crud/PrintButton';
import { CurrentUser } from '@/lib/auth/session';
import { getTabPath } from '@/lib/utils';

export default function FormCom ({ user }: { user: CurrentUser | null }) {

  // Path and store
  const pathname = usePathname();
  const tabPath = getTabPath(pathname);
  const { toast } = useToast();


  // Data fetching
  const { data: sections, mutate: mutateSections } = useSectionsList();


  // Permissions
  const permissions = usePermission(user);


  // CRUD form
  const { form, mode, isLoading, save, remove, cancel } = useCrudForm({
    emptyRecord: emptySection,
    updateSchema: SectionValidation,
    actions: {
      create: async (values) => {
        if (sections.some((s: any) => s.section_name === values.section_name)) {
          throw new Error('Section name already exists');
        }
        await createSection(values);
        toast({ title: 'Added Successfully!' });
      },
      modify: async (values) => {
        await modifySection(values);
        toast({ title: 'Updated Successfully!' });
      },
      remove: async (id) => {
        await deleteSection({ id });
        toast({ title: 'Deleted Successfully!' });
      },
    },
    onDone: () => {
      mutateSections();
    },
    onError: (error) => {
      toast({ title: error instanceof Error ? error.message : 'Something went wrong', variant: 'error' });
    },
  });


  // Fields
  const fields: FieldConfig[] = [
    { type: 'text', name: 'section_name', label: 'Section Name' },
    { type: 'number', name: 'order_no', label: 'Order No.' },
  ];

  return (
    <div className='w-full max-w-xl mx-auto mb-10 rounded-[8px] border border-[#E8E8E8] bg-white overflow-hidden'>
      <h2 className='w-full py-3 text-sm text-center font-bold rounded-t-lg bg-[#e7f0f7] text-main-color border-b border-[#F0F0F0]'>
        Define Section
      </h2>
      <Form {...form}>
        <form onSubmit={save} className='flex flex-col gap-6 p-5 sm:p-8'>

          {/* Inputs */}
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
                    data={sections}
                    title='Sections List'
                    filename='Sections List'
                    sheetName='Sections'
                    columns={[
                      { title: 'Section Name', width: 100, value: (s: any) => s?.section_name },
                      { title: 'Order No.', width: 75, value: (s: any) => s?.order_no },
                      { title: 'Created Date', width: 100, value: (s: any) => moment(s?.created_at).format('D-MMM-yy') },
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
};