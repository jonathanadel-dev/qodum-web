// Imports
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {ChevronsUpDown} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Command, CommandItem, CommandList} from '@/components/ui/command';





// Main Function
const HeadsList = ({heads, isDataFetching, installments, form}:any) => {


    // Total number
    const [totalNumber, setTotalNumber] = useState(0);


    // Number change
    const numberChange = () => {
        let myNums = heads?.map((head:any) => head?.amounts?.length > 0
            ?
                form.getValues().installment !== 'Select All'
                ?
                    heads[heads.indexOf(head)]?.amounts?.length > 1
                        ?
                            heads[heads.indexOf(head)]?.amounts?.map((amount:any) => Number(amount?.value))[heads[heads.indexOf(head)]?.amounts?.map((amount:any) => amount?.name).indexOf(form.getValues().installment)]
                        :
                            heads[heads.indexOf(head)]?.amounts?.map((amount:any) => amount?.name).includes(form.getValues().installment)
                                ?
                                    heads[heads.indexOf(head)]?.amounts?.map((amount:any) => Number(amount?.value))[0]
                                :
                                    0
                : heads[heads.indexOf(head)]?.amounts?.map((amount:any) => Number(amount?.value))[0]
            :
                [{name:'', value:0}][0].value);
        let sum = 0;
        for (let i = 0; i < myNums?.length; i++ ) {sum += myNums[i];};
        setTotalNumber(sum);
    };


    // New heads creator
    const newHeadsCreator = (head:any, number:any) => {
        if(heads[heads.indexOf(head)].amounts && heads[heads.indexOf(head)].amounts.length > 0 && heads[heads.indexOf(head)]?.amounts?.map((amount:any) => amount?.name).includes(form.getValues().installment)){
            heads[heads.indexOf(head)].amounts.filter((amount:any) => amount.name === form.getValues().installment)[0].value = number || 0;
            return heads[heads.indexOf(head)].amounts;
        }else{
            if(heads[heads.indexOf(head)]?.amounts){
                return [
                    ...heads[heads.indexOf(head)]?.amounts,
                    {
                        name:form.getValues().installment,
                        value:number || 0
                    }
                ];
            }else{
                return [{
                    name:form.getValues().installment,
                    value:number || 0
                }];
            }
        }
    };


    // Use effect
    useEffect(() => {
        numberChange();
    }, [heads]);


    return (
        <Command
            className='max-w-[500px] max-h-[50%] flex flex-col items-center gap-2 rounded-[4px] border-[0.5px] border-[#E8E8E8] overflow-y-scroll custom-sidebar-scrollbar sm:max-h-[70%]'
        >
            
            {/* Header */}
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[4px]'>
                <h2>Group Amount List</h2>
            </div>
            <div className='flex-1 w-full flex flex-col items-center bg-[#F1F1F1]'>

                {/* Heads */}
                <div className='w-full flex flex-col'>
                    {/* Headers */}
                    <ul className='w-full min-w-[300px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[30%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
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
                            isDataFetching ? (
                                <LoadingIcon />
                            ) : heads.length === 0 ? (
                                <p className='w-full min-w-[300px] flex flex-row p-2 text-sm bg-[#E2E4FF] border-b[0.5px] border-[#ccc]'>
                                    No heads
                                </p>                                
                            ) : heads.affiliated_heads && heads.affiliated_heads.length > 0 && heads.affiliated_heads[0] && heads.affiliated_heads[0]?.head_name === '' ? (
                                <p className='w-full min-w-[300px] flex flex-row p-2 text-sm bg-[#E2E4FF] border-b[0.5px] border-[#ccc]'>
                                    No heads
                                </p>
                            ) :  heads.map((head:any) => (
                                    <CommandItem className={`w-full min-w-[300px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((heads.indexOf(head) + 1) / 2) * 2 !== heads.indexOf(head) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                                        <li className='basis-[20%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{heads.indexOf(head) + 1}</li>
                                        <li className='basis-[30%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.head_name}</li>

                                        {/* Amount */}
                                        <li className='basis-[50%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <Input
                                                onBlurCapture={numberChange}
                                                defaultValue={
                                                    form.getValues().installment !== 'Select All'
                                                    ?
                                                        heads[heads.indexOf(head)]?.amounts?.length > 1
                                                            ?
                                                                heads[heads.indexOf(head)]?.amounts?.map((amount:any) => amount?.value)[heads[heads.indexOf(head)]?.amounts?.map((amount:any) => amount?.name).indexOf(form.getValues().installment)] || 0
                                                            :
                                                                heads[heads.indexOf(head)]?.amounts?.map((amount:any) => amount?.name).includes(form.getValues().installment)
                                                                        ?
                                                                            heads[heads.indexOf(head)]?.amounts?.map((amount:any) => amount?.value)[0] || 0
                                                                        :
                                                                            0
                                                    :
                                                        heads[heads.indexOf(head)]?.amounts?.map((amount:any) => amount?.value)[0] || 0
                                                    
                                                }
                                                onChange={(v) => {
                                                    heads[heads.indexOf(head)].amounts =
                                                    form.getValues().installment === 'Select All'
                                                        ?
                                                            head.installment === 'All installments'
                                                                ?
                                                                    installments.map((i:any) => {
                                                                        const amount = {
                                                                            name:i.name,
                                                                            value:v.target.value
                                                                        }
                                                                        return amount;
                                                                    })
                                                                : [{
                                                                    name:head.installment,
                                                                    value:v.target.value
                                                                }]
                                                        : head.installment === 'All installments'
                                                            ?
                                                                newHeadsCreator(head, v.target.value)
                                                            : 
                                                                [{
                                                                    name:head.installment,
                                                                    value:v.target.value
                                                                }]
                                                }}
                                                className='h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </li>
                                    </CommandItem>
                                ))
                        }

                        {/* Total */}
                        {heads.length > 0 && heads[0] && heads[0].head_name !== undefined && (
                            <ul className={`w-full min-w-[300px] flex flex-row text-[10px] font-semibold bg-[#E2E4FF] sm:text-xs md:text-md ${Math.floor((heads.length + 1) / 2) * 2 !== heads.length + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                                <li className='basis-[20%] h-full py-2 flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc] text-[#E2E4FF]'>-</li>
                                <li className='basis-[30%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>Total</li>
                                {/* Amount */}
                                <li className='basis-[50%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                    {totalNumber}
                                </li>
                            </ul>
                        )}
                    </CommandList>
                </div>
            </div>
        </Command>
    );
};





// Export
export default HeadsList;