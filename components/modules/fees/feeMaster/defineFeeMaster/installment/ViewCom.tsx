// Imports
import moment from 'moment';
import {Button} from '@/components/ui/button';
import {ChevronsUpDown, X} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from '@/components/ui/command';





// Main Function
const ViewCom = ({setIsViewOpened, installments, setUpdateInstallment, setSelectedMonths}:any) => {


    // Select handler
    const selectHandler = (installment:any) => {
        setUpdateInstallment({
            id:installment._id,
            isDeleteClicked:false,
            name:installment.name,
            print_name:installment.print_name,
            preference_no:installment.preference_no,
            due_on_date:{
                day:installment.due_on_date.day,
                month:installment.due_on_date.month,
                year:installment.due_on_date.year
            },
            due_date:{
                day:installment.due_date.day,
                month:installment.due_date.month,
                year:installment.due_date.year
            },
            months:installment.months
        });
        setSelectedMonths(installment.months)
        setIsViewOpened(false);
    };


    // Month abbreviation converter
    const monthConverter = (month:String) => {
        let monthAbr;
        switch (month) {
            case 'January':
                monthAbr = 'Jan';
                break;
            case 'February':
                monthAbr = 'Feb';
                break;
            case 'March':
                monthAbr = 'Mar';
                break;
            case 'April':
                monthAbr = 'Apr';
                break;
            case 'May':
                monthAbr = 'May';
                break;
            case 'June':
                monthAbr = 'Jun';
                break;
            case 'July':
                monthAbr = 'Jul';
                break;
            case 'August':
                monthAbr = 'Aug';
                break;
            case 'September':
                monthAbr = 'Sep';
                break;
            case 'October':
                monthAbr = 'Oct';
                break;
            case 'November':
                monthAbr = 'Nov';
                break;
            case 'December':
                monthAbr = 'Dec';
                break;
        }
        return monthAbr;
    };


    return (
        <Command
            className='w-[90%] max-h-[90%] max-w-[1200px] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Installments List</h2>
                <X color='#3a3a3a' size={18} cursor={'pointer'} onClick={() => setIsViewOpened(false)}/>
            </div>
            <div className='w-[95%] h-[90%] flex flex-col items-center bg-[#F1F1F1] rounded-[8px]'>


                {/* Search input */}
                <div className='w-full flex flex-row justify-end pr-4 py-2 border-b-[0.5px] border-[#ccc]'>
                    <CommandInput
                        placeholder='Search list'
                        className='h-full text-xs text-hash-color w-[250px] bg-white'
                    />
                </div>


                {/* installments */}
                <div className='w-full flex flex-col h-[90%] overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[1000px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[14%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Select
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[22%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Installment Name
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[22%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Print Name
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[22%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Pref. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[22%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Due Date
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[22%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Due On Date
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[22%] flex flex-row items-center justify-between px-2'>
                            Modified Date
                            <ChevronsUpDown size={12}/>
                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>
                        {
                            installments.length < 1 ? (
                                <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-[0.5px] border-[#ccc]'>
                                    No installments yet
                                </p>
                            ) : !installments[0]?.name ? (
                                    <LoadingIcon />
                                ) : installments.map((installment:any) => (
                                    <CommandItem
                                        value={`${installments.indexOf(installment) + 1} ${installment.name} ${installment.print_name} ${installment.preference_no} ${installment?.due_date?.day}-${monthConverter(installment?.due_date?.month)}-${installment?.due_date?.year} ${installment?.due_on_date?.day}-${monthConverter(installment?.due_on_date?.month)}-${installment?.due_on_date?.year} ${moment(installment.updateAt).format('D-MMM-yy')}`}
                                        className='w-full min-w-[1000px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                    >
                                        <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{installments.indexOf(installment) + 1}</li>
                                        <li className='basis-[14%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <Button
                                                className='px-[8px] h-6 text-[10px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[0.5px] rounded-full border-[#E2E4FF]
                                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-xs sm:px-4'
                                                onClick={() => selectHandler(installment)}
                                            >
                                                Select
                                            </Button>
                                        </li>
                                        <li className='basis-[22%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{installment.name}</li>
                                        <li className='basis-[22%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{installment.print_name}</li>
                                        <li className='basis-[22%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{installment.preference_no}</li>
                                        <li className='basis-[22%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{installment?.due_date?.day}-{monthConverter(installment?.due_date?.month)}-{installment?.due_date?.year}</li>
                                        <li className='basis-[22%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{installment?.due_on_date?.day}-{monthConverter(installment?.due_on_date?.month)}-{installment?.due_on_date?.year}</li>
                                        <li className='basis-[22%] flex flex-row items-center px-2'>{moment(installment.updateAt).format('D-MMM-yy')}</li>
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
                                <SelectValue placeholder='1000' className='text-xs'/>
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