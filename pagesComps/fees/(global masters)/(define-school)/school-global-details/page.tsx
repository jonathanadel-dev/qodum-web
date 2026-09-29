'use client';
// Imports
import {useEffect, useState} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {fetchBoards} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import FormCom from '@/components/modules/fees/globalMasters/defineSchool/schoolGlobalDetails/FormCom';
import ViewCom from '@/components/modules/fees/globalMasters/defineSchool/schoolGlobalDetails/ViewCom';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Schools Details
    const [schoolsDetails, setSchoolsDetails] = useState([{}]);


    // Boards
    const [boards, setBoards] = useState([{}]);


    // Update school details
    const [updateSchoolDetails, setUpdateSchoolDetails] = useState({
        id:'',
        isDeleteClicked:false,
        logo:'',
        school_main:false,
        school_subheads:false,
        school_name:'',
        school_address:'',
        school_address_2:'',
        school_short_name:'',
        contact_no:'',
        mobile:'',
        email:'',
        support_email_id:'',
        website:'',
        prefix:'',
        iso_details:'',
        principal_signature:'',
        accountant_signature:'',
        school_no:'',
        affiliation_to:'',
        affiliation_no:'',
        udise_code:'',
        pen:'',
        associates:'',
        renew_up_to:'',
        school_status:'',
        working_days:'',
        recess:'',
        total_period:'',
        academic_year:'',
        financial_year:'',
        facebook_link:'',
        linkedin_link:'',
        twitter_link:'',
        instagram_link:''
    });

    
    // Use effect
    useEffect(() => {
        const schoolsDetailsFetcher = async () => {
            const schoolRes = await fetchGlobalSchoolDetails();
            const boardsRes = await fetchBoards();
            setSchoolsDetails(schoolRes);
            setBoards(boardsRes);
        };
        schoolsDetailsFetcher();
    }, [isViewOpened, updateSchoolDetails]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isLoading ? (
                    <LoadingIcon />
                ) : isViewOpened ? (
                    <ViewCom
                        schoolsDetails={schoolsDetails}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateSchoolDetails={setUpdateSchoolDetails}
                    />
                ) : (
                    <FormCom
                        boards={boards}
                        schoolsDetails={schoolsDetails}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateSchoolDetails={updateSchoolDetails}
                        setUpdateSchoolDetails={setUpdateSchoolDetails}
                        setIsLoading={setIsLoading}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;