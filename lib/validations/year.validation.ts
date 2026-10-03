import * as z from 'zod';
import { zInt } from './shared/number';
import { date } from './shared/date';


// Academic / financial year
export const YearValidation = z.object({
    year_name: z.string().trim().nonempty({ message: '*Please enter the year name' }),
    start_date: date('*Please select the start date'),
    end_date: date('*Please select the end date'),
    is_active: z.boolean(),
    create_other: z.boolean().default(false),
    upcoming: zInt.optional().refine((n) => n === null || (n >= 1 && n <= 20), { message: '*Enter a number between 1 and 20' }),
}).refine((v) => v.end_date > v.start_date, { message: '*End date must be after the start date', path: ['end_date'] });