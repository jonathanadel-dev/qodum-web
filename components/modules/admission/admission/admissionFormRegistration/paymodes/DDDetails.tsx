// Imports
import {format} from 'date-fns';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {CalendarIcon, ChevronDown} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {fetchBankLedgers} from '@/lib/actions/accounts/accounts/bankLedger.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const DDDetails = ({form}:any) => {

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
        <div className='flex flex-col gap-2'>

            {/* DD No. */}
            <FormField
                control={form?.control}
                name='paymode_details.dd_no'
                render={({field}) => (
                    <FormItem className='w-full'>
                        <div className='relative flex flex-row items-center gap-2'>
                            <FormLabel className='basis-[35%] text-end text-[11px] text-[#726E71]'>DD No.</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className='basis-[65%] h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                                />
                            </FormControl>
                            <FormMessage className='absolute w-[120%] top-[100%] left-0 text-[11px]'/>
                        </div>
                    </FormItem>
                )}
            />


            {/* DD Date */}
            <FormField
                control={form?.control}
                name='paymode_details.dd_date'
                render={({field}) => (
                    <div className='flex flex-row items-center gap-2'>
                        <p className='basis-[35%] text-xs text-end text-hash-color'>DD Date</p>
                        <Popover open={isCalendarOpened === 'dob'} onOpenChange={() => isCalendarOpened === 'dob' ? setIsCalendarOpened('') : setIsCalendarOpened('dob')}>
                            <PopoverTrigger asChild className='h-7'>
                                <Button
                                    variant='outline'
                                    className='basis-[65%] flex flex-row items-center w-full text-[11px] bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                                >
                                    <CalendarIcon className='mr-2 h-4 w-4' />
                                    {
                                        form.getValues().paymode_details.dd_date
                                                ? <span>{format(form.getValues().paymode_details.dd_date, 'PPP')}</span>
                                                : <span>Pick a date</span>
                                    }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto'>
                                <Calendar
                                    mode='single'
                                    selected={form.getValues().paymode_details.dd_date}
                                    onSelect={(v:any) => {setIsCalendarOpened('');form.setValue('paymode_details.dd_date', v);}}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
            />


            {/* DD Bank */}
            <FormField
                control={form?.control}
                name='paymode_details.dd_bank'
                render={({field}) => (
                    <FormItem className='w-full'>
                        <div className='flex flex-row items-center gap-2'>
                            <FormLabel className='basis-[35%] w-full text-end text-[11px] text-[#726E71]'>DD Bank</FormLabel>
                            <Select
                                {...field}
                                value={field?.value}
                                onValueChange={field?.onChange}
                            >
                                <SelectTrigger className='basis-[65%] h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='Select Bank'>Select Bank</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </FormItem>
                )}
            />


            {/* Branch Name */}
            <FormField
                control={form?.control}
                name='paymode_details.branch_name'
                render={({field}) => (
                    <FormItem className='w-full'>
                        <div className='relative flex flex-row items-center gap-2'>
                            <FormLabel className='basis-[35%] text-end text-[11px] text-[#726E71]'>Branch Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className='basis-[65%] h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                                />
                            </FormControl>
                            <FormMessage className='absolute w-[120%] top-[100%] left-0 text-[11px]'/>
                        </div>
                    </FormItem>
                )}
            />


            {/* Deposit Bank */}
            <FormField
                control={form?.control}
                name='paymode_details.deposit_bank'
                render={({field}) => (
                    <FormItem className='w-full'>
                        <div className='flex flex-row items-center gap-2'>
                            <FormLabel className='basis-[35%] text-end text-[11px] text-[#726E71]'>Deposit Bank</FormLabel>
                            <Select
                                {...field}
                                value={field?.value}
                                onValueChange={field?.onChange}
                            >
                                <SelectTrigger className='basis-[65%] h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
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
                )}
            />

        </div>
    );
};





// Export
export default DDDetails;