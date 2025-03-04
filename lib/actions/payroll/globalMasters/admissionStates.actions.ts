'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import AdmissionState from '@/lib/models/payroll/globalMasters/AdmissionState.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create admission states
export const createAdmissionStates = async () => {
    try {
    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Creating states
        const state = await AdmissionState.create({session:activeSession?.year_name, is_staff_admission_opened:false});
        state.save();


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating states: ${err.message}`);
    };
};





// Fetch admission states
export const fetchAdmissionStates = async () => {
    try {
    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Creating states
        const states = await AdmissionState.findOne({session:activeSession?.year_name});


        // Return
        return JSON.parse(JSON.stringify(states));

    } catch (err:any) {
        console.log(`Error creating states: ${err.message}`);
    };
};





// Toggle staff admission state
export const toggleStaffAdmissionState = async () => {
    try {
    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Toggling staff admission state
        await AdmissionState.findOneAndUpdate(
            {session:activeSession?.year_name},
            [{$set:{is_staff_admission_opened:{$eq:[false, '$is_staff_admission_opened']}}}]
        );


        // Return
        return 'Updated';

    } catch (err:any) {
        console.log(`Error toggling staff admission state: ${err.message}`);
    };
};





// Modify admissoin states
export const modifyAdmissionStates = async ({property}:any) => {
    try {
    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Updating
        await AdmissionState.findOneAndUpdate(
            {session:activeSession?.year_name},
            {[property]:new Date()}
        );


        // Return
        return 'Updated';

    }catch(err:any){
        console.log(`Error modifying admission states: ${err.message}`);
    };
};