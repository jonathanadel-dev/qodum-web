'use client';
// Imports
import {useEffect, useState} from 'react';
import StudentImage from './StudentImage';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Check, ChevronDown, Search, X} from 'lucide-react';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {fetchEnquiryByEnquiryNo} from '@/lib/actions/admission/admission/enquiry.actions';
import {fetchClassNumbers } from '@/lib/actions/admission/masterSettings/admission.actions';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchStationaryDetails} from '@/lib/actions/admission/globalMasters/stationaryDetails.actions';
import { fetchOpenAdmissionClassesNames } from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import { fetchBoards } from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import { fetchStreamsNames } from '@/lib/actions/admission/globalMasters/stream.actions';
import { fetchSubjectsNames } from '@/lib/actions/admission/globalMasters/subject.actions';
import { fetchOptionalSubjectsNames } from '@/lib/actions/admission/globalMasters/optionalSubject.actions';
import { fetchReligionsNames } from '@/lib/actions/admission/globalMasters/religion.actions';
import { fetchBloodGroupsNames } from '@/lib/actions/admission/globalMasters/bloodGroup.actions';
import { fetchCastesNames } from '@/lib/actions/admission/globalMasters/caste.actions';
import { fetchCategoriesNames } from '@/lib/actions/admission/globalMasters/category.actions';
import { fetchTransportMediumsNames } from '@/lib/actions/fees/transport/transportMedium.actions';
import { fetchNationalitiesNames } from '@/lib/actions/admission/globalMasters/nationality.actions';
import { fetchBankLedgers } from '@/lib/actions/accounts/accounts/bankLedger.actions';
import { fetchGeneralLedgers } from '@/lib/actions/accounts/accounts/generalLedger.actions';
import { fetchAdmissionStates } from '@/lib/actions/payroll/globalMasters/admissionStates.actions';
import { deepEqual } from '@/lib/utils';
import ChequeDetails from '../paymodes/ChequeDetails';
import DDDetails from '../paymodes/DDDetails';
import NeftDetails from '../paymodes/NeftDetails';
import UPIDetails from '../paymodes/UPIDetails';
import PaymentGateway from '../paymodes/PaymentGateway';
import SwipedCardDetaila from '../paymodes/SwipedCardDetails';





