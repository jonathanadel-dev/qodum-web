'use client';
// Imports
import Image from 'next/image';
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
import {fetchClubsNames} from '@/lib/actions/admission/globalMasters/club.actions';
import {fetchHousesNames} from '@/lib/actions/admission/globalMasters/house.actions';
import {fetchCastesNames} from '@/lib/actions/admission/globalMasters/caste.actions';
import {fetchStudentByRegNo} from '@/lib/actions/admission/admission/student.actions';
import {fetchStreamsNames} from '@/lib/actions/admission/globalMasters/stream.actions';
import {fetchBoards} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import {fetchParishesNames} from '@/lib/actions/admission/globalMasters/parish.actions';
import {fetchSubjectsNames} from '@/lib/actions/admission/globalMasters/subject.actions';
import {fetchClassNumbers} from '@/lib/actions/admission/masterSettings/admission.actions';
import {fetchReligionsNames} from '@/lib/actions/admission/globalMasters/religion.actions';
import {fetchCategoriesNames} from '@/lib/actions/admission/globalMasters/category.actions';
import {fetchCadetTypesNames} from '@/lib/actions/admission/globalMasters/cadetType.actions';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {fetchBloodGroupsNames} from '@/lib/actions/admission/globalMasters/bloodGroup.actions';
import {fetchTransportMediumsNames} from '@/lib/actions/fees/transport/transportMedium.actions';
import {fetchNationalitiesNames} from '@/lib/actions/admission/globalMasters/nationality.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchOptionalSubjectsNames} from '@/lib/actions/admission/globalMasters/optionalSubject.actions';
import {fetchClass, fetchClassesNames, fetchOpenAdmissionClassesNames} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchAllStudentsCount, fetchStudentByAdmNo, fetchStudentsByAllData} from '@/lib/actions/admission/admission/admittedStudent.actions';
import { fetchSectionsNames } from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import { fetchAdmissionStates } from '@/lib/actions/payroll/globalMasters/admissionStates.actions';
import { deepEqual } from '@/lib/utils';





