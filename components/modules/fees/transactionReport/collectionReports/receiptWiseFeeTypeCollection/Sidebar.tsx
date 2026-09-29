// Improts
import * as z from 'zod';
import {format} from 'date-fns';
import {useForm} from 'react-hook-form';
import {useState, useEffect, useContext} from 'react';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Checkbox} from '@/components/ui/checkbox';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {fetchTypes} from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';
import {ChevronRight, ChevronLeft, ChevronDown, Check, X,} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {fetchBankLedgers} from '@/lib/actions/accounts/accounts/bankLedger.actions';
import {fetchBoards} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import {fetchWings} from '@/lib/actions/fees/globalMasters/defineClassDetails/wing.actions';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {receiptWiseFeeTypeCollectionFilter} from '@/lib/actions/fees/manageFee/payment.actions';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
import {ReceiptWiseFeeTypeCollectionValidation} from '@/lib/validations/fees/transactionReport/collectionReports/receiptWiseFeeTypeCollection.validation';
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
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


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


    // Fee types
    const [feeTypes, setFeeTypes] = useState([{}]);


    // Installments
    const [installments, setInstallments] = useState([{}]);


    // Paymodes
    const paymodes = ['Cash', 'Cheque', 'Net Banking', 'Debit Card', 'Credit Card', 'DD', 'NEFT', 'Swiped Card', 'UPI'];


    // Selected paymodes
    const [selectedPaymodes, setSelectedPaymodes]  = useState(['Cash', 'Cheque', 'Net Banking', 'Debit Card', 'Credit Card', 'DD', 'NEFT', 'Swiped Card', 'UPI']);


    // Users
    const [users, setUsers] = useState([]);


    // Bank names
    const [bankNames, setBankNames] = useState([]);


    // Selected bank names
    const [selectedBankNames, setSelectedBankNames] = useState([]);


    // Form
    const form = useForm({
        resolver:zodResolver(ReceiptWiseFeeTypeCollectionValidation),
        defaultValues:{
            school:'All Schools',
            wing:'All Wings',
            board:'All Boards',
            fee_type:'All fee types',
            installment:'All installments',
            date_from:new Date(),
            date_to:new Date(),
            user:'All Users',
            new_student:'All',
            student_status:'All',
            with_settlment_date:false,
            with_cheque_clearance_date:false,
            show_remark:false,
            is_active:'All',
            preview:''
        }
    });


    // Onsubmit
    const onSubmit = async (values:z.infer<typeof ReceiptWiseFeeTypeCollectionValidation>) => {

        setIsLoading(true);
        // Fetching filtered payments
        const res = await receiptWiseFeeTypeCollectionFilter({
            school:values.school,
            wing:values.wing,
            classes:selectedClasses,
            board:values.board,
            fee_type:values.fee_type,
            installment:values.installment,
            pay_modes:selectedPaymodes,
            date_from:values.date_from,
            date_to:values.date_to,
            user:values.user,
            banks:selectedBankNames,
            new_student:values.new_student,
            student_status:values.student_status,
            is_active:values.is_active
        });
        setPdfData({
            ...pdfData,
            date_from:values.date_from,
            date_to:values.date_to,
            preview:values.preview,
            fee_types:feeTypes.map((t:any) => t.name),
            paymodes:selectedPaymodes,
            show_remark:values.show_remark,
            payments:res
        });
        setIsShowClicked(true);
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
            const bankNamesRes = await fetchBankLedgers();
            setSchools(schoolsRes);
            setWings(wingsRes);
            setClasses(classesRes);
            setSelectedClasses(classesRes);
            setBoards(boardsRes);
            setFeeTypes(feeTypesRes.filter((t:any) => user.fee_types.includes(t.name)));
            setInstallments(installmentsRes);
            setBankNames(bankNamesRes);
            setSelectedBankNames(bankNamesRes);
            setIsLoadingData(false);
        };
        fetcher();
    }, []);
    useEffect(() => {}, [form.watch('is_active'), form.watch('preview')]);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Fees')?.permissions?.find((pp:any) => pp.sub_menu === 'Receipt Wise Fee Type Collection');
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
                    <FormField
                        control={form.control}
                        name='installment'
                        render={({field}) => (
                            <FormItem className='w-full mt-[4px]'>
                            <div className='w-full h-6 flex flex-row items-center justify-center gap-2'>
                                <FormLabel className='basis-[30%] h-full flex justify-end items-center text-[#726E71] text-xs'>Installment</FormLabel>
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
                                                <SelectItem value='All installments'>All installments</SelectItem>
                                                {installments.length < 1 ? (
                                                    <p className='text-xs text-hash-color'>No Installments</p>
                                                ) : // @ts-ignore
                                                !installments[0].name ? (
                                                    <LoadingIcon />
                                                ) : installments.map((i:any) => (
                                                    <SelectItem value={i.name} key={i._id}>{i.name}</SelectItem>
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


                    {/* Dates */}
                    <div className='flex flex-row items-center gap-2'>
                        {/* Date From */}
                        <div className='flex-1 flex flex-col'>
                            <p className='text-xs text-hash-color'>Date From</p>
                            <Popover open={isCalendarOpened === 'date_from'} onOpenChange={() => isCalendarOpened === 'date_from' ? setIsCalendarOpened('') : setIsCalendarOpened('date_from')}>
                                <PopoverTrigger asChild className='h-7'>
                                    <Button
                                        variant='outline'
                                        className='flex flex-row items-center text-[11px] bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                                    >
                                        {/* <CalendarIcon className='mr-2 h-4 w-4' /> */}
                                        {
                                            form.getValues().date_from
                                                    ? <span>{format(form.getValues().date_from, 'P')}</span>
                                                    : <span>Pick a date</span>
                                        }
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto bg-[#fff]'>
                                    <Calendar
                                        mode='single'
                                        selected={form.getValues().date_from}
                                        onSelect={(v:any) => {setIsCalendarOpened(''); form.setValue('date_from', v)}}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        {/* Date To */}
                        <div className='flex-1 flex flex-col'>
                            <p className='text-xs text-hash-color'>Date To</p>
                            <Popover open={isCalendarOpened === 'date_to'} onOpenChange={() => isCalendarOpened === 'date_to' ? setIsCalendarOpened('') : setIsCalendarOpened('date_to')}>
                                <PopoverTrigger asChild className='h-7'>
                                    <Button
                                        variant='outline'
                                        className='flex flex-row items-center text-[11px] bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                                    >
                                        {/* <CalendarIcon className='mr-2 h-4 w-4' /> */}
                                        {
                                            form.getValues().date_to
                                                    ? <span>{format(form.getValues().date_to, 'P')}</span>
                                                    : <span>Pick a date</span>
                                        }
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto bg-[#fff]'>
                                    <Calendar
                                        mode='single'
                                        selected={form.getValues().date_to}
                                        onSelect={(v:any) => {setIsCalendarOpened(''); form.setValue('date_to', v)}}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
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


                    {/* Bank Name */}
                    <div className='w-full flex flex-col items-center justify-center'>
                        <p className='w-full text-xs text-start text-[#726E71]'>Bank Name</p>
                        <div className='w-full relative h-full flex flex-col items-start gap-4'>
                            <Select>
                                <SelectTrigger className='w-full h-6 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedBankNames?.length === 0 ? 'Select Bank(s)' : selectedBankNames?.length === 1 ? '1 bank selected' : `${selectedBankNames?.length} banks selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedBankNames(bankNames)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedBankNames([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {bankNames.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No bank ledgers</p>
                                        ) : // @ts-ignore
                                        !bankNames[0].account_name ? (
                                            <LoadingIcon />
                                        ) : bankNames.map((c:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color font-semibold'
                                                    checked={selectedBankNames?.map((m:any) => m).includes(c)}
                                                    // @ts-ignore
                                                    onClick={() => selectedBankNames?.includes(c) ? setSelectedBankNames(selectedBankNames?.filter((i:any) => i !== c)) : setSelectedBankNames([...selectedBankNames, c])}
                                                />
                                                <p className='text-xs font-semibold'>{c.account_name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    {/* New/Old Student */}
                    <FormField
                        control={form.control}
                        name='new_student'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full flex flex-col items-center justify-center'>
                                <FormLabel className='w-full flex justify-start items-center text-[#726E71] text-xs'>New/Old Student</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4'>
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
                                                <SelectItem value='All'>All</SelectItem>
                                                <SelectItem value='New'>New</SelectItem>
                                                <SelectItem value='Old'>Old</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-xs'/>
                                </div>
                            </div>
                        </FormItem>
                        )}
                    />


                    {/* Student Status */}
                    <FormField
                        control={form.control}
                        name='student_status'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full flex flex-col items-center justify-center'>
                                <FormLabel className='w-full flex justify-start items-center text-[#726E71] text-xs'>Student Status</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4'>
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
                                                <SelectItem value='All'>All</SelectItem>
                                                <SelectItem value='LEFT'>LEFT</SelectItem>
                                                <SelectItem value='REPEATER'>REPEATER</SelectItem>
                                                <SelectItem value='RUSTICATE'>RUSTICATE</SelectItem>
                                                <SelectItem value='STUDYING'>STUDYING</SelectItem>
                                                <SelectItem value='TC'>TC</SelectItem>
                                                <SelectItem value='WITHDRAWN'>WITHDRAWN</SelectItem>
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


                    {/* Show Remark */}
                    <FormField
                        control={form.control}
                        name='show_remark'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 flex flex-row items-center gap-2'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='show_remark'
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='show_remark'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Show Remark
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Is Active */}
                    <div className='flex flex-col items-start text-xs gap-1'>
                        <p>Students:</p>
                        <RadioGroup
                            value={form.getValues().is_active}
                            className='flex flex-row items-center gap-1'
                        >
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem
                                    value='All'
                                    id='All'
                                    onClick={() => form.setValue('is_active', 'All')}
                                />
                                <Label
                                    htmlFor='All'
                                    className='text-[11px]'
                                >
                                    All
                                </Label>
                            </div>
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem
                                    value='Active'
                                    id='Active'
                                    onClick={() => form.setValue('is_active', 'Active')}
                                />
                                <Label
                                    htmlFor='Active'
                                    className='text-[11px]'
                                >
                                    Active
                                </Label>
                            </div>
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem
                                    value='Inactive'
                                    id='Inactive'
                                    onClick={() => form.setValue('is_active', 'Inactive')}
                                />
                                <Label
                                    htmlFor='Inactive'
                                    className='text-[11px]'
                                >
                                    Inactive
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>


                    {/* Preview */}
                    <RadioGroup
                        value={form.getValues().preview}
                        className='flex flex-row items-center gap-[2px] mt-4'
                    >
                        <div className='flex items-center space-x-[1px]'>
                            <RadioGroupItem
                                value='Student Wise'
                                id='Student Wise'
                                onClick={() => form.setValue('preview', form.getValues().preview === 'Student Wise' ? '' : 'Student Wise')}
                            />
                            <Label
                                htmlFor='Student Wise'
                                className='text-[10px]'
                            >
                                Student Wise
                            </Label>
                        </div>
                        <div className='flex items-center space-x-[1px]'>
                            <RadioGroupItem
                                value='Head Wise'
                                id='Head Wise'
                                onClick={() => form.setValue('preview', form.getValues().preview === 'Head Wise' ? '' : 'Head Wise')}
                            />
                            <Label
                                htmlFor='Head Wise'
                                className='text-[10px]'
                            >
                                Head Wise
                            </Label>
                        </div>
                        <div className='flex items-center space-x-[1px]'>
                            <RadioGroupItem
                                value='Date Wise'
                                id='Date Wise'
                                onClick={() => form.setValue('preview', form.getValues().preview === 'Date Wise' ? '' : 'Date Wise')}
                            />
                            <Label
                                htmlFor='Date Wise'
                                className='text-[10px]'
                            >
                                Date Wise
                            </Label>
                        </div>
                    </RadioGroup>


                    {/* Buttons */}
                    {permissions.read_only && isLoadingData ? (
                        <LoadingIcon />
                    ) : (
                        <div className='flex flex-row justify-center items-center gap-2 mt-2'>
                            <span
                                className='flex items-center justify-center px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            >
                                Send Sms
                            </span>
                            <Button
                                type='submit'
                                className='px-4 h-6 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            >
                                Show
                            </Button>
                        </div>
                    )}


                </form>
            </Form>
        </div>
    );
};





// Export
export default Sidebar;