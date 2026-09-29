// Imports
import moment from 'moment';
import {useEffect} from 'react';
import {ChevronsUpDown} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Command, CommandItem, CommandList} from '@/components/ui/command';





// Main Function
const StudentsList = ({selectedStudents, setSelectedStudents, students, isStudentsLoading}:any) => {
    return (       
        <Command
            className='w-[100%] max-h-[90%] flex flex-col items-center mt-4 pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-center  w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Students List</h2>
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
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Adm. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Student Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Father Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            DOB
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            DOA
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2'>
                            Is New Adm.
                            <ChevronsUpDown size={12} />
                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>
                        {
                            isStudentsLoading ? (
                                <LoadingIcon />
                            ) : students?.length < 1 || students === undefined ? (
                                <p className='w-full min-w-[1000px] flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-[0.5px] border-[#ccc]'>
                                    No Students
                                </p>
                            ) : students && !students[0]?.student?.name ? (
                                <LoadingIcon />
                            ) : students?.map((student: any, index: number) => (
                                <CommandItem
                                    key={index}
                                    className='w-full min-w-[1000px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                >
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>{students.indexOf(student) + 1}</li>
                                    <li className='basis-[10%] flex items-center justify-center p-[2px] border-r-[.5px] border-[#ccc]'>
                                        <Checkbox
                                            checked={selectedStudents.includes(student)}
                                            onCheckedChange={() => {
                                                selectedStudents.includes(student)
                                                    ?
                                                        setSelectedStudents(selectedStudents.filter((s:any) => s !== student))
                                                    :
                                                        setSelectedStudents([...selectedStudents, student])
                                            }}
                                            className='rounded-[2px] text-hash-color'
                                        />
                                    </li>
                                    <li className='basis-[15%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student.student.adm_no}
                                    </li>
                                    <li className='basis-[15%] flex-grow flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                                        {student.student.name} {student.student.is_new && <span className="px-[4px] text-[11px] text-[#FF0000] rounded-[4px] border-[0.5px] border-[#FF0000] animate-pulseRed">New</span>}
                                    </li>
                                    <li className='basis-[15%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student.parents.father.father_name}
                                    </li>
                                    <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {moment(student.student.dob).format('D-MMM-yy')}
                                    </li>
                                    <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {moment(student.student.doa).format('D-MMM-yy')}
                                    </li>
                                    <li className='basis-[15%] flex-grow flex flex-row items-center px-2'>
                                        True
                                    </li>

                                </CommandItem>
                            ))
                        }
                    </CommandList>
                </div>


            </div>
        </Command>    
    );
};





// Export
export default StudentsList;