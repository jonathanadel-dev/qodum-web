import z from "zod";


// Date (YYYY-MM-DD)
export const date = (message: string) => z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message });