// Imports
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import StudentsList from './StudentList';
import {ChevronDown} from 'lucide-react';
import {useContext, useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {FormControl, Form, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {UpdateStudentDetailsValidation} from '@/lib/validations/admission/masterSettings/updateStudentDetails.validation';
import {fetchStudentsByClassAndSectionTransport, modifyAdmittedStudent} from '@/lib/actions/admission/admission/admittedStudent.actions';
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


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Students
    const [students, setStudents] = useState<any>([]);


    // Fields
    const fields = [
        'Admission No.',
        'Student Name',
        'Student DOB',
        'Student DOA',
        'Student DOJ',
        'Student Address',
        'Student Contact',
        'Blood Group',
        'Religion',
        'Nationality',
        'Gender',
        'Active',
        'Student Email',
        'Contact Person Name',
        'Contact Person Mobile',
        'Contact Email',
        'Category',
        'Is New',
        'Cast',
        'EWS',
        'General Description',
        'Previous School',
        'Previous School DOL',
        'Medical History',
        'Emergency Contact Person Name',
        'Emergency Contact Person Mobile',
        'Emergency Contact Person Phone',
        'Emergency Contact Person Address',
        'Emergency Contact Person Relation',
        'Family Doctor Name',
        'Family Doctor Phone',
        'Family Doctor Address',
        'Father Name',
        'Father Designation',
        'Father Phone',
        'Father DOB',
        'Father R Address',
        'Father Office Address',
        'Father Email 1',
        'Father Email 2',
        'Father Mobile',
        'Father Profession',
        'Father Company Name',
        'Father Business Details',
        'Father Professional',
        'Student Status',
        'Father Service In',
        'Father Office Phone',
        'Father Office Mobile',
        'Father Office Extension',
        'Father Office Email',
        'Father Office Website',
        'Mother Name',
        'Mother Designation',
        'Mother Phone',
        'Mother DOB',
        'Mother R Address',
        'Mother Office Address',
        'Mother Email 1',
        'Mother Email 2',
        'Mother Mobile',
        'Mother Profession',
        'Mother Company Name',
        'Mother Business Details',
        'Mother Professional',
        'Mother Service In',
        'Mother Office Phone',
        'Mother Office Mobile',
        'Mother Office Extension',
        'Mother Office Email',
        'Mother Office Website',
        'Anniversary Date',
        'Father Income',
        'Mother Income',
        'Board Roll No.',
        'Secondary Conctact No.',
        'Bill No.',
        'House',
        'Transport',
        'Roll No.',
        'Mother Middle Name',
        'Mother Last Name',
        'Aadhar Card No.',
        'Admitted Class',
        'Stu Sec No.',
        'School Board',
        'Student Stream',
        'Optional Subject',
        'Is Minority',
        'Is Only Child'
    ];


    // CLasses
    const [classes, setClasses] = useState([{}]);


    // Sections
    const [sections, setSections] = useState([{}]);


    // Form
    const form = useForm({
        resolver: zodResolver(UpdateStudentDetailsValidation),
        defaultValues: {
            class_name:'',
            section_name:'',
            field:''
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof UpdateStudentDetailsValidation>) => {
        try {


            // Modifying
            students.map(async (s:any) => {
                await modifyAdmittedStudent({
                    id:s._id,
                    student:s.student,
                    parents:s.parents,
                    others:s.others,
                    guardian_details:s.guardian_details,
                    documents:s.documents
                });
            });

            // Reseting
            form.reset({
                class_name:'',
                section_name:'',
                field:''
            });
            setStudents([]);
            toast({title:'Updated Successfully!'});

        } catch (err: any) {
            console.log(err);
        }
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const classesRes = await fetchClasses();
            const sectionsRes = await fetchSections();
            setClasses(classesRes);
            setSections(sectionsRes);
        };
        fetcher();
    }, []);
    useEffect(() => {
        if(form.getValues().class_name !== '' && form.getValues().section_name !== '' && form.getValues().field !== ''){
            setIsLoading(true);
            const fetcher = async () => {
                const res = await fetchStudentsByClassAndSectionTransport({class_name:form.getValues().class_name, section:form.getValues().section_name});
                setStudents(res);
                setIsLoading(false);
            };
            fetcher();
        };
    }, [form.watch('class_name'), form.watch('section_name'), form.watch('field')]);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Admission')?.permissions?.find((pp:any) => pp.sub_menu === 'Update Student Details');
        setPermissions(grantedPermissions);
    }, [user]);


    return (
        <div className='w-[95%] max-h-[90%] max-w-[1500px] flex flex-col items-center overflow-y-scroll custom-sidebar-scrollbar'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center px-2 pt-6 sm:px-4'
                >

                    <div className='w-full max-w-[600px] flex flex-col items-start gap-2 lg:items-end lg:flex-row'>
                        {/* Classes */}
                        <div className='w-full flex flex-col items-center'>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
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
                                                    disabled={!permissions.read_only}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Select Class' className='text-[11px]' />
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
                        {/* Sections */}
                        <div className='w-full flex flex-col items-center'>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                                <FormField
                                    control={form.control}
                                    name='section_name'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field?.onChange}
                                                    disabled={!permissions.read_only}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Select Section' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {sections?.length < 1 ? (
                                                            <p>No sections</p>
                                                            // @ts-ignore
                                                        ) : !sections[0]?.section_name ? (
                                                            <LoadingIcon />
                                                        ) : sections?.map((item:any) => (
                                                            <SelectItem value={item?.section_name} key={item?._id}>{item?.section_name}</SelectItem>
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
                        {/* Fields */}
                        <div className='w-full flex flex-col items-center'>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                                <FormField
                                    control={form.control}
                                    name='field'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field?.onChange}
                                                    disabled={!permissions.read_only}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Select Field' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {fields.map((f) => (
                                                            <SelectItem value={f} key={f}>{f}</SelectItem>
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
                        {/* Button */}
                        {permissions.modify && (
                            <Button
                                type='submit'
                                className='min-w-[100px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[5px] border-white
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            >
                                Update
                            </Button>
                        )}
                    </div>

                    
                    <div className='flex items-center justify-center w-full mt-4'>
                        {
                            isLoading ? (
                                <LoadingIcon />
                            ) : students.length > 0 ? (
                                <StudentsList
                                    form={form}
                                    students={students}
                                    setStudents={setStudents}
                                />
                            ) : (
                                <p className='text-xs text-hash-color'>No Students</p>
                            )
                        }
                    </div>

                </form>
            </Form>
        </div>
    )
}





// Export
export default FormCom;