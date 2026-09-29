// API error
export class ApiError extends Error {
    status: number
    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}


// Request
export async function request<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, {
        ...init,
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json().catch(() => null)

    if (!res.ok) throw new ApiError(data?.error ?? 'Request failed', res.status)
    return data as T
}


// The form's multiselect works in strings, the API in numeric ids
export const toIds = (data?: (string | number)[]) => data?.map(Number)
