'use client';
import moment from 'moment';
import { mutate as globalMutate } from 'swr';
import { usePathname } from 'next/navigation';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { useToast } from '@/components/ui/use-toast';
import { SchoolValidation } from '@/lib/validations/fees/globalMasters/defineSchool/schoolGlobalDetails.validation';
import { createSchool, deleteSchool, modifySchool } from '@/api/schools';
import { uploadSchoolLogo } from '@/lib/actions/image.actions';
import { useBoardsOptions, useSchoolsList } from '@/lib/hooks/useModuleData/useFeesData';
import { useCrudForm } from '@/lib/hooks/useCrudForm';
import { usePermission } from '@/lib/hooks/usePermission';
import { emptySchool } from '@/lib/emptyRecords/fees/emptySchool';
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
  const { data: schools, mutate: mutateSchools } = useSchoolsList();
  const { data: boards, isLoading: boardsLoading } = useBoardsOptions();


  // Permissions
  const permissions = usePermission(user);


  // File
  const resolveLogo = async (name: string, current: string) => {
    if (!current.startsWith('data:')) return current;
    const blob = await (await fetch(current)).blob();
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    const key = `${name.toLowerCase().replace(/\s+/g, '-')}-${randomNumber}`;
    const formData = new FormData();
    formData.append('file', blob);
    await uploadSchoolLogo({ data: formData, school_name: key });
    return `https://qodum.s3.amazonaws.com/schools/${key}`;
  };


  // CRUD form
  const { form, mode, isLoading, save, remove, cancel } = useCrudForm({
    emptyRecord: emptySchool,
    updateSchema: SchoolValidation,
    actions: {
      create: async (values) => {
        if (schools.some((s: any) => s.school_name === values.school_name)) {
          throw new Error('School already exists');
        }
        const logo = await resolveLogo(values.school_name, values.logo);
        await createSchool({
          ...values,
          logo,
          affiliation_to: values.affiliation_to || boards.find((b) => b.is_default)?.board || '',
        });
        toast({ title: 'Added Successfully!' });
      },
      modify: async (values) => {
        const logo = await resolveLogo(values.school_name, values.logo);
        await modifySchool({ ...values, logo });
        toast({ title: 'Updated Successfully!' });
      },
      remove: async (id) => {
        await deleteSchool({ id });
        toast({ title: 'Deleted Successfully!' });
      },
    },
    onDone: () => {
      mutateSchools();
      globalMutate('schools-options');   // keeps the schools dropdown on the users page in sync
    },
    onError: (error) => {
      toast({ title: error instanceof Error ? error.message : 'Something went wrong', variant: 'error' });
    },
  });


  // On change
  const logo = form.watch('logo');
  const handleOnChange = (e: any) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => form.setValue('logo', ev.target?.result as string);
    reader.readAsDataURL(f);
  };


  // Fields
  const fields: FieldConfig[] = [
    { type: 'text', name: 'school_name', label: 'School Name' },
    { type: 'text', name: 'school_short_name', label: 'School Short Name' },
    { type: 'text', name: 'school_address', label: 'School Address', span: 'full' },
    { type: 'text', name: 'school_address_2', label: 'School Address 2', span: 'full' },
    { type: 'text', name: 'contact_no', label: 'Contact No.' },
    { type: 'text', name: 'mobile', label: 'Mobile' },
    { type: 'text', name: 'email', label: 'Email' },
    { type: 'text', name: 'support_email_id', label: 'Support Email Id' },
    { type: 'text', name: 'website', label: 'Website' },
    { type: 'text', name: 'prefix', label: 'Prefix' },
    { type: 'text', name: 'iso_details', label: 'ISO Details' },
    { type: 'text', name: 'school_no', label: 'School No.' },
    {
      type: 'select',
      name: 'affiliation_to',
      label: 'Affiliation To',
      loading: boardsLoading,
      options: boards.map((b) => ({ value: b.board, label: b.board })),
    },
    { type: 'text', name: 'affiliation_no', label: 'Affiliation No.' },
    { type: 'text', name: 'udise_code', label: 'UDISE Code' },
    { type: 'text', name: 'pen', label: 'PEN' },
    { type: 'text', name: 'associates', label: 'Associates' },
    { type: 'text', name: 'renew_up_to', label: 'Renew Up To' },
    { type: 'text', name: 'school_status', label: 'School Status' },
    { type: 'text', name: 'working_days', label: 'Working Days' },
    { type: 'text', name: 'recess', label: 'Recess' },
    { type: 'text', name: 'total_period', label: 'Total Period' },
    { type: 'text', name: 'principal_signature', label: 'Principal Signature' },
    { type: 'text', name: 'accountant_signature', label: 'Accountant Signature' },
    { type: 'text', name: 'facebook_link', label: 'Facebook Link' },
    { type: 'text', name: 'linkedin_link', label: 'LinkedIn Link' },
    { type: 'text', name: 'twitter_link', label: 'Twitter Link' },
    { type: 'text', name: 'instagram_link', label: 'Instagram Link' },
  ];
  const toggles: FieldConfig[] = [
    { type: 'switch', name: 'school_main', label: 'School Main' },
    { type: 'switch', name: 'school_subheads', label: 'School Subheads' },
  ];

  return (
    <div className='w-full max-w-3xl mx-auto mb-10 rounded-[8px] border border-[#E8E8E8] bg-white overflow-hidden'>
      <h2 className='w-full py-3 text-sm text-center font-bold rounded-t-lg bg-[#e7f0f7] text-main-color border-b border-[#F0F0F0]'>
        School Details
      </h2>
      <Form {...form}>
        <form onSubmit={save} className='flex flex-col gap-6 p-5 sm:p-8'>

          {/* Logo */}
          <div className='flex flex-col items-start gap-2'>
            <p className='text-[11px] font-medium text-[#726E71]'>Logo</p>
            <div className='w-24 h-24 flex items-center justify-center bg-[#ccc] rounded-md cursor-pointer transition hover:opacity-90'>
              <label htmlFor='logo' className='flex items-center justify-center h-full w-full cursor-pointer text-xs font-semibold'>
                {logo ? <img alt="School's logo" src={logo} className='w-full h-full object-cover rounded-md' />
                  : <p className='text-[10px] text-center px-2'>Select Logo</p>}
              </label>
              <input type='file' accept='image/*' name='logo' id='logo' className='hidden' onChange={handleOnChange} />
            </div>
          </div>

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
                    data={schools}
                    title='Schools Details List'
                    filename='Schools Details List'
                    sheetName='Schools'
                    columns={[
                      { title: 'School Name', width: 150, value: (s: any) => s?.school_name },
                      { title: 'School Address', width: 200, value: (s: any) => s?.school_address },
                      { title: 'Mobile', width: 100, value: (s: any) => s?.mobile },
                      { title: 'Email', width: 150, value: (s: any) => s?.email },
                      { title: 'Support Email', width: 150, value: (s: any) => s?.support_email_id },
                      { title: 'Website', width: 150, value: (s: any) => s?.website },
                      { title: 'Prefix', width: 75, value: (s: any) => s?.prefix },
                      { title: 'School No.', width: 100, value: (s: any) => s?.school_no },
                      { title: 'Affiliation No.', width: 100, value: (s: any) => s?.affiliation_no },
                      { title: 'UDISE Code', width: 100, value: (s: any) => s?.udise_code },
                      { title: 'PEN', width: 100, value: (s: any) => s?.pen },
                      { title: 'Renew Up To', width: 100, value: (s: any) => s?.renew_up_to },
                      { title: 'School Status', width: 100, value: (s: any) => s?.school_status },
                      { title: 'Short Name', width: 100, value: (s: any) => s?.school_short_name },
                      { title: 'ISO Details', width: 100, value: (s: any) => s?.iso_details },
                      { title: 'Recess', width: 75, value: (s: any) => s?.recess },
                      { title: 'Total Period', width: 75, value: (s: any) => s?.total_period },
                      { title: 'Working Days', width: 75, value: (s: any) => s?.working_days },
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