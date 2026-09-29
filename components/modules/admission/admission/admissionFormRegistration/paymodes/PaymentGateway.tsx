// Imports
import axios from 'axios';
import QRCodeLib from 'qrcode';
import {useEffect, useState} from 'react';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/shared/LoadingIcon';





// Main function
const PaymentGateway = ({selectedStudent, totalPaidAmount, setIsQrCodeGenerated, form, selectedInstallments}:any) => {

    // Toast
    const {toast} = useToast();


    // Debounced total paid amount
    const [debouncedAmount, setDebouncedAmount] = useState(totalPaidAmount);


    // Is cancel clicked
    const [isCancelClicked, setIsCancelClicked] = useState(false);


    // Payment url
    const [isLoading, setIsLoading] = useState(false);


    // Error
    const [error, setError] = useState('');


    // QR image
    const [qrImage, setQRImage] = useState('');


    // Current order id
    const [currentOrder, setCurrentOrder] = useState<any>(localStorage.getItem('payments') && JSON.parse(localStorage.getItem('payments')).length > 0 ? JSON.parse(localStorage.getItem('payments'))?.find((p:any) => p.adm_no === selectedStudent.admission_no) : {});


    // Cancel payment handler
    const cancelPaymentHandler = () => {
        // Pending pending payments
        const pendingPayments = localStorage.getItem('payments') ? JSON.parse(localStorage.getItem('payments')) : [];

        // Removing payment from the list
        const newPendingPayments = pendingPayments.filter((pp:any) => pp.txnId !== currentOrder.txnId);
        localStorage.setItem('payments', JSON.stringify(newPendingPayments));

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
        if(selectedStudent.name !== ''){

            // Setting is loading to true
            setIsLoading(true);

            // Check if student has pending payment links
            if(localStorage.getItem('payments') && JSON.parse(localStorage.getItem('payments')).map((p:any) => p.adm_no).includes(selectedStudent.admission_no)){
                const qrDataURL = await QRCodeLib.toDataURL(JSON.parse(localStorage.getItem('payments'))?.find((p:any) => p.adm_no === selectedStudent.admission_no).payment_url, {width:100});
                setQRImage(qrDataURL);
                setCurrentOrder(JSON.parse(localStorage.getItem('payments'))?.find((p:any) => p.adm_no === selectedStudent.admission_no));
                setIsLoading(false);
                return;
            };

            // Payment link
            const unique_request_number = Math.floor(Math.random() * 1000000000);
            const params = {
                amount:Number(totalPaidAmount),
                email:selectedStudent.email,
                merchant_txn:JSON.stringify(unique_request_number),
                name:selectedStudent.name,
                phone:JSON.stringify(selectedStudent.phone)
            };
            const paymentUrlRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/payment/easy-pay`, params);
            
            // Setting QR code and validations
            if(paymentUrlRes?.data?.status === 'error'){
                setError(paymentUrlRes?.data?.message);
            }else{
                const qrDataURL = await QRCodeLib.toDataURL(paymentUrlRes.data, {width:100});
                setQRImage(qrDataURL);
                let advanceDuesNumber;
                if(form.getValues().dues > 0){
                    advanceDuesNumber = - form.getValues().dues;
                }else if (form.getValues().advance_amt > 0){
                    advanceDuesNumber = form.getValues().advance_amt;
                };
                setCurrentOrder({
                    txnId:unique_request_number,
                    amount:totalPaidAmount,
                    student_name:selectedStudent.name,
                    payment_url:paymentUrlRes.data,
                    adm_no:selectedStudent.admission_no,
                    advance_dues_number:advanceDuesNumber,
                    installments:selectedInstallments,
                    received_date:form.getValues().received_date,
                    remarks:form.getValues().remarks,
                    fee_type:form.getValues().fee_type,
                    bank_name:form.getValues().bank_name
                });
                const existingPayments = localStorage.getItem('payments')
                    ? JSON.parse(localStorage.getItem('payments'))
                    : [];
                existingPayments.push({
                    txnId:unique_request_number,
                    amount:Number(totalPaidAmount),
                    student_name:selectedStudent.name,
                    payment_url:paymentUrlRes.data,
                    adm_no:selectedStudent.admission_no,
                    advance_dues_number:advanceDuesNumber,
                    installments:selectedInstallments,
                    received_date:form.getValues().received_date,
                    remarks:form.getValues().remarks,
                    fee_type:form.getValues().fee_type,
                    bank_name:form.getValues().bank_name
                });
                localStorage.setItem('payments', JSON.stringify(existingPayments));
                setIsQrCodeGenerated(true);
            };

            // Setting is loading to false
            setIsLoading(false);
            setIsCancelClicked(false);

            // Toast
            toast({title:'Payment created!'});

        }
    };


    // Update payment
    const updatePayment = async () => {
        // Pending pending payments
        const pendingPayments = localStorage.getItem('payments') ? JSON.parse(localStorage.getItem('payments')) : [];

        // Removing payment from the list
        const newPendingPayments = pendingPayments.filter((pp:any) => pp.txnId !== currentOrder.txnId);
        localStorage.setItem('payments', JSON.stringify(newPendingPayments));

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
        setCurrentOrder(localStorage.getItem('payments') && JSON.parse(localStorage.getItem('payments')).length > 0 ? JSON.parse(localStorage.getItem('payments'))?.find((p:any) => p.adm_no === selectedStudent.admission_no) : {});
        const handler = setTimeout(() => {
            setDebouncedAmount(totalPaidAmount);
        }, 1000);
        return () => {
            clearTimeout(handler);
        };
    }, [totalPaidAmount]);
    useEffect(() => {
        if(Number(currentOrder.amount) > 0 && debouncedAmount && Number(debouncedAmount) !== Number(currentOrder.amount) && !isCancelClicked){
            updatePayment();
        };
    }, [debouncedAmount]);
    

    return (
        <div className='flex items-center justify-center'>
            {selectedStudent.name !== '' ?
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
                </div>
            ) : (
                <span
                className='flex items-center justify-center px-1 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    onClick={createPayment}
                >
                    Create QR Code
                </span>
            ) : (
                <p className='text-[11px] text-red-500'>Please select a student</p>
            )}
        </div>
    );
};





// Export
export default PaymentGateway;