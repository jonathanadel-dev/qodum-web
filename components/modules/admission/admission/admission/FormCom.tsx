'use client';
// Imports
import * as z from 'zod';
import moment from 'moment';
import Buttons from './Buttons';
import Other from './forms/Others';
import Parent from './forms/Parent';
import {deepEqual} from '@/lib/utils';
import Sibling from './forms/Sibling';
import Student from './forms/Student';
import Guardian from './forms/Guardian';
import {useForm} from 'react-hook-form';
import Document from './forms/Document';
import {useEffect, useState} from 'react';
import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {uploadStudentImage} from '@/lib/actions/image.actions';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {AdmittedStudentValidation} from '@/lib/validations/admission/admission/admittedStudent.validation';
import {createAdmittedStudent, deleteAdmittedStudent, modifyAdmittedStudent} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const FormCom = ({setIsViewOpened, students, updateStudent, setUpdateStudent, setValuesFromRegister, valuesFromRegister, registeredStudents, selectedSubjects, setSelectedSubjects, setSelectedDocuments, selectedDocuments, previousSchoolsDetails, setPreviousSchoolsDetails, designations, professions, staff}:any) => {

    // Toast
    const {toast} = useToast();


    // Date states
    const [dob, setDob] = useState(moment());
    const [doa, setDoa] = useState(moment());
    const [doj, setDoj] = useState(moment());
    const [fatherDob, setFatherDob] = useState(moment());
    const [motherDob, setMotherDob] = useState(moment());
    const [anniversaryDate, setAnniversaryDate] = useState(moment());


    // Is Loading
    const [isLoading, setIsLoading] = useState(false);


    // File
    const [file, setFile] = useState(null);


    // Image source (For image preview)
    const [imageSrc, setImageSrc] = useState('');


    // Selected tab
    const [selectedTab, setSelectedTab] = useState('student');


    // Comparison object
    const comparisonObject = {
        // Student
        student:{
            // Admission data
            section:updateStudent.student.section,
            adm_no:updateStudent.student.adm_no,
            pen_no:updateStudent.student.pen_no,
            par_id:updateStudent.student.par_id,
            roll_no:updateStudent.student.roll_no,
            bill_no:updateStudent.student.bill_no,
            is_university:updateStudent.student.is_university,
            re_adm_no:updateStudent.student.re_adm_no,
            is_minority:updateStudent.student.is_minority,
            is_disability:updateStudent.student.is_disability,
            dis_disc:updateStudent.student.dis_disc,
            is_new:updateStudent.student.is_new,
            is_active:updateStudent.student.is_active,
            reason:updateStudent.student.reason,
            is_only_child:updateStudent.student.is_only_child,
            student_status:updateStudent.student.student_status,
            house:updateStudent.student.house,
            doa:updateStudent.student.doa,
            doj:updateStudent.student.doj,
            admitted_class:updateStudent.student.admitted_class,
            // 1
            image:updateStudent.student.image,
            // 2
            stream:updateStudent.student.stream,
            subjects:updateStudent.student.subjects,
            optional_subject:updateStudent.student.optional_subject,
            class:updateStudent.student.class,
            board:updateStudent.student.board,
            name:updateStudent.student.name,
            middle_name:updateStudent.student.middle_name,
            last_name:updateStudent.student.last_name,
            dob:updateStudent.student.dob,
            place_of_birth:updateStudent.student.place_of_birth,
            gender:updateStudent.student.gender,
            contact_person_name:updateStudent.student.contact_person_name,
            contact_person_mobile:updateStudent.student.contact_person_mobile,
            contact_person_email:updateStudent.student.contact_person_email,
            secondary_contact_no:updateStudent.student.secondary_contact_no,
            h_no_and_streets:updateStudent.student.h_no_and_streets,
            locality:updateStudent.student.locality,
            email:updateStudent.student.email,
            city:updateStudent.student.city,
            mobile:updateStudent.student.mobile,
            state:updateStudent.student.state,
            pin_code:updateStudent.student.pin_code,
            aadhar_card_no:updateStudent.student.aadhar_card_no,
            whats_app_no:updateStudent.student.whats_app_no,
            religion:updateStudent.student.religion,
            parish:updateStudent.student.parish,
            caste:updateStudent.student.caste,
            category:updateStudent.student.category,
            blood_group:updateStudent.student.blood_group,
            cadet_type:updateStudent.student.cadet_type,
            club:updateStudent.student.club,
            is_ews:updateStudent.student.is_ews,
            is_rte:updateStudent.student.is_rte,
            sibling:updateStudent.student.sibling,
            transport:updateStudent.student.transport,
            nationality:updateStudent.student.nationality
        },

        // Parents
        parents:{
            // Father
            father:{
                father_name:updateStudent.parents.father.father_name,
                middle_name:updateStudent.parents.father.middle_name,
                last_name:updateStudent.parents.father.last_name,
                profession:updateStudent.parents.father.profession,
                designation:updateStudent.parents.father.designation,
                residence_address:updateStudent.parents.father.residence_address,
                office_address:updateStudent.parents.father.office_address,
                email:updateStudent.parents.father.email,
                alternate_email:updateStudent.parents.father.alternate_email,
                dob:updateStudent.parents.father.dob,
                mobile:updateStudent.parents.father.mobile,
                phone:updateStudent.parents.father.phone,
                company_name:updateStudent.parents.father.company_name,
                business_details:updateStudent.parents.father.business_details,
                qualification:updateStudent.parents.father.qualification,
                service_in:updateStudent.parents.father.service_in,
                office_phone:updateStudent.parents.father.office_phone,
                office_mobile:updateStudent.parents.father.office_mobile,
                office_extension:updateStudent.parents.father.office_extension,
                office_email:updateStudent.parents.father.office_email,
                office_website:updateStudent.parents.father.office_website,
                annual_income:updateStudent.parents.father.annual_income,
                parent_status:updateStudent.parents.father.parent_status
            },
            // Mother
            mother:{
                mother_name:updateStudent.parents.mother.mother_name,
                middle_name:updateStudent.parents.mother.middle_name,
                last_name:updateStudent.parents.mother.last_name,
                profession:updateStudent.parents.mother.profession,
                designation:updateStudent.parents.mother.designation,
                residence_address:updateStudent.parents.mother.residence_address,
                office_address:updateStudent.parents.mother.office_address,
                email:updateStudent.parents.mother.email,
                alternate_email:updateStudent.parents.mother.alternate_email,
                dob:updateStudent.parents.mother.dob,
                mobile:updateStudent.parents.mother.mobile,
                phone:updateStudent.parents.mother.phone,
                company_name:updateStudent.parents.mother.company_name,
                business_details:updateStudent.parents.mother.business_details,
                qualification:updateStudent.parents.mother.qualification,
                service_in:updateStudent.parents.mother.service_in,
                office_phone:updateStudent.parents.mother.office_phone,
                office_mobile:updateStudent.parents.mother.office_mobile,
                office_extension:updateStudent.parents.mother.office_extension,
                office_email:updateStudent.parents.mother.office_email,
                office_website:updateStudent.parents.mother.office_website,
                annual_income:updateStudent.parents.mother.annual_income,
                anniversary_date:updateStudent.parents.mother.anniversary_date
            }
        },

        // Other details
        others:{
            // 1
            student_other_details:{
                medical_history:updateStudent.others.student_other_details.medical_history,
                descriptions:updateStudent.others.student_other_details.descriptions,
                allergies:updateStudent.others.student_other_details.allergies,
                allergies_causes:updateStudent.others.student_other_details.allergies_causes,
                family_doctor_name:updateStudent.others.student_other_details.family_doctor_name,
                family_doctor_phone:updateStudent.others.student_other_details.family_doctor_phone,
                family_doctor_address:updateStudent.others.student_other_details.family_doctor_address,
                distance_from_home:updateStudent.others.student_other_details.distance_from_home,
                no_of_living_year:updateStudent.others.student_other_details.no_of_living_year,
                only_child:updateStudent.others.student_other_details.only_child,
                general_description:updateStudent.others.student_other_details.general_description,
            },
            // 2
            student_staff_relation:{
                staff_ward:updateStudent.others.student_staff_relation.staff_ward,
                staff_name:updateStudent.others.student_staff_relation.staff_name
            },
            // 3
            is_alumni:{
                is_alumni:updateStudent.others.is_alumni.is_alumni,
                academic_session:updateStudent.others.is_alumni.academic_session,
                class_name:updateStudent.others.is_alumni.class_name,
                admission_number:updateStudent.others.is_alumni.admission_number
            },
            // 4
            previous_school_details:updateStudent.others.previous_school_details
        },

        // Guardian details
        guardian_details:{
            // 1
            guardian_name:updateStudent.guardian_details.guardian_name,
            profession:updateStudent.guardian_details.profession,
            designation:updateStudent.guardian_details.designation,
            company_name:updateStudent.guardian_details.company_name,
            business_details:updateStudent.guardian_details.business_details,
            qualification:updateStudent.guardian_details.qualification,
            // 2
            if_single_parent:{
                student_lives_with:updateStudent.guardian_details.if_single_parent.student_lives_with,
                legal_custody_of_the_child:updateStudent.guardian_details.if_single_parent.legal_custody_of_the_child,
                correspondence_to:updateStudent.guardian_details.if_single_parent.correspondence_to,
                check_id_applicable:updateStudent.guardian_details.if_single_parent.check_id_applicable,
                separation_reason:updateStudent.guardian_details.if_single_parent.separation_reason
            }
        },

        // Documents
        documents:updateStudent.documents
    };


    // Form
    const form = useForm({
        resolver:zodResolver(AdmittedStudentValidation),
        defaultValues:{
            // Student
            student:{
                // Admission data
                section:updateStudent.id === '' ? '' : updateStudent.student.section,
                adm_no:updateStudent.id === '' ? '' : updateStudent.student.adm_no,
                pen_no:updateStudent.id === '' ? '' : updateStudent.student.pen_no,
                par_id:updateStudent.id === '' ? '' : updateStudent.student.par_id,
                roll_no:updateStudent.id === '' ? '' : updateStudent.student.roll_no,
                bill_no:updateStudent.id === '' ? '' : updateStudent.student.bill_no,
                is_university:updateStudent.id === '' ? false : updateStudent.student.is_university,
                re_adm_no:updateStudent.id === '' ? '' : updateStudent.student.re_adm_no,
                is_minority:updateStudent.id === '' ? false : updateStudent.student.is_minority,
                is_disability:updateStudent.id === '' ? false : updateStudent.student.is_disability,
                dis_disc:updateStudent.id === '' ? '' : updateStudent.student.dis_disc,
                is_new:updateStudent.id === '' ? true : updateStudent.student.is_new,
                is_active:updateStudent.id === '' ? true : updateStudent.student.is_active,
                reason:updateStudent.id === '' ? '' : updateStudent.student.reason,
                is_only_child:updateStudent.id === '' ? true : updateStudent.student.is_only_child,
                student_status:updateStudent.id === '' ? '' : updateStudent.student.student_status,
                house:updateStudent.id === '' ? '' : updateStudent.student.house,
                doa:updateStudent.id === '' ? new Date() : updateStudent.student.doa,
                doj:updateStudent.id === '' ? new Date() : updateStudent.student.doj,
                admitted_class:updateStudent.id === '' ? '' : updateStudent.student.admitted_class,
                // 1
                image:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.image : updateStudent.id === '' ? '' : updateStudent.student.image,
                // 2
                stream:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.stream : updateStudent.id === '' ? '' : updateStudent.student.stream,
                subjects:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.subjects || [''] : updateStudent.id === '' ? [''] : updateStudent.student.subjects || [''],
                optional_subject:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.optional_subject : updateStudent.id === '' ? '' : updateStudent.student.optional_subject,
                class:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.class : updateStudent.id === '' ? '' : updateStudent.student.class,
                board:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.board : updateStudent.id === '' ? '' : updateStudent.student.board,
                name:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.name : updateStudent.id === '' ? '' : updateStudent.student.name,
                middle_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.middle_name : updateStudent.id === '' ? '' : updateStudent.student.middle_name,
                last_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.last_name : updateStudent.id === '' ? '' : updateStudent.student.last_name,
                dob:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.dob : updateStudent.id === '' ? new Date() : updateStudent.student.dob,
                place_of_birth:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.place_of_birth : updateStudent.id === '' ? '' : updateStudent.student.place_of_birth,
                gender:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.gender : updateStudent.id === '' ? 'Male' : updateStudent.student.gender,
                contact_person_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.contact_person_name : updateStudent.id === '' ? '' : updateStudent.student.contact_person_name,
                contact_person_mobile:valuesFromRegister.student.name !== '' ? valuesFromRegister.contact_person_mobile : updateStudent.id === '' ? 0 : updateStudent.student.contact_person_mobile,
                contact_person_email:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.contact_person_email : updateStudent.id === '' ? '' : updateStudent.student.contact_person_email,
                secondary_contact_no:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.secondary_contact_no : updateStudent.id === '' ? 0 : updateStudent.student.secondary_contact_no,
                h_no_and_streets:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.h_no_and_streets : updateStudent.id === '' ? '' : updateStudent.student.h_no_and_streets,
                locality:updateStudent.id === '' ? '' : updateStudent.student.locality,
                email:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.email : updateStudent.id === '' ? '' : updateStudent.student.email,
                city:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.city : updateStudent.id === '' ? '' : updateStudent.student.city,
                mobile:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.mobile : updateStudent.id === '' ? 0 : updateStudent.student.mobile,
                state:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.state : updateStudent.id === '' ? '' : updateStudent.student.state,
                pin_code:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.pin_code : updateStudent.id === '' ? 0 : updateStudent.student.pin_code,
                aadhar_card_no:updateStudent.id === '' ? 0 : updateStudent.student.aadhar_card_no,
                whats_app_no:updateStudent.id === '' ? 0 : updateStudent.student.whats_app_no,
                religion:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.religion : updateStudent.id === '' ? '' : updateStudent.student.religion,
                parish:updateStudent.id === '' ? '' : updateStudent.student.parish,
                caste:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.caste : updateStudent.id === '' ? '' : updateStudent.student.caste,
                category:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.category : updateStudent.id === '' ? '' : updateStudent.student.category,
                blood_group:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.blood_group : updateStudent.id === '' ? '' : updateStudent.student.blood_group,
                cadet_type:updateStudent.id === '' ? '' : updateStudent.student.cadet_type,
                club:updateStudent.id === '' ? '' : updateStudent.student.club,
                is_ews:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.is_ews : updateStudent.id === '' ? false : updateStudent.student.is_ews,
                is_rte:updateStudent.id === '' ? false : updateStudent.student.is_rte,
                sibling:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.sibling : updateStudent.id === '' ? false : updateStudent.student.sibling,
                transport:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.transport : updateStudent.id === '' ? '' : updateStudent.student.transport,
                nationality:valuesFromRegister.student.name !== '' ? valuesFromRegister.student.nationality : updateStudent.id === '' ? '' : updateStudent.student.nationality
            },

            // Parents
            parents:{
                // Father
                father:{
                    father_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.father_name : updateStudent.id === '' ? '' : updateStudent.parents.father.father_name,
                    middle_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.middle_name : updateStudent.id === '' ? '' : updateStudent.parents.father.middle_name,
                    last_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.last_name : updateStudent.id === '' ? '' : updateStudent.parents.father.last_name,
                    profession:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.profession : updateStudent.id === '' ? '' : updateStudent.parents.father.profession,
                    designation:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.designation : updateStudent.id === '' ? '' : updateStudent.parents.father.designation,
                    residence_address:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.residence_address : updateStudent.id === '' ? '' : updateStudent.parents.father.residence_address,
                    office_address:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.office_address : updateStudent.id === '' ? '' : updateStudent.parents.father.office_address,
                    email:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.email : updateStudent.id === '' ? '' : updateStudent.parents.father.email,
                    alternate_email:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.alternate_email : updateStudent.id === '' ? '' : updateStudent.parents.father.alternate_email,
                    dob:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.dob : updateStudent.id === '' ? new Date() : updateStudent.parents.father.dob,
                    mobile:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.mobile : updateStudent.id === '' ? 0 : updateStudent.parents.father.mobile,
                    phone:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.phone : updateStudent.id === '' ? 0 : updateStudent.parents.father.phone,
                    company_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.company_name : updateStudent.id === '' ? '' : updateStudent.parents.father.company_name,
                    business_details:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.business_details : updateStudent.id === '' ? '' : updateStudent.parents.father.business_details,
                    qualification:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.qualification : updateStudent.id === '' ? '' : updateStudent.parents.father.qualification,
                    service_in:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.service_in : updateStudent.id === '' ? '' : updateStudent.parents.father.service_in,
                    office_phone:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.office_phone : updateStudent.id === '' ? 0 : updateStudent.parents.father.office_phone,
                    office_mobile:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.office_mobile : updateStudent.id === '' ? 0 : updateStudent.parents.father.office_mobile,
                    office_extension:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.office_extension : updateStudent.id === '' ? '' : updateStudent.parents.father.office_extension,
                    office_email:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.office_email : updateStudent.id === '' ? '' : updateStudent.parents.father.office_email,
                    office_website:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.office_website : updateStudent.id === '' ? '' : updateStudent.parents.father.office_website,
                    annual_income:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.annual_income : updateStudent.id === '' ? '' : updateStudent.parents.father.annual_income,
                    parent_status:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.father.parent_status : updateStudent.id === '' ? '' : updateStudent.parents.father.parent_status,
                },
                // Mother
                mother:{
                    mother_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.mother_name : updateStudent.id === '' ? '' : updateStudent.parents.mother.mother_name,
                    middle_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.middle_name : updateStudent.id === '' ? '' : updateStudent.parents.mother.middle_name,
                    last_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.last_name : updateStudent.id === '' ? '' : updateStudent.parents.mother.last_name,
                    profession:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.profession : updateStudent.id === '' ? '' : updateStudent.parents.mother.profession,
                    designation:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.designation : updateStudent.id === '' ? '' : updateStudent.parents.mother.designation,
                    residence_address:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.residence_address : updateStudent.id === '' ? '' : updateStudent.parents.mother.residence_address,
                    office_address:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.office_address : updateStudent.id === '' ? '' : updateStudent.parents.mother.office_address,
                    email:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.email : updateStudent.id === '' ? '' : updateStudent.parents.mother.email,
                    alternate_email:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.alternate_email : updateStudent.id === '' ? '' : updateStudent.parents.mother.alternate_email,
                    dob:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.dob : updateStudent.id === '' ? new Date() : updateStudent.parents.mother.dob,
                    mobile:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.mobile : updateStudent.id === '' ? 0 : updateStudent.parents.mother.mobile,
                    phone:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.phone : updateStudent.id === '' ? 0 : updateStudent.parents.mother.phone,
                    company_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.company_name : updateStudent.id === '' ? '' : updateStudent.parents.mother.company_name,
                    business_details:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.business_details : updateStudent.id === '' ? '' : updateStudent.parents.mother.business_details,
                    qualification:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.qualification : updateStudent.id === '' ? '' : updateStudent.parents.mother.qualification,
                    service_in:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.service_in : updateStudent.id === '' ? '' : updateStudent.parents.mother.service_in,
                    office_phone:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.office_phone : updateStudent.id === '' ? 0 : updateStudent.parents.mother.office_phone,
                    office_mobile:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.office_mobile : updateStudent.id === '' ? 0 : updateStudent.parents.mother.office_mobile,
                    office_extension:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.office_extension : updateStudent.id === '' ? '' : updateStudent.parents.mother.office_extension,
                    office_email:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.office_email : updateStudent.id === '' ? '' : updateStudent.parents.mother.office_email,
                    office_website:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.office_website : updateStudent.id === '' ? '' : updateStudent.parents.mother.office_website,
                    annual_income:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.annual_income : updateStudent.id === '' ? '' : updateStudent.parents.mother.annual_income,
                    anniversary_date:valuesFromRegister.student.name !== '' ? valuesFromRegister.parents.mother.anniversary_date : updateStudent.id === '' ? new Date() : updateStudent.parents.mother.anniversary_date,
                }
            },

            // Other details
            others:{
                // 1
                student_other_details:{
                    medical_history:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_other_details.medical_history : updateStudent.id === '' ? '' : updateStudent.others.student_other_details.medical_history,
                    descriptions:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_other_details.descriptions : updateStudent.id === '' ? '' : updateStudent.others.student_other_details.descriptions,
                    allergies:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_other_details.allergies : updateStudent.id === '' ? '' : updateStudent.others.student_other_details.allergies,
                    allergies_causes:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_other_details.allergies_causes : updateStudent.id === '' ? '' : updateStudent.others.student_other_details.allergies_causes,
                    family_doctor_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_other_details.family_doctor_name : updateStudent.id === '' ? '' : updateStudent.others.student_other_details.family_doctor_name,
                    family_doctor_phone:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_other_details.family_doctor_phone : updateStudent.id === '' ? 0 : updateStudent.others.student_other_details.family_doctor_phone,
                    family_doctor_address:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_other_details.family_doctor_address : updateStudent.id === '' ? '' : updateStudent.others.student_other_details.family_doctor_address,
                    distance_from_home:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_other_details.distance_from_home : updateStudent.id === '' ? '' : updateStudent.others.student_other_details.distance_from_home,
                    no_of_living_year:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_other_details.no_of_living_year : updateStudent.id === '' ? 0 : updateStudent.others.student_other_details.no_of_living_year,
                    only_child:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_other_details.only_child : updateStudent.id === '' ? '' : updateStudent.others.student_other_details.only_child,
                    general_description:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_other_details.general_description : updateStudent.id === '' ? '' : updateStudent.others.student_other_details.general_description
                },
                // 2
                student_staff_relation:{
                    staff_ward:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_staff_relation.staff_ward : updateStudent.id === '' ? '' : updateStudent.others.student_staff_relation.staff_ward,
                    staff_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.student_staff_relation.staff_name : updateStudent.id === '' ? '' : updateStudent.others.student_staff_relation.staff_name
                },
                // 3
                is_alumni:{
                    is_alumni:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.is_alumni.is_alumni : updateStudent.id === '' ? false : updateStudent.others.is_alumni.is_alumni,
                    academic_session:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.is_alumni.academic_session : updateStudent.id === '' ? '' : updateStudent.others.is_alumni.academic_session,
                    class_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.is_alumni.class_name : updateStudent.id === '' ? '' : updateStudent.others.is_alumni.class_name,
                    admission_number:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.is_alumni.admission_number : updateStudent.id === '' ? 0 : updateStudent.others.is_alumni.admission_number
                },
                // 4
                previous_school_details:valuesFromRegister.student.name !== '' ? valuesFromRegister.others.previous_school_details : updateStudent.id === '' ? [] : updateStudent.others.previous_school_details,
            },

            // Guardian details
            guardian_details:{
                // 1
                guardian_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.guardian_details.guardian_name : updateStudent.id === '' ? '' : updateStudent.guardian_details.guardian_name,
                profession:valuesFromRegister.student.name !== '' ? valuesFromRegister.guardian_details.profession : updateStudent.id === '' ? '' : updateStudent.guardian_details.profession,
                designation:valuesFromRegister.student.name !== '' ? valuesFromRegister.guardian_details.designation : updateStudent.id === '' ? '' : updateStudent.guardian_details.designation,
                company_name:valuesFromRegister.student.name !== '' ? valuesFromRegister.guardian_details.company_name : updateStudent.id === '' ? '' : updateStudent.guardian_details.company_name,
                business_details:valuesFromRegister.student.name !== '' ? valuesFromRegister.guardian_details.business_details : updateStudent.id === '' ? '' : updateStudent.guardian_details.business_details,
                qualification:valuesFromRegister.student.name !== '' ? valuesFromRegister.guardian_details.qualification : updateStudent.id === '' ? '' : updateStudent.guardian_details.qualification,
                // 2
                if_single_parent:{
                    student_lives_with:valuesFromRegister.student.name !== '' ? valuesFromRegister.guardian_details.if_single_parent.student_lives_with : updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.student_lives_with,
                    legal_custody_of_the_child:valuesFromRegister.student.name !== '' ? valuesFromRegister.guardian_details.if_single_parent.legal_custody_of_the_child : updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.legal_custody_of_the_child,
                    correspondence_to:valuesFromRegister.student.name !== '' ? valuesFromRegister.guardian_details.if_single_parent.correspondence_to : updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.correspondence_to,
                    check_id_applicable:valuesFromRegister.student.name !== '' ? valuesFromRegister.guardian_details.if_single_parent.check_id_applicable : updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.check_id_applicable,
                    separation_reason:valuesFromRegister.student.name !== '' ? valuesFromRegister.guardian_details.if_single_parent.separation_reason : updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.separation_reason
                }
            },

            // Documents
            documents:updateStudent.id === '' ? [{document_type:'', document_name:''}] : updateStudent.documents
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof AdmittedStudentValidation>) => {
        setIsLoading(true);
        // Checking if de-activation reason exists
        if(!values.student.is_active && values.student.reason === ''){
            toast({title:"Please enter student's de-activation reason", variant:'alert'});
            setIsLoading(false);
            return;
        };
        // Create Student
        if(updateStudent.id === ''){
            if(students.map((student:any) => student.student.adm_no).includes(values.student.adm_no)){
                toast({title:'Admission no. already exists', variant:'error'});
                setIsLoading(false);
                return;
            };
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                await uploadStudentImage({data:formData, reg_no:values.student.name + values.student.adm_no.split('/')[values.student.adm_no.split('/').length - 1]});
            };
            const res = await createAdmittedStudent({
                // Student
                student:{
                    // Admission data
                    section:values.student.section,
                    adm_no:values.student.adm_no,
                    pen_no:values.student.pen_no,
                    par_id:values.student.par_id,
                    roll_no:values.student.roll_no,
                    bill_no:values.student.bill_no,
                    is_university:values.student.is_university,
                    re_adm_no:values.student.re_adm_no,
                    is_minority:values.student.is_minority,
                    is_disability:values.student.is_disability,
                    dis_disc:values.student.dis_disc,
                    is_new:values.student.is_new,
                    is_active:values.student.is_active,
                    reason:values.student.reason,
                    is_only_child:values.student.is_only_child,
                    student_status:values.student.student_status,
                    house:values.student.house,
                    doa:values.student.doa,
                    doj:values.student.doj,
                    admitted_class:values.student.admitted_class,
                    // 1
                    image:file !== null ? `https://qodum.s3.amazonaws.com/students/${values.student.name + values.student.adm_no.split('/')[values.student.adm_no.split('/').length - 1]}` : valuesFromRegister.student.image || '',
                    // 2
                    stream:values.student.stream,
                    subjects:selectedSubjects,
                    optional_subject:values.student.optional_subject,
                    class:values.student.class,
                    board:values.student.board,
                    name:values.student.name,
                    middle_name:values.student.middle_name,
                    last_name:values.student.last_name,
                    dob:values.student.dob,
                    place_of_birth:values.student.place_of_birth,
                    gender:values.student.gender,
                    contact_person_name:values.student.contact_person_name,
                    contact_person_mobile:values.student.contact_person_mobile,
                    contact_person_email:values.student.contact_person_email,
                    secondary_contact_no:values.student.secondary_contact_no,
                    h_no_and_streets:values.student.h_no_and_streets,
                    locality:values.student.locality,
                    email:values.student.email,
                    city:values.student.city,
                    mobile:values.student.mobile,
                    state:values.student.state,
                    pin_code:values.student.pin_code,
                    aadhar_card_no:values.student.aadhar_card_no,
                    whats_app_no:values.student.whats_app_no,
                    religion:values.student.religion,
                    parish:values.student.parish,
                    caste:values.student.caste,
                    category:values.student.category,
                    blood_group:values.student.blood_group,
                    cadet_type:values.student.cadet_type,
                    club:values.student.club,
                    is_ews:values.student.is_ews,
                    is_rte:values.student.is_rte,
                    sibling:values.student.sibling,
                    transport:values.student.transport,
                    nationality:values.student.nationality
                },

                // Parents
                parents:{
                    // Father
                    father:{
                        father_name:values.parents.father.father_name,
                        middle_name:values.parents.father.middle_name,
                        last_name:values.parents.father.last_name,
                        profession:values.parents.father.profession,
                        designation:values.parents.father.designation,
                        residence_address:values.parents.father.residence_address,
                        office_address:values.parents.father.office_address,
                        email:values.parents.father.email,
                        alternate_email:values.parents.father.alternate_email,
                        dob:values.parents.father.dob,
                        mobile:values.parents.father.mobile,
                        phone:values.parents.father.phone,
                        company_name:values.parents.father.company_name,
                        business_details:values.parents.father.business_details,
                        qualification:values.parents.father.qualification,
                        service_in:values.parents.father.service_in,
                        office_phone:values.parents.father.office_phone,
                        office_mobile:values.parents.father.office_mobile,
                        office_extension:values.parents.father.office_extension,
                        office_email:values.parents.father.office_email,
                        office_website:values.parents.father.office_website,
                        annual_income:values.parents.father.annual_income,
                        parent_status:values.parents.father.parent_status
                    },
                    // Mother
                    mother:{
                        mother_name:values.parents.mother.mother_name,
                        middle_name:values.parents.mother.middle_name,
                        last_name:values.parents.mother.last_name,
                        profession:values.parents.mother.profession,
                        designation:values.parents.mother.designation,
                        residence_address:values.parents.mother.residence_address,
                        office_address:values.parents.mother.office_address,
                        email:values.parents.mother.email,
                        alternate_email:values.parents.mother.alternate_email,
                        dob:values.parents.mother.dob,
                        mobile:values.parents.mother.mobile,
                        phone:values.parents.mother.phone,
                        company_name:values.parents.mother.company_name,
                        business_details:values.parents.mother.business_details,
                        qualification:values.parents.mother.qualification,
                        service_in:values.parents.mother.service_in,
                        office_phone:values.parents.mother.office_phone,
                        office_mobile:values.parents.mother.office_mobile,
                        office_extension:values.parents.mother.office_extension,
                        office_email:values.parents.mother.office_email,
                        office_website:values.parents.mother.office_website,
                        annual_income:values.parents.mother.annual_income,
                        anniversary_date:values.parents.mother.anniversary_date
                    }
                },

                // Other details
                others:{
                    // 1
                    student_other_details:{
                        medical_history:values.others.student_other_details.medical_history,
                        descriptions:values.others.student_other_details.descriptions,
                        allergies:values.others.student_other_details.allergies,
                        allergies_causes:values.others.student_other_details.allergies_causes,
                        family_doctor_name:values.others.student_other_details.family_doctor_name,
                        family_doctor_phone:values.others.student_other_details.family_doctor_phone,
                        family_doctor_address:values.others.student_other_details.family_doctor_address,
                        distance_from_home:values.others.student_other_details.distance_from_home,
                        no_of_living_year:values.others.student_other_details.no_of_living_year,
                        only_child:values.others.student_other_details.only_child,
                        general_description:values.others.student_other_details.general_description,
                    },
                    // 2
                    student_staff_relation:{
                        staff_ward:values.others.student_staff_relation.staff_ward,
                        staff_name:values.others.student_staff_relation.staff_name
                    },
                    // 3
                    is_alumni:{
                        is_alumni:values.others.is_alumni.is_alumni,
                        academic_session:values.others.is_alumni.academic_session,
                        class_name:values.others.is_alumni.class_name,
                        admission_number:values.others.is_alumni.admission_number
                    },
                    // 4
                    previous_school_details:previousSchoolsDetails
                },

                // Guardian details
                guardian_details:{
                    // 1
                    guardian_name:values.guardian_details.guardian_name,
                    profession:values.guardian_details.profession,
                    designation:values.guardian_details.designation,
                    company_name:values.guardian_details.company_name,
                    business_details:values.guardian_details.business_details,
                    qualification:values.guardian_details.qualification,
                    // 2
                    if_single_parent:{
                        student_lives_with:values.guardian_details.if_single_parent.student_lives_with,
                        legal_custody_of_the_child:values.guardian_details.if_single_parent.legal_custody_of_the_child,
                        correspondence_to:values.guardian_details.if_single_parent.correspondence_to,
                        check_id_applicable:values.guardian_details.if_single_parent.check_id_applicable,
                        separation_reason:values.guardian_details.if_single_parent.separation_reason
                    }
                },

                // Documents
                documents:selectedDocuments.filter((d:any) => d.document_name !== '')
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                setIsLoading(false);
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify Student
        else if(
            !deepEqual(comparisonObject, values)
            || file
            || comparisonObject.student.subjects !== selectedSubjects
            || comparisonObject.documents !== selectedDocuments
            || moment(values.student.dob).format('DD-MM-YYYY') !== moment(comparisonObject.student.dob).format('DD-MM-YYYY')
            || moment(values.student.doa).format('DD-MM-YYYY') !== moment(comparisonObject.student.doa).format('DD-MM-YYYY')
            || moment(values.student.doj).format('DD-MM-YYYY') !== moment(comparisonObject.student.doj).format('DD-MM-YYYY')
            || moment(values.parents.father.dob).format('DD-MM-YYYY') !== moment(comparisonObject.parents.father.dob).format('DD-MM-YYYY')
            || moment(values.parents.mother.dob).format('DD-MM-YYYY') !== moment(comparisonObject.parents.mother.dob).format('DD-MM-YYYY')
            || moment(values.parents.mother.anniversary_date).format('DD-MM-YYYY') !== moment(comparisonObject.parents.mother.anniversary_date).format('DD-MM-YYYY')
            || JSON.stringify(values.others.previous_school_details) !== JSON.stringify(previousSchoolsDetails)
        ){
            if(comparisonObject.student.adm_no !== values.student.adm_no && students.map((student:any) => student.student.adm_no).includes(values.student.adm_no)){
                toast({title:'Admission no. already exists', variant:'error'});
                setIsLoading(false);
                return;
            };
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                await uploadStudentImage({data:formData, reg_no:values.student.name + values.student.adm_no.split('/')[values.student.adm_no.split('/').length - 1]});
            };
            // Update
            const updateRes = await modifyAdmittedStudent({
                id:updateStudent.id,
                // Student
                student:{
                    // Admission data
                    section:values.student.section,
                    adm_no:values.student.adm_no,
                    pen_no:values.student.pen_no,
                    par_id:values.student.par_id,
                    roll_no:values.student.roll_no,
                    bill_no:values.student.bill_no,
                    is_university:values.student.is_university,
                    re_adm_no:values.student.re_adm_no,
                    is_minority:values.student.is_minority,
                    is_disability:values.student.is_disability,
                    dis_disc:values.student.dis_disc,
                    is_new:values.student.is_new,
                    is_active:values.student.is_active,
                    reason:values.student.reason,
                    is_only_child:values.student.is_only_child,
                    student_status:values.student.student_status,
                    house:values.student.house,
                    doa:values.student.doa,
                    doj:values.student.doj,
                    admitted_class:values.student.admitted_class,
                    // 1
                    image:file !== null ? `https://qodum.s3.amazonaws.com/students/${values.student.name + values.student.adm_no.split('/')[values.student.adm_no.split('/').length - 1]}` : comparisonObject.student.image,
                    // 2
                    stream:values.student.stream,
                    subjects:selectedSubjects,
                    optional_subject:values.student.optional_subject,
                    class:values.student.class,
                    board:values.student.board,
                    name:values.student.name,
                    middle_name:values.student.middle_name,
                    last_name:values.student.last_name,
                    dob:values.student.dob,
                    place_of_birth:values.student.place_of_birth,
                    gender:values.student.gender,
                    contact_person_name:values.student.contact_person_name,
                    contact_person_mobile:values.student.contact_person_mobile,
                    contact_person_email:values.student.contact_person_email,
                    secondary_contact_no:values.student.secondary_contact_no,
                    h_no_and_streets:values.student.h_no_and_streets,
                    locality:values.student.locality,
                    email:values.student.email,
                    city:values.student.city,
                    mobile:values.student.mobile,
                    state:values.student.state,
                    pin_code:values.student.pin_code,
                    aadhar_card_no:values.student.aadhar_card_no,
                    whats_app_no:values.student.whats_app_no,
                    religion:values.student.religion,
                    parish:values.student.parish,
                    caste:values.student.caste,
                    category:values.student.category,
                    blood_group:values.student.blood_group,
                    cadet_type:values.student.cadet_type,
                    club:values.student.club,
                    is_ews:values.student.is_ews,
                    is_rte:values.student.is_rte,
                    sibling:values.student.sibling,
                    transport:values.student.transport,
                    nationality:values.student.nationality
                },

                // Parents
                parents:{
                    // Father
                    father:{
                        father_name:values.parents.father.father_name,
                        middle_name:values.parents.father.middle_name,
                        last_name:values.parents.father.last_name,
                        profession:values.parents.father.profession,
                        designation:values.parents.father.designation,
                        residence_address:values.parents.father.residence_address,
                        office_address:values.parents.father.office_address,
                        email:values.parents.father.email,
                        alternate_email:values.parents.father.alternate_email,
                        dob:values.parents.father.dob,
                        mobile:values.parents.father.mobile,
                        phone:values.parents.father.phone,
                        company_name:values.parents.father.company_name,
                        business_details:values.parents.father.business_details,
                        qualification:values.parents.father.qualification,
                        service_in:values.parents.father.service_in,
                        office_phone:values.parents.father.office_phone,
                        office_mobile:values.parents.father.office_mobile,
                        office_extension:values.parents.father.office_extension,
                        office_email:values.parents.father.office_email,
                        office_website:values.parents.father.office_website,
                        annual_income:values.parents.father.annual_income,
                        parent_status:values.parents.father.parent_status
                    },
                    // Mother
                    mother:{
                        mother_name:values.parents.mother.mother_name,
                        middle_name:values.parents.mother.middle_name,
                        last_name:values.parents.mother.last_name,
                        profession:values.parents.mother.profession,
                        designation:values.parents.mother.designation,
                        residence_address:values.parents.mother.residence_address,
                        office_address:values.parents.mother.office_address,
                        email:values.parents.mother.email,
                        alternate_email:values.parents.mother.alternate_email,
                        dob:values.parents.mother.dob,
                        mobile:values.parents.mother.mobile,
                        phone:values.parents.mother.phone,
                        company_name:values.parents.mother.company_name,
                        business_details:values.parents.mother.business_details,
                        qualification:values.parents.mother.qualification,
                        service_in:values.parents.mother.service_in,
                        office_phone:values.parents.mother.office_phone,
                        office_mobile:values.parents.mother.office_mobile,
                        office_extension:values.parents.mother.office_extension,
                        office_email:values.parents.mother.office_email,
                        office_website:values.parents.mother.office_website,
                        annual_income:values.parents.mother.annual_income,
                        anniversary_date:values.parents.mother.anniversary_date
                    }
                },

                // Other details
                others:{
                    // 1
                    student_other_details:{
                        medical_history:values.others.student_other_details.medical_history,
                        descriptions:values.others.student_other_details.descriptions,
                        allergies:values.others.student_other_details.allergies,
                        allergies_causes:values.others.student_other_details.allergies_causes,
                        family_doctor_name:values.others.student_other_details.family_doctor_name,
                        family_doctor_phone:values.others.student_other_details.family_doctor_phone,
                        family_doctor_address:values.others.student_other_details.family_doctor_address,
                        distance_from_home:values.others.student_other_details.distance_from_home,
                        no_of_living_year:values.others.student_other_details.no_of_living_year,
                        only_child:values.others.student_other_details.only_child,
                        general_description:values.others.student_other_details.general_description,
                    },
                    // 2
                    student_staff_relation:{
                        staff_ward:values.others.student_staff_relation.staff_ward,
                        staff_name:values.others.student_staff_relation.staff_name
                    },
                    // 3
                    is_alumni:{
                        is_alumni:values.others.is_alumni.is_alumni,
                        academic_session:values.others.is_alumni.academic_session,
                        class_name:values.others.is_alumni.class_name,
                        admission_number:values.others.is_alumni.admission_number
                    },
                    // 4
                    previous_school_details:previousSchoolsDetails
                },

                // Guardian details
                guardian_details:{
                    // 1
                    guardian_name:values.guardian_details.guardian_name,
                    profession:values.guardian_details.profession,
                    designation:values.guardian_details.designation,
                    company_name:values.guardian_details.company_name,
                    business_details:values.guardian_details.business_details,
                    qualification:values.guardian_details.qualification,
                    // 2
                    if_single_parent:{
                        student_lives_with:values.guardian_details.if_single_parent.student_lives_with,
                        legal_custody_of_the_child:values.guardian_details.if_single_parent.legal_custody_of_the_child,
                        correspondence_to:values.guardian_details.if_single_parent.correspondence_to,
                        check_id_applicable:values.guardian_details.if_single_parent.check_id_applicable,
                        separation_reason:values.guardian_details.if_single_parent.separation_reason
                    }
                },

                // Documents
                documents:selectedDocuments.filter((d:any) => d.document_name !== '')
            });
            if(updateRes === 1){
                toast({title:'Student has current paid fees in their class', variant:'alert'});
                setIsLoading(false);
                return;
            }else{
                toast({title:'Updated Successfully!'});
            };
        }
        // Delete Student
        else if(updateStudent.isDeleteClicked){
            await deleteAdmittedStudent({id:updateStudent.id});
            toast({title:'Deleted Successfully!'});
        };


        setValuesFromRegister({
            // Student
            student:{
                // 1
                image:'',
                // 2
                stream:'',
                subjects:[''],
                optional_subject:'',
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
                        class:'',
                        school_name:'',
                        board:'',
                        passing_year:'',
                        total_marks:'',
                        obtain_marks:'',
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
        // Reseting update entity
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
                stream:'',
                subjects:[''],
                optional_subject:'',
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
                        class:'',
                        school_name:'',
                        board:'',
                        passing_year:'',
                        total_marks:'',
                        obtain_marks:'',
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
        // Reseting form
        form.reset({
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
                stream:'',
                subjects:[''],
                optional_subject:'',
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
                        class:'',
                        school_name:'',
                        board:'',
                        passing_year:'',
                        total_marks:'',
                        obtain_marks:'',
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
        // Image
        setFile(null);
        setImageSrc('');
        setIsLoading(false);
        setSelectedSubjects([]);
        setSelectedDocuments([{
            document_type:'',
            document_name:''
        }]);
        setDob(moment());
        setDoa(moment());
        setDoj(moment());
        setFatherDob(moment());
        setMotherDob(moment());
        setAnniversaryDate(moment());
        setPreviousSchoolsDetails([{
            class:'',
            school_name:'',
            board:'',
            passing_year:'',
            total_marks:'',
            obtain_marks:'',
            percentage:'',
            result:''
        }]);
    };


    // Use Effects
    useEffect(() => {
        if(updateStudent.id !== ''){
            setDob(moment(updateStudent.student.dob));
            setDoa(moment(updateStudent.student.doa));
            setDoj(moment(updateStudent.student.doj));
            setFatherDob(moment(updateStudent.parents.father.dob));
            setMotherDob(moment(updateStudent.parents.mother.dob));
            setAnniversaryDate(moment(updateStudent.parents.mother.anniversary_date));
        };
    }, []);
    useEffect(() => {
        if(updateStudent.id !== ''){

            // Student
            form.setValue('student.section', updateStudent.student.section);
            form.setValue('student.adm_no', updateStudent.student.adm_no);
            form.setValue('student.pen_no', updateStudent.student.pen_no);
            form.setValue('student.par_id', updateStudent.student.par_id);
            form.setValue('student.roll_no', updateStudent.student.roll_no);
            form.setValue('student.bill_no', updateStudent.student.bill_no);
            form.setValue('student.is_university', updateStudent.student.is_university);
            form.setValue('student.re_adm_no', updateStudent.student.re_adm_no);
            form.setValue('student.is_minority', updateStudent.student.is_minority);
            form.setValue('student.is_disability', updateStudent.student.is_disability);
            form.setValue('student.dis_disc', updateStudent.student.dis_disc);
            form.setValue('student.is_new', updateStudent.student.is_new);
            form.setValue('student.is_active', updateStudent.student.is_active);
            form.setValue('student.reason', updateStudent.student.reason);
            form.setValue('student.is_only_child', updateStudent.student.is_only_child);
            form.setValue('student.student_status', updateStudent.student.student_status);
            form.setValue('student.house', updateStudent.student.house);
            form.setValue('student.doa', updateStudent.student.doa);
            form.setValue('student.doj', updateStudent.student.doj);
            form.setValue('student.admitted_class', updateStudent.student.admitted_class);



            form.setValue('student.image', updateStudent.student.image);
            form.setValue('student.stream', updateStudent.student.stream);
            form.setValue('student.subjects', updateStudent.student.subjects);
            form.setValue('student.optional_subject', updateStudent.student.optional_subject);
            form.setValue('student.class', updateStudent.student.class);
            form.setValue('student.board', updateStudent.student.board);
            form.setValue('student.name', updateStudent.student.name);
            form.setValue('student.middle_name', updateStudent.student.middle_name);
            form.setValue('student.last_name', updateStudent.student.last_name);
            form.setValue('student.dob', updateStudent.student.dob);
            form.setValue('student.place_of_birth', updateStudent.student.place_of_birth);
            form.setValue('student.gender', updateStudent.student.gender);
            form.setValue('student.contact_person_name', updateStudent.student.contact_person_name);
            form.setValue('student.contact_person_mobile', updateStudent.student.contact_person_mobile);
            form.setValue('student.contact_person_email', updateStudent.student.contact_person_email);
            form.setValue('student.secondary_contact_no', updateStudent.student.secondary_contact_no);
            form.setValue('student.h_no_and_streets', updateStudent.student.h_no_and_streets);
            form.setValue('student.locality', updateStudent.student.locality);
            form.setValue('student.email', updateStudent.student.email);
            form.setValue('student.city', updateStudent.student.city);
            form.setValue('student.mobile', updateStudent.student.mobile);
            form.setValue('student.state', updateStudent.student.state);
            form.setValue('student.pin_code', updateStudent.student.pin_code);
            form.setValue('student.aadhar_card_no', updateStudent.student.aadhar_card_no);
            form.setValue('student.whats_app_no', updateStudent.student.whats_app_no);
            form.setValue('student.religion', updateStudent.student.religion);
            form.setValue('student.parish', updateStudent.student.parish);
            form.setValue('student.caste', updateStudent.student.caste);
            form.setValue('student.category', updateStudent.student.category);
            form.setValue('student.blood_group', updateStudent.student.blood_group);
            form.setValue('student.cadet_type', updateStudent.student.cadet_type);
            form.setValue('student.club', updateStudent.student.club);
            form.setValue('student.is_ews', updateStudent.student.is_ews);
            form.setValue('student.is_rte', updateStudent.student.is_rte);
            form.setValue('student.sibling', updateStudent.student.sibling);
            form.setValue('student.transport', updateStudent.student.transport);
            form.setValue('student.nationality', updateStudent.student.nationality);




            // Parents
            form.setValue('parents.father.father_name', updateStudent.parents.father.father_name);
            form.setValue('parents.father.middle_name', updateStudent.parents.father.middle_name);
            form.setValue('parents.father.last_name', updateStudent.parents.father.last_name);
            form.setValue('parents.father.profession', updateStudent.parents.father.profession);
            form.setValue('parents.father.designation', updateStudent.parents.father.designation);
            form.setValue('parents.father.residence_address', updateStudent.parents.father.residence_address);
            form.setValue('parents.father.office_address', updateStudent.parents.father.office_address);
            form.setValue('parents.father.email', updateStudent.parents.father.email);
            form.setValue('parents.father.alternate_email', updateStudent.parents.father.alternate_email);
            form.setValue('parents.father.dob', updateStudent.parents.father.dob);
            form.setValue('parents.father.mobile', updateStudent.parents.father.mobile);
            form.setValue('parents.father.phone', updateStudent.parents.father.phone);
            form.setValue('parents.father.company_name', updateStudent.parents.father.company_name);
            form.setValue('parents.father.business_details', updateStudent.parents.father.business_details);
            form.setValue('parents.father.qualification', updateStudent.parents.father.qualification);
            form.setValue('parents.father.service_in', updateStudent.parents.father.service_in);
            form.setValue('parents.father.office_phone', updateStudent.parents.father.office_phone);
            form.setValue('parents.father.office_mobile', updateStudent.parents.father.office_mobile);
            form.setValue('parents.father.office_extension', updateStudent.parents.father.office_extension);
            form.setValue('parents.father.office_email', updateStudent.parents.father.office_email);
            form.setValue('parents.father.office_website', updateStudent.parents.father.office_website);
            form.setValue('parents.father.annual_income', updateStudent.parents.father.annual_income);
            form.setValue('parents.father.parent_status', updateStudent.parents.father.parent_status);
            form.setValue('parents.mother.mother_name', updateStudent.parents.mother.mother_name);
            form.setValue('parents.mother.middle_name', updateStudent.parents.mother.middle_name);
            form.setValue('parents.mother.last_name', updateStudent.parents.mother.last_name);
            form.setValue('parents.mother.profession', updateStudent.parents.mother.profession);
            form.setValue('parents.mother.designation', updateStudent.parents.mother.designation);
            form.setValue('parents.mother.residence_address', updateStudent.parents.mother.residence_address);
            form.setValue('parents.mother.office_address', updateStudent.parents.mother.office_address);
            form.setValue('parents.mother.email', updateStudent.parents.mother.email);
            form.setValue('parents.mother.alternate_email', updateStudent.parents.mother.alternate_email);
            form.setValue('parents.mother.dob', updateStudent.parents.mother.dob);
            form.setValue('parents.mother.mobile', updateStudent.parents.mother.mobile);
            form.setValue('parents.mother.phone', updateStudent.parents.mother.phone);
            form.setValue('parents.mother.company_name', updateStudent.parents.mother.company_name);
            form.setValue('parents.mother.business_details', updateStudent.parents.mother.business_details);
            form.setValue('parents.mother.qualification', updateStudent.parents.mother.qualification);
            form.setValue('parents.mother.service_in', updateStudent.parents.mother.service_in);
            form.setValue('parents.mother.office_phone', updateStudent.parents.mother.office_phone);
            form.setValue('parents.mother.office_mobile', updateStudent.parents.mother.office_mobile);
            form.setValue('parents.mother.office_extension', updateStudent.parents.mother.office_extension);
            form.setValue('parents.mother.office_email', updateStudent.parents.mother.office_email);
            form.setValue('parents.mother.office_website', updateStudent.parents.mother.office_website);
            form.setValue('parents.mother.annual_income', updateStudent.parents.mother.annual_income);
            form.setValue('parents.mother.dob', updateStudent.parents.mother.dob);





            // Others
            form.setValue('others.student_other_details.medical_history', updateStudent.others.student_other_details.medical_history);
            form.setValue('others.student_other_details.descriptions', updateStudent.others.student_other_details.descriptions);
            form.setValue('others.student_other_details.allergies', updateStudent.others.student_other_details.allergies);
            form.setValue('others.student_other_details.allergies_causes', updateStudent.others.student_other_details.allergies_causes);
            form.setValue('others.student_other_details.family_doctor_name', updateStudent.others.student_other_details.family_doctor_name);
            form.setValue('others.student_other_details.family_doctor_phone', updateStudent.others.student_other_details.family_doctor_phone);
            form.setValue('others.student_other_details.family_doctor_address', updateStudent.others.student_other_details.family_doctor_address);
            form.setValue('others.student_other_details.distance_from_home', updateStudent.others.student_other_details.distance_from_home);
            form.setValue('others.student_other_details.no_of_living_year', updateStudent.others.student_other_details.no_of_living_year);
            form.setValue('others.student_other_details.only_child', updateStudent.others.student_other_details.only_child);
            form.setValue('others.student_other_details.general_description', updateStudent.others.student_other_details.general_description);
            form.setValue('others.student_staff_relation.staff_ward', updateStudent.others.student_staff_relation.staff_ward);
            form.setValue('others.student_staff_relation.staff_name', updateStudent.others.student_staff_relation.staff_name);
            form.setValue('others.is_alumni.is_alumni', updateStudent.others.is_alumni.is_alumni);
            form.setValue('others.is_alumni.academic_session', updateStudent.others.is_alumni.academic_session);
            form.setValue('others.is_alumni.class_name', updateStudent.others.is_alumni.class_name);
            form.setValue('others.is_alumni.admission_number', updateStudent.others.is_alumni.admission_number);

            form.setValue('others.previous_school_details', updateStudent.others.previous_school_details);





            // Guardian
            form.setValue('guardian_details.guardian_name', updateStudent.guardian_details.guardian_name);
            form.setValue('guardian_details.profession', updateStudent.guardian_details.profession);
            form.setValue('guardian_details.designation', updateStudent.guardian_details.designation);
            form.setValue('guardian_details.company_name', updateStudent.guardian_details.company_name);
            form.setValue('guardian_details.business_details', updateStudent.guardian_details.business_details);
            form.setValue('guardian_details.qualification', updateStudent.guardian_details.qualification);
            form.setValue('guardian_details.if_single_parent.student_lives_with', updateStudent.guardian_details.if_single_parent.student_lives_with);
            form.setValue('guardian_details.if_single_parent.legal_custody_of_the_child', updateStudent.guardian_details.if_single_parent.legal_custody_of_the_child);
            form.setValue('guardian_details.if_single_parent.correspondence_to', updateStudent.guardian_details.if_single_parent.correspondence_to);
            form.setValue('guardian_details.if_single_parent.check_id_applicable', updateStudent.guardian_details.if_single_parent.check_id_applicable);
            form.setValue('guardian_details.if_single_parent.separation_reason', updateStudent.guardian_details.if_single_parent.separation_reason);


            // Documents
            form.setValue('documents', updateStudent.documents);


            // Dates
            setDob(moment(updateStudent.student.dob));
            setDoa(moment(updateStudent.student.doa));
            setDoj(moment(updateStudent.student.doj));
            setFatherDob(moment(updateStudent.parents.father.dob));
            setMotherDob(moment(updateStudent.parents.mother.dob));
            setAnniversaryDate(moment(updateStudent.parents.mother.anniversary_date));

        }
    }, [updateStudent]);
    useEffect(() => {
        if(valuesFromRegister.student.name !== ''){
            // Student
            form.setValue('student.class', valuesFromRegister.student.class);
            form.setValue('student.image', valuesFromRegister.student.image);
            form.setValue('student.stream', valuesFromRegister.student.stream);
            form.setValue('student.subjects', valuesFromRegister.student.subjects);
            form.setValue('student.optional_subject', valuesFromRegister.student.optional_subject);
            form.setValue('student.board', valuesFromRegister.student.board);
            form.setValue('student.name', valuesFromRegister.student.name);
            form.setValue('student.middle_name', valuesFromRegister.student.middle_name);
            form.setValue('student.last_name', valuesFromRegister.student.last_name);
            form.setValue('student.dob', valuesFromRegister.student.dob);
            form.setValue('student.place_of_birth', valuesFromRegister.student.place_of_birth);
            form.setValue('student.gender', valuesFromRegister.student.gender);
            form.setValue('student.contact_person_name', valuesFromRegister.student.contact_person_name);
            form.setValue('student.contact_person_mobile', valuesFromRegister.student.contact_person_mobile);
            form.setValue('student.contact_person_email', valuesFromRegister.student.contact_person_email);
            form.setValue('student.secondary_contact_no', valuesFromRegister.student.secondary_contact_no);
            form.setValue('student.h_no_and_streets', valuesFromRegister.student.h_no_and_streets);
            form.setValue('student.email', valuesFromRegister.student.email);
            form.setValue('student.city', valuesFromRegister.student.city);
            form.setValue('student.mobile', valuesFromRegister.student.mobile);
            form.setValue('student.state', valuesFromRegister.student.state);
            form.setValue('student.pin_code', valuesFromRegister.student.pin_code);
            form.setValue('student.aadhar_card_no', valuesFromRegister.student.aadhar_card_no);
            form.setValue('student.religion', valuesFromRegister.student.religion);
            form.setValue('student.caste', valuesFromRegister.student.caste);
            form.setValue('student.category', valuesFromRegister.student.category);
            form.setValue('student.blood_group', valuesFromRegister.student.blood_group);
            form.setValue('student.is_ews', valuesFromRegister.student.is_ews);
            form.setValue('student.sibling', valuesFromRegister.student.sibling);
            form.setValue('student.transport', valuesFromRegister.student.transport);
            form.setValue('student.nationality', valuesFromRegister.student.nationality);





            // Parents
            form.setValue('parents.father.father_name', valuesFromRegister.parents.father.father_name);
            form.setValue('parents.father.middle_name', valuesFromRegister.parents.father.middle_name);
            form.setValue('parents.father.last_name', valuesFromRegister.parents.father.last_name);
            form.setValue('parents.father.profession', valuesFromRegister.parents.father.profession);
            form.setValue('parents.father.designation', valuesFromRegister.parents.father.designation);
            form.setValue('parents.father.residence_address', valuesFromRegister.parents.father.residence_address);
            form.setValue('parents.father.office_address', valuesFromRegister.parents.father.office_address);
            form.setValue('parents.father.email', valuesFromRegister.parents.father.email);
            form.setValue('parents.father.alternate_email', valuesFromRegister.parents.father.alternate_email);
            form.setValue('parents.father.dob', valuesFromRegister.parents.father.dob);
            form.setValue('parents.father.mobile', valuesFromRegister.parents.father.mobile);
            form.setValue('parents.father.phone', valuesFromRegister.parents.father.phone);
            form.setValue('parents.father.company_name', valuesFromRegister.parents.father.company_name);
            form.setValue('parents.father.business_details', valuesFromRegister.parents.father.business_details);
            form.setValue('parents.father.qualification', valuesFromRegister.parents.father.qualification);
            form.setValue('parents.father.service_in', valuesFromRegister.parents.father.service_in);
            form.setValue('parents.father.office_phone', valuesFromRegister.parents.father.office_phone);
            form.setValue('parents.father.office_mobile', valuesFromRegister.parents.father.office_mobile);
            form.setValue('parents.father.office_extension', valuesFromRegister.parents.father.office_extension);
            form.setValue('parents.father.office_email', valuesFromRegister.parents.father.office_email);
            form.setValue('parents.father.office_website', valuesFromRegister.parents.father.office_website);
            form.setValue('parents.father.annual_income', valuesFromRegister.parents.father.annual_income);
            form.setValue('parents.father.parent_status', valuesFromRegister.parents.father.parent_status);
            form.setValue('parents.mother.mother_name', valuesFromRegister.parents.mother.mother_name);
            form.setValue('parents.mother.middle_name', valuesFromRegister.parents.mother.middle_name);
            form.setValue('parents.mother.last_name', valuesFromRegister.parents.mother.last_name);
            form.setValue('parents.mother.profession', valuesFromRegister.parents.mother.profession);
            form.setValue('parents.mother.designation', valuesFromRegister.parents.mother.designation);
            form.setValue('parents.mother.residence_address', valuesFromRegister.parents.mother.residence_address);
            form.setValue('parents.mother.office_address', valuesFromRegister.parents.mother.office_address);
            form.setValue('parents.mother.email', valuesFromRegister.parents.mother.email);
            form.setValue('parents.mother.alternate_email', valuesFromRegister.parents.mother.alternate_email);
            form.setValue('parents.mother.dob', valuesFromRegister.parents.mother.dob);
            form.setValue('parents.mother.mobile', valuesFromRegister.parents.mother.mobile);
            form.setValue('parents.mother.phone', valuesFromRegister.parents.mother.phone);
            form.setValue('parents.mother.company_name', valuesFromRegister.parents.mother.company_name);
            form.setValue('parents.mother.business_details', valuesFromRegister.parents.mother.business_details);
            form.setValue('parents.mother.qualification', valuesFromRegister.parents.mother.qualification);
            form.setValue('parents.mother.service_in', valuesFromRegister.parents.mother.service_in);
            form.setValue('parents.mother.office_phone', valuesFromRegister.parents.mother.office_phone);
            form.setValue('parents.mother.office_mobile', valuesFromRegister.parents.mother.office_mobile);
            form.setValue('parents.mother.office_extension', valuesFromRegister.parents.mother.office_extension);
            form.setValue('parents.mother.office_email', valuesFromRegister.parents.mother.office_email);
            form.setValue('parents.mother.office_website', valuesFromRegister.parents.mother.office_website);
            form.setValue('parents.mother.annual_income', valuesFromRegister.parents.mother.annual_income);
            form.setValue('parents.mother.dob', valuesFromRegister.parents.mother.dob);





            // Others
            form.setValue('others.student_other_details.medical_history', valuesFromRegister.others.student_other_details.medical_history);
            form.setValue('others.student_other_details.descriptions', valuesFromRegister.others.student_other_details.descriptions);
            form.setValue('others.student_other_details.allergies', valuesFromRegister.others.student_other_details.allergies);
            form.setValue('others.student_other_details.allergies_causes', valuesFromRegister.others.student_other_details.allergies_causes);
            form.setValue('others.student_other_details.family_doctor_name', valuesFromRegister.others.student_other_details.family_doctor_name);
            form.setValue('others.student_other_details.family_doctor_phone', valuesFromRegister.others.student_other_details.family_doctor_phone);
            form.setValue('others.student_other_details.family_doctor_address', valuesFromRegister.others.student_other_details.family_doctor_address);
            form.setValue('others.student_other_details.distance_from_home', valuesFromRegister.others.student_other_details.distance_from_home);
            form.setValue('others.student_other_details.no_of_living_year', valuesFromRegister.others.student_other_details.no_of_living_year);
            form.setValue('others.student_other_details.only_child', valuesFromRegister.others.student_other_details.only_child);
            form.setValue('others.student_other_details.general_description', valuesFromRegister.others.student_other_details.general_description);
            form.setValue('others.student_staff_relation.staff_ward', valuesFromRegister.others.student_staff_relation.staff_ward);
            form.setValue('others.student_staff_relation.staff_name', valuesFromRegister.others.student_staff_relation.staff_name);
            form.setValue('others.is_alumni.is_alumni', valuesFromRegister.others.is_alumni.is_alumni);
            form.setValue('others.is_alumni.academic_session', valuesFromRegister.others.is_alumni.academic_session);
            form.setValue('others.is_alumni.class_name', valuesFromRegister.others.is_alumni.class_name);
            form.setValue('others.is_alumni.admission_number', valuesFromRegister.others.is_alumni.admission_number);

            form.setValue('others.previous_school_details', valuesFromRegister.others.previous_school_details);





            // Guardian
            form.setValue('guardian_details.guardian_name', valuesFromRegister.guardian_details.guardian_name);
            form.setValue('guardian_details.profession', valuesFromRegister.guardian_details.profession);
            form.setValue('guardian_details.designation', valuesFromRegister.guardian_details.designation);
            form.setValue('guardian_details.company_name', valuesFromRegister.guardian_details.company_name);
            form.setValue('guardian_details.business_details', valuesFromRegister.guardian_details.business_details);
            form.setValue('guardian_details.qualification', valuesFromRegister.guardian_details.qualification);
            form.setValue('guardian_details.if_single_parent.student_lives_with', valuesFromRegister.guardian_details.if_single_parent.student_lives_with);
            form.setValue('guardian_details.if_single_parent.legal_custody_of_the_child', valuesFromRegister.guardian_details.if_single_parent.legal_custody_of_the_child);
            form.setValue('guardian_details.if_single_parent.correspondence_to', valuesFromRegister.guardian_details.if_single_parent.correspondence_to);
            form.setValue('guardian_details.if_single_parent.check_id_applicable', valuesFromRegister.guardian_details.if_single_parent.check_id_applicable);
            form.setValue('guardian_details.if_single_parent.separation_reason', valuesFromRegister.guardian_details.if_single_parent.separation_reason);


            // Dates
            setDob(moment(updateStudent.student.dob || moment()));
            setDoa(moment(updateStudent.student.doa || moment()));
            setDoj(moment(updateStudent.student.doj || moment()));
            setFatherDob(moment(updateStudent.parents.father.dob || moment()));
            setMotherDob(moment(updateStudent.parents.mother.dob || moment()));
            setAnniversaryDate(moment(updateStudent.parents.mother.anniversary_date || moment()));

        }
    }, [valuesFromRegister]);
    useEffect(() => {}, [form.watch('others')]);

    return (
        <div className='w-[95%] h-full max-w-[1500px] flex flex-col items-center'>
            <Form
                {...form}
            >
                {isLoading ? (
                    <LoadingIcon />
                ) : (
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-full h-full flex flex-col items-center px-2 sm:px-4'
                    >


                        {/* Tabs */}
                        <Tabs
                            defaultValue='student'
                            className='w-full h-[85%] border-[0.5px] border-[#ccc] rounded-[5px] overflow-scroll custom-sidebar-scrollbar'
                        >
                            <div className='flex justify-center w-full p-[2px]'>
                                <TabsList className='bg-[#F3F3F3] rounded-full'>
                                    <TabsTrigger
                                        value='student'
                                        onClick={() => setSelectedTab('student')}
                                        className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'student' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                                    >
                                        Student
                                        <p className='hidden ml-[4px] lg:inline'>Details</p>
                                    </TabsTrigger>

                                    <TabsTrigger
                                        value='parent'
                                        onClick={() => setSelectedTab('parent')}
                                        className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'parent' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                                    >
                                        Parent
                                        <p className='hidden ml-[4px] lg:inline'>Details</p>
                                    </TabsTrigger>

                                    <TabsTrigger
                                        value='other'
                                        onClick={() => setSelectedTab('other')}
                                        className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'other' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                                    >
                                        Other
                                        <p className='hidden ml-[4px] lg:inline'>Details</p>
                                    </TabsTrigger>

                                    <TabsTrigger
                                        value='guardian'
                                        onClick={() => setSelectedTab('guardian')}
                                        className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'guardian' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                                    >
                                        Guardian
                                        <p className='hidden ml-[4px] lg:inline'>Details</p>
                                    </TabsTrigger>

                                    <TabsTrigger
                                        value='document'
                                        onClick={() => setSelectedTab('document')}
                                        className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'document' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                                    >
                                        Document
                                        <p className='hidden ml-[4px] lg:inline'>Details</p>
                                    </TabsTrigger>

                                    {form.getValues().student.sibling && (
                                        <TabsTrigger
                                            value='sibling'
                                            onClick={() => setSelectedTab('sibling')}
                                            className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'sibling' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                                        >
                                            Sibling
                                            <p className='hidden ml-[4px] lg:inline'>Details</p>
                                        </TabsTrigger>
                                    )}
                                </TabsList>
                            </div>
                            <TabsContent value='student' className='pl-2 w-full'>
                                <Student
                                    form={form}
                                    setFile={setFile}
                                    students={students}
                                    registeredStudents={registeredStudents}
                                    imageSrc={imageSrc}
                                    setImageSrc={setImageSrc}
                                    setIsViewOpened={setIsViewOpened}
                                    setUpdateStudent={setUpdateStudent}
                                    updateStudent={updateStudent}
                                    setIsLoading={setIsLoading}
                                    setValuesFromRegister={setValuesFromRegister}
                                    valuesFromRegister={valuesFromRegister}
                                    selectedSubjects={selectedSubjects}
                                    setSelectedSubjects={setSelectedSubjects}
                                    setSelectedDocuments={setSelectedDocuments}
                                    dob={dob}
                                    setDob={setDob}
                                    doa={doa}
                                    setDoa={setDoa}
                                    doj={doj}
                                    setDoj={setDoj}
                                />
                            </TabsContent>
                            <TabsContent value='parent'>
                                <Parent
                                    form={form}
                                    fatherDob={fatherDob}
                                    setFatherDob={setFatherDob}
                                    motherDob={motherDob}
                                    setMotherDob={setMotherDob}
                                    anniversaryDate={anniversaryDate}
                                    setAnniversaryDate={setAnniversaryDate}
                                    designations={designations}
                                    professions={professions}
                                />
                            </TabsContent>
                            <TabsContent value='other'>
                                <Other
                                    form={form}
                                    updateStudent={updateStudent}
                                    previousSchoolsDetails={previousSchoolsDetails}
                                    setPreviousSchoolsDetails={setPreviousSchoolsDetails}
                                    staff={staff}
                                />
                            </TabsContent>
                            <TabsContent value='guardian'>
                                <Guardian
                                    form={form}
                                    designations={designations}
                                    professions={professions}
                                />
                            </TabsContent>
                            <TabsContent value='document'>
                                <Document
                                    selectedDocuments={selectedDocuments}
                                    setSelectedDocuments={setSelectedDocuments}
                                />
                            </TabsContent>
                            <TabsContent value='sibling'>
                                <Sibling
                                    setIsLoading={setIsLoading}
                                    setIsViewOpened={setIsViewOpened}
                                />
                            </TabsContent>
                        </Tabs>


                        {/* Buttons */}
                        <div className='sm:px-10'>
                            <Buttons
                                setIsViewOpened={setIsViewOpened}
                                students={students}
                                updateStudent={updateStudent}
                                setUpdateStudent={setUpdateStudent}
                                onSubmit={onSubmit}
                                form={form}
                                setFile={setFile}
                                setImageSrc={setImageSrc}
                                setValuesFromRegister={setValuesFromRegister}
                                setSelectedSubjects={setSelectedSubjects}
                                setSelectedDocuments={setSelectedDocuments}
                                setDob={setDob}
                                setDoa={setDoa}
                                setDoj={setDoj}
                                setFatherDob={setFatherDob}
                                setMotherDob={setMotherDob}
                                setAnniversaryDate={setAnniversaryDate}
                                setPreviousSchoolsDetails={setPreviousSchoolsDetails}
                            />
                        </div>
                    </form>
                )}
            </Form>
        </div>
    );
};





// Export
export default FormCom;