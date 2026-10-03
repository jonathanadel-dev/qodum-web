// lib/validations/admission/globalMasters/document/documentCrud.validation.ts
import * as z from 'zod'
import { zInt } from '@/lib/validations/shared/number'


export const DocumentCrudValidation = z.object({
    document_type_id: zInt.required(),
    document_name: z.string().nonempty({ message: '*Please enter document name' }),
})
