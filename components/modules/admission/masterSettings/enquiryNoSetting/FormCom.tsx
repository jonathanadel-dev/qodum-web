'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import {EnquiryNoSettingValidation} from '@/lib/validations/admission/masterSettings/EnquiryNoSetting.validation';
import {createEnquiryNoSetting, deleteEnquiryNoSetting, modifyEnquiryNoSetting} from '@/lib/actions/admission/masterSettings/enquiryNoSetting.actions';





// Main function
const FormCom = ({setIsViewOpened, enquiryNoSettings, updateEnquiryNoSetting, setUpdateEnquiryNoSetting, isEnquiryNoEditable}:any) => {


    // Toast
    const {toast} = useToast();


    // Sessions
    const [sessions, setSessions] = useState<any>([{}]);


    // Comparison object
    const comparisonObject = {
        session:updateEnquiryNoSetting.session,
        enquiry_no_setting_should_be:updateEnquiryNoSetting.enquiry_no_setting_should_be,
        prefix:updateEnquiryNoSetting.prefix,
        start_from:updateEnquiryNoSetting.start_from,
        lead_zero:updateEnquiryNoSetting.lead_zero,
        suffix:updateEnquiryNoSetting.suffix
    };


    // Form
    const form = useForm({
        resolver: zodResolver(EnquiryNoSettingValidation),
        defaultValues: {
            session:updateEnquiryNoSetting.id === '' ? '' : updateEnquiryNoSetting.session,
            enquiry_no_setting_should_be:updateEnquiryNoSetting.id === '' ? localStorage.getItem('enquiry_no_setting_should_be') || 'Automatic' : updateEnquiryNoSetting.enquiry_no_setting_should_be,
            prefix:updateEnquiryNoSetting.id === '' ? '' : updateEnquiryNoSetting.prefix,
            start_from:updateEnquiryNoSetting.id === '' ? '' : updateEnquiryNoSetting.start_from,
            lead_zero:updateEnquiryNoSetting.id === '' ? 0 : updateEnquiryNoSetting.lead_zero,
            suffix:updateEnquiryNoSetting.id === '' ? '' : updateEnquiryNoSetting.suffix
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof EnquiryNoSettingValidation>) => {

        // Local storage setting
        if(!isEnquiryNoEditable){
            toast({title:"Can't edit enquiry number setting while in use", variant:'alert'});
            return;
        };

        localStorage.setItem('enquiry_no_setting_should_be', form.getValues().enquiry_no_setting_should_be);

        // Create enquiry no setting
        if(updateEnquiryNoSetting.id === ''){
            await createEnquiryNoSetting({
                session:values.session,
                enquiry_no_setting_should_be:values.enquiry_no_setting_should_be,
                prefix:values.prefix,
                start_from:values.start_from,
                lead_zero:values.lead_zero,
                suffix:values.suffix
            });
            toast({title:'Added Successfully!'});
            localStorage.setItem('enquiryNo', `${values.prefix}${values.lead_zero?.substring(0, values.lead_zero.length - 1)}${Number(values.start_from)}${values.suffix}`);
        }
        // Modify enquiry no setting
        else if(!deepEqual(comparisonObject, values)){
            await modifyEnquiryNoSetting({
                id:updateEnquiryNoSetting.id,
                session:values.session,
                enquiry_no_setting_should_be:values.enquiry_no_setting_should_be,
                prefix:values.prefix,
                start_from:values.start_from,
                lead_zero:values.lead_zero,
                suffix:values.suffix
            });
            localStorage.setItem('enquiryNo', `${values.prefix}${values.lead_zero?.substring(0, values.lead_zero.length - 1)}${Number(values.start_from)}${values.suffix}`);
            toast({title:'Updated Successfully!'});
        }
        // Delete enquiry no setting
        else if(updateEnquiryNoSetting.isDeleteClicked){
            await deleteEnquiryNoSetting({id:updateEnquiryNoSetting.id});
            localStorage.removeItem('enquiryNo');
            toast({title:'Deleted Successfully!'});
        };


        // Reseting
        setUpdateEnquiryNoSetting({
            id:'',
            isDeleteClicked:false,
            session:'',
            enquiry_no_setting_should_be:'Automatic',
            prefix:'',
            start_from:'',
            lead_zero:0,
            suffix:''
        });
        form.reset({
            session:'',
            enquiry_no_setting_should_be:'Automatic',
            prefix:'',
            start_from:'',
            lead_zero:0,
            suffix:''
        });

    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const sessionsRes = await fetchAcademicYears();
            setSessions(sessionsRes);
        };
        fetcher();
    }, []);
    useEffect(() => {
        localStorage.setItem('enquiry_no_setting_should_be', form.getValues().enquiry_no_setting_should_be);
    }, [form.watch('enquiry_no_setting_should_be')]);
    useEffect(() => {
        if(sessions.length > 0){
            form.setValue('session', sessions[0].year_name);
        };
    }, [sessions]);

    return (
        <div className='w-[80%] h-[80%] border-[0.5px] border-[#ccc] rounded-[4px] overflow-y-scroll custom-sidebar-scrollbar'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative mx-auto w-full flex flex-col pt-4 items-center px-2 sm:px-4 sm:gap-2'
                >

                    <div className="w-full flex gap-2 items-start py-4 px-5 lg:items-end flex-col lg:flex-row justify-between text-left">
                        <div className='me-2 min-w-[150px] flex justify-between lg:justify-start gap-1'>
                            <FormLabel className='text-xs text-[#726E71] mt-2'>Session</FormLabel>
                            <FormField
                                control={form.control}
                                name='session'
                                render={({field}) => (
                                    <FormItem className='flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {sessions.length < 1 ? (
                                                        <p className='text-hash-color text-xs'>No sessions</p>
                                                    ) : !sessions[0].year_name ? (
                                                        <LoadingIcon />
                                                    ) : sessions.map((s:any) => (
                                                        <SelectItem value={s.year_name} key={s._id}>{s.year_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="me-2 h-full w-full flex flex-row items-center lg:justify-start lg:w-auto gap-1">
                            <FormLabel className='text-xs text-[#726E71]  me-3'>Enquiry No. setting should be</FormLabel>
                            <FormField
                                control={form.control}
                                name='enquiry_no_setting_should_be'
                                render={({ field }) => (
                                    <FormItem className='max-w-[180px] flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            {/* @ts-ignore */}
                                            <RadioGroup defaultValue={form.getValues().enquiry_no_setting_should_be} className='flex gap-2'>
                                                <RadioGroupItem
                                                    value='Automatic'
                                                    onClick={() => form.setValue('enquiry_no_setting_should_be', 'Automatic')}
                                                />
                                                <Label className='text-xs text-[#726E71] '>Automatic</Label>
                                                <RadioGroupItem
                                                    value='Manual'
                                                    onClick={() => form.setValue('enquiry_no_setting_should_be', 'Manual')}
                                                />
                                                <Label className='text-xs text-[#726E71] '>Manual</Label>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* <div className='w-full flex item-end justify-end lg:w-auto'>
                            <span
                                onClick={modifyHandler}
                                className='flex items-center justify-center w-24 px-[8px] mt-5 sm:mt-0 h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                            >
                                Modify
                            </span>
                        </div> */}


                    </div>

                    <div className="w-full mt-5 sm:mt-2 flex flex-col gap-2 items-center py-4 px-5 xl:flex-row justify-between text-left">
                        {form.getValues().enquiry_no_setting_should_be === 'Automatic' ? (
                            <div className='flex flex-col'>
                                <div className="w-full mt-5 sm:mt-2 flex flex-col gap-2 items-center py-4 px-5 md:flex-row justify-between text-left">
                                    <div className="me-2 flex items-center justify-between sm:justify-start gap-[2px]">
                                        <FormLabel className='text-xs w-[70px] text-[#726E71]'>Prefix</FormLabel>
                                        <FormField
                                            control={form.control}
                                            name='prefix'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-[90%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-xs' />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="me-2 flex items-center justify-between sm:justify-start gap-1">
                                        <FormLabel className='text-xs w-[70px] text-[#726E71]'>Start From</FormLabel>
                                        <FormField
                                            control={form.control}
                                            name='start_from'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-[90%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-xs' />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="me-2 flex items-center justify-between sm:justify-start gap-1">
                                        <FormLabel className='text-xs w-[70px] text-[#726E71]'>Lead Zero</FormLabel>
                                        <FormField
                                            control={form.control}
                                            name='lead_zero'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-[90%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-xs' />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="me-2 flex items-center justify-between sm:justify-start gap-1">
                                        <FormLabel className='text-xs w-[70px] text-[#726E71]'>Suffix</FormLabel>
                                        <FormField
                                            control={form.control}
                                            name='suffix'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-[90%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-xs' />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <Buttons setIsViewOpened={setIsViewOpened} enquiryNoSettings={enquiryNoSettings} updateEnquiryNoSetting={updateEnquiryNoSetting} setUpdateEnquiryNoSetting={setUpdateEnquiryNoSetting} onSubmit={onSubmit} form={form}/>
                            </div>
                        ) : ''}

                    </div>


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;