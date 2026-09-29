// Imports
import Image from 'next/image';
import {ChevronsUpDown} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Command, CommandEmpty, CommandItem, CommandList} from '@/components/ui/command';





// Main Function
const StudentsList = ({students, isLoading, selectedStudents, setSelectedStudents}: any) => {
    return (
        <Command
            className='w-[95%] max-w-[700px] max-h-[90%] mt-4 flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-center  w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Students List</h2>
            </div>
            <div className='w-full h-[90%] flex flex-col items-center bg-[#F1F1F1]'>


                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[500px] py-[2px] flex flex-row text-[10px] bg-[#435680] border-b-[0.5px] border-[#ccc] text-white cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[15%] flex flex-row items-center justify-center px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            <Checkbox
                                checked={students.length > 1 && students.length === selectedStudents.length}
                                onClick={() => {
                                    students.length === selectedStudents.length
                                        ?
                                            setSelectedStudents([])
                                        :
                                            setSelectedStudents(students);
                                }}
                                className='text-hash-color rounded-[2px] bg-[#fff] border-none data-[state=checked]:text-[#000]'
                            />
                        </li>
                        <li className='basis-[25%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Student's Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Admission
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Roll No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2'>
                            Image
                            <ChevronsUpDown size={12} />
                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>
                        {isLoading ? (
                            <LoadingIcon />
                        ) : students.length < 1 ? (
                            <p className='w-full min-w-[500px] pl-2 pt-2 text-[11px] text-hash-color font-semibold'>No students</p>
                        ) : students.map((student: any, index: number) => (
                            <CommandItem
                                key={index}
                                className={`w-full min-w-[500px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((students.indexOf(student) + 1) / 2) * 2 !== students.indexOf(student) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                            >
                                <li className='basis-[15%] flex flex-row items-center justify-center px-2 py-2 border-r-[.5px] border-[#ccc]'>
                                    <Checkbox
                                        className='text-hash-color rounded-[2px]'
                                        checked={selectedStudents.includes(student)}
                                        onClick={() => {
                                            selectedStudents.includes(student)
                                                ?
                                                    setSelectedStudents(selectedStudents.filter((s:any) => s !== student))
                                                :
                                                    setSelectedStudents([...selectedStudents, student]);
                                        }}
                                    />
                                </li>
                                <li className='basis-[25%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.student?.name}
                                </li>
                                <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.student?.adm_no}
                                </li>
                                <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.student.roll_no}
                                </li>
                                <li className='basis-[20%] py-2 flex-grow flex flex-row items-center justify-center px-2'>
                                    {student.student.image === '' ? (
                                        <div className='w-[50px] h-[50px] border-[0.5px] border-[#ccc] rounded-[5px]'/>
                                    ) : (
                                        <Image
                                            src={student.student.image}
                                            alt='Student image'
                                            height={75}
                                            width={75}
                                            className='rounded-[5px]'
                                        />
                                    )}
                                </li>
                            </CommandItem>
                        ))}
                    </CommandList>
                    {students[0]?.student?.name !== undefined && <CommandEmpty>No results found</CommandEmpty>}
                </div>
            </div>
        </Command>
    );
};





// Export
export default StudentsList;