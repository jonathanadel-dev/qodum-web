import useSWR from 'swr';
import { fetchStaff } from '@/lib/actions/payroll/globalMasters/staff.actions';
import { fetchUsers } from '../../api/users';
import { fetchSchools } from '../../api/schools';


// Users
export const useUsersList = () => {
  const { data, mutate, isLoading } = useSWR('users-list', fetchUsers, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};


// Staff
export const useStaffList = () => {
  const { data, mutate, isLoading } = useSWR('staff-list', fetchStaff, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading};
};


// Schools
export const useSchoolsList = () => {
  const { data, mutate, isLoading } = useSWR('schools-list', fetchSchools, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading};
};