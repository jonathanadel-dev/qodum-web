// components/modules/shared/Year/FormCom.tsx
'use client';
import moment from 'moment';
import { useRouter, usePathname } from 'next/navigation';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { useToast } from '@/components/ui/use-toast';
import { YearValidation } from '@/lib/validations/year.validation';
import { createYear, deleteYear, modifyYear, YearKind } from '@/api/sessions';
import { useYearsList } from '@/lib/hooks/useModuleData/useSessionsData';
import { useCrudForm } from '@/lib/hooks/useCrudForm';
import { usePermission } from '@/lib/hooks/usePermission';
import { emptyYear } from '@/lib/emptyRecords/emptyYear';
import DynamicField, { FieldConfig } from '@/components/shared/crud/DynamicFields';
import CrudButtons from '@/components/shared/crud/CrudButtons';
import PrintButton from '@/components/shared/crud/PrintButton';
import { CurrentUser } from '@/lib/auth/session';
import { getModuleSlug, getTabPath } from '@/lib/utils';

export default function FormCom ({ user, kind }: { user: CurrentUser | null; kind: YearKind }) {

  // Path and store
  const router = useRouter();
  const pathname = usePathname();
  const tabPath = getTabPath(pathname);
  const moduleSlug = getModuleSlug(pathname);
  const { toast } = useToast();
  const label = kind === 'academic' ? 'Academic Year' : 'Financial Year';
  const otherLabel = kind === 'academic' ? 'Financial Year' : 'Academic Year';


  // Data fetching
  const { data: years, mutate: mutateYears } = useYearsList(kind, moduleSlug);


  // Permissions
  const permissions = usePermission(user);


  // CRUD form
  const { form, mode, isLoading, save, remove, cancel } = useCrudForm({
    emptyRecord: emptyYear,
    updateSchema: YearValidation,
    actions: {
      create: async (values) => {
        if (years.some((y) => y.year_name === values.year_name)) {
          throw new Error(`${label} already exists`);
        }
        await createYear(kind, moduleSlug, values);
        toast({ title: 'Added Successfully!' });
      },
      modify: async (values) => {
        await modifyYear(kind, moduleSlug, values);
        toast({ title: 'Updated Successfully!' });
      },
      remove: async (id) => {
        await deleteYear(kind, moduleSlug, id);
        toast({ title: 'Deleted Successfully!' });
      },
    },
    onDone: () => {
      mutateYears();
      router.refresh();   // re-renders the layout so the header/footer pick up the new active session
    },
    onError: (error) => {
      toast({ title: error instanceof Error ? error.message : 'Something went wrong', variant: 'error' });
    },
  });


  // Fields
  const fields: FieldConfig[] = [
    { type: 'text', name: 'year_name', label, span: 'full' },
    { type: 'date', name: 'start_date', label: 'Start Date' },
    { type: 'date', name: 'end_date', label: 'End Date' },
    ...(mode === 'create'
      ? [{ type: 'number', name: 'upcoming', label: 'Additional Upcoming Sessions (optional)', span: 'full' } as FieldConfig]
      : []),
  ];
  const toggles: FieldConfig[] = [
    { type: 'switch', name: 'is_active', label: 'Is Active' },
    ...(mode === 'create'
      ? [{ type: 'switch', name: 'create_other', label: `Create ${otherLabel}` } as FieldConfig]
      : []),
  ];

  return (
    <div className='w-full max-w-2xl mx-auto mb-10 rounded-[8px] border border-[#E8E8E8] bg-white overflow-hidden'>
      <h2 className='w-full py-3 text-sm text-center font-bold rounded-t-lg bg-[#e7f0f7] text-main-color border-b border-[#F0F0F0]'>
        Define {label}
      </h2>
      <Form {...form}>
        <form onSubmit={save} className='flex flex-col gap-6 p-5 sm:p-8'>

          {/* Inputs */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5'>
            {fields.map((f) => <DynamicField key={f.name} field={f} control={form.control} />)}
          </div>

          {/* Toggles */}
          <div className='flex flex-wrap items-center gap-x-8 gap-y-3 pt-5 border-t border-[#F0F0F0]'>
            {toggles.map((f) => <DynamicField key={f.name} field={f} control={form.control} />)}
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
                    data={years}
                    title={`${label}s List`}
                    filename={`${label}s List`}
                    sheetName={`${label}s`}
                    columns={[
                      { title: 'Year Name', width: 100, value: (y) => y.year_name },
                      { title: 'Active', width: 75, value: (y) => (y.is_active ? 'True' : 'False') },
                      { title: 'Start Date', width: 100, value: (y) => moment(y.start_date).format('D-MMM-yy') },
                      { title: 'End Date', width: 100, value: (y) => moment(y.end_date).format('D-MMM-yy') },
                      { title: 'Created Date', width: 100, value: (y) => moment(y.created_at).format('D-MMM-yy') },
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