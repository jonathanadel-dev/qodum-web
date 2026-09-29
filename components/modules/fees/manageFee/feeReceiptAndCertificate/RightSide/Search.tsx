// Imports
import Image from 'next/image';
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchStudentByAdmNo, fetchStudentsByAllData} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const Search = ({classes, sections, students}:any) => {


    // Search
    const [search, setSearch] = useState('');


    // Selected class
    const [selectedClass, setSelectedClass] = useState('');


    // Selected section
    const [selectedSection, setSelectedSection] = useState('');


    // Is loading searched students
    const [isLoadingSearchedStudents, setIsLoadingSearchedStudents] = useState(false);


    // Search Students
    const [searchStudents, setSearchStudents] = useState<any>([]);


    // Search by
    const [searchBy, setSearchBy] = useState('cheque-no');


    // Handle Search Click
    const admissionSearchClick = async () => {
        if(students?.map((s:any) => s?.student?.adm_no)?.includes(search)){
            const student = await fetchStudentByAdmNo({adm_no:search});
        }else{
            // setIsViewOpened(true);
        }
        setSearch('');
    };


    // Student search click
    const studentSearchClick = (student:any) => {

        setSearch('');
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
            ) : searchStudents.length < 1 ? (
                <p className=' text-xs pl-2 text-hash-color'>No students found</p>
            ) : searchStudents.map(((s:any) => (
                <div
                    onClick={() => studentSearchClick(s)}
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
                                // <div />
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
        if(search !== ''){
            setIsLoadingSearchedStudents(true);
            const searchFetcher = async () => {
                // ts-ignore
                const res = await fetchStudentsByAllData({name:search, father_name:search, adm_no:search, mobile:search, class_name:selectedClass, section_name:selectedSection});
                setSearchStudents(res);
                setIsLoadingSearchedStudents(false);
            };
            searchFetcher();
        }else{
            setSearchStudents([]);
        }
    }, [search]);


    return (
        <div className='flex flex-col p-2 bg-[#F7F7F7] gap-4 text-xs text-hash-color rounded-[4px] border-[0.5px] border-[#ccc]'>
            <div className='flex flex-row flex-wrap items-center gap-2'>
                <p className='font-semibold'>Search Receipt By:</p>
                <RadioGroup defaultValue='cheque-no' className='flex flex-row flex-wrap'>
                    <div className='flex items-center space-x-[2px]'>
                        <RadioGroupItem value='fee-receipt-no' id='fee-receipt-no' onClick={() => setSearchBy('fee-receipt-no')}/>
                        <Label htmlFor='fee-receipt-no' className='text-xs text-hash-color'>Fee Receipt No</Label>
                    </div>
                    <div className='flex items-center space-x-[2px]'>
                        <RadioGroupItem value='student-details' id='student-details' onClick={() => setSearchBy('student-details')}/>
                        <Label htmlFor='student-details' className='text-xs text-hash-color'>Student Details</Label>
                    </div>
                    <div className='flex items-center space-x-[2px]'>
                        <RadioGroupItem value='cheque-no' id='cheque-no' onClick={() => setSearchBy('cheque-no')}/>
                        <Label htmlFor='cheque-no' className='text-xs text-hash-color'>Cheque No</Label>
                    </div>
                    <div className='flex items-center space-x-[2px]'>
                        <RadioGroupItem value='dd-no' id='dd-no' onClick={() => setSearchBy('dd-no')}/>
                        <Label htmlFor='dd-no' className='text-xs text-hash-color'>DD No</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className='w-full flex flex-col bg-[#F7F7F7] gap-2 lg:flex-row lg:items-end'>
                <div className='flex-1 flex flex-row gap-2'>
                    {/* Class */}
                    <div className='w-full flex flex-col items-center'>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <Select
                                onValueChange={(v:any) => setSelectedClass(v)}
                            >
                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
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
                        </div>
                    </div>
                    {/* Section */}
                    <div className='w-full flex flex-col items-center'>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <Select
                                onValueChange={(v:any) => setSelectedSection(v)}
                            >
                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
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
                        </div>
                    </div>
                </div>
                <div className='flex-1 flex flex-col h-8 sm:flex-row'>
                    {/* Search input */}
                    <div className='relative flex h-full flex-row justify-center max-w-[600px] w-[100%] bg-white rounded-[5px] border-[0.5px] border-[#E4E4E4]'>
                        <Input
                            value={search}
                            onChange={(e:any) => setSearch(e.target.value)}
                            className='h-full border-[0] text-xs placeholder:text-xs'
                            placeholder='Search student'
                        />
                        <div
                            onClick={admissionSearchClick}
                            className='group flex flex-row items-center justify-center gap-[2px] px-4 border-[0.5px] border-[#2EABE5] rounded-r-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5]'
                        >
                            <p className='transition text-[#2EABE5] group-hover:text-white'>GO</p>
                        </div>
                        {searchedStudents}
                    </div>
                </div>
            </div>
        </div>
    );
};





// Export
export default Search;