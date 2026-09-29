// Imports
import {useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {fetchClassDueLimit} from '@/lib/actions/fees/masterSettings/dueLimit.actions';





// Main function
const HeadsList = ({selectedStudent, selectedInstallments, setTotalPaidAmount, form, heads, setHeads, totalNumberGenerator, setIsConcession, isLoadingHeads}:any) => {


    // Toast
    const {toast} = useToast();


    // Conc amount change hadler
    const concAmountChangeHandler = (h:any, v:any) => {

        // Setting concession reason
        Number(v) > 0 && setIsConcession(true);
        Number(v) === 0 && setIsConcession(false);

        // Setting number
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.conc_amount = v);
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.payable_amount = Number(a.value) - (Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)));
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = Number(a.value) - (Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)));
        setHeads([...heads]);
        setTotalPaidAmount(totalNumberGenerator(heads.map((head:any) => totalNumberGenerator(head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
        form.setValue('total_paid_amount', totalNumberGenerator(
            heads.map((head:any) => totalNumberGenerator(
                head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - ((Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0))))
            ))
        ));

        // Validations
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => {
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

            // Total paid
            setTotalPaidAmount(totalNumberGenerator(heads.map((head:any) => totalNumberGenerator(head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
        });
    };


    // Paid amount change hadler
    const paidAmountChangeHandler = (h:any, v:any) => {

        // Setting number
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = v);
        setHeads([...heads]);

        // Validations
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => {
            // Negative number validation
            if(Number(v) < 0){
                toast({title:'Please enter a number greater than zero ', variant:'alert'});
                a.paid_amount = Number(a.value) - ((Number(a.conc_amount) + Number(a.last_rec_amount)));
            };

            // Greater than payable amount validation
            if(Number(a.paid_amount) > Number(a.value) - ((Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)))){
                toast({title:'Paid amount cannot be greater than payable amount', variant:'alert'});
                a.paid_amount = Number(a.value) - ((Number(a.conc_amount) + Number(a.last_rec_amount)));
            }
            setTotalPaidAmount(totalNumberGenerator(heads.map((head:any) => totalNumberGenerator(head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
        });
    };





    // Conc amount change hadler (for multiple installments)
    const concAmountChangeHandlerForMultipleiInstallments = (h:any, v:any, i:any) => {

        // Setting conc number
        heads[heads.indexOf(h)].amounts.filter((a:any) => a.name === i).map((a:any) => a.conc_amount = v);
        heads[heads.indexOf(h)].amounts.filter((a:any) => a.name === i).map((a:any) => a.payable_amount = a.value - (Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)));
        heads[heads.indexOf(h)].amounts.filter((a:any) => a.name === i).map((a:any) => a.paid_amount = a.value - (Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)));
        setHeads([...heads]);
        form.setValue('total_paid_amount', totalNumberGenerator(
            heads.map((head:any) => totalNumberGenerator(
                head.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))
            ))
        ));


        // Validations
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => {
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

            // Total paid
            setTotalPaidAmount(totalNumberGenerator(heads.map((head:any) => totalNumberGenerator(head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
        });
    };


    // Paid amount change hadler (for multiple installments)
    const paidAmountChangeHandlerForMultipleiInstallments = (h:any, v:any, i:any) => {

        // Setting paid amount
        heads[heads.indexOf(h)].amounts.filter((a:any) => a.name === i).map((a:any) => a.paid_amount = v);
        setHeads([...heads]);

        // Validations
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => {
            // Negative number validation
            if(Number(v) < 0){
                toast({title:'Please enter a number greater than zero ', variant:'alert'});
                a.paid_amount = Number(a.value) - ((Number(a.conc_amount) + Number(a.last_rec_amount)));
            };

            // Greater than payable amount validation
            if(Number(a.paid_amount) > Number(a.value) - ((Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)))){
                toast({title:'Paid amount cannot be greater than payable amount', variant:'alert'});
                a.paid_amount = Number(a.value) - ((Number(a.conc_amount) + Number(a.last_rec_amount)));
            }
            setTotalPaidAmount(totalNumberGenerator(heads.map((head:any) => totalNumberGenerator(head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
        });
    };


    // Installmemt conc amount change hadler
    const installmentConcAmountChangeHandler = (i:any, v:any) => {

        // Setting concession reason
        const inputValue = Number(v);
        inputValue > 0 && setIsConcession(true);


        // Loop
        if(inputValue !== undefined){
            const filteredHeads = heads.filter((h:any) => h.amounts.map((a:any) => a.name).includes(i));
            const installmentValues = filteredHeads.map((h:any) => h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value))[0]).filter((n:any) => n);

            if(inputValue > totalNumberGenerator(installmentValues)){
                filteredHeads.filter((h:any) => h.amounts.map((a:any) => a.name !== i)).map((h:any) => {
                    concAmountChangeHandlerForMultipleiInstallments(h, v, i);
                });
            }else{
                if(inputValue <= Number(installmentValues[0])){
                    // First amount
                    concAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], inputValue, i);
                    filteredHeads[1] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], 0, i);
                    filteredHeads[2] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], 0, i);
                    filteredHeads[3] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], 0, i);
                    filteredHeads[4] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                    filteredHeads[5] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                }else{
                    const availableAmount = inputValue - Number(installmentValues[0]);
                    if(availableAmount <= Number(installmentValues[1])){
                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                        // Second amount
                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], availableAmount, i);
                        filteredHeads[2] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], 0, i);
                        filteredHeads[3] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], 0, i);
                        filteredHeads[4] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                        filteredHeads[5] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                    }else{
                        const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]));
                        if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]))){
                            concAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                            concAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                            // Third amount
                            filteredHeads[2] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], availableAmount, i);
                            filteredHeads[3] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], 0, i);
                            filteredHeads[4] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                            filteredHeads[5] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                        }else{
                            const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]));
                            if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]))){
                                concAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                                concAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                                concAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], Number(installmentValues[2]), i);
                                // Fourth amount
                                filteredHeads[3] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], availableAmount, i);
                                filteredHeads[4] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                                filteredHeads[5] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                            }else{
                                const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]));
                                if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]))){
                                    concAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                                    concAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                                    concAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], Number(installmentValues[2]), i);
                                    concAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], Number(installmentValues[3]), i);
                                    // Fifth amount
                                    filteredHeads[4] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], availableAmount, i);
                                    filteredHeads[5] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                                }else{
                                    const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]) + Number(installmentValues[4]));
                                    if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]) + Number(installmentValues[4]))){
                                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], Number(installmentValues[2]), i);
                                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], Number(installmentValues[3]), i);
                                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], Number(installmentValues[4]), i);
                                        // Sixth amount
                                        filteredHeads[5] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], availableAmount, i);
                                    };
                                }
                            }
                        }
                    }
                }
            };

        };
    };


    // Installmemt paid amount change hadler
    const installmentPaidAmountChangeHandler = (i:any, v:any) => {
        const inputValue = Number(v);
        if(inputValue !== undefined){
            const filteredHeads = heads.filter((h:any) => h.amounts.map((a:any) => a.name).includes(i));
            const installmentValues = filteredHeads.map((h:any) => h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value))[0]).filter((n:any) => n);

            if(inputValue > totalNumberGenerator(installmentValues)){
                filteredHeads.filter((h:any) => h.amounts.map((a:any) => a.name !== i)).map((h:any) => {
                    paidAmountChangeHandlerForMultipleiInstallments(h, v, i);
                });
            }else{
                if(inputValue <= Number(installmentValues[0])){
                    // First amount
                    paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], inputValue, i);
                    filteredHeads[1] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], 0, i);
                    filteredHeads[2] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], 0, i);
                    filteredHeads[3] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], 0, i);
                    filteredHeads[4] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                    filteredHeads[5] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                }else{
                    const availableAmount = inputValue - Number(installmentValues[0]);
                    if(availableAmount <= Number(installmentValues[1])){
                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                        // Second amount
                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], availableAmount, i);
                        filteredHeads[2] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], 0, i);
                        filteredHeads[3] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], 0, i);
                        filteredHeads[4] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                        filteredHeads[5] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                    }else{
                        const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]));
                        if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]))){
                            paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                            paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                            // Third amount
                            filteredHeads[2] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], availableAmount, i);
                            filteredHeads[3] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], 0, i);
                            filteredHeads[4] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                            filteredHeads[5] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                        }else{
                            const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]));
                            if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]))){
                                paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                                paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                                paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], Number(installmentValues[2]), i);
                                // Fourth amount
                                filteredHeads[3] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], availableAmount, i);
                                filteredHeads[4] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                                filteredHeads[5] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                            }else{
                                const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]));
                                if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]))){
                                    paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                                    paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                                    paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], Number(installmentValues[2]), i);
                                    paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], Number(installmentValues[3]), i);
                                    // Fifth amount
                                    filteredHeads[4] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], availableAmount, i);
                                    filteredHeads[5] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                                }else{
                                    const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]) + Number(installmentValues[4]));
                                    if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]) + Number(installmentValues[4]))){
                                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], Number(installmentValues[2]), i);
                                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], Number(installmentValues[3]), i);
                                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], Number(installmentValues[4]), i);
                                        // Sixth amount
                                        filteredHeads[5] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], availableAmount, i);
                                    };
                                }
                            }
                        }
                    }
                }
            };

        };
    };





    // Use effects
    useEffect(() => {

        const assignedHeads = selectedStudent?.affiliated_heads?.heads
            // Fee type filter
            ?.filter((h:any) => h.type_name === form.getValues().fee_type || form.getValues().fee_type === 'All fee types')
            // Amounts filter
            ?.filter((h:any) => {
                if(h?.amounts?.length === 1){
                    return selectedInstallments.includes(h.installment);
                }else{
                    const amounts = h.amounts;
                    return h.installment === 'All installments' && amounts?.filter((a:any) => selectedInstallments.includes(a.name)).length > 0;
                };
            })
            // Late fee filter
            ?.filter((h:any) => {
                if(h?.due_date){
                    return h?.due_date < form.getValues().received_date;
                }else{
                    return h;
                }
            })
            // Late fee amount setting
            ?.map((h:any) => {
                if(h.fee_type === 'fine'){

                    const date1 = form.getValues().received_date.getTime();
                    const date2 = h?.due_date.getTime();
                    const diffTime = Math.abs(date2 - date1);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    h?.amounts?.map(async (a:any) => {
                        const dueAmount = Number(a.value) * diffDays;
                        const dueAmountLimit = await fetchClassDueLimit({class_name:selectedStudent.class});
                        const dueAmountNumber = dueAmountLimit?.dues_amount;
                        a.value = Number(dueAmount) < Number(dueAmountNumber) ? Number(dueAmount) : Number(dueAmountNumber);
                    });

                    return h;
                }else{
                    return h;
                }
            });
        setHeads(assignedHeads)?.sort((a:any, b:any) => a.priority_no - b.priority_no);
        form.setValue('total_paid_amount', totalNumberGenerator(assignedHeads.map((h:any) => totalNumberGenerator(h?.amounts?.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount)))))));
        setTotalPaidAmount(totalNumberGenerator(assignedHeads.map((h:any) => totalNumberGenerator(h?.amounts?.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
    }, [selectedInstallments, selectedStudent, form.watch('fee_type'), form.watch('received_date')]);
    useEffect(() => {
        setTotalPaidAmount(totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h?.amounts?.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
    }, [heads]);


    return selectedStudent.affiliated_heads?.heads?.length === 0 ? (
        <div className='h-full w-full flex items-center justify-center'/>
    ) : isLoadingHeads ? (
        <div className='h-full w-full flex items-center justify-center'>
            <LoadingIcon />
        </div>
    ) : (
        <div className='w-full h-full overflow-x-scroll custom-sidebar-scrollbar bg-[#F2F8FA] rounded-[4px]'>
            <div className='w-full h-[110%] min-w-[750px] flex flex-col bg-[#F2F8FA] rounded-[4px]'>
                {selectedInstallments.length === 1 ? (
                    <>
                        {/* Headers */}
                        <ul className='flex flex-row items-center justify-between bg-[#435680] text-white border-[0.5px] border-[#ccc] rounded-t-[4px]'>
                            <li className='basis-[19.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Head
                            </li>
                            <li className='basis-[10%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Actual Amt.
                            </li>
                            <li className='basis-[10%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Conc. Amt.
                            </li>
                            <li className='basis-[12.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Last Rec. Amt.
                            </li>
                            <li className='basis-[11.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Payable Amt.
                            </li>
                            <li className='basis-[11.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Paid Amt.
                            </li>
                            <li className='basis-[12.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Fees Type
                            </li>
                            <li className='basis-[12.5%] text-center text-[11px] font-semibold py-2'>
                                Pay Schedule
                            </li>
                        </ul>
        
                        {/* Values */}
                        {isLoadingHeads ? (
                            <LoadingIcon />
                        ) : heads?.filter((h:any) => selectedInstallments.includes(h.installment) || h.installment === 'All installments')?.length < 1 ? (
                                <p className='pl-2 text-[11px] text-hash-color font-semibold'>No Fees</p>
                            ) : selectedInstallments.length > 0 && heads.filter((h:any) => selectedInstallments.includes(h.installment) || h.installment === 'All installments').map((h:any) => (
                                <ul className={`flex flex-row items-center justify-between border-[0.5px] border-t-[0px] border-[#ccc] ${Math.floor((heads.indexOf(h) + 1) / 2) * 2 !== heads.indexOf(h) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                                    <li className='basis-[19.5%] text-start pl-2 text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {h.head_name}
                                    </li>
                                    <li className='basis-[10%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value)))}
                                    </li>
                                    <li className='basis-[10%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] px-2 py-[2px]'>
                                        <Input
                                            type='number'
                                            value={heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.conc_amount)[0]}
                                            onChange={(e:any) => concAmountChangeHandler(h, e.target.value)}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                        />
                                    </li>
                                    <li className='basis-[12.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.last_rec_amount)))}
                                    </li>
                                    <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.payable_amount)))}
                                    </li>
                                    <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] px-2 py-[2px]'>
                                        <Input
                                            type='number'
                                            value={heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount)[0]}
                                            onChange={(e:any) => paidAmountChangeHandler(h, e.target.value)}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                        />
                                    </li>
                                    <li className='basis-[12.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {h.type_name}
                                    </li>
                                    <li className='basis-[12.5%] text-center text-hash-color text-[11px] py-2'>
                                        {h.schedule_type}
                                    </li>
                                </ul>
                            ))
                        }
        
                        {/* Total */}
                        {heads.length > 0 && (
                            <ul className={`flex flex-row items-center justify-between border-[0.5px] border-t-[0px] border-[#ccc] rounded-b-[4px] ${Math.floor((heads.length + 1) / 2) * 2 !== heads.length + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                                <li className='basis-[19.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    Total
                                </li>
                                <li className='basis-[10%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value)))))}
                                </li>
                                <li className='basis-[10%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.conc_amount)))))}
                                </li>
                                <li className='basis-[12.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.last_rec_amount)))))}
                                </li>
                                <li className='basis-[11.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.payable_amount)))))}
                                </li>
                                <li className='basis-[11.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount)))))}
                                </li>
                                <li className='basis-[12.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2 text-white'>
                                    
                                </li>
                                <li className='basis-[12.5%] text-center text-[11px] font-semibold py-2'>
                                    
                                </li>
                            </ul>
                        )}
                    </>
                ) : (
                        <>
                            <ul className='flex flex-row items-center justify-between bg-[#435680] text-white border-[0.5px] border-[#ccc] rounded-t-[4px]'>
                                <li className='basis-[11%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    Installment
                                </li>
                                <li className='basis-[16.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    Actual Amt.
                                </li>
                                <li className='basis-[17.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    Conc. Amt.
                                </li>
                                <li className='basis-[20%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    Last Rec. Amt.
                                </li>
                                <li className='basis-[18.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    Payable Amt.
                                </li>
                                <li className='basis-[16.5%] text-center text-[11px] font-semibold py-2'>
                                    Paid Amt.
                                </li>
                            </ul>
            
                            {/* Values */}
                            {selectedInstallments.map((i:any) => (
                                    <ul className={`flex flex-row items-center justify-between border-[0.5px] border-t-[0px] border-[#ccc] ${Math.floor((selectedInstallments.indexOf(i) + 1) / 2) * 2 !== selectedInstallments.indexOf(i) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                                        <li className='basis-[11%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                            {i}
                                        </li>
                                        <li className='basis-[16.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                            {totalNumberGenerator(heads.filter((h:any) => h.amounts.map((a:any) => a.name).includes(i)).map((h:any) => h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value))[0]).filter((n:any) => n))}
                                        </li>
                                        <li className='basis-[17.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] px-2 py-[2px]'>
                                            <Input
                                                type='number'
                                                onChange={(e:any) => installmentConcAmountChangeHandler(i, e.target.value)}
                                                value={totalNumberGenerator(heads.filter((h:any) => h.amounts.map((a:any) => a.name === i)).map((h:any) => h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.conc_amount))[0]).filter((n:any) => n))}
                                                className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </li>
                                        <li className='basis-[20%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                            {totalNumberGenerator(heads.filter((h:any) => h.amounts.map((a:any) => a.name).includes(i)).map((h:any) => h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.last_rec_amount))[0]).filter((n:any) => n))}
                                        </li>
                                        <li className='basis-[18.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                            {totalNumberGenerator(heads.filter((h:any) => h.amounts.map((a:any) => a.name).includes(i)).map((h:any) => h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount)))[0]).filter((n:any)  => n))}
                                        </li>
                                        <li className='basis-[16.5%] text-center text-hash-color text-[11px] px-2 py-[2px]'>
                                            <Input
                                                type='number'
                                                value={totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.paid_amount)))))}
                                                onChange={(e:any) => installmentPaidAmountChangeHandler(i, e.target.value)}
                                                className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </li>
                                    </ul>
                                ))
                            }

                            {/* Total */}
                            {heads.length > 0 && (
                                <ul className={`flex flex-row items-center justify-between border-[0.5px] border-t-[0px] border-[#ccc] rounded-b-[4px] ${Math.floor((selectedInstallments.length + 1) / 2) * 2 !== selectedInstallments.length + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                                    <li className='basis-[11%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                        Total
                                    </li>
                                    <li className='basis-[16.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                        {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value)))))}
                                    </li>
                                    <li className='basis-[17.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                        {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.conc_amount)))))}
                                    </li>
                                    <li className='basis-[20%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                        0
                                    </li>
                                    <li className='basis-[18.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                        {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount))))))}
                                    </li>
                                    <li className='basis-[16.5%] text-center text-[11px] font-semibold py-2'>
                                        {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount)))))}
                                    </li>
                                </ul>
                            )}
                        </>
                    )
                }
            </div>
        </div>
    )
};






// Export
export default HeadsList;