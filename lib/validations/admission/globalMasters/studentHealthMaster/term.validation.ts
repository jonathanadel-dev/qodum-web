// lib/validations/admission/globalMasters/studentHealthMaster/term.validation.ts
// Imports
import * as z from 'zod';





// Term Validation
export const TermValidation = z.object({
    term_name:z.string().nonempty({message:'*Term name is required'}),
});