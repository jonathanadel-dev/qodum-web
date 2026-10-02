import { fetchSchools, fetchSchoolsOptions } from "@/api/schools";
import useSWR from "swr";


// Schools
export const useSchoolsList = () => {
  const { data, mutate, isLoading } = useSWR('schools-list', fetchSchools, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading};
};
export const useSchoolsOptions = () => {
  const { data, isLoading } = useSWR('schools-options', fetchSchoolsOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};