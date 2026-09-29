'use client';
// Imports
import * as z from 'zod';
import HeadsList from './HeadsList';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import { AuthContext } from '@/context/AuthContext';
import {useContext, useEffect, useState} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {AssignAmountGroupValidation} from '@/lib/validations/fees/feeMaster/assignAmountGroup.validation';
import {assignAmountGroup, fetchGroupHeadWithInstallment, fetchRegularGroupHeadsByName, isGroupHasPayments} from '@/lib/actions/fees/feeMaster/feeMaster/group.actions';





// Main function
const FormCom = ({groups, installments, setIsLoading}: any) => {

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


    // Is data fetching
    const [isDataFetching, setIsDataFetching] = useState(false);


    // Heads
    const [heads, setHeads] = useState<any>([]);


    // Form
    const form = useForm({
        resolver:zodResolver(AssignAmountGroupValidation),
        defaultValues: {
            group_name:'',
            installment:'Select All',
            affiliated_heads:[{
                head_name:'',
                amount:0
            }]
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof AssignAmountGroupValidation>) => {


        // Checking for students paid amounts
        setIsLoading(true);
        const isGroupAffiliatedToStudent = await isGroupHasPayments({group_name:values.group_name});
        if(isGroupAffiliatedToStudent){
            toast({title:'Fee group is assigned to students', variant:'alert'});
            setIsLoading(false);
            return;
        };

    
        await assignAmountGroup({
            group_name:values.group_name,
            installment:values.installment,
            affiliated_heads:heads?.sort((a:any, b:any) => a.priority_no - b.priority_no)
        });
        toast({title:'Saved Successfully!'});
        setHeads([]);
        form.reset({
            group_name:'',
            installment:'Select All',
            affiliated_heads:[]
        });
        setIsLoading(false);
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            if(form.getValues().group_name !== '' && form.getValues().installment !== ''){
                setIsDataFetching(true);

                const res = form.getValues().installment === 'Select All'
                ? await fetchRegularGroupHeadsByName({name:form.getValues().group_name})
                : await fetchGroupHeadWithInstallment({group_name:form.getValues().group_name, installment:form.getValues().installment});
                setHeads(res);
                setIsDataFetching(false);
            }
        };
        fetcher();
    }, [form.watch('group_name'), form.watch('installment')]);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Fees')?.permissions?.find((pp:any) => pp.sub_menu === 'Assign Amount Group');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[100%] max-w-[1500px] flex flex-col items-center overflow-y-scroll custom-sidebar-scrollbar'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 gap-8 sm:px-4 sm:gap-4'
                >


                    {/* Fee group */}
                    <FormField
                        control={form.control}
                        name='group_name'
                        render={({field}) => (
                            <FormItem className='w-full max-w-[300px]'>
                            <div className='w-full h-8 flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Fee Group</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select Group'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {groups.length < 1 ? (
                                                    <p>No Group</p>
                                                ) : !groups[0].name ? (
                                                    <LoadingIcon />
                                                ) : groups.map((group:any) => (
                                                    <SelectItem value={group.name} key={group._id}>{group.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-xs'/>
                                </div>
                            </div>
                        </FormItem>
                        )}
                    />


                    {/* Installment */}
                    <FormField
                        control={form.control}
                        name='installment'
                        render={({field}) => (
                            <FormItem className='w-full max-w-[300px]'>
                            <div className='w-full h-8 flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Installment</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select Installment'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Select All'>Select All</SelectItem>
                                                {installments.length < 1 ? (
                                                    <p>No installments</p>
                                                ) : !installments[0].name ? (
                                                    <LoadingIcon />
                                                ) : installments.map((installment:any) => (
                                                    <SelectItem value={installment.name} key={installment._id}>{installment.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-xs'/>
                                </div>
                            </div>
                        </FormItem>
                        )}
                    />


                    {/* Fee heads */}
                    <HeadsList
                        form={form}
                        heads={heads}
                        installments={installments}
                        isDataFetching={isDataFetching}
                    />


                    {/* Buttons */}
                    <div className='flex flex-row items-center gap-4'>
                        {permissions.add && (
                            <Button
                                type='submit'
                                className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                            >
                                Save
                            </Button>
                        )}
                        <span
                            className='flex items-center px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                        >
                            Show
                        </span>
                    </div>


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;