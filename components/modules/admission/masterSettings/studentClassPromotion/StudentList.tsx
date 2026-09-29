// Imports
import {Checkbox} from '@/components/ui/checkbox';
import {ChevronDown, ChevronsUpDown} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Command, CommandItem, CommandList} from '@/components/ui/command';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main Function
const StudentsList = ({students, classes, sections, isLoading, selectedStudents, setSelectedStudents, setStudents}: any) => {
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
                    <ul className='w-full min-w-[1200px] flex flex-row text-[10px] bg-[#435680] border-b-[0.5px] border-[#ccc] text-white cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[5%] flex flex-row items-center justify-center px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
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
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Adm. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Bill No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Student's Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Father's Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Assigned Class
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-col items-start justify-center px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            New Class
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    {classes.length === 0 ? (
                                        <p className='text-xs text-hash-color'>No classes</p>
                                    ) : classes.map((c:any) => (
                                        <SelectItem value={c.class_name} key={c._id}>{c.class_name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Assigned Section
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-col items-start justify-center px-2 py-[2px]'>
                            New Section
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sections.length === 0 ? (
                                        <p className='text-xs text-hash-color'>No sections</p>
                                    ) : sections.map((c:any) => (
                                        <SelectItem value={c.section_name} key={c._id}>{c.section_name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>
                        {isLoading ? (
                            <LoadingIcon />
                        ) : students.length < 1 ? (
                            <p className='text-xs text-hash-color ml-2'>No Students</p>
                        ) : students.map((student: any, index: number) => (
                            <CommandItem
                                key={index}
                                className={`w-full min-w-[1200px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((students.indexOf(student) + 1) / 2) * 2 !== students.indexOf(student) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                            >
                                <li className='basis-[10%] flex flex-row items-center px-2 py-2 border-r-[.5px] border-[#ccc]'>
                                    {students.indexOf(student) + 1}
                                </li>
                                <li className='basis-[5%] flex flex-row items-center justify-center px-2 border-r-[.5px] border-[#ccc]'>
                                    <Checkbox
                                        className='text-hash-color rounded-[2px]'
                                        checked={selectedStudents?.map((s:any) => s?.student?.name).includes(student?.student?.name)}
                                        onClick={() => {
                                            selectedStudents?.map((s:any) => s?.student?.name).includes(student?.student?.name)
                                                ?
                                                    setSelectedStudents(selectedStudents?.filter((s:any) => s?.student?.name !== student?.student?.name))
                                                :
                                                    setSelectedStudents([...selectedStudents, student]);
                                        }}
                                    />
                                </li>
                                <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.student?.adm_no}
                                </li>
                                <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.student?.bill_no}
                                </li>
                                <li className='basis-[12.5%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.student?.name}
                                </li>
                                <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.parents?.father?.father_name}
                                </li>
                                <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.student?.class}
                                </li>
                                <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    <Select
                                        onValueChange={(v:any) => {
                                            setStudents((prevStudents:any) =>
                                                prevStudents.map((s:any) =>
                                                    s?.student?.name === student?.student?.name
                                                        ? {...s, student:{...s.student, new_class:v}}
                                                        : s
                                                )
                                            );
                                            setSelectedStudents((prevStudents:any) =>
                                                prevStudents.map((s:any) =>
                                                    s?.student?.name === student?.student?.name
                                                        ? {...s, student:{...s.student, new_class:v}}
                                                        : s
                                                )
                                            );
                                        }}
                                        value={student?.student?.new_class}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classes?.filter((c:any) => c.class_name !== student?.student?.class)?.length === 0 ? (
                                                <p className='text-xs text-hash-color'>No classes</p>
                                            ) : classes?.filter((c:any) => c.class_name !== student?.student?.class)?.map((c:any) => (
                                                <SelectItem value={c.class_name} key={c._id}>{c.class_name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </li>
                                <li className='basis-[12.5%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.student?.section}
                                </li>
                                <li className='basis-[10%] flex flex-row items-center px-2'>
                                    <Select>
                                        <SelectTrigger className='w-full h-6 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sections.length === 0 ? (
                                                <p className='text-xs text-hash-color'>No sections</p>
                                            ) : sections.map((c:any) => (
                                                <SelectItem value={c.section_name} key={c._id}>{c.section_name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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