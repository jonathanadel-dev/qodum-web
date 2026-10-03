// lib/validations/fees/feeMaster/defineAndAssignConcession/concessionType.validation.ts
// Imports
import * as z from 'zod';





// Concession Type Validation
export const ConcessionTypeValidation = z.object({
    type:z.string().nonempty({message:'*Concession type is required'})
});