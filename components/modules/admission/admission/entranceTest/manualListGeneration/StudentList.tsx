// Imports
import {ChevronsUpDown} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {FormControl, FormField, FormItem} from '@/components/ui/form';
import {Command, CommandEmpty, CommandItem, CommandList} from '@/components/ui/command';





// Main Function
const StudentsList = ({students, selectedStudents, setSelectedStudents}: any) => {
    return (
        <Command
            className='w-[100%] max-h-[90%] mt-4 flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8] lg:w-[100%]'
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
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Reg. No.
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
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Contact No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Selected Class
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2'>
                            Adm. Status
                            <ChevronsUpDown size={12} />
                        </li>

                    </ul>
                    {/* Values */}
                    <CommandList>
                        {
                            students[0]?.student?.name === undefined ? (
                                <p className='w-full min-w-[1000px] flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-[0.5px] border-[#ccc]'>
                                    No students
                                </p>
                            ) : students[0]?.student?.name === '' ? (
                                <LoadingIcon />
                            ) : students.map((student: any, index: number) => (
                                <CommandItem
                                    key={index}
                                    value={`${students.indexOf(student) + 1}  ${student?.student?.reg_no} ${student?.student?.name} ${student?.student?.father_name} ${student?.student?.contact_person_mobile} ${student?.student?.class}`}
                                    className='w-full min-w-[1000px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                >
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>{students.indexOf(student) + 1}</li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        <FormField
                                            // control={form.control}
                                            name="class"
                                            render={({ field }: any) => {
                                                return (
                                                    <FormItem
                                                        key={student.admin_no}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl >
                                                            <Checkbox
                                                                checked={selectedStudents.includes(student?.student?.reg_no)}
                                                                onCheckedChange={() => {
                                                                    if(selectedStudents.includes(student?.student?.reg_no)){
                                                                        setSelectedStudents(selectedStudents.filter((s:any) => s !== student?.student?.reg_no));
                                                                    }else{
                                                                        setSelectedStudents([...selectedStudents, student?.student?.reg_no]);
                                                                    };
                                                                }}
                                                                className='rounded-[2px] text-hash-color'
                                                            />

                                                        </FormControl>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    </li>
                                    <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.student?.reg_no}
                                    </li>
                                    <li className='basis-[15%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.student?.name}
                                    </li>
                                    <li className='basis-[15%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.parents?.father?.father_name}
                                    </li>
                                    <li className='basis-[12.5%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.student?.contact_person_mobile}
                                    </li>
                                    <li className='basis-[15%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.student?.class}
                                    </li>
                                    <li className='basis-[12.5%] flex-grow flex flex-row items-center px-2'>
                                        -
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