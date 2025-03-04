'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {fetchSchoolsNames} from '@/lib/actions/accounts/masterSettings/changeAcademic.actions';
import {FeeEntrySettingValidation} from '@/lib/validations/fees/masterSettings/feeEntrySetting.validation';
import {createFeeEntrySetting, deleteFeeEntrySetting, modifyFeeEntrySetting} from '@/lib/actions/fees/masterSettings/feeEntrySetting.actions';






// Main function
const FormCom = ({feeEntrySettings, setIsViewOpened, updateFeeEntrySetting, setUpdateFeeEntrySetting}:any) => {

    // Toast
    const {toast} = useToast();


    // School name
    const [schoolName, setSchoolName] = useState<string>('');

    // Opened Form
    const [openedFormName, setOpenedFormName] = useState('generate-single-receipt');


    // Selected Form Com
    const [selectedFormCom, setSelectedFormCom] = useState<any>();


    // Comparison object
    const comparisonObject = {
        prefix:updateFeeEntrySetting.prefix,
        lead_zero:updateFeeEntrySetting.lead_zero,
        receipt_no_start:updateFeeEntrySetting.receipt_no_start,
        suffix:updateFeeEntrySetting.suffix,
        generate_type:updateFeeEntrySetting.generate_type
    };


    // Form
    const form = useForm({
        resolver:zodResolver(FeeEntrySettingValidation),
        defaultValues:{
            prefix:updateFeeEntrySetting.id === '' ? '' : updateFeeEntrySetting.prefix,
            lead_zero:updateFeeEntrySetting.id === '' ? '' : updateFeeEntrySetting.lead_zero,
            receipt_no_start:updateFeeEntrySetting.id === '' ? '' : updateFeeEntrySetting.receipt_no_start,
            suffix:updateFeeEntrySetting.id === '' ? '' : updateFeeEntrySetting.suffix,
            generate_type:updateFeeEntrySetting.id === '' ? '' : updateFeeEntrySetting.generate_type,
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof FeeEntrySettingValidation>) => {
        try {

            // Values
            localStorage.setItem('receipt_prefix', values.prefix);
            localStorage.setItem('receipt_lead_zero', values.lead_zero);
            localStorage.setItem('receipt_suffix', values.suffix);


            // Create fee entry setting
            if(updateFeeEntrySetting.id === ''){
                const res = await createFeeEntrySetting({
                    prefix:values.prefix,
                    lead_zero:values.lead_zero,
                    receipt_no_start:values.receipt_no_start,
                    suffix:values.suffix,
                    generate_type:values.generate_type
                });
                if(res === 0){
                    toast({title:'Please create a session first', variant:'alert'});
                    return;
                };
                toast({title:'Added Successfully!'});
            }
            // Modify fee entry setting
            else if(!deepEqual(comparisonObject, values)){
                await modifyFeeEntrySetting({
                    id:updateFeeEntrySetting.id,
                    prefix:values.prefix,
                    lead_zero:values.lead_zero,
                    receipt_no_start:values.receipt_no_start,
                    suffix:values.suffix,
                    generate_type:values.generate_type
                });
                toast({title:'Updated Successfully!'});
            }
            // Delete fee entry setting
            else if(updateFeeEntrySetting.isDeleteClicked){
                await deleteFeeEntrySetting({id:updateFeeEntrySetting.id});
                toast({title:'Deleted Successfully!'});
            };


            // Reseting form
            setUpdateFeeEntrySetting({
                id:'',
                isDeleteClicked:false,
                prefix:'',
                lead_zero:'',
                receipt_no_start:'',
                suffix:'',
                generate_type:'generate-single-receipt'
            });
            form.reset({
                prefix:'',
                lead_zero:'',
                receipt_no_start:'',
                suffix:'',
                generate_type:'generate-single-receipt'
            });

        } catch (err:any) {
            console.log(err);
        }
    };


    const threeAndFour = (
        <div className='h-full flex flex-row overflow-x-scroll custom-scrollbar'>
            {/* Fee Type */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Fee Type</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>SCHOOL</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>TRANSPORT</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>TUTION FEE</li>
            </ul>
            {/* Fee Prefix */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Prefix</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='prefix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter prefix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='prefix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter prefix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='prefix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter prefix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* Fee Lead Zero */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Lead Zero</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='lead_zero'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='0'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='lead_zero'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='0'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='lead_zero'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='0'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* Fee Receipt No. */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>RCPT No. Start</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='receipt_no_start'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='1'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='receipt_no_start'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='1'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='receipt_no_start'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='1'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* Fee Suffix */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Suffix</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='suffix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter Suffix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='suffix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter Suffix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='suffix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter Suffix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>

        </div>
    );


    const two = (
        <div className='h-full flex flex-row overflow-x-scroll custom-scrollbar'>
            {/* School Type */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>School Name</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>{schoolName}</li>
            </ul>
            {/* School Prefix */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Prefix</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='prefix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter prefix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* School Lead Zero */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Lead Zero</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='lead_zero'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='0'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* School Receipt No. */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>RCPT No. Start</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='receipt_no_start'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='1'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* School Suffix */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Suffix</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='suffix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter Suffix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
        </div>
    );


    const one = (
        <div className='h-full flex flex-row overflow-x-scroll custom-scrollbar'>
            {/* Single Prefix */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Prefix</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='prefix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter prefix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* Single Lead Zero */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Lead Zero</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='lead_zero'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='0'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* Single Receipt No. */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>RCPT No. Start</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='receipt_no_start'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='1'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* School Suffix */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Suffix</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='suffix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter Suffix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
        </div>
    );


    // Use Effect
    useEffect(() => {
        const schoolNameFetcher = async () => {
            const res = await fetchSchoolsNames();
            setSchoolName(res[0]);
        };
        schoolNameFetcher();
    }, [openedFormName, selectedFormCom]);
    useEffect(() => {
        switch (openedFormName){
            case 'generate-single-receipt':
                setSelectedFormCom(one);
                return;
            case 'generate-school-wise-receipt':
                // setSelectedFormCom(two);
                setSelectedFormCom(one);
                return;
            case 'generate-fee-type-wise-receipt':
                // setSelectedFormCom(threeAndFour);
                setSelectedFormCom(one);
                return;
            case 'generate-school-with-fee-type-wise-receipt':
                // setSelectedFormCom(threeAndFour);
                setSelectedFormCom(one);
                return;
        };
    }, [openedFormName]);

    return (
        <div className='w-[90%] max-w-[1100px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col py-4 items-center px-2 sm:px-4'
                >


                    <div className='w-full flex flex-col items-between justify-between gap-4 xl:flex-row'>
                        <RadioGroup defaultValue='generate-single-receipt' className='h-[150px]' onValueChange={(v:any) => setOpenedFormName(v)}>
                            <div className='flex items-center space-x-[4px]'>
                                <RadioGroupItem value='generate-single-receipt' id='generate-single-receipt'/>
                                <Label htmlFor='generate-single-receipt' className='text-xs'>Generate Single Receipt</Label>
                            </div>
                            <div className='flex items-center space-x-[4px]'>
                                <RadioGroupItem value='generate-school-wise-receipt' id='generate-school-wise-receipt'/>
                                <Label htmlFor='generate-school-wise-receipt' className='text-xs'>Generate School Wise Receipt</Label>
                            </div>
                            <div className='flex items-center space-x-[4px]'>
                                <RadioGroupItem value='generate-fee-type-wise-receipt' id='generate-fee-type-wise-receipt'/>
                                <Label htmlFor='generate-fee-type-wise-receipt' className='text-xs'>Generate Fee Type Wise Receipt</Label>
                            </div>
                            <div className='flex items-center space-x-[4px]'>
                                <RadioGroupItem value='generate-school-with-fee-type-wise-receipt' id='generate-school-with-fee-type-wise-receipt'/>
                                <Label htmlFor='generate-school-with-fee-type-wise-receipt' className='text-xs'>Generate School with Fee Type Wise Receipt</Label>
                            </div>
                        </RadioGroup>
                        <div className={`${openedFormName === 'generate-single-receipt' || openedFormName === 'generate-school-wise-receipt' ? 'h-[120px]' : 'h-[200px]'} flex flex-col`}>
                            <h4>Set below details:</h4>
                            {selectedFormCom}
                        </div>
                    </div>


                    {/* Buttons */}
                    <div className='flex flex-col items-center mt-[-20px]'>
                        <Buttons setIsViewOpened={setIsViewOpened} feeEntrySettings={feeEntrySettings} updateFeeEntrySetting={updateFeeEntrySetting} setUpdateFeeEntrySetting={setUpdateFeeEntrySetting} onSubmit={onSubmit} form={form} />
                    </div>


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;