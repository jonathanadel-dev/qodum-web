'use client';
// Imports
import {useEffect, useState} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {fetchPayments} from '@/lib/actions/fees/manageFee/payment.actions';
import FormCom from '@/components/modules/fees/manageFee/feeReceiptAndCertificate/Form';
import FeeReceipt from '@/components/modules/fees/manageFee/feeEntry/Others/FeeReceipt';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';





// Main function
const page = () => {


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Sections
    const [sections, setSections] = useState([{}]);


    // Installments
    const [installments, setInstallments] = useState([]);


    // Selected installments
    const [selectedInstallments, setSelectedInstallments] = useState<any>([]);


    // Payments
    const [payments, setPayments] = useState<any>([{}]);


    // Selected student
    const [selectedStudent, setSelectedStudent] = useState<any>({
        id:'',
        image:'',
        name:'',
        address:'',
        father_name:'',
        mother_name:'',
        contact_no:'',
        admission_no:'',
        bill_no:'',
        class:'',
        affiliated_heads:{
            group_name:'',
            heads:[]
        }
    });


    // Is receipt opened
    const [isReceiptOpened, setIsReceiptOpened] = useState(false);


    // Receipt payment data
    const [receiptPaymentData, setReceiptPaymentData] = useState({});


    // Total number generator
    const totalNumberGenerator = (array:any) => {
        let sum = 0;
        for (let i = 0; i < array?.length; i++ ) {sum += array[i];};
        return sum;
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const classesRes = await fetchClasses();
            const sectionsRes = await fetchSections();
            const installmentsRes = await fetchInstallments();
            const paymentsRes = await fetchPayments();
            setClasses(classesRes);
            setSections(sectionsRes);
            setInstallments(installmentsRes);
            setPayments(paymentsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='h-full flex flex-col items-center justify-start bg-white'>
            {isLoading ? (
                <LoadingIcon />
            ) : isReceiptOpened ? (
                <FeeReceipt
                    receiptPaymentData={receiptPaymentData}
                    setIsReceiptOpened={setIsReceiptOpened}
                    totalNumberGenerator={totalNumberGenerator}
                />
            ) : (
                <FormCom
                    classes={classes}
                    sections={sections}
                    selectedStudent={selectedStudent}
                    payments={payments}
                    totalNumberGenerator={totalNumberGenerator}
                    setReceiptPaymentData={setReceiptPaymentData}
                    setIsReceiptOpened={setIsReceiptOpened}
                />
            )}
        </div>
    );
};





// Export
export default page;