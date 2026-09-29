// Improts
import * as z from 'zod';
import moment from 'moment';
import {useForm} from 'react-hook-form';
import {useState, useEffect, useContext} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {fetchHeads} from '@/lib/actions/fees/feeMaster/feeMaster/head.actions';
import {fetchTypes} from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';
import {ChevronRight, ChevronLeft, ChevronDown, Check, X,} from 'lucide-react';
import {fetchBoards} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import {fetchWings} from '@/lib/actions/fees/globalMasters/defineClassDetails/wing.actions';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
import {FeeDefaulterListFilter, fetchAdmittedStudents} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {FeeDefaulterListValidation} from '@/lib/validations/fees/transactionReport/defaulterReports/feeDefaulterList.validation';
import { AuthContext } from '@/context/AuthContext';





// Main function
const Sidebar = ({isOpened, setIsOpened, setIsShowClicked, setIsLoading, pdfData, setPdfData}) => {

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


    // Date states
    const [fromDate, setFromDate] = useState(moment());
    const [tillDate, setTillDate] = useState(moment());


    // Is loading data
    const [isLoadingData, setIsLoadingData] = useState(false);


    // Schools
    const [schools, setSchools] = useState([{}]);


    // Wings
    const [wings, setWings] = useState([{}]);


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Sections
    const [sections, setSections] = useState<any>([]);


    // Selected classes
    const [selectedClasses, setSelectedClasses] = useState([]);


    // Boards
    const [boards, setBoards] = useState([{}]);


    // Fee types
    const [feeTypes, setFeeTypes] = useState([{}]);


    // Installments
    const [installments, setInstallments] = useState([{}]);


    // Selected installments
    const [selectedInstallments, setSelectedInstallments] = useState([{}]);


    // Heads
    const [heads, setHeads] = useState<any>([]);


    // Selected heads
    const [selectedHeads, setSelectedHeads] = useState([]);


    // Form
    const form = useForm({
        resolver:zodResolver(FeeDefaulterListValidation),
        defaultValues:{
            school:'All Schools',
            wing:'All Wings',
            preview:'Class Wise',
            class_name:'Select All',
            section:'Select All',
            board:'All Boards',
            fee_type:'All fee types',
            is_date_range:false,
            from_date:new Date(),
            till_date:new Date(),
            with_head:false,
            range:'',
            range_value:0,
            with_fine:false,
            header_with_class_group:false,
            filter_with_cheque_clearing_date:false,
            remark:''
        }
    });


    // Onsubmit
    const onSubmit = async (values:z.infer<typeof FeeDefaulterListValidation>) => {

        setIsLoading(true);
        // Filter defaulter list
        const res = await FeeDefaulterListFilter({
            school:values.school,
            wing:values.wing,
            class_name:values.class_name,
            section:values.section,
            classes:selectedClasses,
            board:values.board,
            fee_type:values.fee_type,
            installments:selectedInstallments,
            from_date:values.is_date_range ? values.from_date : new Date('2000-01-01'),
            till_date:values.till_date,
            heads:selectedHeads,
            range:values.range,
            range_value:values.range_value
        });
        setPdfData({
            from_date:values.from_date,
            till_date:values.till_date,
            is_date_range:values.is_date_range,
            fee_type:values.fee_type,
            fee_types:feeTypes,
            with_heads:values.with_head,
            heads:selectedHeads,
            installments:selectedInstallments,
            students:res
        });
        setIsLoading(false);
        setIsShowClicked(true);
    };
    

    // Show dues click
    const showDuesClick = async () => {
        setIsShowClicked(true);
        setIsLoading(true);
        // Fetching students
        const res = await fetchAdmittedStudents();
        setPdfData({
            from_date:form.getValues().from_date,
            till_date:form.getValues().till_date,
            is_date_range:form.getValues().is_date_range,
            fee_type:form.getValues().fee_type,
            fee_types:feeTypes,
            with_heads:form.getValues().with_head,
            heads:selectedHeads,
            installments:selectedInstallments,
            students:res
        });
        setIsLoading(false);
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            setIsLoadingData(true);
            const schoolsRes = await fetchGlobalSchoolDetails();
            const wingsRes = await fetchWings();
            const classesRes = await fetchClasses();
            const boardsRes = await fetchBoards();
            const feeTypesRes = await fetchTypes();
            const installmentsRes = await fetchInstallments();
            const headsRes = await fetchHeads();
            setSchools(schoolsRes);
            setWings(wingsRes);
            setClasses(classesRes);
            setSelectedClasses(classesRes);
            setBoards(boardsRes);
            setFeeTypes(feeTypesRes);
            setInstallments(installmentsRes);
            setSelectedInstallments(installmentsRes);
            setHeads(headsRes);
            setSelectedHeads(headsRes);
            setIsLoadingData(false);
        };
        fetcher();
    }, []);
    useEffect(() => {
        if(form.getValues().class_name !== 'Select All'){
            const selectedClass = classes.filter((c:any) => c.class_name === form.getValues().class_name)[0];
            // @ts-ignore
            setSections(selectedClass?.sections);
        }
    }, [form.watch('class_name')]);
    useEffect(() => {}, [form.watch('preview')]);
    useEffect(() => {
        if(fromDate){
            // @ts-ignore
            form.setValue('from_date', fromDate._d);
        };
    }, [fromDate]);
    useEffect(() => {
        if(tillDate){
            // @ts-ignore
            form.setValue('till_date', tillDate._d);
        };
    }, [tillDate]);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Fees')?.permissions?.find((pp:any) => pp.sub_menu === 'Fee Defaulter List');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className={`absolute top-0 left-0 h-full w-[250px] bg-[#fff] border-r-[0.5px] border-r-[#ccc] transition-transform transform ${isOpened ? 'translate-x-0' : '-translate-x-full'}`}>

            {/* Toggling button */}
            <span
                onClick={() => setIsOpened(!isOpened)}
                className='absolute top-4 right-[-40px] p-2 rounded-[2px] bg-gray-500 text-white cursor-pointer'
            >
                {isOpened ? (
                    <ChevronLeft />
                ) : (
                    <ChevronRight />
                )}
            </span>

            {/* Content */}
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='h-full flex flex-col py-4 pl-2 pr-4 gap-1 overflow-y-scroll custom-sidebar-scrollbar'
                >

                    {/* School */}
                    <FormField
                        control={form.control}
                        name='school'
                        render={({field}) => (
                            <FormItem className='w-full mt-[4px]'>
                            <div className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                                <FormLabel className='basis-[30%] h-full flex justify-end items-center text-[#726E71] text-xs'>School</FormLabel>
                                <div className='basis-[70%] flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select School'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectItem value='All Schools'>All Schools</SelectItem>
                                                {schools.length === 0 ? (
                                                    <p className='text-xs text-hash-color'>No Schools</p>
                                                ) : // @ts-ignore
                                                    !schools[0]?.school_name ? (
                                                    <LoadingIcon />
                                                ) : schools.map((s:any) => (
                                                    <SelectItem value={s.school_name} key={s._id}>{s.school_name}</SelectItem>
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


                    {/* Wing */}
                    <FormField
                        control={form.control}
                        name='wing'
                        render={({field}) => (
                            <FormItem className='w-full mt-[4px]'>
                            <div className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                                <FormLabel className='basis-[30%] h-full flex justify-end items-center text-[#726E71] text-xs'>Wing</FormLabel>
                                <div className='basis-[70%] flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select Wing'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='All Wings'>All Wings</SelectItem>
                                                {wings.length === 0 ? (
                                                    <p className='text-xs text-hash-color'>No wings</p>
                                                ) : // @ts-ignore
                                                    !wings[0]?.wing ? (
                                                    <LoadingIcon />
                                                ) : wings.map((s:any) => (
                                                    <SelectItem value={s.wing} key={s._id}>{s.wing}</SelectItem>
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


                    {/* Preview */}
                    <RadioGroup
                        value={form.getValues().preview}
                        className='flex flex-row items-center gap-3'
                    >
                        <div className='flex items-center space-x-[2px]'>
                            <RadioGroupItem
                                value='Class Wise'
                                id='Class Wise'
                                onClick={() => form.setValue('preview', 'Class Wise')}
                            />
                            <Label
                                htmlFor='Class Wise'
                                className='text-[11px]'
                            >
                                Class Wise
                            </Label>
                        </div>
                        <div className='flex items-center space-x-[2px]'>
                            <RadioGroupItem
                                value='Class Range'
                                id='Class Range'
                                onClick={() => form.setValue('preview', 'Class Range')}
                            />
                            <Label
                                htmlFor='Class Range'
                                className='text-[11px]'
                            >
                                Class Range
                            </Label>
                        </div>
                    </RadioGroup>


                    {form.getValues().preview === 'Class Wise' ? (
                        <>
                            {/* Class */}
                            <FormField
                                control={form.control}
                                name='class_name'
                                render={({field}) => (
                                    <FormItem className='w-full mt-[4px]'>
                                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                                        <FormLabel className='basis-[30%] h-full flex justify-end items-center text-[#726E71] text-xs'>Class</FormLabel>
                                        <div className='basis-[70%] flex flex-col items-start gap-4 sm:basis-[70%]'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                        <SelectValue placeholder='Select Class'/>
                                                        <ChevronDown className='h-4 w-4 opacity-50'/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='Select All'>Select All</SelectItem>
                                                        {classes.length === 0 ? (
                                                            <p className='text-xs text-hash-color'>No Classes</p>
                                                        ) : // @ts-ignore
                                                            !classes[0]?.class_name ? (
                                                            <LoadingIcon />
                                                        ) : classes.map((c:any) => (
                                                            <SelectItem value={c.class_name} key={c._id}>{c.class_name}</SelectItem>
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
                            {/* Section */}
                            <FormField
                                control={form.control}
                                name='section'
                                render={({field}) => (
                                    <FormItem className='w-full mt-[4px]'>
                                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                                        <FormLabel className='basis-[30%] h-full flex justify-end items-center text-[#726E71] text-xs'>Section</FormLabel>
                                        <div className='basis-[70%] flex flex-col items-start gap-4 sm:basis-[70%]'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                        <SelectValue placeholder='Select Class'/>
                                                        <ChevronDown className='h-4 w-4 opacity-50'/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='Select All'>Select All</SelectItem>
                                                        {sections?.length === 0 ? (
                                                            <p className='text-xs text-hash-color'>No Sections</p>
                                                        ) : // @ts-ignore
                                                            !sections[0] ? (
                                                            <LoadingIcon />
                                                        ) : sections.map((s:any) => (
                                                            <SelectItem value={s} key={s}>{s}</SelectItem>
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
                        </>
                    ) : (
                        <>
                            {/* Class */}
                            <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                                <p className='basis-[30%] text-xs text-end text-[#726E71]'>Class</p>
                                <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                                    <Select>
                                        <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder={selectedClasses?.length === 0 ? 'Select Class(es)' : selectedClasses?.length === 1 ? '1 class selected' : `${selectedClasses?.length} classes selected`} className='text-xs'/>
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <div className='flex flex-row'>
                                                <div
                                                    // @ts-ignore
                                                    onClick={() => setSelectedClasses(classes)}
                                                    className='group flex flex-row items-center justify-center cursor-pointer'
                                                >
                                                    <Check size={12}/>
                                                    <p className='text-xs group-hover:underline'>All</p>
                                                </div>
                                                <div
                                                    onClick={() => setSelectedClasses([])}
                                                    className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                                >
                                                    <X size={12}/>
                                                    <p className='text-xs group-hover:underline'>Clear</p>
                                                </div>
                                            </div>
                                            <ul className='mt-2'>
                                                {classes.length < 1 ? (
                                                    <p className='text-xs text-hash-color'>No Classes</p>
                                                ) : // @ts-ignore
                                                !classes[0].class_name ? (
                                                    <LoadingIcon />
                                                ) : classes.map((c:any) => (
                                                    <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                        <Checkbox
                                                            className='rounded-[2px] text-hash-color font-semibold'
                                                            checked={selectedClasses?.map((m:any) => m).includes(c)}
                                                            // @ts-ignore
                                                            onClick={() => selectedClasses?.includes(c) ? setSelectedClasses(selectedClasses?.filter((i:any) => i !== c)) : setSelectedClasses([...selectedClasses, c])}
                                                        />
                                                        <p className='text-xs font-semibold'>{c.class_name}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </>
                    )}


                    {/* Board */}
                    <FormField
                        control={form.control}
                        name='board'
                        render={({field}) => (
                            <FormItem className='w-full mt-[4px]'>
                            <div className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                                <FormLabel className='basis-[30%] h-full flex justify-end items-center text-[#726E71] text-xs'>Board</FormLabel>
                                <div className='basis-[70%] flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select Board'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='All Boards'>All Boards</SelectItem>
                                                {boards.length === 0 ? (
                                                    <p className='text-xs text-hash-color'>No Boards</p>
                                                ) : // @ts-ignore
                                                    !boards[0]?.board ? (
                                                    <LoadingIcon />
                                                ) : boards.map((b:any) => (
                                                    <SelectItem value={b.board} key={b._id}>{b.board}</SelectItem>
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


                    {/* Fee type */}
                    <FormField
                        control={form.control}
                        name='fee_type'
                        render={({field}) => (
                            <FormItem className='w-full mt-[4px]'>
                            <div className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                                <FormLabel className='basis-[30%] h-full flex justify-end items-center text-[#726E71] text-xs'>Fee Type</FormLabel>
                                <div className='basis-[70%] flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select Wing'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='All fee types'>All fee types</SelectItem>
                                                {feeTypes.length < 1 ? (
                                                    <p className='text-xs text-hash-color'>No Types</p>
                                                ) : // @ts-ignore
                                                !feeTypes[0].name ? (
                                                    <LoadingIcon />
                                                ) : feeTypes.map((f:any) => (
                                                    <SelectItem value={f.name} key={f._id}>{f.name}</SelectItem>
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
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Installment</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedInstallments?.length === 0 ? 'Select Installment(s)' : selectedInstallments?.length === 1 ? '1 installment selected' : `${selectedInstallments?.length} installments selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedInstallments(installments)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedInstallments([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {installments.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No Installments</p>
                                        ) : // @ts-ignore
                                        !installments[0].name ? (
                                            <LoadingIcon />
                                        ) : installments.map((c:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedInstallments?.map((m:any) => m).includes(c)}
                                                    // @ts-ignore
                                                    onClick={() => selectedInstallments?.includes(c) ? setSelectedInstallments(selectedInstallments?.filter((i:any) => i !== c)) : setSelectedInstallments([...selectedInstallments, c])}
                                                />
                                                <p className='text-xs font-semibold'>{c.name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Date Range */}
                    <FormField
                        control={form.control}
                        name='is_date_range'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 flex flex-row items-center gap-2'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='is_date_range'
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='is_date_range'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Date Range
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Dates */}
                    <div className='flex flex-row items-center gap-2'>
                        {/* From Date */}
                        {form.getValues().is_date_range && (
                            <div className='flex-1 flex flex-col'>
                                <p className='text-xs text-hash-color'>From Date</p>
                                <MyDatePicker
                                    selectedDate={fromDate}
                                    setSelectedDate={setFromDate}
                                />
                            </div>
                        )}
                        {/* Till Date */}
                        <div className='flex-1 flex flex-col'>
                            <p className='text-xs text-hash-color'>Till Date</p>
                            <MyDatePicker
                                selectedDate={tillDate}
                                setSelectedDate={setTillDate}
                            />
                        </div>
                    </div>


                    {/* With Head */}
                    <FormField
                        control={form.control}
                        name='with_head'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 flex flex-row items-center gap-2'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='with_head'
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='with_head'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            With Head
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Fees Head */}
                    {form.getValues().with_head && (
                        <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                            <p className='basis-[30%] text-xs text-end text-[#726E71]'>Fees Head</p>
                            <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                                <Select>
                                    <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder={selectedHeads?.length === 0 ? 'Select Head(s)' : selectedHeads?.length === 1 ? '1 head selected' : `${selectedHeads?.length} heads selected`} className='text-xs'/>
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <div className='flex flex-row'>
                                            <div
                                                // @ts-ignore
                                                onClick={() => setSelectedHeads(heads)}
                                                className='group flex flex-row items-center justify-center cursor-pointer'
                                            >
                                                <Check size={12}/>
                                                <p className='text-xs group-hover:underline'>All</p>
                                            </div>
                                            <div
                                                onClick={() => setSelectedHeads([])}
                                                className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                            >
                                                <X size={12}/>
                                                <p className='text-xs group-hover:underline'>Clear</p>
                                            </div>
                                        </div>
                                        <ul className='mt-2'>
                                            {heads.length < 1 ? (
                                                <p className='text-xs text-hash-color'>No Heads</p>
                                            ) : // @ts-ignore
                                            !heads[0].name ? (
                                                <LoadingIcon />
                                            ) : heads.map((c:any) => (
                                                <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                    <Checkbox
                                                        className='rounded-[2px] text-hash-color font-semibold'
                                                        checked={selectedHeads?.map((m:any) => m).includes(c)}
                                                        // @ts-ignore
                                                        onClick={() => selectedHeads?.includes(c) ? setSelectedHeads(selectedHeads?.filter((i:any) => i !== c)) : setSelectedHeads([...selectedHeads, c])}
                                                    />
                                                    <p className='text-xs font-semibold'>{c.name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}


                    {/* Range */}
                    <FormField
                        control={form.control}
                        name='range'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full flex flex-col items-center justify-center'>
                                <FormLabel className='w-full flex justify-start items-center text-[#726E71] text-xs'>Range</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Please Select'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='>'>{'>'}</SelectItem>
                                                <SelectItem value='>='>{'>='}</SelectItem>
                                                <SelectItem value='<'>{'<'}</SelectItem>
                                                <SelectItem value='<='>{'<='}</SelectItem>
                                                <SelectItem value='!='>{'!='}</SelectItem>
                                                <SelectItem value='Between'>Between</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-xs'/>
                                </div>
                            </div>
                        </FormItem>
                        )}
                    />


                    {/* Range Value */}
                    <FormField
                        control={form?.control}
                        name='range_value'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Range Value</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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


                    {/* With Fine */}
                    <FormField
                        control={form.control}
                        name='with_fine'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 flex flex-row items-center gap-2'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='with_fine'
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='with_fine'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            With Fine
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Header With Class Group */}
                    <FormField
                        control={form.control}
                        name='header_with_class_group'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 flex flex-row items-center gap-2'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='header_with_class_group'
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='header_with_class_group'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Header With Class Group
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Filter With Cheque Clearing Data */}
                    <FormField
                        control={form.control}
                        name='filter_with_cheque_clearing_date'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 flex flex-row items-center gap-2'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='filter_with_cheque_clearing_date'
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='filter_with_cheque_clearing_date'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Filter With Cheque Clearing Data
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Remark */}
                    <FormField
                        control={form?.control}
                        name='remark'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Remark</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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


                    {/* Buttons */}
                    {permissions.read_only && isLoadingData ? (
                        <LoadingIcon />
                    ) : (
                        <div className='flex flex-col gap-2 mt-2'>
                            <div className='flex flex-row justify-center items-center gap-2'>
                                <span
                                    className='flex items-center justify-center px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                >
                                    Proceed To SMS
                                </span>
                                <Button
                                    type='submit'
                                    className='px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white
                                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                >
                                    Show
                                </Button>
                            </div>
                            <span
                                onClick={showDuesClick}
                                className='flex items-center justify-center px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            >
                                Show Dues
                            </span>
                        </div>
                    )}


                </form>
            </Form>
        </div>
    );
};





// Export
export default Sidebar;