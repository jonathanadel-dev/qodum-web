// lib/hooks/useModuleData/useFeesData.ts
import { fetchBoards, fetchBoardsOptions } from "@/api/fees/boards";
import { fetchClasses } from "@/api/fees/classes";
import { fetchSchools, fetchSchoolsOptions } from "@/api/fees/schools";
import { fetchSections } from "@/api/fees/sections";
import { fetchWings, fetchWingsOptions } from "@/api/fees/wings";
import { fetchConcessions } from "@/api/fees/concessions";
import { fetchConcessionTypes, fetchConcessionTypesOptions } from "@/api/fees/concessionTypes";
import { fetchTransportMediums, fetchTransportMediumsOptions } from "@/api/fees/transportMediums";
import { fetchVehicleTypes, fetchVehicleTypesOptions } from "@/api/fees/vehicleTypes";
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
export const useBoardsList = () => {
  const { data, mutate, isLoading } = useSWR('boards-list', fetchBoards, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useBoardsOptions = () => {
  const { data, isLoading } = useSWR('boards-options', fetchBoardsOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Wings
export const useWingsList = () => {
  const { data, mutate, isLoading } = useSWR('wings-list', fetchWings, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
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


// Concessions
export const useConcessionsList = () => {
  const { data, mutate, isLoading } = useSWR('concessions-list', fetchConcessions, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};


// Concession types
export const useConcessionTypesList = () => {
  const { data, mutate, isLoading } = useSWR('concession-types-list', fetchConcessionTypes, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useConcessionTypesOptions = () => {
  const { data, isLoading } = useSWR('concession-types-options', fetchConcessionTypesOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Transport mediums
export const useTransportMediumsList = () => {
  const { data, mutate, isLoading } = useSWR('transport-mediums-list', fetchTransportMediums, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useTransportMediumsOptions = () => {
  const { data, isLoading } = useSWR('transport-mediums-options', fetchTransportMediumsOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Vehicle types
export const useVehicleTypesList = () => {
  const { data, mutate, isLoading } = useSWR('vehicle-types-list', fetchVehicleTypes, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useVehicleTypesOptions = () => {
  const { data, isLoading } = useSWR('vehicle-types-options', fetchVehicleTypesOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};