'use client';
// Imports
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form';
import {changeAcademic} from '@/lib/actions/accounts/masterSettings/changeAcademic.actions';
import {ChangeAcademicValidation} from '@/lib/validations/accounts/masterSettings/changeAcademic';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';





// Main function
const FormCom = ({academicYears, financialYears, schoolsNames, activeAcademicYear, activeFinancialYear}:any) => {

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


    // Pathname
    const pathname = usePathname();


    // Toast
    const {toast} = useToast();


    // Form
    const form = useForm({
        resolver:zodResolver(ChangeAcademicValidation),
        defaultValues:{
            academic_year:activeAcademicYear,
            financial_year:activeFinancialYear,
            school_name:''
        }
    });


    // Submit handler
    const submitHandler = async (e:any) => {
        e.preventDefault();
        if(deepEqual(form.getValues(), {
                academic_year:'',
                financial_year:'',
                school_name:''
        })){
            toast({title:'No data was changed', variant:'alert'});
        }else{

            await changeAcademic({
                academic_year:form.getValues('academic_year') === '' ? activeAcademicYear : form.getValues('academic_year'),
                financial_year:form.getValues('financial_year') === '' ? activeFinancialYear : form.getValues('financial_year'),
                school_name:form.getValues('school_name')
            });
            toast({title:'Changed Successfully!'});
            window.location.reload();
        }
    };


    // Use effect
    useEffect(() => {
        const formatTitle = (input:any) => {
            return input
                .split(/[-_]/)
                .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        };
        const currentModule = formatTitle(pathname.split('/')[1]);
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === currentModule)?.permissions?.find((pp:any) => pp.sub_menu === 'Change Academic');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Change Academic</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={submitHandler}
                    className='w-full flex flex-col items-center px-2 sm:px-4'
                >

                    {/* Academic Year */}
                    <FormField
                        control={form.control}
                        name='academic_year'
                        render={({field}) => (
                            <FormItem className='w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>Academic Year</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={!permissions.read_only}
                                    >
                                        <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                                            <SelectValue placeholder={activeAcademicYear || <LoadingIcon />}/>
                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {academicYears.map((year:any) => (
                                                <SelectItem
                                                    value={year || <LoadingIcon />}
                                                    key={year}
                                                >
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Financial Year */}
                    <FormField
                        control={form.control}
                        name='financial_year'
                        render={({field}) => (
                            <FormItem className='w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:mt-0'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>Financial Year</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={!permissions.read_only}
                                    >
                                        <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                                            <SelectValue placeholder={activeFinancialYear || <LoadingIcon />}/>
                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {financialYears.map((year:any) => (
                                                <SelectItem
                                                    value={year || <LoadingIcon />}
                                                    key={year}
                                                >
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* School Name */}
                    <FormField
                        control={form.control}
                        name='school_name'
                        render={({field}) => (
                            <FormItem className='w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:mt-0'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>School</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={!permissions.read_only}
                                    >
                                        <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                                            <SelectValue placeholder={schoolsNames[0] || <LoadingIcon />}/>
                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {schoolsNames.map((name:any) => (
                                                <SelectItem
                                                    value={name || <LoadingIcon />}
                                                    key={name}
                                                >
                                                    {name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    {permissions.modify && (
                        <Button
                            type='submit'
                            className='px-8 h-8 mb-4 mt-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px]'
                        >
                            Change
                        </Button>
                    )}
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;