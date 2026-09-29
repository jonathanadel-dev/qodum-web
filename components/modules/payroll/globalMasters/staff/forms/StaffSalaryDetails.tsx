// Imports
import moment from 'moment';
import {useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {ChevronDown, ChevronsUpDown} from 'lucide-react';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const StaffSalaryDetails = ({form, updateStaff, confirmationDate, setConfirmationDate, permanentDate, setPermanentDate, leavingDate, setLeavingDate, joiningDateEpf, setJoiningDateEpf, joiningDateEps, setJoiningDateEps, leavingDateEpf, setLeavingDateEpf, leavingDateEps, setLeavingDateEps, probationDate, setProbationDate, incrementDate, setIncrementDate}:any) => {

    // Use effects
    useEffect(() => {
        if(confirmationDate){
            // @ts-ignore
            form.setValue('staff_salary_details.confirmation_date', confirmationDate._d);
        };
    }, [confirmationDate]);
    useEffect(() => {
        if(permanentDate){
            // @ts-ignore
            form.setValue('staff_salary_details.permanent_date', permanentDate._d);
        };
    }, [permanentDate]);
    useEffect(() => {
        if(leavingDate){
            // @ts-ignore
            form.setValue('staff_salary_details.leaving_date', leavingDate._d);
        };
    }, [leavingDate]);
    useEffect(() => {
        if(joiningDateEpf){
            // @ts-ignore
            form.setValue('staff_salary_details.joining_date_epf', joiningDateEpf._d);
        };
    }, [joiningDateEpf]);
    useEffect(() => {
        if(joiningDateEps){
            // @ts-ignore
            form.setValue('staff_salary_details.joining_date_eps', joiningDateEps._d);
        };
    }, [joiningDateEps]);
    useEffect(() => {
        if(leavingDateEpf){
            // @ts-ignore
            form.setValue('staff_salary_details.leaving_date_epf', leavingDateEpf._d);
        };
    }, [leavingDateEpf]);
    useEffect(() => {
        if(leavingDateEps){
            // @ts-ignore
            form.setValue('staff_salary_details.leaving_date_eps', leavingDateEps._d);
        };
    }, [leavingDateEps]);
    useEffect(() => {
        if(probationDate){
            // @ts-ignore
            form.setValue('staff_salary_details.probation_date', probationDate._d);
        };
    }, [probationDate]);
    useEffect(() => {
        if(incrementDate){
            // @ts-ignore
            form.setValue('staff_salary_details.increment_date', incrementDate._d);
        };
    }, [incrementDate]);

    return (
        <div className='flex flex-row items-center gap-4 px-4'>

            {/* Left side */}
            <div className='flex-1 flex flex-col gap-2'>

                {/* Row one */}
                <div className='flex flex-row items-center justify-between'>
                    {/* Emp. No. */}
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.emp_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Emp. No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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


                    {/* PF No. */}
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.pf_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>PF No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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


                {/* Row two */}
                <div className='flex flex-row items-center justify-between'>
                    {/* PAN No. */}
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.pan_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>PAN No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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


                    {/* ESI No. */}
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.esi_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>ESI No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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


                {/* Row three */}
                <div className='flex flex-row items-center justify-between'>
                    {/* Bank Name */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Bank Name</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_salary_details.bank_name'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                                    <SelectItem value='NA'>NA</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* UAN No. */}
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.uan_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>UAN No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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


                {/* Row four */}
                <div className='flex flex-row items-center justify-between'>
                    {/* Bank Account No. */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Bank Account No.</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_salary_details.bank_account_no'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                                    <SelectItem value='NA'>NA</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Emp. Acc. No. */}
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.emp_acc_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Emp. Acc. No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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


                {/* Row five */}
                <div className='flex flex-row items-center justify-between'>
                    {/* Checkboxes */}
                    <div className='flex flex-1 flex-row items-center justify-between pl-2'>
                        {/* Generate Salary */}
                        <div className='flex flex-row items-center justify-center gap-1'>
                            <p className='text-[11px] text-[#726E71]'>Generate Salary</p>
                            <Checkbox
                                className='rounded-[2px] border-[#ccc] text-[#ccc]'
                                checked={form.getValues().staff_salary_details.is_generate_salary}
                                onClick={() => form.getValues().staff_salary_details.is_generate_salary ? form.setValue('staff_salary_details.is_generate_salary', false) : form.setValue('staff_salary_details.is_generate_salary', true)}
                            />
                        </div>


                        {/* Salary to Bank */}
                        <div className='flex flex-row items-center justify-center gap-1'>
                            <p className='text-[11px] text-[#726E71]'>Salary to Bank</p>
                            <Checkbox
                                className='rounded-[2px] border-[#ccc] text-[#ccc]'
                                checked={form.getValues().staff_salary_details.is_salary_to_bank}
                                onClick={() => form.getValues().staff_salary_details.is_salary_to_bank ? form.setValue('staff_salary_details.is_salary_to_bank', false) : form.setValue('staff_salary_details.is_salary_to_bank', true)}
                            />
                        </div>
                    </div>


                    {/* Status */}
                    <div className='flex-1 w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Status</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_salary_details.status'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                                    <SelectItem value='Probation'>Probation</SelectItem>
                                                    <SelectItem value='Contract'>Contract</SelectItem>
                                                    <SelectItem value='Confirmed'>Confirmed</SelectItem>
                                                    <SelectItem value='Permanent'>Permanent</SelectItem>
                                                    <SelectItem value='Adhoc'>Adhoc</SelectItem>
                                                    <SelectItem value='Temporary'>Temporary</SelectItem>
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


                {/* Row six */}
                <div className='flex flex-row items-center justify-between'>
                    {/* Machine No. */}
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.machine_no'
                        render={({ field }) => (
                            <FormItem className='relative flex-1 mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Machine No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Salary Group */}
                    <div className='flex-1 w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Salary Group</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_salary_details.salary_group'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                                    <SelectItem value='NA'>NA</SelectItem>
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


                {/* Row seven */}
                <div className='flex flex-col items-center mt-4 ml-20 rounded-[8px] border-[0.5px] border-[#E8E8E8]'>

                    {/* Header */}
                    <div className='w-full flex flex-row justify-center py-1 text-md text-white border-b-[0.5px] bg-[#435680] border-[#ccc] rounded-t-[8px] cursor-pointer'>
                        Basic Salary Part
                    </div>

                    {/* Headers */}
                    <ul className='w-full flex flex-row text-[10px] text-white border-b-[0.5px] bg-[#435680] border-[#ccc] cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[33.3%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[33.3%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Value
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[33.3%] flex flex-row items-center justify-center px-2 py-[2px]'>
                            Applied On
                            <ChevronsUpDown size={12} />
                        </li>
                    </ul>

                    {/* Values */}
                    <ul className='w-full flex flex-row text-[10px] border-b-[1px] border-[#ccc] sm:text-xs md:text-md'>
                        <li className='basis-[33.3%] flex flex-row items-center px-2 py-2 border-r-[.5px] border-[#ccc]'>Basic</li>
                        <li className='basis-[33.3%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                            <FormField
                                control={form?.control}
                                name='staff_salary_details.basic_salary_part.basic.value'
                                render={({ field }) => (
                                    <FormItem className='relative flex-1 mt-2 lg:mt-0'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                className='h-full flex flex-row items-center text-[11px] pl-2 py-1 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </li>
                        <li className='basis-[33.3%] flex items-center justify-center p-[2px]'>{updateStaff.id !== '' && moment(form.getValues().staff_salary_details?.basic_salary_part?.basic?.applied_on).format('D-M-YYYY')}</li>
                    </ul>
                    <ul className='w-full flex flex-row text-[10px] border-[#ccc] sm:text-xs md:text-md'>
                        <li className='basis-[33.3%] flex flex-row items-center py-2 px-2 border-r-[.5px] border-[#ccc]'>Grade Pay</li>
                        <li className='basis-[33.3%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                            <FormField
                                control={form?.control}
                                name='staff_salary_details.basic_salary_part.grade_pay.value'
                                render={({ field }) => (
                                    <FormItem className='relative flex-1 mt-2 lg:mt-0'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                className='h-full flex flex-row items-center text-[11px] pl-2 py-1 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </li>
                        <li className='basis-[33.3%] flex items-center justify-center p-[2px]'>{updateStaff.id !== '' && moment(form.getValues().staff_salary_details?.basic_salary_part?.grade_pay?.applied_on).format('D-M-YYYY')}</li>
                    </ul>

                </div>

            </div>


            {/* Right side */}
            <div className='flex-1 flex flex-col gap-2'>

                {/* Confirmation Date */}
                <div className='w-full h-7 flex flex-row items-center justify-center'>
                    <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Confirmation Date</FormLabel>
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.confirmation_date'
                        render={() => (
                            <FormItem className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={confirmationDate}
                                    setSelectedDate={setConfirmationDate}
                                />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Permanent Date */}
                <div className='w-full h-7 flex flex-row items-center justify-center'>
                    <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Permanent Date</FormLabel>
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.permanent_date'
                        render={() => (
                            <FormItem className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={permanentDate}
                                    setSelectedDate={setPermanentDate}
                                />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Leaving Date */}
                <div className='w-full h-7 flex flex-row items-center justify-center'>
                    <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Leaving Date</FormLabel>
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.leaving_date'
                        render={() => (
                            <FormItem className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={leavingDate}
                                    setSelectedDate={setLeavingDate}
                                />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Joining Date EPF */}
                <div className='w-full h-7 flex flex-row items-center justify-center'>
                    <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Joining Date EPF</FormLabel>
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.joining_date_epf'
                        render={() => (
                            <FormItem className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={joiningDateEpf}
                                    setSelectedDate={setJoiningDateEpf}
                                />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Joining Date EPS */}
                <div className='w-full h-7 flex flex-row items-center justify-center'>
                    <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Joining Date EPS</FormLabel>
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.joining_date_eps'
                        render={() => (
                            <FormItem className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={joiningDateEps}
                                    setSelectedDate={setJoiningDateEps}
                                />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Leaving Date EPF */}
                <div className='w-full h-7 flex flex-row items-center justify-center'>
                    <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Leaving Date EPF</FormLabel>
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.leaving_date_epf'
                        render={() => (
                            <FormItem className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={leavingDateEpf}
                                    setSelectedDate={setLeavingDateEpf}
                                />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Leaving Date EPS */}
                <div className='w-full h-7 flex flex-row items-center justify-center'>
                    <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Leaving Date EPS</FormLabel>
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.leaving_date_eps'
                        render={() => (
                            <FormItem className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={leavingDateEps}
                                    setSelectedDate={setLeavingDateEps}
                                />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Probation Date */}
                <div className='w-full h-7 flex flex-row items-center justify-center'>
                    <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Probation Date</FormLabel>
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.probation_date'
                        render={() => (
                            <FormItem className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={probationDate}
                                    setSelectedDate={setProbationDate}
                                />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Increment Date */}
                <div className='w-full h-7 flex flex-row items-center justify-center'>
                    <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Increment Date</FormLabel>
                    <FormField
                        control={form?.control}
                        name='staff_salary_details.increment_date'
                        render={() => (
                            <FormItem className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={incrementDate}
                                    setSelectedDate={setIncrementDate}
                                />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Reason of Leaving */}
                <div className='flex-1 w-full flex flex-col items-center lg:flex-row'>
                    <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Reason of Leaving</FormLabel>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                        <FormField
                            control={form?.control}
                            name='staff_salary_details.reason_of_leaving'
                            render={({ field }) => (
                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                                <SelectItem value='On Leave'>On Leave</SelectItem>
                                                <SelectItem value='Left Service'>Left Service</SelectItem>
                                                <SelectItem value='Retired'>Retired</SelectItem>
                                                <SelectItem value='Out of Coverage'>Out of Coverage</SelectItem>
                                                <SelectItem value='Expired'>Expired</SelectItem>
                                                <SelectItem value='Non Implemented Area'>Non Implemented Area</SelectItem>
                                                <SelectItem value='Compliance By Immediate Employer'>Compliance By Immediate Employer</SelectItem>
                                                <SelectItem value='Suspension of Work'>Suspension of Work</SelectItem>
                                                <SelectItem value='Strike/Lockout'>Strike/Lockout</SelectItem>
                                                <SelectItem value='Retrenchment'>Retrenchment</SelectItem>
                                                <SelectItem value='No Work'>No Work</SelectItem>
                                                <SelectItem value='Does not Belong To This Employer'>Does not Belong To This Employer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>


                {/* Short Name */}
                <div className='flex-1 w-full flex flex-col items-center lg:flex-row'>
                    <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Short Name</FormLabel>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                        <FormField
                            control={form?.control}
                            name='staff_salary_details.short_name'
                            render={({ field }) => (
                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                                <SelectItem value='Teach'>Teach</SelectItem>
                                                <SelectItem value='A.T.'>A.T.</SelectItem>
                                                <SelectItem value='H.M'>H.M</SelectItem>
                                                <SelectItem value='O.S.'>O.S.</SelectItem>
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

        </div>
    );
};





// Export
export default StaffSalaryDetails;