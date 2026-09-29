// Imports
import {Input} from '@/components/ui/input';
import {ChevronsUpDown} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Command, CommandItem, CommandList} from '@/components/ui/command';
import {FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';





// Main Function
const HeadsList = ({heads, form}:any) => {
    return (
        <Command
            className='w-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8] '
        >
            
            {/* Header */}
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Group Head Relation</h2>
            </div>
            <div className='w-full h-full flex flex-col items-center bg-[#F1F1F1]'>

                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[500px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[25%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[25%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Fee Head
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[50%] flex flex-row items-center justify-between px-2'>
                            Amount
                            <ChevronsUpDown size={12}/>
                        </li>
                    </ul>

                    {/* Values */}
                    <CommandList>
                        {
                            heads[0]?.head_name === undefined ? (
                                <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b[0.5px] border-[#ccc]'>
                                    No heads
                                </p>
                            ) : heads.map((head:any) => (
                                    <CommandItem key={head._id} className='w-full min-w-[500px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'>
                                        <li className='basis-[25%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{heads.indexOf(head) + 1}</li>
                                        <li className='basis-[25%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.head_name}</li>

                                        {/* Amount */}
                                        <li className='basis-[50%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <FormField
                                                control={form.control}
                                                name={`affiliated_heads.${heads.indexOf(head)}.amount`}
                                                render={({field}) => (
                                                    <FormItem className='w-full'>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='text-xs'/>
                                                </FormItem>
                                                )}
                                            />
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
export default HeadsList;