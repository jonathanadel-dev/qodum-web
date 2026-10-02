import { request } from "./common/utils"


// Fetch schools
export const fetchSchools = () => request<any[]>('/api/schools')


// Fetch schools options
export const fetchSchoolsOptions = () => request<{ id: number; school_name: string }[]>('/api/schools/options')