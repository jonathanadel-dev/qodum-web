// lib/validations/fees/transport/transportlMedium.validation.ts
// Imports
import * as z from 'zod';





// Transport medium validation
export const TransportMediumValidation = z.object({
    transport_medium:z.string().nonempty({message:'*Transport medium is required'})
});