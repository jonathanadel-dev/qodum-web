// lib/validations/payroll/globalMasters/department.validation.ts
// Imports
import * as z from 'zod';





// Department validation
export const DepartmentValidation = z.object({
    department:z.string().nonempty({message:'*Please enter department'})
});