// Main function
const Student = ({students, form, setIsViewOpened, setUpdateStudent, setFile, updateStudent, imageSrc, setImageSrc, setIsLoading, setValuesFromEnquiry, admissionEnquiries, selectedSubjects, setSelectedSubjects, date, setDate, dob, setDob, setIsQrCodeGenerated}:any) => {

    // Search
    const [search, setSearch] = useState('');


    // Bank ledgers state
    const [bankLedgersState, setBankLedgersState] = useState({isLoading:false, items:[{}]});


    // Admission accoutns state
    const [addmisionAccountsState, setAdmissionAccountsState] = useState({isLoading:false, items:[{}]});


    // Classes state
    const [classesState, setClassesState] = useState({isLoading:false, items:[{}]});


    // Boards state
    const [boardsState, setBoardsState] = useState({isLoading:false, items:[{}]});


    // Religions state
    const [religionsState, setReligionsState] = useState({isLoading:false, items:[{}]});


    // Categories state
    const [categoriesState, setCategoriesState] = useState({isLoading:false, items:[{}]});


    // Castes state
    const [castesState, setCastesState] = useState({isLoading:false, items:[{}]});


    // Blood groups state
    const [bloodGroupsState, setBloodGroupsState] = useState({isLoading:false, items:[{}]});


    // Streams state
    const [streamsState, setStreamsState] = useState({isLoading:false, items:[{}]});


    // Subjects state
    const [subjectsState, setSubjectsState] = useState({isLoading:false, items:[{}]});


    // Optional subjects state
    const [optionalSubjectsState, setOptionalSubjectsState] = useState({isLoading:false, items:[{}]});


    // Transports state
    const [transportState, setTransportsState] = useState({isLoading:false, items:[{}]});


    // Nationalities state
    const [nationalitiesState, setNationalitiesState] = useState({isLoading:false, items:[{}]});


    // Handle Search Click
    const searchClick = async () => {
        setIsLoading(true);
        if(admissionEnquiries?.map((enquiry:any) => enquiry?.enquiry_no)?.includes(search)){
            const student = await fetchEnquiryByEnquiryNo({enquiry_no:search});
            setUpdateStudent({
                id:'',
                isDeleteClicked:false,
        
                // Student
                student:{
                    // 1
                    is_online:false,
                    image:'',
                    enquiry_no:'',
                    reg_no:'',
                    pros_no:'',
                    amount:0,
                    date:new Date(),
                    payment_mode:localStorage.getItem('payment_mode') !== null ? localStorage.getItem('payment_mode') : '',
                    admission_account:localStorage.getItem('admission_account') !== null ? localStorage.getItem('admission_account') : '',
                    post_account:localStorage.getItem('post_account') !== null ? localStorage.getItem('post_account') : '',
                    // 2
                    class:'',
                    board:'',
                    stream:'',
                    subject:[''],
                    optional_subject:'',
                    name:'',
                    middle_name:'',
                    last_name:'',
                    dob:new Date(),
                    place_of_birth:'',
                    gender:'Male',
                    contact_person_name:'',
                    contact_person_mobile:0,
                    contact_person_email:'',
                    secondary_contact_no:0,
                    h_no_and_streets:'',
                    email:'',
                    city:'',
                    mobile:0,
                    state:'',
                    pin_code:0,
                    aadhar_card_no:0,
                    religion:'',
                    blood_group:'',
                    caste:'',
                    category:'',
                    is_ews:false,
                    sibling:false,
                    transport:'',
                    nationality:''
                },
        
                // Parents
                parents:{
                    // Father
                    father:{
                        father_name:'',
                        middle_name:'',
                        last_name:'',
                        profession:'',
                        designation:'',
                        residence_address:'',
                        office_address:'',
                        email:'',
                        alternate_email:'',
                        dob:new Date(),
                        mobile:0,
                        phone:0,
                        company_name:'',
                        business_details:'',
                        qualification:'',
                        service_in:'',
                        office_phone:0,
                        office_mobile:0,
                        office_extension:'',
                        office_email:'',
                        office_website:'',
                        annual_income:'',
                        parent_status:''
                    },
                    // Mother
                    mother:{
                        mother_name:'',
                        middle_name:'',
                        last_name:'',
                        profession:'',
                        designation:'',
                        residence_address:'',
                        office_address:'',
                        email:'',
                        alternate_email:'',
                        dob:new Date(),
                        mobile:0,
                        phone:0,
                        company_name:'',
                        business_details:'',
                        qualification:'',
                        service_in:'',
                        office_phone:0,
                        office_mobile:0,
                        office_extension:'',
                        office_email:'',
                        office_website:'',
                        annual_income:'',
                        anniversary_date:new Date()
                    }
                },
        
                // Other details
                others:{
                    // 1
                    student_other_details:{
                        medical_history:'',
                        descriptions:'',
                        allergies:'',
                        allergies_causes:'',
                        family_doctor_name:'',
                        family_doctor_phone:0,
                        family_doctor_address:'',
                        distance_from_home:0,
                        no_of_living_year:0,
                        only_child:'',
                        general_description:''
                    },
                    // 2
                    student_staff_relation:{
                        staff_ward:'',
                        staff_name:''
                    },
                    // 3
                    is_alumni:{
                        is_alumni:false,
                        academic_session:'',
                        class_name:'',
                        admission_number:0
                    },
                    // 4
                    previous_school_details:[
                        {
                            school_name:'',
                            board:'',
                            passing_year:'',
                            total_marks:'',
                            percentage:'',
                            result:'',
                            is_alumni:'',
                            father_name:'',
                            father_passing_year:'',
                            mother_name:'',
                            mother_passing_year:''
                        },
                        {
                            school_name:'',
                            board:'',
                            passing_year:'',
                            total_marks:'',
                            percentage:'',
                            result:'',
                            is_alumni:'',
                            father_name:'',
                            father_passing_year:'',
                            mother_name:'',
                            mother_passing_year:''
                        },
                        {
                            school_name:'',
                            board:'',
                            passing_year:'',
                            total_marks:'',
                            percentage:'',
                            result:'',
                            is_alumni:'',
                            father_name:'',
                            father_passing_year:'',
                            mother_name:'',
                            mother_passing_year:''
                        }
                    ]
                },
        
                // Guardian details
                guardian_details:{
                    // 1
                    guardian_name:'',
                    profession:'',
                    designation:'',
                    company_name:'',
                    business_details:'',
                    qualification:'',
                    // 2
                    if_single_parent:{
                        student_lives_with:'',
                        legal_custody_of_the_child:'',
                        correspondence_to:'',
                        check_id_applicable:'',
                        separation_reason:''
                    }
                },

                // Siblings
                siblings:[],

                // Paymode details
                paymode_details:{
                    cheque_no:'',
                    cheque_date:new Date(),
                    cheque_bank:'',
                    dd_no:'',
                    dd_date:new Date(),
                    dd_bank:'',
                    branch_name:'',
                    deposit_bank:'',
                    neft_name:''
                }
            });
            setValuesFromEnquiry({
                enquiry_no:student.enquiry_no,
                visitor_name:student.visitor_name,
                visitor_address:student.visitor_address,
                mobile_no:student.mobile_no,
                student_name:student.student_name,
                class_name:student.class_name,
                contact_person:student.contact_person
            });
        }else{
            setIsViewOpened('enquiry');
        };
        setSearch('');
        setIsLoading(false);
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {

            // Fetching data
            const dropdownData = localStorage.getItem('admissionFormRegistrationDropdownData') ? JSON.parse(localStorage.getItem('admissionFormRegistrationDropdownData')) : [];
            if(dropdownData.length === 0){

                // Admission states
                const admissionStates = await fetchAdmissionStates();


                // Admission accounts
                setAdmissionAccountsState({...addmisionAccountsState, isLoading:true});
                const admissionAccountsRes = await fetchGeneralLedgers();
                setAdmissionAccountsState({isLoading:false, items:admissionAccountsRes});
                
                
                // Bank ledgers
                setBankLedgersState({...bankLedgersState, isLoading:true});
                const bankLedgersRes = await fetchBankLedgers();
                setBankLedgersState({isLoading:false, items:bankLedgersRes});
                
                
                // Boards
                setBoardsState({...boardsState, isLoading:true});
                const boardsRes = await fetchBoards();
                setBoardsState({isLoading:false, items:boardsRes});
                // @ts-ignore
                form.setValue('student.board', boardsRes?.find((b:any) => b.is_default)?.board);
                
                
                // Classes
                setClassesState({...classesState, isLoading:true});
                const classesRes = await fetchOpenAdmissionClassesNames();
                setClassesState({isLoading:false, items:classesRes});
                
                
                // Streams
                setStreamsState({...streamsState, isLoading:true});
                const streamsRes = await fetchStreamsNames();
                setStreamsState({isLoading:false, items:streamsRes});
                
                
                // Subjects
                setSubjectsState({...subjectsState, isLoading:true});
                const subjectsRes = await fetchSubjectsNames();
                setSubjectsState({isLoading:false, items:subjectsRes});
                
                
                // Optional subjects
                setOptionalSubjectsState({...optionalSubjectsState, isLoading:true});
                const optionalSubjectsRes = await fetchOptionalSubjectsNames();
                setOptionalSubjectsState({isLoading:false, items:optionalSubjectsRes});
                
                
                // Religions
                setReligionsState({...religionsState, isLoading:true});
                const religionsRes = await fetchReligionsNames();
                setReligionsState({isLoading:false, items:religionsRes});
                
                
                // Blood groups
                setBloodGroupsState({...bloodGroupsState, isLoading:true});
                const bloodGroupsRes = await fetchBloodGroupsNames();
                setBloodGroupsState({isLoading:false, items:bloodGroupsRes});
                
                
                // Casts
                setCastesState({...castesState, isLoading:true});
                const castsRes = await fetchCastesNames();
                setCastesState({isLoading:false, items:castsRes});
                

                // Categories
                setCategoriesState({...categoriesState, isLoading:true});
                const categoriesRes = await fetchCategoriesNames();
                setCategoriesState({isLoading:false, items:categoriesRes});
                

                // Transports
                setTransportsState({...transportState, isLoading:true});
                const transportsRes = await fetchTransportMediumsNames();
                setTransportsState({isLoading:false, items:transportsRes});
                

                // Nationalities
                setNationalitiesState({...nationalitiesState, isLoading:true});
                const nationalitiesRes = await fetchNationalitiesNames();
                setNationalitiesState({isLoading:false, items:nationalitiesRes});


                // Creating new dropdown data and saving it to the local storage
                const newDropdownData = [
                    {
                        admission_accounts_last_updated_at:new Date(admissionStates?.admission_accounts_last_updated_at),
                        data:admissionAccountsRes
                    },
                    {
                        post_accounts_last_updated_at:new Date(admissionStates?.post_accounts_last_updated_at),
                        data:bankLedgersRes
                    },
                    {
                        boards_last_updated_at:new Date(admissionStates?.boards_last_updated_at),
                        data:boardsRes
                    },
                    {
                        classes_last_updated_at:new Date(admissionStates?.classes_last_updated_at),
                        data:classesRes
                    },
                    {
                        streams_last_updated_at:new Date(admissionStates?.streams_last_updated_at),
                        data:streamsRes
                    },
                    {
                        subjects_last_updated_at:new Date(admissionStates?.subjects_last_updated_at),
                        data:subjectsRes
                    },
                    {
                        optional_subjects_last_updated_at:new Date(admissionStates?.optional_subjects_last_updated_at),
                        data:optionalSubjectsRes
                    },
                    {
                        religions_last_updated_at:new Date(admissionStates?.religions_last_updated_at),
                        data:religionsRes
                    },
                    {
                        blood_groups_last_updated_at:new Date(admissionStates?.blood_groups_last_updated_at),
                        data:bloodGroupsRes
                    },
                    {
                        casts_last_updated_at:new Date(admissionStates?.casts_last_updated_at),
                        data:castsRes
                    },
                    {
                        categories_last_updated_at:new Date(admissionStates?.categories_last_updated_at),
                        data:categoriesRes
                    },
                    {
                        transport_mediums_last_updated_at:new Date(admissionStates?.transport_mediums_last_updated_at),
                        data:transportsRes
                    },
                    {
                        nationalities_last_updated_at:new Date(admissionStates?.nationalities_last_updated_at),
                        data:nationalitiesRes
                    }
                ];
                localStorage.setItem('admissionFormRegistrationDropdownData', JSON.stringify(newDropdownData));

            }else{

                // Local storage values
                const localStorageData = dropdownData.reduce((acc:any, item:any) => {const [key, value] = Object.entries(item)[0];acc[key] = value;return acc;}, {});
                
                
                // Database values
                const lastUpdatedDates = await fetchAdmissionStates();
                const allDataBaseValues = Object.keys(lastUpdatedDates).filter(key => key.includes('last_updated_at')).reduce((acc, key) => {acc[key] = lastUpdatedDates[key];return acc}, {});
                const dataBaseValues = Object.fromEntries(Object.entries(allDataBaseValues).filter(([key]) => localStorageData.hasOwnProperty(key)));


                // Checking if the local storage is async with the databse
                if(deepEqual(localStorageData, dataBaseValues)){

                    // Admission accounts
                    setAdmissionAccountsState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('admission_accounts_last_updated_at')).data});
                    
                    
                    // Bank ledgers
                    setBankLedgersState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('post_accounts_last_updated_at')).data});
                    
                    
                    // Boards
                    setBoardsState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('boards_last_updated_at')).data});
                    // @ts-ignore
                    form.setValue('student.board', dropdownData?.find((d:any) => Object.keys(d).includes('boards_last_updated_at')).data?.find((b:any) => b.is_default)?.board);
                    
                    
                    // Classes
                    setClassesState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('classes_last_updated_at')).data});
                    
                    
                    // Streams
                    setStreamsState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('streams_last_updated_at')).data});
                    
                    
                    // Subjects
                    setSubjectsState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('subjects_last_updated_at')).data});
                    
                    
                    // Optional subjects
                    setOptionalSubjectsState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('optional_subjects_last_updated_at')).data});
                    
                    
                    // Religions
                    setReligionsState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('religions_last_updated_at')).data});
                    
                    
                    // Blood groups
                    setBloodGroupsState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('blood_groups_last_updated_at')).data});
                    
                    
                    // Casts
                    setCastesState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('casts_last_updated_at')).data});
                    

                    // Categories
                    setCategoriesState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('categories_last_updated_at')).data});
                    

                    // Transports
                    setTransportsState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('transport_mediums_last_updated_at')).data});
                    

                    // Nationalities
                    setNationalitiesState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('nationalities_last_updated_at')).data});

                }else{

                    // Admission states
                    const admissionStates = await fetchAdmissionStates();


                    // Admission accounts
                    setAdmissionAccountsState({...addmisionAccountsState, isLoading:true});
                    const admissionAccountsRes = await fetchGeneralLedgers();
                    setAdmissionAccountsState({isLoading:false, items:admissionAccountsRes});
                    
                    
                    // Bank ledgers
                    setBankLedgersState({...bankLedgersState, isLoading:true});
                    const bankLedgersRes = await fetchBankLedgers();
                    setBankLedgersState({isLoading:false, items:bankLedgersRes});
                    
                    
                    // Boards
                    setBoardsState({...boardsState, isLoading:true});
                    const boardsRes = await fetchBoards();
                    setBoardsState({isLoading:false, items:boardsRes});
                    // @ts-ignore
                    form.setValue('student.board', boardsRes?.find((b:any) => b.is_default)?.board);
                    
                    
                    // Classes
                    setClassesState({...classesState, isLoading:true});
                    const classesRes = await fetchOpenAdmissionClassesNames();
                    setClassesState({isLoading:false, items:classesRes});
                    
                    
                    // Streams
                    setStreamsState({...streamsState, isLoading:true});
                    const streamsRes = await fetchStreamsNames();
                    setStreamsState({isLoading:false, items:streamsRes});
                    
                    
                    // Subjects
                    setSubjectsState({...subjectsState, isLoading:true});
                    const subjectsRes = await fetchSubjectsNames();
                    setSubjectsState({isLoading:false, items:subjectsRes});
                    
                    
                    // Optional subjects
                    setOptionalSubjectsState({...optionalSubjectsState, isLoading:true});
                    const optionalSubjectsRes = await fetchOptionalSubjectsNames();
                    setOptionalSubjectsState({isLoading:false, items:optionalSubjectsRes});
                    
                    
                    // Religions
                    setReligionsState({...religionsState, isLoading:true});
                    const religionsRes = await fetchReligionsNames();
                    setReligionsState({isLoading:false, items:religionsRes});
                    
                    
                    // Blood groups
                    setBloodGroupsState({...bloodGroupsState, isLoading:true});
                    const bloodGroupsRes = await fetchBloodGroupsNames();
                    setBloodGroupsState({isLoading:false, items:bloodGroupsRes});
                    
                    
                    // Casts
                    setCastesState({...castesState, isLoading:true});
                    const castsRes = await fetchCastesNames();
                    setCastesState({isLoading:false, items:castsRes});
                    

                    // Categories
                    setCategoriesState({...categoriesState, isLoading:true});
                    const categoriesRes = await fetchCategoriesNames();
                    setCategoriesState({isLoading:false, items:categoriesRes});
                    

                    // Transports
                    setTransportsState({...transportState, isLoading:true});
                    const transportsRes = await fetchTransportMediumsNames();
                    setTransportsState({isLoading:false, items:transportsRes});
                    

                    // Nationalities
                    setNationalitiesState({...nationalitiesState, isLoading:true});
                    const nationalitiesRes = await fetchNationalitiesNames();
                    setNationalitiesState({isLoading:false, items:nationalitiesRes});


                    // Creating new dropdown data and saving it to the local storage
                    const newDropdownData = [
                        {
                            admission_accounts_last_updated_at:new Date(admissionStates?.admission_accounts_last_updated_at),
                            data:admissionAccountsRes
                        },
                        {
                            post_accounts_last_updated_at:new Date(admissionStates?.post_accounts_last_updated_at),
                            data:bankLedgersRes
                        },
                        {
                            boards_last_updated_at:new Date(admissionStates?.boards_last_updated_at),
                            data:boardsRes
                        },
                        {
                            classes_last_updated_at:new Date(admissionStates?.classes_last_updated_at),
                            data:classesRes
                        },
                        {
                            streams_last_updated_at:new Date(admissionStates?.streams_last_updated_at),
                            data:streamsRes
                        },
                        {
                            subjects_last_updated_at:new Date(admissionStates?.subjects_last_updated_at),
                            data:subjectsRes
                        },
                        {
                            optional_subjects_last_updated_at:new Date(admissionStates?.optional_subjects_last_updated_at),
                            data:optionalSubjectsRes
                        },
                        {
                            religions_last_updated_at:new Date(admissionStates?.religions_last_updated_at),
                            data:religionsRes
                        },
                        {
                            blood_groups_last_updated_at:new Date(admissionStates?.blood_groups_last_updated_at),
                            data:bloodGroupsRes
                        },
                        {
                            casts_last_updated_at:new Date(admissionStates?.casts_last_updated_at),
                            data:castsRes
                        },
                        {
                            categories_last_updated_at:new Date(admissionStates?.categories_last_updated_at),
                            data:categoriesRes
                        },
                        {
                            transport_mediums_last_updated_at:new Date(admissionStates?.transport_mediums_last_updated_at),
                            data:transportsRes
                        },
                        {
                            nationalities_last_updated_at:new Date(admissionStates?.nationalities_last_updated_at),
                            data:nationalitiesRes
                        }
                    ];
                    localStorage.setItem('admissionFormRegistrationDropdownData', JSON.stringify(newDropdownData));

                };

            };
            
        };
        fetcher();
    }, []);
    useEffect(() => {
        const numberGenerator = async () => {
            try {
                let substringValue;
                if(students?.length < 9){
                    substringValue = 0;
                }else if(students?.length >= 9){
                    substringValue = 1;
                }else if(students?.length >= 99){
                    substringValue = 2;
                }else if(students?.length >= 999){
                    substringValue = 3;
                }else if(students?.length >= 9999){
                    substringValue = 4;
                }else if(students?.length >= 99999){
                    substringValue = 5;
                }else if(students?.length >= 999999){
                    substringValue = 6;
                }
                if(form.getValues().student.class !== '' && updateStudent.id === ''){
                    const admissionNumbers = await fetchClassNumbers({class_name:'All Classes'});
                    // const admissionNumbers = localStorage.getItem('all_classes') === 'true'
                    //     ? await fetchClassNumbers({class_name:'All Classes'})
                    //     : await fetchClassNumbers({class_name:form.getValues().student.class});
                    // @ts-ignore
                    const registerEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Registration No.')[0]
                    const prospectusEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Prospectus No.')[0];
                    const onlineRegisterEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Registration No. (Online)')[0];
                    
                    if(registerEntity && registerEntity?.should_be === 'Automatic'){
                        form.setValue('student.reg_no', `${registerEntity?.prefix}${registerEntity?.lead_zero.substring(substringValue, registerEntity?.lead_zero?.length - 1)}${students?.length + 1}${registerEntity?.suffix}`);
                    }else{
                        form.setValue('student.reg_no', '');
                    };

                    if(prospectusEntity && prospectusEntity?.should_be === 'Automatic'){
                        form.setValue('student.pros_no', `${prospectusEntity?.prefix}${prospectusEntity?.lead_zero.substring(substringValue, prospectusEntity?.lead_zero.length - 1)}${students?.length + 1}${prospectusEntity?.suffix}`);
                    }else{
                        form.setValue('student.pros_no', '');
                    };

                    if(onlineRegisterEntity){
                        form.setValue('student.is_online', true);
                    }else{
                        form.setValue('student.is_online', false);
                    };
                };
                if(updateStudent.id !== '' && form.getValues().student.class !== updateStudent.student.class){
                    const admissionNumbers = await fetchClassNumbers({class_name:'All Classes'});
                    // const admissionNumbers = localStorage.getItem('all_classes') === 'true'
                    //     ? await fetchClassNumbers({class_name:'All Classes'})
                    //     : await fetchClassNumbers({class_name:form.getValues().student.class});
                    // @ts-ignore
                    const registerEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Registration No.')[0]
                    const prospectusEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Prospectus No.')[0];
                    const onlineRegisterEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Registration No. (Online)')[0];
                    
                    if(registerEntity && registerEntity?.should_be === 'Automatic'){
                        form.setValue('student.reg_no', `${registerEntity?.prefix}${registerEntity?.lead_zero.substring(substringValue, registerEntity?.lead_zero?.length - 1)}${students?.length + 1}${registerEntity?.suffix}`);
                    }else{
                        form.setValue('student.reg_no', '');
                    };

                    if(prospectusEntity && prospectusEntity?.should_be === 'Automatic'){
                        form.setValue('student.pros_no', `${prospectusEntity?.prefix}${prospectusEntity?.lead_zero.substring(substringValue, prospectusEntity?.lead_zero.length - 1)}${students?.length + 1}${prospectusEntity?.suffix}`);
                    }else{
                        form.setValue('student.pros_no', '');
                    };

                    if(onlineRegisterEntity){
                        form.setValue('student.is_online', true);
                    }else{
                        form.setValue('student.is_online', false);
                    };
                }
            } catch (err:any) {
                console.log(err);
            }
        };
        numberGenerator();
    }, [form.watch('student.class')]);
    useEffect(() => {
        const fetcher = async () => {
            const stationaryDetails = await fetchStationaryDetails();
            if(form.getValues().student.is_online){
                const onlineData = stationaryDetails.filter((s:any) => s.is_online);
                // @ts-ignore
                form.setValue('student.amount', onlineData[0].amount);
            }else{
                const offlineData = stationaryDetails.filter((s:any) => !s.is_online);
                // @ts-ignore
                form.setValue('student.amount', offlineData[0].amount);
            };
        };
        fetcher();
    }, [form.watch('student.is_online'), window.onload]);
    useEffect(() => {
        if(date){
            // @ts-ignore
            form.setValue('student.date', date._d);
        };
    }, [date]);
    useEffect(() => {
        if(dob){
            // @ts-ignore
            form.setValue('student.dob', dob._d);
        };
    }, [dob]);
    useEffect(() => {
        // @ts-ignore
        form.setValue('student.board', boardsState.items?.find((b:any) => b.is_default)?.board);
    }, [boardsState]);
    useEffect(() => {}, [form.watch('student.payment_mode')]);

    return (
        <div className='flex flex-row'>
            <div className='basis-[30%] flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2'>


                {/* Is online */}
                <FormField
                    control={form?.control}
                    name='student.is_online'
                    render={({field}) => (
                        <FormItem className='flex flex-row items-start justify-start sm:items-center sm:gap-2'>
                            <FormControl>
                                <div className='flex-1 flex items-center justify-start space-x-2'>
                                    <Label htmlFor='is_online' className='text-[11px]'>
                                        Is online
                                    </Label>
                                    <Switch
                                        id='is_online'
                                        {...field}
                                        value={field?.value}
                                        onCheckedChange={field?.onChange}
                                        checked={field?.value}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Image */}
                <StudentImage
                    setFile={setFile}
                    imageSrc={imageSrc}
                    setImageSrc={setImageSrc}
                    updateStudent={updateStudent}
                />



                {/* Enquiry No. */}
                {form.getValues().student.with_enquiry && (
                    <FormField
                        control={form?.control}
                        name='student.enquiry_no'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Enquiry No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />
                )}


                {/* Reg. No. */}
                <FormField
                    control={form?.control}
                    name='student.reg_no'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Reg. No.</FormLabel>
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


                {/* Pros. No. */}
                <FormField
                    control={form?.control}
                    name='student.pros_no'
                    render={({ field }) => (
                        <FormItem className='w-full mt-2 sm:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Pros. No.</FormLabel>
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


                {/* Amount */}
                <FormField
                    control={form?.control}
                    name='student.amount'
                    render={({ field }) => (
                        <FormItem className='w-full mt-2 sm:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Amount</FormLabel>
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


                {/* Date */}
                <FormField
                    control={form?.control}
                    name='student.date'
                    render={() => (
                        <FormItem className='relative w-full h-7 pb-[8px] flex flex-col items-start justify-center mt-2 sm:mt-0 sm:flex-row sm:items-center'>
                            <FormLabel className='basis-auto h-2 pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Date</FormLabel>
                            <div className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={date}
                                    setSelectedDate={setDate}
                                />
                            </div>
                        </FormItem>
                    )}
                />


                {/* Payment Mode */}
                <div className='w-full flex flex-col items-center sm:flex-row'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Payment Mode</FormLabel>
                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                        <FormField
                            control={form?.control}
                            name='student.payment_mode'
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
                                                <SelectItem value='Cash'>Cash</SelectItem>
                                                <SelectItem value='Cheque'>Cheque</SelectItem>
                                                <SelectItem value='DD'>DD</SelectItem>
                                                <SelectItem value='NEFT'>NEFT</SelectItem>
                                                <SelectItem value='Swiped Card'>Swiped Card</SelectItem>
                                                <SelectItem value='UPI'>UPI</SelectItem>
                                                <SelectItem value='Online'>Online</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>


                {/* Payment Modes */}
                {form.getValues().student.payment_mode === 'Cheque' && <ChequeDetails form={form}/>}
                {form.getValues().student.payment_mode === 'DD' && <DDDetails form={form}/>}
                {form.getValues().student.payment_mode === 'NEFT' && <NeftDetails form={form}/>}
                {form.getValues().student.payment_mode === 'UPI' && <UPIDetails setIsQrCodeGenerated={setIsQrCodeGenerated} form={form} updateStudent={updateStudent}/>}
                {form.getValues().student.payment_mode === 'Swiped Card' && <SwipedCardDetaila form={form}/>}
                {/* {form.getValues().student.payment_mode === 'Online' && <PaymentGateway selectedStudent={selectedStudent} totalPaidAmount={totalPaidAmount} setIsQrCodeGenerated={setIsQrCodeGenerated} form={form} selectedInstallments={selectedInstallments}/>} */}


                {/* Admission Account */}
                <div className='w-full flex flex-col items-center sm:flex-row'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Admission Account</FormLabel>
                    {addmisionAccountsState.isLoading ? (
                        <LoadingIcon />
                    ) : (
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='student.admission_account'
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
                                                    {addmisionAccountsState.items?.length < 1 ? (
                                                            <p>No accounts yet</p>
                                                        ) : // @ts-ignore
                                                        !addmisionAccountsState.items[0]?.account_name ? (
                                                            <LoadingIcon />
                                                        ) : addmisionAccountsState.items.map((ledger:any) => (
                                                            <SelectItem value={ledger.account_name} key={ledger._id}>{ledger.account_name}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                </div>


                {/* Post Account */}
                <div className='w-full flex flex-col items-center sm:flex-row'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Post Account</FormLabel>
                    {bankLedgersState.isLoading ? (
                        <LoadingIcon />
                    ) : (
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='student.post_account'
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
                                                    {bankLedgersState.items.length < 1 ? (
                                                            <p>No bank ledgers yet</p>
                                                        ) : // @ts-ignore
                                                        !bankLedgersState.items[0].account_name ? (
                                                            <LoadingIcon />
                                                        ) : bankLedgersState.items.map((ledger:any) => (
                                                            <SelectItem value={ledger.account_name} key={ledger._id}>{ledger.account_name}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                </div>

            </div>











































            <div className='basis-[70%] flex-1 flex flex-col pr-2 gap-2'>
                {/* Search */}
                <div className='flex flex-col p-2 ml-2 border-[0.5px] border-[#ccc] bg-[#F7F7F7] gap-2 rounded-[5px] text-xs text-hash-color lg:flex-row'>
                    {/* With Enquiry */}
                    <FormField
                        control={form?.control}
                        name='student.with_enquiry'
                        render={({field}) => (
                            <FormItem className='flex flex-row min-w-[200px] mx-2 items-start justify-start sm:items-center sm:gap-2'>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-start space-x-2'>
                                            <Label htmlFor='with_enquiry' className='text-[11px]'>
                                                With Enquiry
                                            </Label>
                                            <Switch
                                                id='with_enquiry'
                                                {...field}
                                                value={field?.value}
                                                onCheckedChange={field?.onChange}
                                                checked={field?.value}
                                            />
                                        </div>
                                    </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.getValues().student.with_enquiry && (
                        <div className='flex flex-row justify-center min-w-[200px] max-w-[600px] w-[100%] bg-white rounded-[5px] border-[0.5px] border-[#E4E4E4]'>
                            <Input
                                value={search}
                                onChange={(e:any) => setSearch(e?.target?.value)}
                                className='h-7 border-[0] text-xs placeholder:text-xs'
                                placeholder='Search enquiry no.'
                            />
                            <div
                                onClick={searchClick}
                                className='group flex flex-row items-center justify-center gap-[2px] px-2 border-[0.5px] border-[#2EABE5] rounded-r-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5]'
                            >
                                <Search size={15} className='text-[#2EABE5] transition group-hover:text-white'/>
                                <p className='transition text-[#2EABE5] group-hover:text-white'>Search</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2 lg:flex-row'>
                    {/* Class */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Class</FormLabel>
                        {classesState.isLoading ? (
                            <LoadingIcon />
                        ) : (
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form?.control}
                                    name='student.class'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                    onOpenChange={async () => {
                                                        // setClassesState({...classesState, isLoading:true});
                                                        // const classesRes = await fetchOpenAdmissionClassesNames();
                                                        // setClassesState({isLoading:false, items:classesRes});
                                                    }}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {classesState.items?.length < 1 ? (
                                                            <p>No classes</p>
                                                            // @ts-ignore
                                                        ) : !classesState.items[0]?.class_name ? (
                                                            <LoadingIcon />
                                                        ) : classesState.items?.map((item:any) => (
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
                        )}
                    </div>


                    {/* Board */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Board</FormLabel>
                        {boardsState.isLoading ? (
                            <LoadingIcon />
                        ) : (
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField 
                                    control={form?.control}
                                    name='student.board'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                    onOpenChange={async () => {
                                                        // setBoardsState({...boardsState, isLoading:true});
                                                        // const res = await fetchBoards();
                                                        // setBoardsState({isLoading:false, items:res});
                                                    }}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {boardsState.items?.length < 1 ? (
                                                            <p>No boards</p>
                                                            // @ts-ignore
                                                        ) : !boardsState.items[0]?.board ? (
                                                            <LoadingIcon />
                                                        ) : boardsState.items?.map((item:any) => (
                                                            <SelectItem value={item?.board} key={item?._id}>{item?.board}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>


                    {/* Stream */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Stream</FormLabel>
                        {streamsState.isLoading ? (
                            <LoadingIcon />
                        ) : (
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form?.control}
                                    name='student.stream'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                    onOpenChange={async () => {
                                                        // setStreamsState({...streamsState, isLoading:true});
                                                        // const res = await fetchStreamsNames();
                                                        // setStreamsState({isLoading:false, items:res});
                                                    }}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {streamsState.items?.length < 1 ? (
                                                            <p>No streams</p>
                                                            // @ts-ignore
                                                        ) : !streamsState.items[0]?.stream_name ? (
                                                            <LoadingIcon />
                                                        ) : streamsState.items?.map((item:any) => (
                                                            <SelectItem value={item?.stream_name} key={item?._id}>{item?.stream_name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>


                    {/* Subjects */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Subjects</FormLabel>
                        {subjectsState.isLoading ? (
                            <LoadingIcon />
                        ) : (
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
                                    <FormControl>
                                        <Select
                                            onOpenChange={async () => {
                                                // setSubjectsState({...subjectsState, isLoading:true});
                                                // const res = await fetchSubjectsNames();
                                                // setSubjectsState({isLoading:false, items:res});
                                            }}
                                        >
                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder={selectedSubjects?.length < 1 ? 'Please Select' : selectedSubjects?.length === 1 ? '1 subject selected' : `${selectedSubjects?.length} subjects selected`} />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {subjectsState.items.length < 1 ? (
                                                    <p>No subjects</p>
                                                ) : // @ts-ignore
                                                !subjectsState.items[0]?.subject_name ? (
                                                    <LoadingIcon />
                                                ) : (
                                                    <>
                                                        <div className='flex flex-row'>
                                                            <div
                                                                // @ts-ignore
                                                                onClick={() => setSelectedSubjects(subjectsState.items.map((s:any) => s.subject_name))}
                                                                className='group flex flex-row items-center justify-center cursor-pointer'
                                                            >
                                                                <Check size={12}/>
                                                                <p className='text-xs group-hover:underline'>All</p>
                                                            </div>
                                                            <div
                                                                onClick={() => setSelectedSubjects([])}
                                                                className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                                            >
                                                                <X size={12}/>
                                                                <p className='text-xs group-hover:underline'>Clear</p>
                                                            </div>
                                                        </div>
                                                        <ul className='mt-2'>
                                                            {subjectsState.items.map((subject:any) => (
                                                                <li className='flex flex-row items-center space-x-[2px] mt-[2px]' key={subject._id}>
                                                                    <Checkbox
                                                                        className='rounded-[3px] text-hash-color font-semibold'
                                                                        checked={selectedSubjects?.map((s:any) => s).includes(subject.subject_name)}
                                                                        // @ts-ignore
                                                                        onClick={() => selectedSubjects?.includes(subject.subject_name) ? setSelectedSubjects(selectedSubjects?.filter((s:any) => s !== subject.subject_name)) : setSelectedSubjects([...selectedSubjects, subject.subject_name])}
                                                                    />
                                                                    <div className='w-full flex flex-row'>
                                                                        <p className='basis-[70%] text-[11px]'>{subject.subject_name}</p>
                                                                        {subject.is_university && <p className='basis-[30%] text-[11px] border-l-[0.5px] border-hash-color text-center'>{subject.available_seats}</p>}
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            </div>
                        )}
                    </div>


                    {/* Optional Subject */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Optional Subject</FormLabel>
                        {optionalSubjectsState.isLoading ? (
                            <LoadingIcon />
                        ) : (
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField 
                                    control={form?.control}
                                    name='student.optional_subject'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                    onOpenChange={async () => {
                                                        // setOptionalSubjectsState({...optionalSubjectsState, isLoading:true});
                                                        // const res = await fetchOptionalSubjectsNames();
                                                        // setOptionalSubjectsState({isLoading:false, items:res});
                                                    }}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {optionalSubjectsState.items?.length < 1 ? (
                                                            <p>No optional subjects</p>
                                                            // @ts-ignore
                                                        ) : !optionalSubjectsState.items[0]?.subject_name ? (
                                                            <LoadingIcon />
                                                        ) : optionalSubjectsState.items?.map((item:any) => (
                                                            <SelectItem value={item?.subject_name} key={item?._id}>{item?.subject_name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </div>





                <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Name */}
                        <FormField
                            control={form?.control}
                            name='student.name'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Name</FormLabel>
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
                        {/* Middle Name */}
                        <FormField
                            control={form?.control}
                            name='student.middle_name'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Middle Name</FormLabel>
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


                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Last Name */}
                        <FormField
                            control={form?.control}
                            name='student.last_name'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Last Name</FormLabel>
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
                        {/* DOB */}
                        <FormField
                            control={form?.control}
                            name='student.dob'
                            render={() => (
                                <FormItem className='relative w-full h-7 pb-[8px] flex flex-col items-start justify-center mt-2 sm:mt-0 sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto h-2 pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>DOB</FormLabel>
                                    <div className='basis-[65%]'>
                                        <MyDatePicker
                                            selectedDate={dob}
                                            setSelectedDate={setDob}
                                        />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>


                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Place Of Birth */}
                        <FormField
                            control={form?.control}
                            name='student.place_of_birth'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Place Of Birth</FormLabel>
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
                        {/* Gender */}
                        <FormField
                            control={form?.control}
                            name='student.gender'
                            render={() => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Gender</FormLabel>
                                        <div className='h-full w-full flex flex-col gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                            <RadioGroup
                                                value={form?.getValues()?.student?.gender}
                                                className='h-full flex flex-row'
                                            >
                                                <div className='flex items-center space-x-[2px]'>
                                                    <RadioGroupItem value='Male' id='Male' onClick={() => form?.setValue('student.gender', 'Male')}/>
                                                    <Label htmlFor='Male' className='text-[11px] text-hash-color'>Male</Label>
                                                </div>
                                                <div className='flex items-center space-x-[2px]'>
                                                    <RadioGroupItem value='Female' id='Female' onClick={() => form?.setValue('student.gender', 'Female')}/>
                                                    <Label htmlFor='Female' className='text-[11px] text-hash-color'>Female</Label>
                                                </div>
                                            </RadioGroup>
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>





                <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Contact Person Name */}
                        <FormField
                            control={form?.control}
                            name='student.contact_person_name'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Contact Person Name</FormLabel>
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
                        {/* Contact Person Mobile */}
                        <FormField
                            control={form?.control}
                            name='student.contact_person_mobile'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Contact Person Mobile</FormLabel>
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
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Contact Person Email */}
                        <FormField
                            control={form?.control}
                            name='student.contact_person_email'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Contact Person Email</FormLabel>
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
                        {/* Secondary Contact No. */}
                        <FormField
                            control={form?.control}
                            name='student.secondary_contact_no'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Secondary Contact No.</FormLabel>
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
                </div>





                <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* H. No. and Streets */}
                        <FormField
                            control={form?.control}
                            name='student.h_no_and_streets'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>H. No. and Streets</FormLabel>
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
                        {/* Email */}
                        <FormField
                            control={form?.control}
                            name='student.email'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Email</FormLabel>
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
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* City */}
                        <FormField
                            control={form?.control}
                            name='student.city'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>City</FormLabel>
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
                        {/* Mobile */}
                        <FormField
                            control={form?.control}
                            name='student.mobile'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Mobile</FormLabel>
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
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        <div className='basis-[50%] flex flex-col gap-2 lg:flex-row'>
                            {/* State */}
                            <FormField
                                control={form?.control}
                                name='student.state'
                                render={({ field }) => (
                                    <FormItem className='w-full mt-2 sm:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>State</FormLabel>
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
                            {/* PIN Code */}
                            <FormField
                                control={form?.control}
                                name='student.pin_code'
                                render={({ field }) => (
                                    <FormItem className='w-full mt-2 sm:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>PIN Code</FormLabel>
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
                        <div className='basis-[50%]'>
                            {/* Aadhar Card No */}
                            <FormField
                                control={form?.control}
                                name='student.aadhar_card_no'
                                render={({ field }) => (
                                    <FormItem className='w-full mt-2 sm:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Aadhar Card No</FormLabel>
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
                    </div>
                </div>






                <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Religion */}
                        <div className='w-full flex flex-col items-center sm:flex-row'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Religion</FormLabel>
                            {religionsState.isLoading ? (
                                <LoadingIcon />
                            ) : (
                                <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='student.religion'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field?.value}
                                                        onValueChange={field?.onChange}
                                                        onOpenChange={async () => {
                                                            // setReligionsState({...religionsState, isLoading:true});
                                                            // const res = await fetchReligionsNames();
                                                            // setReligionsState({isLoading:false, items:res});
                                                        }}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {religionsState.items?.length < 1 ? (
                                                                <p>No religions</p>
                                                                // @ts-ignore
                                                            ) : !religionsState.items[0]?.religion_name ? (
                                                                <LoadingIcon />
                                                            ) : religionsState.items?.map((item:any) => (
                                                                <SelectItem value={item?.religion_name} key={item?._id}>{item?.religion_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                        {/* Blood Group */}
                        <div className='w-full flex flex-col items-center sm:flex-row'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Blood Group</FormLabel>
                            {bloodGroupsState.isLoading ? (
                                <LoadingIcon />
                            ) : (
                                <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='student.blood_group'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field?.value}
                                                        onValueChange={field?.onChange}
                                                        onOpenChange={async () => {
                                                            // setBloodGroupsState({...bloodGroupsState, isLoading:true});
                                                            // const res = await fetchBloodGroupsNames();
                                                            // setBloodGroupsState({isLoading:false, items:res});
                                                        }}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {bloodGroupsState.items.length < 1 ? (
                                                                    <p>No blood groups</p>
                                                                ) : // @ts-ignore
                                                                !bloodGroupsState.items[0].blood_group ? (
                                                                    <LoadingIcon />
                                                                ) : bloodGroupsState.items.map((ledger:any) => (
                                                                    <SelectItem value={ledger.blood_group} key={ledger._id}>{ledger.blood_group}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Caste */}
                        <div className='w-full flex flex-col items-center sm:flex-row'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Caste</FormLabel>
                            {castesState.isLoading ? (
                                <LoadingIcon />
                            ) : (
                                <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='student.caste'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field?.value}
                                                        onValueChange={field?.onChange}
                                                        onOpenChange={async () => {
                                                            // setCastesState({...castesState, isLoading:true});
                                                            // const res = await fetchCastesNames();
                                                            // setCastesState({isLoading:false, items:res});
                                                        }}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {castesState.items.length < 1 ? (
                                                                    <p>No casts</p>
                                                                ) : // @ts-ignore
                                                                !castesState.items[0].caste_name ? (
                                                                    <LoadingIcon />
                                                                ) : castesState.items.map((ledger:any) => (
                                                                    <SelectItem value={ledger.caste_name} key={ledger._id}>{ledger.caste_name}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                        {/* Category */}
                        <div className='w-full flex flex-col items-center sm:flex-row'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Category</FormLabel>
                            {categoriesState.isLoading ? (
                                <LoadingIcon />
                            ) : (
                                <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='student.category'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field?.value}
                                                        onValueChange={field?.onChange}
                                                        onOpenChange={async () => {
                                                            // setCategoriesState({...categoriesState, isLoading:true});
                                                            // const res = await fetchCategoriesNames();
                                                            // setCategoriesState({isLoading:false, items:res});
                                                        }}
                                                    >
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {categoriesState.items?.length < 1 ? (
                                                                <p>No categories</p>
                                                                // @ts-ignore
                                                            ) : !categoriesState.items[0]?.category_name ? (
                                                                <LoadingIcon />
                                                            ) : categoriesState.items?.map((item:any) => (
                                                                <SelectItem value={item?.category_name} key={item?._id}>{item?.category_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>





                <div className='flex flex-row gap-2 justify-evenly border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                    {/* Is EWS */}
                    <FormField
                        control={form?.control}
                        name='student.is_ews'
                        render={({field}) => (
                            <FormItem className='flex flex-row items-start justify-start sm:items-center sm:gap-2'>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-end space-x-2'>
                                            <Label htmlFor='is_ews' className='text-[11px]'>
                                                Is EWS
                                            </Label>
                                            <Switch
                                                id='is_ews'
                                                {...field}
                                                value={field?.value}
                                                onCheckedChange={field?.onChange}
                                                checked={field?.value}
                                            />
                                        </div>
                                    </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* Sibling */}
                    <FormField
                        control={form?.control}
                        name='student.sibling'
                        render={({field}) => (
                            <FormItem className='flex flex-row items-start justify-between sm:items-center sm:gap-2'>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-end space-x-2'>
                                            <Label htmlFor='is_ews' className='text-[11px]'>
                                                Sibling
                                            </Label>
                                            <Switch
                                                id='is_ews'
                                                {...field}
                                                value={field?.value}
                                                onCheckedChange={field?.onChange}
                                                checked={field?.value}
                                            />
                                        </div>
                                    </FormControl>
                            </FormItem>
                        )}
                    />
                </div>





                <div className='flex flex-col gap-2 justify-evenly border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2 lg:flex-row'>
                    {/* Transport */}
                    <div className='w-full flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Transport</FormLabel>
                        {transportState.isLoading ? (
                            <LoadingIcon />
                        ) : (
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form?.control}
                                    name='student.transport'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                    onOpenChange={async () => {
                                                        // setTransportsState({...transportState, isLoading:true});
                                                        // const res = await fetchTransportMediumsNames();
                                                        // setTransportsState({isLoading:false, items:res});
                                                    }}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {transportState.items.length < 1 ? (
                                                            <p className='text-xs text-hash-color'>No transport mediums</p>
                                                        ) : // @ts-ignore
                                                        !transportState.items[0].transport_medium ? (
                                                            <LoadingIcon />
                                                        ) : transportState.items.map((t:any) => (
                                                            <SelectItem value={t.transport_medium} id={t._id}>{t.transport_medium}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                    {/* Nationality */}
                    <div className='w-full flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Nationality</FormLabel>
                        {nationalitiesState.isLoading ? (
                            <LoadingIcon />
                        ) : (
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form?.control}
                                    name='student.nationality'
                                    render={({ field }) => (
                                        <FormItem className='relative flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                    onOpenChange={async () => {
                                                        // setNationalitiesState({...nationalitiesState, isLoading:true});
                                                        // const res = await fetchNationalitiesNames();
                                                        // setNationalitiesState({isLoading:false, items:res});
                                                    }}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {nationalitiesState.items?.length < 1 ? (
                                                            <p>No nationalities</p>
                                                            // @ts-ignore
                                                        ) : !nationalitiesState.items[0]?.name ? (
                                                            <LoadingIcon />
                                                        ) : nationalitiesState.items?.map((item:any) => (
                                                            <SelectItem value={item?.name} key={item?._id}>{item?.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>






        </div>
    );
};





// Export
export default Student;