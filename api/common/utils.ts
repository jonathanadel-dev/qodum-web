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

    if (!res.ok) {
        const d = data?.details ? ': ' + Object.entries(data.details).map(([k, v]) => `${k} ${(v as string[]).join(', ')}`).join('; ') : ''
        throw new ApiError((data?.error ?? 'Request failed') + d, res.status)
    }
    return data as T
}