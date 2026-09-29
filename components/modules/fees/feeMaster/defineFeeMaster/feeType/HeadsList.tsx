// Imports
import {useEffect, useState} from 'react';
import {ChevronsUpDown} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {FormControl, FormField, FormItem} from '@/components/ui/form';
import {Command, CommandItem, CommandList} from '@/components/ui/command';
import {fetchHeads} from '@/lib/actions/fees/feeMaster/feeMaster/head.actions';





// Main Function
const HeadsList = ({heads, updateType, form, isSubmitLoading}: any) => {


    // All heads
    const [allHeads, setAllHeads] = useState([{}]);
    
    
    // Use effect
    useEffect(() => {
        const headsFetcher = async () => {
            const res = await fetchHeads();
            setAllHeads(res.filter((h:any) => h.affiliated_fee_type === '' || h.affiliated_fee_type === updateType.name).map((h) => h.name));
        };
        headsFetcher();
    }, []);
    useEffect(() => {}, [form.watch('heads')]);


    return (
        <Command
            className='w-[80%] max-h-[90%] flex flex-col items-center pb-2 gap-2 mt-4 rounded-[8px] border-[0.5px] border-[#E8E8E8] lg:w-[100%] lg:mt-0'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-center w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Heads List</h2>
            </div>
            <div className='w-[95%] h-[90%] flex flex-col items-center bg-[#F1F1F1] rounded-[8px]'>


                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[300px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[30%] flex-grow flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Head Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[30%] flex flex-row items-center justify-center gap-4 px-2'>
                            Select
                            {updateType.id === '' ? heads.length > 0 && (
                                <Checkbox
                                    checked={form.getValues().heads.length === heads.length}
                                    onClick={() => {
                                        if(form.getValues().heads.length === heads.length){
                                            form.setValue('heads', []);
                                        }else{
                                            form.setValue('heads', heads);
                                        };
                                    }}
                                    className='rounded-[2px] text-hash-color my-[2px]'
                                />
                            ) : allHeads.length > 0 && (
                                <Checkbox
                                    checked={form.getValues().heads.length === allHeads.length}
                                    onClick={() => {
                                        if(form.getValues().heads.length === allHeads.length){
                                            form.setValue('heads', []);
                                        }else{
                                            form.setValue('heads', allHeads);
                                        };
                                    }}
                                    className='rounded-[2px] text-hash-color my-[2px]'
                                />
                            )}
                        </li>

                    </ul>
                    {/* Values */}
                    <CommandList>
                        {
                            isSubmitLoading ? (
                                <LoadingIcon />
                            ) : updateType.id === '' ?
                                // Free heads 
                                heads.length < 1 ? (
                                    <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-[0.5px] border-[#ccc]'>
                                        No heads yet
                                    </p>
                                ) : typeof(heads[0]) !== 'string' ? (
                                    <LoadingIcon />
                                ) : heads.map((head: any, index: number) => (
                                    <CommandItem
                                        key={index}
                                        value={`${heads.indexOf(head) + 1} `}
                                        className='w-full min-w-[300px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                    >
                                        <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{heads.indexOf(head) + 1}</li>
                                        <li className='basis-[30%] flex-grow flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            { `${head}`}
                                        </li>
                                        <li className='basis-[30%] flex flex-row items-center px-2 border-[#ccc]'>
                                            <FormField
                                                control={form.control}
                                                name="heads"
                                                render={({ field }: any) => { 
                                                    return (
                                                        <FormItem 
                                                        key={head}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(head)}
                                                                    onCheckedChange={(checked: any) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, head])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value: any) => value !== head
                                                                                )
                                                                            )
                                                                    }}
                                                                    className='rounded-[2px] text-hash-color my-[2px]'
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        </li>

                                    </CommandItem>
                                )) :
                                // All heads
                                allHeads.length < 1 ? (
                                    <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-[0.5px] border-[#ccc]'>
                                        No heads yet
                                    </p>
                                ) : typeof(allHeads[0]) !== 'string' ? (
                                    <LoadingIcon />
                                ) : allHeads.map((head: any, index: number) => (
                                    <CommandItem
                                        key={index}
                                        value={`${heads.indexOf(head) + 1} `}
                                        className='w-full min-w-[300px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                    >
                                        <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{allHeads.indexOf(head) + 1}</li>
                                        <li className='basis-[30%] flex-grow flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            { `${head}`}
                                        </li>
                                        <li className='basis-[30%] flex flex-row items-center px-2 border-[#ccc]'>
                                            <FormField
                                                control={form.control}
                                                name="heads"
                                                render={({ field }: any) => { 
                                                    return (
                                                        <FormItem 
                                                        key={head}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl >
                                                
                                                                <Checkbox
                                                                    checked={field.value?.includes(head)}
                                                                    onCheckedChange={(checked: any) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, head])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value: any) => value !== head
                                                                                )
                                                                            )
                                                                    }}
                                                                    className='rounded-[2px] text-hash-color my-[2px]'
                                                                />

                                                            </FormControl>
                                                        </FormItem>
                                                    )
                                                }}
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