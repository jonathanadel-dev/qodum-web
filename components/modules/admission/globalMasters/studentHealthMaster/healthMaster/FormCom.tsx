'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {HealthMasterValidation} from '@/lib/validations/admission/globalMasters/studentHealthMaster/healthMaster.validation';
import {createHealthMaster, deleteHealthMaster, modifyHealthMaster} from '@/lib/actions/admission/globalMasters/studentHealthMaster/healthMaster.actions';
import LoadingIcon from '@/components/shared/LoadingIcon';





// Main function
const FormCom = ({setIsViewOpened, healthMasters, updateHealthMaster, setUpdateHealthMaster, healthUnits}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        health_parameter: updateHealthMaster.health_parameter,
        unit: updateHealthMaster.unit
    };


    // Form
    const form: any = useForm({
        resolver: zodResolver(HealthMasterValidation),
        defaultValues: {
            health_parameter: updateHealthMaster.id === '' ? '' : updateHealthMaster.health_parameter,
            unit: updateHealthMaster.id === '' ? '' : updateHealthMaster.unit
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof HealthMasterValidation>) => {
        // Create remark
        if (updateHealthMaster.id === '') {
            if (healthMasters.map((hMaster: any) => hMaster.health_parameter).includes(values.health_parameter)) {
                toast({ title: 'Health paramater already exists', variant: 'error' });
                return;
            };
            const res = await createHealthMaster({
                health_parameter: values.health_parameter,
                unit: values.unit
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({ title: 'Added Successfully!' });
        }
        // Modify Health Master
        else if (!deepEqual(comparisonObject, values)) {
            if (comparisonObject.health_parameter !== values.health_parameter && healthMasters.map((hMaster: any) => hMaster.health_parameter).includes(values.health_parameter)) {
                toast({ title: 'Health parameter already exists', variant: 'error' });
                return;
            };
            await modifyHealthMaster({
                id: updateHealthMaster.id,
                health_parameter: values.health_parameter,
                unit: values.unit
            });
            toast({ title: 'Updated Successfully!' });
        }
        // Delete remark
        else if (updateHealthMaster.isDeleteClicked) {
            await deleteHealthMaster({ id: updateHealthMaster.id });
            toast({ title: 'Deleted Successfully!' });
        };


        // Reseting update entity
        setUpdateHealthMaster({
            id: '',
            isDeleteClicked: false,
            health_parameter: '',
            unit: ''
        });
        // Reseting form
        form.reset({
            health_parameter: '',
            unit: ''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Health Master</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 gap-2 sm:px-4'
                >



                    {/* Health Paramater */}
                    <FormField
                        control={form.control}
                        name='health_parameter'
                        render={({ field }) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Health Parameter</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <div className='mt-[-10px] text-xs'>
                                        <FormMessage />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Unit */}
                    <FormField
                        control={form.control}
                        name='unit'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-10 mt-6 sm:flex-row sm:items-center sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-end text-xs text-[#726E71] pr-2 sm:basis-[30%] sm:mb-0'>Unit</FormLabel>
                                <div className='w-full h-10 flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='w-full h-10 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Select' />
                                                <ChevronDown className='h-4 w-4 opacity-50' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {healthUnits?.length < 1 ? <p>No health units</p> : !healthUnits ? <LoadingIcon /> : healthUnits.map((u:any) => (
                                                    <SelectItem value={u || 'value'} key={u}>{u}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </div>
                                <FormMessage className='absolute text-xs w-[200px] z-10 left-0 sm:left-[30%] top-[100%]' />
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} healthMasters={healthMasters} updateHealthMaster={updateHealthMaster} setUpdateHealthMaster={setUpdateHealthMaster} onSubmit={onSubmit} form={form} />


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;