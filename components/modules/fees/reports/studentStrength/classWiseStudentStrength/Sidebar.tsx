// Improts
import {format} from 'date-fns';
import {useState, useEffect, useContext} from 'react';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {ChevronRight, ChevronLeft, ChevronDown, CalendarIcon} from 'lucide-react';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {classWiseStudentStrengthFilter} from '@/lib/actions/admission/admission/admittedStudent.actions';
import { AuthContext } from '@/context/AuthContext';





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


    // Is date wise
    const [isDateWise, setIsDateWise] = useState(false);


    // Is loading data
    const [isLoadingData, setIsLoadingData] = useState(false);


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


    // Date
    const [date, setDate] = useState(new Date());


    // Preview wise
    const [previewWise, setPreviewWise] = useState('Row Wise');


    // Classes
    const [classes, setClasses] = useState([{}]);
    const [selectedClass, setSelectedClass] = useState('All classes');


    // Is section wise
    const [isSectionWise, setIsSectionWise] = useState(false);


    // Is new students
    const [isNewStudents, setIsNewStudents] = useState(false);


    // Sections
    const [sections, setSections] = useState([{}]);
    const [selectedSection, setSelectedSection] = useState('All sections');


    // Onsubmit
    const onSubmit = async () => {
        setIsLoading(true);
        // Class wise students strength filter
        const res = await classWiseStudentStrengthFilter({
            date_of_adm:date,
            class_name:selectedClass,
            is_new_students:isNewStudents,
            section:selectedSection
        });
        setPdfData({
            students:res,
            previewWise,
            isSectionWise,
            sections,
            selectedSection
        });
        setIsLoading(false);
        setIsShowClicked(true);
    };


    // Show students click
    const showStudentsClick = async () => {
        setIsShowClicked(true);
        setIsLoading(true);
        // Class wise students strength filter
        const res = await classWiseStudentStrengthFilter({
            date_of_adm:date,
            class_name:selectedClass,
            is_new_students:isNewStudents,
            section:selectedSection
        });
        setPdfData({
            students:res,
            previewWise:'showStudents',
            isSectionWise,
            sections,
            selectedSection
        });
        setIsLoading(false);
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            setIsLoadingData(true);
            const classesRes = await fetchClasses();
            const sectionsRes = await fetchSections();
            setClasses(classesRes);
            setSections(sectionsRes.map((s:any) => s.section_name));
            setIsLoadingData(false);
        };
        fetcher();
    }, []);
    useEffect(() => {
        if(selectedClass !== ''){
            // @ts-ignore
            const classSections = classes.filter((c:any) => c.class_name === selectedClass)[0]?.sections;
            setSections(classSections);
        };
    }, [selectedClass]);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Fees')?.permissions?.find((pp:any) => pp.sub_menu === 'Class Wise Student Strength');
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


                {/* Date wise */}
                <div className='flex flex-row items-center gap-2'>
                    <Switch
                        checked={isDateWise}
                        onClick={() => {setIsDateWise(!isDateWise); setDate(new Date())}}
                    />
                    <p className='text-xs text-hash-color'>Date Wise</p>
                </div>


                {/* Date of Adm. */}
                {isDateWise && (
                    <div className='flex flex-col'>
                        <p className='text-xs text-hash-color'>Date of Adm.</p>
                        <Popover open={isCalendarOpened === 'date_to'} onOpenChange={() => isCalendarOpened === 'date_to' ? setIsCalendarOpened('') : setIsCalendarOpened('date_to')}>
                            <PopoverTrigger asChild className='h-7'>
                                <Button
                                    variant='outline'
                                    className='flex flex-row items-center text-[11px] bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                >
                                    <CalendarIcon className='mr-2 h-4 w-4' />
                                    {
                                        date
                                                ? <span>{format(date, 'P')}</span>
                                                : <span>Pick a date</span>
                                    }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto bg-[#fff]'>
                                <Calendar
                                    mode='single'
                                    selected={date}
                                    onSelect={(v:any) => {setIsCalendarOpened(''); setDate(v)}}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )}


                {/* Preview Wise */}
                <RadioGroup
                    defaultValue={previewWise}
                    className='flex flex-row items-center gap-2'
                >
                    <div className='flex items-center space-x-[2px]'>
                        <RadioGroupItem
                            value='Row Wise'
                            id='Row Wise'
                            onClick={() => {setPreviewWise('Row Wise');setIsSectionWise(false)}}
                            checked={previewWise === 'Row Wise'}
                        />
                        <Label
                            htmlFor='Row Wise'
                            className='text-xs text-hash-color'
                        >
                            Row Wise
                        </Label>
                    </div>
                    <div className='flex items-center space-x-[2px]'>
                        <RadioGroupItem
                            value='Column Wise'
                            id='Column Wise'
                            onClick={() => setPreviewWise('Column Wise')}
                            checked={previewWise === 'Column Wise'}
                        />
                        <Label
                            htmlFor='Column Wise'
                            className='text-xs text-hash-color'
                        >
                            Column Wise
                        </Label>
                    </div>
                </RadioGroup>


                {/* Class */}
                <div className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                    <p className='basis-[30%] h-full flex justify-end items-center text-[#726E71] text-xs'>Class</p>
                    <div className='basis-[70%] flex flex-col items-start gap-4 sm:basis-[70%]'>
                        <Select
                            value={selectedClass}
                            onValueChange={(v:any) => setSelectedClass(v)}
                        >
                            <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                <SelectValue placeholder='Select School'/>
                                <ChevronDown className='h-4 w-4 opacity-50'/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='All classes'>All classes</SelectItem>
                                {classes.length < 1 ? (
                                    <p className='text-xs text-hash-color'>No classes</p>
                                ) : // @ts-ignore
                                !classes[0].class_name ? (
                                    <LoadingIcon />
                                ) : classes.map((i:any) => (
                                    <SelectItem value={i.class_name} key={i._id}>{i.class_name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {/* Section wise */}
                <div className='flex flex-row items-center gap-2'>
                    <Switch
                        disabled={previewWise === 'Row Wise'}
                        checked={isSectionWise}
                        onClick={() => setIsSectionWise(!isSectionWise)}
                    />
                    <p className='text-xs text-hash-color'>Section Wise</p>
                </div>


                {/* New Students */}
                <div className='flex flex-row items-center gap-2'>
                    <Switch
                        checked={isNewStudents}
                        onClick={() => setIsNewStudents(!isNewStudents)}
                    />
                    <p className='text-xs text-hash-color'>New Students</p>
                </div>


                {/* Section */}
                {isSectionWise && (
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                        <p className='basis-[30%] h-full flex justify-end items-center text-[#726E71] text-xs'>Section</p>
                        <div className='basis-[70%] flex flex-col items-start gap-4 sm:basis-[70%]'>
                            <Select
                                value={selectedSection}
                                onValueChange={(v:any) => setSelectedSection(v)}
                            >
                                <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                    <SelectValue placeholder='Select School'/>
                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='All sections'>All sections</SelectItem>
                                    {sections.length < 1 ? (
                                        <p className='text-xs text-hash-color'>No sections</p>
                                    ) : // @ts-ignore
                                    !sections[0] ? (
                                        <LoadingIcon />
                                    ) : sections.map((i:any) => (
                                        <SelectItem value={i} key={i}>{i}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}


                {/* Buttons */}
                {permissions.add && isLoadingData ? (
                    <LoadingIcon />
                ) : (
                    <div className='flex items-center justify-center gap-2 mt-2'>
                        <span
                            onClick={onSubmit}
                            className='flex items-center justify-center px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        >
                            Show
                        </span>
                        <span
                            onClick={showStudentsClick}
                            className='flex items-center justify-center px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        >
                            Show Students
                        </span>
                    </div>
                )}


            </div>
        </div>
    );
};





// Export
export default Sidebar;