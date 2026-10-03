// lib/hooks/useModuleData/useAccountsData.ts
import { fetchNarrationMasters } from '@/api/accounts/narrationMasters'
import useSWR from 'swr'


// Narration masters
export const useNarrationMastersList = () => {
  const { data, mutate, isLoading } = useSWR('narration-masters-list', fetchNarrationMasters, { fallbackData: [] })
  return { data: data ?? [], mutate, isLoading }
}
