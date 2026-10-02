import * as z from 'zod';


// User permission
export const UserPermissionValidation = z.object({
    user_id: z.string().nonempty({ message: '*Please select a user' }),
    module: z.string().nonempty({ message: '*Please select a module' }),
});