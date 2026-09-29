// Imports
import moment from 'moment';
import DDDetails from '../Others/DDDetails';
import {Input} from '@/components/ui/input';
import UPIDetails from '../Others/UPIDetails';
import NeftDetails from '../Others/NeftDetails';
import {Checkbox} from '@/components/ui/checkbox';
import {AuthContext} from '@/context/AuthContext';
import {Check, ChevronDown, X} from 'lucide-react';
import ChequeDetails from '../Others/ChequeDetails';
import {useContext, useEffect, useState} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import SwipedCardDetaila from '../Others/SwipedCardDetails';
import CustomDatePicker from '@/components/shared/CustomDatePicker';
import {fetchTypes} from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';
import {fetchBankLedgers} from '@/lib/actions/accounts/accounts/bankLedger.actions';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import PaymentGateway from '../Others/PaymentGateway';





// Main function
const Inputs = ({installments, form, selectedInstallments, setSelectedInstallments, chequeDetails, setChequeDetails, ddDetails, setddDetails, neftDetails, setNeftDetails, paymentsReceiptNo, swipedCardDetails, setSwipedCardDetails, upiDetails, setUpiDetails, selectedStudent, totalPaidAmount, setIsQrCodeGenerated, onSubmit}:any) => {

    // User
    const {user} = useContext(AuthContext);


    // Date states
    const [selectedDate, setSelectedDate] = useState(moment());


    // Pay modes
    const [payModes, setPayModes] = useState(['Cash', 'Cheque', 'DD', 'NEFT', 'Swiped Card', 'UPI']);


    // Bank ledgers
    const [bankLedgers, setBankLedgers] = useState<any>([]);


    // Fee types
    const [feeTypes, setFeeTypes] = useState<any>([]);


    // Use effects
    useEffect(() => {
        switch (form.getValues().entry_mode) {
            case 'School':
                setPayModes(['Cash', 'Cheque', 'DD', 'NEFT', 'Swiped Card', 'UPI']);
                break;
            case 'Bank':
                setPayModes(['Cash', 'Cheque', 'DD', 'NEFT', 'Swiped Card', 'UPI']);
                break;
            case 'Online':
                setPayModes(['Payment Gateway', 'Net Banking', 'Debit Card', 'Credit Card']);
                break;
            default:
                setPayModes(['Cash', 'Cheque', 'DD', 'NEFT', 'Swiped Card', 'UPI']);
                break;
        };
    }, [form.watch('entry_mode'), form.getValues().entry_mode]);
    useEffect(() => {
        setChequeDetails({});
        setddDetails({});
        setNeftDetails({});
        setSwipedCardDetails({});
    }, [form.watch('pay_mode')]);
    useEffect(() => {
        const fetcher = async () => {
            const bankLedgersRes = await fetchBankLedgers();
            const feeTypesRes = await fetchTypes();
            setBankLedgers(bankLedgersRes);
            setFeeTypes(feeTypesRes.filter((t:any) => user.fee_types.includes(t.name)));
        };
        fetcher();
    }, []);
    useEffect(() => {
        if(selectedDate){
            // @ts-ignore
            form.setValue('received_date', selectedDate?._d);
        };
    }, [selectedDate]);

    return (
        <div className='flex flex-col gap-2 p-4 bg-[#F7F7F7] rounded-[4px] border-[0.5px] border-[#ccc] lg:flex-row'>
            <div className='flex-1 flex flex-col gap-1'>

                <div className='flex flex-col gap-2 lg:flex-row'>

                    {/* Entry Mode */}
                    <FormField
                        control={form.control}
                        name='entry_mode'
                        render={({field}) => (
                            <FormItem className='basis-[33.3%] min-w-[125px]'>
                                <div className='flex flex-row items-center'>
                                    <FormLabel className='basis-[60%] text-start text-[11px] text-[#726E71]'>Entry Mode</FormLabel>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='School'>School</SelectItem>
                                            <SelectItem value='Bank'>Bank</SelectItem>
                                            <SelectItem value='Online'>Online</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className='flex flex-row items-center basis-[33.3%] min-w-[125px]'>
                        <p className='basis-[70%] text-xs text-hash-color'>Received Date</p>
                        <CustomDatePicker
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </div>
                    {/* Pay Mode */}
                    <FormField
                        control={form.control}
                        name='pay_mode'
                        render={({field}) => (
                            <FormItem className='basis-[33.3%]'>
                                <div className='flex flex-row items-center'>
                                    <FormLabel className='basis-[50%] text-start text-[11px] text-[#726E71]'>Pay Mode</FormLabel>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {payModes.map((m:any) => (
                                                <SelectItem value={m} key={m}>{m}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <div className='flex flex-row items-center gap-2'>
                    {/* Fees Type */}
                    <FormField
                        control={form.control}
                        name='fee_type'
                        render={({field}) => (
                            <FormItem className='basis-[33.3%] min-w-[125px]'>
                                <div className='flex flex-row items-center'>
                                    <FormLabel className='basis-[50%] text-start text-[11px] text-[#726E71]'>Fees Type</FormLabel>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='All fee types'>All fee types</SelectItem>
                                            {feeTypes.length === 0 ? (
                                                <p className='text-xs text-hash-color'></p>
                                            ) : feeTypes[0].name === '' ? (
                                                <LoadingIcon />
                                            ) : feeTypes.map((t:any) => (
                                                <SelectItem value={t.name} key={t._id}>{t.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormItem>
                        )}
                    />
                    {/* Receipt No. */}
                    <FormField
                        control={form.control}
                        name='receipt_no'
                        render={({field}) => (
                            <FormItem className='basis-[33.3%]'>
                                <div className='relative flex flex-row items-center'>
                                    <FormLabel className='basis-[60%] text-start text-[11px] text-[#726E71]'>Receipt No.</FormLabel>
                                    <FormControl>
                                        <Input
                                            value={paymentsReceiptNo}
                                            readOnly
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute w-[120%] top-[100%] left-0 text-[11px]'/>
                                </div>
                            </FormItem>
                        )}
                    />
                    {/* Bank Name */}
                    <FormField
                        control={form.control}
                        name='bank_name'
                        render={({field}) => (
                            <FormItem className='basis-[33.3%]'>
                                <div className='flex flex-row items-center'>
                                    <FormLabel className='basis-[100%] text-start text-[11px] text-[#726E71]'>Bank Name</FormLabel>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bankLedgers.length === 0 ? (
                                                <p className='text-xs text-hash-color'>No bank ledgers</p>
                                            ) : !bankLedgers[0].account_name ? (
                                                <LoadingIcon />
                                            ) : bankLedgers.map((t:any) => (
                                                <SelectItem value={t.account_name} key={t._id}>{t.account_name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <div className='flex flex-col gap-2 lg:flex-row'>
                    {/* Installment */}
                    <FormItem className='basis-[33.3%] min-w-[125px]'>
                        <div className='flex flex-row items-center gap-1'>
                            <FormLabel className='basis-[50%] text-start text-[11px] text-[#726E71]'>Installment</FormLabel>
                            <Select>
                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue
                                        className='text-[11px]'
                                        placeholder={(selectedInstallments.length === 0 || !selectedInstallments[0]) ? 'Please Select' : selectedInstallments.length === 1 ? '1 installment selected' : `${selectedInstallments.length} installments selected`}
                                    />
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    {installments.length === 0 ? (
                                        <p className='text-xs font-semibold'>No installments</p>
                                    ) : installments[0] === '' ? (
                                        <LoadingIcon />
                                    ) : (
                                        <>
                                            <div className='flex flex-row'>
                                                <div
                                                    onClick={() => setSelectedInstallments(installments)}
                                                    className='group flex flex-row items-center justify-center cursor-pointer'
                                                >
                                                    <Check size={12}/>
                                                    <p className='text-xs group-hover:underline'>All</p>
                                                </div>
                                                <div
                                                    onClick={() => setSelectedInstallments([])}
                                                    className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                                >
                                                    <X size={12}/>
                                                    <p className='text-xs group-hover:underline'>Clear</p>
                                                </div>
                                            </div>
                                            <ul className='mt-2'>
                                                {installments.map((i:any) => (
                                                    <li className={`flex flex-row items-center space-x-[2px] mt-[2px] ${!installments.includes(i) && 'cursor-not-allowed text-hash-color opacity-50'}`} key={i._id}>
                                                        <Checkbox
                                                            className={`rounded-[3px] text-hash-color font-semibold ${!installments.includes(i) && 'cursor-not-allowed'}`}
                                                            checked={installments.includes(i) && selectedInstallments.map((s:any) => s).includes(i)}
                                                            onClick={() => installments.includes(i) ? selectedInstallments.includes(i) ? setSelectedInstallments(selectedInstallments.filter((s:any) => s !== i)) : setSelectedInstallments([...selectedInstallments, i]) : ''}
                                                        />
                                                        <div className='w-full flex flex-row'>
                                                            <p className='basis-[70%] text-[11px]'>{i}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </FormItem>
                    {/* Remarks */}
                    <FormField
                        control={form.control}
                        name='remarks'
                        render={({field}) => (
                            <FormItem className='basis-[66.6%]'>
                                <div className='flex flex-row items-center'>
                                    <FormLabel className='basis-[20%] text-start text-[11px] text-[#726E71]'>Remarks</FormLabel>
                                    <FormControl>
                                        <Input
                                            value={field.value}
                                            onChange={field.onChange}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
            </div>


            {/* Paymode Details */}
            <div className='w-[200px]'>
                {form.getValues().pay_mode === 'Cheque' && <ChequeDetails chequeDetails={chequeDetails} setChequeDetails={setChequeDetails}/>}
                {form.getValues().pay_mode === 'DD' && <DDDetails ddDetails={ddDetails} setddDetails={setddDetails}/>}
                {form.getValues().pay_mode === 'NEFT' && <NeftDetails neftDetails={neftDetails} setNeftDetails={setNeftDetails}/>}
                {form.getValues().pay_mode === 'UPI' && <UPIDetails selectedStudent={selectedStudent} totalPaidAmount={totalPaidAmount} setIsQrCodeGenerated={setIsQrCodeGenerated} form={form} selectedInstallments={selectedInstallments}/>}
                {form.getValues().pay_mode === 'Payment Gateway' && <PaymentGateway selectedStudent={selectedStudent} totalPaidAmount={totalPaidAmount} setIsQrCodeGenerated={setIsQrCodeGenerated} form={form} selectedInstallments={selectedInstallments} onSubmit={onSubmit}/>}
                {form.getValues().pay_mode === 'Swiped Card' && <SwipedCardDetaila swipedCardDetails={swipedCardDetails} setSwipedCardDetails={setSwipedCardDetails} />}
            </div>
        </div>
    );
};





// Export
export default Inputs;