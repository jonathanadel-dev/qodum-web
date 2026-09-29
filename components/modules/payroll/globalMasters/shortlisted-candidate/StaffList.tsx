// Imports
import {ChevronsUpDown} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Command, CommandEmpty, CommandItem, CommandList} from '@/components/ui/command';





// Main Function
const StaffList = ({staffApplications, selectedStaffApplications, setSelectedStaffApplications}: any) => {
    return (
        <Command
            className='w-[100%] max-h-[90%] mt-4 flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8] lg:w-[100%]'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-center  w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Staff List</h2>
            </div>
            <div className='w-full h-[90%] flex flex-col items-center bg-[#F1F1F1]'>


                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[1000px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Select
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Pref. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Applicant Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Father/Spouse Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Contact No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2'>
                            Designation
                            <ChevronsUpDown size={12} />
                        </li>

                    </ul>
                    {/* Values */}
                    <CommandList>
                        {
                            staffApplications[0]?.staff_registration?.first_name === undefined ? (
                                <p className='w-full min-w-[1000px] flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-[0.5px] border-[#ccc]'>
                                    No staff applications
                                </p>
                            ) : staffApplications[0]?.staff_registration?.first_name === '' ? (
                                <LoadingIcon />
                            ) : staffApplications.map((s:any, index:number) => (
                                <CommandItem
                                    key={index}
                                    value={`${staffApplications.indexOf(s) + 1}  ${s?.staff_registration.reg_no} ${s?.staff_registration?.first_name} ${s?.staff_registration?.father_or_spouse_name} ${s?.staff_registration?.mobile} ${s?.staff_registration?.designation}`}
                                    className='w-full min-w-[1000px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                >
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>{staffApplications.indexOf(s) + 1}</li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        <Checkbox
                                            checked={selectedStaffApplications.includes(s?.staff_registration?.reg_no)}
                                            onCheckedChange={() => {
                                                if(selectedStaffApplications.includes(s?.staff_registration?.reg_no)){
                                                    setSelectedStaffApplications(selectedStaffApplications.filter((s:any) => s === s?.staff_registration?.reg_no));
                                                }else{
                                                    setSelectedStaffApplications([...selectedStaffApplications, s?.staff_registration?.reg_no]);
                                                };
                                            }}
                                            className='rounded-[2px] text-hash-color'
                                        />
                                    </li>
                                    <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {s?.staff_registration?.reg_no}
                                    </li>
                                    <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {s?.staff_registration?.first_name}
                                    </li>
                                    <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {s?.staff_registration?.father_or_spouse_name}
                                    </li>
                                    <li className='basis-[15%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {s?.staff_registration?.mobile}
                                    </li>
                                    <li className='basis-[15%] flex-grow flex flex-row items-center px-2'>
                                        {s?.staff_registration?.designation}
                                    </li>

                                </CommandItem>
                            ))
                        }
                    </CommandList>
                    {staffApplications[0]?.staff_registration?.first_name !== undefined && <CommandEmpty>No results found</CommandEmpty>}
                </div>
            </div>
        </Command>
    );
};





// Export
export default StaffList;