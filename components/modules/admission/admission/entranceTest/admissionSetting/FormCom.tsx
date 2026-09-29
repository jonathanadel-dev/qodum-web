// Imports
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {useContext, useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {fetchBoards} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {FormControl, Form, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import {AdmissionSettingValidation} from '@/lib/validations/admission/masterSettings/admission.validation';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
import { AuthContext } from '@/context/AuthContext';





// Main function
function FormCom() {

    // User
    const {user} = useContext(AuthContext);


    // Permissions
    const [permissions, setPermissions] = useState({
        add:false,
        modify:false,
        delete:false,
        print:false,
        read_only:false
    });


    // Toast
    const {toast} = useToast();


    // Sessions
    const [sessions, setSessions] = useState([{}]);


    // Schools
    const [schools, setSchools] = useState([{}]);


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Boards
    const [boards, setBoards] = useState([{}]);


    // Form
    const form = useForm({
        resolver: zodResolver(AdmissionSettingValidation),
        defaultValues: {
            session:'',
            pay_mode:'',
            send_sms:false,
            is_auto_roll_no:false,
            school:'',
            class:'',
            board:'',
            number:'',
            should_be:localStorage.getItem('setting_type') || 'Automatic',
            rec_no_start_from:'',
            prefix:localStorage.getItem('prefix') || '',
            start_from:localStorage.getItem('start_from') || '',
            lead_zero:localStorage.getItem('lead_zero') || '',
            suffix:localStorage.getItem('suffix') || ''
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof AdmissionSettingValidation>) => {
        try {

            // localStorage.setItem('setting_type', values.should_be);
            // localStorage.setItem('prefix', values.prefix);
            // localStorage.setItem('start_from', values.start_from);
            // localStorage.setItem('lead_zero', values.lead_zero);
            // localStorage.setItem('suffix', values.suffix);
            toast({title:'Settings Saved Successfully!'});

        } catch (err: any) {
            console.log(err);
        }
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const sessionsRes = await fetchAcademicYears();
            const schoolsRes = await fetchGlobalSchoolDetails();
            const classesRes = await fetchClasses();
            const boardsRes = await fetchBoards();
            setSessions(sessionsRes);
            setSchools(schoolsRes);
            setClasses(classesRes);
            setBoards(boardsRes);
        };
        fetcher();
    }, []);
    useEffect(() => {}, [form.watch('should_be')]);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Admission')?.permissions?.find((pp:any) => pp.sub_menu === 'Admission Setting');
        setPermissions(grantedPermissions);
    }, [user]);


    return (
        <div className='w-[90%] max-w-[1000px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <Form
                {...form}
            >
                <form
                    // onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center px-2 pt-6 sm:px-4'
                >


                    {/* Admission Setting */}
                    <div className='w-full flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
                        <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>Admission Setting</h2>
                        <div className='flex flex-col px-4 py-2 gap-2'>
                            <div className='flex flex-row w-full gap-2'>
                                {/* Session */}
                                <div className='w-full flex flex-col items-center sm:flex-row'>
                                    <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Session</FormLabel>
                                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                        <FormField
                                            control={form.control}
                                            name='session'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                    <FormControl>
                                                        <Select
                                                            {...field}
                                                            value={field.value}
                                                            onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                                <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {sessions.length < 1 ? (
                                                                    <p>No sessions</p>
                                                                ) : // @ts-ignore
                                                                    !sessions[0].year_name ? (
                                                                    <LoadingIcon />
                                                                ) : sessions.map((session:any) => (
                                                                    <SelectItem value={session.year_name} key={session._id}>{session.year_name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                {/* Paymode */}
                                <div className='w-full flex flex-col items-center sm:flex-row'>
                                    <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Paymode</FormLabel>
                                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                        <FormField
                                            control={form.control}
                                            name='pay_mode'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                    <FormControl>
                                                        <Select
                                                            {...field}
                                                            value={field.value}
                                                            onValueChange={field.onChange}
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
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className='flex flex-row w-full gap-2'>
                                {/* Send SMS */}
                                <FormField
                                    control={form.control}
                                    name='send_sms'
                                    render={({ field }) => (
                                        <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-end justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                            <>
                                                <FormControl>
                                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                                        <Label
                                                            htmlFor='send_sms'
                                                            className='text-xs text-[#726E71] text-end pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                                        >
                                                            Send SMS After Enquiry
                                                        </Label>
                                                        <Switch
                                                            id='send_sms'
                                                            {...field}
                                                            // @ts-ignore
                                                            value={field.value}
                                                            onCheckedChange={field.onChange}
                                                            checked={field.value}
                                                        />
                                                    </div>
                                                </FormControl>
                                            </>
                                        </FormItem>
                                    )}
                                />
                                {/* Is Auto Roll No. */}
                                <FormField
                                    control={form.control}
                                    name='is_auto_roll_no'
                                    render={({ field }) => (
                                        <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                            <>
                                                <FormControl>
                                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                                        <Label
                                                            htmlFor='is_auto_roll_no'
                                                            className='text-xs text-[#726E71] text-end pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                                        >
                                                            Is Auto Roll No.
                                                        </Label>
                                                        <Switch
                                                            id='is_auto_roll_no'
                                                            {...field}
                                                            // @ts-ignore
                                                            value={field.value}
                                                            onCheckedChange={field.onChange}
                                                            checked={field.value}
                                                        />
                                                    </div>
                                                </FormControl>
                                            </>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>





                    {/* Enquiry, Registration, and Admission No. Setting */}
                    <div className='w-full flex flex-col mt-4 border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
                        <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>Enquiry, Registration, and Admission No. Setting</h2>
                        <div className='flex flex-col px-4 py-2 gap-2'>
                            <div className='flex flex-row gap-2'>
                                {/* School */}
                                <div className='w-full flex flex-col items-center'>
                                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>School</FormLabel>
                                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                        <FormField
                                            control={form?.control}
                                            name='school'
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
                                                                {schools?.length < 1 ? (
                                                                    <p>No schoolss</p>
                                                                    // @ts-ignore
                                                                ) : !schools[0]?.school_name ? (
                                                                    <LoadingIcon />
                                                                ) : schools?.map((item:any) => (
                                                                    <SelectItem value={item?.school_name} key={item?._id}>{item?.school_name}</SelectItem>
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
                                {/* Class */}
                                <div className='w-full flex flex-col items-center'>
                                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Class</FormLabel>
                                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                        <FormField
                                            control={form?.control}
                                            name='class'
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
                                                                {classes?.length < 1 ? (
                                                                    <p>No classes</p>
                                                                    // @ts-ignore
                                                                ) : !classes[0]?.class_name ? (
                                                                    <LoadingIcon />
                                                                ) : classes?.map((item:any) => (
                                                                    <SelectItem value={item?.class_name} key={item?._id}>{item?.class_name}</SelectItem>
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
                                {/* Board */}
                                <div className='w-full flex flex-col items-center'>
                                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Board</FormLabel>
                                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                        <FormField 
                                            control={form?.control}
                                            name='board'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
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
                                                                {boards?.length < 1 ? (
                                                                    <p>No boards</p>
                                                                    // @ts-ignore
                                                                ) : !boards[0]?.board ? (
                                                                    <LoadingIcon />
                                                                ) : boards?.map((item:any) => (
                                                                    <SelectItem value={item?.board} key={item?._id}>{item?.board}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className='flex flex-col gap-4 lg:flex-row mt-4'>
                                {/* Number */}
                                <div className='flex-1 flex flex-col items-center'>
                                    <FormField 
                                        control={form?.control}
                                        name='number'
                                        render={({ field }) => (
                                            <FormItem className='w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
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
                                                            <SelectItem value='Enquiry No.'>Enquiry No.</SelectItem>
                                                            <SelectItem value='Registration No.'>Registration No.</SelectItem>
                                                            <SelectItem value='Admission No.'>Admission No.</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Should Be */}
                                <div className="flex-1 flex flex-col items-start  gap-1">
                                    <FormLabel className='text-start text-xs text-[#726E71] me-3'>should be</FormLabel>
                                    <FormField
                                        control={form.control}
                                        name='should_be'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    {/* @ts-ignore */}
                                                    <RadioGroup defaultValue={form.getValues().should_be} className='flex gap-2'>
                                                        <RadioGroupItem
                                                            value='Automatic'
                                                            onClick={() => form.setValue('should_be', 'Automatic')}
                                                        />
                                                        <Label className='text-xs text-[#726E71] '>Automatic</Label>
                                                        <RadioGroupItem
                                                            value='Manual'
                                                            onClick={() => form.setValue('should_be', 'Manual')}
                                                        />
                                                        <Label className='text-xs text-[#726E71] '>Manual</Label>
                                                    </RadioGroup>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Rec. No. Start From (School Wise) */}
                                <FormField
                                    control={form?.control}
                                    name='rec_no_start_from'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 mt-2 sm:mt-0'>
                                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                                <FormLabel className='basis-auto pr-[4px] text-start text-[11px] text-[#726E71] sm:basis-[35%]'>Rec. No. Start From (School Wise)</FormLabel>
                                                <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>


                            {form.getValues().should_be === 'Automatic' && (
                                <div className='flex flex-col gap-2 lg:flex-row mt-4'>
                                    {/* Prefix */}
                                    <FormField
                                        control={form?.control}
                                        name='prefix'
                                        render={({ field }) => (
                                            <FormItem className='w-full mt-2 sm:mt-0'>
                                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Prefix</FormLabel>
                                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                                    </div>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    {/* Start From */}
                                    <FormField
                                        control={form?.control}
                                        name='start_from'
                                        render={({ field }) => (
                                            <FormItem className='w-full mt-2 sm:mt-0'>
                                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Start From</FormLabel>
                                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                                    </div>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    {/* Lead Zero */}
                                    <FormField
                                        control={form?.control}
                                        name='lead_zero'
                                        render={({ field }) => (
                                            <FormItem className='w-full mt-2 sm:mt-0'>
                                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Lead Zero</FormLabel>
                                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                                    </div>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    {/* Suffix */}
                                    <FormField
                                        control={form?.control}
                                        name='suffix'
                                        render={({ field }) => (
                                            <FormItem className='w-full mt-2 sm:mt-0'>
                                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Suffix</FormLabel>
                                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                                    </div>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}


                        </div>
                    </div>

                    
                    {/* Buttons */}
                    {permissions.add && (
                        <Button
                            type='submit'
                            className='px-8 h-8 mb-4 mt-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px]'
                        >
                            Save
                        </Button>
                    )}
                </form>
            </Form>
        </div>
    )
}





// Export
export default FormCom;