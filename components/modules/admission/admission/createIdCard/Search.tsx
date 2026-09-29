'use client';
// Imports
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Search as SearchIcon} from 'lucide-react';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {fetchStudentByAdmNo, fetchStudentsByAllData} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const Search = ({students, selectedStudent, setSelectedStudent}:any) => {


    // Toast
    const {toast} = useToast();


    // Search
    const [search, setSearch] = useState('');


    // Is loading searched students
    const [isLoadingSearchedStudents, setIsLoadingSearchedStudents] = useState(false);


    // Search Students
    const [searchStudents, setSearchStudents] = useState<any>([]);


    // Handle Search Click
    const admissionSearchClick = async () => {
        if(students?.map((s:any) => s?.student?.adm_no)?.includes(search)){
            const student = await fetchStudentByAdmNo({adm_no:search});
            setSelectedStudent({
                ...selectedStudent,
                name:student?.student?.name || '',
                adm_no:student?.student?.adm_no || '',
                father_name:student?.parents?.father?.father_name || '',
                dob:student?.student?.dob || '',
                class_name:student?.student?.class || '',
                mother_name:student?.parents?.mother?.mother_name || '',
                mobile:student?.student?.mobile || '',
                address:student?.student?.h_no_and_streets || '',
                image:student?.student?.image || ''
            });
        }else{
            toast({title:'No students found', variant:'error'});
        }
        setSearch('');
    };


    // Student search click
    const studentSearchClick = (student:any) => {
        setSelectedStudent({
            ...selectedStudent,
            name:student?.student?.name || '',
            adm_no:student?.student?.adm_no || '',
            father_name:student?.parents?.father?.father_name || '',
            dob:student?.student?.dob || '',
            class_name:student?.student?.class || '',
            mother_name:student?.parents?.mother?.mother_name || '',
            mobile:student?.student?.mobile || '',
            address:student?.student?.h_no_and_streets || '',
            image:student?.student?.image || ''
        });
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
                const res = await fetchStudentsByAllData({name:search, father_name:search, adm_no:search, mobile:search, class_name:'', section_name:''});
                setSearchStudents(res);
                setIsLoadingSearchedStudents(false);
            };
            searchFetcher();
        }else{
            setSearchStudents([]);
        }
    }, [search]);


    return (
        <div className='w-full flex items-center justify-center p-2 bg-[#F7F7F7] gap-2 text-xs text-hash-color rounded-[4px] border-[0.5px] border-[#ccc]'>
            {/* Search input */}
            <div className='relative flex h-full flex-row justify-center max-w-[400px] w-[100%] bg-white rounded-[5px] border-[0.5px] border-[#E4E4E4]'>
                <Input
                    value={search}
                    onChange={(e:any) => setSearch(e.target.value)}
                    className='h-full border-[0] text-xs placeholder:text-xs'
                    placeholder='Search student'
                />
                <div
                    onClick={admissionSearchClick}
                    className='group flex flex-row items-center justify-center gap-[2px] px-2 border-[0.5px] border-[#2EABE5] rounded-r-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5]'
                >
                    <SearchIcon size={15} className='text-[#2EABE5] transition group-hover:text-white'/>
                    <p className='transition text-[#2EABE5] group-hover:text-white'>Search</p>
                </div>
                {searchedStudents}
            </div>
        </div>
    );
};





// Export
export default Search;