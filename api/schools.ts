import { request } from "./common/utils"


// Fetch schools
export const fetchSchools = async () => {
    const schools = await request<any[]>('/api/schools')
    return schools;
}