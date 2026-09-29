// Improts
import {AuthContext} from '@/context/AuthContext';
import {useState, useEffect, useContext} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {ChevronRight, ChevronLeft, ChevronDown, Check, X,} from 'lucide-react';
import { fetchAcademicYearsNames } from '@/lib/actions/accounts/masterSettings/changeAcademic.actions';
import { fetchAcademicYears } from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import { fetchClasses } from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import { fetchUsers } from '@/lib/actions/users/manageUsers/user.actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import moment from 'moment';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import { registrationReportFilter } from '@/lib/actions/admission/admission/admittedStudent.actions';





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


    // Classes
    const [classes, setClasses] = useState<any>([{}]);
    const [selectedClass, setSelectedClass] = useState('All Classes');


    // Users
    const [users, setUsers] = useState<any>([{}]);
    const [selectedUser, setSelectedUser] = useState('All Users');


    // Selected Mode
    const [selectedMode, setSelectedMode] = useState('Both');


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
        const res = await registrationReportFilter({
            session:selectedSession,
            date_from:new Date(dateFrom._d),
            date_to:new Date(dateTo._d),
            class_name:selectedClass,
            user:selectedUser,
            mode:selectedMode
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
            const classesRes = await fetchClasses();
            const usersRes = await fetchUsers();
            setSesssions(sessionsRes);
            setClasses(classesRes);
            setUsers(usersRes);
            setIsLoadingData(false);
            setSelectedSession(sessionsRes?.find((s:any) => s?.is_active)?.year_name);
        };
        fetcher();
    }, []);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Admission')?.permissions?.find((pp:any) => pp.sub_menu === 'Registration Report');
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


                    {/* User */}
                    <div className='w-full flex flex-row items-center gap-2'>
                        <p className='basis-[30%] text-xs text-hash-color'>User</p>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                            <div className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                <Select
                                    value={selectedUser}
                                    onValueChange={(v:any) => setSelectedUser(v)}
                                >
                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='All Users'>All Users</SelectItem>
                                        {users?.length < 1 ? (
                                            <p>No users</p>
                                            // @ts-ignore
                                        ) : !users[0]?.name ? (
                                            <LoadingIcon />
                                        ) : users?.map((item:any) => (
                                            <SelectItem value={item?.name} key={item?._id}>{item?.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>


                    {/* Mode */}
                    <div className='w-full flex flex-row items-center gap-2'>
                        <p className='basis-[30%] text-xs text-hash-color'>Mode</p>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                            <div className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                <Select
                                    value={selectedMode}
                                    onValueChange={(v:any) => setSelectedMode(v)}
                                >
                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='Both'>Both</SelectItem>
                                        <SelectItem value='Online'>Online</SelectItem>
                                        <SelectItem value='Offline'>Offline</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
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