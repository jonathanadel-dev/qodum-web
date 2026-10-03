// lib/validations/fees/globalMasters/defineSchool/board.ts
// Imports
import * as z from 'zod';





// Board Validation
export const BoardValidation = z.object({
    board:z.string().nonempty({message:'*Board name is required'}),
    is_default:z.boolean()
});