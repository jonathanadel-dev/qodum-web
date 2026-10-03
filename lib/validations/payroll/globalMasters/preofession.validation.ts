// lib/validations/payroll/globalMasters/preofession.validation.ts
// Imports
import * as z from 'zod';





// Profession validation
export const ProfessionValidation = z.object({
    profession:z.string().nonempty({message:'*Please enter profession'})
});