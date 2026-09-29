// Imports
import {useState} from 'react';
import {Switch} from '@/components/ui/switch';
import {Button} from '@/components/ui/button';
import {ChevronsUpDown, X} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from '@/components/ui/command';





// Main Function
const ApplicationsViewCom = ({setIsViewOpened, staffApplications, setValuesFromApplication, setSelectedDocuments, setEducationalDetails, setUpdateStaff}:any) => {

    // Is active
    const [isActive, setIsActive] = useState(true);


    // Filtered staff
    const [filteredStaff, setFilteredStaff] = useState(staffApplications?.filter((s:any) => s?.staff_registration?.is_active));


    // Select handler
    const selectHandler = (s:any) => {
        setUpdateStaff({
            id:'',
            isDeleteClicked:false,
    
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
    
            //Staff salary details
            staff_salary_details:{
                emp_no:'',
                pan_no:'',
                bank_name:'',
                bank_account_no:'',
                is_generate_salary:false,
                is_salary_to_bank:false,
                machine_no:0,
                pf_no:'',
                esi_no:'',
                uan_no:'',
                emp_acc_no:'',
                status:'',
                salary_group:'',
                basic_salary_part:{
                    basic:{
                        value:0,
                        applied_on:new Date()
                    },
                    grade_pay:{
                        value:0,
                        applied_on:new Date()
                    }
                },
                confirmation_date:new Date(),
                permanent_date:new Date(),
                leaving_date:new Date(),
                joining_date_epf:new Date(),
                joining_date_eps:new Date(),
                leaving_date_epf:new Date(),
                leaving_date_eps:new Date(),
                probation_date:new Date(),
                increment_date:new Date(),
                reason_of_leaving:'',
                short_name:''
            },
    
            // Staff salary head
            staff_salary_heads:[],
    
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
        setValuesFromApplication({
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

            // Staff educational details
            staff_educational_details:s?.staff_educational_details || [],

            // Staff document details
            staff_document_details:s?.staff_document_details || []
        });
        setEducationalDetails(s?.staff_educational_details || []);
        setSelectedDocuments(s?.staff_document_details || []);
        setIsViewOpened('');
    };

    return (
        <Command className='w-[90%] max-h-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'>

            {/* Header */}
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Staff List</h2>
                <X color='#3a3a3a' size={18} cursor={'pointer'} onClick={() => setIsViewOpened('')}/>
            </div>
            <div className='w-[95%] h-[90%] flex flex-col items-center bg-[#F1F1F1] rounded-[8px]'>


                {/* Search input */}
                <div className='w-full flex flex-row justify-between px-4 py-2 border-b-[0.5px] border-[#ccc]'>

                    <div className='flex flex-row items-center justify-center gap-1'>
                        <Switch
                            checked={isActive}
                            onClick={() => {
                                setIsActive(!isActive);
                                setFilteredStaff(isActive ? staffApplications.filter((s:any) => !s.staff_registration.is_active) : staffApplications.filter((s:any) => s.staff_registration.is_active))
                            }}
                        />
                        <p className='text-sm'>Is Active</p>
                    </div>

                    <CommandInput
                        placeholder='Search list'
                        className='h-full text-xs text-hash-color w-[250px] bg-white'
                    />
                </div>


                {/* Account group */}
                <div className='w-full flex flex-col h-[90%] overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[1000px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc] sm:basis-[10%]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Select
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Name
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Mobile
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Email
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2'>
                            Designation
                            <ChevronsUpDown size={12}/>
                        </li>
                    </ul>

                    {/* Values */}
                    <CommandList>
                        {
                            filteredStaff.length < 1 ? (
                                <p className='w-full min-w-[1000px] flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-[0.5px] border-[#ccc]'>
                                    No staff
                                </p>
                            ):
                            !filteredStaff[0]?.staff_registration.reg_no ? (
                                <LoadingIcon />
                            ) : filteredStaff.map((s:any) => (
                                <CommandItem
                                    value={`${filteredStaff.indexOf(s) + 1} ${s?.staff_registration.first_name} ${s?.staff_registration.mobile} ${s?.staff_registration.email} ${s?.staff_registration.designation}`}
                                    className='w-full min-w-[1000px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                >
                                    <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc] sm:basis-[10%]'>{filteredStaff.indexOf(s) + 1}</li>
                                    <li className='basis-[15%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                        <Button
                                            className='px-[8px] h-6 text-[10px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[0.5px] rounded-full border-[#E2E4FF]
                                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-xs sm:px-4'
                                            onClick={() => selectHandler(s)}
                                        >
                                            Select
                                        </Button>
                                    </li>
                                    <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{s?.staff_registration.first_name}</li>
                                    <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{s?.staff_registration.mobile}</li>
                                    <li className='basis-[20%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{s?.staff_registration.email}</li>
                                    <li className='basis-[20%] flex flex-row items-center px-2'>{s?.staff_registration.designation}</li>
                                </CommandItem>
                            ))
                        }
                    </CommandList>
                    {staffApplications.length > 0 && <CommandEmpty>No results found</CommandEmpty>}  
                </div>


                {/* Buttons */}
                <div className='w-full flex flex-row items-center justify-between py-4 px-2 border-t-[0.5px] border-[#ccc]'>
                    {/* Items per page */}
                    <div className='text-[10px] flex flex-col items-center gap-2 sm:text-sm sm:flex-row'>
                        <p className='text-hash-color'>Items per page:</p>
                        <Select>
                            <SelectTrigger className='flex flex-row items-center h-8 pl-2 text-[10px] bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] sm:text-xs'>
                                <SelectValue placeholder='1000' className='text-xs'/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='10'>10</SelectItem>
                                <SelectItem value='15'>15</SelectItem>
                                <SelectItem value='50'>50</SelectItem>
                                <SelectItem value='100'>100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Skipping */}
                    <div className='flex flex-row items-center gap-[2px] sm:gap-[4px]'>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>First</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Prev.</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>1</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Next</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Last</Button>
                    </div>
                </div>


            </div>
        </Command>
    );
};





// Export
export default ApplicationsViewCom;