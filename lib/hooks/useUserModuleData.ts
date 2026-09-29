import useSWR from 'swr';
import { fetchStaff } from '@/lib/actions/payroll/globalMasters/staff.actions';
import { fetchGlobalSchoolDetails } from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
import { fetchUsers } from '../api/users';

export const useUsersList = () => {
  const { data, mutate, isLoading } = useSWR('users-list', fetchUsers, { fallbackData: [] });
  return { users: data ?? [], mutateUsers: mutate, isLoadingUsers: isLoading };
};

export const useStaffList = () => {
  const { data } = useSWR('staff-list', fetchStaff, { fallbackData: [] });
  return data ?? [];
};

export const useSchoolsList = () => {
  const { data } = useSWR('schools-list', fetchGlobalSchoolDetails, { fallbackData: [] });
  return data ?? [];
};