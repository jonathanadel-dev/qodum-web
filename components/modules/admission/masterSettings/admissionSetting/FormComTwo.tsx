// Imports
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {FormControl, Form, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import {AdmissionSettingTwoValidation} from '@/lib/validations/admission/masterSettings/admissionTwo.validation';
import { fetchGeneralLedgers } from '@/lib/actions/accounts/accounts/generalLedger.actions';
import { fetchBankLedgers } from '@/lib/actions/accounts/accounts/bankLedger.actions';
import { Button } from '@/components/ui/button';





// Main function
function FormComTwo() {


    // Toast
    const {toast} = useToast();


    // Sessions
    const [sessions, setSessions] = useState([{}]);


    // Admission Accounts
    const [admissionAccounts, setAdmissionAccounts] = useState([{}]);


    // Post Accounts
    const [postAccounts, setPostAccounts] = useState([{}]);


    // Form
    const form = useForm({
        resolver:zodResolver(AdmissionSettingTwoValidation),
        defaultValues:{
            session:localStorage.getItem('admission_setting_session') ? localStorage.getItem('admission_setting_session') : '',
            paymode:localStorage.getItem('pay_mode') ? localStorage.getItem('pay_mode') : '',
            admission_account:localStorage.getItem('admission_account') ? localStorage.getItem('admission_account') : '',
            post_account:localStorage.getItem('post_account') ? localStorage.getItem('post_account') : '',
            send_sms_after_enquiry:localStorage.getItem('admission_setting_is_send_sms_after_enquiry') ? localStorage.getItem('admission_setting_is_send_sms_after_enquiry') === 'true' : false,
            is_auto_roll_no:localStorage.getItem('admission_setting_is_auto_roll') ? localStorage.getItem('admission_setting_is_auto_roll') === 'true' : false
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof AdmissionSettingTwoValidation>) => {

        localStorage.setItem('admission_setting_session', values.session);
        localStorage.setItem('pay_mode', values.paymode);
        localStorage.setItem('admission_account', values.admission_account);
        localStorage.setItem('post_account', values.post_account);
        // @ts-ignore
        localStorage.setItem('admission_setting_is_send_sms_after_enquiry', values.send_sms_after_enquiry);
        // @ts-ignore
        localStorage.setItem('admission_setting_is_auto_roll', values.is_auto_roll_no);

        toast({title:'Saved Successfully!'});
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const sessionsRes = await fetchAcademicYears();
            const admissionAccountsRes = await fetchGeneralLedgers();
            const postAccountsRes = await fetchBankLedgers();
            setSessions(sessionsRes);
            setAdmissionAccounts(admissionAccountsRes);
            setPostAccounts(postAccountsRes);
            // @ts-ignore
            form.setValue('paymode', localStorage.getItem('pay_mode'));
            // @ts-ignore
            form.setValue('admission_account', localStorage.getItem('admission_account'));
            // @ts-ignore
            form.setValue('post_account', localStorage.getItem('post_account'));
        };
        fetcher();
    }, []);


    return (
        <Form
            {...form}
        >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full flex flex-col items-center px-2 pt-6 sm:px-4'
            >


                {/* Admission Setting */}
                <div className='w-full flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
                    <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>Admission Setting</h2>
                    <div className='flex flex-col px-4 py-2 gap-4'>
                        <div className='flex flex-col w-full gap-2 sm:flex-row'>
                            {/* Session */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Session</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='session'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field?.value}
                                                        onValueChange={field?.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {sessions?.length < 1 ? (
                                                                <p>No sessions</p>
                                                                // @ts-ignore
                                                            ) : !sessions[0]?.year_name ? (
                                                                <LoadingIcon />
                                                            ) : sessions?.map((item:any) => (
                                                                <SelectItem value={item?.year_name} key={item?._id}>{item?.year_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Paymode */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Paymode</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='paymode'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field?.value}
                                                        onValueChange={field?.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value='Cash'>Cash</SelectItem>
                                                            <SelectItem value='Cheque'>Cheque</SelectItem>
                                                            <SelectItem value='Credit Card'>Credit Card</SelectItem>
                                                            <SelectItem value='DD'>DD</SelectItem>
                                                            <SelectItem value='Debit Card'>Debit Card</SelectItem>
                                                            <SelectItem value='NEFT'>NEFT</SelectItem>
                                                            <SelectItem value='Net Banking'>Net Banking</SelectItem>
                                                            <SelectItem value='Swiped Card'>Swiped Card</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className='flex flex-col w-full gap-2 sm:flex-row'>
                            {/* Admission Account */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Admission Account</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='admission_account'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field?.value}
                                                        onValueChange={field?.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {admissionAccounts?.length < 1 ? (
                                                                <p>No accounts</p>
                                                                // @ts-ignore
                                                            ) : !admissionAccounts[0]?.account_name ? (
                                                                <LoadingIcon />
                                                            ) : admissionAccounts?.map((item:any) => (
                                                                <SelectItem value={item?.account_name} key={item?._id}>{item?.account_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Post Account */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Post Account</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='post_account'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field?.value}
                                                        onValueChange={field?.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {postAccounts?.length < 1 ? (
                                                                <p>No accounts</p>
                                                                // @ts-ignore
                                                            ) : !postAccounts[0]?.account_name ? (
                                                                <LoadingIcon />
                                                            ) : postAccounts?.map((item:any) => (
                                                                <SelectItem value={item?.account_name} key={item?._id}>{item?.account_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>




                        <div className='flex flex-col w-full gap-2 sm:flex-row'>
                            {/* Send Sms After Enquiry */}
                            <FormField
                                control={form?.control}
                                name='send_sms_after_enquiry'
                                render={({field}) => (
                                    <FormItem className='flex-1 flex flex-row items-start justify-start sm:items-center sm:gap-2'>
                                            <FormControl>
                                                <div className='flex-1 flex items-center justify-start space-x-2'>
                                                    <Label htmlFor='send_sms_after_enquiry' className='text-[11px]'>
                                                        Send Sms After Enquiry
                                                    </Label>
                                                    <Switch
                                                        id='send_sms_after_enquiry'
                                                        {...field}
                                                        // @ts-ignore
                                                        value={field?.value}
                                                        onCheckedChange={field?.onChange}
                                                        checked={field?.value}
                                                    />
                                                </div>
                                            </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* Is Auto Roll No. */}
                            <FormField
                                control={form?.control}
                                name='is_auto_roll_no'
                                render={({field}) => (
                                    <FormItem className='flex-1 flex flex-row items-start justify-start sm:items-center sm:gap-2'>
                                            <FormControl>
                                                <div className='flex-1 flex items-center justify-start space-x-2'>
                                                    <Label htmlFor='is_auto_roll_no' className='text-[11px]'>
                                                        Is Auto Roll No.
                                                    </Label>
                                                    <Switch
                                                        id='is_auto_roll_no'
                                                        {...field}
                                                        // @ts-ignore
                                                        value={field?.value}
                                                        onCheckedChange={field?.onChange}
                                                        checked={field?.value}
                                                    />
                                                </div>
                                            </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex justify-center mt-4'>
                            <Button
                                className='flex items-center justify-center w-[100px] px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>


            </form>
        </Form>
    )
}





// Export
export default FormComTwo;