'use client';
// Imports
import moment from 'moment';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import ProfilePicture from './ProfilePicture';
import {Checkbox} from '@/components/ui/checkbox';
import {ChevronDown, Search, } from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {fetchJobs} from '@/lib/actions/payroll/globalMasters/job.actions';
import {fetchStaffTypes} from '@/lib/actions/payroll/globalMasters/staffType.actions';
import {fetchReligions} from '@/lib/actions/admission/globalMasters/religion.actions';
import {fetchStaffByAllData} from '@/lib/actions/payroll/globalMasters/staff.actions';
import {fetchBloodGroups} from '@/lib/actions/admission/globalMasters/bloodGroup.actions';
import {fetchWings} from '@/lib/actions/fees/globalMasters/defineClassDetails/wing.actions';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const StaffRegistration = ({form, setIsViewOpened, setUpdateStaff, setFile, updateStaff, imageSrc, setImageSrc, setIsLoading, dateOfBirth, setDateOfBirth, dateOfAnniversary, setDateOfAnniversary, dateOfJoining, setDateOfJoining, dateOfRetire, setDateOfRetire, setEducationalDetails, setSelectedDocuments, designations, departments, setValuesFromApplication, valuesFromApplication}:any) => {

    // Is loading searched students
    const [isLoadingSearchedStudents, setIsLoadingSearchedStudents] = useState(false);


    // Wings
    const [wings, setWings] = useState([{}]);


    // Blood groups
    const [bloodGroups, setBloodGroups] = useState([{}]);


    // Staff types
    const [staffTypes, setStaffTypes] = useState([{}]);


    // Religions
    const [religions, setReligions] = useState([{}]);


    // Posts
    const [posts, setPosts] = useState([{}]);


    // Search
    const [search, setSearch] = useState('');


    // Search staff
    const [searchStaff, setSearchStaff] = useState<any>([]);


    // Handle Search Click
    const searchClick = async () => {
        setIsLoading(true);
        setIsViewOpened('admission');
        setSearch('');
        setIsLoading(false);
    };


    // Staff search click
    const staffSearchClick = (s:any) => {
        setIsLoading(true);
        setValuesFromApplication({
            // Staff registration
            staff_registration:{
                post:'',
                reg_no:'',
                employee_code:'',
                approved_teacher:'',
                teacher_id:'',
                cbse_code:'',
                first_name_title:'Mr.',
                first_name:'',
                middle_name:'',
                last_name:'',
                gender:'Male',
                email:'',
                alternate_email:'',
                phone:0,
                mobile:0,
                whatsapp_mobile:0,
                emergency_mobile:0,
                wing:'',
                is_active:false,
                profile_picture:'',
                maritial_status:'Married',
                qualification:'',
                date_of_birth:new Date(),
                date_of_anniversary:new Date(),
                date_of_joining:new Date(),
                date_of_retire:new Date(),
                date_of_retire_is_extend:false,
                permenant_address:'',
                current_address:'',
                father_or_spouse_name:'',
                father_or_spouse_mobile:0,
                father_or_spouse_relation:'Father',
                blood_group:'',
                staff_type:'',
                designation:'',
                department:'',
                religion:'',
                aadhar_card_no:0
            },

            // Staff educational details
            staff_educational_details:[{
                qualification:'',
                program_or_steam:'',
                name_of_board_or_universtity:'',
                subjects:[],
                year_of_passing:'',
                maximum_marks:0,
                obtains_marks:0,
                percentage:0
            }],

            // Staff document details
            staff_document_details:[]
        });
        setUpdateStaff({
            id:s?._id,
            isDeleteClicked:false,

            // Staff registration
            staff_registration:{
                post:s.staff_registration.post,
                reg_no:s.staff_registration.reg_no,
                employee_code:s.staff_registration.employee_code,
                approved_teacher:s.staff_registration.approved_teacher,
                teacher_id:s.staff_registration.teacher_id,
                cbse_code:s.staff_registration.cbse_code,
                first_name_title:s.staff_registration.first_name_title,
                first_name:s.staff_registration.first_name,
                middle_name:s.staff_registration.middle_name,
                last_name:s.staff_registration.last_name,
                gender:s.staff_registration.gender,
                email:s.staff_registration.email,
                alternate_email:s.staff_registration.alternate_email,
                phone:s.staff_registration.phone,
                mobile:s.staff_registration.mobile,
                whatsapp_mobile:s.staff_registration.whatsapp_mobile,
                emergency_mobile:s.staff_registration.emergency_mobile,
                wing:s.staff_registration.wing,
                is_active:s.staff_registration.is_active,
                profile_picture:s.staff_registration.profile_picture,
                maritial_status:s.staff_registration.maritial_status,
                qualification:s.staff_registration.qualification,
                date_of_birth:s.staff_registration.date_of_birth,
                date_of_anniversary:s.staff_registration.date_of_anniversary,
                date_of_joining:s.staff_registration.date_of_joining,
                date_of_retire:s.staff_registration.date_of_retire,
                date_of_retire_is_extend:s.staff_registration.date_of_retire_is_extend,
                permenant_address:s.staff_registration.permenant_address,
                current_address:s.staff_registration.current_address,
                father_or_spouse_name:s.staff_registration.father_or_spouse_name,
                father_or_spouse_mobile:s.staff_registration.father_or_spouse_mobile,
                father_or_spouse_relation:s.staff_registration.father_or_spouse_relation,
                blood_group:s.staff_registration.blood_group,
                staff_type:s.staff_registration.staff_type,
                designation:s.staff_registration.designation,
                department:s.staff_registration.department,
                religion:s.staff_registration.religion,
                aadhar_card_no:s.staff_registration.aadhar_card_no
            },

            //Staff salary details
            staff_salary_details:{
                emp_no:s.staff_salary_details.emp_no,
                pan_no:s.staff_salary_details.pan_no,
                bank_name:s.staff_salary_details.bank_name,
                bank_account_no:s.staff_salary_details.bank_account_no,
                is_generate_salary:s.staff_salary_details.is_generate_salary,
                is_salary_to_bank:s.staff_salary_details.is_salary_to_bank,
                machine_no:s.staff_salary_details.machine_no,
                pf_no:s.staff_salary_details.pf_no,
                esi_no:s.staff_salary_details.esi_no,
                uan_no:s.staff_salary_details.uan_no,
                emp_acc_no:s.staff_salary_details.emp_acc_no,
                status:s.staff_salary_details.status,
                salary_group:s.staff_salary_details.salary_group,
                basic_salary_part:{
                    basic:{
                        value:s.staff_salary_details.basic_salary_part.basic.value,
                        applied_on:s.staff_salary_details.basic_salary_part.basic.applied_on
                    },
                    grade_pay:{
                        value:s.staff_salary_details.basic_salary_part.grade_pay.value,
                        applied_on:s.staff_salary_details.basic_salary_part.grade_pay.applied_on
                    }
                },
                confirmation_date:s.staff_salary_details.confirmation_date,
                permanent_date:s.staff_salary_details.permanent_date,
                leaving_date:s.staff_salary_details.leaving_date,
                joining_date_epf:s.staff_salary_details.joining_date_epf,
                joining_date_eps:s.staff_salary_details.joining_date_eps,
                leaving_date_epf:s.staff_salary_details.leaving_date_epf,
                leaving_date_eps:s.staff_salary_details.leaving_date_eps,
                probation_date:s.staff_salary_details.probation_date,
                increment_date:s.staff_salary_details.increment_date,
                reason_of_leaving:s.staff_salary_details.reason_of_leaving,
                short_name:s.staff_salary_details.short_name
            },

            // Staff salary head
            staff_salary_heads:s.staff_salary_heads,

            // Staff educational details
            staff_educational_details:s?.staff_educational_details || [],

            // Staff document details
            staff_document_details:s?.staff_document_details || []
        });
        setEducationalDetails(s?.staff_educational_details || []);
        setSelectedDocuments(s?.staff_document_details || []);
        setSearch('');
        setIsLoading(false);
    };


    // Searched staff
    const searchedStaff = (
        <div
            className={`z-10 flex-col absolute w-[120%] h-auto mt-2 pb-2 max-h-[300px] top-[100%] left-0 bg-[#fff] rounded-[5px] border-[0.5px] border-[#E4E4E4] overflow-y-scroll custom-sidebar-scrollbar ${
            // @ts-ignore
            search !== '' ? 'flex' : 'hidden'}`}
        >

            {isLoadingSearchedStudents ? (
                <LoadingIcon />
            ) : searchStaff.length < 1 ? (
                <p className=' text-xs pl-2 text-hash-color'>No staff found</p>
            ) : searchStaff.map(((s:any) => (
                <div
                    onClick={() => staffSearchClick(s)}
                    className='flex flex-row gap-4 cursor-pointer transition hover:bg-[#E4E4E4]'
                >
                    <div>
                        <div className='ml-4 mt-2 rounded-[4px] border-[0.5px] border-[#E4E4E4] h-[75px] w-[75px]'>
                            {s?.student?.image && (
                                <Image
                                    src={s?.staff_registration.profile_picture}
                                    alt='Student image'
                                    height={75}
                                    width={75}
                                    className='rounded-[4px] h-full'
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col py-2 text-[10px] text-hash-color gap-[2px]'>
                        <p className='font-semibold'>Staff's Name - {s?.staff_registration.first_name}</p>
                        <p className='mt-1'>Registration. No. - {s?.staff_registration.reg_no}</p>
                        <p>Mobile - {s?.staff_registration.mobile}</p>
                    </div>
                </div>
            )))}


        </div>
    );


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const wingsRes = await fetchWings();
            const bloodGroupsRes = await fetchBloodGroups();
            const staffTypesRes = await fetchStaffTypes();
            const postsRes = await fetchJobs();
            const religionsRes = await fetchReligions();
            setWings(wingsRes);
            setBloodGroups(bloodGroupsRes);
            setStaffTypes(staffTypesRes);
            setReligions(religionsRes);
            setPosts(postsRes);
        };
        fetcher();
    }, []);
    useEffect(() => {
        if(search !== ''){
            setIsLoadingSearchedStudents(true);
            const searchFetcher = async () => {
                // ts-ignore
                const res = await fetchStaffByAllData({first_name:search, reg_no:search, mobile:search});
                setSearchStaff(res);
                setIsLoadingSearchedStudents(false);
            };
            searchFetcher();
        }else{
            setSearchStaff([]);
        }
    }, [search]);
    useEffect(() => {
        if(dateOfBirth){
            // @ts-ignore
            form.setValue('staff_registration.date_of_birth', dateOfBirth._d);
            if(!form.getValues().staff_registration.date_of_retire_is_extend){
                setDateOfRetire(moment(dateOfBirth).add(60, 'years'));
                form.setValue('staff_registration.date_of_retire', moment(dateOfBirth).add(60, 'years'));
            }
        };
    }, [dateOfBirth]);
    useEffect(() => {
        if(dateOfAnniversary){
            // @ts-ignore
            form.setValue('staff_registration.date_of_anniversary', dateOfAnniversary._d);
        };
    }, [dateOfAnniversary]);
    useEffect(() => {
        if(dateOfJoining){
            // @ts-ignore
            form.setValue('staff_registration.date_of_joining', dateOfJoining._d);
        };
    }, [dateOfJoining]);
    useEffect(() => {
        if(dateOfRetire){
            // @ts-ignore
            form.setValue('staff_registration.date_of_retire', dateOfRetire._d);
        };
    }, [dateOfRetire]);
    useEffect(() => {}, [form.watch('staff_registration.is_active')]);
    useEffect(() => {}, [form.watch('staff_registration.approved_teacher')]);
    useEffect(() => {}, [form.watch('staff_registration.date_of_retire_is_extend')]);

    return (
        <div className='flex flex-col items-center gap-4'>

            {/* Search */}
            <div className='flex justify-center w-[95%] p-2 border-[0.5px] border-[#ccc] bg-[#F7F7F7] gap-2 rounded-[5px] text-xs text-hash-color'>
                <div className='relative flex h-full flex-row justify-center min-w-[200px] max-w-[600px] w-[100%] bg-white rounded-[5px] border-[0.5px] border-[#E4E4E4]'>
                    <Input
                        value={search}
                        onChange={(e:any) => setSearch(e?.target?.value)}
                        className='h-full border-[0] text-xs placeholder:text-xs'
                        placeholder='Search name'
                    />
                    <div
                        onClick={searchClick}
                        className='group flex flex-row items-center justify-center gap-[2px] px-2 border-[0.5px] border-[#2EABE5] rounded-r-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5]'
                    >
                        <Search size={15} className='text-[#2EABE5] transition group-hover:text-white'/>
                        <p className='transition text-[#2EABE5] group-hover:text-white'>Search</p>
                    </div>
                    {searchedStaff}
                </div>
                <div
                    onClick={() => setIsViewOpened('applications')}
                    className='group w-[150px] h-6 mt-2 flex flex-row items-center justify-center gap-[2px] ml-2 px-2 border-[0.5px] border-[#2EABE5] bg-white rounded-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5] sm:h-auto sm:w-[250px] sm:mt-0'
                >
                    <p className='transition text-[#2EABE5] group-hover:text-white'>Search Applications</p>
                </div>
            </div>

            <div className='flex flex-row w-[95%] gap-10'>

                {/* Left side */}
                <div className='flex-1 flex flex-col gap-2'>

                    {/* Post */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Applied Post</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.post'
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
                                                    {posts?.length < 1 ? (
                                                        <p>No blood groups</p>
                                                        // @ts-ignore
                                                    ) : !posts[0]?.post ? (
                                                        <LoadingIcon />
                                                    ) : posts?.map((item:any) => (
                                                        <SelectItem value={item?.post} key={item?._id}>{item?.post}</SelectItem>
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


                    {/* Reg. No. */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.reg_no'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Reg. No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                disabled
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Employee Code */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.employee_code'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Employee Code</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Approved Teacher */}
                    <div className='relative flex flex-row items-center gap-1'>
                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Approved Teacher</FormLabel>
                        <FormField
                            control={form?.control}
                            name='staff_registration.approved_teacher'
                            render={({ field }) => (
                                <FormItem className='flex-1 h-8 flex flex-col items-start justify-center lg:flex-row lg:items-center lg:basis-[15%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field?.value}
                                            onValueChange={field?.onChange}
                                        >
                                            <SelectTrigger className='w-full h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Yes'>Yes</SelectItem>
                                                <SelectItem value='No'>No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                </FormItem>
                            )}
                        />
                    </div>


                    {/* CBSE Code */}
                    {form.getValues().staff_registration.approved_teacher === 'Yes' && (
                        <FormField
                            control={form?.control}
                            name='staff_registration.cbse_code'
                            render={({ field }) => (
                                <FormItem className='relative w-full mt-2 lg:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>CBSE Code</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                                />
                                            </FormControl>
                                            <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                    )}


                    {/* Teacher ID */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.teacher_id'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Teacher ID</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* First name */}
                    <div className='relative flex flex-row items-center gap-1'>
                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>First Name</FormLabel>
                        <FormField
                            control={form?.control}
                            name='staff_registration.first_name_title'
                            render={({ field }) => (
                                <FormItem className='flex-1 h-full flex flex-col items-start justify-center lg:flex-row lg:items-center lg:basis-[15%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field?.value}
                                            onValueChange={field?.onChange}
                                        >
                                            <SelectTrigger className='w-full h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Mr.'>Mr.</SelectItem>
                                                <SelectItem value='Ms.'>Ms.</SelectItem>
                                                <SelectItem value='Mrs.'>Mrs.</SelectItem>
                                                <SelectItem value='Miss'>Miss</SelectItem>
                                                <SelectItem value='Fr.'>Fr.</SelectItem>
                                                <SelectItem value='Sr.'>Sr.</SelectItem>
                                                <SelectItem value='Dr.'>Dr.</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form?.control}
                            name='staff_registration.first_name'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 lg:mt-0 lg:lg:basis-[50%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute left-[35%] top-[70%] text-[11px]' />
                                </FormItem>
                            )}
                        />
                    </div>


                    {/* Middle Name */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.middle_name'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Middle Name</FormLabel>
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


                    {/* Last Name */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.last_name'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Last Name</FormLabel>
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


                    {/* Gender */}
                    <FormField
                        control={form.control}
                        name='staff_registration.gender'
                        render={() => (
                            <FormItem>
                                <div className='w-full flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Gender</FormLabel>
                                    <div className='h-full w-full flex flex-col gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                        <RadioGroup
                                            value={form.getValues().staff_registration.gender}
                                            className='h-full flex flex-row'
                                        >
                                            <div className='flex items-center space-x-[2px]'>
                                                <RadioGroupItem value='Male' id='Male' onClick={() => form.setValue('staff_registration.gender', 'Male')}/>
                                                <Label htmlFor='Male' className='text-[11px] text-hash-color'>Male</Label>
                                            </div>
                                            <div className='flex items-center space-x-[2px]'>
                                                <RadioGroupItem value='Female' id='Female' onClick={() => form.setValue('staff_registration.gender', 'Female')}/>
                                                <Label htmlFor='Female' className='text-[11px] text-hash-color'>Female</Label>
                                            </div>
                                        </RadioGroup>
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Email */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.email'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Email</FormLabel>
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


                    {/* Alternate Email */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.alternate_email'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Alternate Email</FormLabel>
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


                    {/* Phone */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.phone'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Phone</FormLabel>
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


                    {/* Mobile */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.mobile'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Mobile</FormLabel>
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


                    {/* Whatsapp No. */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.whatsapp_mobile'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Whatsapp No.</FormLabel>
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


                    {/* Emergency Mobile */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.emergency_mobile'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Emergency Mobile</FormLabel>
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


                    {/* Wing and is active*/}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Wing</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[45%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.wing'
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
                                                    {wings?.length < 1 ? (
                                                        <p>No wings</p>
                                                        // @ts-ignore
                                                    ) : !wings[0]?.wing ? (
                                                        <LoadingIcon />
                                                    ) : wings?.map((item:any) => (
                                                        <SelectItem value={item?.wing} key={item?._id}>{item?.wing}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex flex-row items-center justify-center gap-1 basis-[20%]'>
                            <p className='text-[11px] text-[#726E71]'>Active</p>
                            <Checkbox
                                className='rounded-[2px] border-[#ccc] text-[#ccc]'
                                checked={form.getValues().staff_registration.is_active}
                                onClick={() => form.getValues().staff_registration.is_active ? form.setValue('staff_registration.is_active', false) : form.setValue('staff_registration.is_active', true)}
                            />

                        </div>
                    </div>


                    {/* Maritial Status */}
                    <FormField
                        control={form.control}
                        name='staff_registration.maritial_status'
                        render={() => (
                            <FormItem>
                                <div className='w-full flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Maritial Status</FormLabel>
                                    <div className='h-full w-full flex flex-col gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                        <RadioGroup
                                            value={form.getValues().staff_registration.maritial_status}
                                            className='h-full flex flex-row'
                                        >
                                            <div className='flex items-center space-x-[2px]'>
                                                <RadioGroupItem value='Married' id='Married' onClick={() => form.setValue('staff_registration.maritial_status', 'Married')}/>
                                                <Label htmlFor='Married' className='text-[11px] text-hash-color'>Married</Label>
                                            </div>
                                            <div className='flex items-center space-x-[2px]'>
                                                <RadioGroupItem value='Unmarried' id='Unmarried' onClick={() => form.setValue('staff_registration.maritial_status', 'Unmarried')}/>
                                                <Label htmlFor='Unmarried' className='text-[11px] text-hash-color'>Unmarried</Label>
                                            </div>
                                            <div className='flex items-center space-x-[2px]'>
                                                <RadioGroupItem value='Others' id='Others' onClick={() => form.setValue('staff_registration.maritial_status', 'Others')}/>
                                                <Label htmlFor='Others' className='text-[11px] text-hash-color'>Others</Label>
                                            </div>
                                        </RadioGroup>
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                </div>

                {/* Right side */}
                <div className='flex-1 flex flex-col gap-2'>

                    <div className='flex flex-row'>

                        {/* Profile picture */}
                        <ProfilePicture
                            setFile={setFile}
                            imageSrc={imageSrc}
                            setImageSrc={setImageSrc}
                            updateStaff={updateStaff}
                            valuesFromApplication={valuesFromApplication}
                        />

                        <div className='basis-[75%] flex flex-col gap-2'>
                            {/* Date of Birth */}
                            <div className='w-full h-7 flex flex-row items-center justify-center'>
                                <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Date of Birth</FormLabel>
                                <FormField
                                    control={form?.control}
                                    name='staff_registration.date_of_birth'
                                    render={() => (
                                        <FormItem className='basis-[65%]'>
                                            <MyDatePicker
                                                selectedDate={dateOfBirth}
                                                setSelectedDate={setDateOfBirth}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            {/* Date of Anniversary */}
                            <div className='w-full h-7 flex flex-row items-center justify-center'>
                                <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Date of Anniversary</FormLabel>
                                <FormField
                                    control={form?.control}
                                    name='staff_registration.date_of_anniversary'
                                    render={() => (
                                        <FormItem className='basis-[65%]'>
                                            <MyDatePicker
                                                selectedDate={dateOfAnniversary}
                                                setSelectedDate={setDateOfAnniversary}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            {/* Date of Joining */}
                            <div className='w-full h-7 flex flex-row items-center justify-center'>
                                <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Date of Joining</FormLabel>
                                <FormField
                                    control={form?.control}
                                    name='staff_registration.date_of_joining'
                                    render={() => (
                                        <FormItem className='basis-[65%]'>
                                            <MyDatePicker
                                                selectedDate={dateOfJoining}
                                                setSelectedDate={setDateOfJoining}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                    </div>


                    {/* Date of Retire */}
                    <div className='w-full h-7 flex flex-row items-center justify-center'>
                        <FormLabel className='pr-[4px] text-end text-[11px] text-[#726E71] basis-[35%]'>Date of Retire</FormLabel>
                        <FormField
                            control={form?.control}
                            name='staff_registration.date_of_retire'
                            render={() => (
                                <FormItem className='relative basis-[45%]'>
                                    <MyDatePicker
                                        selectedDate={dateOfRetire}
                                        setSelectedDate={setDateOfRetire}
                                    />
                                    {!form.getValues().staff_registration.date_of_retire_is_extend && (
                                        <div
                                            style={{
                                                position:'absolute',
                                                top:0,
                                                left:0,
                                                width:'100%',
                                                height:'100%',
                                                backgroundColor:'rgba(255, 255, 255, 0.6)',
                                                zIndex:1,
                                                cursor:'not-allowed'
                                            }}
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                        <div className='flex flex-row items-center justify-center gap-1 basis-[20%]'>
                            <p className='text-[11px] text-[#726E71]'>Extend</p>
                            <Checkbox
                                className='rounded-[2px] border-[#ccc] text-[#ccc]'
                                checked={form.getValues().staff_registration.date_of_retire_is_extend}
                                onClick={() => {
                                    form.getValues().staff_registration.date_of_retire_is_extend ? form.setValue('staff_registration.date_of_retire_is_extend', false) : form.setValue('staff_registration.date_of_retire_is_extend', true);
                                    setDateOfRetire(moment(dateOfBirth).add(60, 'years'));
                                }}
                            />
                        </div>
                    </div>


                    {/* Qualification */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.qualification'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Qualification</FormLabel>
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


                    {/* Father/Spouse Name */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.father_or_spouse_name'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Father/Spouse Name</FormLabel>
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


                    {/* Father/Spouse Mobile */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.father_or_spouse_mobile'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Father/Spouse Mobile</FormLabel>
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


                    {/* Father/Spouse Relation */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Father/Spouse Relation</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.father_or_spouse_relation'
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
                                                    <SelectItem value='Father'>Father</SelectItem>
                                                    <SelectItem value='Spouse'>Spouse</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Blood Group */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Blood Group</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.blood_group'
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
                                                    {bloodGroups?.length < 1 ? (
                                                        <p>No blood groups</p>
                                                        // @ts-ignore
                                                    ) : !bloodGroups[0]?.blood_group ? (
                                                        <LoadingIcon />
                                                    ) : bloodGroups?.map((item:any) => (
                                                        <SelectItem value={item?.blood_group} key={item?._id}>{item?.blood_group}</SelectItem>
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


                    {/* Staff Type */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Staff Type</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.staff_type'
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
                                                    {staffTypes?.length < 1 ? (
                                                        <p>No staff types</p>
                                                        // @ts-ignore
                                                    ) : !staffTypes[0]?.staff_type ? (
                                                        <LoadingIcon />
                                                    ) : staffTypes?.map((item:any) => (
                                                        <SelectItem value={item?.staff_type} key={item?._id}>{item?.staff_type}</SelectItem>
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
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Designation</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.designation'
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
                                                    {designations?.length < 1 ? (
                                                        <p>No designations</p>
                                                        // @ts-ignore
                                                    ) : !designations[0]?.designation ? (
                                                        <LoadingIcon />
                                                    ) : designations?.map((item:any) => (
                                                        <SelectItem value={item?.designation} key={item?._id}>{item?.designation}</SelectItem>
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


                    {/* Department */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Department</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.department'
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
                                                    {departments?.length < 1 ? (
                                                        <p>No departments</p>
                                                        // @ts-ignore
                                                    ) : !departments[0]?.department ? (
                                                        <LoadingIcon />
                                                    ) : departments?.map((item:any) => (
                                                        <SelectItem value={item?.department} key={item?._id}>{item?.department}</SelectItem>
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


                    {/* Religion */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Religion</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='staff_registration.religion'
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
                                                    {religions?.length < 1 ? (
                                                        <p>No religions</p>
                                                        // @ts-ignore
                                                    ) : !religions[0]?.religion_name ? (
                                                        <LoadingIcon />
                                                    ) : religions?.map((item:any) => (
                                                        <SelectItem value={item?.religion_name} key={item?._id}>{item?.religion_name}</SelectItem>
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


                    {/* Aadhar Card No. */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.aadhar_card_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Aadhar Card No.</FormLabel>
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


                    {/* Permanent Address */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.permenant_address'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Permanent Address</FormLabel>
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


                    {/* Current Address */}
                    <FormField
                        control={form?.control}
                        name='staff_registration.current_address'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Current Address</FormLabel>
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
    );
};





// Export
export default StaffRegistration;