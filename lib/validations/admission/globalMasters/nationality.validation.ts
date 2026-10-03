// lib/validations/admission/globalMasters/nationality.validation.ts
// Imports
import * as z from 'zod';





// Nationality Validation
export const NationalityValidation = z.object({
    name:z.string().nonempty({message:'*Please enter nationality name'})
});