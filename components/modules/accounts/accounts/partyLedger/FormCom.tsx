'use client';
// Imports
import * as z from 'zod';
import moment from 'moment';
import {format} from 'date-fns';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {ChevronDown, Calendar as CalendarIcon} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {PartyLedgerValidation} from '@/lib/validations/accounts/accounts/partyLedger.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createPartyLedger, deletePartyLedger, modifyPartyLedger} from '@/lib/actions/accounts/accounts/partyLedger.actions';
import MyDatePicker from '@/components/shared/CustomDatePicker';





// Main function
const FormCom = ({setIsViewOpened, partyLedgers, updatePartyLedger, setUpdatePartyLedger, accountGroups}:any) => {

    // Date states
    const [assignDate, setAssignDate] = useState(moment());


    // Toast
    const {toast} = useToast();


    // Account type
    const [accountType, setAccountType] = useState('');

    
    // Comparison object
    const comparisonObject = {
        account_name:updatePartyLedger.account_name,
        account_no:updatePartyLedger.account_no,
        cin_no:updatePartyLedger.cin_no,
        group:updatePartyLedger.group,
        account_type:updatePartyLedger.account_type,
        account_address:updatePartyLedger.account_address,
        account_city:updatePartyLedger.account_city,
        pin_code:updatePartyLedger.pin_code,
        email:updatePartyLedger.email,
        mobile:updatePartyLedger.mobile,
        pan:updatePartyLedger.pan,
        gstin:updatePartyLedger.gstin,
        opening_balance:updatePartyLedger.opening_balance,
        opening_balance_type:updatePartyLedger.opening_balance_type,
        assign_date:updatePartyLedger.assign_date
    };
    

    // Form
    const form = useForm({
        resolver:zodResolver(PartyLedgerValidation),
        defaultValues:{
            account_name:updatePartyLedger.id === '' ? '' : updatePartyLedger.account_name,
            account_no:updatePartyLedger.id === '' ? '' : updatePartyLedger.account_no,
            cin_no:updatePartyLedger.id === '' ? '' : updatePartyLedger.cin_no,
            group:updatePartyLedger.id === '' ? '' : updatePartyLedger.group,
            account_type:updatePartyLedger.id === '' ? '' : updatePartyLedger.account_type,
            account_address:updatePartyLedger.id === '' ? '' : updatePartyLedger.account_address,
            account_city:updatePartyLedger.id === '' ? '' : updatePartyLedger.account_city,
            pin_code:updatePartyLedger.id === '' ? null : updatePartyLedger.pin_code,
            email:updatePartyLedger.id === '' ? '' : updatePartyLedger.email,
            mobile:updatePartyLedger.id === '' ? null : updatePartyLedger.mobile,
            pan:updatePartyLedger.id === '' ? null : updatePartyLedger.pan,
            gstin:updatePartyLedger.id === '' ? null : updatePartyLedger.gstin,
            opening_balance:updatePartyLedger.id === '' ? null : updatePartyLedger.opening_balance,
            opening_balance_type:updatePartyLedger.id === '' ? 'Debit' : updatePartyLedger.opening_balance_type,
            assign_date:updatePartyLedger.id === '' ? new Date() : updatePartyLedger.assign_date
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof PartyLedgerValidation>) => {
        // Create Party Ledger
        if(updatePartyLedger.id === ''){
            if(partyLedgers.map((ledger:any) => ledger.account_name).includes(values.account_name)){
                toast({title:'Account name already exists', variant:'error'});
                return;
            };
            const res = await createPartyLedger({
                account_name:values.account_name,
                account_no:values.account_no,
                cin_no:values.cin_no,
                group:values.group,
                account_type:accountType,
                account_address:values.account_address,
                account_city:values.account_city,
                pin_code:values.pin_code,
                email:values.email,
                mobile:values.mobile,
                pan:values.pan,
                gstin:values.gstin,
                opening_balance:values.opening_balance,
                opening_balance_type:values.opening_balance_type,
                assign_date:values.assign_date
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify Party Ledger
        else if(!deepEqual(comparisonObject, values) || form.getValues().assign_date > comparisonObject.assign_date || form.getValues().assign_date < comparisonObject.assign_date || moment(values.assign_date).format('DD-MM-YYYY') !== moment(comparisonObject.assign_date).format('DD-MM-YYYY')){
            // Ensuring unique account name
            if(values.account_name !== comparisonObject.account_name && partyLedgers.map((ledger:any) => ledger.account_name).includes(values.account_name)){
                toast({title:'Account name already exists', variant:'error'});
                return;
            };
            // Updating
            await modifyPartyLedger({
                id:updatePartyLedger.id,
                account_name:values.account_name,
                account_no:values.account_no,
                cin_no:values.cin_no,
                group:values.group,
                account_type:accountType,
                account_address:values.account_address,
                account_city:values.account_city,
                pin_code:values.pin_code,
                email:values.email,
                mobile:values.mobile,
                pan:values.pan,
                gstin:values.gstin,
                opening_balance:values.opening_balance,
                opening_balance_type:values.opening_balance_type,
                assign_date:values.assign_date
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete Party Ledger
        else if(updatePartyLedger.isDeleteClicked){
            await deletePartyLedger({id:updatePartyLedger.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdatePartyLedger({
            id:'',
            isDeleteClicked:false,
            account_name:'',
            account_no:'',
            cin_no:'',
            group:'',
            account_type:'',
            account_address:'',
            account_city:'',
            pin_code:'',
            email:'',
            mobile:'',
            pan:'',
            gstin:'',
            opening_balance:'',
            opening_balance_type:'Debit',
            assign_date:new Date()
        });
        // Reseting form
        form.reset({
            account_name:'',
            account_no:'',
            cin_no:'',
            group:'',
            account_type:'',
            account_address:'',
            account_city:'',
            pin_code:'',
            email:'',
            mobile:'',
            pan:'',
            gstin:'',
            opening_balance:'',
            opening_balance_type:'Debit',
            assign_date:new Date()
        });
        setAccountType('');
        setAssignDate(moment());
    };


    // Use effect
    useEffect(() => {
        if(form.getValues().group !== ''){
            const text = accountGroups.filter((group:any) => group.group_name === form.getValues().group)[0].group_type;
            setAccountType(text);
        }else{
            setAccountType('');
        }
    }, [form.watch('group')]);
    useEffect(() => {
        if(updatePartyLedger.id !== ''){
            setAssignDate(moment(updatePartyLedger.assign_date));
        };
    }, []);
    useEffect(() => {
        if(assignDate){
            // @ts-ignore
            form.setValue('assign_date', assignDate._d);
        };
    }, [assignDate]);


    return (
        <div className='w-[90%] max-w-[500px] max-h-[95%] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] overflow-y-scroll custom-sidebar-scrollbar sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Party Ledger</h2>
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

                    {/* Account No. */}
                    <FormField
                        control={form.control}
                        name='account_no'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Account No.</FormLabel>
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

                    {/* CIN No. */}
                    <FormField
                        control={form.control}
                        name='cin_no'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>CIN No.</FormLabel>
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
                                                    <SelectItem value={group.group_name}>{group.group_name}</SelectItem>
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
                                            value={accountType}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Account Address */}
                    <FormField
                        control={form.control}
                        name='account_address'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Account Address</FormLabel>
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

                    {/* Account City */}
                    <FormField
                        control={form.control}
                        name='account_city'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Account City</FormLabel>
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

                    {/* Pin Code */}
                    <FormField
                        control={form.control}
                        name='pin_code'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Pin Code</FormLabel>
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

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Email</FormLabel>
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

                    {/* Mobile No. */}
                    <FormField
                        control={form.control}
                        name='mobile'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Phone/Mobile No.</FormLabel>
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

                    {/* PAN */}
                    <FormField
                        control={form.control}
                        name='pan'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>PAN</FormLabel>
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

                    {/* TIN */}
                    <FormField
                        control={form.control}
                        name='gstin'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>GSTIN</FormLabel>
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
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-6 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Assign Date</FormLabel>
                                <div className='basis-[70%]'>
                                    <MyDatePicker
                                        selectedDate={assignDate}
                                        setSelectedDate={setAssignDate}
                                    />
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} partyLedgers={partyLedgers} updatePartyLedger={updatePartyLedger} setUpdatePartyLedger={setUpdatePartyLedger} onSubmit={onSubmit} form={form} setAssignDate={setAssignDate}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;