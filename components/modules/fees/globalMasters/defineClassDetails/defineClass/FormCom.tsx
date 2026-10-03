'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { useToast } from '@/components/ui/use-toast';
import { ClassValidation } from '@/lib/validations/fees/globalMasters/defineClassDetails/class.validation';
import { createClass, deleteClass, modifyClass } from '@/api/fees/classes';
import { useClassesList, useSchoolsOptions, useWingsOptions } from '@/lib/hooks/useModuleData/useFeesData';
import { useCrudForm } from '@/lib/hooks/useCrudForm';
import { usePermission } from '@/lib/hooks/usePermission';
import { emptyClass } from '@/lib/emptyRecords/fees/emptyClass';
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
  const { data: classes, mutate: mutateClasses } = useClassesList();
  const { data: wings, isLoading: wingsLoading } = useWingsOptions();
  const { data: schools, isLoading: schoolsLoading } = useSchoolsOptions();


  // Permissions
  const permissions = usePermission(user);


  // CRUD form
  const { form, mode, isLoading, save, remove, cancel } = useCrudForm({
    emptyRecord: emptyClass,
    updateSchema: ClassValidation,
    actions: {
      create: async (values) => {
        if (classes.some((c: any) => c.class_name === values.class_name)) {
          throw new Error('Class name already exists');
        }
        await createClass(values);
        toast({ title: 'Added Successfully!' });
      },
      modify: async (values) => {
        await modifyClass(values);
        toast({ title: 'Updated Successfully!' });
      },
      remove: async (id) => {
        await deleteClass({ id });
        toast({ title: 'Deleted Successfully!' });
      },
    },
    onDone: () => {
      mutateClasses();
    },
    onError: (error) => {
      toast({ title: error instanceof Error ? error.message : 'Something went wrong', variant: 'error' });
    },
  });


  // Fields
  const fields: FieldConfig[] = [
    { type: 'text', name: 'class_name', label: 'Class Name' },
    { type: 'number', name: 'order', label: 'Order' },
    {
      type: 'select',
      name: 'wing_id',
      label: 'Wing',
      loading: wingsLoading,
      options: wings.map((w) => ({ value: String(w.id), label: w.wing })),
    },
    {
      type: 'select',
      name: 'school_id',
      label: 'School',
      loading: schoolsLoading,
      options: schools.map((s) => ({ value: String(s.id), label: s.school_name })),
    },
  ];

  return (
    <div className='w-full max-w-xl mx-auto mb-10 rounded-[8px] border border-[#E8E8E8] bg-white overflow-hidden'>
      <h2 className='w-full py-3 text-sm text-center font-bold rounded-t-lg bg-[#e7f0f7] text-main-color border-b border-[#F0F0F0]'>
        Define Class
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
                    data={classes}
                    title='Classes List'
                    filename='Classes List'
                    sheetName='Classes'
                    columns={[
                      { title: 'Class Name', width: 100, value: (c: any) => c?.class_name },
                      { title: 'Order', width: 60, value: (c: any) => c?.order },
                      { title: 'Wing', width: 100, value: (c: any) => c?.wing_label },
                      { title: 'School', width: 150, value: (c: any) => c?.school_label },
                      { title: 'Created Date', width: 100, value: (c: any) => moment(c?.created_at).format('D-MMM-yy') },
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