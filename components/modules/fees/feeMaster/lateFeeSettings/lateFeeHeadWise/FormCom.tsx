'use client';
// Imports
import * as z from 'zod';
import moment from 'moment';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {useContext, useEffect, useState} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {LateFeeHeadWiseValidation} from '@/lib/validations/fees/feeMaster/lateFeeSettings/lateFeeHeadWise.validation';
import {createLateFeeHeadWise, deleteLateFeeHeadWise, modifyLateFeeHeadWise} from '@/lib/actions/fees/feeMaster/lateFeeSettings/lateFeeHeadWise.actions';
import { AuthContext } from '@/context/AuthContext';





// Main function
const FormCom = ({setIsViewOpened, lateFees, updateLateFee, setUpdateLateFee, groups, types, installments, heads, lateFeeTypes}:any) => {

    // User
    const {user} = useContext(AuthContext);
    console.log(user);


    // Toast
    const {toast} = useToast();


    // Date states
    const [dueDate, setDueDate] = useState(moment());


    // Comparison object
    const comparisonObject = {
        fee_group:updateLateFee.fee_group,
        fee_type:updateLateFee.fee_type,
        installment:updateLateFee.installment,
        head:updateLateFee.head,
        due_date:updateLateFee.due_date,
        late_fee_type:updateLateFee.late_fee_type,
        amount:updateLateFee.amount
    };

    // Form
    const form = useForm({
        resolver: zodResolver(LateFeeHeadWiseValidation),
        defaultValues: {
            fee_group:updateLateFee.id === '' ? '' : updateLateFee.fee_group,
            fee_type:updateLateFee.id === '' ? '' : updateLateFee.fee_type,
            installment:updateLateFee.id === '' ? '' : updateLateFee.installment,
            head:updateLateFee.id === '' ? '' : updateLateFee.head,
            due_date:updateLateFee.id === '' ? new Date() : updateLateFee.due_date,
            late_fee_type:updateLateFee.id === '' ? '' : updateLateFee.late_fee_type,
            amount:updateLateFee.id === '' ? 0 : updateLateFee.amount
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof LateFeeHeadWiseValidation>) => {
        // Create late fee head wise
        if(updateLateFee.id === ''){
            const res = await createLateFeeHeadWise({
                fee_group:values.fee_group,
                fee_type:values.fee_type,
                installment:values.installment,
                head:values.head,
                due_date:values.due_date,
                late_fee_type:values.late_fee_type,
                amount:values.amount
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify late fee head wise
        else if (!deepEqual(comparisonObject, values) || moment(values.due_date).format('DD-MM-YYYY') !== moment(comparisonObject.due_date).format('DD-MM-YYYY')) {
            await modifyLateFeeHeadWise({
                id:updateLateFee.id,
                fee_group:values.fee_group,
                fee_type:values.fee_type,
                installment:values.installment,
                head:values.head,
                due_date:values.due_date,
                late_fee_type:values.late_fee_type,
                amount:values.amount
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete late fee head wise
        else if (updateLateFee.isDeleteClicked) {
            await deleteLateFeeHeadWise({id:updateLateFee.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateLateFee({
            id: '',
            isDeleteClicked:false,
            fee_group:'',
            fee_type:'',
            installment:'',
            head:'',
            due_date:new Date(),
            late_fee_type:'',
            amount:0

        });
        // Reseting form
        form.reset({
            fee_group:'',
            fee_type:'',
            installment:'',
            head:'',
            due_date:new Date(),
            late_fee_type:'',
            amount:0
        });
        setDueDate(moment());
    };


    // Use effects
    useEffect(() => {
        if(updateLateFee.id !== ''){
            setDueDate(moment(updateLateFee.due_date));
        };
    }, []);
    useEffect(() => {
        if(dueDate){
            // @ts-ignore
            form.setValue('due_date', dueDate._d);
        };
    }, [dueDate]);

    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Late Fee Setting Head Wise</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col gap-6 pt-4 items-center px-2 sm:px-4 sm:gap-2'
                >


                    {/* Fee Group */}
                    <div className='w-full h-10 flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:basis-[30%] sm:text-end'>Fee Group</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                            <FormField
                                control={form.control}
                                name='fee_group'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {groups.length < 1 ? (
                                                        <p className='text-xs text-hash-color'>No groups</p>
                                                    ) : !groups[0].name ? (
                                                        <LoadingIcon />
                                                    ) : groups.map((g:any) => (
                                                        <SelectItem value={g.name} key={g._id}>{g.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Fee Type */}
                    <div className='w-full h-10 flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:basis-[30%] sm:text-end'>Fee Type</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                            <FormField
                                control={form.control}
                                name='fee_type'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {types.filter((t:any) => user.fee_types.includes(t.name)).length < 1 ? (
                                                        <p className='text-xs text-hash-color'>No types</p>
                                                    ) : !types[0].name ? (
                                                        <LoadingIcon />
                                                    ) : types.filter((t:any) => user.fee_types.includes(t.name)).map((g:any) => (
                                                        <SelectItem value={g.name} key={g._id}>{g.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Installment */}
                    <div className='w-full h-10 flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:basis-[30%] sm:text-end'>Installment</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                            <FormField
                                control={form.control}
                                name='installment'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {installments.length < 1 ? (
                                                        <p className='text-xs text-hash-color'>No installments</p>
                                                    ) : !installments[0].name ? (
                                                        <LoadingIcon />
                                                    ) : installments.map((g:any) => (
                                                        <SelectItem value={g.name} key={g._id}>{g.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Head */}
                    <div className='w-full h-10 flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:basis-[30%] sm:text-end'>Head</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                            <FormField
                                control={form.control}
                                name='head'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {heads.length < 1 ? (
                                                        <p className='text-xs text-hash-color'>No heads</p>
                                                    ) : !heads[0].name ? (
                                                        <LoadingIcon />
                                                    ) : heads.map((h:any) => (
                                                        <SelectItem value={h.name} key={h._id}>{h.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Due Date */}
                    <FormItem className='relative w-full pb-[8px] flex flex-col items-start justify-center mt-2 sm:mt-0 sm:flex-row sm:items-center'>
                        <FormLabel className='basis-auto h-2 pr-2 text-end text-[11px] text-[#726E71] sm:basis-[30%]'>Due Date</FormLabel>
                        <div className='basis-[70%]'>
                            <MyDatePicker
                                selectedDate={dueDate}
                                setSelectedDate={setDueDate}
                            />
                        </div>
                    </FormItem>


                    {/* Late Fee Type */}
                    <div className='w-full h-10 flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:basis-[30%] sm:text-end'>Late Fee Type</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                            <FormField
                                control={form.control}
                                name='late_fee_type'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {lateFeeTypes.map((t:any) => (
                                                        <SelectItem value={t} key={t}>{t}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Head Priority Number */}
                    <FormField
                        control={form.control}
                        name='amount'
                        render={({ field }) => (
                            <FormItem className='w-full mt-4 sm:mt-0'>
                                <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Amount</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} lateFees={lateFees} updateLateFee={updateLateFee} setUpdateLateFee={setUpdateLateFee} onSubmit={onSubmit} form={form} setDueDate={setDueDate}/>

                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;