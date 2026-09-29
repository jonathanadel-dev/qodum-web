// Imports
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, X } from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';





// Main Function
const ViewCom = ({ setIsViewOpened, heads, setUpdateHead }: any) => {


    // Select handler
    const selectHandler = (head: any) => {
        setUpdateHead({
            id: head._id,
            isDeleteClicked: false,
            name: head.name,
            print_name: head.print_name,
            pay_schedule: head.pay_schedule,
            priority_no: head.priority_no,
            type: head.type,
            show_in_certificate: head.show_in_certificate,
            fee_refundable: head.fee_refundable
        });
        setIsViewOpened(false);
    };


    return (
        <Command
            className='w-[89%] max-h-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Heads List</h2>
                <X color='#3a3a3a' size={18} cursor={'pointer'} onClick={() => setIsViewOpened(false)} />
            </div>
            <div className='w-[99%] h-[90%] flex flex-col items-center bg-[#F1F1F1] rounded-[8px]'>


                {/* Search input */}
                <div className='w-full flex flex-row justify-end pr-4 py-2 border-b-2 border-[#ccc]'>
                    <CommandInput
                        placeholder='Search list'
                        className='h-full text-xs text-hash-color w-[250px] bg-white'
                    />
                </div>


                {/* Heads */}
                <div className='w-full flex flex-col h-[90%] overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[1000px] flex flex-row text-[10px] border-b-2 border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[5%] w-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] w-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Select
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] w-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] w-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Print Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] w-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Pay Schedule
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] w-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Priority No
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] w-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Type
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] w-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Show In Certificate
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] w-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Fee Refundable
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] w-[10%] flex flex-row items-center justify-between px-2'>
                            Modify Details
                            <ChevronsUpDown size={12} />
                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>
                        {
                            heads.length < 1 ? (
                                <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-2 border-[#ccc]'>
                                    No heads yet
                                </p>
                            ) : !heads[0]?.name ? (
                                <LoadingIcon />
                            ) : heads.map((head: any, index: number) => (
                                <CommandItem
                                    key={index}
                                    value={`${heads.indexOf(head) + 1} ${head.name} ${head.print_name} ${head.pay_schedule} ${head.priority_no} ${head.type} ${head.show_in_certificate ? 'True' : 'False'}  ${head.fee_refundable ? 'True' : 'False'}`}
                                    className='w-full min-w-[1000px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-2 border-[#ccc] sm:text-xs md:text-md'
                                >
                                    <li className='basis-[5%] w-[5%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{heads.indexOf(head) + 1}</li>
                                    <li className='basis-[15%] w-[15%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                        <Button
                                            className='px-[8px] h-6 text-[10px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-[#E2E4FF]
                                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-xs sm:px-4'
                                            onClick={() => selectHandler(head)}
                                        >
                                            Select
                                        </Button>
                                    </li>
                                    <li className='basis-[10%] w-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.name}</li>
                                    <li className='basis-[10%] w-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.print_name}</li>
                                    <li className='basis-[10%] w-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.pay_schedule}</li>
                                    <li className='basis-[10%] w-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.priority_no}</li>
                                    <li className='basis-[10%] w-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.type}</li>
                                    <li className='basis-[10%] w-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.show_in_certificate ? 'True' : 'False'}</li>
                                    <li className='basis-[10%] w-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.fee_refundable ? 'True' : 'False'}</li>
                                    <li className='basis-[10%] w-[10%] flex flex-row items-center px-2'>{moment(head.updateAt).format('D-MMM-yy')}</li>
                                </CommandItem>
                            ))
                        }
                    </CommandList>
                    <CommandEmpty>No results found</CommandEmpty>
                </div>


                {/* Buttons */}
                <div className='w-full flex flex-row items-center justify-between py-4 px-2 border-t-[0.5px] border-[#ccc]'>
                    {/* Items per page */}
                    <div className='text-[10px] flex flex-col items-center gap-2 sm:text-sm sm:flex-row'>
                        <p className='text-hash-color'>Items per page:</p>
                        <Select>
                            <SelectTrigger className='flex flex-row items-center h-8 pl-2 text-[10px] bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] sm:text-xs'>
                                <SelectValue placeholder='1000' className='text-xs' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='10'>10</SelectItem>
                                <SelectItem value='15'>15</SelectItem>
                                <SelectItem value='50'>50</SelectItem>
                                <SelectItem value='100'>100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Skipping */}
                    <div className='flex flex-row items-center gap-[2px] sm:gap-[4px]'>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>First</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Prev.</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>1</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Next</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Last</Button>
                    </div>
                </div>


            </div>
        </Command>
    );
};





// Export
export default ViewCom;