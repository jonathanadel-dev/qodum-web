'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {useContext, useEffect} from 'react';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {DueLimitValidation} from '@/lib/validations/fees/masterSettings/dueLimit.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createDueLimit, deleteDueLimit, modifyDueLimit} from '@/lib/actions/fees/masterSettings/dueLimit.actions';
import { AuthContext } from '@/context/AuthContext';





// Main function
const FormCom = ({setIsViewOpened, dueLimits, updateDueLimit, setUpdateDueLimit, classes, feeTypes, heads}:any) => {

    // User
    const {user} = useContext(AuthContext);


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        class_name:updateDueLimit.class_name,
        fee_type:updateDueLimit.fee_type,
        late_fee_on_due:updateDueLimit.late_fee_on_due,
        dues_amount:updateDueLimit.dues_amount,
        is_percent:updateDueLimit.is_percent,
        heads:updateDueLimit.heads,
        fine_waive_off_setting:updateDueLimit.fine_waive_off_setting
    };


    // Form
    const form = useForm({
        resolver:zodResolver(DueLimitValidation),
        defaultValues:{
            class_name:updateDueLimit.id === '' ? '' : updateDueLimit.class_name,
            fee_type:updateDueLimit.id === '' ? '' : updateDueLimit.fee_type,
            late_fee_on_due:updateDueLimit.id === '' ? false : updateDueLimit.late_fee_on_due,
            dues_amount:updateDueLimit.id === '' ? 0 : updateDueLimit.dues_amount,
            is_percent:updateDueLimit.id === '' ? false : updateDueLimit.is_percent,
            heads:updateDueLimit.id === '' ? '' : updateDueLimit.heads,
            fine_waive_off_setting:updateDueLimit.id === '' ? 'Do not show waive off checkbox on Fee entry form (Default)' : updateDueLimit.fine_waive_off_setting
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof DueLimitValidation>) => {
        try {
            // Create due limit
            if(updateDueLimit.id === ''){
                if(values.late_fee_on_due && values.dues_amount < 0.1){
                    toast({title:'Dues amount cannot be less than 0.1', variant:'alert'});
                    return;
                };
                const res = await createDueLimit({
                    class_name:values.class_name,
                    fee_type:values.fee_type,
                    late_fee_on_due:values.late_fee_on_due,
                    dues_amount:values.dues_amount,
                    is_percent:values.is_percent,
                    heads:values.heads,
                    fine_waive_off_setting:values.fine_waive_off_setting
                });
                if(res === 0){
                    toast({title:'Please create a session first', variant:'alert'});
                    return;
                };
                toast({title:'Added Successfully!'});
            }
            // Modify due limit
            else if(!deepEqual(comparisonObject, values)){
                if(values.late_fee_on_due && values.dues_amount < 0.1){
                    toast({title:'Dues amount cannot be less than 0.1', variant:'alert'});
                    return;
                };
                await modifyDueLimit({
                    id:updateDueLimit.id,
                    class_name:values.class_name,
                    fee_type:values.fee_type,
                    late_fee_on_due:values.late_fee_on_due,
                    dues_amount:values.dues_amount,
                    is_percent:values.is_percent,
                    heads:values.heads,
                    fine_waive_off_setting:values.fine_waive_off_setting
                });
                toast({title:'Updated Successfully!'});
            }
            // Delete due limit
            else if(updateDueLimit.isDeleteClicked){
                await deleteDueLimit({id:updateDueLimit.id});
                toast({title:'Deleted Successfully!'});
            };


            // Reseting update entity
            setUpdateDueLimit({
                id:'',
                isDeleteClicked:false,
                class_name:'',
                fee_type:'',
                late_fee_on_due:false,
                dues_amount:0,
                is_percent:false,
                heads:'',
                fine_waive_off_setting:'Do not show waive off checkbox on Fee entry form (Default)'
            });
            // Reseting form
            form.reset({
                class_name:'',
                fee_type:'',
                late_fee_on_due:false,
                dues_amount:0,
                is_percent:false,
                heads:'',
                fine_waive_off_setting:'Do not show waive off checkbox on Fee entry form (Default)'
            });
        } catch (err:any) {
            console.log(err);
        }
    };


    // Use effect
    useEffect(() => {}, [form.watch('fine_waive_off_setting'), form.watch('late_fee_on_due'), form.watch('is_percent')]);


    return (
        <div className='w-[90%] max-h-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%] overflow-y-scroll custom-sidebar-scrollbar'>
            <h2 className='w-full text-center py-2 text-xs rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Due Limit</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col gap-6 pt-4 items-center px-2 sm:px-4 sm:gap-2'
                >


                    <div className='w-full flex flex-row items-center gap-2'>
                        {/* Class */}
                        <div className='w-full h-10 flex flex-col items-center sm:flex-row'>
                            <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:basis-[30%] sm:text-end'>Class</FormLabel>
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                                <FormField
                                    control={form.control}
                                    name='class_name'
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
                                                        {classes.length < 1 ? (
                                                            <p className='text-hash-color text-xs'>No classes</p>
                                                        ) : !classes[0].class_name ? (
                                                            <LoadingIcon />
                                                        ) : classes.map((c:any) => (
                                                            <SelectItem value={c.class_name} key={c._id}>{c.class_name}</SelectItem>
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
                                                        {feeTypes?.filter((t:any) => user.fee_types.includes(t.name)).length < 1 ? (
                                                            <p className='text-hash-color text-xs'>No fee types</p>
                                                        ) : !feeTypes[0].name ? (
                                                            <LoadingIcon />
                                                        ) : feeTypes.filter((t:any) => user.fee_types.includes(t.name)).map((c:any) => (
                                                            <SelectItem value={c.name} key={c._id}>{c.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>


                    {/* Late Fee On Due */}
                    <div className='w-full flex flex-row items-center gap-2'>
                        <p className='text-xs text-hash-color'>Late Fee On Due</p>
                        <FormField
                            control={form.control}
                            name='late_fee_on_due'
                            render={({field}) => (
                                <FormItem className='relative flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <div className='w-full h-full flex flex-col items-start'>
                                        <FormControl>
                                            <RadioGroup
                                                value={form.getValues().late_fee_on_due ? 'yes' : 'no'}
                                                className='flex flex-row items-center gap-2'
                                            >
                                                <div className='flex items-center space-x-2'>
                                                    <RadioGroupItem value='yes' id='yes' onClick={() => form.setValue('late_fee_on_due', true)}/>
                                                    <Label htmlFor='yes' className='text-xs'>Yes</Label>
                                                </div>
                                                <div className='flex items-center space-x-2'>
                                                    <RadioGroupItem value='no' id='no' onClick={() => form.setValue('late_fee_on_due', false)}/>
                                                    <Label htmlFor='no' className='text-xs'>No</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>


                    <div className='w-full flex flex-row items-center gap-2'>
                        {/* Dues Amount */}
                        <FormField
                            control={form.control}
                            name='dues_amount'
                            render={({field}) => (
                                <FormItem className='w-full'>
                                    <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[40%]'>Dues Amount</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[60%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={!form.getValues().late_fee_on_due}
                                                    className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-xs'/>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {/* Is percent */}
                        %
                        <Checkbox
                            className='rounded-[2px] text-hash-color'
                            checked={form.getValues().is_percent}
                            onClick={() => form.setValue('is_percent', !form.getValues().is_percent)}
                            disabled={!form.getValues().late_fee_on_due}
                        />
                        {/* Fee */}
                        <div className='w-[80%] h-10 flex flex-col items-center sm:flex-row'>
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2'>
                                <FormField
                                    control={form.control}
                                    name='heads'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger
                                                        disabled={!form.getValues().late_fee_on_due}
                                                        className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'
                                                    >
                                                        <SelectValue placeholder='Please Select' className='text-xs' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='All'>All</SelectItem>
                                                        {heads.length < 1 ? (
                                                            <p className='text-hash-color text-xs'>No heads</p>
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
                    </div>



                    <div className='flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[2px]'>
                        <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[2px]'>Fine Waive Off Setting</h2>
                        <div className='flex flex-row flex-wrap gap-4 p-2 pl-4'>
                            <RadioGroup
                                value={form.getValues().fine_waive_off_setting}
                                className='flex flex-col items-start gap-2'
                            >
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem
                                        value='Do not show waive off checkbox on Fee entry form (Default)'
                                        id='Do not show waive off checkbox on Fee entry form (Default)'
                                        onClick={() => form.setValue('fine_waive_off_setting', 'Do not show waive off checkbox on Fee entry form (Default)')}
                                    />
                                    <Label
                                        htmlFor='Do not show waive off checkbox on Fee entry form (Default)'
                                        className='text-xs'
                                    >
                                        Do not show waive off checkbox on Fee entry form (Default)
                                    </Label>
                                </div>

                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem
                                        value='Show waive off checkbox on Fee entry form without reason'
                                        id='Show waive off checkbox on Fee entry form without reason'
                                        onClick={() => form.setValue('fine_waive_off_setting', 'Show waive off checkbox on Fee entry form without reason')}
                                    />
                                    <Label
                                        htmlFor='Show waive off checkbox on Fee entry form without reason'
                                        className='text-xs'
                                    >
                                        Show waive off checkbox on Fee entry form without reason
                                    </Label>
                                </div>

                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem
                                        value='Show waive off checkbox on Fee entry form with reason'
                                        id='Show waive off checkbox on Fee entry form with reason'
                                        onClick={() => form.setValue('fine_waive_off_setting', 'Show waive off checkbox on Fee entry form with reason')}
                                    />
                                    <Label
                                        htmlFor='Show waive off checkbox on Fee entry form with reason'
                                        className='text-xs'
                                    >
                                        Show waive off checkbox on Fee entry form with reason
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>




                    {/* Buttons */}
                    <div className='flex flex-col items-center mt-[-20px]'>
                        <Buttons setIsViewOpened={setIsViewOpened} dueLimits={dueLimits} updateDueLimit={updateDueLimit} setUpdateDueLimit={setUpdateDueLimit} onSubmit={onSubmit} form={form} />
                    </div>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;