// Main function
const Student = ({students, form, setIsViewOpened, setUpdateStudent, setFile, updateStudent, imageSrc, setImageSrc, setIsLoading, setValuesFromRegister, registeredStudents, selectedSubjects, setSelectedSubjects, setSelectedDocuments, valuesFromRegister, dob, setDob, doa, setDoa, doj, setDoj}:any) => {

    // Is loading searched students
    const [isLoadingSearchedStudents, setIsLoadingSearchedStudents] = useState(false);


    // Search
    const [search, setSearch] = useState('');


    // Classes state
    const [classesState, setClassesState] = useState({isLoading:false, items:[{}]});


    // Sections state
    const [sectionsState, setSectionsState] = useState({isLoading:false, items:[{}]});


    // Boards state
    const [boardsState, setBoardsState] = useState({isLoading:false, items:[{}]});


    // Religions state
    const [religionsState, setReligionsState] = useState({isLoading:false, items:[{}]});


    // Parishes state
    const [parishesState, setParishesState] = useState({isLoading:false, items:[{}]});


    // Categories state
    const [categoriesState, setCategoriesState] = useState({isLoading:false, items:[{}]});


    // Castes state
    const [castesState, setCastesState] = useState({isLoading:false, items:[{}]});


    // Blood groups state
    const [bloodGroupsState, setBloodGroupsState] = useState({isLoading:false, items:[{}]});


    // Cadet types state
    const [cadetTypesState, setCadetTypesState] = useState({isLoading:false, items:[{}]});


    // Clubs state
    const [clubsState, setClubsState] = useState({isLoading:false, items:[{}]});


    // Streams state
    const [streamsState, setStreamsState] = useState({isLoading:false, items:[{}]});


    // Subjects state
    const [subjectsState, setSubjectsState] = useState({isLoading:false, items:[{}]});


    // Optional subjects state
    const [optionalSubjectsState, setOptionalSubjectsState] = useState({isLoading:false, items:[{}]});


    // Houses state
    const [housesState, setHousesState] = useState({isLoading:false, items:[{}]});


    // Transports state
    const [transportState, setTransportsState] = useState({isLoading:false, items:[{}]});


    // Nationalities state
    const [nationalitiesState, setNationalitiesState] = useState({isLoading:false, items:[{}]});


    // Search Students
    const [searchStudents, setSearchStudents] = useState<any>([]);


    // Class sections
    const [classSections, setClassSections] = useState<any>([]);


    // Selected class
    const [selectedClass, setSelectedClass] = useState('');


    // Selected section
    const [selectedSection, setSelectedSection] = useState('');


    // Is parish
    const [isParish, setIsParish] = useState(false);


    // Handle Search Click
    const searchClick = async () => {
        setIsLoading(true);
        if(registeredStudents?.map((s:any) => s?.student?.reg_no)?.includes(search)){
            const student = await fetchStudentByRegNo({reg_no:search});
            setUpdateStudent({
                id:'',
                isDeleteClicked:false,
        
                // Student
                student:{
                    // Admission data
                    section:'',
                    adm_no:'',
                    pen_no:'',
                    par_id:'',
                    roll_no:'',
                    bill_no:'',
                    is_university:false,
                    re_adm_no:'',
                    is_minority:false,
                    is_disability:false,
                    dis_disc:'',
                    is_new:false,
                    is_active:false,
                    reason:'',
                    is_only_child:false,
                    student_status:'',
                    house:'',
                    doa:new Date(),
                    doj:new Date(),
                    admitted_class:'',
                    // 1
                    image:'',
                    // 2
                    class:'',
                    board:'',
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
                    locality:'',
                    email:'',
                    city:'',
                    mobile:0,
                    state:'',
                    pin_code:0,
                    aadhar_card_no:0,
                    whats_app_no:0,
                    religion:'',
                    parish:'',
                    caste:'',
                    category:'',
                    blood_group:'',
                    cadet_type:'',
                    club:'',
                    is_ews:false,
                    is_rte:false,
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
                        distance_from_home:'',
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
                            result:''
                        },
                        {
                            school_name:'',
                            board:'',
                            passing_year:'',
                            total_marks:'',
                            percentage:'',
                            result:''
                        },
                        {
                            school_name:'',
                            board:'',
                            passing_year:'',
                            total_marks:'',
                            percentage:'',
                            result:''
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

                // Documents
                documents:[{
                    document_type:'',
                    document_name:''
                }]
            });
            setValuesFromRegister({
                // Student
                student:{
                    // 1
                    image:student?.student?.image || '',
                    // 2
                    class:student?.student?.class || '',
                    board:student?.student?.board || '',
                    name:student?.student?.name || '',
                    middle_name:student?.student?.middle_name || '',
                    last_name:student?.student?.last_name || '',
                    dob:student?.student?.dob || new Date(),
                    place_of_birth:student?.student?.place_of_birth || '',
                    gender:student?.student?.gender || 'Male',
                    contact_person_name:student?.student?.contact_person_name || '',
                    contact_person_mobile:student?.student?.contact_person_mobile || 0,
                    contact_person_email:student?.student?.contact_person_email || '',
                    secondary_contact_no:student?.student?.secondary_contact_no || 0,
                    h_no_and_streets:student?.student?.h_no_and_streets || '',
                    email:student?.student?.email || '',
                    city:student?.student?.city || '',
                    mobile:student?.student?.mobile || 0,
                    state:student?.student?.state || '',
                    pin_code:student?.student?.pin_code || 0,
                    aadhar_card_no:student?.student?.aadhar_card_no || 0,
                    religion:student?.student?.religion || '',
                    caste:student?.student?.caste || '',
                    category:student?.student?.category || '',
                    blood_group:student?.student?.blood_group || '',
                    is_ews:student?.student?.is_ews || false,
                    sibling:student?.student?.sibling || false,
                    transport:student?.student?.transport || '',
                    nationality:student?.student?.nationality || '',
                },

                // Parents
                parents:{
                    // Father
                    father:{
                        father_name:student?.parents?.father?.father_name || '',
                        middle_name:student?.parents?.father?.middle_name || '',
                        last_name:student?.parents?.father?.last_name || '',
                        profession:student?.parents?.father?.profession || '',
                        designation:student?.parents?.father?.designation || '',
                        residence_address:student?.parents?.father?.residence_address || '',
                        office_address:student?.parents?.father?.office_address || '',
                        email:student?.parents?.father?.email || '',
                        alternate_email:student?.parents?.father?.alternate_email || '',
                        dob:student?.parents?.father?.dob || new Date(),
                        mobile:student?.parents?.father?.mobile || 0,
                        phone:student?.parents?.father?.phone || 0,
                        company_name:student?.parents?.father?.company_name || '',
                        business_details:student?.parents?.father?.business_details || '',
                        qualification:student?.parents?.father?.qualification || '',
                        service_in:student?.parents?.father?.service_in || '',
                        office_phone:student?.parents?.father?.office_phone || 0,
                        office_mobile:student?.parents?.father?.office_mobile || 0,
                        office_extension:student?.parents?.father?.office_extension || '',
                        office_email:student?.parents?.father?.office_email || '',
                        office_website:student?.parents?.father?.office_website || '',
                        annual_income:student?.parents?.father?.annual_income || '',
                        parent_status:student?.parents?.father?.parent_status || '',
                    },
                    // Mother
                    mother:{
                        mother_name:student?.parents?.mother?.mother_name || '',
                        middle_name:student?.parents?.mother?.middle_name || '',
                        last_name:student?.parents?.mother?.last_name || '',
                        profession:student?.parents?.mother?.profession || '',
                        designation:student?.parents?.mother?.designation || '',
                        residence_address:student?.parents?.mother?.residence_address || '',
                        office_address:student?.parents?.mother?.office_address || '',
                        email:student?.parents?.mother?.email || '',
                        alternate_email:student?.parents?.mother?.alternate_email || '',
                        dob:student?.parents?.mother?.dob || new Date(),
                        mobile:student?.parents?.mother?.mobile || 0,
                        phone:student?.parents?.mother?.phone || 0,
                        company_name:student?.parents?.mother?.company_name || '',
                        business_details:student?.parents?.mother?.business_details || '',
                        qualification:student?.parents?.mother?.qualification || '',
                        service_in:student?.parents?.mother?.service_in || '',
                        office_phone:student?.parents?.mother?.office_phone || 0,
                        office_mobile:student?.parents?.mother?.office_mobile || 0,
                        office_extension:student?.parents?.mother?.office_extension || '',
                        office_email:student?.parents?.mother?.office_email || '',
                        office_website:student?.parents?.mother?.office_website || '',
                        annual_income:student?.parents?.mother?.annual_income || '',
                        anniversary_date:student?.parents?.mother?.anniversary_date || new Date()
                    }
                },

                // Other details
                others:{
                    // 1
                    student_other_details:{
                        medical_history:student?.others?.student_other_details?.medical_history || '',
                        descriptions:student?.others?.student_other_details?.descriptions || '',
                        allergies:student?.others?.student_other_details?.allergies || '',
                        allergies_causes:student?.others?.student_other_details?.allergies_causes || '',
                        family_doctor_name:student?.others?.student_other_details?.family_doctor_name || '',
                        family_doctor_phone:student?.others?.student_other_details?.family_doctor_phone || 0,
                        family_doctor_address:student?.others?.student_other_details?.family_doctor_address || '',
                        distance_from_home:student?.others?.student_other_details?.distance_from_home || '',
                        no_of_living_year:student?.others?.student_other_details?.no_of_living_year || 0,
                        only_child:student?.others?.student_other_details?.only_child || '',
                        general_description:student?.others?.student_other_details?.general_description || ''
                    },
                    // 2
                    student_staff_relation:{
                        staff_ward:student?.others?.student_staff_relation?.staff_ward || '',
                        staff_name:student?.others?.student_staff_relation?.staff_name || ''
                    },
                    // 3
                    is_alumni:{
                        is_alumni:student?.others?.is_alumni?.is_alumni || false,
                        academic_session:student?.others?.is_alumni?.academic_session || '',
                        class_name:student?.others?.is_alumni?.class_name || '',
                        admission_number:student?.others?.is_alumni?.admission_number || 0,
                    },
                    // 4
                    previous_school_details:[
                        {
                            school_name:student?.others?.previous_school_details[0]?.school_name || '',
                            board:student?.others?.previous_school_details[0]?.board || '',
                            passing_year:student?.others?.previous_school_details[0]?.passing_year || '',
                            total_marks:student?.others?.previous_school_details[0]?.total_marks || '',
                            percentage:student?.others?.previous_school_details[0]?.percentage || '',
                            result:student?.others?.previous_school_details[0]?.result || ''
                        },
                        {
                            school_name:student?.others?.previous_school_details[1]?.school_name || '',
                            board:student?.others?.previous_school_details[1]?.board || '',
                            passing_year:student?.others?.previous_school_details[1]?.passing_year || '',
                            total_marks:student?.others?.previous_school_details[1]?.total_marks || '',
                            percentage:student?.others?.previous_school_details[1]?.percentage || '',
                            result:student?.others?.previous_school_details[1]?.result || ''
                        },
                        {
                            school_name:student?.others?.previous_school_details[2]?.school_name || '',
                            board:student?.others?.previous_school_details[2]?.board || '',
                            passing_year:student?.others?.previous_school_details[2]?.passing_year || '',
                            total_marks:student?.others?.previous_school_details[2]?.total_marks || '',
                            percentage:student?.others?.previous_school_details[2]?.percentage || '',
                            result:student?.others?.previous_school_details[2]?.result || ''
                        }
                    ]
                },

                // Guardian details
                guardian_details:{
                    // 1
                    guardian_name:student?.guardian_details?.guardian_name || '',
                    profession:student?.guardian_details?.profession || '',
                    designation:student?.guardian_details?.designation || '',
                    company_name:student?.guardian_details?.company_name || '',
                    business_details:student?.guardian_details?.business_details || '',
                    qualification:student?.guardian_details?.qualification || '',
                    // 2
                    if_single_parent:{
                        student_lives_with:student?.guardian_details?.if_single_parent?.student_lives_with || '',
                        legal_custody_of_the_child:student?.guardian_details?.if_single_parent?.legal_custody_of_the_child || '',
                        correspondence_to:student?.guardian_details?.if_single_parent?.correspondence_to || '',
                        check_id_applicable:student?.guardian_details?.if_single_parent?.check_id_applicable || '',
                        separation_reason:student?.guardian_details?.if_single_parent?.separation_reason || ''
                    }
                }
            });
        }else{
            setIsViewOpened('register');
        }
        setSearch('');
        setIsLoading(false);
    };


    // Handle Search Click
    const admissionSearchClick = async () => {
        setIsLoading(true);
        if(students?.map((s:any) => s?.student?.adm_no)?.includes(search)){
            const student = await fetchStudentByAdmNo({adm_no:search});
            setValuesFromRegister({
                // Student
                student:{
                    // 1
                    image:'',
                    // 2
                    class:'',
                    board:'',
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
                    caste:'',
                    category:'',
                    blood_group:'',
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
                        distance_from_home:'',
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
                            result:''
                        },
                        {
                            school_name:'',
                            board:'',
                            passing_year:'',
                            total_marks:'',
                            percentage:'',
                            result:''
                        },
                        {
                            school_name:'',
                            board:'',
                            passing_year:'',
                            total_marks:'',
                            percentage:'',
                            result:''
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
                }
            });
            setUpdateStudent({
                id:student?.student?._id,
                isDeleteClicked:false,

                // Student
                student:{
                    // Admission data
                    section:student?.student?.section || '',
                    adm_no:student?.student?.adm_no || '',
                    pen_no:student?.student?.pen_no || '',
                    par_id:student?.student?.par_id || '',
                    roll_no:student?.student?.roll_no || '',
                    bill_no:student?.student?.bill_no || '',
                    is_university:student?.student?.is_university || false,
                    re_adm_no:student?.student?.re_adm_no || '',
                    is_minority:student?.student?.is_minority || false,
                    is_disability:student?.student?.is_disability || false,
                    dis_disc:student?.student?.dis_disc || '',
                    is_new:student?.student?.is_new || false,
                    is_active:student?.student?.is_active || false,
                    reason:student?.student?.reason || '',
                    is_only_child:student?.student?.is_only_child || false,
                    student_status:student?.student?.student_status || '',
                    house:student?.student?.house || '',
                    doa:student?.student?.doa || new Date(),
                    doj:student?.student?.doj || new Date(),
                    admitted_class:student?.student?.admitted_class || '',
                    whats_app_no:student?.student?.whats_app_no || 0,
                    is_rte:student?.student?.is_rte || false,
                    // 1
                    image:student?.student?.image || '',
                    // 2
                    stream:student?.student?.stream || '',
                    subjects:student?.student?.subjects || [''],
                    optional_subject:student?.student?.optional_subject || '',
                    class:student?.student?.class || '',
                    board:student?.student?.board || '',
                    name:student?.student?.name || '',
                    middle_name:student?.student?.middle_name || '',
                    last_name:student?.student?.last_name || '',
                    dob:student?.student?.dob || new Date(),
                    place_of_birth:student?.student?.place_of_birth || '',
                    gender:student?.student?.gender || 'Male',
                    contact_person_name:student?.student?.contact_person_name || '',
                    contact_person_mobile:student?.student?.contact_person_mobile || 0,
                    contact_person_email:student?.student?.contact_person_email || '',
                    secondary_contact_no:student?.student?.secondary_contact_no || 0,
                    h_no_and_streets:student?.student?.h_no_and_streets || '',
                    locality:student?.student?.locality || '',
                    email:student?.student?.email || '',
                    city:student?.student?.city || '',
                    mobile:student?.student?.mobile || 0,
                    state:student?.student?.state || '',
                    pin_code:student?.student?.pin_code || 0,
                    aadhar_card_no:student?.student?.aadhar_card_no || 0,
                    religion:student?.student?.religion || '',
                    parish:student?.student?.parish || '',
                    caste:student?.student?.caste || '',
                    category:student?.student?.category || '',
                    blood_group:student?.student?.blood_group || '',
                    cadet_type:student?.student?.cadet_type || '',
                    club:student?.student?.club || '',
                    is_ews:student?.student?.is_ews || false,
                    sibling:student?.student?.sibling || false,
                    transport:student?.student?.transport || '',
                    nationality:student?.student?.nationality || '',
                },

                // Parents
                parents:{
                    // Father
                    father:{
                        father_name:student?.parents?.father?.father_name || '',
                        middle_name:student?.parents?.father?.middle_name || '',
                        last_name:student?.parents?.father?.last_name || '',
                        profession:student?.parents?.father?.profession || '',
                        designation:student?.parents?.father?.designation || '',
                        residence_address:student?.parents?.father?.residence_address || '',
                        office_address:student?.parents?.father?.office_address || '',
                        email:student?.parents?.father?.email || '',
                        alternate_email:student?.parents?.father?.alternate_email || '',
                        dob:student?.parents?.father?.dob || new Date(),
                        mobile:student?.parents?.father?.mobile || 0,
                        phone:student?.parents?.father?.phone || 0,
                        company_name:student?.parents?.father?.company_name || '',
                        business_details:student?.parents?.father?.business_details || '',
                        qualification:student?.parents?.father?.qualification || '',
                        service_in:student?.parents?.father?.service_in || '',
                        office_phone:student?.parents?.father?.office_phone || 0,
                        office_mobile:student?.parents?.father?.office_mobile || 0,
                        office_extension:student?.parents?.father?.office_extension || '',
                        office_email:student?.parents?.father?.office_email || '',
                        office_website:student?.parents?.father?.office_website || '',
                        annual_income:student?.parents?.father?.annual_income || '',
                        parent_status:student?.parents?.father?.parent_status || '',
                    },
                    // Mother
                    mother:{
                        mother_name:student?.parents?.mother?.mother_name || '',
                        middle_name:student?.parents?.mother?.middle_name || '',
                        last_name:student?.parents?.mother?.last_name || '',
                        profession:student?.parents?.mother?.profession || '',
                        designation:student?.parents?.mother?.designation || '',
                        residence_address:student?.parents?.mother?.residence_address || '',
                        office_address:student?.parents?.mother?.office_address || '',
                        email:student?.parents?.mother?.email || '',
                        alternate_email:student?.parents?.mother?.alternate_email || '',
                        dob:student?.parents?.mother?.dob || new Date(),
                        mobile:student?.parents?.mother?.mobile || 0,
                        phone:student?.parents?.mother?.phone || 0,
                        company_name:student?.parents?.mother?.company_name || '',
                        business_details:student?.parents?.mother?.business_details || '',
                        qualification:student?.parents?.mother?.qualification || '',
                        service_in:student?.parents?.mother?.service_in || '',
                        office_phone:student?.parents?.mother?.office_phone || 0,
                        office_mobile:student?.parents?.mother?.office_mobile || 0,
                        office_extension:student?.parents?.mother?.office_extension || '',
                        office_email:student?.parents?.mother?.office_email || '',
                        office_website:student?.parents?.mother?.office_website || '',
                        annual_income:student?.parents?.mother?.annual_income || '',
                        anniversary_date:student?.parents?.mother?.anniversary_date || new Date()
                    }
                },

                // Other details
                others:{
                    // 1
                    student_other_details:{
                        medical_history:student?.others?.student_other_details?.medical_history || '',
                        descriptions:student?.others?.student_other_details?.descriptions || '',
                        allergies:student?.others?.student_other_details?.allergies || '',
                        allergies_causes:student?.others?.student_other_details?.allergies_causes || '',
                        family_doctor_name:student?.others?.student_other_details?.family_doctor_name || '',
                        family_doctor_phone:student?.others?.student_other_details?.family_doctor_phone || 0,
                        family_doctor_address:student?.others?.student_other_details?.family_doctor_address || '',
                        distance_from_home:student?.others?.student_other_details?.distance_from_home || '',
                        no_of_living_year:student?.others?.student_other_details?.no_of_living_year || 0,
                        only_child:student?.others?.student_other_details?.only_child || '',
                        general_description:student?.others?.student_other_details?.general_description || ''
                    },
                    // 2
                    student_staff_relation:{
                        staff_ward:student?.others?.student_staff_relation?.staff_ward || '',
                        staff_name:student?.others?.student_staff_relation?.staff_name || ''
                    },
                    // 3
                    is_alumni:{
                        is_alumni:student?.others?.is_alumni?.is_alumni || false,
                        academic_session:student?.others?.is_alumni?.academic_session || '',
                        class_name:student?.others?.is_alumni?.class_name || '',
                        admission_number:student?.others?.is_alumni?.admission_number || 0,
                    },
                    // 4
                    previous_school_details:[
                        {
                            school_name:student?.others?.previous_school_details[0]?.school_name || '',
                            board:student?.others?.previous_school_details[0]?.board || '',
                            passing_year:student?.others?.previous_school_details[0]?.passing_year || '',
                            total_marks:student?.others?.previous_school_details[0]?.total_marks || '',
                            percentage:student?.others?.previous_school_details[0]?.percentage || '',
                            result:student?.others?.previous_school_details[0]?.result || ''
                        },
                        {
                            school_name:student?.others?.previous_school_details[1]?.school_name || '',
                            board:student?.others?.previous_school_details[1]?.board || '',
                            passing_year:student?.others?.previous_school_details[1]?.passing_year || '',
                            total_marks:student?.others?.previous_school_details[1]?.total_marks || '',
                            percentage:student?.others?.previous_school_details[1]?.percentage || '',
                            result:student?.others?.previous_school_details[1]?.result || ''
                        },
                        {
                            school_name:student?.others?.previous_school_details[2]?.school_name || '',
                            board:student?.others?.previous_school_details[2]?.board || '',
                            passing_year:student?.others?.previous_school_details[2]?.passing_year || '',
                            total_marks:student?.others?.previous_school_details[2]?.total_marks || '',
                            percentage:student?.others?.previous_school_details[2]?.percentage || '',
                            result:student?.others?.previous_school_details[2]?.result || ''
                        }
                    ]
                },

                // Guardian details
                guardian_details:{
                    // 1
                    guardian_name:student?.guardian_details?.guardian_name || '',
                    profession:student?.guardian_details?.profession || '',
                    designation:student?.guardian_details?.designation || '',
                    company_name:student?.guardian_details?.company_name || '',
                    business_details:student?.guardian_details?.business_details || '',
                    qualification:student?.guardian_details?.qualification || '',
                    // 2
                    if_single_parent:{
                        student_lives_with:student?.guardian_details?.if_single_parent?.student_lives_with || '',
                        legal_custody_of_the_child:student?.guardian_details?.if_single_parent?.legal_custody_of_the_child || '',
                        correspondence_to:student?.guardian_details?.if_single_parent?.correspondence_to || '',
                        check_id_applicable:student?.guardian_details?.if_single_parent?.check_id_applicable || '',
                        separation_reason:student?.guardian_details?.if_single_parent?.separation_reason || ''
                    }
                },

                // Documents
                documents:student?.documents || [{
                    document_type:'',
                    document_name:''
                }]
            });
            setSelectedSubjects(student?.student?.subjects);
            setSelectedDocuments(student?.documents);
        }else{
            setIsViewOpened('admission');
        }
        setSearch('');
        setIsLoading(false);
    };


    // Student search click
    const studentSearchClick = (student:any) => {
        setIsLoading(true);
        setValuesFromRegister({
            // Student
            student:{
                // 1
                image:'',
                // 2
                class:'',
                board:'',
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
                caste:'',
                category:'',
                blood_group:'',
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
                    distance_from_home:'',
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
                        result:''
                    },
                    {
                        school_name:'',
                        board:'',
                        passing_year:'',
                        total_marks:'',
                        percentage:'',
                        result:''
                    },
                    {
                        school_name:'',
                        board:'',
                        passing_year:'',
                        total_marks:'',
                        percentage:'',
                        result:''
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
            }
        });
        setUpdateStudent({
            id:student?._id,
            isDeleteClicked:false,

            // Student
            student:{
                // Admission data
                section:student?.student?.section || '',
                adm_no:student?.student?.adm_no || '',
                pen_no:student?.student?.pen_no || '',
                par_id:student?.student?.par_id || '',
                roll_no:student?.student?.roll_no || '',
                bill_no:student?.student?.bill_no || '',
                is_university:student?.student?.is_university || false,
                re_adm_no:student?.student?.re_adm_no || '',
                is_minority:student?.student?.is_minority || false,
                is_disability:student?.student?.is_disability || false,
                dis_disc:student?.student?.dis_disc || '',
                is_new:student?.student?.is_new || false,
                is_active:student?.student?.is_active || false,
                reason:student?.student?.reason || '',
                is_only_child:student?.student?.is_only_child || false,
                student_status:student?.student?.student_status || '',
                house:student?.student?.house || '',
                doa:student?.student?.doa || new Date(),
                doj:student?.student?.doj || new Date(),
                admitted_class:student?.student?.admitted_class || '',
                whats_app_no:student?.student?.whats_app_no || 0,
                is_rte:student?.student?.is_rte || false,
                // 1
                image:student?.student?.image || '',
                // 2
                stream:student?.student?.stream || '',
                subjects:student?.student?.subjects || [''],
                optional_subject:student?.student?.optional_subject || '',
                class:student?.student?.class || '',
                board:student?.student?.board || '',
                name:student?.student?.name || '',
                middle_name:student?.student?.middle_name || '',
                last_name:student?.student?.last_name || '',
                dob:student?.student?.dob || new Date(),
                place_of_birth:student?.student?.place_of_birth || '',
                gender:student?.student?.gender || 'Male',
                contact_person_name:student?.student?.contact_person_name || '',
                contact_person_mobile:student?.student?.contact_person_mobile || 0,
                contact_person_email:student?.student?.contact_person_email || '',
                secondary_contact_no:student?.student?.secondary_contact_no || 0,
                h_no_and_streets:student?.student?.h_no_and_streets || '',
                locality:student?.student?.locality || '',
                email:student?.student?.email || '',
                city:student?.student?.city || '',
                mobile:student?.student?.mobile || 0,
                state:student?.student?.state || '',
                pin_code:student?.student?.pin_code || 0,
                aadhar_card_no:student?.student?.aadhar_card_no || 0,
                religion:student?.student?.religion || '',
                parish:student?.student?.parish || '',
                caste:student?.student?.caste || '',
                category:student?.student?.category || '',
                blood_group:student?.student?.blood_group || '',
                cadet_type:student?.student?.cadet_type || '',
                club:student?.student?.club || '',
                is_ews:student?.student?.is_ews || false,
                sibling:student?.student?.sibling || false,
                transport:student?.student?.transport || '',
                nationality:student?.student?.nationality || '',
            },

            // Parents
            parents:{
                // Father
                father:{
                    father_name:student?.parents?.father?.father_name || '',
                    middle_name:student?.parents?.father?.middle_name || '',
                    last_name:student?.parents?.father?.last_name || '',
                    profession:student?.parents?.father?.profession || '',
                    designation:student?.parents?.father?.designation || '',
                    residence_address:student?.parents?.father?.residence_address || '',
                    office_address:student?.parents?.father?.office_address || '',
                    email:student?.parents?.father?.email || '',
                    alternate_email:student?.parents?.father?.alternate_email || '',
                    dob:student?.parents?.father?.dob || new Date(),
                    mobile:student?.parents?.father?.mobile || 0,
                    phone:student?.parents?.father?.phone || 0,
                    company_name:student?.parents?.father?.company_name || '',
                    business_details:student?.parents?.father?.business_details || '',
                    qualification:student?.parents?.father?.qualification || '',
                    service_in:student?.parents?.father?.service_in || '',
                    office_phone:student?.parents?.father?.office_phone || 0,
                    office_mobile:student?.parents?.father?.office_mobile || 0,
                    office_extension:student?.parents?.father?.office_extension || '',
                    office_email:student?.parents?.father?.office_email || '',
                    office_website:student?.parents?.father?.office_website || '',
                    annual_income:student?.parents?.father?.annual_income || '',
                    parent_status:student?.parents?.father?.parent_status || '',
                },
                // Mother
                mother:{
                    mother_name:student?.parents?.mother?.mother_name || '',
                    middle_name:student?.parents?.mother?.middle_name || '',
                    last_name:student?.parents?.mother?.last_name || '',
                    profession:student?.parents?.mother?.profession || '',
                    designation:student?.parents?.mother?.designation || '',
                    residence_address:student?.parents?.mother?.residence_address || '',
                    office_address:student?.parents?.mother?.office_address || '',
                    email:student?.parents?.mother?.email || '',
                    alternate_email:student?.parents?.mother?.alternate_email || '',
                    dob:student?.parents?.mother?.dob || new Date(),
                    mobile:student?.parents?.mother?.mobile || 0,
                    phone:student?.parents?.mother?.phone || 0,
                    company_name:student?.parents?.mother?.company_name || '',
                    business_details:student?.parents?.mother?.business_details || '',
                    qualification:student?.parents?.mother?.qualification || '',
                    service_in:student?.parents?.mother?.service_in || '',
                    office_phone:student?.parents?.mother?.office_phone || 0,
                    office_mobile:student?.parents?.mother?.office_mobile || 0,
                    office_extension:student?.parents?.mother?.office_extension || '',
                    office_email:student?.parents?.mother?.office_email || '',
                    office_website:student?.parents?.mother?.office_website || '',
                    annual_income:student?.parents?.mother?.annual_income || '',
                    anniversary_date:student?.parents?.mother?.anniversary_date || new Date()
                }
            },

            // Other details
            others:{
                // 1
                student_other_details:{
                    medical_history:student?.others?.student_other_details?.medical_history || '',
                    descriptions:student?.others?.student_other_details?.descriptions || '',
                    allergies:student?.others?.student_other_details?.allergies || '',
                    allergies_causes:student?.others?.student_other_details?.allergies_causes || '',
                    family_doctor_name:student?.others?.student_other_details?.family_doctor_name || '',
                    family_doctor_phone:student?.others?.student_other_details?.family_doctor_phone || 0,
                    family_doctor_address:student?.others?.student_other_details?.family_doctor_address || '',
                    distance_from_home:student?.others?.student_other_details?.distance_from_home || '',
                    no_of_living_year:student?.others?.student_other_details?.no_of_living_year || 0,
                    only_child:student?.others?.student_other_details?.only_child || '',
                    general_description:student?.others?.student_other_details?.general_description || ''
                },
                // 2
                student_staff_relation:{
                    staff_ward:student?.others?.student_staff_relation?.staff_ward || '',
                    staff_name:student?.others?.student_staff_relation?.staff_name || ''
                },
                // 3
                is_alumni:{
                    is_alumni:student?.others?.is_alumni?.is_alumni || false,
                    academic_session:student?.others?.is_alumni?.academic_session || '',
                    class_name:student?.others?.is_alumni?.class_name || '',
                    admission_number:student?.others?.is_alumni?.admission_number || 0,
                },
                // 4
                previous_school_details:[
                    {
                        school_name:student?.others?.previous_school_details[0]?.school_name || '',
                        board:student?.others?.previous_school_details[0]?.board || '',
                        passing_year:student?.others?.previous_school_details[0]?.passing_year || '',
                        total_marks:student?.others?.previous_school_details[0]?.total_marks || '',
                        percentage:student?.others?.previous_school_details[0]?.percentage || '',
                        result:student?.others?.previous_school_details[0]?.result || ''
                    },
                    {
                        school_name:student?.others?.previous_school_details[1]?.school_name || '',
                        board:student?.others?.previous_school_details[1]?.board || '',
                        passing_year:student?.others?.previous_school_details[1]?.passing_year || '',
                        total_marks:student?.others?.previous_school_details[1]?.total_marks || '',
                        percentage:student?.others?.previous_school_details[1]?.percentage || '',
                        result:student?.others?.previous_school_details[1]?.result || ''
                    },
                    {
                        school_name:student?.others?.previous_school_details[2]?.school_name || '',
                        board:student?.others?.previous_school_details[2]?.board || '',
                        passing_year:student?.others?.previous_school_details[2]?.passing_year || '',
                        total_marks:student?.others?.previous_school_details[2]?.total_marks || '',
                        percentage:student?.others?.previous_school_details[2]?.percentage || '',
                        result:student?.others?.previous_school_details[2]?.result || ''
                    }
                ]
            },

            // Guardian details
            guardian_details:{
                // 1
                guardian_name:student?.guardian_details?.guardian_name || '',
                profession:student?.guardian_details?.profession || '',
                designation:student?.guardian_details?.designation || '',
                company_name:student?.guardian_details?.company_name || '',
                business_details:student?.guardian_details?.business_details || '',
                qualification:student?.guardian_details?.qualification || '',
                // 2
                if_single_parent:{
                    student_lives_with:student?.guardian_details?.if_single_parent?.student_lives_with || '',
                    legal_custody_of_the_child:student?.guardian_details?.if_single_parent?.legal_custody_of_the_child || '',
                    correspondence_to:student?.guardian_details?.if_single_parent?.correspondence_to || '',
                    check_id_applicable:student?.guardian_details?.if_single_parent?.check_id_applicable || '',
                    separation_reason:student?.guardian_details?.if_single_parent?.separation_reason || ''
                }
            },

            // Documents
            documents:student?.documents || [{
                document_type:'',
                document_name:''
            }]
        });
        setSelectedSubjects(student?.student?.subjects);
        setSelectedDocuments(student?.documents);
        setSearch('');
        setIsLoading(false);
    };


    // Searched Students
    const searchedStudents = (
        <div
            className={`z-10 flex-col absolute w-[120%] h-auto mt-2 max-h-[300px] top-[100%] left-0 bg-[#fff] rounded-[5px] border-[0.5px] border-[#E4E4E4] overflow-y-scroll custom-sidebar-scrollbar ${
            // @ts-ignore
            search !== '' ? 'flex' : 'hidden'}`}
        >

            {isLoadingSearchedStudents ? (
                <LoadingIcon />
            ) : searchStudents.length < 1 ? (
                <p className=' text-xs pl-2 text-hash-color'>No students found</p>
            ) : searchStudents.map(((s:any) => (
                <div
                    onClick={() => studentSearchClick(s)}
                    className='flex flex-row gap-4 cursor-pointer transition hover:bg-[#E4E4E4]'
                >
                    <div>
                        <div className='ml-4 mt-2 rounded-[4px] border-[0.5px] border-[#E4E4E4] h-[75px] w-[75px]'>
                            {s?.student?.image && (
                                <Image
                                    src={s?.student?.image}
                                    alt='Student image'
                                    height={75}
                                    width={75}
                                    className='rounded-[4px] h-full'
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col py-2 text-[10px] text-hash-color gap-[2px]'>
                        <p className='font-semibold'>Student's Name - {s?.student?.name}</p>
                        <p className='mt-1'>Father's Name - {s?.parents?.father?.father_name}</p>
                        <p>Admission No. - {s?.student?.adm_no}</p>
                        <p>Class - {s?.student?.class}</p>
                    </div>
                </div>
            )))}


        </div>
    );


    // Use effects
    useEffect(() => {
        const fetcher = async () => {

            // Fetching data
            const dropdownData = localStorage.getItem('admissionDropdownData') ? JSON.parse(localStorage.getItem('admissionDropdownData')) : [];
            if(dropdownData.length === 0){

                // Admission states
                const admissionStates = await fetchAdmissionStates();
                
                
                // Classes
                setClassesState({...classesState, isLoading:true});
                const classesRes = await fetchClassesNames();
                setClassesState({isLoading:false, items:classesRes});
                
                
                // Boards
                setBoardsState({...boardsState, isLoading:true});
                const boardsRes = await fetchBoards();
                setBoardsState({isLoading:false, items:boardsRes});
                // @ts-ignore
                form.setValue('student.board', boardsRes?.find((b:any) => b.is_default)?.board);
                
                
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


                // Sections
                setSectionsState({...sectionsState, isLoading:true});
                const sectionsRes = await fetchSectionsNames();
                setSectionsState({isLoading:false, items:sectionsRes});
                
                
                // Parishes
                setParishesState({...parishesState, isLoading:true});
                const parishesRes = await fetchParishesNames();
                setParishesState({isLoading:false, items:parishesRes});
                
                
                // Cadet types
                setCadetTypesState({...cadetTypesState, isLoading:true});
                const cadetTypesRes = await fetchCadetTypesNames();
                setCadetTypesState({isLoading:false, items:cadetTypesRes});
                
                
                // Clubs
                setClubsState({...clubsState, isLoading:true});
                const clubsRes = await fetchClubsNames();
                setClubsState({isLoading:false, items:clubsRes});
                
                
                // Houses
                setHousesState({...housesState, isLoading:true});
                const housesRes = await fetchHousesNames();
                setHousesState({isLoading:false, items:housesRes});


                // Creating new dropdown data and saving it to the local storage
                const newDropdownData = [
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
                    },
                    {
                        sections_last_updated_at:new Date(admissionStates?.sections_last_updated_at),
                        data:sectionsRes
                    },
                    {
                        perishes_last_updated_at:new Date(admissionStates?.perishes_last_updated_at),
                        data:parishesRes
                    },
                    {
                        cadet_types_last_updated_at:new Date(admissionStates?.cadet_types_last_updated_at),
                        data:cadetTypesRes
                    },
                    {
                        clubs_last_updated_at:new Date(admissionStates?.clubs_last_updated_at),
                        data:clubsRes
                    },
                    {
                        houses_last_updated_at:new Date(admissionStates?.houses_last_updated_at),
                        data:housesRes
                    }
                ];
                localStorage.setItem('admissionDropdownData', JSON.stringify(newDropdownData));

            }else{

                // Local storage values
                const localStorageData = dropdownData.reduce((acc:any, item:any) => {const [key, value] = Object.entries(item)[0];acc[key] = value;return acc;}, {});
                
                
                // Database values
                const lastUpdatedDates = await fetchAdmissionStates();
                const allDataBaseValues = Object.keys(lastUpdatedDates).filter(key => key.includes('last_updated_at')).reduce((acc, key) => {acc[key] = lastUpdatedDates[key];return acc}, {});
                const dataBaseValues = Object.fromEntries(Object.entries(allDataBaseValues).filter(([key]) => localStorageData.hasOwnProperty(key)));


                // Checking if the local storage is async with the databse
                if(deepEqual(localStorageData, dataBaseValues)){

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


                    // Sections
                    setSectionsState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('sections_last_updated_at')).data});


                    // Parish
                    setParishesState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('perishes_last_updated_at')).data});


                    // Cadet types
                    setCadetTypesState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('cadet_types_last_updated_at')).data});


                    // Clubs
                    setClubsState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('clubs_last_updated_at')).data});


                    // Houses
                    setHousesState({isLoading:false, items:dropdownData?.find((d:any) => Object.keys(d).includes('houses_last_updated_at')).data});

                }else{

                    // Admission states
                    const admissionStates = await fetchAdmissionStates();
                    
                    
                    // Classes
                    setClassesState({...classesState, isLoading:true});
                    const classesRes = await fetchClassesNames();
                    setClassesState({isLoading:false, items:classesRes});
                    
                    
                    // Boards
                    setBoardsState({...boardsState, isLoading:true});
                    const boardsRes = await fetchBoards();
                    setBoardsState({isLoading:false, items:boardsRes});
                    // @ts-ignore
                    form.setValue('student.board', boardsRes?.find((b:any) => b.is_default)?.board);
                    
                    
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


                    // Sections
                    setSectionsState({...sectionsState, isLoading:true});
                    const sectionsRes = await fetchSectionsNames();
                    setSectionsState({isLoading:false, items:sectionsRes});
                    
                    
                    // Parishes
                    setParishesState({...parishesState, isLoading:true});
                    const parishesRes = await fetchParishesNames();
                    setParishesState({isLoading:false, items:parishesRes});
                    
                    
                    // Cadet types
                    setCadetTypesState({...cadetTypesState, isLoading:true});
                    const cadetTypesRes = await fetchCadetTypesNames();
                    setCadetTypesState({isLoading:false, items:cadetTypesRes});
                    
                    
                    // Clubs
                    setClubsState({...clubsState, isLoading:true});
                    const clubsRes = await fetchClubsNames();
                    setClubsState({isLoading:false, items:clubsRes});
                    
                    
                    // Houses
                    setHousesState({...housesState, isLoading:true});
                    const housesRes = await fetchHousesNames();
                    setHousesState({isLoading:false, items:housesRes});


                    // Creating new dropdown data and saving it to the local storage
                    const newDropdownData = [
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
                        },
                        {
                            sections_last_updated_at:new Date(admissionStates?.sections_last_updated_at),
                            data:sectionsRes
                        },
                        {
                            perishes_last_updated_at:new Date(admissionStates?.perishes_last_updated_at),
                            data:parishesRes
                        },
                        {
                            cadet_types_last_updated_at:new Date(admissionStates?.cadet_types_last_updated_at),
                            data:cadetTypesRes
                        },
                        {
                            clubs_last_updated_at:new Date(admissionStates?.clubs_last_updated_at),
                            data:clubsRes
                        },
                        {
                            houses_last_updated_at:new Date(admissionStates?.houses_last_updated_at),
                            data:housesRes
                        }
                    ];
                    localStorage.setItem('admissionDropdownData', JSON.stringify(newDropdownData));

                };

            };

        };
        fetcher();
    }, []);
    useEffect(() => {
        const numberGenerator = async () => {
            try {
                const allStudentsCount = await fetchAllStudentsCount();
                let substringValue;
                if(allStudentsCount < 9){
                    substringValue = 0;
                }else if(allStudentsCount >= 9){
                    substringValue = 1;
                }else if(allStudentsCount >= 99){
                    substringValue = 2;
                }else if(allStudentsCount >= 999){
                    substringValue = 3;
                }else if(allStudentsCount >= 9999){
                    substringValue = 4;
                }else if(allStudentsCount >= 99999){
                    substringValue = 5;
                }else if(allStudentsCount >= 999999){
                    substringValue = 6;
                };
                if(form.getValues().student.class !== '' && updateStudent.id === ''){
                    const admissionNumbers = await fetchClassNumbers({class_name:'All Classes'});
                    // const admissionNumbers = localStorage.getItem('all_classes') === 'true'
                    //     ? await fetchClassNumbers({class_name:'All Classes'})
                    //     : await fetchClassNumbers({class_name:form.getValues().student.class});
                    // @ts-ignore
                    const admissionEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Admission No.')[0];
                    
                    if(admissionEntity && admissionEntity?.should_be === 'Automatic'){
                        form.setValue('student.adm_no', `${admissionEntity?.prefix}${admissionEntity?.lead_zero.substring(substringValue, admissionEntity?.lead_zero?.length - 1)}${allStudentsCount + 1}${admissionEntity?.suffix}`);
                    }else{
                        form.setValue('student.adm_no', '');
                    };
                };
                if(updateStudent.id !== '' && form.getValues().student.class !== updateStudent.student.class){
                    const admissionNumbers = await fetchClassNumbers({class_name:'All Classes'});
                    // const admissionNumbers = localStorage.getItem('all_classes') === 'true'
                    //     ? await fetchClassNumbers({class_name:'All Classes'})
                    //     : await fetchClassNumbers({class_name:form.getValues().student.class});
                    // @ts-ignore
                    const admissionEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Admission No.')[0];
                    
                    if(admissionEntity && admissionEntity?.should_be === 'Automatic'){
                        form.setValue('student.adm_no', `${admissionEntity?.prefix}${admissionEntity?.lead_zero.substring(substringValue, admissionEntity?.lead_zero?.length - 1)}${allStudentsCount + 1}${admissionEntity?.suffix}`);
                    }else{
                        form.setValue('student.adm_no', '');
                    };
                };
            } catch (err:any) {
                console.log(err);
            }
        };
        if(updateStudent.id === ''){
            numberGenerator();
        };
    }, [form.watch('student.class')]);
    useEffect(() => {
        if(search !== ''){
            setIsLoadingSearchedStudents(true);
            const searchFetcher = async () => {
                // ts-ignore
                const res = await fetchStudentsByAllData({name:search, father_name:search, adm_no:search, mobile:search, class_name:selectedClass, section_name:selectedSection});
                setSearchStudents(res);
                setIsLoadingSearchedStudents(false);
            };
            searchFetcher();
        }else{
            setSearchStudents([]);
        }
    }, [search]);
    useEffect(() => {
        if(form.getValues().student.class !== ''){
            const fetcher = async () => {
                const res = await fetchClass({class_name:form.getValues().student.class});
                setClassSections(res.sections);
            };
            fetcher();
        }else{
            setClassSections([]);
        }
    }, [form.watch('student.class')]);
    useEffect(() => {
        if(form.getValues().student.religion.toLowerCase().includes('christ')){
            setIsParish(true);
        }else{
            setIsParish(false);
        }
    }, [form.watch('student.religion')]);
    useEffect(() => {
        if(dob){
            // @ts-ignore
            form.setValue('student.dob', dob._d);
        };
    }, [dob]);
    useEffect(() => {
        if(doa){
            // @ts-ignore
            form.setValue('student.doa', doa._d);
        };
    }, [doa]);
    useEffect(() => {
        if(doj){
            // @ts-ignore
            form.setValue('student.doj', doj._d);
        };
    }, [doj]);
    useEffect(() => {
        // @ts-ignore
        form.setValue('student.board', boardsState.items?.find((b:any) => b.is_default)?.board);
    }, [boardsState]);

    return (
        <div className='flex flex-col'>
            {/* Search */}
            <div className='flex flex-col p-2 ml-2 border-[0.5px] border-[#ccc] bg-[#F7F7F7] gap-2 rounded-[5px] text-xs text-hash-color lg:flex-row lg:items-end'>
                <div className='flex-1 flex flex-row gap-2'>
                    {/* Class */}
                    <div className='w-full flex flex-col items-center'>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                <FormControl>
                                    <Select
                                        onValueChange={(v:any) => setSelectedClass(v)}
                                        onOpenChange={async () => {
                                            // setClassesState({...classesState, isLoading:true});
                                            // const classesRes = await fetchClassesNames();
                                            // setClassesState({isLoading:false, items:classesRes});
                                        }}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Select Class' className='text-[12px]' />
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
                                <FormMessage className='absolute left-0 top-[60%] text-[12px]'/>
                            </FormItem>
                        </div>
                    </div>
                    {/* Section */}
                    <div className='w-full flex flex-col items-center'>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                <FormControl>
                                    <Select
                                        onValueChange={(v:any) => setSelectedSection(v)}
                                        onOpenChange={async () => {
                                            // setSectionsState({...sectionsState, isLoading:true});
                                            // const classesRes = await fetchSectionsNames();
                                            // setSectionsState({isLoading:false, items:classesRes});
                                        }}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Select Section' className='text-[12px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                sectionsState.items?.length < 1 ? (
                                                    <p>No sections</p>
                                                ) : // @ts-ignore
                                                !sectionsState.items[0]?.section_name ? (
                                                    <LoadingIcon />
                                                ) : sectionsState.items?.map((item:any) => (
                                                    <SelectItem value={item?.section_name} key={item?._id}>{item?.section_name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className='absolute left-0 top-[60%] text-[12px]'/>
                            </FormItem>
                        </div>
                    </div>
                </div>
                <div className='flex-1 flex flex-col h-8 sm:flex-row'>
                    {/* Search input */}
                    <div className='relative flex h-full flex-row justify-center min-w-[200px] max-w-[600px] w-[100%] bg-white rounded-[5px] border-[0.5px] border-[#E4E4E4]'>
                        <Input
                            value={search}
                            onChange={(e:any) => setSearch(e?.target?.value)}
                            className='h-full border-[0] text-xs placeholder:text-xs'
                            placeholder='Search student'
                        />
                        <div
                            onClick={admissionSearchClick}
                            className='group flex flex-row items-center justify-center gap-[2px] px-2 border-[0.5px] border-[#2EABE5] rounded-r-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5]'
                        >
                            <Search size={15} className='text-[#2EABE5] transition group-hover:text-white'/>
                            <p className='transition text-[#2EABE5] group-hover:text-white'>Search</p>
                        </div>
                        {searchedStudents}
                    </div>
                    <div
                        onClick={searchClick}
                        className='group w-[200px] h-6 mt-2 flex flex-row items-center justify-center gap-[2px] ml-2 px-2 border-[0.5px] border-[#2EABE5] bg-white rounded-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5] sm:h-auto sm:w-[250px] sm:mt-0'
                    >
                        <p className='transition text-[#2EABE5] group-hover:text-white'>Search For Admission</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-row mt-4'>
                <div className='basis-[30%] flex flex-col gap-2 border-[0.5px] border-[#ccc] pr-[4px] rounded-[5px]'>





                    {/* Image */}
                    <StudentImage
                        setFile={setFile}
                        imageSrc={imageSrc}
                        setImageSrc={setImageSrc}
                        updateStudent={updateStudent}
                        valuesFromRegister={valuesFromRegister}
                    />


                    {/* Class */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Class</FormLabel>
                        {classesState.isLoading ? (
                            <LoadingIcon />
                        ) : (
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                <FormField
                                    control={form?.control}
                                    name='student.class'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                    onOpenChange={async () => {
                                                        // setClassesState({...classesState, isLoading:true});
                                                        // const classesRes = await fetchClassesNames();
                                                        // setClassesState({isLoading:false, items:classesRes});
                                                    }}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue
                                                            // @ts-ignore
                                                            placeholder={'Please Select'} className='text-[12px]'
                                                        />
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
                                            <FormMessage className='absolute left-0 top-[60%] text-[12px]'/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>



                    {/* Section */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Section</FormLabel>
                        {sectionsState.isLoading ? (
                            <LoadingIcon />
                        ) : (
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                <FormField
                                    control={form?.control}
                                    name='student.section'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                    onOpenChange={async () => {
                                                        // setSectionsState({...sectionsState, isLoading:true});
                                                        // const res = await fetchSectionsNames();
                                                        // setSectionsState({isLoading:false, items:res});
                                                    }}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[12px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            classSections.length > 0
                                                                ?
                                                                    classSections?.map((item:any) => (
                                                                        <SelectItem value={item} key={item}>{item}</SelectItem>
                                                                    ))
                                                                :
                                                                    sectionsState.items?.length < 1 ? (
                                                                        <p>No sections</p>
                                                                        // @ts-ignore
                                                                    ) : !sectionsState.items[0]?.section_name ? (
                                                                        <LoadingIcon />
                                                                    ) : sectionsState.items?.map((item:any) => (
                                                                        <SelectItem value={item?.section_name} key={item?._id}>{item?.section_name}</SelectItem>
                                                                    ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage className='absolute left-0 top-[60%] text-[12px]'/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>


                    {/* Board */}
                    <div className='w-full flex flex-col items-center lg:flex-row'>
                        <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Board</FormLabel>
                        {boardsState.isLoading ? (
                            <LoadingIcon />
                        ) : (
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                <FormField 
                                    control={form?.control}
                                    name='student.board'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-0 lg:mt-0'>
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
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[12px]' />
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


                    {/* Name */}
                    <FormField
                        control={form?.control}
                        name='student.name'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[12px]' />
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
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Middle Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[12px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Last Name */}
                    <FormField
                        control={form?.control}
                        name='student.last_name'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Last Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[12px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Adm. No. */}
                    <FormField
                        control={form?.control}
                        name='student.adm_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Adm. No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                disabled
                                                {...field}
                                                className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[12px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* PEN No. */}
                    <FormField
                        control={form?.control}
                        name='student.pen_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>UDISE/PEN No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[9px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[12px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* PAR ID */}
                    <FormField
                        control={form?.control}
                        name='student.par_id'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>PAR ID</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[9px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[12px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Roll No. */}
                    <FormField
                        control={form?.control}
                        name='student.roll_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Roll No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[9px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[12px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Bill No. */}
                    <FormField
                        control={form?.control}
                        name='student.bill_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Bill No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[9px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[12px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Is University */}
                    <FormField
                        control={form?.control}
                        name='student.is_university'
                        render={({field}) => (
                            <FormItem className='flex flex-row items-start justify-start lg:items-center lg:gap-2'>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-center space-x-2'>
                                            <Label htmlFor='is_university' className='text-[12px] text-hash-color'>
                                                Is University
                                            </Label>
                                            <Switch
                                                id='is_university'
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


                    {/* Re Admission No. */}
                    {form.getValues().student.is_university && (
                        <FormField
                            control={form?.control}
                            name='student.re_adm_no'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 lg:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Re Admission No.</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[9px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[12px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                    )}
                </div>











































                <div className='basis-[70%] flex-1 flex flex-col pr-2 gap-2'>
                    <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 pt-4 ml-2'>
                        <div className='flex-1 flex flex-col gap-4 lg:gap-2 lg:flex-row'>
                            {/* DOB */}
                            <FormField
                                control={form?.control}
                                name='student.dob'
                                render={() => (
                                    <FormItem className='relative w-full h-7 pb-[8px] flex flex-col items-start justify-center mt-2 lg:mt-0'>
                                        <FormLabel className='basis-auto h-2 pr-[4px] text-start text-[12px] text-[#726E71] lg:basis-[35%]'>DOB</FormLabel>
                                        <div className='w-full'>
                                            <MyDatePicker
                                                selectedDate={dob}
                                                setSelectedDate={setDob}
                                            />
                                        </div>
                                    </FormItem>
                                )}
                            />


                            {/* DOA */}
                            <FormField
                                control={form.control}
                                name='student.doa'
                                render={() => (
                                    <FormItem className='relative w-full h-7 pb-[8px] flex flex-col items-start justify-center mt-2 lg:mt-0'>
                                        <FormLabel className='basis-auto h-2 pr-[4px] text-start text-[12px] text-[#726E71] lg:basis-[35%]'>DOA</FormLabel>
                                        <div className='w-full'>
                                            <MyDatePicker
                                                selectedDate={doa}
                                                setSelectedDate={setDoa}
                                            />
                                        </div>
                                    </FormItem>
                                )}
                            />


                            {/* DOJ */}
                            <FormField
                                control={form.control}
                                name='student.doj'
                                render={() => (
                                    <FormItem className='relative w-full h-7 pb-[8px] flex flex-col items-start justify-center mt-2 lg:mt-0'>
                                        <FormLabel className='basis-auto h-2 pr-[4px] text-start text-[12px] text-[#726E71] lg:basis-[35%]'>DOJ</FormLabel>
                                        <div className='w-full'>
                                            <MyDatePicker
                                                selectedDate={doj}
                                                setSelectedDate={setDoj}
                                            />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex-1 flex flex-col gap-2 mt-2 lg:flex-row lg:mt-0'>
                            {/* Admitted Class */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%]'>Admitted Class</FormLabel>
                                {classesState.isLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                        <FormField
                                            control={form?.control}
                                            name='student.admitted_class'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                                    <FormControl>
                                                        <Select
                                                            {...field}
                                                            value={field?.value}
                                                            onValueChange={field?.onChange}
                                                            onOpenChange={async () => {
                                                                // setClassesState({...classesState, isLoading:true});
                                                                // const res = await fetchClassesNames();
                                                                // setClassesState({isLoading:false, items:res});
                                                            }}
                                                        >
                                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                                <SelectValue placeholder='Please Select' className='text-[12px]' />
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
                                                    <FormMessage className='absolute left-0 top-[60%] text-[12px]'/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                            {/* Place Of Birth */}
                            <div className='w-full'>
                                <FormField
                                    control={form?.control}
                                    name='student.place_of_birth'
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='w-full flex flex-col items-start justify-center'>
                                                <FormLabel className='basis-auto pr-[4px] text-start text-[12px] text-[#726E71] lg:basis-[35%]'>Place Of Birth</FormLabel>
                                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='flex h-7 flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-[12px]' />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Gender */}
                            <div className='w-full flex items-end just-center mt-2 lg:mt-0'>
                                <FormField
                                    control={form.control}
                                    name='student.gender'
                                    render={() => (
                                        <FormItem>
                                            <div className='w-full flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                                <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Gender</FormLabel>
                                                <div className='h-full w-full flex flex-col gap-4 lg:basis-[65%]'>
                                                    <FormControl>
                                                    <RadioGroup
                                                        value={form.getValues().student.gender}
                                                        className='h-full flex flex-row'
                                                    >
                                                        <div className='flex items-center space-x-[2px]'>
                                                            <RadioGroupItem value='Male' id='Male' onClick={() => form.setValue('student.gender', 'Male')}/>
                                                            <Label htmlFor='Male' className='text-[12px] text-hash-color'>Male</Label>
                                                        </div>
                                                        <div className='flex items-center space-x-[2px]'>
                                                            <RadioGroupItem value='Female' id='Female' onClick={() => form.setValue('student.gender', 'Female')}/>
                                                            <Label htmlFor='Female' className='text-[12px] text-hash-color'>Female</Label>
                                                        </div>
                                                    </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-[12px]' />
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
                            {/* H. No. and Streets */}
                            <FormField
                                control={form?.control}
                                name='student.h_no_and_streets'
                                render={({ field }) => (
                                    <FormItem className='w-full mt-2 lg:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>H. No. and Streets</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[12px]' />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {/* Locality */}
                            <FormField
                                control={form?.control}
                                name='student.locality'
                                render={({ field }) => (
                                    <FormItem className='w-full my-2 lg:my-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Locality</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[12px]' />
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
                                    <FormItem className='w-full mt-2 lg:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>City</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[12px]' />
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
                                    <FormItem className='w-full mt-2 lg:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Mobile</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[12px]' />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2 lg:flex-row'>
                            {/* State */}
                            <FormField
                                control={form?.control}
                                name='student.state'
                                render={({ field }) => (
                                    <FormItem className='w-full mt-2 lg:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>State</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[12px]' />
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
                                    <FormItem className='w-full mt-2 lg:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>PIN Code</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[12px]' />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-2 lg:flex-row'>
                            {/* What's App No */}
                            <FormField
                                control={form?.control}
                                name='student.whats_app_no'
                                render={({ field }) => (
                                    <FormItem className='w-full my-2 lg:my-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>What's App No</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[12px]' />
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
                                    <FormItem className='w-full mt-2 lg:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Email</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[12px]' />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>






                    <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                        <div className='flex flex-col gap-2 lg:flex-row'>
                            {/* Religion */}
                            <div className='w-[50%] flex flex-col items-center lg:flex-row'>
                                <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Religion</FormLabel>
                                {religionsState.isLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                        <FormField
                                            control={form?.control}
                                            name='student.religion'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                                <SelectValue placeholder='Please Select' className='text-[12px]' />
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


                            {/* Parish */}
                            {isParish && (
                                <div className='w-[50%] flex flex-col items-center lg:flex-row'>
                                    <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Parish</FormLabel>
                                    {parishesState.isLoading ? (
                                        <LoadingIcon />
                                    ) : (
                                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                            <FormField
                                                control={form?.control}
                                                name='student.parish'
                                                render={({ field }) => (
                                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                                        <FormControl>
                                                            <Select
                                                                {...field}
                                                                value={field?.value}
                                                                onValueChange={field?.onChange}
                                                                onOpenChange={async () => {
                                                                    // setParishesState({...parishesState, isLoading:true});
                                                                    // const res = await fetchParishesNames();
                                                                    // setParishesState({isLoading:false, items:res});
                                                                }}
                                                            >
                                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                                    <SelectValue placeholder='Please Select' className='text-[12px]' />
                                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {parishesState.items?.length < 1 ? (
                                                                        <p>No parishes</p>
                                                                        // @ts-ignore
                                                                    ) : !parishesState.items[0]?.parish ? (
                                                                        <LoadingIcon />
                                                                    ) : parishesState.items?.map((item:any) => (
                                                                        <SelectItem value={item?.parish} key={item?._id}>{item?.parish}</SelectItem>
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
                            )}
                        </div>
                        <div className='flex flex-col gap-2 lg:flex-row'>
                            {/* Category */}
                            <div className='w-full flex flex-col items-center lg:flex-row'>
                                <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Category</FormLabel>
                                {categoriesState.isLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                        <FormField
                                            control={form?.control}
                                            name='student.category'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                                <SelectValue placeholder='Please Select' className='text-[12px]' />
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
                            {/* Caste */}
                            <div className='w-full flex flex-col items-center lg:flex-row'>
                                <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Caste</FormLabel>
                                {castesState.isLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                        <FormField
                                            control={form?.control}
                                            name='student.caste'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                                <SelectValue placeholder='Please Select' className='text-[12px]' />
                                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {castesState.items?.length < 1 ? (
                                                                    <p className='text-xs text-hash-color'>No castes</p>
                                                                ) : // @ts-ignore
                                                                !castesState.items[0]?.caste_name ? (
                                                                    <LoadingIcon />
                                                                ) : castesState.items?.map((i:any) => (
                                                                    <SelectItem value={i.caste_name} key={i._id}>{i.caste_name}</SelectItem>
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





                    <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                        <div className='flex flex-col gap-2 p-2 ml-2 lg:flex-row'>
                            {/* Blood Group */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%]'>Blood Group</FormLabel>
                                {bloodGroupsState.isLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                        <FormField
                                            control={form?.control}
                                            name='student.blood_group'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                                <SelectValue placeholder='Please Select' className='text-[12px]' />
                                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {bloodGroupsState.items.length < 1 ? (
                                                                    <p className='text-xs text-hash-color'>No blood groups</p>
                                                                ) : // @ts-ignore
                                                                !bloodGroupsState.items[0].blood_group ? (
                                                                    <LoadingIcon />
                                                                ) : bloodGroupsState.items.map((i:any) => (
                                                                    <SelectItem value={i.blood_group} key={i._id}>{i.blood_group}</SelectItem>
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


                            {/* Cadet Type */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[12px] pr-[4px] text-[#726E71] lg:basis-[35%]'>Cadet Type</FormLabel>
                                {cadetTypesState.isLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                        <FormField
                                            control={form?.control}
                                            name='student.cadet_type'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                                    <FormControl>
                                                        <Select
                                                            {...field}
                                                            value={field?.value}
                                                            onValueChange={field?.onChange}
                                                            onOpenChange={async () => {
                                                                // setCadetTypesState({...cadetTypesState, isLoading:true});
                                                                // const res = await fetchCadetTypesNames();
                                                                // setCadetTypesState({isLoading:false, items:res});
                                                            }}
                                                        >
                                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                                <SelectValue placeholder='Please Select' className='text-[12px]' />
                                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {cadetTypesState.items.length < 1 ? (
                                                                    <p className='text-xs text-hash-color'>No cadet types</p>
                                                                ) : // @ts-ignore
                                                                !cadetTypesState.items[0].name ? (
                                                                    <LoadingIcon />
                                                                ) : cadetTypesState.items.map((i:any) => (
                                                                    <SelectItem value={i.name} key={i._id}>{i.name}</SelectItem>
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


                            {/* Club */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[12px] pr-[4px] text-[#726E71] lg:basis-[35%]'>Club</FormLabel>
                                {clubsState.isLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                        <FormField
                                            control={form?.control}
                                            name='student.club'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                                    <FormControl>
                                                        <Select
                                                            {...field}
                                                            value={field?.value}
                                                            onValueChange={field?.onChange}
                                                            onOpenChange={async () => {
                                                                // setClubsState({...clubsState, isLoading:true});
                                                                // const res = await fetchClubsNames();
                                                                // setClubsState({isLoading:false, items:res});
                                                            }}
                                                        >
                                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                                <SelectValue placeholder='Please Select' className='text-[12px]' />
                                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {clubsState.items.length < 1 ? (
                                                                    <p className='text-xs text-hash-color'>No clubs</p>
                                                                ) : // @ts-ignore
                                                                !clubsState.items[0].name ? (
                                                                    <LoadingIcon />
                                                                ) : clubsState.items.map((i:any) => (
                                                                    <SelectItem value={i.name} key={i._id}>{i.name}</SelectItem>
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





                        <div className='flex flex-col gap-4 p-2 ml-2 lg:flex-row'>
                            {/* Stream */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%]'>Stream</FormLabel>
                                {streamsState.isLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                        <FormField
                                            control={form?.control}
                                            name='student.stream'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-0 lg:mt-0'>
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
                                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                                <SelectValue placeholder='Please Select' className='text-[12px]' />
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
                                <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%]'>Subjects</FormLabel>
                                {subjectsState.isLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-0 lg:mt-0'>
                                            <FormControl>
                                                <Select
                                                    onOpenChange={async () => {
                                                        // setSubjectsState({...subjectsState, isLoading:true});
                                                        // const res = await fetchSubjectsNames();
                                                        // setSubjectsState({isLoading:false, items:res});
                                                    }}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
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
                                                                                <p className='basis-[70%] text-[12px]'>{subject.subject_name}</p>
                                                                                {subject.is_university && <p className='basis-[30%] text-[12px] border-l-[0.5px] border-hash-color text-center'>{subject.available_seats}</p>}
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
                                <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%]'>Optional Subject</FormLabel>
                                {optionalSubjectsState.isLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                        <FormField 
                                            control={form?.control}
                                            name='student.optional_subject'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-0 lg:mt-0'>
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
                                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                                <SelectValue placeholder='Please Select' className='text-[12px]' />
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


                            {/* House */}
                            <div className='w-full flex flex-col items-center'>
                                <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%]'>House</FormLabel>
                                {housesState.isLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                        <FormField
                                            control={form?.control}
                                            name='student.house'
                                            render={({ field }) => (
                                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                                    <FormControl>
                                                        <Select
                                                            {...field}
                                                            value={field?.value}
                                                            onValueChange={field?.onChange}
                                                            onOpenChange={async () => {
                                                                // setHousesState({...housesState, isLoading:true});
                                                                // const res = await fetchHousesNames();
                                                                // setHousesState({isLoading:false, items:res});
                                                            }}
                                                        >
                                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                                <SelectValue placeholder='Please Select' className='text-[12px]' />
                                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {housesState.items?.length < 1 ? (
                                                                    <p>No houses</p>
                                                                    // @ts-ignore
                                                                ) : !housesState.items[0]?.house_name ? (
                                                                    <LoadingIcon />
                                                                ) : housesState.items?.map((item:any) => (
                                                                    <SelectItem value={item?.house_name} key={item?._id}>{item?.house_name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage className='absolute left-0 top-[60%] text-[12px]'/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>





                    <div className='flex flex-col gap-4 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                        <div className='flex flex-col gap-4 p-2 ml-2 xl:flex-row'>
                            <div className='flex-1 flex flex-row justify-between'>
                                {/* Is Minority */}
                                <FormField
                                    control={form?.control}
                                    name='student.is_minority'
                                    render={({field}) => (
                                        <FormItem className='flex flex-row lg:gap-2'>
                                                <FormControl>
                                                    <div className='flex items-center justify-start space-x-2'>
                                                        <Label htmlFor='is_minority' className='text-[10px] text-hash-color'>
                                                            Is Minority
                                                        </Label>
                                                        <Switch
                                                            id='is_minority'
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


                                {/* Is EWS */}
                                <FormField
                                    control={form?.control}
                                    name='student.is_ews'
                                    render={({field}) => (
                                            <FormItem className='flex flex-row lg:gap-2'>
                                                <FormControl>
                                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                                        <Label htmlFor='is_ews' className='text-[10px] text-hash-color'>
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


                                {/* Is RTE */}
                                <FormField
                                    control={form?.control}
                                    name='student.is_rte'
                                    render={({field}) => (
                                            <FormItem className='flex flex-row lg:gap-2'>
                                                <FormControl>
                                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                                        <Label htmlFor='is_ews' className='text-[10px] text-hash-color'>
                                                            Is RTE
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

                            <div className='flex-1 flex flex-row gap-4'>
                                {/* Is Disability */}
                                <FormField
                                    control={form?.control}
                                    name='student.is_disability'
                                    render={({field}) => (
                                        <FormItem className='flex flex-row lg:gap-2'>
                                                <FormControl>
                                                    <div className='flex items-center justify-start space-x-2'>
                                                        <Label htmlFor='is_disability' className='text-[10px] text-hash-color'>
                                                            Is Disability
                                                        </Label>
                                                        <Switch
                                                            id='is_disability'
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


                                {/* Dis. Disc. */}
                                {form.getValues().student.is_disability && (
                                    <FormField
                                        control={form?.control}
                                        name='student.dis_disc'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 my-2 lg:my-0'>
                                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                                    <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Dis. Disc.</FormLabel>
                                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='mt-[-20px] text-[12px]' />
                                                    </div>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                        </div>


                        <div className='flex flex-col gap-4 p-2 ml-2 xl:flex-row'>
                            <div className='flex-1 flex flex-row justify-between'>
                                {/* Is New */}
                                <FormField
                                    control={form?.control}
                                    name='student.is_new'
                                    render={({field}) => (
                                        <FormItem className='flex flex-row lg:gap-2'>
                                                <FormControl>
                                                    <div className='flex-1 flex items-center space-x-2'>
                                                        <Label htmlFor='is_new' className='text-[10px] text-hash-color'>
                                                            Is New
                                                        </Label>
                                                        <Switch
                                                            id='is_new'
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
                                        <FormItem className='flex flex-row items-start justify-between lg:items-center lg:gap-2'>
                                                <FormControl>
                                                    <div className='flex-1 flex items-center justify-start space-x-2 lg:justify-end'>
                                                        <Label htmlFor='is_ews' className='text-[10px] text-hash-color'>
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


                                {/* Is Ony Child */}
                                <FormField
                                    control={form?.control}
                                    name='student.is_only_child'
                                    render={({field}) => (
                                        <FormItem className='flex flex-row items-start justify-between lg:items-center lg:gap-2'>
                                                <FormControl>
                                                    <div className='flex-1 flex items-center justify-start space-x-2 lg:justify-end'>
                                                        <Label htmlFor='is_only_child' className='text-[10px] text-hash-color'>
                                                            Is Ony Child
                                                        </Label>
                                                        <Switch
                                                            id='is_only_child'
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
                            <div className='flex-1 flex flex-row gap-4'>
                                {/* Is Active */}
                                <FormField
                                    control={form?.control}
                                    name='student.is_active'
                                    render={({field}) => (
                                        <FormItem className='flex flex-row lg:gap-2'>
                                                <FormControl>
                                                    <div className='flex-1 flex items-center justify-start space-x-2 lg:justify-end'>
                                                        <Label htmlFor='is_active' className='text-[10px] text-hash-color'>
                                                            Is Active
                                                        </Label>
                                                        <Switch
                                                            id='is_active'
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


                                {/* Reason */}
                                <FormField
                                    control={form?.control}
                                    name='student.reason'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 mb-2 lg:mb-0'>
                                            <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                                <FormLabel className='basis-auto pr-[4px] text-end text-[12px] text-[#726E71] lg:basis-[35%]'>Reason</FormLabel>
                                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-full flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-[12px]' />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>





                    <div className='flex flex-col gap-4 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2 lg:flex-row'>
                        {/* Transport */}
                        <div className='w-full flex flex-col items-center'>
                            <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%]'>Transport</FormLabel>
                            {transportState.isLoading ? (
                                <LoadingIcon />
                            ) : (
                                <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='student.transport'
                                        render={({ field }) => (
                                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[12px]' />
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
                        <div className='w-full flex flex-col items-center'>
                            <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%]'>Nationality</FormLabel>
                            {nationalitiesState.isLoading ? (
                                <LoadingIcon />
                            ) : (
                                <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                    <FormField
                                        control={form?.control}
                                        name='student.nationality'
                                        render={({ field }) => (
                                            <FormItem className='relative flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Please Select' className='text-[12px]' />
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {nationalitiesState.items.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No nationalities</p>
                                                            ) : // @ts-ignore
                                                            !nationalitiesState.items[0].name ? (
                                                                <LoadingIcon />
                                                            ) : nationalitiesState.items.map((t:any) => (
                                                                <SelectItem value={t.name} id={t._id}>{t.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='absolute left-0 top-[60%] text-[12px]'/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                        {/* Student Status */}
                        <div className='w-full flex flex-col items-center'>
                            <FormLabel className='w-full h-2 text-[12px] text-start pr-[4px] text-[#726E71] lg:basis-[35%]'>Student Status</FormLabel>
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                                <FormField
                                    control={form?.control}
                                    name='student.student_status'
                                    render={({ field }) => (
                                        <FormItem className='relative flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[12px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[12px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                            <SelectItem value='Studying'>Studying</SelectItem>
                                                            <SelectItem value='TC'>TC</SelectItem>
                                                            <SelectItem value='Left'>Left</SelectItem>
                                                            <SelectItem value='Rusticate'>Rusticate</SelectItem>
                                                            <SelectItem value='Withdrawn'>Withdrawn</SelectItem>
                                                            <SelectItem value='Repeater'>Repeater</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage className='absolute left-0 top-[60%] text-[12px]'/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};





// Export
export default Student;