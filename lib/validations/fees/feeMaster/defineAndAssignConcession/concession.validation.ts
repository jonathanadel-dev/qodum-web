// lib/validations/fees/feeMaster/defineAndAssignConcession/concession.validation.ts
// Imports
import * as z from 'zod';





// Concession Validation
export const ConcessionValidation = z.object({
    name:z.string().nonempty({message:'*Concession name is required'})
});