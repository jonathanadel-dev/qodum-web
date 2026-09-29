// Imports
import {useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/shared/LoadingIcon';





// Main function
const HeadsList = ({selectedStudent, form, heads, setHeads, totalNumberGenerator, isLoadingHeads}:any) => {

    // Toast
    const {toast} = useToast();


    // Conc amount change hadler
    const concAmountChangeHandler = (h:any, v:any) => {

        // Setting number
        if(h.is_percent){
            heads[heads.indexOf(h)].amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => a.conc_amount = v);
            heads[heads.indexOf(h)].amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => a.payable_amount = Number(a.value) - (Number(a.value) * (Number(v) / 100)));
            heads[heads.indexOf(h)].amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => a.paid_amount = Number(a.value) - (Number(a.value) * (Number(v) / 100)))
        }else{
            heads[heads.indexOf(h)].amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => a.conc_amount = v);
            heads[heads.indexOf(h)].amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => a.payable_amount = Number(a.value) - (Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)));
            heads[heads.indexOf(h)].amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => a.paid_amount = Number(a.value) - (Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)));
        };
        setHeads([...heads]);

        // Validations
        heads[heads.indexOf(h)].amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => {
            // Negative number
            if(Number(v) < 0){
                toast({title:'Please enter a number greater than zero ', variant:'alert'});
                a.conc_amount = Number(a.value) - Number(a.last_rec_amount || 0);
                a.paid_amount = 0;
                a.payable_amount = 0;
            };

            // Greater than paid amount validation
            if(Number(a.conc_amount || 0) > (Number(a.value) - Number(a.last_rec_amount || 0))){
                toast({title:'Concession amount cannot be less than the total paid amount', variant:'alert'});
                a.conc_amount = Number(a.value) - Number(a.last_rec_amount || 0);
                a.paid_amount = 0;
                a.payable_amount = 0;
            }
        });

    };


    // Use effects
    useEffect(() => {
        const assignedHeads = selectedStudent?.affiliated_heads?.heads
            // Fee type filter
            ?.filter((h:any) => h.type_name === form.getValues().fees_type || form.getValues().fees_type === 'All fee types')
            // Amounts filter
            ?.filter((h:any) => {
                if(h?.amounts?.length === 1){
                    return form.getValues().installment === h.installment;
                }else{
                    const amounts = h.amounts;
                    return h.installment === 'All installments' && amounts?.filter((a:any) => form.getValues().installment === a.name).length > 0;
                };
            })
            ?.filter((h:any) => h?.amounts?.filter((a:any) => a.name === form.getValues().installment && Number(a?.last_rec_amount ? a?.last_rec_amount : 0) === 0).length > 0)
            ?.map((h:any) => {
                return{
                    ...h,
                    is_percent:h?.amounts?.find((a:any) => a.name === form.getValues().installment)?.is_percent,
                    amounts:h?.amounts?.map((a:any) => {
                        return{
                            ...a,
                            conc_amount:a?.is_percent ? Number(a?.conc_amount || 0) / Number(a?.value || 0) * 100 : Number(a?.conc_amount || 0)
                        }
                    })
                };
            });
        setHeads(assignedHeads);
    }, [selectedStudent, form.watch('fees_type'), form.watch('installment')]);

    return selectedStudent.affiliated_heads?.heads?.length === 0 ? (
        <div className='h-full w-full flex items-center justify-center'/>
    ) : isLoadingHeads ? (
        <div className='h-full w-full flex items-center justify-center'>
            <LoadingIcon />
        </div>
    ) : (
        <div className='w-full h-full overflow-x-scroll custom-sidebar-scrollbar bg-white rounded-[4px]'>
            <div className='w-full h-full min-w-[900px] flex flex-col bg-[#F2F8FA] rounded-[4px]'>

                {/* Headers */}
                <ul className='flex flex-row items-center justify-between bg-[#435680] text-white border-[0.5px] border-[#ccc] rounded-t-[4px]'>
                    <li className='basis-[19.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                        Head
                    </li>
                    <li className='basis-[10%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                        Installment
                    </li>
                    <li className='basis-[10%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                        Actual Amt.
                    </li>
                    <li className='basis-[12.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                        Conc. Amt.
                    </li>
                    <li className='basis-[11.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                        Is Percent
                    </li>
                    <li className='basis-[11.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                        Payable Amt.
                    </li>
                    <li className='basis-[12.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                        Fees Type
                    </li>
                    <li className='basis-[12.5%] text-center text-[11px] font-semibold py-2'>
                        Conc. Type
                    </li>
                </ul>

                {/* Values */}
                {isLoadingHeads ? (
                    <LoadingIcon />
                ) : heads?.length < 1 ? (
                        <p className='pl-2 text-[11px] text-hash-color font-semibold'>No Fees</p>
                    ) : form.getValues().installment !== '' && heads?.map((h:any) => (
                        <ul className={`flex flex-row items-center justify-between border-[0.5px] border-t-[0px] border-[#ccc] ${Math.floor((heads.indexOf(h) + 1) / 2) * 2 !== heads.indexOf(h) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                            <li className='basis-[19.5%] h-full flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px]'>
                                {h.head_name}
                            </li>
                            <li className='basis-[10%] h-full flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                {form.getValues().installment}
                            </li>
                            <li className='basis-[10%] h-full flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] px-2 py-[2px]'>
                                {totalNumberGenerator(h.amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => Number(a.value)))}
                            </li>
                            <li className='basis-[12.5%] h-full flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] p-2'>
                                <Input
                                    type='number'
                                    value={heads[heads.indexOf(h)].amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => a.conc_amount)[0]}
                                    onChange={(e:any) => concAmountChangeHandler(h, e.target.value)}
                                    className='h-7 w-full flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                />
                            </li>
                            <li className='basis-[11.5%] h-full flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                <Checkbox
                                    className='rounded-[2px] text-hash-color'
                                    checked={h.is_percent}
                                    onClick={() => {
                                        heads[heads.indexOf(h)].is_percent = !heads[heads.indexOf(h)].is_percent;
                                        setHeads([...heads]);
                                        concAmountChangeHandler(h, heads[heads.indexOf(h)].amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => a.conc_amount)[0]);
                                    }}
                                />
                            </li>
                            <li className='basis-[11.5%] h-full flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] px-2 py-[2px]'>
                                {totalNumberGenerator(h.amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => Number(a.payable_amount)))}
                            </li>
                            <li className='basis-[12.5%] h-full flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                {h.type_name}
                            </li>
                            <li className='basis-[12.5%] h-full flex items-center justify-center text-hash-color text-[11px] py-2'>
                                {h.amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => a.conc_type)}
                            </li>
                        </ul>
                    ))
                }

                {/* Total */}
                {heads.length > 0 && (
                    <ul className='flex flex-row items-center justify-between bg-[#435680] text-white border-[0.5px] border-t-[0px] border-[#ccc] rounded-b-[4px]'>
                        <li className='basis-[19.5%] h-full flex items-center justify-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                            
                        </li>
                        <li className='basis-[10%] h-full flex items-center justify-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                            Total
                        </li>
                        <li className='basis-[10%] h-full flex items-center justify-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                            {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => Number(a.value)))))}
                        </li>
                        <li className='basis-[12.5%] h-full flex items-center justify-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                            {Math.round(totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => Number(a.conc_amount))))))}
                        </li>
                        <li className='basis-[11.5%] h-full flex items-center justify-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                            
                        </li>
                        <li className='basis-[11.5%] h-full flex items-center justify-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                            {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => form.getValues().installment === a.name).map((a:any) => Number(a.payable_amount)))))}
                        </li>
                        <li className='basis-[12.5%] h-full flex items-center justify-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2 text-white'>
                            
                        </li>
                        <li className='basis-[12.5%] h-full flex items-center justify-center text-[11px] font-semibold py-2'>
                            
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
};






// Export
export default HeadsList;