// Imports
import {useState} from 'react';
import {format} from 'date-fns';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {CalendarIcon, ChevronDown} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import LoadingIcon from '@/components/shared/LoadingIcon';





// Main function
const Guardian = ({form, designations, professions}:any) => {


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


    return (
        <div className='flex flex-col gap-2'>





            {/* Guardian's Details */}
            <div className='flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
                <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>Guardian's Details</h2>
                <div className='flex flex-row'>
                    <div className='flex-1 flex flex-col px-4 py-2 gap-2'>
                        {/* Guardian Name */}
                        <FormField
                            control={form.control}
                            name='guardian_details.guardian_name'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Guardian Name</FormLabel>
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
                                    name='guardian_details.profession'
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
                                    name='guardian_details.designation'
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
                    </div>
                    <div className='flex-1 flex flex-col px-4 py-2 gap-5 sm:gap-2'>
                        {/* Company Name */}
                        <FormField
                            control={form.control}
                            name='guardian_details.company_name'
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
                            name='guardian_details.business_details'
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
                            name='guardian_details.qualification'
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
                    </div>
                </div>
            </div>







            {/* If Single Parent Please Specify */}
            <div className='flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
                <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>If Single Parent Please Specify</h2>
                <div className='flex flex-col gap-2 px-2 py-2 lg:flex-row'>
                    {/* Student Lives With */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Student Lives With</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='guardian_details.if_single_parent.student_lives_with'
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
                                                        <SelectItem value='Both Parents'>Both Parents</SelectItem>
                                                        <SelectItem value='Mother'>Mother</SelectItem>
                                                        <SelectItem value='Father'>Father</SelectItem>
                                                        <SelectItem value='Other'>Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    {/* Legal Custody Of The Child */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Legal Custody Of The Child</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='guardian_details.if_single_parent.legal_custody_of_the_child'
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
                                                        <SelectItem value='Both Parents'>Both Parents</SelectItem>
                                                        <SelectItem value='Mother'>Mother</SelectItem>
                                                        <SelectItem value='Father'>Father</SelectItem>
                                                        <SelectItem value='Other'>Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    {/* Coresspondance To */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Coresspondance To</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='guardian_details.if_single_parent.correspondence_to'
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
                                                        <SelectItem value='Both Parents'>Both Parents</SelectItem>
                                                        <SelectItem value='Mother'>Mother</SelectItem>
                                                        <SelectItem value='Father'>Father</SelectItem>
                                                        <SelectItem value='Other'>Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    {/* Check If Applicable */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Check If Applicable</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='guardian_details.if_single_parent.check_id_applicable'
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
                                                        <SelectItem value='Father Deceased'>Father Deceased</SelectItem>
                                                        <SelectItem value='Parents Divorced'>Parents Divorced</SelectItem>
                                                        <SelectItem value='Father Remarried'>Father Remarried</SelectItem>
                                                        <SelectItem value='Mother Deceased'>Mother Deceased</SelectItem>
                                                        <SelectItem value='Parents Separated'>Parents Separated</SelectItem>
                                                        <SelectItem value='Mother Remarried'>Mother Remarried</SelectItem>
                                                        <SelectItem value='Parents Living Outside India'>Parents Living Outside India</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    {/* Separation Reason */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Separation Reason</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='guardian_details.if_single_parent.separation_reason'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};





// Export
export default Guardian;