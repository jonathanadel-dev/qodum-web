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
import {DocumentValidation} from '@/lib/validations/admission/globalMasters/document/document.validation';
import {createDocument, deleteDocument, modifyDocument} from '@/lib/actions/admission/globalMasters/document/document.actions';





// Main function
const FormCom = ({documentTypes, setIsViewOpened, documents, updateDocument, setUpdateDocument}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        document_type:updateDocument.document_type,
        document_name:updateDocument.document_name
    };


    // Form
    const form = useForm({
        resolver:zodResolver(DocumentValidation),
        defaultValues:{
            document_type:updateDocument.id === '' ? '' : updateDocument.document_type,
            document_name:updateDocument.id === '' ? '' : updateDocument.document_name
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof DocumentValidation>) => {
        // Create document
        if(updateDocument.id === ''){
            if(documents.map((d:any) => d.document_name).includes(values.document_name)){
                toast({title:'Document name already exists', variant:'error'});
                return;
            };
            const res = await createDocument({
                document_type:values.document_type,
                document_name:values.document_name
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify document
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.document_name !== values.document_name && documents.map((d:any) => d.document_name).includes(values.document_name)){
                toast({title:'Document name already exists', variant:'error'});
                return;
            };
            await modifyDocument({
                id:updateDocument.id,
                document_type:values.document_type,
                document_name:values.document_name
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete document
        else if(updateDocument.isDeleteClicked){
            await deleteDocument({id:updateDocument.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateDocument({
            id:'',
            isDeleteClicked:false,
            document_type:'',
            document_name:''
        });
        // Reseting form
        form.reset({
            document_type:'',
            document_name:''
        });
    };


    return (
        <Form
            {...form}
        >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='relative w-full flex flex-col pt-4 gap-4 items-center px-2 sm:px-4 sm:gap-0'
            >


                {/* Document Type */}
                <FormField
                    control={form.control}
                    name='document_type'
                    render={({field}) => (
                        <FormItem className='w-full'>
                        <div className='w-full flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                            <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Document Type</FormLabel>
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
                                            {documentTypes.length < 1 ? (
                                                <p>No document types</p>
                                            ) : !documentTypes[0].document_type ? (
                                                <LoadingIcon />
                                            ) : documentTypes.map((item:any) => (
                                                <SelectItem value={item.document_type} key={item._id}>{item.document_type}</SelectItem>
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


                {/* Document Name */}
                <FormField
                    control={form.control}
                    name='document_name'
                    render={({field}) => (
                        <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                            <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Document Name</FormLabel>
                            <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className='flex flex-row items-center h-8 text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
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
                <Buttons setIsViewOpened={setIsViewOpened} documents={documents} updateDocument={updateDocument} setUpdateDocument={setUpdateDocument} onSubmit={onSubmit} form={form}/>

                
            </form>
        </Form>
    );
};





// Export
export default FormCom;