// Imports
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {ChevronDown, Trash} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';





// Main function
const Other = ({form, previousSchoolsDetails, setPreviousSchoolsDetails, staff}:any) => {

    // Sessions
    const [sessions, setSessions] = useState([{}]);


    // CLasses
    const [classes, setClases] = useState([{}]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const sessionsRes = await fetchAcademicYears();
            const classesRes = await fetchClasses();
            setSessions(sessionsRes);
            setClases(classesRes);
        };
        fetcher();
    }, []);
    useEffect(() => {}, [form.getValues().others.student_staff_relation.staff_ward]);

    return (
        <div className='flex flex-col gap-2 px-2'>

            {/* Student Other Details */}
            <div className='flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
                <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>Student Other Details</h2>
                <div className='flex flex-col px-4 py-2 gap-2 lg:flex-row'>
                    {/* Medical History */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Medical History</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='others.student_other_details.medical_history'
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
                                                    <SelectItem value='Yes'>Yes</SelectItem>
                                                    <SelectItem value='No'>No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    {/* Descriptions */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Descriptions</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='others.student_other_details.descriptions'
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
                    {/* Allergies */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Allergies</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='others.student_other_details.allergies'
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
                                                    <SelectItem value='Yes'>Yes</SelectItem>
                                                    <SelectItem value='No'>No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    {/* Allergies Causes */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Allergies Causes</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='others.student_other_details.allergies_causes'
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
                    {/* Family Doctor Name */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Family Doctor Name</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='others.student_other_details.family_doctor_name'
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
                <div className='flex flex-col px-4 py-2 gap-2 lg:flex-row'>
                    {/* Family Doctor Phone */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Family Doctor Phone</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='others.student_other_details.family_doctor_phone'
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
                    {/* Family Doctor Address */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Family Doctor Address</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='others.student_other_details.family_doctor_address'
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
                    {/* Distance From Home */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Distance From Home</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='others.student_other_details.distance_from_home'
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
                    {/* No. Of Living Year */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>No. Of Living Year</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='others.student_other_details.no_of_living_year'
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
                    {/* only Child */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Only Child</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='others.student_other_details.only_child'
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
                                                    <SelectItem value='Yes'>Yes</SelectItem>
                                                    <SelectItem value='No'>No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    {/* General Description */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>General Description</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='others.student_other_details.general_description'
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




            {/* Contact Details */}
            <div className='flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
                <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>Contact Details</h2>
                <div className='flex flex-col gap-6 p-4'>
                    <div className='flex flex-col gap-4 lg:flex-row lg:gap-2'>
                        {/* Contact Person Name */}
                        <FormField
                            control={form?.control}
                            name='student.contact_person_name'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 lg:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-start text-[11px] text-[#726E71] lg:basis-[35%]'>Contact Person Name</FormLabel>
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
                        {/* Contact Person Mobile */}
                        <FormField
                            control={form?.control}
                            name='student.contact_person_mobile'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 lg:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-start text-[11px] text-[#726E71] lg:basis-[35%]'>Contact Person Mobile</FormLabel>
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
                    <div className='flex flex-col gap-4 lg:flex-row lg:gap-2'>
                        {/* Contact Person Email */}
                        <FormField
                            control={form?.control}
                            name='student.contact_person_email'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 lg:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-start text-[11px] text-[#726E71] lg:basis-[35%]'>Contact Person Email</FormLabel>
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
                        {/* Secondary Contact No. */}
                        <FormField
                            control={form?.control}
                            name='student.secondary_contact_no'
                            render={({ field }) => (
                                <FormItem className='w-full my-2 lg:my-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-start text-[11px] text-[#726E71] lg:basis-[35%]'>Secondary Contact No.</FormLabel>
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
                    <div>
                        {/* Aadhar Card No */}
                        <FormField
                            control={form?.control}
                            name='student.aadhar_card_no'
                            render={({ field }) => (
                                <FormItem className='w-full my-2 lg:my-0 lg:w-[50%]'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-start text-[11px] text-[#726E71] lg:basis-[35%]'>Aadhar Card No</FormLabel>
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
                </div>
            </div>





            {/* Student Staff Relation */}
            <div className='flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
                <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>Student Staff Relation</h2>
                <div className='w-full flex flex-row px-4 py-2 gap-2 lg:w-[50%]'>
                    {/* Staff Ward */}
                    <div className='w-[50%] flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Staff Ward</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form.control}
                                name='others.student_staff_relation.staff_ward'
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
                                                    <SelectItem value='Yes'>Yes</SelectItem>
                                                    <SelectItem value='No'>No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Staff Name */}
                    {form.getValues().others.student_staff_relation.staff_ward === 'Yes' && (
                        <div className='w-[50%] flex flex-col items-center'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Staff Name</FormLabel>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form.control}
                                    name='others.student_staff_relation.staff_name'
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
                                                        {staff.length < 1 ? (
                                                            <p className='text-[11px]'>No staff</p>
                                                        ) : !staff[0]?.staff_registration?.first_name ? (
                                                            <LoadingIcon />
                                                        ) : staff.map((s:any) => (
                                                            <SelectItem value={s?.staff_registration?.first_name} key={s?._id}>{s?.staff_registration?.first_name}</SelectItem>
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
                    )}
                </div>
            </div>





            {/* Is Alumni */}
            <div className='flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
                <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>Is Alumni</h2>
                <div className='flex flex-col px-4 py-2 gap-2 lg:flex-row'>
                    {/* Is Alumni */}
                    <FormField
                        control={form?.control}
                        name='others.is_alumni.is_alumni'
                        render={({field}) => (
                            <FormItem className='flex flex-row mx-2 items-start justify-start sm:items-center min-w-[150px] sm:gap-2'>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-start space-x-2'>
                                            <Label htmlFor='main_is_alumni' className='text-[11px]'>
                                                Is Alumni
                                            </Label>
                                            <Switch
                                                id='main_is_alumni'
                                                {...field}
                                                value={field?.value}
                                                onCheckedChange={field?.onChange}
                                                checked={field?.value}
                                            />
                                        </div>
                                    </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.getValues().others.is_alumni.is_alumni && (
                        <>
                            {/* Session */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Session</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='others.is_alumni.academic_session'
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
                            {/* Class */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Class</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='others.is_alumni.class_name'
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
                            {/* Admission No. */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Admission No.</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form.control}
                                        name='others.is_alumni.admission_number'
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
                        </>
                    )}
                </div>
            </div>





            {/* Previous School Details */}
            <div className='w-full flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
                <h2 className='bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>Previous School Details</h2>
                <div className='w-full overflow-x-scroll custom-sidebar-scrollbar'>
                    {previousSchoolsDetails.map((school:any) => (
                        <div className='flex flex-row items-center min-w-[1600px] px-4 py-2 gap-2'>

                            {/* Class */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Class</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <Input
                                        value={school.class}
                                        onChange={(e:any) => {
                                            previousSchoolsDetails[previousSchoolsDetails.indexOf(school)].class = e.target.value;
                                            setPreviousSchoolsDetails([...previousSchoolsDetails]);
                                        }}
                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </div>
                            </div>

                            {/* School Name */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>School Name</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <Input
                                        value={school.school_name}
                                        onChange={(e:any) => {
                                            previousSchoolsDetails[previousSchoolsDetails.indexOf(school)].school_name = e.target.value;
                                            setPreviousSchoolsDetails([...previousSchoolsDetails]);
                                        }}
                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </div>
                            </div>

                            {/* Board */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Board</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <Input
                                        value={school.board}
                                        onChange={(e:any) => {
                                            previousSchoolsDetails[previousSchoolsDetails.indexOf(school)].board = e.target.value;
                                            setPreviousSchoolsDetails([...previousSchoolsDetails]);
                                        }}
                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </div>
                            </div>

                            {/* Passing Year */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Passing Year</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <Input
                                        value={school.passig_year}
                                        onChange={(e:any) => {
                                            previousSchoolsDetails[previousSchoolsDetails.indexOf(school)].passig_year = e.target.value;
                                            setPreviousSchoolsDetails([...previousSchoolsDetails]);
                                        }}
                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </div>
                            </div>

                            {/* Total Marks */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Total Marks</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <Input
                                        value={school.total_marks}
                                        onChange={(e:any) => {
                                            previousSchoolsDetails[previousSchoolsDetails.indexOf(school)].total_marks = e.target.value;
                                            setPreviousSchoolsDetails([...previousSchoolsDetails]);
                                        }}
                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </div>
                            </div>

                            {/* Obtain Marks */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Obtain Marks</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <Input
                                        value={school.obtain_marks}
                                        onChange={(e:any) => {
                                            previousSchoolsDetails[previousSchoolsDetails.indexOf(school)].obtain_marks = e.target.value;
                                            setPreviousSchoolsDetails([...previousSchoolsDetails]);
                                        }}
                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </div>
                            </div>

                            {/* Percentage */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Percentage</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <Input
                                        disabled
                                        value={school.obtain_marks && school.total_marks && Number(school.obtain_marks / school.total_marks * 100).toFixed(2)}
                                        onChange={(e:any) => {
                                            previousSchoolsDetails[previousSchoolsDetails.indexOf(school)].percentage = e.target.value;
                                            setPreviousSchoolsDetails([...previousSchoolsDetails]);
                                        }}
                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </div>
                            </div>

                            {/* Result */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Result</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <Input
                                        value={school.result}
                                        onChange={(e:any) => {
                                            previousSchoolsDetails[previousSchoolsDetails.indexOf(school)].result = e.target.value;
                                            setPreviousSchoolsDetails([...previousSchoolsDetails]);
                                        }}
                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </div>
                            </div>

                            <span
                                onClick={() => {
                                    setPreviousSchoolsDetails(previousSchoolsDetails.filter((s:any) => s !== school))
                                }}
                                className='flex items-center justify-center px-2 py-2 text-white bg-gradient-to-r from-[#ba2b2b] to-[#b95e5e] rounded-full transition border-[1px] border-white cursor-pointer
                                        hover:border-[#ba2b2b] hover:from-[#ba2b2b42] hover:to-[#ba2b2b42] hover:text-[#ba2b2b]'
                            >
                                <Trash size={15} />
                            </span>

                        </div>
                    ))}
                    <div className='flex items-center justify-center'>
                        <span
                            onClick={() => {
                                setPreviousSchoolsDetails([
                                    ...previousSchoolsDetails,
                                    {
                                        class:'',
                                        school_name:'',
                                        board:'',
                                        passing_year:'',
                                        total_marks:'',
                                        obtain_marks:'',
                                        percentage:'',
                                        result:''
                                    }
                                ])
                            }}
                            className='text-lg px-3 py-1 text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] rounded-full transition border-[1px] border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        >
                            +
                        </span>
                    </div>
                </div>
            </div>





        </div>
    );
};





// Export
export default Other;