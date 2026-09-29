// Imports
import {format} from 'date-fns';
import {useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {CalendarIcon, ChevronDown} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import LoadingIcon from '@/components/shared/LoadingIcon';





// Main function
const Parent = ({form, fatherDob, setFatherDob, motherDob, setMotherDob, anniversaryDate, setAnniversaryDate, designations, professions}:any) => {

    // Use effects
    useEffect(() => {
        if(fatherDob){
            // @ts-ignore
            form.setValue('parents.father.dob', fatherDob._d);
        };
    }, [fatherDob]);
    useEffect(() => {
        if(motherDob){
            // @ts-ignore
            form.setValue('parents.mother.dob', motherDob._d);
        };
    }, [motherDob]);
    useEffect(() => {
        if(anniversaryDate){
            // @ts-ignore
            form.setValue('parents.mother.anniversary_date', anniversaryDate._d);
        };
    }, [anniversaryDate]);

    return (
        <div className='flex flex-row justify-between gap-2'>
            {/* Father Data */}
            <div className='flex-1 flex flex-col gap-3 sm:gap-2'>
                <h2 className='w-full bg-[#EDF1F5] font-semibold text-center text-sm py-2'>Father's Details</h2>
                {/* Father Name */}
                <FormField
                    control={form.control}
                    name='parents.father.father_name'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Father Name</FormLabel>
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
                {/* Middle Name */}
                <FormField
                    control={form.control}
                    name='parents.father.middle_name'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Middle Name</FormLabel>
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
                {/* Last Name */}
                <FormField
                    control={form.control}
                    name='parents.father.last_name'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Last Name</FormLabel>
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
                {/* Profession */}
                <div className='w-full flex flex-col items-center sm:flex-row'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Profession</FormLabel>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                        <FormField
                            control={form.control}
                            name='parents.father.profession'
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
                                                {professions.length < 1 ? (
                                                    <p className='text-[11px]'>No professions</p>
                                                ) : !professions[0].profession ? (
                                                    <LoadingIcon />
                                                ) : professions.map((d:any) => (
                                                    <SelectItem value={d.profession} key={d._id}>{d.profession}</SelectItem>
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
                {/* Designation */}
                <div className='w-full flex flex-col items-center sm:flex-row'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Designation</FormLabel>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                        <FormField
                            control={form.control}
                            name='parents.father.designation'
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
                                                {designations.length < 1 ? (
                                                    <p className='text-[11px]'>No designations</p>
                                                ) : !designations[0].designation ? (
                                                    <LoadingIcon />
                                                ) : designations.map((d:any) => (
                                                    <SelectItem value={d.designation} key={d._id}>{d.designation}</SelectItem>
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
                {/* Residence Address */}
                <FormField
                    control={form.control}
                    name='parents.father.residence_address'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Residence Address</FormLabel>
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
                {/* Office Address */}
                <FormField
                    control={form.control}
                    name='parents.father.office_address'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Office Address</FormLabel>
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
                {/* Email */}
                <FormField
                    control={form.control}
                    name='parents.father.email'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Email</FormLabel>
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
                {/* Alternate Email */}
                <FormField
                    control={form.control}
                    name='parents.father.alternate_email'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Alternate Email</FormLabel>
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
                {/* DOB */}
                <FormField
                    control={form.control}
                    name='parents.father.dob'
                    render={() => (
                        <FormItem className='relative w-full h-7 pb-[8px] flex flex-col items-start justify-center mt-2 sm:mt-0 sm:flex-row sm:items-center'>
                            <FormLabel className='basis-auto h-2 pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>DOB</FormLabel>
                            <div className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={fatherDob}
                                    setSelectedDate={setFatherDob}
                                />
                            </div>
                        </FormItem>
                    )}
                />
                {/* Mobile */}
                <FormField
                    control={form.control}
                    name='parents.father.mobile'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Mobile</FormLabel>
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
                {/* Phone */}
                <FormField
                    control={form.control}
                    name='parents.father.phone'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Phone</FormLabel>
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
                {/* Company Name */}
                <FormField
                    control={form.control}
                    name='parents.father.company_name'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Company Name</FormLabel>
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
                {/* Business Details */}
                <FormField
                    control={form.control}
                    name='parents.father.business_details'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Business Details</FormLabel>
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
                {/* Qualification */}
                <FormField
                    control={form.control}
                    name='parents.father.qualification'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Qualification</FormLabel>
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
                {/* Service In */}
                <FormField
                    control={form.control}
                    name='parents.father.service_in'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Service In</FormLabel>
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
                {/* Office Phone */}
                <FormField
                    control={form.control}
                    name='parents.father.office_phone'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Office Phone</FormLabel>
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
                {/* Office Mobile */}
                <FormField
                    control={form.control}
                    name='parents.father.office_mobile'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Office Mobile</FormLabel>
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
                {/* Office Extension */}
                <FormField
                    control={form.control}
                    name='parents.father.office_extension'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Office Extension</FormLabel>
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
                {/* Office Email */}
                <FormField
                    control={form.control}
                    name='parents.father.office_email'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Office Email</FormLabel>
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
                {/* Office Website */}
                <FormField
                    control={form.control}
                    name='parents.father.office_website'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Office Website</FormLabel>
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
                {/* Annual Income */}
                <FormField
                    control={form.control}
                    name='parents.father.annual_income'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Annual Income</FormLabel>
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
                {/* Parent Status */}
                <div className='w-full flex flex-col items-center sm:flex-row'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Parent Status</FormLabel>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                        <FormField
                            control={form.control}
                            name='parents.father.parent_status'
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
                                                    <SelectItem value='N.A.'>N.A.</SelectItem>
                                                    <SelectItem value='Principal'>Principal</SelectItem>
                                                    <SelectItem value='Teacher'>Teacher</SelectItem>
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





            {/* Mother Data */}
            <div className='flex-1 flex flex-col gap-3 sm:gap-2'>
                <h2 className='w-full bg-[#EDF1F5] font-semibold text-center text-sm py-2'>Mother's Details</h2>
                {/* Mother Name */}
                <FormField
                    control={form.control}
                    name='parents.mother.mother_name'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Mother Name</FormLabel>
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
                {/* Middle Name */}
                <FormField
                    control={form.control}
                    name='parents.mother.middle_name'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Middle Name</FormLabel>
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
                {/* Last Name */}
                <FormField
                    control={form.control}
                    name='parents.mother.last_name'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Last Name</FormLabel>
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
                {/* Profession */}
                <div className='w-full flex flex-col items-center sm:flex-row'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Profession</FormLabel>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                        <FormField
                            control={form.control}
                            name='parents.mother.profession'
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
                                                {professions.length < 1 ? (
                                                    <p className='text-[11px]'>No professions</p>
                                                ) : !professions[0].profession ? (
                                                    <LoadingIcon />
                                                ) : professions.map((d:any) => (
                                                    <SelectItem value={d.profession} key={d._id}>{d.profession}</SelectItem>
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
                {/* Designation */}
                <div className='w-full flex flex-col items-center sm:flex-row'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Designation</FormLabel>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                        <FormField
                            control={form.control}
                            name='parents.mother.designation'
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
                                                {designations.length < 1 ? (
                                                    <p className='text-[11px]'>No designations</p>
                                                ) : !designations[0].designation ? (
                                                    <LoadingIcon />
                                                ) : designations.map((d:any) => (
                                                    <SelectItem value={d.designation} key={d._id}>{d.designation}</SelectItem>
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
                {/* Residence Address */}
                <FormField
                    control={form.control}
                    name='parents.mother.residence_address'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Residence Address</FormLabel>
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
                {/* Office Address */}
                <FormField
                    control={form.control}
                    name='parents.mother.office_address'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Office Address</FormLabel>
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
                {/* Email */}
                <FormField
                    control={form.control}
                    name='parents.mother.email'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Email</FormLabel>
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
                {/* Alternate Email */}
                <FormField
                    control={form.control}
                    name='parents.mother.alternate_email'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Alternate Email</FormLabel>
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
                {/* DOB */}
                <FormField
                    control={form.control}
                    name='parents.mother.dob'
                    render={() => (
                        <FormItem className='relative w-full h-7 pb-[8px] flex flex-col items-start justify-center mt-2 sm:mt-0 sm:flex-row sm:items-center'>
                            <FormLabel className='basis-auto h-2 pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>DOB</FormLabel>
                            <div className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={motherDob}
                                    setSelectedDate={setMotherDob}
                                />
                            </div>
                        </FormItem>
                    )}
                />
                {/* Mobile */}
                <FormField
                    control={form.control}
                    name='parents.mother.mobile'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Mobile</FormLabel>
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
                {/* Phone */}
                <FormField
                    control={form.control}
                    name='parents.mother.phone'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Phone</FormLabel>
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
                {/* Company Name */}
                <FormField
                    control={form.control}
                    name='parents.mother.company_name'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Company Name</FormLabel>
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
                {/* Business Details */}
                <FormField
                    control={form.control}
                    name='parents.mother.business_details'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Business Details</FormLabel>
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
                {/* Qualification */}
                <FormField
                    control={form.control}
                    name='parents.mother.qualification'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Qualification</FormLabel>
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
                {/* Service In */}
                <FormField
                    control={form.control}
                    name='parents.mother.service_in'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Service In</FormLabel>
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
                {/* Office Phone */}
                <FormField
                    control={form.control}
                    name='parents.mother.office_phone'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Office Phone</FormLabel>
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
                {/* Office Mobile */}
                <FormField
                    control={form.control}
                    name='parents.mother.office_mobile'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Office Mobile</FormLabel>
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
                {/* Office Extension */}
                <FormField
                    control={form.control}
                    name='parents.mother.office_extension'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Office Extension</FormLabel>
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
                {/* Office Email */}
                <FormField
                    control={form.control}
                    name='parents.mother.office_email'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Office Email</FormLabel>
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
                {/* Office Website */}
                <FormField
                    control={form.control}
                    name='parents.mother.office_website'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Office Website</FormLabel>
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
                {/* Annual Income */}
                <FormField
                    control={form.control}
                    name='parents.mother.annual_income'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Annual Income</FormLabel>
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
                {/* Anniversary Date */}
                <FormField
                    control={form.control}
                    name='parents.mother.anniversary_date'
                    render={() => (
                        <FormItem className='relative w-full h-7 pb-[8px] flex flex-col items-start justify-center mt-2 sm:mt-0 sm:flex-row sm:items-center'>
                            <FormLabel className='basis-auto h-2 pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Anniversary Date</FormLabel>
                            <div className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={anniversaryDate}
                                    setSelectedDate={setAnniversaryDate}
                                />
                            </div>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};





// Export
export default Parent;