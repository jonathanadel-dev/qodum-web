// lib/validations/payroll/globalMasters/document/staffDocumentType.validation.ts
// Imports
import * as z from 'zod';





// Staff document type validation
export const StaffDocumentTypeValidation = z.object({
    document_type:z.string().nonempty({message:'*Please enter document type'})
});