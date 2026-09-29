// Imports
import {format} from 'date-fns';
import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Command, CommandItem, CommandList} from '@/components/ui/command';
import {CalendarIcon, ChevronsUpDown, Eye, Pencil, Trash2} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {deleteSlot, fetchSlots, modifySlot} from '@/lib/actions/admission/admission/entranceTest/slot.actions';





// Main Function
const SlotsList = ({slots, isLoading, setSlots, setIsViewOpened}:any) => {


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


    // Is loading action
    const [isLoadingAction, setIsLoadingAction] = useState(false);


    // Edit handler
    const editHandler = async (s:any) => {
        setIsLoadingAction(true);
        await modifySlot({
            id:s._id,
            slot_date:s.slot_date,
            start_time:s.start_time,
            end_time:s.end_time,
            applicant:s.applicant,
            alloted:s.alloted
        });
        const res = await fetchSlots({class_name:s.class_name, session:s.session});
        setSlots(res);
        setIsLoadingAction(false);
    };


    // Delete handler
    const deleteHandler = async (s:any) => {
        setIsLoadingAction(true);
        await deleteSlot({id:s._id});
        const res = await fetchSlots({class_name:s.class_name, session:s.session});
        setSlots(res);
        setIsLoadingAction(false);
    };


    // View handler
    const viewHandler = (s:any) => {
        setIsViewOpened(true);
    };


    return (
        <Command
            className='w-[100%] h-full mb-4 mt-4 flex flex-col items-center pb-6 gap-2 rounded-[4px] border-[0.5px] border-[#E8E8E8]'
        >
            <div className='w-full h-[100%] flex flex-col items-center bg-[#F1F1F1]'>


                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[1100px] flex flex-row text-[10px] bg-[#435680] border-b-[0.5px] border-[#ccc] text-white cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Slot Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Slot Date
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Start Time
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            End Time
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Applicant
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Alloted
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-col items-start justify-center px-2 py-[2px]'>

                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>
                        {isLoading ? (
                            <LoadingIcon />
                        ) : isLoadingAction ? (
                            <LoadingIcon />
                        ) : slots.length < 1 ? (
                            <p className='text-xs text-hash-color ml-2'>No slots</p>
                        ) : slots.map((s:any, index:number) => (
                            <CommandItem
                                key={index}
                                className={`w-full min-w-[1100px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((slots.indexOf(s) + 1) / 2) * 2 !== slots.indexOf(s) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                            >
                                <li className='basis-[10%] flex flex-row items-center px-2 py-2 border-r-[.5px] border-[#ccc]'>
                                    {slots.indexOf(s) + 1}
                                </li>
                                <li className='basis-[15%] flex flex-row items-center justify-center px-2 border-r-[.5px] border-[#ccc]'>
                                    <Input
                                        disabled
                                        value={s.slot_name}
                                        onChange={(e:any) => {
                                            slots[slots.indexOf(s)].slot_name = e.target.value;
                                            setSlots([...slots]);
                                        }}
                                        className='h-[80%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </li>
                                <li className='basis-[15%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    <Popover open={isCalendarOpened === s.slot_name} onOpenChange={() => isCalendarOpened === s.slot_name ? setIsCalendarOpened('') : setIsCalendarOpened(s.slot_name)}>
                                        <PopoverTrigger asChild className='h-7'>
                                            <Button
                                                variant='outline'
                                                className='flex flex-row items-center w-full h-7 text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] lg:basis-[65%]'
                                            >
                                                <CalendarIcon className='mr-2 h-4 w-4' />
                                                {
                                                    s.slot_date
                                                            ? <span>{format(s.slot_date, 'PPP')}</span>
                                                            : <span>Pick a date</span>
                                                }
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-auto p-0'>
                                            <Calendar
                                                mode='single'
                                                selected={s.slot_date}
                                                onSelect={v => {
                                                    setIsCalendarOpened('');
                                                    slots[slots.indexOf(s)].slot_date = v;
                                                    setSlots([...slots]);
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </li>
                                <li className='basis-[15%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    <Input
                                        value={s.start_time}
                                        onChange={(e:any) => {
                                            slots[slots.indexOf(s)].start_time = e.target.value;
                                            setSlots([...slots]);
                                        }}
                                        className='h-[80%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </li>
                                <li className='basis-[15%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    <Input
                                        value={s.end_time}
                                        onChange={(e:any) => {
                                            slots[slots.indexOf(s)].end_time = e.target.value;
                                            setSlots([...slots]);
                                        }}
                                        className='h-[80%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </li>
                                <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    <Input
                                        value={s.applicant}
                                        onChange={(e:any) => {
                                            slots[slots.indexOf(s)].applicant = e.target.value;
                                            setSlots([...slots]);
                                        }}
                                        className='h-[80%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </li>
                                <li className='basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    <Input
                                        disabled
                                        value={s.alloted}
                                        onChange={(e:any) => {
                                            slots[slots.indexOf(s)].alloted = e.target.value;
                                            setSlots([...slots]);
                                        }}
                                        className='h-[80%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </li>
                                <li className='basis-[10%] flex flex-row items-center justify-center px-2 gap-1'>
                                    <Eye
                                        onClick={() => viewHandler(s)}
                                        size={18}
                                        className='text-hash-color cursor-pointer transition hover:scale-105'
                                    />
                                    <Pencil
                                        onClick={() => editHandler(s)}
                                        size={18}
                                        className='text-hash-color cursor-pointer transition hover:scale-105'
                                    />
                                    <Trash2
                                        onClick={() => deleteHandler(s)}
                                        size={18}
                                        className='text-hash-color cursor-pointer transition hover:scale-105'
                                    />
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
export default SlotsList;