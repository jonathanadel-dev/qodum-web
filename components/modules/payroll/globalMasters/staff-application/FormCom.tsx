'use client';
// Imports
import * as z from 'zod';
import moment from 'moment';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import StaffRegistration from './forms/StaffRegistration';
import StaffDocumentDetails from './forms/StaffDocumentDetails';
import StaffExperienceDetails from './forms/StaffExperienceDetails';
import StaffEducationalDetails from './forms/StaffEducationalDetails';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {uploadStaffApplicationImage, uploadStaffPdf} from '@/lib/actions/image.actions';
import {fetchDepartments} from '@/lib/actions/payroll/globalMasters/department.actions';
import {fetchDesignations} from '@/lib/actions/payroll/globalMasters/designation.actions';
import {StaffApplicationValidation} from '@/lib/validations/payroll/globalMasters/staffApplication.validation';
import {fetchStaffAdmissionNumberByName} from '@/lib/actions/payroll/masterSettings/staffAdmissionNumber.actions';
import {createStaffApplication, deleteStaffApplication, modifyStaffApplication} from '@/lib/actions/payroll/globalMasters/staffApplication.actions';





// Main function
const FormCom = ({setIsViewOpened, staff, updateStaff, setUpdateStaff, setSelectedDocuments, selectedDocuments, educationalDetails, setEducationalDetails, experienceDetails, setExperienceDetails}:any) => {

    // Toast
    const {toast} = useToast();


    // Date states
    const [dateOfBirth, setDateOfBirth] = useState(moment());
    const [dateOfAnniversary, setDateOfAnniversary] = useState(moment());
    const [dateOfJoining, setDateOfJoining] = useState(moment());
    const [dateOfRetire, setDateOfRetire] = useState(moment());


    // Is Loading
    const [isLoading, setIsLoading] = useState(false);


    // Image file
    const [file, setFile] = useState(null);


    // Image source (For image preview)
    const [imageSrc, setImageSrc] = useState('');


    // Selected tab
    const [selectedTab, setSelectedTab] = useState('staff-registration');


    // Designations
    const [designations, setDesignations] = useState([{}]);


    // Departments
    const [departments, setDepartments] = useState([{}]);


    // Comparison object
    const comparisonObject = {
        // Staff registration
        staff_registration:{
            post:updateStaff.staff_registration.post,
            reg_no:updateStaff.staff_registration.reg_no,
            approved_teacher:updateStaff.staff_registration.approved_teacher,
            teacher_id:updateStaff.staff_registration.teacher_id,
            cbse_code:updateStaff.staff_registration.cbse_code,
            first_name_title:updateStaff.staff_registration.first_name_title,
            first_name:updateStaff.staff_registration.first_name,
            middle_name:updateStaff.staff_registration.middle_name,
            last_name:updateStaff.staff_registration.last_name,
            gender:updateStaff.staff_registration.gender,
            email:updateStaff.staff_registration.email,
            alternate_email:updateStaff.staff_registration.alternate_email,
            phone:updateStaff.staff_registration.phone,
            mobile:updateStaff.staff_registration.mobile,
            whatsapp_mobile:updateStaff.staff_registration.whatsapp_mobile,
            emergency_mobile:updateStaff.staff_registration.emergency_mobile,
            wing:updateStaff.staff_registration.wing,
            is_active:updateStaff.staff_registration.is_active,
            profile_picture:updateStaff.staff_registration.profile_picture,
            maritial_status:updateStaff.staff_registration.maritial_status,
            qualification:updateStaff.staff_registration.qualification,
            date_of_birth:updateStaff.staff_registration.date_of_birth,
            date_of_anniversary:updateStaff.staff_registration.date_of_anniversary,
            date_of_joining:updateStaff.staff_registration.date_of_joining,
            date_of_retire:updateStaff.staff_registration.date_of_retire,
            date_of_retire_is_extend:updateStaff.staff_registration.date_of_retire_is_extend,
            permenant_address:updateStaff.staff_registration.permenant_address,
            current_address:updateStaff.staff_registration.current_address,
            father_or_spouse_name:updateStaff.staff_registration.father_or_spouse_name,
            father_or_spouse_mobile:updateStaff.staff_registration.father_or_spouse_mobile,
            father_or_spouse_relation:updateStaff.staff_registration.father_or_spouse_relation,
            blood_group:updateStaff.staff_registration.blood_group,
            staff_type:updateStaff.staff_registration.staff_type,
            designation:updateStaff.staff_registration.designation,
            department:updateStaff.staff_registration.department,
            religion:updateStaff.staff_registration.religion,
            aadhar_card_no:updateStaff.staff_registration.aadhar_card_no
        },

        // Staff educational details
        staff_educational_details:updateStaff.staff_educational_details,

        // Staff experience details
        staff_experience_details:updateStaff.staff_experience_details,

        // Staff document details
        staff_document_details:updateStaff.staff_document_details
    };


    // Form
    const form = useForm({
        resolver:zodResolver(StaffApplicationValidation),
        defaultValues:{
            // Staff registration
            staff_registration:{
                post:updateStaff.id === '' ? '' : updateStaff.staff_registration.post,
                reg_no:updateStaff.id === '' ? '' : updateStaff.staff_registration.reg_no,
                approved_teacher:updateStaff.id === '' ? '' : updateStaff.staff_registration.approved_teacher,
                teacher_id:updateStaff.id === '' ? '' : updateStaff.staff_registration.teacher_id,
                cbse_code:updateStaff.id === '' ? '' : updateStaff.staff_registration.cbse_code,
                first_name_title:updateStaff.id === '' ? 'Mr.' : updateStaff.staff_registration.first_name_title,
                first_name:updateStaff.id === '' ? '' : updateStaff.staff_registration.first_name,
                middle_name:updateStaff.id === '' ? '' : updateStaff.staff_registration.middle_name,
                last_name:updateStaff.id === '' ? '' : updateStaff.staff_registration.last_name,
                gender:updateStaff.id === '' ? 'Male' : updateStaff.staff_registration.gender,
                email:updateStaff.id === '' ? '' : updateStaff.staff_registration.email,
                alternate_email:updateStaff.id === '' ? '' : updateStaff.staff_registration.alternate_email,
                phone:updateStaff.id === '' ? 0 : updateStaff.staff_registration.phone,
                mobile:updateStaff.id === '' ? 0 : updateStaff.staff_registration.mobile,
                whatsapp_mobile:updateStaff.id === '' ? 0 : updateStaff.staff_registration.whatsapp_mobile,
                emergency_mobile:updateStaff.id === '' ? 0 : updateStaff.staff_registration.emergency_mobile,
                wing:updateStaff.id === '' ? '' : updateStaff.staff_registration.wing,
                is_active:updateStaff.id === '' ? false : updateStaff.staff_registration.is_active,
                profile_picture:updateStaff.id === '' ? '' : updateStaff.staff_registration.profile_picture,
                maritial_status:updateStaff.id === '' ? 'Married' : updateStaff.staff_registration.maritial_status,
                qualification:updateStaff.id === '' ? '' : updateStaff.staff_registration.qualification,
                date_of_birth:updateStaff.id === '' ? new Date() : updateStaff.staff_registration.date_of_birth,
                date_of_anniversary:updateStaff.id === '' ? new Date() : updateStaff.staff_registration.date_of_anniversary,
                date_of_joining:updateStaff.id === '' ? new Date() : updateStaff.staff_registration.date_of_joining,
                date_of_retire:updateStaff.id === '' ? new Date() : updateStaff.staff_registration.date_of_retire,
                date_of_retire_is_extend:updateStaff.id === '' ? false : updateStaff.staff_registration.date_of_retire_is_extend,
                permenant_address:updateStaff.id === '' ? '' : updateStaff.staff_registration.permenant_address,
                current_address:updateStaff.id === '' ? '' : updateStaff.staff_registration.current_address,
                father_or_spouse_name:updateStaff.id === '' ? '' : updateStaff.staff_registration.father_or_spouse_name,
                father_or_spouse_mobile:updateStaff.id === '' ? 0 : updateStaff.staff_registration.father_or_spouse_mobile,
                father_or_spouse_relation:updateStaff.id === '' ? '' : updateStaff.staff_registration.father_or_spouse_relation,
                blood_group:updateStaff.id === '' ? '' : updateStaff.staff_registration.blood_group,
                staff_type:updateStaff.id === '' ? '' : updateStaff.staff_registration.staff_type,
                designation:updateStaff.id === '' ? '' : updateStaff.staff_registration.designation,
                department:updateStaff.id === '' ? '' : updateStaff.staff_registration.department,
                religion:updateStaff.id === '' ? '' : updateStaff.staff_registration.religion,
                aadhar_card_no:updateStaff.id === '' ? 0 : updateStaff.staff_registration.aadhar_card_no
            },

            // Staff educational details
            staff_educational_details:updateStaff.id === '' ? [] : updateStaff.staff_educational_details,

            // Staff experience details
            staff_experience_details:updateStaff.id === '' ? [] : updateStaff.staff_experience_details,

            // Staff document details
            staff_document_details:updateStaff.id === '' ? [] : updateStaff.staff_document_details
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof StaffApplicationValidation>) => {

        // Set is loading to true
        setIsLoading(true);


        // Create staff
        if(updateStaff.id === ''){
            if(staff.map((s:any) => s.staff_registration.reg_no).includes(values.staff_registration.reg_no)){
                toast({title:'Registration no. already exists', variant:'error'});
                setIsLoading(false);
                return;
            };
            const randomNumber = Math.floor(Math.random() * 1000000) + 1;
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                await uploadStaffApplicationImage({data:formData, reg_no:`${values.staff_registration.first_name.toLowerCase().replace(/\s+/g, '-')}-${randomNumber}`});
            };
            if(selectedDocuments.filter((s:any) => s.files.length > 0).length){
                selectedDocuments.map((s:any) => s.files.map(async (f:any) => {
                    const formData = new FormData();
                    formData.append('file', f.file);
                    await uploadStaffPdf({data:formData, reg_no:`${form.getValues().staff_registration.first_name.toLowerCase().replace(/\s+/g, '-')}-${f.file_name}-${randomNumber}`, content_type:f.file.type});
                }));
            };
            const res = await createStaffApplication({
                // Staff registration
                staff_registration:{
                    post:values.staff_registration.post,
                    reg_no:values.staff_registration.reg_no,
                    approved_teacher:values.staff_registration.approved_teacher,
                    teacher_id:values.staff_registration.teacher_id,
                    cbse_code:values.staff_registration.cbse_code,
                    first_name_title:values.staff_registration.first_name_title,
                    first_name:values.staff_registration.first_name,
                    middle_name:values.staff_registration.middle_name,
                    last_name:values.staff_registration.last_name,
                    gender:values.staff_registration.gender,
                    email:values.staff_registration.email,
                    alternate_email:values.staff_registration.alternate_email,
                    phone:values.staff_registration.phone,
                    mobile:values.staff_registration.mobile,
                    whatsapp_mobile:values.staff_registration.whatsapp_mobile,
                    emergency_mobile:values.staff_registration.emergency_mobile,
                    wing:values.staff_registration.wing,
                    is_active:values.staff_registration.is_active,
                    profile_picture:file !== null ? `https://qodum.s3.amazonaws.com/staff-application/${values.staff_registration.first_name.toLowerCase().replace(/\s+/g, '-')}-${randomNumber}` : values.staff_registration.profile_picture || '',
                    maritial_status:values.staff_registration.maritial_status,
                    qualification:values.staff_registration.qualification,
                    date_of_birth:values.staff_registration.date_of_birth,
                    date_of_anniversary:values.staff_registration.date_of_anniversary,
                    date_of_joining:values.staff_registration.date_of_joining,
                    date_of_retire:values.staff_registration.date_of_retire,
                    date_of_retire_is_extend:values.staff_registration.date_of_retire_is_extend,
                    permenant_address:values.staff_registration.permenant_address,
                    current_address:values.staff_registration.current_address,
                    father_or_spouse_name:values.staff_registration.father_or_spouse_name,
                    father_or_spouse_mobile:values.staff_registration.father_or_spouse_mobile,
                    father_or_spouse_relation:values.staff_registration.father_or_spouse_relation,
                    blood_group:values.staff_registration.blood_group,
                    staff_type:values.staff_registration.staff_type,
                    designation:values.staff_registration.designation,
                    department:values.staff_registration.department,
                    religion:values.staff_registration.religion,
                    aadhar_card_no:values.staff_registration.aadhar_card_no
                },

                // Staff educational details
                staff_educational_details:educationalDetails,

                // Staff experience details
                staff_experience_details:experienceDetails,

                // staff document details
                staff_document_details:selectedDocuments.map((s:any) => {
                    return{
                        ...s,
                        files:s?.files?.map((f:any) => {
                            return `https://qodum.s3.amazonaws.com/staff-documents/${form.getValues().staff_registration.first_name.toLowerCase().replace(/\s+/g, '-')}-${f.file_name}-${randomNumber}`;
                        })
                    }
                })
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }

        // Modify staff
        else if(
            !deepEqual(comparisonObject, values)
            || file
            || comparisonObject.staff_document_details !== selectedDocuments
            || comparisonObject.staff_educational_details !== educationalDetails
            || comparisonObject.staff_experience_details !== experienceDetails
            || moment(values.staff_registration.date_of_birth).format('DD-MM-YYYY') !== moment(comparisonObject.staff_registration.date_of_birth).format('DD-MM-YYYY')
            || moment(values.staff_registration.date_of_anniversary).format('DD-MM-YYYY') !== moment(comparisonObject.staff_registration.date_of_anniversary).format('DD-MM-YYYY')
            || moment(values.staff_registration.date_of_joining).format('DD-MM-YYYY') !== moment(comparisonObject.staff_registration.date_of_joining).format('DD-MM-YYYY')
            || moment(values.staff_registration.date_of_retire).format('DD-MM-YYYY') !== moment(comparisonObject.staff_registration.date_of_retire).format('DD-MM-YYYY')
        ){
            if(comparisonObject.staff_registration.reg_no !== values.staff_registration.reg_no && staff.map((s:any) => s.staff_registration.reg_no).includes(values.staff_registration.reg_no)){
                toast({title:'Registration no. already exists', variant:'error'});
                setIsLoading(false);
                return;
            };
            const randomNumber = Math.floor(Math.random() * 1000000) + 1;
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                await uploadStaffApplicationImage({data:formData, reg_no:`${values.staff_registration.first_name.toLowerCase().replace(/\s+/g, '-')}-${randomNumber}`});
            };
            if(selectedDocuments.filter((s:any) => s.files.filter((f:any) => f.file).length > 0).length){
                selectedDocuments.map((s:any) => s.files.map(async (f:any) => {
                    const formData = new FormData();
                    formData.append('file', f.file);
                    await uploadStaffPdf({data:formData, reg_no:`${form.getValues().staff_registration.first_name.toLowerCase().replace(/\s+/g, '-')}-${f.file_name}-${randomNumber}`, content_type:f.file.type});
                }));
            };
            // Update
            await modifyStaffApplication({
                id:updateStaff.id,
                // Staff registration
                staff_registration:{
                    post:values.staff_registration.post,
                    reg_no:values.staff_registration.reg_no,
                    approved_teacher:values.staff_registration.approved_teacher,
                    teacher_id:values.staff_registration.teacher_id,
                    cbse_code:values.staff_registration.cbse_code,
                    first_name_title:values.staff_registration.first_name_title,
                    first_name:values.staff_registration.first_name,
                    middle_name:values.staff_registration.middle_name,
                    last_name:values.staff_registration.last_name,
                    gender:values.staff_registration.gender,
                    email:values.staff_registration.email,
                    alternate_email:values.staff_registration.alternate_email,
                    phone:values.staff_registration.phone,
                    mobile:values.staff_registration.mobile,
                    whatsapp_mobile:values.staff_registration.whatsapp_mobile,
                    emergency_mobile:values.staff_registration.emergency_mobile,
                    wing:values.staff_registration.wing,
                    is_active:values.staff_registration.is_active,
                    profile_picture:file !== null ? `https://qodum.s3.amazonaws.com/staff-application/${values.staff_registration.first_name.toLowerCase().replace(/\s+/g, '-')}-${randomNumber}` : comparisonObject.staff_registration.profile_picture,
                    maritial_status:values.staff_registration.maritial_status,
                    qualification:values.staff_registration.qualification,
                    date_of_birth:values.staff_registration.date_of_birth,
                    date_of_anniversary:values.staff_registration.date_of_anniversary,
                    date_of_joining:values.staff_registration.date_of_joining,
                    date_of_retire:values.staff_registration.date_of_retire,
                    date_of_retire_is_extend:values.staff_registration.date_of_retire_is_extend,
                    permenant_address:values.staff_registration.permenant_address,
                    current_address:values.staff_registration.current_address,
                    father_or_spouse_name:values.staff_registration.father_or_spouse_name,
                    father_or_spouse_mobile:values.staff_registration.father_or_spouse_mobile,
                    father_or_spouse_relation:values.staff_registration.father_or_spouse_relation,
                    blood_group:values.staff_registration.blood_group,
                    staff_type:values.staff_registration.staff_type,
                    designation:values.staff_registration.designation,
                    department:values.staff_registration.department,
                    religion:values.staff_registration.religion,
                    aadhar_card_no:values.staff_registration.aadhar_card_no
                },

                // Staff educational details
                staff_educational_details:educationalDetails,

                // Staff experience details
                staff_experience_details:experienceDetails,

                // Staff document details
                staff_document_details:selectedDocuments.map((s:any) => {
                    return{
                        ...s,
                        files:s?.files?.map((f:any) => {
                            return f.file ? `https://qodum.s3.amazonaws.com/staff-documents/${form.getValues().staff_registration.first_name.toLowerCase().replace(/\s+/g, '-')}-${f.file_name}-${randomNumber}` : f;
                        })
                    }
                })
            });
            toast({title:'Updated Successfully!'});
        }


        // Delete staff
        else if(updateStaff.isDeleteClicked){
            await deleteStaffApplication({id:updateStaff.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateStaff({
            id:'',
            isDeleteClicked:false,

            // Staff registration
            staff_registration:{
                post:'',
                reg_no:'',
                approved_teacher:'',
                teacher_id:'',
                cbse_code:'',
                first_name_title:'Mr.',
                first_name:'',
                middle_name:'',
                last_name:'',
                gender:'Male',
                email:'',
                alternate_email:'',
                phone:0,
                mobile:0,
                whatsapp_mobile:0,
                emergency_mobile:0,
                wing:'',
                is_active:false,
                profile_picture:'',
                maritial_status:'Married',
                qualification:'',
                date_of_birth:new Date(),
                date_of_anniversary:new Date(),
                date_of_joining:new Date(),
                date_of_retire:new Date(),
                date_of_retire_is_extend:false,
                permenant_address:'',
                current_address:'',
                father_or_spouse_name:'',
                father_or_spouse_mobile:0,
                father_or_spouse_relation:'Father',
                blood_group:'',
                staff_type:'',
                designation:'',
                department:'',
                religion:'',
                aadhar_card_no:0
            },

            // Staff educational details
            staff_educational_details:[],

            // Staff experience details
            staff_experience_details:[],

            // Staff document details
            staff_document_details:[]
        });
        // Reseting form
        form.reset({
            // Staff registration
            staff_registration:{
                post:'',
                reg_no:'',
                approved_teacher:'',
                teacher_id:'',
                cbse_code:'',
                first_name_title:'Mr.',
                first_name:'',
                middle_name:'',
                last_name:'',
                gender:'Male',
                email:'',
                alternate_email:'',
                phone:0,
                mobile:0,
                whatsapp_mobile:0,
                emergency_mobile:0,
                wing:'',
                is_active:false,
                profile_picture:'',
                maritial_status:'Married',
                qualification:'',
                date_of_birth:new Date(),
                date_of_anniversary:new Date(),
                date_of_joining:new Date(),
                date_of_retire:new Date(),
                date_of_retire_is_extend:false,
                permenant_address:'',
                current_address:'',
                father_or_spouse_name:'',
                father_or_spouse_mobile:0,
                father_or_spouse_relation:'Father',
                blood_group:'',
                staff_type:'',
                designation:'',
                department:'',
                religion:'',
                aadhar_card_no:0
            },

            // Staff educational details
            staff_educational_details:[],

            // Staff experience details
            staff_experience_details:[],

            // Staff document details
            staff_document_details:[]
        });
        setFile(null);
        setImageSrc('');
        setDateOfBirth(moment());
        setDateOfAnniversary(moment());
        setDateOfJoining(moment());
        setDateOfRetire(moment());
        setSelectedDocuments([]);
        setEducationalDetails([{
            qualification:'',
            name_of_school_or_college:'',
            name_of_board_or_universtity:'',
            rc:'',
            subjects:[],
            percentage_of_marks:0,
            year_of_passing:''
        }]);
        setExperienceDetails([{
            intuition_name:'',
            department:'',
            designation:'',
            subjects:[],
            role:'',
            total_experience:'',
            period:''
        }]);


        // Setting is loadind to false
        setIsLoading(false);

    };


    // Use Effects
    useEffect(() => {
        if(updateStaff.id !== ''){
            setDateOfBirth(moment(updateStaff.staff_registration.date_of_birth));
            setDateOfAnniversary(moment(updateStaff.staff_registration.date_of_anniversary));
            setDateOfJoining(moment(updateStaff.staff_registration.date_of_joining));
            setDateOfRetire(moment(updateStaff.staff_registration.date_of_retire));
        };
        const fetcher = async () => {
            const designationsRes = await fetchDesignations();
            const departmentsRes = await fetchDepartments();
            setDesignations(designationsRes);
            setDepartments(departmentsRes);
        };
        fetcher();
    }, []);
    useEffect(() => {
        if(updateStaff.id !== ''){

            // Staff registration
            form.setValue('staff_registration.post', updateStaff.staff_registration.post);
            form.setValue('staff_registration.reg_no', updateStaff.staff_registration.reg_no);
            form.setValue('staff_registration.approved_teacher', updateStaff.staff_registration.approved_teacher);
            form.setValue('staff_registration.teacher_id', updateStaff.staff_registration.teacher_id);
            form.setValue('staff_registration.cbse_code', updateStaff.staff_registration.cbse_code);
            form.setValue('staff_registration.first_name_title', updateStaff.staff_registration.first_name_title);
            form.setValue('staff_registration.first_name', updateStaff.staff_registration.first_name);
            form.setValue('staff_registration.middle_name', updateStaff.staff_registration.middle_name);
            form.setValue('staff_registration.last_name', updateStaff.staff_registration.last_name);
            form.setValue('staff_registration.gender', updateStaff.staff_registration.gender);
            form.setValue('staff_registration.email', updateStaff.staff_registration.email);
            form.setValue('staff_registration.alternate_email', updateStaff.staff_registration.alternate_email);
            form.setValue('staff_registration.phone', updateStaff.staff_registration.phone);
            form.setValue('staff_registration.mobile', updateStaff.staff_registration.mobile);
            form.setValue('staff_registration.whatsapp_mobile', updateStaff.staff_registration.whatsapp_mobile);
            form.setValue('staff_registration.emergency_mobile', updateStaff.staff_registration.emergency_mobile);
            form.setValue('staff_registration.wing', updateStaff.staff_registration.wing);
            form.setValue('staff_registration.is_active', updateStaff.staff_registration.is_active);
            form.setValue('staff_registration.profile_picture', updateStaff.staff_registration.profile_picture);
            form.setValue('staff_registration.maritial_status', updateStaff.staff_registration.maritial_status);
            form.setValue('staff_registration.qualification', updateStaff.staff_registration.qualification);
            form.setValue('staff_registration.date_of_birth', updateStaff.staff_registration.date_of_birth);
            form.setValue('staff_registration.date_of_anniversary', updateStaff.staff_registration.date_of_anniversary);
            form.setValue('staff_registration.date_of_joining', updateStaff.staff_registration.date_of_joining);
            form.setValue('staff_registration.date_of_retire', updateStaff.staff_registration.date_of_retire);
            form.setValue('staff_registration.date_of_retire_is_extend', updateStaff.staff_registration.date_of_retire_is_extend);
            form.setValue('staff_registration.permenant_address', updateStaff.staff_registration.permenant_address);
            form.setValue('staff_registration.current_address', updateStaff.staff_registration.current_address);
            form.setValue('staff_registration.father_or_spouse_name', updateStaff.staff_registration.father_or_spouse_name);
            form.setValue('staff_registration.father_or_spouse_mobile', updateStaff.staff_registration.father_or_spouse_mobile);
            form.setValue('staff_registration.father_or_spouse_relation', updateStaff.staff_registration.father_or_spouse_relation);
            form.setValue('staff_registration.blood_group', updateStaff.staff_registration.blood_group);
            form.setValue('staff_registration.staff_type', updateStaff.staff_registration.staff_type);
            form.setValue('staff_registration.designation', updateStaff.staff_registration.designation);
            form.setValue('staff_registration.department', updateStaff.staff_registration.department);
            form.setValue('staff_registration.religion', updateStaff.staff_registration.religion);
            form.setValue('staff_registration.aadhar_card_no', updateStaff.staff_registration.aadhar_card_no);

            // Setting values for staff_educational_details
            form.setValue('staff_educational_details', updateStaff.staff_educational_details);

            // Setting values for staff_experience_details
            form.setValue('staff_experience_details', updateStaff.staff_experience_details);

            // Staff document details
            form.setValue('staff_document_details', updateStaff.staff_document_details);

        }
    }, [updateStaff]);
    useEffect(() => {
        if(updateStaff.id === ''){
            const createRegNo = async () => {
                let substringValue;
                if(staff?.length < 9){
                    substringValue = 0;
                }else if(staff?.length >= 9){
                    substringValue = 1;
                }else if(staff?.length >= 99){
                    substringValue = 2;
                }else if(staff?.length >= 999){
                    substringValue = 3;
                }else if(staff?.length >= 9999){
                    substringValue = 4;
                }else if(staff?.length >= 99999){
                    substringValue = 5;
                }else if(staff?.length >= 999999){
                    substringValue = 6;
                };
                const admissionNumber = await fetchStaffAdmissionNumberByName({name:'Applicant Reg. No.'});
                form.setValue('staff_registration.reg_no', admissionNumber ? `${admissionNumber?.prefix}${admissionNumber?.lead_zero.substring(substringValue, admissionNumber?.lead_zero?.length - 1)}${staff?.length + 1}${admissionNumber?.suffix}` : '');
            };
            createRegNo();
        };
    }, [staff]);
    useEffect(() => {}, [form.watch('staff_registration.date_of_retire_is_extend')]);
    useEffect(() => {}, [form.watch('staff_registration.is_active')]);

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
                            defaultValue='staff-registration'
                            className='h-full w-full border-[0.5px] border-[#ccc] rounded-[5px] overflow-scroll custom-sidebar-scrollbar'
                        >

                            {/* Triggers */}
                            <div className='flex justify-center w-full p-[2px]'>
                                <TabsList className='bg-[#F3F3F3] rounded-full'>
                                    <TabsTrigger
                                        value='staff-registration'
                                        onClick={() => setSelectedTab('staff-registration')}
                                        className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'staff-registration' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                                    >
                                        Registration
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value='staff-educational-details'
                                        onClick={() => setSelectedTab('staff-educational-details')}
                                        className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'staff-educational-details' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                                    >
                                        Educational Details
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value='staff-experience-details'
                                        onClick={() => setSelectedTab('staff-experience-details')}
                                        className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'staff-experience-details' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                                    >
                                        Experience Details
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value='staff-document-details'
                                        onClick={() => setSelectedTab('staff-document-details')}
                                        className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'staff-document-details' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                                    >
                                        Document Details
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            {/* Content */}
                            <TabsContent value='staff-registration' className='pl-2 w-full'>
                                <StaffRegistration
                                    form={form}
                                    setFile={setFile}
                                    staff={staff}
                                    imageSrc={imageSrc}
                                    setImageSrc={setImageSrc}
                                    setIsViewOpened={setIsViewOpened}
                                    setUpdateStaff={setUpdateStaff}
                                    updateStaff={updateStaff}
                                    setIsLoading={setIsLoading}
                                    dateOfBirth={dateOfBirth}
                                    setDateOfBirth={setDateOfBirth}
                                    dateOfAnniversary={dateOfAnniversary}
                                    setDateOfAnniversary={setDateOfAnniversary}
                                    dateOfJoining={dateOfJoining}
                                    setDateOfJoining={setDateOfJoining}
                                    dateOfRetire={dateOfRetire}
                                    setDateOfRetire={setDateOfRetire}
                                    setSelectedDocuments={setSelectedDocuments}
                                    setEducationalDetails={setEducationalDetails}
                                    setExperienceDetails={setExperienceDetails}
                                    designations={designations}
                                    departments={departments}
                                />
                            </TabsContent>
                            <TabsContent value='staff-educational-details'>
                                <StaffEducationalDetails
                                    educationalDetails={educationalDetails}
                                    setEducationalDetails={setEducationalDetails}
                                />
                            </TabsContent>
                            <TabsContent value='staff-experience-details'>
                                <StaffExperienceDetails
                                    experienceDetails={experienceDetails}
                                    setExperienceDetails={setExperienceDetails}
                                    departments={departments}
                                    designations={designations}
                                />
                            </TabsContent>
                            <TabsContent value='staff-document-details'>
                                <StaffDocumentDetails
                                    setSelectedDocuments={setSelectedDocuments}
                                    selectedDocuments={selectedDocuments}
                                />
                            </TabsContent>
                        </Tabs>


                        {/* Buttons */}
                        <div className='sm:px-10'>
                            <Buttons
                                setIsViewOpened={setIsViewOpened}
                                staff={staff}
                                updateStaff={updateStaff}
                                setUpdateStaff={setUpdateStaff}
                                onSubmit={onSubmit}
                                form={form}
                                setFile={setFile}
                                setImageSrc={setImageSrc}
                                setDateOfBirth={setDateOfBirth}
                                setDateOfAnniversary={setDateOfAnniversary}
                                setDateOfJoining={setDateOfJoining}
                                setDateOfRetire={setDateOfRetire}
                                setSelectedDocuments={setSelectedDocuments}
                                setEducationalDetails={setEducationalDetails}
                                setExperienceDetails={setExperienceDetails}
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