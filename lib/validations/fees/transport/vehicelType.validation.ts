// lib/validations/fees/transport/vehicelType.validation.ts
// Imports
import * as z from 'zod';





// Vehicle type validation
export const VehicleTypeValidation = z.object({
    vehicle_name:z.string().nonempty({message:'*Vehicle name is required'})
});