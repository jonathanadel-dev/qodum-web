import { fetchYears, YearKind } from '@/api/sessions';
import useSWR from 'swr';

// Academic / financial years
export const useYearsList = (kind: YearKind, moduleSlug: string) => {
  const { data, mutate, isLoading } = useSWR([`${kind}-years-list`, moduleSlug], () => fetchYears(kind, moduleSlug), { fallbackData: [] });
  return { data: data ?? [], mutate, isLoading };
};