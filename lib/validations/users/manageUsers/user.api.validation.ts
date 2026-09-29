import * as z from 'zod';

const UserBaseSchema = z.object({
    name: z.string().min(1),
    user_name: z.string().min(1),
    password: z.string().min(8),
    is_reset_password: z.boolean().optional(),
    designation: z.string().nullish(),
    email: z.string().nullish(),
    mobile: z.string().nullish(),
    profile_picture: z.string().nullish(),
    is_active: z.boolean().optional(),
    enable_otp: z.boolean().optional(),
    schools: z.array(z.number().int()).optional(),
});

export const CreateUserApiSchema = UserBaseSchema;
export const UpdateUserApiSchema = UserBaseSchema.partial();