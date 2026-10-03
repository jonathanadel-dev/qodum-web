// Imports
import * as z from 'zod';





// Class Validation
export const ClassValidation = z.object({
    class_name:z.string().nonempty({message:'*Class name is required'}),
    wing_id:z.string().nonempty({message:'*Wing name is required'}),
    school_id:z.string().nonempty({message:'*School name is required'}),
    order:z.number({invalid_type_error:'*Order is required'}).or(z.string().nonempty({message:'*Order is required'}))
            .pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
});