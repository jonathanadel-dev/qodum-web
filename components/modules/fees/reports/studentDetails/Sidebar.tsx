// Improts
import Details from './Details';
import {useState, useEffect, useContext} from 'react';
import {Switch} from '@/components/ui/switch';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {ChevronRight, ChevronLeft, ChevronDown, Check, X,} from 'lucide-react';
import {fetchStreams} from '@/lib/actions/admission/globalMasters/stream.actions';
import {fetchReligions} from '@/lib/actions/admission/globalMasters/religion.actions';
import {fetchCategories} from '@/lib/actions/admission/globalMasters/category.actions';
import {studentDetailsFilter} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchOptionalSubjects} from '@/lib/actions/admission/globalMasters/optionalSubject.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
import { AuthContext } from '@/context/AuthContext';
import { fetchSections } from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import { useToast } from '@/components/ui/use-toast';





// Main function
const Sidebar = ({isOpened, setIsOpened, setIsShowClicked, setIsLoading, setPdfData}) => {

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


    // Is draggable opened
    const [isDraggableOpened, setIsDraggableOpened] = useState(false);


    // Toast
    const {toast} = useToast();


    // Is loading data
    const [isLoadingData, setIsLoadingData] = useState(false);


    // Schools
    const [schools, setSchools] = useState([{}]);
    const [selectedSchool, setSelectedSchool] = useState('All schools');


    // Classes
    const [classes, setClasses] = useState([{}]);
    const [selectedClasses, setSelectedClasses] = useState([{}]);


    // Sections
    const [sections, setSections] = useState([{}]);
    const [selectedSections, setSelectedSections] = useState([{}]);


    // Genders
    const genders = ['Male', 'Female'];
    const [selectedGenders, setSelectedGenders] = useState(['Male', 'Female']);


    // Religions
    const [religions, setReligions] = useState([{}]);
    const [selectedReligions, setSelectedReligions] = useState([{}]);


    // Categories
    const [categories, setCategories] = useState([{}]);
    const [selectedCategories, setSelectedCategories] = useState([{}]);


    // Seniority
    const seniority = ['New', 'Old'];
    const [selectedSeniorities, setSelectedSeniorities] = useState(['New', 'Old']);


    // Activities
    const activities = ['Yes', 'No'];
    const [selectedActivities, setSelectedActivities] = useState(['Yes', 'No']);


    // Statuses
    const statuses = ['N/A', 'Left', 'Repeater', 'Rusticate', 'Studying', 'TC', 'Withdrawn'];
    const [selectedStatuses, setSelectedStatuses] = useState(['N/A', 'Left', 'Repeater', 'Rusticate', 'Studying', 'TC', 'Withdrawn']);


    // Is Ews
    const isEws = ['Yes', 'No'];
    const [selectedIsEws, setSelectedIsEws] = useState(['Yes', 'No']);


    // Transports
    const transports = ['No', 'School', 'Self', 'Public'];
    const [selectedTransports, setSelectedTransports] = useState(['No', 'School', 'Self', 'Public']);


    // Is SIbling
    const isSibling = ['Yes', 'No'];
    const [selectedIsSibling, setSelectedIsSibling] = useState(['Yes', 'No']);


    // Streams
    const [streams, setStreams] = useState([{}]);
    const [selectedStreams, setSelectedStreams] = useState([{}]);


    // Optional subjects
    const [optionalSubjects, setOptionalSubjects] = useState([{}]);
    const [selectedOptionalSubjects, setSelectedOptionalSubjects] = useState([{}]);





    // Checked details
    const [checkedDetails, setCheckedDetails] = useState<any>(localStorage.getItem('selectedDetails') === null ? [] : localStorage.getItem('selectedDetails')?.split('-'));


    // Student details
    const studentDetails = [
        'Class Name',
        'Roll No.',
        'Bill No.',
        'Adm. No.',
        'Student Name',
        'Boarding/Day Scholar',
        'Section',
        'Optional Sub. Name',
        'General Description',
        'Contact Mo.',
        'Student Middle Name',
        'Student Last Name',
        'Student DOB',
        'Student DOA',
        'Student DOJ',
        'Religion',
        'Category',
        'House',
        'Address',
        'Contact No.',
        'Blood Group',
        'Nationality',
        'Gender',
        'Student Email',
        'Contact Person',
        'Contact Email',
        'Bar Code',
        'Prev. School Name',
        'Prev. School DOL',
        'Emrg. Cont. Person',
        'Emrg. Cont. Mobile',
        'Emrg. Cont. Phone',
        'Emrg. Cont. Add.',
        'Emrg. Cont. RTL',
        'Familly Doc. Name',
        'Familly Doc. Phone',
        'Familly Doc. Add.',
        'Student Status',
        'Aadhar Card No.',
        'Student Cont. 2',
        'Pin Code',
        'State',
        'City',
        'Birth Place',
        'Board Reg. No.',
        'Caste',
        'EWS',
        'Mother Tongue',
        'Stream Name',
        'New/Old',
        'Class'
    ];


    // Parent details
    const parentDetails = [
        'Father Full Name',
        'Father Name',
        'Father Middle Name',
        'Father Last Name',
        'Father Designation',
        'Father Phone',
        'Father DOB',
        'Father Address',
        'Father Off. Add.',
        'Father Email 1',
        'Father Email 2',
        'Father Mobile',
        'Father Profession',
        'Father Comp. Name',
        'Father Business Of',
        'Father Professional',
        'Father Others',
        'Father Service In',
        'Father Off. Phone',
        'Father Off. Mo.',
        'Father Off. Extension',
        'Father Off. Email',
        'Father Off. Website',
        'Father Income',
        'Mother Full Name',
        'Mother Name',
        'Mother Middle Name',
        'Mother Last Name',
        'Mother DOB',
        'Mother Address',
        'Mother Off. Add.',
        'Mother Email 1',
        'Mother Email 2',
        'Mother Mobile',
        'Mother Profession',
        'Mother Comp. Name',
        'Mother Business Of',
        'Mother Professional',
        'Mother Others',
        'Mother Service In',
        'Mother Off. Phone',
        'Mother Off. Mo.',
        'Mother Off. Extension',
        'Mother Off. Email',
        'Mother Off. Website',

        'Date Of Anniversary',
        'Parent Status',
        'Mother Income'
    ];


    // Guardian details
    const guardianDetails = [
        'Guar. Name',
        'Guar. Designation',
        'Guar. Phone',
        'Guar. DOB',
        'Guar. Address',
        'Guar. Office Address',
        'Guar. Email 1',
        'Guar. Email 2',
        'Guar. Mobile',
        'Guar. Profession',
        'Guar. Comp. Name',
        'Guar. Professional',
        'Guar. Business Of',
        'Guar. Others',
        'Guar. Service In',
        'Guar. Off. Phone',
        'Guar. Off. Mobile',
        'Guar. Off. Extension',
        'Guar. Off. Email',
        'Guar. Off. Website',
        'Guar. Income',
        'Guar. Other Info'
    ];


    // Filtered student details
    const [filteredStudentDetails, setFilteredStudentDetails] = useState(checkedDetails.filter((d:any) => studentDetails.map((sd:any) => sd).includes(d)));
    const [selectedStudentDetails, setSelectedStudentDetails] = useState(checkedDetails.filter((d:any) => studentDetails.map((sd:any) => sd).includes(d)));


    // Filtered parents details
    const [filteredParentsDetails, setFilteredParentsDetails] = useState(checkedDetails.filter((d:any) => parentDetails.map((sd:any) => sd).includes(d)));
    const [selectedParentsDetails, setSelectedParentsDetails] = useState(checkedDetails.filter((d:any) => parentDetails.map((sd:any) => sd).includes(d)));


    // Filtered guardian details
    const [filteredGuardianDetails, setFilteredGuardianDetails] = useState(checkedDetails.filter((d:any) => guardianDetails.map((sd:any) => sd).includes(d)));
    const [selectedGuardianDetails, setSelectedGuardianDetails] = useState(checkedDetails.filter((d:any) => guardianDetails.map((sd:any) => sd).includes(d)));


    // Selected order by
    const [selectedOrderBy, setSelectedOrderBy] = useState([]);


    // Onsubmit
    const onSubmit = async () => {

        setIsLoading(true);
        // Student details filter
        const res = await studentDetailsFilter({
            school:selectedSchool,
            classes:selectedClasses.map((c:any) => c.class_name),
            sections:selectedSections.map((c:any) => c.section_name),
            genders:selectedGenders,
            religions:selectedReligions.map((r:any) => r.religion_name),
            categories:selectedCategories.map((c:any) => c.category_name),
            seniorities:selectedSeniorities,
            activities:selectedActivities,
            statuses:selectedStatuses,
            is_ews:selectedIsEws,
            transports:selectedTransports,
            is_sibling:selectedIsSibling,
            streams:selectedStreams.map((s:any) => s.stream_name),
            optional_subjects:selectedOptionalSubjects.map((s:any) => s.subject_name)
        });
        setPdfData({
            students:res,
            fields:[...selectedStudentDetails, ...selectedParentsDetails, ...selectedGuardianDetails]
        });
        setIsLoading(false);
        setIsShowClicked(true);
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            setIsLoadingData(true);
            const schoolsRes = await fetchGlobalSchoolDetails();
            const classesRes = await fetchClasses();
            const sectionsRes = await fetchSections();
            const religionsRes = await fetchReligions();
            const categoriesRes = await fetchCategories();
            const streamsRes = await fetchStreams();
            const optionalSubjectsRes = await fetchOptionalSubjects();
            setSchools(schoolsRes);
            setClasses(classesRes);
            setSelectedClasses(classesRes);
            setSections(sectionsRes);
            setSelectedSections(sectionsRes);
            setReligions(religionsRes);
            setSelectedReligions(religionsRes);
            setCategories(categoriesRes);
            setSelectedCategories(categoriesRes);
            setStreams(streamsRes);
            setSelectedStreams(streamsRes);
            setOptionalSubjects(optionalSubjectsRes);
            setSelectedOptionalSubjects(optionalSubjectsRes);
            setCheckedDetails(localStorage.getItem('selectedDetails') === null ? [] : localStorage.getItem('selectedDetails')?.split('-'));
            setIsLoadingData(false);
        };
        fetcher();
    }, []);
    useEffect(() => {
        setFilteredStudentDetails(checkedDetails.filter((d:any) => studentDetails.map((sd:any) => sd).includes(d)));
        setFilteredParentsDetails(checkedDetails.filter((d:any) => parentDetails.map((sd:any) => sd).includes(d)));
        setFilteredGuardianDetails(checkedDetails.filter((d:any) => guardianDetails.map((sd:any) => sd).includes(d)));


        // Setting selected fields
        setSelectedStudentDetails(checkedDetails.filter((d:any) => studentDetails.map((sd:any) => sd).includes(d)).slice(0, 10));
        setSelectedParentsDetails(
            checkedDetails.filter((d:any) => parentDetails.map((sd:any) => sd).includes(d))
            .slice(0, 10 - checkedDetails.filter((d:any) => studentDetails.map((sd:any) => sd).includes(d)).slice(0, 10).length)
        );
        setSelectedGuardianDetails(
            checkedDetails.filter((d:any) => guardianDetails.map((sd:any) => sd).includes(d))
            .slice(
                0,
                10
                -
                (
                    checkedDetails.filter((d:any) => studentDetails.map((sd:any) => sd).includes(d)).slice(0, 10).length
                    +
                    checkedDetails.filter((d:any) => parentDetails.map((sd:any) => sd).includes(d))
                    .slice(0, 10 - checkedDetails.filter((d:any) => studentDetails.map((sd:any) => sd).includes(d)).slice(0, 10).length).length
                )
            )
        );

    }, [isDraggableOpened]);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Fees')?.permissions?.find((pp:any) => pp.sub_menu === 'Student Details');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className={`absolute top-0 left-0 h-full pb-10 w-[250px] bg-[#fff] border-r-[0.5px] border-r-[#ccc] transition-transform transform ${isOpened ? 'translate-x-0' : '-translate-x-full'}`}>


            {/* Details */}
            {isDraggableOpened && (
                <Details
                    setIsDraggableOpened={setIsDraggableOpened}
                    checkedDetails={checkedDetails}
                    setCheckedDetails={setCheckedDetails}
                />
            )}

            {/* Toggling button */}
            <span
                onClick={() => setIsOpened(!isOpened)}
                className='absolute top-4 right-[-40px] p-2 rounded-[2px] bg-gray-500 text-white cursor-pointer'
            >
                {isOpened ? (
                    <ChevronLeft />
                ) : (
                    <ChevronRight />
                )}
            </span>

            {/* Content */}
            <div className='h-full flex flex-col py-4 pl-2 pr-4 gap-3 overflow-y-scroll custom-sidebar-scrollbar'>


                {/* Filters */}
                <div className='w-full flex flex-col gap-1'>
                    {/* Header */}
                    <p className='w-full border-b-[0.5px] border-[#ccc] pb-[2px] mb-2 text-md font-bold text-hash-color text-center'>FILTERS</p>
                    {/* School */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                        <p className='basis-[30%] h-full flex justify-end items-center text-[#726E71] text-xs'>School</p>
                        <div className='basis-[70%] flex flex-col items-start gap-4 sm:basis-[70%]'>
                            <Select
                                value={selectedSchool}
                                onValueChange={(v:any) => setSelectedSchool(v)}
                            >
                                <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                    <SelectValue placeholder='Select School'/>
                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='All schools'>All schools</SelectItem>
                                    {schools.length < 1 ? (
                                        <p className='text-xs text-hash-color'>No schools</p>
                                    ) : // @ts-ignore
                                    !schools[0].school_name ? (
                                        <LoadingIcon />
                                    ) : schools.map((f:any) => (
                                        <SelectItem value={f.school_name} key={f._id}>{f.school_name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Class */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Class</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedClasses?.length === 0 ? 'Select Class(es)' : selectedClasses?.length === 1 ? '1 class selected' : `${selectedClasses?.length} classes selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedClasses(classes)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedClasses([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {classes.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No classes</p>
                                        ) : // @ts-ignore
                                        !classes[0].class_name ? (
                                            <LoadingIcon />
                                        ) : classes.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedClasses?.map((item:any) => item.class_name).includes(i.class_name)}
                                                    // @ts-ignore
                                                    onClick={() => selectedClasses?.includes(i) ? setSelectedClasses(selectedClasses?.filter((item:any) => item !== i)) : setSelectedClasses([...selectedClasses, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i.class_name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Section */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Section</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedSections?.length === 0 ? 'Select section(s)' : selectedSections?.length === 1 ? '1 section selected' : `${selectedSections?.length} sections selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedSections(sections)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedSections([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {sections.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No sections</p>
                                        ) : // @ts-ignore
                                        !sections[0].section_name ? (
                                            <LoadingIcon />
                                        ) : sections.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedSections?.map((item:any) => item.section_name).includes(i.section_name)}
                                                    // @ts-ignore
                                                    onClick={() => selectedSections?.includes(i) ? setSelectedSections(selectedSections?.filter((item:any) => item !== i)) : setSelectedSections([...selectedSections, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i.section_name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Gender */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Gender</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedGenders?.length === 0 ? 'Select Gender(s)' : selectedGenders?.length === 1 ? '1 gender selected' : `${selectedGenders?.length} genders selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedGenders(genders)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedGenders([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {genders.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedGenders.includes(i)}
                                                    // @ts-ignore
                                                    onClick={() => selectedGenders?.includes(i) ? setSelectedGenders(selectedGenders?.filter((item:any) => item !== i)) : setSelectedGenders([...selectedGenders, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Religion */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Religion</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedReligions?.length === 0 ? 'Select Religion(s)' : selectedReligions?.length === 1 ? '1 religion selected' : `${selectedReligions?.length} religions selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedReligions(religions)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedReligions([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {religions.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No religions</p>
                                        ) : // @ts-ignore
                                        !religions[0].religion_name ? (
                                            <LoadingIcon />
                                        ) : religions.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedReligions?.map((item:any) => item.religion_name).includes(i.religion_name)}
                                                    // @ts-ignore
                                                    onClick={() => selectedReligions?.includes(i) ? setSelectedReligions(selectedReligions?.filter((item:any) => item !== i)) : setSelectedReligions([...selectedReligions, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i.religion_name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Category */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Category</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedCategories?.length === 0 ? 'Select Category' : selectedCategories?.length === 1 ? '1 category selected' : `${selectedCategories?.length} categories selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedCategories(categories)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedCategories([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {categories.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No categories</p>
                                        ) : // @ts-ignore
                                        !categories[0].category_name ? (
                                            <LoadingIcon />
                                        ) : categories.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedCategories?.map((item:any) => item.category_name).includes(i.category_name)}
                                                    // @ts-ignore
                                                    onClick={() => selectedCategories?.includes(i) ? setSelectedCategories(selectedCategories?.filter((item:any) => item !== i)) : setSelectedCategories([...selectedCategories, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i.category_name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Is New */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Is New</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedSeniorities?.length === 0 ? 'Select' : selectedSeniorities?.length === 1 ? '1 field selected' : `${selectedSeniorities?.length} fields selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedSeniorities(seniority)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedSeniorities([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {seniority.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedSeniorities.includes(i)}
                                                    // @ts-ignore
                                                    onClick={() => selectedSeniorities?.includes(i) ? setSelectedSeniorities(selectedSeniorities?.filter((item:any) => item !== i)) : setSelectedSeniorities([...selectedSeniorities, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Is Active */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Is Active</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedActivities?.length === 0 ? 'Select' : selectedActivities?.length === 1 ? '1 field selected' : `${selectedActivities?.length} fields selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedActivities(activities)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedActivities([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {activities.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedActivities.includes(i)}
                                                    // @ts-ignore
                                                    onClick={() => selectedActivities?.includes(i) ? setSelectedActivities(selectedActivities?.filter((item:any) => item !== i)) : setSelectedActivities([...selectedActivities, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Status */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Status</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedStatuses?.length === 0 ? 'Select' : selectedStatuses?.length === 1 ? '1 status selected' : `${selectedStatuses?.length} statuses selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedStatuses(statuses)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedStatuses([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {statuses.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedStatuses.includes(i)}
                                                    // @ts-ignore
                                                    onClick={() => selectedStatuses?.includes(i) ? setSelectedStatuses(selectedStatuses?.filter((item:any) => item !== i)) : setSelectedStatuses([...selectedStatuses, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Is EWS */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Is EWS</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedIsEws?.length === 0 ? 'Select' : selectedIsEws?.length === 1 ? '1 field selected' : `${selectedIsEws?.length} fields selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedIsEws(isEws)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedIsEws([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {isEws.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedIsEws.includes(i)}
                                                    // @ts-ignore
                                                    onClick={() => selectedIsEws?.includes(i) ? setSelectedIsEws(selectedIsEws?.filter((item:any) => item !== i)) : setSelectedIsEws([...selectedIsEws, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Transport */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Transport</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedTransports?.length === 0 ? 'Select' : selectedTransports?.length === 1 ? '1 field selected' : `${selectedTransports?.length} fields selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedTransports(transports)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedTransports([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {transports.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedTransports.includes(i)}
                                                    // @ts-ignore
                                                    onClick={() => selectedTransports?.includes(i) ? setSelectedTransports(selectedTransports?.filter((item:any) => item !== i)) : setSelectedTransports([...selectedTransports, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Is Sibling */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Is Sibling</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedIsSibling?.length === 0 ? 'Select' : selectedIsSibling?.length === 1 ? '1 field selected' : `${selectedIsSibling?.length} fields selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedIsSibling(isSibling)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedIsSibling([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {isSibling.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedIsSibling.includes(i)}
                                                    // @ts-ignore
                                                    onClick={() => selectedIsSibling?.includes(i) ? setSelectedIsSibling(selectedIsSibling?.filter((item:any) => item !== i)) : setSelectedIsSibling([...selectedIsSibling, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Stream */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Stream</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedStreams?.length === 0 ? 'Select Stream(s)' : selectedStreams?.length === 1 ? '1 stream selected' : `${selectedStreams?.length} streams selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedStreams(streams)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedStreams([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {streams.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No streams</p>
                                        ) : // @ts-ignore
                                        !streams[0].stream_name ? (
                                            <LoadingIcon />
                                        ) : streams.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedStreams?.map((item:any) => item.stream_name).includes(i.stream_name)}
                                                    // @ts-ignore
                                                    onClick={() => selectedStreams?.includes(i) ? setSelectedStreams(selectedStreams?.filter((item:any) => item !== i)) : setSelectedStreams([...selectedStreams, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i.stream_name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Optional Subject */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Optional Subject</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedOptionalSubjects?.length === 0 ? 'Select Subject(s)' : selectedOptionalSubjects?.length === 1 ? '1 subject selected' : `${selectedOptionalSubjects?.length} subjects selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedOptionalSubjects(optionalSubjects)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedOptionalSubjects([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {optionalSubjects.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No optional subjects</p>
                                        ) : // @ts-ignore
                                        !optionalSubjects[0].subject_name ? (
                                            <LoadingIcon />
                                        ) : optionalSubjects.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedOptionalSubjects?.map((item:any) => item.subject_name).includes(i.subject_name)}
                                                    // @ts-ignore
                                                    onClick={() => selectedOptionalSubjects?.includes(i) ? setSelectedOptionalSubjects(selectedOptionalSubjects?.filter((item:any) => item !== i)) : setSelectedOptionalSubjects([...selectedOptionalSubjects, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i.subject_name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                </div>


                {/* Details */}
                <div className='w-full flex flex-col gap-1'>

                    {/* Header */}
                    <p className='w-full border-b-[0.5px] border-[#ccc] pb-[2px] mb-2 text-md font-bold text-hash-color text-center'>Details</p>


                    {/* Student */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Student</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedStudentDetails?.length === 0 ? 'Select Fields' : selectedStudentDetails?.length === 1 ? '1 field selected' : `${selectedStudentDetails?.length} fields selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => {
                                                if(filteredStudentDetails.length + selectedParentsDetails.length + selectedGuardianDetails.length > 10){
                                                    toast({title:'Please select a maximum of 10 fields', variant:'alert'});
                                                }else{
                                                    setSelectedStudentDetails(filteredStudentDetails);
                                                };
                                            }}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedStudentDetails([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {filteredStudentDetails.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedStudentDetails.includes(i)}
                                                    // @ts-ignore
                                                    onClick={() => {
                                                        if(selectedStudentDetails?.includes(i)){
                                                            setSelectedStudentDetails(selectedStudentDetails?.filter((item:any) => item !== i))
                                                        }else{
                                                            if(selectedStudentDetails.length + selectedParentsDetails.length + selectedGuardianDetails.length === 10){
                                                                toast({title:'Please select a maximum of 10 fields', variant:'alert'});
                                                            }else{
                                                                setSelectedStudentDetails([...selectedStudentDetails, i])
                                                            };
                                                        };
                                                    }}
                                                />
                                                <p className='text-xs font-semibold'>{i}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Parent */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Parent</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedParentsDetails?.length === 0 ? 'Select Fields' : selectedParentsDetails?.length === 1 ? '1 field selected' : `${selectedParentsDetails?.length} fields selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => {
                                                if(filteredParentsDetails.length + selectedStudentDetails.length + selectedGuardianDetails.length > 10){
                                                    toast({title:'Please select a maximum of 10 fields', variant:'alert'});
                                                }else{
                                                    setSelectedParentsDetails(filteredParentsDetails);
                                                };
                                            }}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedParentsDetails([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {filteredParentsDetails.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedParentsDetails.includes(i)}
                                                    // @ts-ignore
                                                    onClick={() => {
                                                        if(selectedParentsDetails?.includes(i)){
                                                            setSelectedParentsDetails(selectedParentsDetails?.filter((item:any) => item !== i));
                                                        }else{
                                                            if(selectedStudentDetails.length + selectedParentsDetails.length + selectedGuardianDetails.length === 10){
                                                                toast({title:'Please select a maximum of 10 fields', variant:'alert'});
                                                            }else{
                                                                setSelectedParentsDetails([...selectedParentsDetails, i]);
                                                            };
                                                        };
                                                    }}
                                                />
                                                <p className='text-xs font-semibold'>{i}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Guardian */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Guardian</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedGuardianDetails?.length === 0 ? 'Select Fields' : selectedGuardianDetails?.length === 1 ? '1 field selected' : `${selectedGuardianDetails?.length} fields selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => {
                                                if(filteredGuardianDetails.length + selectedStudentDetails.length + selectedParentsDetails.length > 10){
                                                    toast({title:'Please select a maximum of 10 fields', variant:'alert'});
                                                }else{
                                                    setSelectedGuardianDetails(filteredGuardianDetails)
                                                };
                                            }}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedGuardianDetails([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {filteredGuardianDetails.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedGuardianDetails.includes(i)}
                                                    // @ts-ignore
                                                    onClick={() => {
                                                        if(selectedGuardianDetails?.includes(i)){
                                                            setSelectedGuardianDetails(selectedGuardianDetails?.filter((item:any) => item !== i));
                                                        }else{
                                                            if(selectedStudentDetails.length + selectedParentsDetails.length + selectedGuardianDetails.length === 10){
                                                                toast({title:'Please select a maximum of 10 fields', variant:'alert'});
                                                            }else{
                                                                setSelectedGuardianDetails([...selectedGuardianDetails, i]);
                                                            };
                                                        };
                                                    }}
                                                />
                                                <p className='text-xs font-semibold'>{i}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Order By */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Order By</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedOrderBy?.length === 0 ? 'Select Fields' : selectedOrderBy?.length === 1 ? '1 field selected' : `${selectedOrderBy?.length} fields selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedOrderBy(filteredStudentDetails)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedOrderBy([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {filteredStudentDetails.map((i:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedOrderBy.includes(i)}
                                                    // @ts-ignore
                                                    onClick={() => selectedOrderBy?.includes(i) ? setSelectedOrderBy(selectedOrderBy?.filter((item:any) => item !== i)) : setSelectedOrderBy([...selectedOrderBy, i])}
                                                />
                                                <p className='text-xs font-semibold'>{i}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Group by class */}
                    <div className='w-full flex flex-row items-center justify-start gap-2 mt-2'>
                        <Switch/>
                        <p className='text-xs text-hash-color'>Group by class</p>
                    </div>

                </div>


                {/* Buttons */}
                {isLoadingData ? (
                    <LoadingIcon />
                ) : (
                    <div className='flex flex-col gap-2 mt-2'>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            <span
                                onClick={() => setIsDraggableOpened(true)}
                                className='flex items-center justify-center px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            >
                                Setting
                            </span>
                            {permissions.read_only && (
                                <span
                                    onClick={onSubmit}
                                    className='flex items-center justify-center px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                >
                                    Show
                                </span>
                            )}
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};





// Export
export default Sidebar;