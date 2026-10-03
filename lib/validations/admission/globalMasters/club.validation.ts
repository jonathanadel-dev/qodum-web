// lib/validations/admission/globalMasters/club.validation.ts
// Imports
import * as z from 'zod';





// Club validation
export const ClubValidation = z.object({
    name:z.string().nonempty({message:'*Please enter club name'})
});