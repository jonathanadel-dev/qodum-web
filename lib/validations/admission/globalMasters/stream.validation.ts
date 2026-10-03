// lib/validations/admission/globalMasters/stream.validation.ts
// Imports
import * as z from 'zod';





// Stream validation
export const StreamValidation = z.object({
    stream_name:z.string().nonempty({message:'*Stream name is required'})
});