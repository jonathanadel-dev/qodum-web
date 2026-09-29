// components/modules/users/manageUsers/createUser/FormCom.tsx
'use client';
import { usePathname } from 'next/navigation';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { useToast } from '@/components/ui/use-toast';
import { CreateUserValidation, UpdateUserValidation } from '@/lib/validations/users/manageUsers/user.validation';
import { createUser, deleteUser, modifyUser } from '@/api/users';
import { uploadUserImage } from '@/lib/actions/image.actions';
import { useUsersList, useSchoolsList } from '@/lib/hooks/useData';
import { useCrudForm } from '@/lib/hooks/useCrudForm';
import { usePermission } from '@/lib/hooks/usePermission';
import { useFieldState } from '@/store/pageStateStore';
import { emptyUser } from '@/lib/emptyRecords/emptyUser';
import DynamicField, { FieldConfig } from '@/components/shared/crud/DynamicFields';
import CrudButtons from '@/components/shared/crud/CrudButtons';
import { CurrentUser } from '@/lib/auth/session';
import PrintButton from '@/components/shared/crud/PrintButton';
import moment from 'moment';
import { getTabPath } from '@/lib/utils';

export default function FormCom ({ user }: { user: CurrentUser | null }) {

  // Path and store
  const pathname = usePathname();
  const tabPath = getTabPath(pathname);
  const [file, setFile] = useFieldState<any>('file', null, tabPath);
  const [imgSrc, setImgSrc] = useFieldState('imgSrc', '', tabPath);
  const { toast } = useToast();


  // Data fetching
  const { data: users, mutate: mutateUsers } = useUsersList();
  const { data: schools } = useSchoolsList();


  // Permissions
  const permissions = usePermission(user);


  // File
  const resolveProfilePicture = async (name: string, existing: string) => {
    if (!file) return existing;
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    const key = `${name.toLowerCase().replace(/\s+/g, '-')}-${randomNumber}`;
    const formData = new FormData();
    formData.append('file', file);
    await uploadUserImage({ data: formData, name: key });
    return `https://qodum.s3.amazonaws.com/users/${key}`;
  };
  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (ev) => setImgSrc(ev.target?.result as string);
    reader.readAsDataURL(e.target.files[0]);
  };


  // CRUD form
  const { form, mode, isLoading, save, remove, cancel, record } = useCrudForm({
    emptyRecord: emptyUser,
    updateSchema: UpdateUserValidation,
    createSchema: CreateUserValidation,
    actions: {
      create: async (values) => {
        if (users.map((r: any) => r.user_name).includes(values.user_name)) {
          throw new Error('User already exists');
        }
        const profile_picture = await resolveProfilePicture(values.name, '');
        await createUser({ ...values, profile_picture });
        toast({ title: 'Added Successfully!' });
      },
      modify: async (values) => {
        const profile_picture = await resolveProfilePicture(values.name, record.profile_picture);
        await modifyUser({
          ...values,
          profile_picture,
          password: values.password || undefined,
        });
        toast({ title: 'Updated Successfully!' });
      },
      remove: async (id) => {
        await deleteUser({ id });
        toast({ title: 'Deleted Successfully!' });
      },
    },
    onDone: () => {
      mutateUsers();
      setFile(null);
      setImgSrc('');
    },
    onError: (error) => {
      toast({ title: error instanceof Error ? error.message : 'Something went wrong', variant: 'error' });
    },
  });


  // Fields
  const fields: FieldConfig[] = [
    { type: 'text', name: 'name', label: 'Name' },
    { type: 'text', name: 'user_name', label: 'User Name' },
    { type: 'password', name: 'password', label: 'Password' },
    { type: 'text', name: 'designation', label: 'Designation' },
    { type: 'text', name: 'email', label: 'Email' },
    { type: 'number', name: 'mobile', label: 'Mobile' },
    // TODO: employee is not in the Prisma User model yet, so it can't be saved
    // {
    //   type: 'select',
    //   name: 'employee',
    //   label: 'Employee',
    //   options: [],
    // },
    {
      type: 'multiselect',
      name: 'schools',
      label: 'Schools',
      selectAll: true,
      span: 'full',
      loading: schools.length > 0 && !schools[0]?.school_name,
      options: schools.map((s: any) => ({ value: String(s.id), label: s.school_name })),
    },
  ];
  const toggles: FieldConfig[] = [
    { type: 'switch', name: 'is_reset_password', label: 'Reset Password' },
    { type: 'switch', name: 'is_active', label: 'Is Active' },
    { type: 'switch', name: 'enable_otp', label: 'Enable OTP' },
  ];

  return (
    <div className='w-full max-w-2xl mx-auto mb-10 rounded-[8px] border border-[#E8E8E8] bg-white overflow-hidden'>
      <h2 className='w-full py-3 text-sm text-center font-bold rounded-t-lg bg-[#e7f0f7] text-main-color border-b border-[#F0F0F0]'>
        Create User
      </h2>
      <Form {...form}>
        <form onSubmit={save} className='flex flex-col gap-6 p-5 sm:p-8'>

          {/* Profile picture */}
          <div className='flex flex-col items-start gap-2'>
            <p className='text-[11px] font-medium text-[#726E71]'>Profile Picture</p>
            <div className='w-24 h-24 flex items-center justify-center bg-[#ccc] rounded-md cursor-pointer transition hover:opacity-90'>
              <label htmlFor='image' className='flex items-center justify-center h-full w-full cursor-pointer text-xs font-semibold'>
                {imgSrc ? <img alt="User's image" src={imgSrc} className='w-full h-full object-cover rounded-md' />
                  : record.profile_picture ? <img alt="User's image" src={record.profile_picture} className='w-full h-full object-cover rounded-md' />
                  : <p className='text-[10px] text-center px-2'>Select Image</p>}
              </label>
              <input type='file' accept='image/*' name='image' id='image' className='hidden' onChange={handleOnChange} />
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
                    data={users}
                    title='Users List'
                    filename='Users List'
                    sheetName='Users'
                    columns={[
                      { title: 'User Name', width: 100, value: (u:any) => u?.user_name },
                      { title: 'Email', width: 150, value: (u:any) => u?.email },
                      { title: 'Name', width: 100, value: (u:any) => u?.name },
                      { title: 'Mobile No.', width: 75, value: (u:any) => u?.mobile },
                      { title: 'Active', width: 75, value: (u:any) => (u?.is_active ? 'True' : 'False') },
                      { title: 'Created Date', width: 75, value: (u:any) => moment(u?.created_at).format('D-MMM-yy') },
                      { title: 'Modified Date', width: 100, value: (u:any) => moment(u?.updated_at).format('D-MMM-yy') },
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