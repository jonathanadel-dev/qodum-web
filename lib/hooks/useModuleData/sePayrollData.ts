import { fetchStaff } from "@/lib/actions/payroll/globalMasters/staff.actions";
import { fetchDepartments, fetchDepartmentsOptions } from "@/api/payroll/departments";
import { fetchProfessions, fetchProfessionsOptions } from "@/api/payroll/professions";
import { fetchStaffDocumentTypes, fetchStaffDocumentTypesOptions } from "@/api/payroll/staffDocumentTypes";
import useSWR from "swr";

// Departments
export const useDepartmentsList = () => {
    const { data, mutate, isLoading } = useSWR('departments-list', fetchDepartments, { fallbackData: [] });
    return { data: data ?? [], mutate, isLoading };
};
export const useDepartmentsOptions = () => {
    const { data, isLoading } = useSWR('departments-options', fetchDepartmentsOptions, { fallbackData: [] });
    return { data: data ?? [], isLoading };
};

// Professions
export const useProfessionsList = () => {
    const { data, mutate, isLoading } = useSWR('professions-list', fetchProfessions, { fallbackData: [] });
    return { data: data ?? [], mutate, isLoading };
};
export const useProfessionsOptions = () => {
    const { data, isLoading } = useSWR('professions-options', fetchProfessionsOptions, { fallbackData: [] });
    return { data: data ?? [], isLoading };
};

// Staff document types
export const useStaffDocumentTypesList = () => {
    const { data, mutate, isLoading } = useSWR('staff-document-types-list', fetchStaffDocumentTypes, { fallbackData: [] });
    return { data: data ?? [], mutate, isLoading };
};
export const useStaffDocumentTypesOptions = () => {
    const { data, isLoading } = useSWR('staff-document-types-options', fetchStaffDocumentTypesOptions, { fallbackData: [] });
    return { data: data ?? [], isLoading };
};

// Staff
export const useStaffList = () => {
    const { data, mutate, isLoading } = useSWR('staff-list', fetchStaff, { fallbackData: [] });
    return { data: data ?? [], mutate, isLoading};
};