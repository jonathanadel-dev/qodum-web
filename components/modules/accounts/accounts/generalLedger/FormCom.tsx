'use client';
// Imports
import * as z from 'zod';
import {format} from 'date-fns';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {ChevronDown, Calendar as CalendarIcon} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {GeneralLedgerValidation} from '@/lib/validations/accounts/accounts/generalLedger.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createGeneralLedger, deleteGeneralLedger, modifyGeneralLedger} from '@/lib/actions/accounts/accounts/generalLedger.actions';





// Main function
const FormCom = ({setIsViewOpened, generalLedgers, updateGeneralLedger, setUpdateGeneralLedger, accountGroups}:any) => {


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState(false);


    // Toast
    const {toast} = useToast();

    
    // Comparison object
    const comparisonObject = {
        account_name:updateGeneralLedger.account_name,
        group:updateGeneralLedger.group,
        account_type:updateGeneralLedger.account_type,
        opening_balance:updateGeneralLedger.opening_balance,
        opening_balance_type:updateGeneralLedger.opening_balance_type,
        assign_date:updateGeneralLedger.assign_date,
        is_cash_book:updateGeneralLedger.is_cash_book,
        is_fixed_asset:updateGeneralLedger.is_fixed_asset,
        depreciation:updateGeneralLedger.depreciation,
    };
    

    // Form
    const form = useForm({
        resolver:zodResolver(GeneralLedgerValidation),
        defaultValues:{
            account_name:updateGeneralLedger.id === '' ? '' : updateGeneralLedger.account_name,
            group:updateGeneralLedger.id === '' ? '' : updateGeneralLedger.group,
            account_type:updateGeneralLedger.id === '' ? '' : updateGeneralLedger.account_type,
            opening_balance:updateGeneralLedger.id === '' ? '' : updateGeneralLedger.opening_balance,
            opening_balance_type:updateGeneralLedger.id === '' ? 'Debit' : updateGeneralLedger.opening_balance_type,
            assign_date:updateGeneralLedger.id === '' ? new Date() : updateGeneralLedger.assign_date,
            is_cash_book:updateGeneralLedger.id === '' ? false : updateGeneralLedger.is_cash_book,
            is_fixed_asset:updateGeneralLedger.id === '' ? false : updateGeneralLedger.is_fixed_asset,
            depreciation:updateGeneralLedger.id === '' ? '' : updateGeneralLedger.depreciation,
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof GeneralLedgerValidation>) => {
        // Create General Ledger
        if(updateGeneralLedger.id === ''){
            // Ensuring unique account name
            if(generalLedgers.map((ledger:any) => ledger.account_name).includes(values.account_name)){
                toast({title:'Account name already exists', variant:'error'});
                return;
            }
            // Ensuring that depreciation is not 0 when is fixed asset is true
            else if(values.is_fixed_asset && values.depreciation === 0){
                form.setError('depreciation', {message:'*Depreciation is required'})
                return;
            }else{
                const res = await createGeneralLedger({
                    account_name:values.account_name,
                    group:values.group,
                    account_type:values.account_type,
                    opening_balance:values.opening_balance,
                    opening_balance_type:values.opening_balance_type,
                    assign_date:values.assign_date,
                    is_cash_book:values.is_cash_book,
                    is_fixed_asset:values.is_fixed_asset,
                    depreciation:values.depreciation
                });
                if(res === 0){
                    toast({title:'Please create a session first', variant:'alert'});
                    return;
                };
                toast({title:'Added Successfully!'});
            };
        }
        // Modify General Ledger
        else if(!deepEqual(comparisonObject, values) || form.getValues().assign_date > comparisonObject.assign_date || form.getValues().assign_date < comparisonObject.assign_date){
            // Ensuring unique account name
            if(values.account_name !== comparisonObject.account_name && generalLedgers.map((ledger:any) => ledger.account_name).includes(values.account_name)){
                toast({title:'Account name already exists', variant:'error'});
                return;
            }
            // Ensuring that depreciation is not 0 when is fixed asset is true
            else if(values.is_fixed_asset && values.depreciation === 0){
                form.setError('depreciation', {message:'*Depreciation is required'})
                return;
            }else{
                await modifyGeneralLedger({
                    id:updateGeneralLedger.id,
                    account_name:values.account_name,
                    group:values.group,
                    account_type:values.account_type,
                    opening_balance:values.opening_balance,
                    opening_balance_type:values.opening_balance_type,
                    assign_date:values.assign_date,
                    is_cash_book:values.is_cash_book,
                    is_fixed_asset:values.is_fixed_asset,
                    depreciation:values.is_cash_book ? 0 : values.is_fixed_asset ? values.depreciation : 0
                });
                toast({title:'Updated Successfully!'});
            }
        }
        // Delete General Ledger
        else if(updateGeneralLedger.isDeleteClicked){
            await deleteGeneralLedger({id:updateGeneralLedger.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateGeneralLedger({
            id:'',
            isDeleteClicked:false,
            account_name:'',
            group:'',
            account_type:'',
            opening_balance:'',
            opening_balance_type:'Debit',
            assign_date:new Date(),
            is_cash_book:false,
            is_fixed_asset:false,
            depreciation:''
        });
        // Reseting form
        form.reset({
            account_name:'',
            group:'',
            account_type:'',
            opening_balance:'',
            opening_balance_type:'Debit',
            assign_date:new Date(),
            is_cash_book:false,
            is_fixed_asset:false,
            depreciation:''
        });
    };


    // Account Type Handler
    const accountTypeHandler = () => {
        if(form.getValues().group !== ''){
            const text = accountGroups.filter((group:any) => group.group_name === form.getValues().group)[0].group_type;
            form.setValue('account_type', text);
        }else{
            form.setValue('account_type', '');
        }
    };


    // Use effect
    useEffect(() => {
        accountTypeHandler();
    }, [form.watch('group')]);


    return (
        <div className='w-[90%] max-w-[500px] max-h-[95%] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] overflow-y-scroll custom-sidebar-scrollbar sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define General Ledger</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center px-2 sm:px-4'
                >


                    {/* Account Name */}
                    <FormField
                        control={form.control}
                        name='account_name'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Account Name</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none placeholder:text-red-500l'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Group */}
                    <FormField
                        control={form.control}
                        name='group'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Select group</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='w-full h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Select'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {accountGroups.length < 1 ? (
                                                    <p>No groups found</p>
                                                ) : accountGroups[0]?.group_name ? accountGroups.map((group:any) => (
                                                    <SelectItem key={group.group_name} value={group.group_name}>{group.group_name}</SelectItem>
                                                )) : (
                                                    <LoadingIcon />
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </div>
                                <FormMessage className='absolute text-xs w-[200px] z-10 left-0 sm:left-[30%] top-[100%]'/>
                            </FormItem>
                        )}
                    />

                    {/* Account Type */}
                    <FormField
                        control={form.control}
                        name='account_type'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Account Type</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value}
                                            onChange={accountTypeHandler}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Opening Balance */}
                    <FormField
                        control={form.control}
                        name='opening_balance'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Opening Balance</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Opening Balance Type */}
                    <FormField
                        control={form.control}
                        name='opening_balance_type'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Opening Balance Type</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='w-full h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Debit'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Debit'>Debit</SelectItem>
                                                <SelectItem value='Credit'>Credit</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Assign Date */}
                    <FormField
                        control={form.control}
                        name='assign_date'
                        render={() => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Assign Date</FormLabel>
                                <Popover open={isCalendarOpened} onOpenChange={setIsCalendarOpened}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant='outline'
                                            className='flex flex-row items-center w-full h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none sm:basis-[70%]'
                                        >
                                            <CalendarIcon className='mr-2 h-4 w-4' />
                                            {
                                                form.getValues().assign_date
                                                        ? <span>{format(form.getValues().assign_date, 'PPP')}</span>
                                                        : <span>Pick a date</span>
                                            }
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-auto p-0'>
                                        <Calendar
                                            mode='single'
                                            selected={form.getValues().assign_date}
                                            onSelect={v => {setIsCalendarOpened(false); form.setValue('assign_date', v)}}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />

                    {/* Checks */}
                    <div className='w-full flex flex-row justify-between items-center'>
                        {/* Is Cash Book */}
                        <FormField
                            control={form.control}
                            name='is_cash_book'
                            render={({field}) => (
                                <FormItem className='w-full flex-1 pt-4 flex flex-row items-end justify-start sm:items-start sm:gap-2 sm:mt-0'>
                                    <>
                                        <FormControl>
                                            <div className='flex-1 flex items-center justify-end space-x-2'>
                                                <Switch
                                                    id='is_cash_book'
                                                    {...field}
                                                    value={field.value}
                                                    onCheckedChange={field.onChange}
                                                    onClick={() => form.setValue('is_fixed_asset', false)}
                                                    checked={field.value}
                                                />
                                                <Label
                                                    htmlFor='is_cash_book'
                                                    className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                                >
                                                    Is Cash Book
                                                </Label>
                                            </div>
                                        </FormControl>
                                    </>
                                </FormItem>
                            )}
                        />
                    
                    
                        {/* Is Fixed Asset */}
                        <FormField
                            control={form.control}
                            name='is_fixed_asset'
                            render={({field}) => (
                                <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                    <>
                                        <FormControl>
                                            <div className='flex-1 flex items-center justify-end space-x-2'>
                                                <Switch
                                                    id='is_fixed_asset'
                                                    {...field}
                                                    value={field.value}
                                                    onCheckedChange={field.onChange}
                                                    onClick={() => form.setValue('is_cash_book', false)}
                                                    checked={field.value}
                                                />
                                                <Label
                                                    htmlFor='is_cash_book'
                                                    className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                                >
                                                    Is Fixed Asset
                                                </Label>
                                            </div>
                                        </FormControl>
                                    </>
                                </FormItem>
                            )}
                        />
                    </div>


                    {/* Depreciation */}
                    <FormField
                        control={form.control}
                        name='depreciation'
                        render={({field}) => (
                            <FormItem className={`relative w-full flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2 ${form.getValues().is_fixed_asset ? 'flex' : 'hidden'}`}>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Depreciation (%)</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} generalLedgers={generalLedgers} updateGeneralLedger={updateGeneralLedger} setUpdateGeneralLedger={setUpdateGeneralLedger} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;











