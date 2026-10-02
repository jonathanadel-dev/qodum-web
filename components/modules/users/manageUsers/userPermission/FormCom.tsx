// components/modules/users/manageUsers/userPermission/FormCom.tsx
'use client';
// Imports
import { useMemo } from 'react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import LoadingIcon from '@/components/shared/LoadingIcon';
import DynamicField, { FieldConfig } from '@/components/shared/crud/DynamicFields';
import { saveUserPermissions, UserPermissionRow } from '@/api/users';
import { useUsersList, useUserPermissions } from '@/lib/hooks/useModuleData/useUsersData';
import { useCrudForm } from '@/lib/hooks/useCrudForm';
import { usePermission } from '@/lib/hooks/usePermission';
import { useFieldState } from '@/store/pageStateStore';
import { emptyUserPermission } from '@/lib/emptyRecords/users/emptyUserPermission';
import { UserPermissionValidation } from '@/lib/validations/users/manageUsers/userPermission.validation';
import { permissionModules } from '@/constants/permissionsTree';
import { humanize } from '@/lib/utils';
import { CurrentUser } from '@/lib/auth/session';
import PermissionsList from './PermissionsList';


// Types and helpers
type Flag = 'add' | 'modify' | 'delete' | 'print' | 'read_only';
type Flags = Record<Flag, boolean>;
type Edits = Record<string, Record<number, Flags>>;   // userId -> permission_item_id -> flags

const FLAGS: Flag[] = ['add', 'modify', 'delete', 'print', 'read_only'];
const EMPTY_EDITS: Edits = {};
const EMPTY_USER_EDITS: Record<number, Flags> = {};
const MODULES = permissionModules.map((m) => ({ value: m.moduleName, label: humanize(m.moduleName) }));
const flagsOf = (r: UserPermissionRow): Flags => ({ add: r.add, modify: r.modify, delete: r.delete, print: r.print, read_only: r.read_only });


// Main function
const FormCom = ({ user }: { user: CurrentUser | null }) => {

  const { toast } = useToast();


  // Permissions
  const permissions = usePermission(user);


  // CRUD form (only user + module are form fields; the checkbox edits live in the store)
  const { form, isLoading, save, cancel, tabPath } = useCrudForm({
    emptyRecord: emptyUserPermission,
    updateSchema: UserPermissionValidation,
    actions: {
      create: async (values) => {
        if (changed.length === 0) throw new Error('No changes to save');
        await saveUserPermissions({ id: values.user_id, permissions: changed });
        toast({ title: 'User permissions updated!' });
      },
      modify: async () => {},   // unused: this page is always in create mode
      remove: async () => {},   // unused
    },
    onDone: () => {
      mutatePermissions();
    },
    onError: (error) => {
      toast({ title: error instanceof Error ? error.message : 'Something went wrong', variant: 'error' });
    },
  });
  const userId = form.watch('user_id');
  const moduleName = form.watch('module');


  // Data fetching
  const { data: allUsers, isLoading: usersLoading } = useUsersList();
  const users = useMemo(() => allUsers.filter((u: any) => !u.is_admin), [allUsers]);
  const { data: serverRows, mutate: mutatePermissions, isLoading: permissionsLoading } = useUserPermissions(userId);


  // Pending edits (store)
  const [allEdits, setAllEdits] = useFieldState<Edits>('edits', EMPTY_EDITS, tabPath);
  const edits = allEdits[userId] ?? EMPTY_USER_EDITS;


  // Rows = server rows + pending edits
  const rows = useMemo(
    () => serverRows.map((r) => (edits[r.permission_item_id] ? { ...r, ...edits[r.permission_item_id] } : r)),
    [serverRows, edits]
  );
  const visibleRows = rows.filter((r) => r.module_name === moduleName);
  const changed = rows.filter((r, i) => FLAGS.some((f) => r[f] !== serverRows[i][f]));


  // Toggles
  const setUserEdits = (next: Record<number, Flags>) => setAllEdits({ ...allEdits, [userId]: next });

  const toggle = (itemId: number, flag: Flag) => {
    const row = rows.find((r) => r.permission_item_id === itemId)!;
    setUserEdits({ ...edits, [itemId]: { ...flagsOf(row), [flag]: !row[flag] } });
  };

  const toggleAll = (flag: Flag) => {
    const next = !visibleRows.every((r) => r[flag]);
    const merged = { ...edits };
    visibleRows.forEach((r) => { merged[r.permission_item_id] = { ...flagsOf(r), [flag]: next }; });
    setUserEdits(merged);
  };


  // Fields
  const fields: FieldConfig[] = [
    {
      type: 'select',
      name: 'user_id',
      label: 'User',
      loading: usersLoading,
      options: users.map((u: any) => ({ value: String(u.id), label: u.name })),
    },
    { type: 'select', name: 'module', label: 'Module', options: MODULES },
  ];

  return (
    <div className='w-full flex flex-col items-center gap-8 mb-10'>

      <div className='w-full max-w-2xl mx-auto rounded-[8px] border border-[#E8E8E8] bg-white overflow-hidden'>
        <h2 className='w-full py-3 text-sm text-center font-bold rounded-t-lg bg-[#e7f0f7] text-main-color border-b border-[#F0F0F0]'>
          User Permission
        </h2>
        <Form {...form}>
          <form onSubmit={save} className='flex flex-col gap-6 p-5 sm:p-8'>

            {/* Inputs */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5'>
              {fields.map((f) => <DynamicField key={f.name} field={f} control={form.control} />)}
            </div>

            {/* Buttons */}
            <div className='flex justify-center pt-5 border-t border-[#F0F0F0]'>
              {isLoading ? <LoadingIcon /> : (
                <div className='flex flex-row items-center justify-center gap-2'>
                  {permissions.modify && (
                    <Button type='submit' className='px-[8px] h-8 cursor-pointer text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'>
                      Save
                    </Button>
                  )}
                  <span
                    onClick={cancel}
                    className='flex items-center px-[8px] h-8 text-xs text-black bg-gradient-to-r from-[#C7C8CA] to-[#EAEDF0] rounded-full transition border-[1px] border-white cursor-pointer hover:border-[#a3a3a3] hover:from-[#c8c9cb26] hover:to-[#c8c9cb26] hover:text-hash-color sm:text-[16px] sm:px-4'
                  >
                    Cancel
                  </span>
                </div>
              )}
            </div>

          </form>
        </Form>
      </div>


      {/* Permissions list */}
      {userId && moduleName && (
        permissionsLoading ? <LoadingIcon /> : (
          <PermissionsList rows={visibleRows} onToggle={toggle} onToggleAll={toggleAll} />
        )
      )}

    </div>
  );
};


// Export
export default FormCom;