// Imports
import {Switch} from '@/components/ui/switch';
import {ChevronsUpDown} from 'lucide-react';
import {Command, CommandEmpty, CommandItem, CommandList} from '@/components/ui/command';
import LoadingIcon from '@/components/shared/LoadingIcon';





// Main Function
const StudentsList = ({students, isLoading, setStudents}: any) => {
    return (
        <Command
            className='w-[100%] max-h-[90%] mt-4 flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-center  w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Students List</h2>
            </div>
            <div className='w-full h-[90%] flex flex-col items-center bg-[#F1F1F1]'>


                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[700px] flex flex-row text-[10px] bg-[#435680] border-b-[0.5px] border-[#ccc] text-white cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Adm No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Student's Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Father's Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[30%] flex flex-row items-center justify-between px-2'>
                            Student Status (Is New)
                            <ChevronsUpDown size={12} />
                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>
                        {isLoading ? (
                            <LoadingIcon />
                        ) : students.length < 1 ? (
                            <p className='text-xs text-hash-color ml-2'>No studnets</p>
                        ) : students.map((student: any, index: number) => (
                            <CommandItem
                                key={index}
                                className={`w-full min-w-[700px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((students.indexOf(student) + 1) / 2) * 2 !== students.indexOf(student) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                            >
                                <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {students.indexOf(student) + 1}
                                </li>
                                <li className='basis-[20%] flex flex-row items-center px-2 py-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.student?.adm_no}
                                </li>
                                <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.student?.name}
                                </li>
                                <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.parents?.father?.father_name}
                                </li>
                                <li className='basis-[30%] flex-grow flex flex-row items-center px-2'>
                                    <div className='flex-1 flex items-center justify-center space-x-2'>
                                        <Switch
                                            id='is_enable'
                                            checked={student.student.is_new}
                                            onClick={() => {
                                                students[students.indexOf(student)].student.is_new = !students[students.indexOf(student)].student.is_new;
                                                setStudents([...students]);
                                            }}
                                        />
                                    </div>
                                </li>
                            </CommandItem>
                        ))}
                    </CommandList>
                </div>
            </div>
        </Command>
    );
};





// Export
export default StudentsList;