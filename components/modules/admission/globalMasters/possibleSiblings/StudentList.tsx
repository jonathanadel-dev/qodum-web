// Imports
import {ChevronsUpDown} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Command, CommandEmpty, CommandItem, CommandList} from '@/components/ui/command';





// Main Function
const StudentsList = ({students}: any) => {
    return (
        <Command
            className='w-[95%] max-h-[90%] mt-4 flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-center w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Students List</h2>
            </div>
            <div className='w-full h-[90%] flex flex-col items-center bg-[#F1F1F1]'>


                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[1100px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] bg-[#435680] text-white cursor-pointer'> 
                        <li className='basis-[7.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Father Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Mother Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Contact No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Student Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Gender
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Class
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[7.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Status
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Select to add
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2'>
                            Select to remove
                            <ChevronsUpDown size={12} />
                        </li>

                    </ul>
                    {/* Values */}
                    <CommandList>
                        {
                            students.length === 0 ? (
                                <p className='w-full min-w-[1100px] flex flex-row p-2 text-sm bg-[#F3F8FB] border-b-[0.5px] border-[#ccc]'>
                                    No students
                                </p>
                            ) : students[0]?.student?.name === undefined ? (
                                <LoadingIcon />
                            ) : students.map((student: any, index: number) => (
                                <CommandItem
                                    key={index}
                                    className={`w-full min-w-[1100px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] ${Math.floor((students.indexOf(student) + 1) / 2) * 2 !== students.indexOf(student) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                                >
                                    <li className='basis-[7.5%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc] py-[2px]'>{students.indexOf(student) + 1}</li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.parents?.father_details?.father_name}
                                    </li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.parents?.mother_details?.mother_name}
                                    </li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.student?.mobile}
                                    </li>
                                    <li className='basis-[12.5%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.student?.name}
                                    </li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.student?.gender}
                                    </li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.student?.class}
                                    </li>
                                    <li className='basis-[7.5%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.student?.student_status}
                                    </li>
                                    <li className='basis-[10%] flex flex-row items-center justify-center px-2 border-r-[.5px] border-[#ccc]'>
                                        <Checkbox
                                            // checked={selectedStudents.includes(student?.student?.reg_no)}
                                            // onCheckedChange={() => {
                                            //     if(selectedStudents.includes(student?.student?.reg_no)){
                                            //         setSelectedStudents(selectedStudents.filter((s:any) => s !== student?.student?.reg_no));
                                            //     }else{
                                            //         setSelectedStudents([...selectedStudents, student?.student?.reg_no]);
                                            //     };
                                            // }}
                                            className='rounded-[2px] text-hash-color'
                                        />
                                    </li>
                                    <li className='basis-[12.5%] flex flex-row items-center justify-center px-2'>
                                        <Checkbox
                                            // checked={selectedStudents.includes(student?.student?.reg_no)}
                                            // onCheckedChange={() => {
                                            //     if(selectedStudents.includes(student?.student?.reg_no)){
                                            //         setSelectedStudents(selectedStudents.filter((s:any) => s !== student?.student?.reg_no));
                                            //     }else{
                                            //         setSelectedStudents([...selectedStudents, student?.student?.reg_no]);
                                            //     };
                                            // }}
                                            className='rounded-[2px] text-hash-color'
                                        />
                                    </li>
                                </CommandItem>
                            ))
                        }
                    </CommandList>
                    {students[0]?.student?.name !== undefined && <CommandEmpty>No results found</CommandEmpty>}
                </div>
            </div>
        </Command>
    );
};





// Export
export default StudentsList;