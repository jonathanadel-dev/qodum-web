'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/payroll/globalMasters/staff-application/FormCom';
import ViewCom from '@/components/modules/payroll/globalMasters/staff-application/ViewCom';
import {fetchStaffApplication} from '@/lib/actions/payroll/globalMasters/staffApplication.actions';
import { fetchAdmissionStates } from '@/lib/actions/payroll/globalMasters/admissionStates.actions';
import LoadingIcon from '@/components/shared/LoadingIcon';





// Main function
const page = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Admission states
    const [admissionStates, setAdmissionStates] = useState({is_students_admission_opened:false, is_staff_admission_opened:false});


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Staff
    const [staff, setStaff] = useState([{}]);


    // Selected documents
    const [selectedDocuments, setSelectedDocuments] = useState([]);


    // Educational details
    const [educationalDetails, setEducationalDetails] = useState([{
        qualification:'',
        program_or_steam:'',
        name_of_board_or_universtity:'',
        subjects:[],
        year_of_passing:'',
        maximum_marks:0,
        obtains_marks:0,
        percentage:0
    }]);


    // Experience details
    const [experienceDetails, setExperienceDetails] = useState([{
        intuition_name:'',
        department:'',
        designation:'',
        subjects:[],
        role:'',
        total_experience:'',
        period:''
    }]);


    // Update staff
    const [updateStaff, setUpdateStaff] = useState({
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
        staff_educational_details:[{
            qualification:'',
            program_or_steam:'',
            name_of_board_or_universtity:'',
            subjects:[],
            year_of_passing:'',
            maximum_marks:0,
            obtains_marks:0,
            percentage:0
        }],

        // Staff experience details
        staff_experience_details:[{
            intuition_name:'',
            department:'',
            designation:'',
            subjects:[],
            role:'',
            total_experience:'',
            period:''
        }],

        // Staff document details
        staff_document_details:[]

    });


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            setIsLoading(true);
            const staffRes = await fetchStaffApplication();
            const admissionStatesRes = await fetchAdmissionStates();
            setStaff(staffRes);
            setAdmissionStates(admissionStatesRes ? admissionStatesRes : admissionStates);
            setIsLoading(false);
        };
        fetcher();
    }, [isViewOpened, updateStaff]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-2 bg-white overflow-hidden'>
            {
                isLoading ? (
                    <LoadingIcon />
                ) : admissionStates.is_staff_admission_opened ?
                isViewOpened ? (
                    <ViewCom
                        staff={staff}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateStaff={setUpdateStaff}
                        setSelectedDocuments={setSelectedDocuments}
                        setEducationalDetails={setEducationalDetails}
                        setExperienceDetails={setExperienceDetails}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        staff={staff}
                        updateStaff={updateStaff}
                        setUpdateStaff={setUpdateStaff}
                        selectedDocuments={selectedDocuments}
                        setSelectedDocuments={setSelectedDocuments}
                        educationalDetails={educationalDetails}
                        setEducationalDetails={setEducationalDetails}
                        experienceDetails={experienceDetails}
                        setExperienceDetails={setExperienceDetails}
                    />
                ) : (
                    <p className='text-xs text-red-500'>Admission is Closed!</p>
                )
            }
        </div>
    );
};





// Export
export default page;