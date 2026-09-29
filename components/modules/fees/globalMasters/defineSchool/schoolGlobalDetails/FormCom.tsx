'use client';
// Imports
import * as z from 'zod';
import {useEffect, useState} from 'react';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Input} from '@/components/ui/input';
import { Label } from "@/components/ui/label"
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {uploadSchoolLogo} from '@/lib/actions/image.actions';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {SchoolGlobalValidation} from '@/lib/validations/fees/globalMasters/defineSchool/schoolGlobalDetails';
import {createGlobalSchoolDetails, modifyGlobalSchoolDetails, deleteGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';





// Main function
const FormCom = ({setIsViewOpened, schoolsDetails, updateSchoolDetails, setUpdateSchoolDetails, boards, setIsLoading}:any) => {


    // Toast
    const {toast} = useToast();


    // File
    const [file, setFile] = useState(null);


    // Image source (For image preview)
    const [imageSrc, setImageSrc] = useState('');


    // Handle logo on change
    const handleLogoOnChange = (e:any) => {
        setFile(e.target.files[0])
        const reader = new FileReader();
        reader.onload = function(onLoadEvent) {
            // @ts-ignore
            setImageSrc(onLoadEvent.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };


    // Comparison object
    const comparisonObject = {
        school_main:updateSchoolDetails.school_main,
        school_subheads:updateSchoolDetails.school_subheads,
        logo:updateSchoolDetails.logo,
        school_name:updateSchoolDetails.school_name,
        school_address:updateSchoolDetails.school_address,
        school_address_2:updateSchoolDetails.school_address_2,
        school_short_name:updateSchoolDetails.school_short_name,
        contact_no:updateSchoolDetails.contact_no,
        mobile:updateSchoolDetails.mobile,
        email:updateSchoolDetails.email,
        support_email_id:updateSchoolDetails.support_email_id,
        website:updateSchoolDetails.website,
        prefix:updateSchoolDetails.prefix,
        iso_details:updateSchoolDetails.iso_details,
        principal_signature:updateSchoolDetails.principal_signature,
        accountant_signature:updateSchoolDetails.accountant_signature,
        school_no:updateSchoolDetails.school_no,
        affiliation_to:updateSchoolDetails.affiliation_to,
        affiliation_no:updateSchoolDetails.affiliation_no,
        udise_code:updateSchoolDetails.udise_code,
        pen:updateSchoolDetails.pen,
        associates:updateSchoolDetails.associates,
        renew_up_to:updateSchoolDetails.renew_up_to,
        school_status:updateSchoolDetails.school_status,
        working_days:updateSchoolDetails.working_days,
        recess:updateSchoolDetails.recess,
        total_period:updateSchoolDetails.total_period,
        academic_year:'',
        financial_year:'',
        facebook_link:updateSchoolDetails.facebook_link,
        linkedin_link:updateSchoolDetails.linkedin_link,
        twitter_link:updateSchoolDetails.twitter_link,
        instagram_link:updateSchoolDetails.instagram_link
    };


    // Form
    const form = useForm({
        resolver:zodResolver(SchoolGlobalValidation),
        defaultValues:{
            school_main:updateSchoolDetails.id === '' ? false : updateSchoolDetails.school_main,
            school_subheads:updateSchoolDetails.id === '' ? false : updateSchoolDetails.school_subheads,
            logo:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.logo,
            school_name:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.school_name,
            school_address:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.school_address,
            school_address_2:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.school_address_2,
            school_short_name:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.school_short_name,
            contact_no:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.contact_no,
            mobile:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.mobile,
            email:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.email,
            support_email_id:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.support_email_id,
            website:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.website,
            prefix:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.prefix,
            iso_details:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.iso_details,
            principal_signature:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.principal_signature,
            accountant_signature:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.accountant_signature,
            school_no:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.school_no,
            affiliation_to:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.affiliation_to,
            affiliation_no:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.affiliation_no,
            udise_code:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.udise_code,
            pen:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.pen,
            associates:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.associates,
            renew_up_to:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.renew_up_to,
            school_status:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.school_status,
            working_days:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.working_days,
            recess:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.recess,
            total_period:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.total_period,
            academic_year:'',
            financial_year:'',
            facebook_link:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.facebook_link,
            linkedin_link:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.linkedin_link,
            twitter_link:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.twitter_link,
            instagram_link:updateSchoolDetails.id === '' ? '' : updateSchoolDetails.instagram_link
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof SchoolGlobalValidation>) => {
        setIsLoading(true);
        // Create school details
        if(updateSchoolDetails.id === ''){
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                await uploadSchoolLogo({data:formData, school_name:values.school_name.replace(/ /g, '-')});
            };
            const res = await createGlobalSchoolDetails({
                logo:file !== null ? `https://qodum.s3.amazonaws.com/schools/${values.school_name.replace(/ /g, '-')}` : '',
                school_main:values.school_main,
                school_subheads:values.school_subheads,
                school_name:values.school_name,
                school_address:values.school_address,
                school_address_2:values.school_address_2,
                school_short_name:values.school_short_name,
                contact_no:values.contact_no,
                mobile:values.mobile,
                email:values.email,
                support_email_id:values.support_email_id,
                website:values.website,
                prefix:values.prefix,
                iso_details:values.iso_details,
                principal_signature:values.principal_signature,
                accountant_signature:values.accountant_signature,
                school_no:values.school_no,
                affiliation_to:values.affiliation_to,
                affiliation_no:values.affiliation_no,
                udise_code:values.udise_code,
                pen:values.pen,
                associates:values.associates,
                renew_up_to:values.renew_up_to,
                school_status:values.school_status,
                working_days:values.working_days,
                recess:values.recess,
                total_period:values.total_period,
                academic_year:'',
                financial_year:'',
                facebook_link:values.facebook_link,
                linkedin_link:values.linkedin_link,
                twitter_link:values.twitter_link,
                instagram_link:values.instagram_link
            });
            toast({title:'Added Successfully!'});
        }
        // Modify school details
        else if(!deepEqual(comparisonObject, {...values, logo:comparisonObject.logo}) || file){
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                await uploadSchoolLogo({data:formData, school_name:values.school_name.replace(/ /g, '-')});
            };
            await modifyGlobalSchoolDetails({
                id:updateSchoolDetails.id,
                logo:file !== null ? `https://qodum.s3.amazonaws.com/schools/${values.school_name.replace(/ /g, '-')}` : comparisonObject.logo,
                school_main:values.school_main,
                school_subheads:values.school_subheads,
                school_name:values.school_name,
                school_address:values.school_address,
                school_address_2:values.school_address_2,
                school_short_name:values.school_short_name,
                contact_no:values.contact_no,
                mobile:values.mobile,
                email:values.email,
                support_email_id:values.support_email_id,
                website:values.website,
                prefix:values.prefix,
                iso_details:values.iso_details,
                principal_signature:values.principal_signature,
                accountant_signature:values.accountant_signature,
                school_no:values.school_no,
                affiliation_to:values.affiliation_to,
                affiliation_no:values.affiliation_no,
                udise_code:values.udise_code,
                pen:values.pen,
                associates:values.associates,
                renew_up_to:values.renew_up_to,
                school_status:values.school_status,
                working_days:values.working_days,
                recess:values.recess,
                total_period:values.total_period,
                academic_year:'',
                financial_year:'',
                facebook_link:values.facebook_link,
                linkedin_link:values.linkedin_link,
                twitter_link:values.twitter_link,
                instagram_link:values.instagram_link
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete school details
        else if(updateSchoolDetails.isDeleteClicked){
            await deleteGlobalSchoolDetails({id:updateSchoolDetails.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateSchoolDetails({
            id:'',
            school_main:false,
            logo:'',
            school_subheads:false,
            school_name:'',
            school_address:'',
            school_address_2:'',
            school_short_name:'',
            contact_no:'',
            mobile:'',
            email:'',
            support_email_id:'',
            website:'',
            prefix:'',
            iso_details:'',
            principal_signature:'',
            accountant_signature:'',
            school_no:'',
            affiliation_to:'',
            affiliation_no:'',
            udise_code:'',
            pen:'',
            associates:'',
            renew_up_to:'',
            school_status:'',
            working_days:'',
            recess:'',
            total_period:'',
            academic_year:'',
            financial_year:'',
            facebook_link:'',
            linkedin_link:'',
            twitter_link:'',
            instagram_link:'',
            isDeleteClicked:false
        });
        // Reseting form
        form.reset({
            school_main:true,
            school_subheads:false,
            logo:'',
            school_name:'',
            school_address:'',
            school_address_2:'',
            school_short_name:'',
            contact_no:'',
            mobile:'',
            email:'',
            support_email_id:'',
            website:'',
            prefix:'',
            iso_details:'',
            principal_signature:'',
            accountant_signature:'',
            school_no:'',
            affiliation_to:'',
            affiliation_no:'',
            udise_code:'',
            pen:'',
            associates:'',
            renew_up_to:'',
            school_status:'',
            working_days:'',
            recess:'',
            total_period:'',
            academic_year:'',
            financial_year:'',
            facebook_link:'',
            linkedin_link:'',
            twitter_link:'',
            instagram_link:''
        });
        setImageSrc('');
        setFile(null);
        setIsLoading(false);
    };


    useEffect(() => {
        form.setValue('affiliation_to', boards.find(b => b.is_default)?.board);
    }, [boards]);


    return (
        <div className='w-[90%] h-full max-w-[900px] flex flex-col mt-[-30px] items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>School Details</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col overflow-y-scroll px-2 sm:px-4 custom-sidebar-scrollbar'
                >

                    <div className='w-full flex flex-col mt-2 sm:flex-row sm:gap-20'>

                        <div className='flex-1 flex flex-col gap-2'>


                            {/* Radios */}
                            <div className='flex flex-row items-center justify-between sm:justify-end'>
                                {/* School Main */}
                                <RadioGroup className='flex justify-end gap-[2px]' defaultValue='option-one'>
                                    <RadioGroupItem value='option-one' id='option-one' disabled/>
                                    <Label htmlFor='option-one' className='text-[10px] sm:text-xs'>School Main</Label>
                                </RadioGroup>
                                {/* School Subheads */}
                                <RadioGroup className='flex justify-end gap-[2px] sm:hidden'>
                                    <RadioGroupItem value='option-one' id='option-one' disabled/>
                                    <Label htmlFor='option-one' className='text-[10px] sm:text-xs'>School Subheads</Label>
                                </RadioGroup>
                            </div>



                            {/* School Name */}
                            <FormField
                                control={form.control}
                                name='school_name'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>School Name</FormLabel>
                                            <div className='relative basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                                <div className='absolute top-0 sm:left-[100%] sm:w-[130px] text-[10px]'>
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* School Address */}
                            <FormField
                                control={form.control}
                                name='school_address'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>School Address</FormLabel>
                                            <div className='relative basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                                <div className='absolute top-0 sm:left-[100%] sm:w-[130px] text-[10px]'>
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* School Address 2 */}
                            <FormField
                                control={form.control}
                                name='school_address_2'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>School Address 2</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* School Short Name*/}
                            <FormField
                                control={form.control}
                                name='school_short_name'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>School Short Name</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Contact No.*/}
                            <FormField
                                control={form.control}
                                name='contact_no'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Contact No.</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Mobile */}
                            <FormField
                                control={form.control}
                                name='mobile'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Mobile</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name='email'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Email</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Support Email Id */}
                            <FormField
                                control={form.control}
                                name='support_email_id'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Support Email Id</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Website */}
                            <FormField
                                control={form.control}
                                name='website'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Website</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Prefix */}
                            <FormField
                                control={form.control}
                                name='prefix'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Prefix</FormLabel>
                                            <div className='relative basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                                <div className='absolute top-0 sm:left-[100%] sm:w-[130px] text-[10px]'>
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* ISO Details */}
                            <FormField
                                control={form.control}
                                name='iso_details'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>ISO Details</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Principal Signature */}
                            <FormField
                                control={form.control}
                                name='principal_signature'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Principal Signature</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Accountant Signature */}
                            <FormField
                                control={form.control}
                                name='accountant_signature'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Accountant Signature</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Logo */}
                            <div className='w-full mt-2 flex items-center justify-center'>
                                <div className='w-[75px] h-[75px] mb-2 flex items-center justify-center bg-[#ccc] cursor-pointer rounded-full transition hover:opacity-90'>
                                    <label
                                        // @ts-ignore
                                        for='image'
                                        className='flex items-center justify-center h-full w-full cursor-pointer text-xs font-semibold'
                                    >
                                        {imageSrc !== '' ? (
                                            <img
                                                alt="Student's image"
                                                src={imageSrc}
                                                className='w-full h-full rounded-full'
                                            />
                                        ) : updateSchoolDetails.logo ? (
                                            <img
                                                alt="Student's image"
                                                src={updateSchoolDetails.logo}
                                                className='w-full h-full rounded-full'
                                            />
                                        ) : (
                                            <p className='text-[11px]'>Select Logo</p>
                                        )}
                                    </label>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        name='image'
                                        id='image'
                                        className='hidden'
                                        onChange={(e:any) => {handleLogoOnChange(e)}}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className='flex-1 flex flex-col gap-2'>

                            {/* School Subheads */}
                            <RadioGroup className='hidden justify-end gap-[2px] sm:flex'>
                                <RadioGroupItem value='option-one' id='option-one' disabled/>
                                <Label htmlFor='option-one' className='text-[10px] sm:text-xs'>School Subheads</Label>
                            </RadioGroup>

                            {/* School No. */}
                            <FormField
                                control={form.control}
                                name='school_no'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>School No.</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Affiliation To */}
                            <FormField
                                control={form.control}
                                name='affiliation_to'
                                render={({field}) => (
                                    <FormItem className='w-full mt-[4px]'>
                                    <div className='w-full h-6 flex flex-row items-center justify-center sm:gap-2'>
                                        <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Affiliation To</FormLabel>
                                        <div className='basis-[70%] flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                        <SelectValue placeholder='Select'/>
                                                        <ChevronDown className='h-4 w-4 opacity-50'/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {boards.length < 1 ? (
                                                            <p>No boards</p>
                                                        ) : !boards[0].board ? (
                                                            <LoadingIcon />
                                                        ) : boards.map((board:any) => (
                                                            <SelectItem value={board.board} key={board._id}>{board.board}</SelectItem>
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

                            {/* Affiliation No. */}
                            <FormField
                                control={form.control}
                                name='affiliation_no'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full pr-2 flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Affiliation No.</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* UDISE Code */}
                            <FormField
                                control={form.control}
                                name='udise_code'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>UDISE Code</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* PEN */}
                            <FormField
                                control={form.control}
                                name='pen'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>PEN</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Associates */}
                            <FormField
                                control={form.control}
                                name='associates'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Associates</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Renew Up To */}
                            <FormField
                                control={form.control}
                                name='renew_up_to'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Renew Up To</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* School Status */}
                            <FormField
                                control={form.control}
                                name='school_status'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>School Status</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Working Days */}
                            <FormField
                                control={form.control}
                                name='working_days'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Working Days</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Recess */}
                            <FormField
                                control={form.control}
                                name='recess'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Recess</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Total Period */}
                            <FormField
                                control={form.control}
                                name='total_period'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Total Period</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Face Book Link */}
                            <FormField
                                control={form.control}
                                name='facebook_link'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Face Book Link</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Linked In Link */}
                            <FormField
                                control={form.control}
                                name='linkedin_link'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Linked In Link</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Twitter Link */}
                            <FormField
                                control={form.control}
                                name='twitter_link'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Twitter Link</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Instagram Link */}
                            <FormField
                                control={form.control}
                                name='instagram_link'
                                render={({field}) => (
                                    <FormItem>
                                        <div className='h-6 flex flex-row mt-[4px] sm:flex-row sm:items-center sm:gap-2'>
                                            <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[35%]'>Instagram Link</FormLabel>
                                            <div className='basis-[70%] h-full sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                        </div>

                    </div>


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} schoolsDetails={schoolsDetails} updateSchoolDetails={updateSchoolDetails} setUpdateSchoolDetails={setUpdateSchoolDetails} onSubmit={onSubmit} form={form} setImageSrc={setImageSrc} setFile={setFile}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;