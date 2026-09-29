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
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {MeritCriteriaValidation} from '@/lib/validations/admission/admission/entranceTest/meritCriteria.validation';
import {createMeritCriteria, deleteMeritCriteria, modifyMeritCriteria} from '@/lib/actions/admission/admission/entranceTest/meritCriteria.actions';





// Main function
const FormCom = ({setIsViewOpened, meritCriterias, updateMeritCriteria, setUpdateMeritCriteria, sessions}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        session:updateMeritCriteria.session,
        name:updateMeritCriteria.name,
        maximum_point:updateMeritCriteria.maximum_point
    };


    // Form
    const form = useForm({
        resolver:zodResolver(MeritCriteriaValidation),
        defaultValues:{
            session:updateMeritCriteria.id === '' ? '' : updateMeritCriteria.session,
            name:updateMeritCriteria.id === '' ? '' : updateMeritCriteria.name,
            maximum_point:updateMeritCriteria.id === '' ? 0 : updateMeritCriteria.maximum_point
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof MeritCriteriaValidation>) => {
        // Create merit criteria
        if(updateMeritCriteria.id === ''){
            if(meritCriterias.map((m:any) => m.name).includes(values.name)){
                toast({title:'Criteria name already exists', variant:'error'});
                return;
            };
            const res = await createMeritCriteria({
                session:values.session,
                name:values.name,
                maximum_point:values.maximum_point
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify merit criteria
        else if(!deepEqual(comparisonObject, values)){
           if(comparisonObject.name !== values.name && meritCriterias.map((c:any) => c.name).includes(values.name)){
                toast({title:'Criteria name already exists', variant:'error'});
                return;
            };
            await modifyMeritCriteria({
                id:updateMeritCriteria.id,
                session:values.session,
                name:values.name,
                maximum_point:values.maximum_point
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete merit criteria
        else if(updateMeritCriteria.isDeleteClicked){
            await deleteMeritCriteria({id:updateMeritCriteria.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateMeritCriteria({
            id:'',
            isDeleteClicked:false,
            session:'',
            name:'',
            maximum_point:0
        });
        // Reseting form
        form.reset({
            session:'',
            name:'',
            maximum_point:0
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Merit Criteria</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col  pt-4 items-center px-2 gap-4 sm:px-4 sm:gap-0'
                >


                    {/* Document Type */}
                    <FormField
                        control={form.control}
                        name='session'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Session</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Please select'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {sessions.length < 1 ? (
                                                    <p>No sessions</p>
                                                ) : !sessions[0].year_name ? (
                                                    <LoadingIcon />
                                                ) : sessions.map((item:any) => (
                                                    <SelectItem value={item.year_name} key={item._id}>{item.year_name}</SelectItem>
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


                    {/* Name */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Name</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <div className='mt-[-20px] text-xs'>
                                        <FormMessage />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Maximum Point */}
                    <FormField
                        control={form.control}
                        name='maximum_point'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center mt-4 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Maximum Point</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <div className='mt-[-20px] text-xs'>
                                        <FormMessage />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} meritCriterias={meritCriterias} updateMeritCriteria={updateMeritCriteria} setUpdateMeritCriteria={setUpdateMeritCriteria} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;