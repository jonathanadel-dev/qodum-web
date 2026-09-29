// Imports
import * as z from 'zod';
import {format} from 'date-fns';
import SlotsList from './SlotsList';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {CalendarIcon, ChevronDown} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {createSlot, fetchSlots} from '@/lib/actions/admission/admission/entranceTest/slot.actions';
import {FormControl, Form, FormField, FormItem, FormMessage, FormLabel} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import {SlotCreationValidation} from '@/lib/validations/admission/admission/entranceTest/slotCreation.validation';





// Main function
function FormCom({setIsViewOpened, slots, setSlots}:any) {


    // Toast
    const {toast} = useToast();


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


    // CLasses
    const [classes, setClasses] = useState([{}]);


    // Sessions
    const [sessions, setSessions] = useState([{}]);


    // Show handler
    const showHandler = async () => {
        setIsLoading(true);
        const res = await fetchSlots({class_name:form.getValues().class_name, session:form.getValues().session});
        setSlots(res);
        setIsLoading(false);
    };


    // Form
    const form = useForm({
        resolver: zodResolver(SlotCreationValidation),
        defaultValues: {
            session:'',
            class_name:'',
            till_date:new Date(),
            total_student:0,
            no_of_slot:0,
            no_of_app:0
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof SlotCreationValidation>) => {
        try {

            // Creating slots
            setIsLoading(true);
            for (let i = 1; i < values.no_of_slot + 1; i++) {
                const slotsCreator = async () => {
                    const res = await createSlot({
                        session:values.session,
                        class_name:values.class_name,
                        slot_name:`Slot ${slots.length + i}`,
                        slot_date:values.till_date,
                        start_time:'12 : 00 : 00 AM',
                        end_time:'12 : 00 : 00 PM',
                        applicant:values.no_of_app,
                        alloted:0,
                        students:[]
                    });
                    if(res === 0){
                        toast({title:'Please create a session first', variant:'alert'});
                        return;
                    };
                };
                slotsCreator();
            };

            // Reseting
            form.reset({
                session:values.session,
                class_name:values.class_name,
                till_date:new Date(),
                total_student:0,
                no_of_slot:0,
                no_of_app:0
            });
            const res = await fetchSlots({class_name:form.getValues().class_name, session:form.getValues().session});
            setSlots(res);
            toast({title:'Created Successfully!'});
            setIsLoading(false);

        } catch (err: any) {
            console.log(err);
        }
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const classesRes = await fetchClasses();
            const sessionsRes = await fetchAcademicYears();
            setClasses(classesRes);
            setSessions(sessionsRes);
        };
        fetcher();
    }, []);
    useEffect(() => {
        if(form.getValues().class_name !== '' && form.getValues().session !== ''){
            setIsLoading(true);
            const fetcher = async () => {
                const res = await fetchSlots({class_name:form.getValues().class_name, session:form.getValues().session});
                setSlots(res);
                setIsLoading(false);
            };
            fetcher();
        };
    }, [form.watch('class_name'), form.watch('session')]);


    return (
        <div className='w-[95%] max-h-[90%] max-w-[1500px] flex flex-col items-center overflow-y-scroll custom-sidebar-scrollbar'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center px-2 gap-4 sm:px-4'
                >
                    <div className='w-full max-w-[600px] flex flex-col items-start gap-2 lg:items-end lg:flex-row'>
                        {/* Session */}
                        <div className='w-full flex flex-col items-start'>
                            <p className='text-xs text-hash-color'>Session</p>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                                <FormField
                                    control={form.control}
                                    name='session'
                                    render={({field}) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
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
                        {/* Class */}
                        <div className='w-full flex flex-col items-start'>
                            <p className='text-xs text-hash-color'>Class</p>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                                <FormField
                                    control={form.control}
                                    name='class_name'
                                    render={({field}) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
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
                        {/* Till Date */}
                        <FormField
                            control={form?.control}
                            name='till_date'
                            render={() => (
                                <FormItem className='relative w-full h-9 pb-[8px] flex flex-col items-start justify-center mt-2 lg:mt-0'>
                                    <FormLabel className='basis-auto h-2 pr-[4px] text-start text-[11px] text-[#726E71] lg:basis-[35%]'>Till Date</FormLabel>
                                    <Popover open={isCalendarOpened === 'dob'} onOpenChange={() => isCalendarOpened === 'dob' ? setIsCalendarOpened('') : setIsCalendarOpened('dob')}>
                                        <PopoverTrigger asChild className='h-7'>
                                            <Button
                                                variant='outline'
                                                className='flex flex-row items-center w-full h-7 text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] lg:basis-[65%]'
                                            >
                                                <CalendarIcon className='mr-2 h-4 w-4' />
                                                {
                                                    form?.getValues()?.till_date
                                                            ? <span>{format(form?.getValues()?.till_date, 'PPP')}</span>
                                                            : <span>Pick a date</span>
                                                }
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-auto p-0'>
                                            <Calendar
                                                mode='single'
                                                selected={form?.getValues()?.till_date}
                                                onSelect={v => {setIsCalendarOpened(''); form?.setValue('till_date', v)}}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />
                        {/* Show Button */}
                        <span
                            onClick={showHandler}
                            className='flex items-center justify-center min-w-[100px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[5px] border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        >
                            Show
                        </span>
                    </div>

                    <div className='w-full max-w-[600px] flex flex-col items-start gap-2 lg:items-end lg:flex-row'>
                        {/* Total Student */}
                        <FormField
                            control={form?.control}
                            name='total_student'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 lg:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Total Student</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {/* No Of Slot */}
                        <FormField
                            control={form?.control}
                            name='no_of_slot'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 lg:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>No Of Slot</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4'>
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
                        {/* No Of App */}
                        <FormField
                            control={form?.control}
                            name='no_of_app'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 lg:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>No Of App</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4'>
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
                        {/* Create Button */}
                        <Button
                            type='submit'
                            className='min-w-[100px] h-8 mb-[-10px] text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[5px] border-white
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        >
                            Create Slot
                        </Button>
                    </div>



                    
                    <div className='flex items-center justify-center w-full mt-4'>
                        <SlotsList
                            slots={slots}
                            setSlots={setSlots}
                            isLoading={isLoading}
                            setIsViewOpened={setIsViewOpened}
                        />
                    </div>

                </form>
            </Form>
        </div>
    )
}





// Export
export default FormCom;