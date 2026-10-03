import useSWR from 'swr';
import { fetchUserPermissions, fetchUsers, UserPermissionRow } from '../../../api/users/users';


// Users
export const useUsersList = () => {
  const { data, mutate, isLoading } = useSWR('users-list', fetchUsers, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};

const NO_PERMISSIONS: UserPermissionRow[] = [];
export const useUserPermissions = (userId: string) => {
  const { data, mutate, isLoading } = useSWR(
    userId ? ['user-permissions', userId] : null,
    ([, id]: [string, string]) => fetchUserPermissions(id)
  );
  return { data: data?.permissions ?? NO_PERMISSIONS, session: data?.session, mutate, isLoading };
};