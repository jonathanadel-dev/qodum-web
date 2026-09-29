// Imports
import {useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {ChevronsUpDown} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Command, CommandItem, CommandList} from '@/components/ui/command';
import {FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';





// Main Function
const HeadsList = ({students, form}:any) => {


    // Check change
    const checkChange = (student:any) => {
        if(form.getValues().students.map((item:any) => item.adm_no).includes(student.student.adm_no)){
            form.setValue(`students.${students.indexOf(student)}.adm_no`, '');
        }else{
            form.setValue(`students.${students.indexOf(student)}.adm_no`, student.student.adm_no);
        }
    };


    // Use effect
    useEffect(() => {}, [form.watch('students'), students]);


    return (
        <Command
            className='w-full h-auto flex flex-col items-center mt-2 gap-2 rounded-[4px] border-[0.5px] border-[#E8E8E8] '
        >

            <div className='w-full flex flex-col items-center bg-[#F1F1F1]'>

                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[700px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Adm No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Student Name
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Select
                            {/* {students[0]?.student?.name && (
                                <Checkbox
                                    className='rounded-[2px] text-hash-color'
                                    onCheckedChange={() => {
                                        if(form.getValues().students.filter((student:any) => student.adm_no === '').length === students.length || form.getValues().students.filter((student:any) => student.adm_no === '').length !== 0){
                                            students.map((student:any) => {
                                                form.setValue(`students.${students.indexOf(student)}.adm_no`, student.student.adm_no);
                                                form.setValue(`students.${students.indexOf(student)}.height`, student.health_details.height);
                                                form.setValue(`students.${students.indexOf(student)}.weight`, student.health_details.weight);
                                            });
                                        }else{
                                            students.map((student:any) => {
                                                form.setValue(`students.${students.indexOf(student)}.adm_no`, '');
                                                form.setValue(`students.${students.indexOf(student)}.height`, 0);
                                                form.setValue(`students.${students.indexOf(student)}.weight`, 0);
                                            });
                                        };
                                    }}
                                    checked={students.length === form.getValues().students.map((s:any) => s.adm_no).length}
                                />
                            )} */}
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[25%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Height (CM)
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2'>
                            Weight (KG)
                            <ChevronsUpDown size={12}/>
                        </li>
                    </ul>

                    {/* Values */}
                    <CommandList>
                        {
                            students[0]?.student?.name === undefined ? (
                                <p className='w-full min-w-[700px] flex flex-row p-2 text-sm bg-[#E2E4FF] border-b[0.5px] border-[#ccc]'>
                                    No students yet
                                </p>
                            ) : !students[0]?.student?.name ? (
                                    <LoadingIcon />
                                ) : students.map((student:any) => (
                                    <CommandItem key={student._id} className='w-full min-w-[700px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'>
                                        <li className='basis-[20%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{student?.student?.adm_no}</li>
                                        <li className='basis-[20%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{student?.student?.name}</li>
                                        <li className='basis-[15%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <Checkbox
                                                checked={form.getValues().students.map((item:any) => item.adm_no).includes(student.student.adm_no)}
                                                onCheckedChange={() => checkChange(student)}
                                                className='rounded-[2px] text-hash-color'
                                            />
                                        </li>

                                        {/* Height */}
                                        <li className='basis-[25%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <FormField
                                                control={form.control}
                                                name={`students.${students.indexOf(student)}.height`}
                                                render={({field}) => (
                                                    <FormItem className='w-full'>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className='flex flex-row h-6 items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='text-xs'/>
                                                </FormItem>
                                                )}
                                            />
                                        </li>

                                        {/* Weight */}
                                        <li className='basis-[20%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <FormField
                                                control={form.control}
                                                name={`students.${students.indexOf(student)}.weight`}
                                                render={({field}) => (
                                                    <FormItem className='w-full'>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className='flex flex-row h-6 items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='text-xs'/>
                                                </FormItem>
                                                )}
                                            />
                                        </li>

                                    </CommandItem>
                                ))
                        }
                    </CommandList>
                </div>
            </div>
        </Command>
    );
};





// Export
export default HeadsList;