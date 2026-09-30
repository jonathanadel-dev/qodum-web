import * as z from 'zod';
import { zInt, zNumericString } from '../../shared/number';


// Update user
export const UpdateUserValidation = z.object({
    name: z.string().nonempty({ message: '*Please enter name' }),
    user_name: z.string().nonempty({ message: '*Please enter user name' }),
    password: z.string().refine((v) => v === '' || v.length >= 8, { message: '*Password must be at least 8 characters long' }),
    is_reset_password: z.boolean(),
    designation: z.string(),
    email: z.string(),
    mobile: zNumericString.optional(),
    profile_picture: z.string(),
    schools: z.array(zInt.required()),
    is_active: z.boolean(),
    enable_otp: z.boolean(),
    age: zInt.required().refine((n) => n >= 0, { message: '*Please enter a valid age' }),
    salary: zInt.optional().refine((n) => n === null || n >= 0, { message: '*Salary cannot be negative' }),
});


// Create user
export const CreateUserValidation = UpdateUserValidation.extend({
    password: z.string()
        .nonempty({ message: '*Please enter password' })
        .min(8, { message: '*Password must be at least 8 characters long' }),
});