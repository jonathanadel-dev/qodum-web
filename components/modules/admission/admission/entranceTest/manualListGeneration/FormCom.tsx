// Imports
import * as z from 'zod';
import moment from 'moment';
import {useForm} from 'react-hook-form';
import StudentsList from './StudentList';
import {ChevronDown} from 'lucide-react';
import {useContext, useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {FormControl, Form, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import {ManualListGenerationValidation} from '@/lib/validations/admission/admission/entranceTest/manualListGeneration.validation';
import {applyStudentForAdmission, fetchClassStudents, fetchClassesStudents} from '@/lib/actions/admission/admission/student.actions';
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


    // Is update loading
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);


    // Date states
    const [date, setDate] = useState(moment());
    const [admissionDate, setAdmissionDate] = useState(moment());
    const [admissionDateTo, setAdmissionDateTo] = useState(moment());


    // Students
    const [students, setStudents] = useState<any>([]);


    // CLasses
    const [classes, setClasses] = useState([{}]);


    // Sessiong
    const [sessions, setSessions] = useState([{}]);


    // Selected students
    const [selectedStudents, setSelectedStudents] = useState([]);


    // Form
    const form = useForm({
        resolver: zodResolver(ManualListGenerationValidation),
        defaultValues: {
            class_name:'',
            merit_list:'',
            date:new Date(),
            admission_date_from:new Date(),
            admission_date_to:new Date(),
            session:'',
            students:[]
        }
    });


    // Submit handler
    const onSubmit = async () => {
        try {

            // No students validation
            if(selectedStudents.length === 0){
                toast({title:'Please select students', variant:'alert'});
                return;
            };


            // Selected merit validation
            if(form.getValues().merit_list === ''){
                toast({title:'Please select merit list', variant:'alert'});
                return;
            };


            // Setting is update loading to true
            setIsUpdateLoading(true);


            // Applying for admission
            const res = await applyStudentForAdmission({reg_nos:selectedStudents});
            console.log(res);

            // Reseting
            form.reset({
                class_name:'',
                merit_list:'',
                date:new Date(),
                admission_date_from:new Date(),
                admission_date_to:new Date(),
                session:'',
                students:[]
            });
            setStudents([{}]);
            setSelectedStudents([]);
            setDate(moment());
            setAdmissionDate(moment());
            setAdmissionDateTo(moment());
            toast({title:'Updated Successfully!'});


            // Setting is update loading to false
            setIsUpdateLoading(false);

        } catch (err: any) {
            console.log(err);
        }
    };


    // Get students
    const getStudents = async (class_name:any) => {
        if(class_name === 'All Classes'){
            const classStudents = await fetchClassesStudents({classes_names:classes.map((c:any) => c.class_name)});
            if(classStudents.length > 0){
                setStudents(classStudents);
                // @ts-ignore
                setSelectedStudents(classStudents.map((s:any) => s?.student?.reg_no));
            }else{
                toast({title:'No students found', variant:'alert'});
            }
        }else{
            const classStudents = await fetchClassStudents({class_name});
            if(classStudents.length > 0){
                setStudents(classStudents);
                // @ts-ignore
                setSelectedStudents(classStudents.map((s:any) => s?.student?.reg_no));
            }else{
                toast({title:'No students found', variant:'alert'});
            }
        }
    };


    // Use effect
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
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Admission')?.permissions?.find((pp:any) => pp.sub_menu === 'Manual List Generation');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[90%] max-h-[90%] max-w-[1000px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%] overflow-y-scroll custom-sidebar-scrollbar'>
            <Form
                {...form}
            >
                <form
                    className='w-full flex flex-col items-center px-2 pt-6 sm:px-4'
                >





                    <div className='w-full flex flex-col items-start gap-2 lg:items-end lg:flex-row'>
                        {/* Class */}
                        <div className='w-full flex flex-col items-center'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Class</FormLabel>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form.control}
                                    name='class_name'
                                    render={({ field }) => (
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
                                                        <SelectItem value='All Classes'>All Classes</SelectItem>
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


                        {/* Merit List */}
                        <div className='w-full flex flex-col items-center'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Merit List</FormLabel>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form.control}
                                    name='merit_list'
                                    render={({ field }) => (
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
                                                        <SelectItem value='Main List'>Main List</SelectItem>
                                                        <SelectItem value='Waiting List'>Waiting List</SelectItem>
                                                        <SelectItem value='Second List'>Second List</SelectItem>
                                                        <SelectItem value='Third List'>Third List</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <FormField
                            control={form?.control}
                            name='date'
                            render={() => (
                                <FormItem className='relative w-full flex flex-col'>
                                    <FormLabel className='pr-2 h-2 text-start text-[11px] text-[#726E71]'>Date</FormLabel>
                                    <div className='w-full'>
                                        <MyDatePicker
                                            selectedDate={date}
                                            setSelectedDate={setDate}
                                        />
                                    </div>
                                </FormItem>
                            )}
                        />


                        {/* Get Student */}
                        {permissions.read_only && (
                            <span
                                className='flex items-center justify-center min-w-[100px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                onClick={() => getStudents(form.getValues().class_name)}
                            >
                                Get Student
                            </span>
                        )}
                    </div>





                    <div className='w-full flex flex-col items-start gap-2 mt-2 lg:items-end lg:flex-row'>
                        {/* Adm. Date From */}
                        <FormField
                            control={form?.control}
                            name='admission_date_from'
                            render={() => (
                                <FormItem className='relative w-full flex flex-col'>
                                    <FormLabel className='pr-2 h-2 text-start text-[11px] text-[#726E71]'>Adm. Date From</FormLabel>
                                    <div className='w-full'>
                                        <MyDatePicker
                                            selectedDate={admissionDate}
                                            setSelectedDate={setAdmissionDate}
                                        />
                                    </div>
                                </FormItem>
                            )}
                        />


                        {/* Adm. Date To */}
                        <FormField
                            control={form?.control}
                            name='admission_date_to'
                            render={() => (
                                <FormItem className='relative w-full flex flex-col'>
                                    <FormLabel className='pr-2 h-2 text-start text-[11px] text-[#726E71]'>Adm. Date To</FormLabel>
                                    <div className='w-full overflow-visible relative'>
                                        <MyDatePicker
                                            selectedDate={admissionDateTo}
                                            setSelectedDate={setAdmissionDateTo}
                                        />
                                    </div>
                                </FormItem>
                            )}
                        />


                        {/* Session */}
                        <div className='w-full flex flex-col items-center'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Session</FormLabel>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form.control}
                                    name='session'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field?.onChange}
                                                >
                                                    <SelectTrigger disabled className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue
                                                            // @ts-ignore
                                                            placeholder={sessions[0]?.year_name}
                                                            className='text-[11px]'
                                                        />
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


                        {/* Buttons */}
                        {permissions.modify && isUpdateLoading ? (
                            <LoadingIcon />
                        ) : (
                            <span
                                className='flex items-center justify-center min-w-[100px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                onClick={onSubmit}
                            >
                                Update
                            </span>
                        )}
                    </div>


                    <StudentsList
                        students={students}
                        selectedStudents={selectedStudents}
                        setSelectedStudents={setSelectedStudents}
                    />

                </form>
            </Form>
        </div>
    )
}





// Export
export default FormCom;