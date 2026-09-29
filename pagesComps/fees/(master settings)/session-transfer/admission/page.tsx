'use client';
// Imports
import {useEffect, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {ChevronDown, ChevronsUpDown} from 'lucide-react';
import StudentTransfer from './draggables/StudentTransfer';
import ClassSectionRelation from './draggables/ClassSectionRelation';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {isStudentsSesssionTransfered} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import {isSectionsSesssionTransfered} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import {fetchFinancialYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineFinancialYear.actions';





// Main function
const page = () => {

    // Toast
    const {toast} = useToast();


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Sessions
    const [sessions, setSessions] = useState([{}]);
    const [financialYears, setFinancialYears] = useState([{}]);


    // Values
    const [currentSession, setCurrentSession] = useState('');
    const [nextSession, setNextSession] = useState('');
    const [currentFinancialYear, setCurrentFinancialYear] = useState('');
    const [nextFinancialYear, setNextFinancialYear] = useState('');



    // Values
    const [values, setValues] = useState([]);


    // Selected values
    const [selectedValues, setSelectedValues] = useState([]);


    // Opened draggables
    const [showDraggables, setShowDraggables] = useState([]);


    // State
    const [state, setState] = useState({
        isTransfered:false,
        isNext:false
    });


    // Session transfer function
    const sessionTransferFunc = async () => {
        try {

            // Set is load to true
            setIsLoading(true);


            // Is session transfered responses
            const isStudentsTransferedRes = await isStudentsSesssionTransfered();
            const isSectionsRelationTransferedRes = await isSectionsSesssionTransfered();
            setValues([
                {
                    name:'Class Section Relation',
                    isTransfered:isSectionsRelationTransferedRes === 0 ? 'Not Transfered' : 'Already Transfered'
                },
                {
                    name:'Student Transfer',
                    isTransfered:isStudentsTransferedRes === 0 ? 'Not Transfered' : 'Already Transfered'
                }
            ]);


            // Set is loading to false
            setIsLoading(false);

        }catch(err){
            console.log(err);
        };
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {

            // Setting is loading to true
            setIsLoading(true);

            // Sessions response
            const sessionsRes = await fetchAcademicYears();
            const financialYearsRes = await fetchFinancialYears();
            const currentSessionName = sessionsRes.filter((s:any) => s.is_active)[0].year_name;
            const currentFinancialYearName = financialYearsRes.filter((s:any) => s.is_active)[0].year_name;
            setSessions(sessionsRes);
            setFinancialYears(financialYearsRes);
            setCurrentSession(currentSessionName);
            setCurrentFinancialYear(currentFinancialYearName);
            function convertToDate(dateObj:any) {
                const monthNames = {
                  January: 0,
                  February: 1,
                  March: 2,
                  April: 3,
                  May: 4,
                  June: 5,
                  July: 6,
                  August: 7,
                  September: 8,
                  October: 9,
                  November: 10,
                  December: 11
                };
                return new Date(dateObj.year, monthNames[dateObj.month], dateObj.day);
            };
            function getNextSessionByStartDate(currentYearName:any, sessions:any) {
                // Find the current session
                const currentSession = sessions.find((session:any) => session.year_name === currentYearName);
              
                if (!currentSession) {
                  return null; // Return null if the current session is not found
                }
              
                const currentStartDate = convertToDate(currentSession.start_date);
              
                // Find the next session by start date
                const nextSession = sessions
                  .map((session:any) => ({
                    ...session,
                    startDateObj: convertToDate(session.start_date)
                  }))
                  .filter(session => session.startDateObj > currentStartDate)
                  .sort((a:any, b:any) => a.startDateObj - b.startDateObj)[0];
              
                return nextSession || null; // Return null if no next session is found
            };
            setNextSession(getNextSessionByStartDate(currentSessionName, sessionsRes)?.year_name || '');
            setNextFinancialYear(getNextSessionByStartDate(currentFinancialYearName, financialYearsRes)?.year_name || '');


            // Is session transfered responses
            sessionTransferFunc();

        };
        fetcher();
    }, []);
    useEffect(() => {
        if(state.isTransfered){
            // Set is load to true
            setIsLoading(true);
    
    
            // Is session transfered responses
            sessionTransferFunc();
        };
    }, [state]);

    return (
        <div className='h-full flex flex-row flex-wrap items-start justify-center pt-10 gap-6 bg-white'>
            {isLoading ? (
                <LoadingIcon />
            ) : (
                <div className='w-[90%] flex flex-col items-center justify-center gap-6 lg:w-[80%]'>

                    {/* Sessions Box */}
                    <div className='w-full flex flex-col gap-2 rounded-[4px]' style={{borderWidth:1, borderColor:'#ccc', padding:15}}>
                        <div className='flex flex-row items-center justify-center gap-4'>
                            {/* Current Session */}
                            <div className='w-full flex flex-col items-center lg:flex-row'>
                                <p className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Current Session</p>
                                <div className='w-full flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                    <Select
                                        disabled
                                        value={currentSession}
                                        onValueChange={(v:any) => setCurrentSession(v)}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sessions?.length < 1 ? (
                                                <p>No sessions</p>
                                                // @ts-ignore
                                            ) : !sessions[0].year_name ? (
                                                <LoadingIcon />
                                            ) : sessions?.map((item:any) => (
                                                <SelectItem value={item.year_name} key={item._id}>{item.year_name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>


                            {/* Next Session */}
                            <div className='w-full flex flex-col items-center lg:flex-row'>
                                <p className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Next Session</p>
                                <div className='w-full flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                    <Select
                                        disabled
                                        value={nextSession}
                                        onValueChange={(v:any) => setNextSession(v)}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sessions?.length < 1 ? (
                                                <p>No sessions</p>
                                                // @ts-ignore
                                            ) : !sessions[0].year_name ? (
                                                <LoadingIcon />
                                            ) : sessions?.map((item:any) => (
                                                <SelectItem value={item.year_name} key={item._id}>{item.year_name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>


                        <div className='flex flex-row items-center justify-center gap-4'>
                            {/* Current Financial Year */}
                            <div className='w-full flex flex-col items-center lg:flex-row'>
                                <p className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Current Financial Year</p>
                                <div className='w-full flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                    <Select
                                        disabled
                                        value={currentFinancialYear}
                                        onValueChange={(v:any) => setCurrentFinancialYear(v)}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {financialYears?.length < 1 ? (
                                                <p>No sessions</p>
                                                // @ts-ignore
                                            ) : !financialYears[0].year_name ? (
                                                <LoadingIcon />
                                            ) : financialYears?.map((item:any) => (
                                                <SelectItem value={item.year_name} key={item._id}>{item.year_name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>


                            {/* Next Financial Year */}
                            <div className='w-full flex flex-col items-center lg:flex-row'>
                                <p className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Next Financial Year</p>
                                <div className='w-full flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                    <Select
                                        disabled
                                        value={nextFinancialYear}
                                        onValueChange={(v:any) => setNextFinancialYear(v)}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {financialYears?.length < 1 ? (
                                                <p>No sessions</p>
                                                // @ts-ignore
                                            ) : !financialYears[0].year_name ? (
                                                <LoadingIcon />
                                            ) : financialYears?.map((item:any) => (
                                                <SelectItem value={item.year_name} key={item._id}>{item.year_name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    {/* Values */}
                    <div className='w-full max-h-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'>

                        {/* Header */}
                        <div className='flex flex-row items-center justify-center w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                            <h2>Account Transfer Tables</h2>
                        </div>

                        <div className='w-[95%] h-[90%] flex flex-col items-center bg-[#F1F1F1] rounded-[8px]'>
                            <div className='w-full flex flex-col overflow-y-scroll custom-sidebar-scrollbar' style={{maxHeight:300}}>
                                {/* Headers */}
                                <ul className='w-full min-w-[600px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                                    <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-2 border-r-[0.5px] border-[#ccc]'>
                                        Sr. No.
                                        <ChevronsUpDown size={12}/>
                                    </li>
                                    <li className='basis-[40%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                                        Table Name
                                        <ChevronsUpDown size={12}/>
                                    </li>
                                    <li className='basis-[25%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                                        Status
                                        <ChevronsUpDown size={12}/>
                                    </li>
                                    <li className='basis-[20%] flex flex-row items-center justify-center gap-2 px-2'>
                                        Select
                                        <Checkbox
                                            checked={selectedValues.length === values.length && values.length !== 0 && selectedValues.length !== 0}
                                            onClick={() => {
                                                selectedValues.length === values.length && values.length !== 0 && selectedValues.length !== 0
                                                    ? setSelectedValues([])
                                                    : setSelectedValues(values.filter((v:any) => v.isTransfered !== 'Already Transfered'))
                                            }}
                                            className='rounded-[2px] border-hash-color'
                                        />
                                    </li>
                                </ul>
                                {/* Values */}
                                <div>
                                    {
                                        values.map((v:any) => (
                                            <ul
                                                className='w-full min-w-[600px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                            >
                                                <li className='basis-[15%] flex flex-row items-center justify-center px-2 py-2 border-r-[0.5px] border-[#ccc]'>
                                                    {values.indexOf(v) + 1}
                                                </li>
                                                <li className='basis-[40%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                                    {v.name}
                                                </li>
                                                <li className='basis-[25%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                                    <p style={{backgroundColor:v.isTransfered !== 'Not Transfered' ? '#FF6666' : '#90EE90'}}>
                                                        {v.isTransfered}
                                                    </p>
                                                </li>
                                                <li className='basis-[20%] flex flex-row items-center justify-center px-2'>
                                                    <Checkbox
                                                        checked={v.isTransfered === 'Already Transfered' ? false : selectedValues.includes(v)}
                                                        onClick={() => {
                                                            selectedValues.includes(v)
                                                                ? setSelectedValues(selectedValues.filter((value:any) => value !== v))
                                                                : setSelectedValues([...selectedValues, v])
                                                        }}
                                                        disabled={v.isTransfered === 'Already Transfered'}
                                                        className='rounded-[2px] border-hash-color'
                                                    />
                                                </li>
                                            </ul>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Button */}
                    <span
                        className='flex items-center justify-center w-[100px] h-8 text-md text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        onClick={() => {
                            if(selectedValues.length > 0){
                                if(nextSession === '' || nextFinancialYear === ''){
                                    toast({title:'Please select next sessions', variant:'alert'});
                                }else{
                                    setShowDraggables(selectedValues.map((v:any) => v.name));
                                    setSelectedValues([]);
                                };
                            }else{
                                toast({title:'Please select one item at least', variant:'alert'});
                            };
                        }}
                    >
                        Next
                    </span>
                </div>
            )}


            {/* Draggables */}
            {showDraggables.includes('Student Transfer') && (
                <StudentTransfer
                    currentSession={currentSession}
                    showDraggables={showDraggables}
                    setShowDraggables={setShowDraggables}
                    nextSession={nextSession}
                    state={state}
                    setState={setState}
                />
            )}
            {showDraggables.includes('Class Section Relation') && (
                <ClassSectionRelation
                    currentSession={currentSession}
                    showDraggables={showDraggables}
                    setShowDraggables={setShowDraggables}
                    nextSession={nextSession}
                    state={state}
                    setState={setState}
                />
            )}

        </div>
    );
};





// Export
export default page;