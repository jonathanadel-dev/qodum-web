// lib/validations/admission/globalMasters/document/documentType.validation.ts
// Imports
import * as z from 'zod';





// Document type validation
export const DocumentTypeValidation = z.object({
    document_type:z.string().nonempty({message:'*Please enter document type'})
});