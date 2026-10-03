// lib/hooks/useModuleData/useAdmissionData.ts
import { fetchBloodGroups, fetchBloodGroupsOptions } from '@/api/admission/bloodGroups';
import { fetchCadetTypes, fetchCadetTypesOptions } from '@/api/admission/cadetTypes';
import { fetchCastes, fetchCastesOptions } from '@/api/admission/castes';
import { fetchClubs, fetchClubsOptions } from '@/api/admission/clubs';
import { fetchHouses, fetchHousesOptions } from '@/api/admission/houses';
import { fetchNationalities, fetchNationalitiesOptions } from '@/api/admission/nationalities';
import { fetchOptionalSubjects, fetchOptionalSubjectsOptions } from '@/api/admission/optionalSubjects';
import { fetchReligions, fetchReligionsOptions } from '@/api/admission/religions';
import { fetchRemarks } from '@/api/admission/remarks';
import { fetchStreams, fetchStreamsOptions } from '@/api/admission/streams';
import { fetchTerms, fetchTermsOptions } from '@/api/admission/terms';
import { fetchDocumentTypes, fetchDocumentTypesOptions } from '@/api/admission/documentTypes';
import { fetchAdmissionDocuments } from '@/api/admission/documents';
import useSWR from 'swr';


// Blood groups
export const useBloodGroupsList = () => {
  const { data, mutate, isLoading } = useSWR('blood-groups-list', fetchBloodGroups, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useBloodGroupsOptions = () => {
  const { data, isLoading } = useSWR('blood-groups-options', fetchBloodGroupsOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Cadet types
export const useCadetTypesList = () => {
  const { data, mutate, isLoading } = useSWR('cadet-types-list', fetchCadetTypes, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useCadetTypesOptions = () => {
  const { data, isLoading } = useSWR('cadet-types-options', fetchCadetTypesOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Castes
export const useCastesList = () => {
  const { data, mutate, isLoading } = useSWR('castes-list', fetchCastes, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useCastesOptions = () => {
  const { data, isLoading } = useSWR('castes-options', fetchCastesOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Clubs
export const useClubsList = () => {
  const { data, mutate, isLoading } = useSWR('clubs-list', fetchClubs, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useClubsOptions = () => {
  const { data, isLoading } = useSWR('clubs-options', fetchClubsOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Houses
export const useHousesList = () => {
  const { data, mutate, isLoading } = useSWR('houses-list', fetchHouses, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useHousesOptions = () => {
  const { data, isLoading } = useSWR('houses-options', fetchHousesOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Nationalities
export const useNationalitiesList = () => {
  const { data, mutate, isLoading } = useSWR('nationalities-list', fetchNationalities, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useNationalitiesOptions = () => {
  const { data, isLoading } = useSWR('nationalities-options', fetchNationalitiesOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Optional subjects
export const useOptionalSubjectsList = () => {
  const { data, mutate, isLoading } = useSWR('optional-subjects-list', fetchOptionalSubjects, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useOptionalSubjectsOptions = () => {
  const { data, isLoading } = useSWR('optional-subjects-options', fetchOptionalSubjectsOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Religions
export const useReligionsList = () => {
  const { data, mutate, isLoading } = useSWR('religions-list', fetchReligions, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useReligionsOptions = () => {
  const { data, isLoading } = useSWR('religions-options', fetchReligionsOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Remarks
export const useRemarksList = () => {
  const { data, mutate, isLoading } = useSWR('remarks-list', fetchRemarks, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};


// Streams
export const useStreamsList = () => {
  const { data, mutate, isLoading } = useSWR('streams-list', fetchStreams, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useStreamsOptions = () => {
  const { data, isLoading } = useSWR('streams-options', fetchStreamsOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Health terms
export const useTermsList = () => {
  const { data, mutate, isLoading } = useSWR('health-terms-list', fetchTerms, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useTermsOptions = () => {
  const { data, isLoading } = useSWR('health-terms-options', fetchTermsOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};


// Admission document types and documents
export const useDocumentTypesList = () => {
  const { data, mutate, isLoading } = useSWR('admission-document-types-list', fetchDocumentTypes, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
export const useDocumentTypesOptions = () => {
  const { data, isLoading } = useSWR('admission-document-types-options', fetchDocumentTypesOptions, { fallbackData: [] });
  return { data: data ?? [], isLoading };
};
export const useAdmissionDocumentsList = () => {
  const { data, mutate, isLoading } = useSWR('admission-documents-list', fetchAdmissionDocuments, { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};
