// Improts
import * as z from 'zod';
import moment from 'moment';
import {format} from 'date-fns';
import {useForm} from 'react-hook-form';
import {useState, useEffect, useContext} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Checkbox} from '@/components/ui/checkbox';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {fetchHeads} from '@/lib/actions/fees/feeMaster/feeMaster/head.actions';
import {fetchTypes} from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';
import {ChevronRight, ChevronLeft, ChevronDown, Check, X,} from 'lucide-react';
import {dailyFeeCollectionFilter} from '@/lib/actions/fees/manageFee/payment.actions';
import {fetchBoards} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import {fetchWings} from '@/lib/actions/fees/globalMasters/defineClassDetails/wing.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
import {DailyFeeCollectionValidation} from '@/lib/validations/fees/transactionReport/collectionReports/dailyFeeCollection.validation';
import MyDatePicker from '@/components/shared/CustomDatePicker';
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
    const [dateFrom, setDateFrom] = useState(moment());
    const [dateTo, setDateTo] = useState(moment());


    // Is loading data
    const [isLoadingData, setIsLoadingData] = useState(false);


    // Schools
    const [schools, setSchools] = useState([{}]);


    // Wings
    const [wings, setWings] = useState([{}]);


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Selected classes
    const [selectedClasses, setSelectedClasses] = useState([]);


    // Boards
    const [boards, setBoards] = useState([{}]);


    // Entry modes
    const entryModes = ['School', 'Bank', 'Online'];


    // Selected entry modes
    const [selectedEntryModes, setSelectedEntryModes] = useState(['School', 'Bank', 'Online']);


    // Fee types
    const [feeTypes, setFeeTypes] = useState([{}]);


    // Selected fee types
    const [selectedFeeTypes, setSelectedFeeTypes] = useState([]);


    // Paymodes
    const paymodes = ['Cash', 'Cheque', 'Net Banking', 'Debit Card', 'Credit Card', 'DD', 'NEFT', 'Swiped Card', 'UPI'];


    // Selected paymodes
    const [selectedPaymodes, setSelectedPaymodes]  = useState(['Cash', 'Cheque', 'Net Banking', 'Debit Card', 'Credit Card', 'DD', 'NEFT', 'Swiped Card', 'UPI']);


    // Heads
    const [heads, setHeads] = useState([{}]);


    // Selected heads
    const [selectedHeads, setSelectedHeads] = useState([]);


    // Users
    const [users, setUsers] = useState([]);


    // Form
    const form = useForm({
        resolver:zodResolver(DailyFeeCollectionValidation),
        defaultValues:{
            school:'All Schools',
            wing:'All Wings',
            board:'All Boards',
            date_from:new Date(),
            date_to:new Date(),
            is_receipt_no_range:false,
            from:'',
            to:'',
            show_collection:'Head Wise',
            user:'All Users',
            with_settlment_date:false,
            with_cheque_clearance_date:false
        }
    });


    // Onsubmit
    const onSubmit = async (values:z.infer<typeof DailyFeeCollectionValidation>) => {

        setIsLoading(true);

        // Fetching filtered payments
        const res = await dailyFeeCollectionFilter({
            school:values.school,
            wing:values.wing,
            classes:selectedClasses,
            board:values.board,
            entry_modes:selectedEntryModes,
            fee_types:selectedFeeTypes,
            pay_modes:selectedPaymodes,
            heads:selectedHeads,
            date_from:values.date_from,
            date_to:values.date_to,
            from:values.from || 1,
            to:values.to || 100000000,
            user:values.user
        });
        setPdfData({
            ...pdfData,
            date_from:values.date_from,
            date_to:values.date_to,
            entry_modes:selectedEntryModes,
            show_collection:values.show_collection,
            payments:res
        });
        setIsLoading(false);
        setIsShowClicked(true);

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
            const headsRes = await fetchHeads();
            setSchools(schoolsRes);
            setWings(wingsRes);
            setClasses(classesRes);
            setSelectedClasses(classesRes);
            setBoards(boardsRes);
            setFeeTypes(feeTypesRes.filter((t:any) => user.fee_types.includes(t.name)));
            setSelectedFeeTypes(feeTypesRes.filter((t:any) => user.fee_types.includes(t.name)));
            setHeads(headsRes);
            setSelectedHeads(headsRes);
            setIsLoadingData(false)
        };
        fetcher();
    }, []);
    useEffect(() => {}, [form.watch('is_receipt_no_range'), form.watch('show_collection')]);
    useEffect(() => {
        if(dateFrom){
            // @ts-ignore
            form.setValue('date_from', dateFrom._d);
        };
    }, [dateFrom]);
    useEffect(() => {
        if(dateTo){
            // @ts-ignore
            form.setValue('date_to', dateTo._d);
        };
    }, [dateTo]);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Fees')?.permissions?.find((pp:any) => pp.sub_menu === 'Daily Fee Collection');
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
                    // @ts-ignore
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='h-full flex flex-col py-4 px-2 gap-1 overflow-y-scroll custom-sidebar-scrollbar'
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


                    {/* Entry Mode */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Entry Mode</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedEntryModes?.length === 0 ? 'Select Entry Mode(s)' : selectedEntryModes?.length === 1 ? '1 mode selected' : `${selectedEntryModes?.length} modes selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedEntryModes(entryModes)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedEntryModes([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {entryModes.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No Modes</p>
                                        ) : // @ts-ignore
                                        !entryModes[0] ? (
                                            <LoadingIcon />
                                        ) : entryModes.map((c:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedEntryModes?.map((m:any) => m).includes(c)}
                                                    // @ts-ignore
                                                    onClick={() => selectedEntryModes?.includes(c) ? setSelectedEntryModes(selectedEntryModes?.filter((i:any) => i !== c)) : setSelectedEntryModes([...selectedEntryModes, c])}
                                                />
                                                <p className='text-xs font-semibold'>{c}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Fee Type */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Fee Type</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedFeeTypes?.length === 0 ? 'Select Fee Type(s)' : selectedFeeTypes?.length === 1 ? '1 type selected' : `${selectedFeeTypes?.length} types selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() =>setSelectedFeeTypes(feeTypes)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() =>setSelectedFeeTypes([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {feeTypes.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No Types</p>
                                        ) : // @ts-ignore
                                        !feeTypes[0].name ? (
                                            <LoadingIcon />
                                        ) : feeTypes.map((c:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedFeeTypes?.map((m:any) => m).includes(c)}
                                                    // @ts-ignore
                                                    onClick={() => selectedFeeTypes?.includes(c) ?setSelectedFeeTypes(selectedFeeTypes?.filter((i:any) => i !== c)) :setSelectedFeeTypes([...selectedFeeTypes, c])}
                                                />
                                                <p className='text-xs font-semibold'>{c.name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Pay Mode */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Pay Mode</p>
                        <div className='relative h-full basis-[70%] flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedPaymodes?.length === 0 ? 'Select Pay Mode(s)' : selectedPaymodes?.length === 1 ? '1 mode selected' : `${selectedPaymodes?.length} modes selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedPaymodes(paymodes)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedPaymodes([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {paymodes.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No Modes</p>
                                        ) : // @ts-ignore
                                        !paymodes[0] ? (
                                            <LoadingIcon />
                                        ) : paymodes.map((c:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedPaymodes?.map((m:any) => m).includes(c)}
                                                    // @ts-ignore
                                                    onClick={() => selectedPaymodes?.includes(c) ? setSelectedPaymodes(selectedPaymodes?.filter((i:any) => i !== c)) : setSelectedPaymodes([...selectedPaymodes, c])}
                                                />
                                                <p className='text-xs font-semibold'>{c}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* Head */}
                    <div className='w-full h-6 flex flex-row items-center justify-center gap-2 mt-2'>
                        <p className='basis-[30%] text-xs text-end text-[#726E71]'>Head</p>
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
                                            <p className='text-xs text-hash-color'>No heads</p>
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


                    {/* Dates */}
                    <div className='flex flex-row items-center gap-2'>
                        {/* Date From */}
                        <div className='flex-1 flex flex-col'>
                            <p className='text-xs text-hash-color'>Date From</p>
                            <MyDatePicker
                                selectedDate={dateFrom}
                                setSelectedDate={setDateFrom}
                            />
                        </div>
                        {/* Date To */}
                        <div className='flex-1 flex flex-col'>
                            <p className='text-xs text-hash-color'>Date To</p>
                            <MyDatePicker
                                selectedDate={dateTo}
                                setSelectedDate={setDateTo}
                            />
                        </div>
                    </div>


                    {/* Receipt No. Range */}
                    <FormField
                        control={form.control}
                        name='is_receipt_no_range'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 flex flex-row items-center gap-2'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='is_receipt_no_range'
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='is_receipt_no_range'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Receipt No. Range
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {form.getValues().is_receipt_no_range && (
                        <div className='flex flex-row items-center gap-2'>
                            {/* From */}
                            <FormField
                                control={form.control}
                                name='from'
                                render={({field}) => (
                                    <FormItem className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                                        <FormLabel className='basis-[30%] text-xs text-end text-[#726E71]'>From</FormLabel>
                                        <div className='basis-[70%] flex flex-col items-start gap-4'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-6 flex flex-row items-center text-xs bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {/* To */}
                            <FormField
                                control={form.control}
                                name='to'
                                render={({field}) => (
                                    <FormItem className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                                        <FormLabel className='basis-[30%] text-xs text-end text-[#726E71]'>To</FormLabel>
                                        <div className='basis-[70%] flex flex-col items-start gap-4'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-6 flex flex-row items-center text-xs bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    
                    {/* Show Collection */}
                    <div className='flex flex-col items-start text-xs gap-1'>
                        <p>Show Collection:</p>
                        <RadioGroup
                            value={form.getValues().show_collection}
                            className='gap-0'
                        >
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem
                                    value='Head Wise'
                                    id='Head Wise'
                                    onClick={() => form.setValue('show_collection', 'Head Wise')}
                                />
                                <Label
                                    htmlFor='Head Wise'
                                    className='text-[11px]'
                                >
                                    Head Wise
                                </Label>
                            </div>
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem
                                    value='Without Head (Total Amount)'
                                    id='Without Head (Total Amount)'
                                    onClick={() => form.setValue('show_collection', 'Without Head (Total Amount)')}
                                />
                                <Label
                                    htmlFor='Without Head (Total Amount)'
                                    className='text-[11px]'
                                >
                                    Without Head (Total Amount)
                                </Label>
                            </div>
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem
                                    value='With Head (One line data)'
                                    id='With Head (One line data)'
                                    onClick={() => form.setValue('show_collection', 'With Head (One line data)')}
                                />
                                <Label
                                    htmlFor='With Head (One line data)'
                                    className='text-[11px]'
                                >
                                    With Head (One line data)
                                </Label>
                            </div>
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem
                                    value='Without Head (One line data)'
                                    id='Without Head (One line data)'
                                    onClick={() => form.setValue('show_collection', 'Without Head (One line data)')}
                                />
                                <Label
                                    htmlFor='Without Head (One line data)'
                                    className='text-[11px]'
                                >
                                    Without Head (One line data)
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>


                    {/* User */}
                    <FormField
                        control={form.control}
                        name='user'
                        render={({field}) => (
                            <FormItem className='w-full mt-[4px]'>
                            <div className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                                <FormLabel className='basis-[30%] h-full flex justify-end items-center text-[#726E71] text-xs'>User</FormLabel>
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
                                                <SelectItem value='All Users'>All Users</SelectItem>
                                                {users.length === 0 ? (
                                                    <p className='text-xs text-hash-color'>No users</p>
                                                ) : // @ts-ignore
                                                    !users[0]?.name ? (
                                                    <LoadingIcon />
                                                ) : users.map((b:any) => (
                                                    <SelectItem value={b.name} key={b._id}>{b.name}</SelectItem>
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


                    {/* With Settlment Date */}
                    <FormField
                        control={form.control}
                        name='with_settlment_date'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 flex flex-row items-center gap-2'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='with_settlment_date'
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='with_settlment_date'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            With Settlment Date
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* With Cheque Clearance Date */}
                    <FormField
                        control={form.control}
                        name='with_cheque_clearance_date'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 flex flex-row items-center gap-2'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='with_cheque_clearance_date'
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='with_cheque_clearance_date'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            With Cheque Clearance Date
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    {isLoadingData ? (
                        <LoadingIcon />
                    ) : (
                        <div className='flex flex-row justify-center items-center gap-2 mt-2'>
                            <span
                                className='flex items-center justify-center px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            >
                                Send Sms
                            </span>
                            {permissions.read_only && (
                                <Button
                                    type='submit'
                                    className='px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white
                                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                >
                                    Show
                                </Button>
                            )}
                        </div>
                    )}


                </form>
            </Form>
        </div>
    );
};





// Export
export default Sidebar;