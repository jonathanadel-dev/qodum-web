// Imports
import moment from 'moment';
import Search from './Search';
import {useContext, useEffect, useState} from 'react';
import HeadsList from './HeadsList';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import { AuthContext } from '@/context/AuthContext';





// Main function
const index = ({sections, classes, totalNumberGenerator, setIsViewOpened, setSelectedStudent, selectedStudent, setPayments, selectedPayment, setSelectedPayment}:any) => {

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


    // Date
    const [date, setDate] = useState(moment());


    // Use effect
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Fees')?.permissions?.find((pp:any) => pp.sub_menu === 'Modify Fees Receipt');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[70%] min-w-[400px] flex flex-col justify-between px-2 gap-2'>


            {/* Search */}
            {permissions.read_only && (
                <Search
                    classes={classes}
                    sections={sections}
                    setIsViewOpened={setIsViewOpened}
                    setSelectedStudent={setSelectedStudent}
                    setPayments={setPayments}
                />
            )}


            {/* Reeiving date */}
            <div className='w-full flex items-center justify-center p-2 rounded-[4px] border-[0.5px] border-[#ccc] bg-[#F7F7F7]'>
                <div className='w-[100%] flex flex-col max-w-[400px]'>
                    <p className='text-xs text-hash-color'>Receiving Date</p>
                    <MyDatePicker
                        selectedDate={date}
                        setSelectedDate={setDate}
                    />
                </div>
            </div>


            {/* Payments List */}
            <HeadsList
                selectedStudent={selectedStudent}
                totalNumberGenerator={totalNumberGenerator}
                setSelectedStudent={setSelectedStudent}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                permissions={permissions}
                setPayments={setPayments}
            />


        </div>
    );
};





// Export
export default index;