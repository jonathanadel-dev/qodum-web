// Imports
import axios from 'axios';
import QRCodeLib from 'qrcode';
import {useEffect, useState} from 'react';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/shared/LoadingIcon';
import PaymentButton from '@/components/shared/PaymentButton';





// Main function
const PaymentGateway = ({selectedStudent, totalPaidAmount, form, onSubmit}:any) => {

    // Access key
    const [accessKey, setAccessKey] = useState('');


    // Payment response
    const [paymentResponse, setPaymentResponse] = useState<any>({});


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Error
    const [error, setError] = useState('');


    // Handle submit
    const handleSubmit = () => form.handleSubmit(onSubmit)();


    // Use effect
    useEffect(() => {
        const asyncFunc = async () => {
            try {
                // Initiate payment
                const initiatePaymentLink = `${process.env.NEXT_PUBLIC_API_URL}/payments/payment/initiate-payment`;
                const easyCollectParams = {
                    txnid:JSON.stringify(Math.floor(Math.random() * (100000000000000 - 1 + 1)) + 1),
                    amount:totalPaidAmount,
                    productinfo:'info',
                    firstname:selectedStudent?.name,
                    phone:JSON.stringify(selectedStudent?.phone),
                    email:selectedStudent?.email
                };
                const easyCollectRes = await axios.post(initiatePaymentLink, easyCollectParams);
                setAccessKey(easyCollectRes?.data?.data);
                setIsLoading(false);
                
            }catch(err){
                setError(err?.response?.data?.message === 'Please enter a numeric value for the phone number' ? 'Invalid student mobile no.' : err?.response?.data?.message);
                setIsLoading(false);
            };
        };
        if(selectedStudent?.admission_no && totalPaidAmount > 0){
            setIsLoading(true);
            asyncFunc();
        };
    }, [selectedStudent, totalPaidAmount]);
    useEffect(() => {
        if(paymentResponse?.status === 'success'){
            handleSubmit();
        }else{
            setAccessKey('');
        };
    }, [paymentResponse]);
    
    return (
        <div className='flex items-center justify-center'>
            {!selectedStudent?.name ? (
                <p className='text-xs text-[#F00]'>Please select a student</p>
            ) : totalPaidAmount == 0 ? (
                <p className='text-xs text-[#F00]'>Please enter a number more than zero to proceed</p>
            ) : isLoading ? (
                <LoadingIcon />
            ) : error ? (
                <p className='text-xs text-[#F00]'>{error}</p>
            ) : (
                <PaymentButton
                    accessKey={accessKey}
                    publicKey={process.env.NEXT_PUBLIC_EASEBUZZ_TEST_ACCESS_KEY}
                    setPaymentResponse={setPaymentResponse}
                />
            )}
        </div>
    );
};





// Export
export default PaymentGateway;