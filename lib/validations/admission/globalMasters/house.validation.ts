// lib/validations/admission/globalMasters/house.validation.ts
// Imports
import * as z from 'zod';





// House validation
export const HouseValidation = z.object({
    house_name:z.string().nonempty({message:'*House name is required'})
});