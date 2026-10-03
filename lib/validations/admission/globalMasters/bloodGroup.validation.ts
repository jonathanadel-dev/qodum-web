// lib/validations/admission/globalMasters/bloodGroup.validation.ts
// Imports
import * as z from 'zod';





// Blood group validation
export const BloodGroupValidation = z.object({
    blood_group:z.string().nonempty({message:'*Blood group is required'})
});