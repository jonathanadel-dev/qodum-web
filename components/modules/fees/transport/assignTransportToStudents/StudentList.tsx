// Imports
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Check, ChevronDown, ChevronsUpDown, X} from 'lucide-react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main Function
const StudentsList = ({selectedStudents, setSelectedStudents, students, isStudentsLoading, setStudents, vehicles, stops, routes}:any) => {

    // Months
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

    return (
            <div className='w-full h-[90%] mt-10 flex flex-col items-center rounded-[4px] border-[0.5px] border-[#ccc]'>


                {/* Heads */}
                <div className='w-full h-full flex flex-col rounded-[4px] bg-[#F3F8FB] overflow-x-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[1000px] flex flex-row text-[10px] bg-[#435680] text-white border-b-[0.5px] border-[#ccc] cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[7.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Adm. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Student Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Father Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Route
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Stop
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                            Vehicle
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                            Months
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[7.5%] flex flex-row items-center justify-between px-2 py-[2px]'>
                            Select
                            <ChevronsUpDown size={12} />
                        </li>
                    </ul>
                    {/* Values */}
                        {
                            isStudentsLoading ? (
                                <LoadingIcon />
                            ) : students?.length < 1 || students === undefined ? (
                                <p className='w-full min-w-[1000px] flex flex-row p-2 text-sm bg-[#F3F8FB]'>
                                    No Students
                                </p>
                            ) : students && !students[0]?.name ? (
                                <LoadingIcon />
                            ) : students?.map((student:any, index:number) => (
                                <ul
                                    key={index}
                                    className={`w-full min-w-[1000px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((students.indexOf(student) + 1) / 2) * 2 !== students.indexOf(student) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                                >
                                    <li className='basis-[7.5%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>{students.indexOf(student) + 1}</li>
                                    <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student.adm_no}
                                    </li>
                                    <li className='basis-[12.5%] flex-grow flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                                        {student.name}
                                    </li>
                                    <li className='basis-[12.5%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student.father_name}
                                    </li>
                                    <li className='basis-[12.5%] flex-grow flex flex-row items-center px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                        <Select
                                            value={students[students.indexOf(student)].route}
                                            onValueChange={(v:any) => {
                                                students[students.indexOf(student)].route = v;
                                                setStudents([...students])
                                            }}
                                        >
                                            <SelectTrigger
                                                disabled={student.is_transport_assigned}
                                                className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'
                                            >
                                                <SelectValue placeholder='Select' className='text-xs' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {routes.length < 1 ? (
                                                    <p className='text-xs text-hash-color'>No routes</p>
                                                ) : // @ts-ignore
                                                !routes[0]?.route_no ? (
                                                    <LoadingIcon />
                                                ) : routes.map((r:any) => (
                                                    <SelectItem value={r.route_no} key={r._id}>{r.route_no}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </li>
                                    <li className='basis-[12.5%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        <Select
                                            value={students[students.indexOf(student)].stop}
                                            onValueChange={(v:any) => {
                                                students[students.indexOf(student)].stop = v;
                                                setStudents([...students])
                                            }}
                                        >
                                            <SelectTrigger
                                                disabled={student.is_transport_assigned}
                                                className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'
                                            >
                                                <SelectValue placeholder='Select' className='text-xs' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {stops.filter((s:any) => s.route_no === student.route).length < 1 ? (
                                                    <p className='text-xs text-hash-color'>No route stops</p>
                                                ) : // @ts-ignore
                                                !stops.filter((s:any) => s.route_no === student.route)[0]?.stop_name ? (
                                                    <LoadingIcon />
                                                ) : stops.filter((s:any) => s.route_no === student.route).map((s:any) => (
                                                    <SelectItem value={s.stop_name} key={s._id}>
                                                        {s.stop_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </li>
                                    <li className='basis-[12.5%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {student?.is_transport_assigned ? (
                                            <div>
                                                {student.vehicle} ({student.seat_no})
                                            </div>
                                        ) : (
                                            <Select
                                                value={students[students.indexOf(student)].vehicle}
                                                onValueChange={(v:any) => {
                                                    students[students.indexOf(student)].vehicle = v;
                                                    const selectedVehicle = vehicles.find((vehicle:any) => vehicle.vehicle_name === v);
                                                    students[students.indexOf(student)].seat_no = Number(selectedVehicle.reserved_seats + 1) || 1;
                                                    setStudents([...students])
                                                }}
                                            >
                                                <SelectTrigger
                                                    disabled={student.is_transport_assigned}
                                                    className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'
                                                >
                                                    <SelectValue placeholder='Select' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {vehicles?.filter((v:any) => v.routes?.map((r:any) => r.route_no).includes(students[students.indexOf(student)].route))?.length < 1 ? (
                                                        <p className='text-xs text-hash-color'>No vehicles</p>
                                                    ) : // @ts-ignore
                                                    !vehicles[0]?.vehicle_name ? (
                                                        <LoadingIcon />
                                                    ) : vehicles.map((v:any) => ((v.seating_capacity == v.reserved_seats) || v.seating_capacity === 0) ? (
                                                        <SelectItem
                                                            value={v.vehicle_name}
                                                            key={v._id}
                                                            disabled
                                                            className='flex flex-row items-center justify-start'
                                                        >
                                                            {v.vehicle_name}
                                                            (0)
                                                        </SelectItem>
                                                    ) : (
                                                        <SelectItem
                                                            value={v.vehicle_name}
                                                            key={v._id}
                                                            className='flex flex-row items-center justify-start'
                                                        >
                                                            {v.vehicle_name}
                                                            ({(Number(v.seating_capacity) || 0) - Number(v.reserved_seats)})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </li>
                                    <li className='basis-[12.5%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        <Select>
                                            <SelectTrigger
                                                disabled={student.is_transport_assigned}
                                                className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'
                                            >
                                                <SelectValue placeholder={student?.months?.length < 1 ? 'Select' : student?.months?.length === 1 ? '1 month selected' : `${student?.months?.length} months selected`} className='text-xs'/>
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <div className='flex flex-row'>
                                                    <div
                                                        // @ts-ignore
                                                        onClick={() => {
                                                            students[students.indexOf(student)].months = months;
                                                            setStudents([...students]);
                                                            setSelectedStudents([...selectedStudents, student]);
                                                        }}
                                                        className='group flex flex-row items-center justify-center cursor-pointer'
                                                    >
                                                        <Check size={12}/>
                                                        <p className='text-xs group-hover:underline'>All</p>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            students[students.indexOf(student)].months = [];
                                                            setStudents([...students]);
                                                        }}
                                                        className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                                    >
                                                        <X size={12}/>
                                                        <p className='text-xs group-hover:underline'>Clear</p>
                                                    </div>
                                                </div>
                                                <ul className='mt-2'>
                                                    {months.map((month:any) => (
                                                        <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                            <Checkbox
                                                                className='rounded-[2px] text-hash-color font-semibold'
                                                                checked={student.months.includes(month)}
                                                                // @ts-ignore
                                                                onClick={() => {
                                                                    if(student?.months?.includes(month)){
                                                                        const filteredMonths = student?.months.filter((m:any) => m !== month);
                                                                        students[students.indexOf(student)].months = filteredMonths;
                                                                    }else{
                                                                        student?.months.push(month);
                                                                    };
                                                                    setStudents([...students]);
                                                                    if(student?.months?.length === 12){
                                                                        setSelectedStudents([...selectedStudents, student]);
                                                                    }
                                                                }}
                                                            />
                                                            <p className='text-xs font-semibold'>{month}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </SelectContent>
                                        </Select>
                                    </li>
                                    <li className='basis-[7.5%] flex items-center justify-center p-[2px]'>
                                        {!student.is_transport_assigned && (
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
                                        )}
                                    </li>
                                </ul>
                            ))
                        }
                </div>


            </div>
    );
};





// Export
export default StudentsList;