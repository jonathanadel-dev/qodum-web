import { fetchBoardsOptions } from "@/api/fees/boards";
import { fetchClasses } from "@/api/fees/classes";
import { fetchSchools, fetchSchoolsOptions } from "@/api/fees/schools";
import { fetchSections } from "@/api/fees/sections";
import { fetchWingsOptions } from "@/api/fees/wings";
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


// Boards
export const useBoardsOptions = () => {
  const { data, isLoading } = useSWR('boards-options', fetchBoardsOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Wings
export const useWingsOptions = () => {
  const { data, isLoading } = useSWR('wings-options', fetchWingsOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Classes
export const useClassesList = () => {
  const { data, mutate, isLoading } = useSWR('classes-list', fetchClasses, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};


// Sections
export const useSectionsList = () => {
  const { data, mutate, isLoading } = useSWR('sections-list', fetchSections, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};