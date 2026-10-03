// lib/validations/admission/globalMasters/remark.validation.ts
// Imports
import * as z from 'zod';





// Remark Validation
export const RemarkValidation = z.object({
    remark:z.string().nonempty({message:'*Remark is required'})
});