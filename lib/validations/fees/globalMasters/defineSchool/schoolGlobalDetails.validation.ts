// lib/validations/fees/globalMasters/defineSchool/schoolGlobalDetails.validation.ts
import * as z from 'zod';


// School global details
export const SchoolValidation = z.object({
    logo: z.string().max(500),
    school_main: z.boolean(),
    school_subheads: z.boolean(),
    school_name: z.string().trim().nonempty({ message: '*Please enter the school name' }),
    school_address: z.string().trim().nonempty({ message: '*Please enter the school address' }),
    school_address_2: z.string(),
    school_short_name: z.string(),
    contact_no: z.string(),
    mobile: z.string(),
    email: z.string(),
    support_email_id: z.string(),
    website: z.string(),
    prefix: z.string().trim().nonempty({ message: '*Please enter the prefix' }),
    iso_details: z.string(),
    principal_signature: z.string(),
    accountant_signature: z.string(),
    school_no: z.string(),
    affiliation_to: z.string(),
    affiliation_no: z.string(),
    udise_code: z.string(),
    pen: z.string(),
    associates: z.string(),
    renew_up_to: z.string(),
    school_status: z.string(),
    working_days: z.string(),
    recess: z.string(),
    total_period: z.string(),
    facebook_link: z.string(),
    linkedin_link: z.string(),
    twitter_link: z.string(),
    instagram_link: z.string(),
});