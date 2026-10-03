// lib/validations/admission/globalMasters/caste.validation.ts
// Imports
import * as z from 'zod';





// Caste validation
export const CasteValidation = z.object({
    caste_name:z.string().nonempty({message:'*Caste name is required'})
});