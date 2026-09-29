'use client';
// Imports
import * as z from 'zod';
import {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {FeeOpeningBalanceSettingValidation} from '@/lib/validations/fees/masterSettings/feeOpeningBalanceSetting.validation';
import { fetchTypes } from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { AuthContext } from '@/context/AuthContext';





// Main function
const FormCom = () => {

    // User
    const {user} = useContext(AuthContext);


    // Permissions
    const [permissions, setPermissions] = useState({
        add:false,
        modify:false,
        delete:false,
        print:false,
        read_only:false
    });


    // Toast
    const {toast} = useToast();


    // Advance types
    const [feeTypes, setFeeTypes] = useState([{}]);


    // Form
    const form = useForm({
        resolver:zodResolver(FeeOpeningBalanceSettingValidation),
        defaultValues:{
            auto_adjust_amount:false,
            auto_adjust_opening_balance:false,
            fee_type:''
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof FeeOpeningBalanceSettingValidation>) => {
        try {

            toast({title:'Saved Successfully'});

            // Reseting form
            form.reset({
                auto_adjust_amount:false,
                auto_adjust_opening_balance:false,
                fee_type:''
            });

        } catch (err:any) {
            console.log(err.message);
        }
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const feeTypesRes = await fetchTypes();
            setFeeTypes(feeTypesRes.filter((t:any) => user.fee_types.includes(t.name)));
        };
        fetcher();
    }, []);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Fees')?.permissions?.find((pp:any) => pp.sub_menu === 'Fee Opening Balance Setting');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[90%]  max-w-[1100px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Fee Opening Balance Setting</h2>
            <h2 className='w-full text-center text-xl my-4'>Fee Opening Balance and Advance Amount Setting</h2>
            <Form
                {...form}
            >

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col items-center'
                >

                    {/* Auto adjust amount */}
                    <div className='p-2 my-2 border rounded-xl flex flex-col w-[80%] mx-auto'>
                        <FormField
                            control={form.control}
                            name='auto_adjust_amount'
                            render={({field}) => (
                                <FormItem className='relative w-full flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <div className='w-full h-full flex flex-col items-start'>
                                        <FormControl>
                                        <RadioGroup defaultValue='auto'>
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem value='auto' id='auto' />
                                                <Label htmlFor='auto' className='text-xs'>Auto adjust, If advance amount is greater than or equal to next installment amount.</Label>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem value='manual' id='manual' />
                                                <Label htmlFor='manual' className='text-xs'>Manually adjust advance amount.</Label>
                                            </div>
                                        </RadioGroup>
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>


                    {/* Auto adjust amount */}
                    <div className='p-2 my-2 border rounded-xl flex flex-col w-[80%] mx-auto'>
                        <FormField
                            control={form.control}
                            name='auto_adjust_opening_balance'
                            render={({field}) => (
                                <FormItem className='relative w-full flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <div className='w-full h-full flex flex-col items-start'>
                                        <FormControl>
                                        <RadioGroup defaultValue='auto'>
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem value='auto' id='auto' />
                                                <Label htmlFor='auto' className='text-xs'>Automatically adjust opening balance.</Label>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem value='manual' id='manual' />
                                                <Label htmlFor='manual' className='text-xs'>Manually adjust opening balance.</Label>
                                            </div>
                                        </RadioGroup>
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    

                    <div className='p-2 mb-2  border rounded-xl flex flex-col  w-[80%] mx-auto'>
                        {/* Fee type */}
                        <FormField
                            control={form.control}
                            name='fee_type'
                            render={({field}) => (
                                <FormItem className='relative w-full mb-2 flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                    <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Fee Type For Advance</FormLabel>
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
                                                    {feeTypes.length === 0 ? (
                                                        <p>No fee types</p>
                                                    ) : // @ts-ignore
                                                    !feeTypes[0].name ? (
                                                        <LoadingIcon />
                                                    ) : feeTypes.map((type:any, index: number) => (
                                                            <SelectItem 
                                                                value={type.name}
                                                                key={index}
                                                            >
                                                                {type.name}
                                                            </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <FormMessage className='absolute text-xs w-[200px] z-10 left-0 sm:left-[30%] top-[100%]'/>
                                </FormItem>
                            )}
                        />
                        <p className='text-sm mt-2'>
                            <span className='font-bold'>Note</span>:Advance will manage in selected type by default, i.e if "All fee type" option is select while taking a fee than advance will manage in fee type which selected here
                        </p>
                    </div>

                    

                    {/* Save button */}
                    {permissions.add && (
                        <Button
                            type='submit'
                            className='px-[8px] h-8 my-4 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                        >
                            Save
                        </Button>
                    )}


                </form>

            </Form>
        </div>
    );
};





// Export
export default FormCom;