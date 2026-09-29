// Imports
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/shared/LoadingIcon';





// Main function
const UPIDetails = ({setIsQrCodeGenerated, form, updateStudent}:any) => {

    // Toast
    const {toast} = useToast();


    // Debounced total paid amount
    const [debouncedAmount, setDebouncedAmount] = useState(form.getValues().student.amount);


    // Is cancel clicked
    const [isCancelClicked, setIsCancelClicked] = useState(false);


    // Payment url
    const [isLoading, setIsLoading] = useState(false);


    // Error
    const [error, setError] = useState('');


    // QR image
    const [qrImage, setQRImage] = useState('');


    // Current order id
    const [currentOrder, setCurrentOrder] = useState<any>(localStorage.getItem('registrationPayment') && JSON.parse(localStorage.getItem('registrationPayment')).length > 0 ? JSON.parse(localStorage.getItem('registrationPayment')).find((p:any) => p.adm_no === form.getValues().student.reg_no) : {});


    // Cancel payment handler
    const cancelPaymentHandler = () => {
        // Pending pending payments
        const pendingPayments = localStorage.getItem('registrationPayment') ? JSON.parse(localStorage.getItem('registrationPayment')) : [];

        // Removing payment from the list
        const newPendingPayments = pendingPayments.filter((pp:any) => pp.txnId !== currentOrder.txnId);
        localStorage.setItem('registrationPayment', JSON.stringify(newPendingPayments));

        // Reseting variables
        setQRImage('');
        setCurrentOrder({});
        setIsQrCodeGenerated(false);
        setIsCancelClicked(true);

        // Toast
        toast({title:'Payment canceled successfully!'});
    };


    // Create payment
    const createPayment = async () => {
        if(form.getValues().student.name !== '' && form.getValues().student.reg_no !== '' && form.getValues().student.amount !== '' && Number(form.getValues().student.amount) !== 0 && form.getValues().student.mobile && updateStudent.id === ''){

            // Setting is loading to true
            setIsLoading(true);


            // Check if student has pending payment links
            if(localStorage.getItem('registrationPayment') && JSON.parse(localStorage.getItem('registrationPayment')).map((p:any) => p.adm_no).includes(form.getValues().student.reg_no)){
                setQRImage(JSON.parse(localStorage.getItem('registrationPayment')).find((p:any) => p.adm_no === form.getValues().student.reg_no).payment_url);
                setCurrentOrder(JSON.parse(localStorage.getItem('registrationPayment')).find((p:any) => p.adm_no === form.getValues().student.reg_no));
                setIsLoading(false);
                return;
            };


            // Payment link
            const isValidMobile = (customer_phone:any) => {
                if (!customer_phone) return false;                
                const containsOnlyNumbers = /^[0-9]+$/.test(customer_phone);
                if (!containsOnlyNumbers) return false;                
                const lengthIsValid = Math.abs(customer_phone).toString().length === 10;
                if (!lengthIsValid) return false;                
                if (typeof customer_phone === 'number') return false;
                return true;
            };
            const unique_request_number = Math.floor(Math.random() * 1000000000);
            const params = {
                unique_request_number:JSON.stringify(unique_request_number),
                amount:Number(form.getValues().student.amount),
                customer_name:form.getValues().student.name,
                customer_phone:isValidMobile(JSON.stringify(form.getValues().student.mobile)) ? JSON.stringify(form.getValues().student.mobile) : '9792853741'
            };
            console.log(params);
            const paymentUrlRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/payment/insta-collect`, params);

            // Setting QR code and validations
            if(!paymentUrlRes.data.success){
                setError(paymentUrlRes?.data?.message);
            }else{
                setQRImage(paymentUrlRes.data.payment_url);
                setCurrentOrder({
                    txnId:paymentUrlRes.data.order_id,
                    amount:Number(form.getValues().student.amount),
                    student_name:form.getValues().student.name,
                    payment_url:paymentUrlRes.data.payment_url,
                    adm_no:form.getValues().student.reg_no
                });
                const existingPayments = localStorage.getItem('registrationPayment')
                    ? JSON.parse(localStorage.getItem('registrationPayment'))
                    : [];
                existingPayments.push({
                    txnId:paymentUrlRes.data.order_id,
                    amount:Number(form.getValues().student.amount),
                    student_name:form.getValues().student.name,
                    payment_url:paymentUrlRes.data.payment_url,
                    adm_no:form.getValues().student.reg_no
                });
                localStorage.setItem('registrationPayment', JSON.stringify(existingPayments));
                setIsQrCodeGenerated(true);
            };

            // Setting is loading to false
            setIsLoading(false);
            setIsCancelClicked(false);

            // Toast
            toast({title:'Payment created!'});

        };
    };


    // Update payment
    const updatePayment = async () => {
        // Pending pending payments
        const pendingPayments = localStorage.getItem('registrationPayment') ? JSON.parse(localStorage.getItem('registrationPayment')) : [];

        // Removing payment from the list
        const newPendingPayments = pendingPayments.filter((pp:any) => pp.txnId !== currentOrder.txnId);
        localStorage.setItem('registrationPayment', JSON.stringify(newPendingPayments));

        // Reseting variables
        setQRImage('');
        setCurrentOrder({});

        // Creating new payment
        createPayment();
    };


    // Use effect
    useEffect(() => {
        if(!isCancelClicked){
            createPayment();
        };
        setCurrentOrder(localStorage.getItem('registrationPayment') && JSON.parse(localStorage.getItem('registrationPayment')).length > 0 ? JSON.parse(localStorage.getItem('registrationPayment')).find((p:any) => p.adm_no === form.getValues().student.reg_no) : {});
    }, []);

    return (
        <div className='flex items-center justify-center'>
            {updateStudent.id !== ''
            ?
                ''
            : form.getValues().student.name !== '' ?
                isLoading ? (
                <LoadingIcon />
            ) : error ? (
                <p className='text-[11px] text-red-500'>{error}</p>
            ) : qrImage ? (
                <div className='flex flex-col'>
                    <img alt='QR Code' src={qrImage} className='w-[100px] h-[100px]'/>
                    <span
                        className='flex items-center justify-center px-1 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        onClick={() => cancelPaymentHandler()}
                    >
                        Cancel
                    </span>
                    {
                        currentOrder?.adm_no !== form.getValues().student.reg_no ||
                        Number(currentOrder?.amount) !== Number(form.getValues().student.amount) ||
                        currentOrder?.student_name !== form.getValues().student.name && (
                            <span
                                className='flex items-center justify-center px-1 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                onClick={updatePayment}
                            >
                                Update
                            </span>
                        )
                    }
                </div>
            ) : form.getValues().student.mobile === 0 ? (
                <p className='text-[11px] text-red-500'>Please enter student mobile no.</p>
            ) : (
                <span
                className='flex items-center justify-center px-1 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    onClick={createPayment}
                >
                    Create QR Code
                </span>
            ) : (
                <p className='text-[11px] text-red-500'>Please fill student data</p>
            )}
        </div>
    );
};





// Export
export default UPIDetails;