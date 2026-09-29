// Imports
import {useEffect, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {ChevronDown, ChevronsUpDown} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Command, CommandItem, CommandList} from '@/components/ui/command';
import {fetchBankLedgers} from '@/lib/actions/accounts/accounts/bankLedger.actions';
import {fetchGeneralLedgers} from '@/lib/actions/accounts/accounts/generalLedger.actions';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main Function
const HeadsList = ({heads, form, selectedHeads, setSelectedHeads, selectedAccountLedger, setSelectedAccountLedger, selectedBankLedger, setSelectedBankLedger, installmentError, feeAccountError, feePostAccountError}:any) => {


    // Installments
    const [installments, setInstallments] = useState([{}]);


    // Account ledgers
    const [accountLedgers, setAccountLedgers]  = useState([{}]);


    // Bank ledgers
    const [bankLedgers, setBankLedgers]  = useState([{}]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const installmentsRes = await fetchInstallments();
            const accountLedgersRes = await fetchGeneralLedgers();
            const bankLedgersRes = await fetchBankLedgers();
            setInstallments(installmentsRes);
            setAccountLedgers(accountLedgersRes)
            setBankLedgers(bankLedgersRes);
        };
        fetcher();
    }, []);
    useEffect(() => {}, [form.watch('affiliated_heads')]);


    return (
        <Command
            className='w-[90%] max-h-[70%] flex flex-col items-center pb-2 gap-2 rounded-[2px] border-[0.5px] border-[#E8E8E8] '
        >
    
            <div className='w-full h-full flex flex-col items-center bg-[#F1F1F1]'>

                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[1100px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[7.5%] flex flex-row items-center justify-between p-3 border-r-[0.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Select
                            {heads[0]?.name && (
                                <Checkbox
                                    className='rounded-[2px] text-hash-color'
                                    checked={selectedHeads.length === heads.length}
                                    onCheckedChange={() => {
                                        if(selectedHeads.length === heads.length){
                                            setSelectedHeads([]);
                                        }else{
                                            setSelectedHeads(heads.map((head:any) => {
                                                return {
                                                    type_name:head.affiliated_fee_type,
                                                    head_name:head.name,
                                                    schedule_type:head.pay_schedule,
                                                    installment:head.pay_schedule === 'installment' ? 'All installments' : '',
                                                    account:'',
                                                    post_account:'',
                                                    fee_type:head.type,
                                                    priority_no:head.priority_no
                                                };
                                            }));
                                        };
                                    }}
                                />
                            )}
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[13.5%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Fee Type
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Fee Head
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[11%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Schedule Type
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Installment
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-col p-2 border-r-[0.5px] border-[#ccc]'>
                            Fee Account
                            <Select
                                onValueChange={v => {
                                    setSelectedAccountLedger(v);
                                    setSelectedHeads(selectedHeads.map((head:any) => {
                                        return{
                                            type_name:head.type_name,
                                            head_name:head.head_name,
                                            schedule_type:head.schedule_type,
                                            installment:head.installment,
                                            account:v,
                                            post_account:head.post_account,
                                            fee_type:head.fee_type,
                                            priority_no:head.priority_no
                                        };
                                    }));
                                }}
                                value={selectedAccountLedger}
                            >
                                <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                    <SelectValue placeholder='Select Account'/>
                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                </SelectTrigger>
                                <SelectContent>
                                    {accountLedgers.length < 1 ? (
                                        <p>No account ledgers</p>
                                        // @ts-ignore
                                    ) : !accountLedgers[0]?.account_name ? (
                                        <LoadingIcon />
                                    ) : accountLedgers.map((ledger:any) => (
                                        <SelectItem value={ledger.account_name} key={ledger._id}>{ledger.account_name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </li>
                        <li className='basis-[15%] flex flex-col p-2'>
                            Fee Post Account
                            <Select
                                onValueChange={v => {
                                    setSelectedBankLedger(v);
                                    setSelectedHeads(selectedHeads.map((head:any) => {
                                        return{
                                            type_name:head.type_name,
                                            head_name:head.head_name,
                                            schedule_type:head.schedule_type,
                                            installment:head.installment,
                                            account:head.account,
                                            post_account:v,
                                            fee_type:head.fee_type,
                                            priority_no:head.priority_no
                                        };
                                    }));
                                }}
                                value={selectedBankLedger}
                            >
                                <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                    <SelectValue placeholder='Select Post Acc.'/>
                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                </SelectTrigger>
                                <SelectContent>
                                    {bankLedgers.length < 1 ? (
                                        <p>No bank ledgers</p>
                                        // @ts-ignore
                                    ) : bankLedgers[0]?.account_name === '' ? (
                                        <LoadingIcon />
                                    ) : bankLedgers.map((ledger:any) => (
                                        <SelectItem value={ledger.account_name} key={ledger._id}>{ledger.account_name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </li>
                    </ul>




















                    {/* Values */}
                    <CommandList>
                        {
                            heads.length < 1 ? (
                                // <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b[0.5px] border-[#ccc]'>
                                <p className={`w-full min-w-[1100px] flex flex-row p-2 text-sm border-b[0.5px] border-[#ccc]`}>
                                    No heads yet
                                </p>
                            ) : !heads[0]?.name ? (
                                    <LoadingIcon />
                                ) : heads.map((head:any) => (
                                    <CommandItem key={head._id} className={`w-full min-w-[1100px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((heads.indexOf(head) + 1) / 2) * 2 !== heads.indexOf(head) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                                        <li className='basis-[7.5%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{heads.indexOf(head) + 1}</li>
                                        <li className='basis-[10%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <Checkbox
                                                checked={selectedHeads.map((h:any) => h.head_name).includes(head.name)}
                                                onCheckedChange={() => {
                                                    if(selectedHeads.map((h:any) => h.head_name).includes(head.name)){
                                                        setSelectedHeads(selectedHeads.filter((h:any) => h.head_name !== head.name));
                                                    }else{
                                                        setSelectedHeads([...selectedHeads, {
                                                            type_name:head.affiliated_fee_type,
                                                            head_name:head.name,
                                                            schedule_type:head.pay_schedule,
                                                            installment:head.pay_schedule === 'installment' ? 'All installments' : '',
                                                            account:'',
                                                            post_account:'',
                                                            fee_type:head.type,
                                                            priority_no:head.priority_no
                                                        }]);
                                                    };
                                                }}
                                                className='rounded-[2px] text-hash-color'
                                            />
                                        </li>
                                        <li className='basis-[13.5%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.affiliated_fee_type}</li>
                                        <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.name}</li>
                                        <li className='basis-[11%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.pay_schedule}</li>

                                        {/* Installment */}
                                        <li className='basis-[15%] flex flex-col items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <Select
                                                onValueChange={v => {
                                                    if(selectedHeads.map((h:any) => h.head_name).includes(head.name)){
                                                        selectedHeads[selectedHeads.map((h:any) => h.head_name).indexOf(head.name)].installment = v;
                                                        setSelectedHeads([...selectedHeads]);
                                                    }
                                                }}
                                                value={heads[heads.indexOf(head)].pay_schedule === 'installment' ? 'All installments' : selectedHeads[selectedHeads.map((h:any) => h.head_name).indexOf(head.name)]?.installment}
                                                disabled={heads[heads.indexOf(head)].pay_schedule === 'installment'}
                                            >
                                                <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                    <SelectValue placeholder='Select Install'/>
                                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {installments.length < 1 ? (
                                                        <p>No installments</p>
                                                        // @ts-ignore
                                                    ) : installments[0]?.name === '' ? (
                                                        <LoadingIcon />
                                                    ) : installments.map((installment:any) => (
                                                        <SelectItem value={installment.name} key={installment._id}>{installment.name}</SelectItem>
                                                    ))}
                                                    {heads[heads.indexOf(head)].pay_schedule === 'installment' && (
                                                        <SelectItem value='All installments'>All installments</SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {installmentError && selectedHeads[selectedHeads.indexOf(selectedHeads.find((sh:any) => sh.head_name === head.name))]?.installment === '' &&  <span className='text-[10px] text-[#F0343A]'>Select Installment</span>}
                                        </li>

                                        {/* Fee account */}
                                        <li className='basis-[15%] flex flex-col items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <Select
                                                onValueChange={v => {
                                                    if(selectedHeads.map((h:any) => h.head_name).includes(head.name)){
                                                        selectedHeads[selectedHeads.map((h:any) => h.head_name).indexOf(head.name)].account = v;
                                                        setSelectedHeads([...selectedHeads]);
                                                    }
                                                }}
                                                value={selectedHeads[selectedHeads.map((h:any) => h.head_name).indexOf(head.name)]?.account}
                                            >
                                                <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                    <SelectValue placeholder={selectedAccountLedger ? selectedAccountLedger : 'Select Account'}/>
                                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {accountLedgers.length < 1 ? (
                                                        <p>No account ledgers</p>
                                                        // @ts-ignore
                                                    ) : accountLedgers[0]?.account_name === '' ? (
                                                        <LoadingIcon />
                                                    ) : accountLedgers.map((ledger:any) => (
                                                        <SelectItem value={ledger.account_name} key={ledger._id}>{ledger.account_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {feeAccountError && selectedHeads[selectedHeads.indexOf(selectedHeads.find((sh:any) => sh.head_name === head.name))]?.account === '' &&  <span className='text-[10px] text-[#F0343A]'>Select Account</span>}
                                        </li>

                                        {/* Fee post account */}
                                        <li className='basis-[15%] flex flex-col items-center px-2'>
                                            <Select
                                                onValueChange={v => {
                                                    if(selectedHeads.map((h:any) => h.head_name).includes(head.name)){
                                                        selectedHeads[selectedHeads.map((h:any) => h.head_name).indexOf(head.name)].post_account = v;
                                                        setSelectedHeads([...selectedHeads]);
                                                    }
                                                }}
                                                value={selectedHeads[selectedHeads.map((h:any) => h.head_name).indexOf(head.name)]?.post_account}
                                            >
                                                <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                    <SelectValue placeholder={selectedBankLedger ? selectedBankLedger : 'Select Post Acc.'}/>
                                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {bankLedgers.length < 1 ? (
                                                        <p>No bank ledgers</p>
                                                        // @ts-ignore
                                                    ) : bankLedgers[0]?.account_name === '' ? (
                                                        <LoadingIcon />
                                                    ) : bankLedgers.map((ledger:any) => (
                                                        <SelectItem value={ledger.account_name} key={ledger._id}>{ledger.account_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {feePostAccountError && selectedHeads[selectedHeads.indexOf(selectedHeads.find((sh:any) => sh.head_name === head.name))]?.post_account === '' &&  <span className='text-[10px] text-[#F0343A]'>Select Post A/C</span>}
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