// Imports
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {ChevronDown, ChevronsUpDown, Search} from 'lucide-react';
import {Command, CommandInput, CommandItem, CommandList} from '@/components/ui/command';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchStudentsByAllData, siblingsSearch} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main Function
const Siblings = ({setIsLoading, siblings, setSiblings}:any) => {

    // Toast
    const {toast} = useToast();


    // Is loading searched students
    const [isLoadingSearchedStudents, setIsLoadingSearchedStudents] = useState(false);


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Sections
    const [sections, setSections] = useState([{}]);


    // Selected students
    const [selectedStudents, setSelectedStudents] = useState([{}]);


    // Selected class
    const [selectedClass, setSelectedClass] = useState('');


    // Selected section
    const [selectedSection, setSelectedSection] = useState('');


    // Students
    const [students, setStudents] = useState([{}]);


    // Search
    const [search, setSearch] = useState('');


    // Handle Search Click
    const searchClick = async () => {
        const siblingStudentsRes = await siblingsSearch({class_name:selectedClass, section:selectedSection, adm_no:search});
        setStudents(siblingStudentsRes);
        if(siblingStudentsRes.length > 0){
            setStudents(siblingStudentsRes);
        }else{
            toast({title:'No students found', variant:'alert'});
        };
        setSearch('');
        setIsLoading(false);
    };


    // Searched Students
    const searchedStudents = (
        <div
            className={`z-10 flex-col absolute w-[100%] h-auto mt-2 max-h-[300px] top-[100%] left-0 bg-[#fff] rounded-[5px] border-[0.5px] border-[#E4E4E4] overflow-y-scroll custom-sidebar-scrollbar ${
            // @ts-ignore
            search !== '' ? 'flex' : 'hidden'}`}
        >

            {isLoadingSearchedStudents ? (
                <LoadingIcon />
            ) : students.length < 1 ? (
                <p className=' text-xs pl-2 text-hash-color'>No students found</p>
            ) : students.map(((s:any) => (
                <div
                    // onClick={() => studentSearchClick(s)}
                    className='flex flex-row gap-4 cursor-pointer transition hover:bg-[#E4E4E4]'
                >
                    <div>
                        <div className='ml-4 mt-2 rounded-[4px] border-[0.5px] border-[#E4E4E4] h-[75px] w-[75px]'>
                            {s?.student?.image && (
                                <Image
                                    src={s?.student?.image}
                                    alt='Student image'
                                    height={75}
                                    width={75}
                                    className='rounded-[4px] h-full'
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col py-2 text-[10px] text-hash-color gap-[2px]'>
                        <p className='font-semibold'>Student's Name - {s?.student?.name}</p>
                        <p className='mt-1'>Father's Name - {s?.parents?.father?.father_name}</p>
                        <p>Admission No. - {s?.student?.adm_no}</p>
                        <p>Class - {s?.student?.class}</p>
                    </div>
                </div>
            )))}


        </div>
    );


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
        if(search !== ''){
            setIsLoadingSearchedStudents(true);
            const searchFetcher = async () => {
                // ts-ignore
                const res = await fetchStudentsByAllData({name:search, father_name:search, adm_no:search, mobile:search, class_name:selectedClass, section_name:selectedSection});
                setStudents(res);
                setIsLoadingSearchedStudents(false);
            };
            searchFetcher();
        }else{
            setStudents([]);
        }
    }, [search]);

    return (
        <div className='flex flex-col items-center px-4'>

            {/* Search */}
            <div className='w-full flex flex-col p-2 ml-2 border-[0.5px] border-[#ccc] bg-[#F7F7F7] gap-2 rounded-[5px] text-xs text-hash-color lg:flex-row lg:items-end'>

                <div className='flex-1 flex flex-row gap-2'>
                    {/* Class */}
                    <div className='w-full flex flex-col items-center'>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                <FormControl>
                                    <Select onValueChange={(v:any) => setSelectedClass(v)}>
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
                        </div>
                    </div>

                    {/* Section */}
                    <div className='w-full flex flex-col items-center'>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                <FormControl>
                                    <Select onValueChange={(v:any) => setSelectedSection(v)}>
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Select Section' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                sections?.length < 1 ? (
                                                    <p>No sections</p>
                                                ) : // @ts-ignore
                                                !sections[0]?.section_name ? (
                                                    <LoadingIcon />
                                                ) : sections?.map((item:any) => (
                                                    <SelectItem value={item?.section_name} key={item?._id}>{item?.section_name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                            </FormItem>
                        </div>
                    </div>
                </div>


                {/* Search input */}
                <div className='flex-1 flex flex-col h-8 sm:flex-row'>
                    <div className='relative flex h-full flex-row justify-center min-w-[200px] max-w-[600px] w-[100%] bg-white rounded-[5px] border-[0.5px] border-[#E4E4E4]'>
                        <Input
                            value={search}
                            onChange={(e:any) => setSearch(e?.target?.value)}
                            className='h-full border-[0] text-xs placeholder:text-xs'
                            placeholder='Search student'
                        />
                        <div
                            // onClick={admissionSearchClick}
                            className='group flex flex-row items-center justify-center gap-[2px] px-2 border-[0.5px] border-[#2EABE5] rounded-r-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5]'
                        >
                            <Search size={15} className='text-[#2EABE5] transition group-hover:text-white'/>
                            <p className='transition text-[#2EABE5] group-hover:text-white'>Search</p>
                        </div>
                        {searchedStudents}
                    </div>
                </div>

            </div>





            {/* List */}
            <Command className='w-[100%] max-h-[90%] mt-4 flex flex-col items-center pb-2 gap-2 border-[0.5px] border-[#E8E8E8]'>
                <div className='w-full h-[100%] flex flex-col items-center bg-[#F1F1F1]'>
                    <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>

                        {/* Headers */}
                        <ul className='w-full min-w-[800px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>

                            <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                Sr. No.
                                <ChevronsUpDown size={12} />
                            </li>
                            <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                Select
                                <ChevronsUpDown size={12} />
                            </li>
                            <li className='basis-[25%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                Student Name
                                <ChevronsUpDown size={12} />
                            </li>
                            <li className='basis-[22.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                Father Name
                                <ChevronsUpDown size={12} />
                            </li>
                            <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                Mother Name
                                <ChevronsUpDown size={12} />
                            </li>
                            <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 py-[2px]'>
                                Active
                                <ChevronsUpDown size={12} />
                            </li>

                        </ul>


                        {/* Values */}
                        <CommandList>
                            {
                                // @ts-ignore
                                students[0]?.student?.name === undefined ? (
                                    <p className='w-full min-w-[800px] flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-[0.5px] border-[#ccc]'>
                                        No students
                                    </p>
                                ) : // @ts-ignore
                                students[0]?.student?.name === '' ? (
                                    <LoadingIcon />
                                ) : students.map((student: any, index: number) => (
                                    <CommandItem
                                        key={index}
                                        value={`${students.indexOf(student) + 1}  ${student?.student?.name} ${student?.student?.class} ${student?.parents?.parent?.father_name} ${student?.parents?.mother?.mother_name}`}
                                        className='w-full min-w-[800px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                    >
                                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>{students.indexOf(student) + 1}</li>
                                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                                            <FormField
                                                name="class"
                                                render={({ field }: any) => {
                                                    return (
                                                        <FormItem
                                                            key={student.admin_no}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl >
                                                                <Checkbox
                                                                    checked={selectedStudents.includes(student?.student?.reg_no)}
                                                                    onCheckedChange={() => {
                                                                        if(selectedStudents.includes(student?.student?.reg_no)){
                                                                            setSelectedStudents(selectedStudents.filter((s:any) => s !== student?.student?.reg_no));
                                                                        }else{
                                                                            setSelectedStudents([...selectedStudents, student?.student?.reg_no]);
                                                                        };
                                                                    }}
                                                                    className='rounded-[2px] text-hash-color'
                                                                />

                                                            </FormControl>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        </li>
                                        <li className='basis-[25%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                            {student?.student?.name}
                                        </li>
                                        <li className='basis-[22.5%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                            {student?.parents?.parent?.father_name}
                                        </li>
                                        <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                            {student?.parents?.mother?.mother_name}
                                        </li>
                                        <li className='basis-[12.5%] flex flex-row items-center px-2'>
                                            {student?.student?.is_active ? 'True' : 'False'}
                                        </li>

                                    </CommandItem>
                                ))
                            }
                        </CommandList>

                    </div>
                </div>
            </Command>

        </div>
    );
};





// Export
export default Siblings;