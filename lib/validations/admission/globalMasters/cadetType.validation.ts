// lib/validations/admission/globalMasters/cadetType.validation.ts
// Imports
import * as z from 'zod';





// Cadet type validation
export const CadetTypeValidation = z.object({
    name:z.string().nonempty({message:'*Please enter cadet type'})
});