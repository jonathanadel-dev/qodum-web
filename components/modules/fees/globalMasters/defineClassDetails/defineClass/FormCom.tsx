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
import {ClassValidation} from '@/lib/validations/fees/globalMasters/defineClassDetails/class.validation';
import {createClass, deleteClass, modifyClass} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';





// Main function
const FormCom = ({setIsViewOpened, wings, classes, schools, updateClass, setUpdateClass}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        class_name:updateClass.class_name,
        wing_name:updateClass.wing_name,
        school:updateClass.school,
        order:updateClass.order
    };


    // Form
    const form = useForm({
        resolver:zodResolver(ClassValidation),
        defaultValues:{
            class_name:updateClass.id === '' ? '' : updateClass.class_name,
            wing_name:updateClass.id === '' ? '' : updateClass.wing_name,
            school:updateClass.id === '' ? '' : updateClass.school,
            order:updateClass.id === '' ? 0 : updateClass.order
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof ClassValidation>) => {
        // Create class
        if(updateClass.id === ''){
            if(classes.map((item:any) => item.class_name).includes(values.class_name)){
                toast({title:'Class name already exists', variant:'error'});
                return;
            };
            const res = await createClass({
                class_name:values.class_name,
                wing_name:values.wing_name,
                school:values.school,
                order:values.order
            });
            toast({title:'Added Successfully!'});
        }
        // Modify class
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.class_name !== values.class_name && classes.map((item:any) => item.class_name).includes(values.class_name)){
                toast({title:'Class name is already exists', variant:'error'});
                return;
            };
            await modifyClass({
                id:updateClass.id,
                class_name:values.class_name,
                wing_name:values.wing_name,
                school:values.school,
                order:values.order
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete class
        else if(updateClass.isDeleteClicked){
            await deleteClass({id:updateClass.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateClass({
            id:'',
            isDeleteClicked:false,
            class_name:'',
            wing_name:'',
            school:'',
            order:0
        });
        // Reseting form
        form.reset({
            class_name:'',
            wing_name:'',
            school:'',
            order:0
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Class</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col gap-8 pt-4 items-center px-2 sm:px-4 sm:gap-4'
                >



                    {/* Class Name */}
                    <FormField
                        control={form.control}
                        name='class_name'
                        render={({field}) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2  text-xs text-[#726E71] sm:basis-[30%]'>Class Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Wing Name */}
                    <FormField
                        control={form.control}
                        name='wing_name'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2  text-xs text-[#726E71] sm:basis-[30%]'>Wing Name</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select Wing'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {wings.length < 1 ? (
                                                    <p>No wings</p>
                                                ) : !wings[0].wing ? (
                                                    <LoadingIcon />
                                                ) : wings.map((wing:any) => (
                                                    <SelectItem value={wing.wing} key={wing._id}>{wing.wing}</SelectItem>
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

                    {/* School */}
                    <FormField
                        control={form.control}
                        name='school'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2  text-xs text-[#726E71] sm:basis-[30%]'>School</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select School'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {schools.length < 1 ? (
                                                    <p>No schools</p>
                                                ) : !schools[0].school_name ? (
                                                    <LoadingIcon />
                                                ) : schools.map((school:any) => (
                                                    <SelectItem value={school.school_name} key={school._id}>{school.school_name}</SelectItem>
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

                    {/* Order */}
                    <FormField
                        control={form.control}
                        name='order'
                        render={({field}) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2  text-xs text-[#726E71] sm:basis-[30%]'>Order</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} classes={classes} updateClass={updateClass} setUpdateClass={setUpdateClass} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;