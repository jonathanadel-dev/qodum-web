// lib/validations/admission/globalMasters/optionalSubject.validation.ts
// Imports
import * as z from 'zod';





// Optional subject validation
export const OptionalSubjectValidation = z.object({
    subject_name:z.string().nonempty({message:'*Subject name is required'})
});