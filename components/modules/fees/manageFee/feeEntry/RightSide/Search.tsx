// Imports
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {FormControl, FormItem} from '@/components/ui/form';
import {ChevronDown, Search as SearchIcon} from 'lucide-react';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchStudentByAdmNo, fetchStudentsByAllDataFeeEntry, fetchStudentsCountByClassAndSection} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const Search = ({classes, sections, setIsViewOpened, students, setSelectedStudent, setInstallments, setSelectedInstallments, headsSequence}:any) => {


    // Search
    const [search, setSearch] = useState('');


    // Selected class
    const [selectedClass, setSelectedClass] = useState('');


    // Selected section
    const [selectedSection, setSelectedSection] = useState('');


    // Students count
    const [studentsCount, setStudentsCount] = useState<any>();


    // Is loading searched students
    const [isLoadingSearchedStudents, setIsLoadingSearchedStudents] = useState(false);


    // Search Students
    const [searchStudents, setSearchStudents] = useState<any>([]);


    // All installments
    const [allInstallments, setAllInstallments] = useState<any>([]);


    // Handle Search Click
    const admissionSearchClick = async () => {
        if(students?.map((s:any) => s?.student?.adm_no)?.includes(search)){
            const student = await fetchStudentByAdmNo({adm_no:search});
            setSelectedStudent({
                id:student?._id || '',
                image:student?.student?.image || '',
                name:student?.student?.name || '',
                address:student?.student?.h_no_and_streets || '',
                father_name:student?.parents?.father?.father_name || '',
                mother_name:student?.parents?.mother?.mother_name || '',
                contact_no:student?.student?.contact_person_mobile || '',
                admission_no:student?.student?.adm_no || '',
                bill_no:student?.student?.bill_no || '',
                class:student?.student?.class || '',
                section:student?.student?.section || '',
                phone:student.student.mobile || '',
                email:student.student.email || '',
                board:student?.student?.board || '',
                route_name:student?.transport_details?.route,
                stop_name:student?.transport_details?.stop,
                vehicle_name:student?.transport_details?.vehicle,
                wing_name:student?.student?.wing || '',
                is_new:student?.student?.is_new || false,
                is_active:student?.student?.is_active || false,
                student_status:student?.student?.student_status || '',
                affiliated_heads:{
                    group_name:student?.affiliated_heads?.group_name || '',
                    heads:student?.affiliated_heads?.heads?.map((h:any) => {
                        return {
                            ...h,
                            amounts:h?.amounts?.map((a:any) => {
                                const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                                const last_rec_amount = a.last_rec_amount ? Number(a.last_rec_amount) : 0;
                                return {
                                    name:a.name,
                                    value:Number(a.value),
                                    conc_amount:conc_amount,
                                    last_rec_amount:last_rec_amount,
                                    payable_amount:Number(a.payable_amount) || (Number(a.value) - (last_rec_amount + conc_amount)),
                                    paid_amount:Number(a.paid_amount) || (Number(a.value) - (last_rec_amount + conc_amount))
                                };
                            })
                        };
                    })|| []
                }
            });
            // const singleInstallments = student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length === 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name)[0]);
            // const installments = student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length > 1).length > 0
            //     ? student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length > 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name).concat(singleInstallments))[0]
            //     : student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length === 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name)[0]);
            // const filteredInstallments = installments?.filter((item:any, pos:any) => installments.indexOf(item) == pos);
            // const sortedInstallments = allInstallments?.filter((i:any) => filteredInstallments?.includes(i.name)).map((i:any) => i.name);
            // setInstallments(sortedInstallments);
            // setSelectedInstallments([sortedInstallments[0]]);

            const singleInstallments = student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length === 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name)[0]);
            const installments = student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length > 0).map((h:any) => h?.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).map((a:any) => a.name).concat(singleInstallments)).flat().filter((value:any, index:any, self:any) => self.indexOf(value) === index)
            const sortedInstallments = allInstallments?.filter((i:any) => installments?.includes(i.name)).map((i:any) => i.name);
            setInstallments(sortedInstallments);
            setSelectedInstallments([sortedInstallments[0]]);
        }else{
            setIsViewOpened(true);
        }
        setSearch('');
    };


    // Student search click
    const studentSearchClick = (student:any) => {
        setSelectedStudent({
            id:student?._id || '',
            image:student?.student?.image || '',
            name:student?.student?.name || '',
            address:student?.student?.h_no_and_streets || '',
            father_name:student?.parents?.father?.father_name || '',
            mother_name:student?.parents?.mother?.mother_name || '',
            contact_no:student?.student?.contact_person_mobile || '',
            admission_no:student?.student?.adm_no || '',
            bill_no:student?.student?.bill_no || '',
            class:student?.student?.class || '',
            section:student?.student?.section || '',
            phone:student?.student?.mobile || '',
            email:student?.student?.email || '',
            board:student?.student?.board || '',
            route_name:student?.transport_details?.route || '',
            stop_name:student?.transport_details?.stop || '',
            vehicle_name:student?.transport_details?.vehicle || '',
            wing_name:student?.student?.wing || '',
            is_new:student?.student?.is_new || false,
            is_active:student?.student?.is_active || false,
            student_status:student?.student?.student_status || '',
            affiliated_heads:{
                group_name:student?.affiliated_heads?.group_name || '',
                heads:student?.affiliated_heads?.heads?.map((h:any) => {
                    return {
                        ...h,
                        amounts:h?.amounts?.map((a:any) => {
                            const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                            const last_rec_amount = a.last_rec_amount ? Number(a.last_rec_amount) : 0;
                            return {
                                name:a.name,
                                value:Number(a.value),
                                conc_amount:conc_amount,
                                last_rec_amount:last_rec_amount,
                                payable_amount:Number(a.payable_amount) || (Number(a.value) - (last_rec_amount + conc_amount)),
                                paid_amount:Number(a.paid_amount) || (Number(a.value) - (last_rec_amount + conc_amount))
                            };
                        })
                    };
                }) || []
            }
        });




        // const singleInstallments = student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length === 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name)[0]);
        // const installments = student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length > 1).length > 0
        //     ? student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length > 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name).concat(singleInstallments))[0]
        //     : student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length === 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name)[0]);
        // const filteredInstallments = installments?.filter((item:any, pos:any) => installments.indexOf(item) == pos);
        // const sortedInstallments = allInstallments?.filter((i:any) => filteredInstallments?.includes(i.name)).map((i:any) => i.name);
        // setInstallments(sortedInstallments);
        // setSelectedInstallments([sortedInstallments[0]]);
        // setSearch('');






        const singleInstallments = student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length === 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name)[0]);
        const installments = student?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length > 0).map((h:any) => h?.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).map((a:any) => a.name).concat(singleInstallments)).flat().filter((value:any, index:any, self:any) => self.indexOf(value) === index)
        const sortedInstallments = allInstallments?.filter((i:any) => installments?.includes(i.name)).map((i:any) => i.name);
        setInstallments(sortedInstallments);
        setSelectedInstallments([sortedInstallments[0]]);
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
                const res = await fetchStudentsByAllDataFeeEntry({name:search, father_name:search, adm_no:search, mobile:search, class_name:selectedClass, section_name:selectedSection});
                setSearchStudents(res);
                setIsLoadingSearchedStudents(false);
            };
            searchFetcher();
        }else{
            setSearchStudents([]);
        }
    }, [search]);
    useEffect(() => {
        if(selectedClass !== '' || selectedSection !== ''){
            const fetcher = async () => {
                try {
                    const res = await fetchStudentsCountByClassAndSection({class_name:selectedClass, section:selectedSection});
                    setStudentsCount(res);
                } catch (err) {
                    console.log(err);
                }
            };
            fetcher();
        };
    }, [selectedClass, selectedSection]);
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchInstallments();
            setAllInstallments(res);
        };
        fetcher();
    }, []);

    return (
        <div className='flex flex-col p-2 bg-[#F7F7F7] gap-2 text-xs text-hash-color rounded-[4px] border-[0.5px] border-[#ccc] lg:flex-row lg:items-end'>
            <div className='flex-1 flex flex-row gap-2'>
                {/* Class */}
                <div className='w-full flex flex-col items-center'>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                            <FormControl>
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
                            </FormControl>
                        </FormItem>
                    </div>
                </div>
                {/* Section */}
                <div className='w-full flex flex-col items-center'>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                            <FormControl>
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
                            </FormControl>
                        </FormItem>
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
                        className='group flex flex-row items-center justify-center gap-[2px] px-2 border-[0.5px] border-[#2EABE5] rounded-r-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5]'
                    >
                        <SearchIcon size={15} className='text-[#2EABE5] transition group-hover:text-white'/>
                        <p className='transition text-[#2EABE5] group-hover:text-white'>Search</p>
                    </div>
                    {searchedStudents}
                </div>
            </div>
            {studentsCount && (
                <div className='h-full flex flex-row items-center justify-center'>
                    <p>Total students: </p>
                    <p>{studentsCount || 0}</p>
                </div>
            )}
        </div>
    );
};





// Export
export default Search;