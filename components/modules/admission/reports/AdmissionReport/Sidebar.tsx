// Improts
import moment from 'moment';
import {AuthContext} from '@/context/AuthContext';
import {useState, useEffect, useContext} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import {ChevronRight, ChevronLeft, ChevronDown} from 'lucide-react';
import {fetchStreams} from '@/lib/actions/admission/globalMasters/stream.actions';
import {fetchSubjects} from '@/lib/actions/admission/globalMasters/subject.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {AdmissionReportFilter} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';





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


    // Is loading data
    const [isLoadingData, setIsLoadingData] = useState(false);


    // Sessions
    const [sessions, setSesssions] = useState<any>([{}]);
    const [selectedSession, setSelectedSession] = useState('');
    const [sessionError, setSessionError] = useState(false);


    // Schools
    const [schools, setSchools] = useState<any>([{}]);
    const [selectedSchool, setSelectedSchool] = useState('All Schools');


    // Classes
    const [classes, setClasses] = useState<any>([{}]);
    const [selectedClass, setSelectedClass] = useState('All Classes');


    // Streams
    const [streams, setStreams] = useState<any>([{}]);
    const [selectedStream, setSelectedStream] = useState('All Streams');


    // Subjects
    const [subjects, setSubjects] = useState<any>([{}]);
    const [selectedSubject, setSelectedSubject] = useState('All Subjects');


    // Date from
    const [dateFrom, setDateFrom] = useState<any>(moment());


    // Date to
    const [dateTo, setDateTo] = useState<any>(moment());


    // Onsubmit
    const onSubmit = async () => {

        // Session validation
        if(selectedSession === ''){
            setSessionError(true);
            return;
        };

        setIsLoading(true);
        // Student details filter
        const res = await AdmissionReportFilter({
            session:selectedSession,
            school:selectedSchool,
            class_name:selectedClass,
            stream:selectedStream,
            subject:selectedSubject,
            date_from:new Date(dateFrom._d),
            date_to:new Date(dateTo._d)
        });
        setPdfData({
            students:res
        });
        setIsLoading(false);
        setIsShowClicked(true);
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            setIsLoadingData(true);
            const sessionsRes = await fetchAcademicYears();
            const schoolsRes = await fetchGlobalSchoolDetails();
            const classesRes = await fetchClasses();
            const streamsRes = await fetchStreams();
            const subjectsRes = await fetchSubjects();
            setSesssions(sessionsRes);
            setSchools(schoolsRes)
            setClasses(classesRes);
            setStreams(streamsRes);
            setSubjects(subjectsRes);
            setIsLoadingData(false);
            setSelectedSession(sessionsRes?.find((s:any) => s?.is_active)?.year_name);
        };
        fetcher();
    }, []);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Admission')?.permissions?.find((pp:any) => pp.sub_menu === 'Admission Report');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className={`absolute top-0 left-0 h-full pb-10 w-[250px] bg-[#fff] border-r-[0.5px] border-r-[#ccc] transition-transform transform ${isOpened ? 'translate-x-0' : '-translate-x-full'}`}>

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

                    {/* Session */}
                    <div className='w-full flex flex-row items-center gap-2'>
                        <p className='basis-[30%] text-xs text-hash-color'>Session</p>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                            <div className='flex-1 flex flex-col items-start justify-center mt-2'>
                                <Select
                                    value={selectedSession}
                                    onValueChange={(v:any) => {setSelectedSession(v);setSessionError(false)}}
                                >
                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sessions?.length < 1 ? (
                                            <p>No sessions</p>
                                            // @ts-ignore
                                        ) : !sessions[0]?.year_name ? (
                                            <LoadingIcon />
                                        ) : sessions?.map((item:any) => (
                                            <SelectItem value={item?.year_name} key={item?._id}>{item?.year_name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {sessionError && (<p className='text-red-500 text-xs'>Please select a session</p>)}
                            </div>
                        </div>
                    </div>


                    {/* School */}
                    <div className='w-full flex flex-row items-center gap-2'>
                        <p className='basis-[30%] text-xs text-hash-color'>School</p>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                            <div className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                <Select
                                    value={selectedSchool}
                                    onValueChange={(v:any) => setSelectedSchool(v)}
                                >
                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='All Schools'>All Schools</SelectItem>
                                        {schools?.length < 1 ? (
                                            <p>No schools</p>
                                            // @ts-ignore
                                        ) : !schools[0]?.school_name ? (
                                            <LoadingIcon />
                                        ) : schools?.map((item:any) => (
                                            <SelectItem value={item?.school_name} key={item?._id}>{item?.school_name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>


                    {/* Class */}
                    <div className='w-full flex flex-row items-center gap-2'>
                        <p className='basis-[30%] text-xs text-hash-color'>Class</p>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                            <div className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                <Select
                                    value={selectedClass}
                                    onValueChange={(v:any) => setSelectedClass(v)}
                                >
                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='All Classes'>All Classes</SelectItem>
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
                    </div>


                    {/* Stream */}
                    <div className='w-full flex flex-row items-center gap-2'>
                        <p className='basis-[30%] text-xs text-hash-color'>Stream</p>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                            <div className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                <Select
                                    value={selectedStream}
                                    onValueChange={(v:any) => setSelectedStream(v)}
                                >
                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='All Streams'>All Streams</SelectItem>
                                        {streams?.length < 1 ? (
                                            <p>No streams</p>
                                            // @ts-ignore
                                        ) : !streams[0]?.stream_name ? (
                                            <LoadingIcon />
                                        ) : streams?.map((item:any) => (
                                            <SelectItem value={item?.stream_name} key={item?._id}>{item?.stream_name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>


                    {/* Subject */}
                    <div className='w-full flex flex-row items-center gap-2'>
                        <p className='basis-[30%] text-xs text-hash-color'>Subject</p>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                            <div className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                <Select
                                    value={selectedSubject}
                                    onValueChange={(v:any) => setSelectedSubject(v)}
                                >
                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='All Subjects'>All Subjects</SelectItem>
                                        {subjects?.length < 1 ? (
                                            <p>No subjects</p>
                                            // @ts-ignore
                                        ) : !subjects[0]?.subject_name ? (
                                            <LoadingIcon />
                                        ) : subjects?.map((item:any) => (
                                            <SelectItem value={item?.subject_name} key={item?._id}>{item?.subject_name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>


                    {/* Date From */}
                    <div className='relative w-full h-7 pb-[8px] flex flex-row items-center justify-center mt-2'>
                        <p className='basis-[35%] pr-[4px] text-start text-[11px] text-[#726E71]'>Date From</p>
                        <div className='w-full'>
                            <MyDatePicker
                                selectedDate={dateFrom}
                                setSelectedDate={setDateFrom}
                            />
                        </div>
                    </div>


                    {/* Date To */}
                    <div className='relative w-full h-7 pb-[8px] flex flex-row items-center justify-center mt-2'>
                        <p className='basis-[35%] pr-[4px] text-start text-[11px] text-[#726E71]'>Date To</p>
                        <div className='w-full'>
                            <MyDatePicker
                                selectedDate={dateTo}
                                setSelectedDate={setDateTo}
                            />
                        </div>
                    </div>

                </div>


                {/* Buttons */}
                {isLoadingData ? (
                    <LoadingIcon />
                ) : (
                    <div className='flex flex-col gap-2 mt-2'>
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
                )}


            </div>
        </div>
    );
};





// Export
export default Sidebar;