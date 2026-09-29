// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {fetchBoards} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {FormControl, Form, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {AdmissionSettingValidation} from '@/lib/validations/admission/masterSettings/admission.validation';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
import {createAdmission, deleteAdmission, getEditableNumbers, modifyAdmission} from '@/lib/actions/admission/masterSettings/admission.actions';





// Main function
function FormCom({setIsViewOpened, admissions, updateAdmission, setUpdateAdmission}:any){

    // Toast
    const {toast} = useToast();


    // Schools
    const [schools, setSchools] = useState([{}]);


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Boards
    const [boards, setBoards] = useState([{}]);


    // Is all classes
    const [isAllClasses, setIsAllClasses] = useState(localStorage.getItem('all_classes') === 'true');


    // Numbers
    const [numbers, setNumbers] = useState(['Prospectus No.', 'Registration No.', 'Admission No.']);


    // Editable numbers
    const [editableNumbers, setEditableNumbers] = useState(['']);


    // Comparison object
    const comparisonObject = {
        school:updateAdmission.school,
        class_name:updateAdmission.class_name,
        board:updateAdmission.board,
        setting_type:updateAdmission.setting_type,
        should_be:updateAdmission.should_be,
        rec_no:updateAdmission.rec_no,
        prefix:updateAdmission.prefix,
        start_from:updateAdmission.start_from,
        lead_zero:updateAdmission.lead_zero,
        suffix:updateAdmission.suffix
    };


    // Form
    const form = useForm({
        resolver:zodResolver(AdmissionSettingValidation),
        defaultValues:{
            school:updateAdmission.id === '' ? '' : updateAdmission.school,
            class_name:updateAdmission.id === '' ? '' : updateAdmission.class_name,
            board:updateAdmission.id === '' ? '' : updateAdmission.board,
            setting_type:updateAdmission.id === '' ? '' : updateAdmission.setting_type,
            should_be:updateAdmission.id === '' ? 'Automatic' : updateAdmission.should_be,
            rec_no:updateAdmission.id === '' ? '' : updateAdmission.rec_no,
            prefix:updateAdmission.id === '' ? '' : updateAdmission.prefix,
            start_from:updateAdmission.id === '' ? '' : updateAdmission.start_from,
            lead_zero:updateAdmission.id === '' ? '' : updateAdmission.lead_zero,
            suffix:updateAdmission.id === '' ? '' : updateAdmission.suffix
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof AdmissionSettingValidation>) => {

        // Create setting
        if(updateAdmission.id === ''){
            if(values.prefix !== '' && admissions.map((a:any) => a.prefix).includes(values.prefix)){
                toast({title:'Number already exists', variant:'error'});
                return;
            };
            const res = await createAdmission({
                school:values.school,
                class_name:values.class_name,
                board:values.board,
                setting_type:values.setting_type,
                should_be:values.should_be,
                rec_no:values.rec_no,
                prefix:values.prefix,
                start_from:values.start_from,
                lead_zero:values.lead_zero,
                suffix:values.suffix
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }

        // Modify setting
        else if(!deepEqual(comparisonObject, values)){
            // Checking if number is in use
            if(!editableNumbers.includes(updateAdmission.setting_type)){
                toast({title:"Can't edit number while in use", variant:'alert'});
                return;
            };
            if(values.prefix !== '' && comparisonObject.prefix !== values.prefix && admissions.map((a:any) => a.prefix).includes(values.prefix)){
                toast({title:'Number already exists', variant:'error'});
                return;
            };
            await modifyAdmission({
                id:updateAdmission.id,
                school:values.school,
                class_name:values.class_name,
                board:values.board,
                setting_type:values.setting_type,
                should_be:values.should_be,
                rec_no:values.rec_no,
                prefix:values.prefix,
                start_from:values.start_from,
                lead_zero:values.lead_zero,
                suffix:values.suffix
            });
            toast({title:'Updated Successfully!'});
        }

        // Delete setting
        else if(updateAdmission.isDeleteClicked){
            await deleteAdmission({id:updateAdmission.id});
            toast({title:'Deleted Successfully!'});
        };

        // Reseting update entity
        setUpdateAdmission({
            id:'',
            isDeleteClicked:false,
            school:'',
            class_name:updateAdmission.id === '' && localStorage.getItem('all_classes') === 'true' || isAllClasses ? 'All Classes' : '',
            board:'',
            setting_type:'',
            should_be:'Automatic',
            rec_no:'',
            prefix:'',
            start_from:'',
            lead_zero:'',
            suffix:''
        });
        // Reseting form
        form.reset({
            school:'',
            class_name:updateAdmission.id === '' && localStorage.getItem('all_classes') === 'true' || isAllClasses ? 'All Classes' : '',
            board:'',
            setting_type:'',
            should_be:'Automatic',
            rec_no:'',
            prefix:'',
            start_from:'',
            lead_zero:'',
            suffix:''
        });

    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const schoolsRes = await fetchGlobalSchoolDetails();
            const boardsRes = await fetchBoards();
            const classesRes = await fetchClasses();
            const editableNumbersRes = await getEditableNumbers();
            setSchools(schoolsRes);
            setBoards(boardsRes);
            setClasses(classesRes);
            setEditableNumbers(editableNumbersRes);
            // @ts-ignore
            form.setValue('board', boardsRes.find((b:any) => b.is_default)?.board);
        };
        fetcher();
    }, []);
    useEffect(() => {}, [form.watch('should_be')]);
    useEffect(() => {
        if(updateAdmission.id === '' && localStorage.getItem('all_classes') === 'true' || isAllClasses){
            form.setValue('class_name', 'All Classes');
            const allClasses = admissions.filter((a:any) => a.class_name === 'All Classes');
            const allClassesSetNumbers = allClasses.map((c:any) => c.setting_type);
            const viewNumbers = numbers.filter((n:any) => !allClassesSetNumbers.includes(n));
            setNumbers(viewNumbers);
        };
        if(!isAllClasses){
            setNumbers(['Prospectus No.', 'Registration No.', 'Admission No.']);
        };
    }, [isAllClasses, admissions]);
    useEffect(() => {
        // @ts-ignore
        form.setValue('board', boards.find((b:any) => b.is_default)?.board);
    }, [boards]);

    return (
        <Form
            {...form}
        >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full flex flex-col items-center px-2 pt-6 sm:px-4'
            >


                {/* Enquiry, Registration, and Admission No. Setting */}
                <div className='w-full flex flex-col mt-4 border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
                    <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>Enquiry, Registration, and Admission No. Setting</h2>
                    <div className='flex flex-col px-4 py-2 gap-2'>
                        <div className='flex flex-row gap-2'>
                            {/* All Classes */}
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-end justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-center space-x-2'>
                                            <Label
                                                htmlFor='all_classes'
                                                className='text-xs text-[#726E71] text-end pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                            >
                                                All Classes
                                            </Label>
                                            <Switch
                                                id='all_classes'
                                                // @ts-ignore
                                                checked={isAllClasses}
                                                onClick={() => {
                                                    if(localStorage.getItem('all_classes') === 'true'){
                                                        localStorage.setItem('all_classes', 'false');
                                                        form.setValue('class_name', '');
                                                    }else{
                                                        localStorage.setItem('all_classes', 'true');
                                                        form.setValue('class_name', 'All Classes');
                                                    }
                                                    setIsAllClasses(!isAllClasses);
                                                }}
                                            />
                                        </div>
                                    </FormControl>
                                </>
                            </FormItem>                       
                        </div>
                        <div className='flex flex-row gap-2'>
                            {/* School */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>School</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='school'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field?.value}
                                                        onValueChange={field?.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {schools?.length < 1 ? (
                                                                <p>No schools</p>
                                                                // @ts-ignore
                                                            ) : !schools[0]?.school_name ? (
                                                                <LoadingIcon />
                                                            ) : schools?.map((item:any) => (
                                                                <SelectItem value={item?.school_name} key={item?._id}>{item?.school_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Class */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Class</FormLabel>
                                <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='class_name'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        disabled={isAllClasses}
                                                        {...field}
                                                        value={field?.value}
                                                        onValueChange={field?.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {isAllClasses && (
                                                                <SelectItem value='All Classes'>All Classes</SelectItem>
                                                            )}
                                                            {classes?.length < 1 ? (
                                                                <p>No classes</p>
                                                                // @ts-ignore
                                                            ) : !classes[0]?.class_name ? (
                                                                <LoadingIcon />
                                                            ) : classes?.map((item:any) => (
                                                                <SelectItem value={item?.class_name} key={item?._id}>{item?.class_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Board */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Board</FormLabel>
                                <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField 
                                        control={form?.control}
                                        name='board'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field?.value}
                                                        onValueChange={field?.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {boards?.length < 1 ? (
                                                                <p>No boards</p>
                                                                // @ts-ignore
                                                            ) : !boards[0]?.board ? (
                                                                <LoadingIcon />
                                                            ) : boards?.map((item:any) => (
                                                                <SelectItem value={item?.board} key={item?._id}>{item?.board}</SelectItem>
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


                        <div className='flex flex-col gap-4 lg:flex-row mt-4'>
                            {/* Setting Type */}
                            <div className='flex-1 flex flex-col items-center'>
                                <FormField 
                                    control={form?.control}
                                    name='setting_type'
                                    render={({ field }) => (
                                        <FormItem className='w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {numbers.length < 1 && updateAdmission.id === '' ? (
                                                            <span>No numbers to set</span>
                                                        ) : numbers.map((n:any) => (
                                                            <SelectItem value={n}>{n}</SelectItem>
                                                        ))}
                                                        {updateAdmission.id !== '' && (
                                                            <SelectItem value={updateAdmission.setting_type}>{updateAdmission.setting_type}</SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Should Be */}
                            <div className="flex-1 flex flex-col items-start  gap-1">
                                <FormLabel className='text-start text-xs text-[#726E71] me-3'>should be</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='should_be'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                {/* @ts-ignore */}
                                                <RadioGroup
                                                    {...field}
                                                    defaultValue={form.getValues().should_be}
                                                    className='flex gap-2'
                                                >
                                                    <RadioGroupItem
                                                        value='Automatic'
                                                        onClick={() => form.setValue('should_be', 'Automatic')}
                                                    />
                                                    <Label className='text-xs text-[#726E71] '>Automatic</Label>
                                                    <RadioGroupItem
                                                        value='Manual'
                                                        onClick={() => form.setValue('should_be', 'Manual')}
                                                    />
                                                    <Label className='text-xs text-[#726E71] '>Manual</Label>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Rec. No. Start From (School Wise) */}
                            <FormField
                                control={form?.control}
                                name='rec_no'
                                render={({ field }) => (
                                    <FormItem className='flex-1 mt-2 sm:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-start text-[11px] text-[#726E71] sm:basis-[35%]'>Rec. No. Start From (School Wise)</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[11px]' />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>


                        {form.getValues().should_be === 'Automatic' && (
                            <div className='flex flex-col gap-2 lg:flex-row mt-4'>
                                {/* Prefix */}
                                <FormField
                                    control={form?.control}
                                    name='prefix'
                                    render={({ field }) => (
                                        <FormItem className='w-full mt-2 lg:mb-2'>
                                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                                <FormLabel className='basis-auto pr-[4px] text-[11px] text-[#726E71]'>Prefix</FormLabel>
                                                <div className='h-full w-full flex flex-col items-start gap-4'>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {/* Start From */}
                                <FormField
                                    control={form?.control}
                                    name='start_from'
                                    render={({ field }) => (
                                        <FormItem className='w-full mt-2 lg:mb-2'>
                                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Start From</FormLabel>
                                                <div className='h-full w-full flex flex-col items-start gap-4'>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {/* Lead Zero */}
                                <FormField
                                    control={form?.control}
                                    name='lead_zero'
                                    render={({ field }) => (
                                        <FormItem className='w-full mt-2 lg:mb-2'>
                                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Lead Zero</FormLabel>
                                                <div className='h-full w-full flex flex-col items-start gap-4'>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {/* Suffix */}
                                <FormField
                                    control={form?.control}
                                    name='suffix'
                                    render={({ field }) => (
                                        <FormItem className='w-full mt-2 lg:mb-2'>
                                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Suffix</FormLabel>
                                                <div className='h-full w-full flex flex-col items-start gap-4'>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}


                    </div>
                </div>

                
                {/* Buttons */}
                <Buttons setIsViewOpened={setIsViewOpened} admissions={admissions} updateAdmission={updateAdmission} setUpdateAdmission={setUpdateAdmission} onSubmit={onSubmit} isAllClasses={isAllClasses} form={form} editableNumbers={editableNumbers}/>
            </form>
        </Form>
    )
}





// Export
export default FormCom;