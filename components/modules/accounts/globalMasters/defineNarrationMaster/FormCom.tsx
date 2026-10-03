// components/modules/accounts/globalMasters/defineNarrationMaster/FormCom.tsx
'use client';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { useToast } from '@/components/ui/use-toast';
import { NarrationMasterValidation } from '@/lib/validations/accounts/globalMasters/narrationMaster';
import { createNarrationMaster, deleteNarrationMaster, modifyNarrationMaster } from '@/api/accounts/narrationMasters';
import { useNarrationMastersList } from '@/lib/hooks/useModuleData/useAccountsData';
import { useCrudForm } from '@/lib/hooks/useCrudForm';
import { usePermission } from '@/lib/hooks/usePermission';
import { emptyNarrationMaster } from '@/lib/emptyRecords/accounts/emptyNarrationMaster';
import DynamicField, { FieldConfig } from '@/components/shared/crud/DynamicFields';
import CrudButtons from '@/components/shared/crud/CrudButtons';
import PrintButton from '@/components/shared/crud/PrintButton';
import { CurrentUser } from '@/lib/auth/session';
import { getTabPath } from '@/lib/utils';

const voucherTypes = [
  { value: 'CashPaymentVoucher', label: 'Cash Payment Voucher' },
  { value: 'CashReceiptVoucher', label: 'Cash Receipt Voucher' },
  { value: 'BankPaymentVoucher', label: 'Bank Payment Voucher' },
  { value: 'BankReceiptVoucher', label: 'Bank Receipt Voucher' },
  { value: 'ContraVoucher', label: 'Contra Voucher' },
  { value: 'JournalVoucher', label: 'Journal Voucher' },
];

const formatVoucherType = (value: string) =>
  voucherTypes.find((voucherType) => voucherType.value === value)?.label ?? value;

export default function FormCom({ user }: { user: CurrentUser | null }) {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);
  const { toast } = useToast();


  const { data: narrations, mutate: mutateNarrations } = useNarrationMastersList();


  const permissions = usePermission(user);


  const { form, mode, isLoading, save, remove, cancel } = useCrudForm({
    emptyRecord: emptyNarrationMaster,
    updateSchema: NarrationMasterValidation,
    actions: {
      create: async (values) => {
        if (narrations.some((item) => item.narration === values.narration)) {
          throw new Error('Narration already exists');
        }
        await createNarrationMaster(values);
        toast({ title: 'Added Successfully!' });
      },
      modify: async (values) => {
        await modifyNarrationMaster(values);
        toast({ title: 'Updated Successfully!' });
      },
      remove: async (id) => {
        await deleteNarrationMaster({ id });
        toast({ title: 'Deleted Successfully!' });
      },
    },
    onDone: () => {
      mutateNarrations();
    },
    onError: (error) => {
      toast({ title: error instanceof Error ? error.message : 'Something went wrong', variant: 'error' });
    },
  });


  const fields: FieldConfig[] = [
    { type: 'select', name: 'voucher_type', label: 'Voucher Type', options: voucherTypes },
    { type: 'text', name: 'narration', label: 'Narration', span: 'full' },
  ];

  return (
    <div className='w-full max-w-2xl mx-auto mb-10 rounded-[8px] border border-[#E8E8E8] bg-white overflow-hidden'>
      <h2 className='w-full py-3 text-sm text-center font-bold rounded-t-lg bg-[#e7f0f7] text-main-color border-b border-[#F0F0F0]'>
        Define Narration Master
      </h2>
      <Form {...form}>
        <form onSubmit={save} className='flex flex-col gap-6 p-5 sm:p-8'>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5'>
            {fields.map((field) => <DynamicField key={field.name} field={field} control={form.control} />)}
          </div>

          <div className='flex justify-center pt-5 border-t border-[#F0F0F0]'>
            {isLoading ? <LoadingIcon /> : (
              <CrudButtons
                mode={mode}
                permissions={permissions}
                viewHref={`${tabPath}/view`}
                onSave={save}
                onDelete={remove}
                onCancel={cancel}
                printSlot={
                  <PrintButton
                    data={narrations}
                    title='Narrations List'
                    filename='Narrations List'
                    sheetName='Narrations'
                    columns={[
                      { title: 'Narration', width: 180, value: (item: any) => item?.narration },
                      { title: 'Voucher Type', width: 150, value: (item: any) => formatVoucherType(item?.voucher_type ?? '') },
                      { title: 'Modified Date', width: 100, value: (item: any) => moment(item?.updated_at).format('D-MMM-yy') },
                    ]}
                  />
                }
              />
            )}
          </div>

        </form>
      </Form>
    </div>
  );
}
