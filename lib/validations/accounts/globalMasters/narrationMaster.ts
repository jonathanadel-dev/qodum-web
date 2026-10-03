// lib/validations/accounts/globalMasters/narrationMaster.ts
import * as z from 'zod';
import { VoucherType } from '@/lib/generated/prisma/enums';


export const NarrationMasterValidation = z.object({
    voucher_type: z.nativeEnum(VoucherType, { errorMap: () => ({ message: '*Please select voucher type' }) }),
    narration: z.string().nonempty({ message: '*Please enter narration' }),
});
