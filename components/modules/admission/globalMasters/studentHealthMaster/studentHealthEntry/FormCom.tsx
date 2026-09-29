'use client';
// Imports
import * as z from 'zod';
import HeadsList from './HeadsList';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {useContext, useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchStudentsByClassAndSection, modifyStudentsHealthDetails} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {StudentHealthEntryValidation} from '@/lib/validations/admission/globalMasters/studentHealthMaster/studentHealthEntry.validation';
import { AuthContext } from '@/context/AuthContext';





// Main function
const FormCom = ({classes, sections, terms}: any) => {

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


    // Students
    const [students, setStudents] = useState([{}]);


    // Form
    const form = useForm({
        resolver:zodResolver(StudentHealthEntryValidation),
        defaultValues: {
            class_name:'',
            section:'',
            term:'',
            students:[{
                adm_no:'',
                height:0,
                weight:0
            }]
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof StudentHealthEntryValidation>) => {
        await modifyStudentsHealthDetails({students:values.students});
        toast({title:'Saved Successfully!'});
        form.reset({
            class_name:'',
            section:'',
            students:[{
                adm_no:'',
                height:0,
                weight:0
            }]
        });
        setStudents([{}]);
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            if(form.getValues().class_name !== '' && form.getValues().section !== ''){
                const studentsRes = await fetchStudentsByClassAndSection({class_name:form.getValues().class_name, section:form.getValues().section});
                setStudents(studentsRes);
                studentsRes.map((student:any) => {
                    form.setValue(`students.${studentsRes.indexOf(student)}.adm_no`, student?.student?.adm_no);
                    form.setValue(`students.${studentsRes.indexOf(student)}.height`, student?.health_details?.height);
                    form.setValue(`students.${studentsRes.indexOf(student)}.weight`, student?.health_details?.weight);
                });
            }
        };
        fetcher();
    }, [form.watch('class_name'), form.watch('section')]);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Admission')?.permissions?.find((pp:any) => pp.sub_menu === 'Student Health Entry');
        setPermissions(grantedPermissions);
    }, [user]);


    return (
        <div className='w-[100%] max-w-[1500px] flex flex-col items-center'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-[90%] flex flex-col py-4 items-center px-2 gap-4 sm:px-4 border-[#E8E8E8] border-[0.5px] rounded-[5px]'
                >


                    <div className='w-full flex flex-col items-end gap-2 sm:flex-row'>
                        {/* Class */}
                        <FormField
                            control={form.control}
                            name='class_name'
                            render={({field}) => (
                                <FormItem className='w-full'>
                                <div className='w-full flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-2 text-start text-xs text-[#726E71]'>Class</FormLabel>
                                    <div className='w-full flex flex-col items-start gap-4'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                    <SelectValue placeholder='Select Group'/>
                                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {classes.length < 1 ? (
                                                        <p>No classes</p>
                                                    ) : !classes[0].class_name ? (
                                                        <LoadingIcon />
                                                    ) : classes.map((item:any) => (
                                                        <SelectItem value={item.class_name} key={item._id}>{item.class_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs'/>
                                    </div>
                                </div>
                            </FormItem>
                            )}
                        />


                        {/* Section */}
                        <FormField
                            control={form.control}
                            name='section'
                            render={({field}) => (
                                <FormItem className='w-full'>
                                <div className='w-full flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-2 text-start text-xs text-[#726E71]'>Section</FormLabel>
                                    <div className='w-full flex flex-col items-start gap-4'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                    <SelectValue placeholder='Select Group'/>
                                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {sections.length < 1 ? (
                                                        <p>No sections</p>
                                                    ) : !sections[0].section_name ? (
                                                        <LoadingIcon />
                                                    ) : sections.map((item:any) => (
                                                        <SelectItem value={item.section_name} key={item._id}>{item.section_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs'/>
                                    </div>
                                </div>
                            </FormItem>
                            )}
                        />


                        {/* Term */}
                        <FormField
                            control={form.control}
                            name='term'
                            render={({field}) => (
                                <FormItem className='w-full'>
                                <div className='w-full flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-2 text-start text-xs text-[#726E71]'>Term</FormLabel>
                                    <div className='w-full flex flex-col items-start gap-4'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                    <SelectValue placeholder='Select Group'/>
                                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {terms.length < 1 ? (
                                                        <p>No terms</p>
                                                    ) : !terms[0].term_name ? (
                                                        <LoadingIcon />
                                                    ) : terms.map((item:any) => (
                                                        <SelectItem value={item.term_name} key={item._id}>{item.term_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs'/>
                                    </div>
                                </div>
                            </FormItem>
                            )}
                        />


                        {/* Save button */}
                        {permissions.modify && (
                            <div className='w-full flex justify-center sm:w-auto'>
                                <Button
                                    type='submit'
                                    className='px-4 h-8 text-[16px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                >
                                    Save
                                </Button>
                            </div>
                        )}
                    </div>


                    {/* Fee heads */}
                    <div className='w-full'>
                        <h2>Student List</h2>
                        <HeadsList
                            students={students}
                            form={form}
                        />
                    </div>



                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;