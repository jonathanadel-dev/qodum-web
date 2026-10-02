import { fetchStaff } from "@/lib/actions/payroll/globalMasters/staff.actions";
import useSWR from "swr";

// Staff
export const useStaffList = () => {
    const { data, mutate, isLoading } = useSWR('staff-list', fetchStaff, { fallbackData: [] });
    return { data: data ?? [], mutate, isLoading};
};