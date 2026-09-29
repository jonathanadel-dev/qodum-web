// Imports
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import StudentsList from './StudentList';
import {ChevronDown} from 'lucide-react';
import {useContext, useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {FormControl, Form, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchStudentsByClasses} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {StudentImageDownloadValidation} from '@/lib/validations/admission/masterSettings/studentImageDownload.validation';
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


    // Selected students
    const [selectedStudents, setSelectedStudents] = useState<any>([]);


    // CLasses
    const [classes, setClasses] = useState([{}]);


    // Form
    const form = useForm({
        resolver: zodResolver(StudentImageDownloadValidation),
        defaultValues: {
            class_name:''
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof StudentImageDownloadValidation>) => {
        try {

            // Reseting
            form.reset({
                class_name:''
            });
            setStudents([]);
            setSelectedStudents([]);
            toast({title:'Downloaded Successfully!'});

        } catch (err: any) {
            console.log(err);
        }
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const classesRes = await fetchClasses();
            setClasses(classesRes);
        };
        fetcher();
    }, []);
    useEffect(() => {
        if(form.getValues().class_name !== ''){
            setIsLoading(true);
            const fetcher = async () => {
                const res = await fetchStudentsByClasses({classes:[form.getValues().class_name]});
                setStudents(res);
                setIsLoading(false);
            };
            fetcher();
        };
    }, [form.watch('class_name')]);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Admission')?.permissions?.find((pp:any) => pp.sub_menu === 'Student Image Download');
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

                    <div className='w-full max-w-[600px] flex flex-col items-center gap-4'>
                        {/* Details */}
                        <RadioGroup
                            defaultValue='student-details'
                            className='flex flex-row items-center gap-2'
                        >
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem value='student-details' id='student-details' />
                                <Label
                                    htmlFor='student-details'
                                    className='text-xs text-hash-color'
                                >
                                    Student Details
                                </Label>
                            </div>
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem value='teacher-details ' id='teacher-details' />
                                <Label
                                    htmlFor='teacher-details'
                                    className='text-xs text-hash-color'
                                >
                                    Teacher Details
                                </Label>
                            </div>
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem value='father-details ' id='father-details' />
                                <Label
                                    htmlFor='father-details'
                                    className='text-xs text-hash-color'
                                >
                                    Father Details
                                </Label>
                            </div>
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem value='mother-details ' id='mother-details' />
                                <Label
                                    htmlFor='mother-details'
                                    className='text-xs text-hash-color'
                                >
                                    Mother Details
                                </Label>
                            </div>
                        </RadioGroup>


                        {/* Classes */}
                        <div className='w-full max-w-[300px] flex flex-col items-center'>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                                <p className='text-xs text-hash-color'>Class</p>
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
                    </div>


                    {/* Students list */}
                    <StudentsList
                        students={students}
                        isLoading={isLoading}
                        selectedStudents={selectedStudents}
                        setSelectedStudents={setSelectedStudents}
                    />


                    {/* Button */}
                    <Button
                        type='submit'
                        className='min-w-[100px] h-8 mt-4 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[5px] border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    >
                        Download
                    </Button>

                </form>
            </Form>
        </div>
    )
}





// Export
export default FormCom;