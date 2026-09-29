// Imports
import {format} from 'date-fns';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {CalendarIcon, ChevronDown} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {FormControl, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {fetchBankLedgers} from '@/lib/actions/accounts/accounts/bankLedger.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const DDDetails = ({ddDetails, setddDetails}:any) => {


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


    // Bank ledgers
    const [bankLedgers, setBankLedgers] = useState([{}]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchBankLedgers();
            setBankLedgers(res);
        };
        fetcher();
    }, []);


    return (
        <div className='flex flex-col'>
            {/* DD No. */}
            <FormItem className='w-full'>
                <div className='relative flex flex-col'>
                    <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>DD No.</FormLabel>
                    <FormControl>
                        <Input
                            value={ddDetails.dd_no}
                            onChange={(e:any) => setddDetails({...ddDetails, cheque_no:e.target.value})}
                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                        />
                    </FormControl>
                    <FormMessage className='absolute w-[120%] top-[100%] left-0 text-[11px]'/>
                </div>
            </FormItem>
            {/* DD Date */}
            <div className='flex flex-col'>
                <p className='text-xs text-hash-color'>DD Date</p>
                <Popover open={isCalendarOpened === 'dob'} onOpenChange={() => isCalendarOpened === 'dob' ? setIsCalendarOpened('') : setIsCalendarOpened('dob')}>
                    <PopoverTrigger asChild className='h-7'>
                        <Button
                            variant='outline'
                            className='flex flex-row items-center w-full text-[11px] bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                        >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {
                                ddDetails.dd_date
                                        ? <span>{format(ddDetails.dd_date, 'PPP')}</span>
                                        : <span>Pick a date</span>
                            }
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto'>
                        <Calendar
                            mode='single'
                            selected={ddDetails.dd_date}
                            onSelect={(v:any) => {setIsCalendarOpened('');setddDetails({...ddDetails, dd_date:v})}}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            {/* DD Bank */}
            <FormItem className='w-full'>
                <div className='flex flex-col'>
                    <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>DD Bank</FormLabel>
                    <Select
                        value={ddDetails.dd_bank}
                        onValueChange={(v:any) => setddDetails({...ddDetails, dd_bank:v})}
                    >
                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='Select Bank'>Select Bank</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </FormItem>
            {/* Branch Name */}
            <FormItem className='w-full'>
                <div className='relative flex flex-col'>
                    <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Branch Name</FormLabel>
                    <FormControl>
                        <Input
                            value={ddDetails.branch_name}
                            onChange={(e:any) => setddDetails({...ddDetails, branch_name:e.target.value})}
                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                        />
                    </FormControl>
                    <FormMessage className='absolute w-[120%] top-[100%] left-0 text-[11px]'/>
                </div>
            </FormItem>
            {/* Deposit Bank */}
            <FormItem className='w-full'>
                <div className='flex flex-col'>
                    <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Deposit Bank</FormLabel>
                    <Select
                        value={ddDetails.deposit_bank}
                        onValueChange={(v:any) => setddDetails({...ddDetails, deposit_bank:v})}
                    >
                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </SelectTrigger>
                        <SelectContent>
                            {bankLedgers.length < 1 ? (
                                <p className='text-xs text-hash-color'>No bank ledgers</p>
                            ) : // @ts-ignore
                            !bankLedgers[0]?.account_name ? (
                                <LoadingIcon />
                            ) : bankLedgers.map((m:any) => (
                                <SelectItem value={m.account_name} key={m._id}>{m.account_name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </FormItem>
        </div>
    );
};





// Export
export default DDDetails;