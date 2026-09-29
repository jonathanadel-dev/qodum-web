// Imports
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {ChevronDown, ChevronsUpDown, Search} from 'lucide-react';
import {siblingsSearch} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Command, CommandInput, CommandItem, CommandList, CommandEmpty} from '@/components/ui/command';





// Main Function
const Sibling = ({setIsLoading, setIsViewOpened}:any) => {


    // Toast
    const {toast} = useToast();


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


    // Siblings
    const [siblings, setSiblings] = useState([{}]);


    // Search
    const [search, setSearch] = useState('');


    // Handle Search Click
    const searchClick = async () => {
        const siblingStudentsRes = await siblingsSearch({class_name:selectedClass, section:selectedSection, adm_no:search});
        setSiblings(siblingStudentsRes);
        if(siblingStudentsRes.length > 0){
            setSiblings(siblingStudentsRes);
        }else{
            toast({title:'No students found', variant:'alert'});
        };
        setSearch('');
        setIsLoading(false);
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


    return (
        <div className='flex flex-col items-center'>
            {/* Search */}
            <div className='flex flex-col items-end p-2 ml-2 border-[0.5px] border-[#ccc] bg-[#F7F7F7] gap-2 rounded-[5px] text-xs text-hash-color xl:flex-row'>
                <div className='w-full flex-1 flex flex-row gap-2 xl:w-auto'>
                    {/* Class */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%]'>Class</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                <FormControl>
                                    <Select
                                        onValueChange={(v:any) => setSelectedClass(v)}
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
                        </div>
                    </div>
                    {/* Section */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%]'>Section</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                <FormControl>
                                    <Select
                                        onValueChange={(v:any) => setSelectedSection(v)}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
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
                        </div>
                    </div>
                </div>
                <div className='flex-1 flex flex-row h-8'>
                    {/* Search input */}
                    <div className='flex h-full flex-row justify-center min-w-[200px] max-w-[600px] w-[100%] bg-white rounded-[5px] border-[0.5px] border-[#E4E4E4]'>
                        <Input
                            value={search}
                            onChange={(e:any) => setSearch(e?.target?.value)}
                            className='h-full border-[0] text-xs placeholder:text-xs'
                            placeholder='Search admission no.'
                        />
                        <div
                            onClick={searchClick}
                            className='group flex flex-row items-center justify-center gap-[2px] px-2 border-[0.5px] border-[#2EABE5] rounded-r-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5]'
                        >
                            <Search size={15} className='text-[#2EABE5] transition group-hover:text-white'/>
                            <p className='transition text-[#2EABE5] group-hover:text-white'>Search</p>
                        </div>
                    </div>
                    <div
                        onClick={() => setIsViewOpened('admission')}
                        className='group w-[250px] flex flex-row items-center justify-center gap-[2px] ml-2 px-2 border-[0.5px] border-[#2EABE5] bg-white rounded-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5]'
                    >
                        <p className='transition text-[#2EABE5] group-hover:text-white'>Search From Admission</p>
                    </div>
                </div>
            </div>










            <Command
                className='w-[100%] max-h-[90%] mt-4 flex flex-col items-center pb-2 gap-2 border-[0.5px] border-[#E8E8E8]'
            >

                <div className='w-full h-[100%] flex flex-col items-center bg-[#F1F1F1]'>


                    {/* Search input */}
                    <div className='w-full flex flex-row justify-end pr-4 py-2 border-b-[0.5px] border-[#ccc]'>
                        <CommandInput
                            placeholder='Search list'
                            className='h-full text-xs text-hash-color w-[250px] bg-white'
                        />
                    </div>


                    {/* Heads */}
                    <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                        {/* Headers */}
                        <ul className='w-full min-w-[1200px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>

                            <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                Sr. No.
                                <ChevronsUpDown size={12} />
                            </li>
                            <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                Select
                                <ChevronsUpDown size={12} />
                            </li>
                            <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                Student Image
                                <ChevronsUpDown size={12} />
                            </li>
                            <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                Student Name
                                <ChevronsUpDown size={12} />
                            </li>
                            <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                Class Name
                                <ChevronsUpDown size={12} />
                            </li>
                            <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                Father Name
                                <ChevronsUpDown size={12} />
                            </li>
                            <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                Mother Name
                                <ChevronsUpDown size={12} />
                            </li>
                            <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px]'>
                                Active
                                <ChevronsUpDown size={12} />
                            </li>

                        </ul>
                        {/* Values */}
                        <CommandList>
                            {
                                // @ts-ignore
                                siblings[0]?.student?.name === undefined ? (
                                    <p className='w-full min-w-[1200px] flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-[0.5px] border-[#ccc]'>
                                        No students
                                    </p>
                                ) : // @ts-ignore
                                siblings[0]?.student?.name === '' ? (
                                    <LoadingIcon />
                                ) : siblings.map((student: any, index: number) => (
                                    <CommandItem
                                        key={index}
                                        value={`${siblings.indexOf(student) + 1}  ${student?.student?.name} ${student?.student?.class} ${student?.parents?.parent?.father_name} ${student?.parents?.mother?.mother_name}`}
                                        className='w-full min-w-[1200px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                    >
                                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>{siblings.indexOf(student) + 1}</li>
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
                                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                                            -
                                        </li>
                                        <li className='basis-[12.5%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                            {student?.student?.name}
                                        </li>
                                        <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                            {student?.student?.class}
                                        </li>
                                        <li className='basis-[15%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                            {student?.parents?.parent?.father_name}
                                        </li>
                                        <li className='basis-[15%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                            {student?.parents?.mother?.mother_name}
                                        </li>
                                        <li className='basis-[10%] flex flex-row items-center px-2'>
                                            {student?.student?.is_active ? 'True' : 'False'}
                                        </li>

                                    </CommandItem>
                                ))
                            }
                        </CommandList>
                        {
                            // @ts-ignore 
                            siblings[0]?.student?.name !== undefined && <CommandEmpty>No results found</CommandEmpty>
                        }
                    </div>
                </div>
            </Command>
        </div>
    );
};





// Export
export default Sibling;