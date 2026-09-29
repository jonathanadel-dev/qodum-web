// Imports
import StaffList from './StaffList';
import {AuthContext} from '@/context/AuthContext';
import {useToast} from '@/components/ui/use-toast';
import {useContext, useEffect, useState} from 'react';
import {applyStaffForAdmission, fetchStaffApplicationsNotUpForAdmission} from '@/lib/actions/payroll/globalMasters/staffApplication.actions';
import moment from 'moment';
import MyDatePicker from '@/components/shared/CustomDatePicker';





// Main function
function FormCom() {

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


    // Toast
    const {toast} = useToast();


    // Dates
    const [joiningDateFrom, setJoiningDateFrom] = useState(moment());
    const [joiningDateTo, setJoiningDateTo] = useState(moment());


    // Staff applications
    const [staffApplications, setStaffApplications] = useState<any>([]);


    // Selected staff applications
    const [selectedStaffApplications, setSelectedStaffApplications] = useState([]);


    // Submit handler
    const onSubmit = async () => {
        try {

            // No staff applications validation
            if(selectedStaffApplications.length === 0){
                toast({title:'Please select staff applications', variant:'alert'});
                return;
            };

            // Applying for admission
            await applyStaffForAdmission({reg_nos:selectedStaffApplications});

            // Reseting
            setStaffApplications([{}]);
            setSelectedStaffApplications([]);
            setJoiningDateFrom(moment());
            setJoiningDateTo(moment());
            toast({title:'Updated Successfully!'});

        } catch (err: any) {
            console.log(err);
        }
    };


    // Get staff applications
    const getStaffApplications = async () => {
        // @ts-ignore
        const staffApplicationsRes = await fetchStaffApplicationsNotUpForAdmission({joiningDateFrom:joiningDateFrom._d, joiningDateTo:joiningDateTo._d});
        if(staffApplicationsRes.length > 0){
            setStaffApplications(staffApplicationsRes);
            // @ts-ignore
            setSelectedStaffApplications(staffApplicationsRes.map((s:any) => s?.staff_registration?.reg_no));
        }else{
            toast({title:'No staff applications found', variant:'alert'});
        }
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {

        };
        fetcher();
    }, []);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Payroll')?.permissions?.find((pp:any) => pp.sub_menu === 'Shortlisted Candidate');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[90%] max-h-[90%] max-w-[1000px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] px-2 pt-6 sm:px-4 sm:w-[80%] overflow-y-scroll custom-sidebar-scrollbar'>

            <div className='w-full flex flex-row items-end justify-center gap-2'>

                {/* Adm. Date From */}
                <div className='relative w-full flex flex-col'>
                    <p className='pr-2 text-start text-[11px] text-[#726E71]'>Adm. Date From</p>
                    <div className='w-full'>
                        <MyDatePicker
                            selectedDate={joiningDateFrom}
                            setSelectedDate={setJoiningDateFrom}
                        />
                    </div>
                </div>


                {/* Adm. Date To */}
                <div className='relative w-full flex flex-col'>
                    <p className='pr-2 text-start text-[11px] text-[#726E71]'>Adm. Date To</p>
                    <div className='w-full'>
                        <MyDatePicker
                            selectedDate={joiningDateTo}
                            setSelectedDate={setJoiningDateTo}
                        />
                    </div>
                </div>


                {/* Get Staff Applications */}
                {permissions.read_only && (
                    <span
                        className='flex items-center justify-center min-w-[150px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        onClick={getStaffApplications}
                    >
                        Get Staff Applications
                    </span>
                )}


                {/* Buttons */}
                {permissions.modify && (
                    <span
                        onClick={onSubmit}
                        className='flex items-center justify-center min-w-[100px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    >
                        Update
                    </span>
                )}

            </div>


            {/* Staff List */}
            <StaffList
                staffApplications={staffApplications}
                selectedStaffApplications={selectedStaffApplications}
                setSelectedStaffApplications={setSelectedStaffApplications}
            />

        </div>
    )
}





// Export
export default FormCom;