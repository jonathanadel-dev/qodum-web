// Imports
import moment from 'moment';
import Search from './Search';
import {useContext, useEffect, useState} from 'react';
import PaymentsList from './PaymentsList';
import {Input} from '@/components/ui/input';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import { AuthContext } from '@/context/AuthContext';





// Main function
const index = ({sections, classes, setIsViewOpened, students, setSelectedStudent, selectedStudent}:any) => {

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


    // Is error
    const [isError, setIsError] = useState(false);


    // Date
    const [date, setDate] = useState(moment());


    // Concession reason
    const [concessionReason, setConcessionReason] = useState('');


    // Use effect
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Fees')?.permissions?.find((pp:any) => pp.sub_menu === 'Cancel Fee Receipt');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[70%] min-w-[400px] flex flex-col justify-between px-2 gap-4'>


            {/* Search */}
            {permissions.read_only && (
                <Search
                    classes={classes}
                    sections={sections}
                    students={students}
                    setIsViewOpened={setIsViewOpened}
                    setSelectedStudent={setSelectedStudent}
                />
            )}


            {/* Inputs */}
            <div className='flex flex-row p-2 bg-[#F7F7F7] gap-4 text-xs text-hash-color rounded-[4px] border-[0.5px] border-[#ccc]'>
                {/* Received Date */}
                <div className='flex-1 flex flex-col'>
                    <p className='text-xs text-hash-color'>Cancel Date</p>
                    <MyDatePicker
                        selectedDate={date}
                        setSelectedDate={setDate}
                    />
                </div>
                <div className='flex-1 flex flex-col'>
                    <div className='w-full text-start text-[11px] text-[#726E71]'>Cancel receipt/Cheque bounce reason</div>
                    <Input
                        value={concessionReason}
                        onChange={(e:any) => setConcessionReason(e.target.value)}
                        className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                    />
                    {isError && <span className='text-[#f00]'>Please enter reason</span>}
                </div>
            </div>


            {/* Payments List */}
            <PaymentsList
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                concessionReason={concessionReason}
                setConcessionReason={setConcessionReason}
                permissions={permissions}
                setIsError={setIsError}
            />


        </div>
    );
};





// Export
export default index;