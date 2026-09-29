'use client';
// Imports
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/shared/LoadingIcon';
import ViewCom from '@/components/modules/fees/manageFee/feeEntry/ViewCom';
import FormCom from '@/components/modules/fees/manageFee/feeEntry/FormCom';
import FeeReceipt from '@/components/modules/fees/manageFee/feeEntry/Others/FeeReceipt';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchFeeEntrySettings} from '@/lib/actions/fees/masterSettings/feeEntrySetting.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import {createPayment, fetchPayments, fetchStudentPayments} from '@/lib/actions/fees/manageFee/payment.actions';
import {fetchGlobalSchoolDetails} from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
import {fetchFeeEntryAdmittedStudents, fetchStudentByAdmNo, ModifyStudentAffiliatedHeads} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const page = () => {

    // Toast
    const {toast} = useToast();


    // Is view opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Is loading heads
    const [isLoadingHeads, setIsLoadingHeads] = useState(false);


    // Installments
    const [installments, setInstallments] = useState([]);
    

    // Classes
    const [classes, setClasses] = useState([{}]);


    // Sections
    const [sections, setSections] = useState([{}]);


    // Selected installments
    const [selectedInstallments, setSelectedInstallments] = useState<any>([]);


    // Students
    const [students, setStudents] = useState([{}]);


    // Payments
    const [payments, setPayments] = useState<any>([]);


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
        section:'',
        phone:'',
        email:'',
        affiliated_heads:{
            group_name:'',
            heads:[]
        }
    });


    // Heads
    const [heads, setHeads] = useState<any>([]);


    // All installments
    const [allInstallments, setAllInstallments] = useState<any>([]);


    // Is receipt opened
    const [isReceiptOpened, setIsReceiptOpened] = useState(false);


    // Receipt payment data
    const [receiptPaymentData, setReceiptPaymentData] = useState({});


    // ALl payments
    const [allPayments, setAllPayments] = useState<any>([]);


    // Payment receipt mo.
    const [paymentsReceiptNo, setPaymentReceiptNo] = useState('');


    // Total number generator
    const totalNumberGenerator = (array:any) => {
        let sum = 0;
        for (let i = 0; i < array?.length; i++ ) {sum += array[i];};
        return sum;
    };


    // Payment handler
    const paymentHandler = async () => {
        try {

            // Set is loading to true
            setIsLoading(true);


            // Creating receipt no
            const res = await fetchPayments();
            setAllPayments(res);
            const feeEntrySettings = await fetchFeeEntrySettings();
            const number = feeEntrySettings[0];
            let substringValue;
            if(res.length < 9){
                substringValue = 0;
            }else if(res.length >= 9){
                substringValue = 1;
            }else if(res.length >= 99){
                substringValue = 2;
            }else if(res.length >= 999){
                substringValue = 3;
            }else if(res.length >= 9999){
                substringValue = 4;
            }else if(res.length >= 99999){
                substringValue = 5;
            }else if(res.length >= 999999){
                substringValue = 6;
            };
            if(number){
                setPaymentReceiptNo(`${number?.prefix || ''}${number?.lead_zero?.substring(substringValue, number?.lead_zero?.length - 1) || ''}${res.length + 1}${number?.suffix || ''}`);
            }else{
                setPaymentReceiptNo(String(Math.floor(Math.random() * 1000000)));
            };


            // Pending pending payments
            const pendingPayments = localStorage.getItem('payments') ? JSON.parse(localStorage.getItem('payments')) : [];
            pendingPayments.map(async (p:any) => {
                const paymentStatus = JSON.stringify(p?.txnId)?.toLowerCase().includes('order')
                    ? await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/payment/insta-collect-status`, {orderId:p.txnId})
                    : await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/payment/check-easy-pay`, {merchant_txn:p.txnId});
                if(paymentStatus.data.status === 'cancelled'){
                    const newPendingPayments = pendingPayments.filter((pp:any) => pp.txnId !== p.txnId);
                    localStorage.setItem('payments', JSON.stringify(newPendingPayments));
                };
                if(paymentStatus.data.status === 'completed'){

                    // Apply payment function
                    const applyPayment = (amount:any, feesArray:any) => {
                        let remainingAmount = amount;

                        // Get the first amount's name from the first head
                        const firstName = feesArray[0].amounts[0].name;
                    
                        for (const fee of feesArray) {
                            const amountsToPay = fee.amounts.filter(a => a.name === firstName && (!a.payable_amount || a.payable_amount > 0));
                    
                            for (const a of amountsToPay) {
                                const feeValue = Number(a.value);
                                const name = a.name;
                    
                                // Initialize fields if they don't exist
                                if (typeof a.last_rec_amount === 'undefined') a.last_rec_amount = 0;
                                if (typeof a.payable_amount === 'undefined') a.payable_amount = feeValue;
                                if (typeof a.paid_amount === 'undefined') a.paid_amount = feeValue;
                                if (typeof a.conc_amount === 'undefined') a.conc_amount = 0;
                    
                                if (remainingAmount > 0) {
                                    if (remainingAmount >= feeValue - a.last_rec_amount) {
                                        // Pay the entire remaining balance
                                        remainingAmount -= (feeValue - a.last_rec_amount);
                                        a.last_rec_amount = feeValue;
                                        a.paid_amount = 0;
                                        a.payable_amount = 0;
                                    } else {
                                        // Pay partially
                                        a.last_rec_amount += remainingAmount;
                                        a.paid_amount = feeValue - a.last_rec_amount;
                                        a.payable_amount = feeValue - a.last_rec_amount;
                                        remainingAmount = 0; // All paid
                                        break; // Exit the loop for this name
                                    }
                                }
                            }
                    
                            // If remaining amount is 0, break out of the outer loop
                            if (remainingAmount === 0) break;
                        }
                    
                        // If there's remaining amount, move to the next names
                        if (remainingAmount > 0) {
                            for (const fee of feesArray) {
                                const amountsToPay = fee.amounts.filter(a => a.name !== firstName && (!a.payable_amount || a.payable_amount > 0));
                    
                                for (const a of amountsToPay) {
                                    const feeValue = Number(a.value);
                    
                                    // Initialize fields if they don't exist
                                    if (typeof a.last_rec_amount === 'undefined') a.last_rec_amount = 0;
                                    if (typeof a.payable_amount === 'undefined') a.payable_amount = feeValue;
                                    if (typeof a.paid_amount === 'undefined') a.paid_amount = feeValue;
                                    // Keep conc_amount as is if it exists, else initialize to 0
                                    if (typeof a.conc_amount === 'undefined') a.conc_amount = 0;
                    
                                    if (remainingAmount > 0) {
                                        if (remainingAmount >= feeValue - a.last_rec_amount) {
                                            // Pay the entire remaining balance
                                            remainingAmount -= (feeValue - a.last_rec_amount);
                                            a.last_rec_amount = feeValue;
                                            a.paid_amount = 0;
                                            a.payable_amount = 0;
                                        } else {
                                            // Pay partially
                                            a.last_rec_amount += remainingAmount;
                                            a.paid_amount = feeValue - a.last_rec_amount;
                                            a.payable_amount = feeValue - a.last_rec_amount;
                                            remainingAmount = 0; // All paid
                                            break; // Exit the loop for this name
                                        }
                                    }
                                }
                    
                                // If remaining amount is 0, break out of the outer loop
                                if (remainingAmount === 0) break;
                            }
                        }
                    
                        return feesArray;
                    };


                    // Student's fess heads
                    const student = await fetchStudentByAdmNo({adm_no:p.adm_no});
                    let studentHeads = student.affiliated_heads.heads;
                    let studentHeadsCopy = JSON.parse(JSON.stringify(studentHeads));


                    // New student's fee heads
                    const updatedHeads = applyPayment(Number(p.amount), studentHeads);


                    // Updating student
                    await ModifyStudentAffiliatedHeads({id:student._id, affiliated_heads:{group_name:student.affiliated_heads.group_name, heads:updatedHeads}});


                    // Saving payment
                    const getPaidHeads = (originalHeads:any, updatedArray:any) => {
                        const changedHeads = [];

                        originalHeads.forEach((originalHead) => {
                            const updatedHead = updatedHeads.find(head => head.head_name === originalHead.head_name);
                    
                            // If the head exists in the updated list
                            if (updatedHead) {
                                const originalAmounts = originalHead.amounts;
                                const updatedAmounts = updatedHead.amounts;
                    
                                const changedAmounts = [];
                    
                                originalAmounts.forEach((originalAmount, index) => {
                                    const updatedAmount = updatedAmounts[index];
                    
                                    const outputAmount = {
                                        value: originalAmount.value === updatedAmount.value ? originalAmount.value : updatedAmount.value,
                                        name: originalAmount.name === updatedAmount.name ? originalAmount.name : updatedAmount.name,
                                        conc_amount: updatedAmount.conc_amount,
                                        paid_amount: updatedAmount.last_rec_amount - (originalAmount.last_rec_amount || 0),
                                        payable_amount: updatedAmount.last_rec_amount - (originalAmount.last_rec_amount || 0),
                                        last_rec_amount: originalAmount.last_rec_amount || 0
                                    };
                    
                                    if (
                                        originalAmount.last_rec_amount !== updatedAmount.last_rec_amount ||
                                        originalAmount.conc_amount !== updatedAmount.conc_amount
                                    ) {
                                        changedAmounts.push(outputAmount);
                                    }
                                });
                    
                                if (changedAmounts.length > 0) {
                                    changedHeads.push({
                                        ...updatedHead,
                                        amounts: changedAmounts
                                    });
                                }
                            }
                        });
                    
                        return changedHeads;
                    };
                    const schools = await fetchGlobalSchoolDetails();
                    const paymentRes = await createPayment({
                        // Others
                        student:student?.student?.name,
                        receipt_no:number ? `${number?.prefix || ''}${number?.lead_zero.substring(substringValue, number?.lead_zero?.length - 1)}${res.length + 1}${number?.suffix || ''}` : String(Math.floor(Math.random() * 1000000)),
                        ref_no:p.txnId,
                        installments:p.installments,
                        received_date:p.received_date,
                        remarks:p.remarks,
                        paymode:'UPI',
                        paymode_details:{},
                        fee_type:p.fee_type,
                        advance_dues_number:p.advance_dues_number,
                        class_name:student?.student?.class,
                        section:student?.student?.section,
                        board:student?.student?.board,
                        adm_no:student?.student?.adm_no,
                        father_name:student?.parents?.father?.father_name,
                        school_name:schools[0].school_name,
                        school_address:schools[0].school_address,
                        website:schools[0].website,
                        school_no:schools[0].school_no,
                        affiliation_no:schools[0].affiliation_no,
                        logo:schools[0].logo,
                        wing_name:selectedStudent.wing_name,
                        entry_mode:'School',
                        is_new:student?.student?.is_new,
                        is_active:student?.student?.is_active,
                        student_status:student?.student?.student_status,
                        bank_name:p.bank_name,
                        fee_group:student?.affiliated_heads?.group_name,
                        // Amounts
                        actual_amount:totalNumberGenerator(getPaidHeads(studentHeadsCopy, updatedHeads).map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.value))))),
                        concession_amount:totalNumberGenerator(getPaidHeads(studentHeadsCopy, updatedHeads).map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.conc_amount))))),
                        paid_amount:p.amount,


                        // Paymode details
                        cheque_no:'',
                        cheque_date:new Date(),
                        cheque_bank:'',
                        branch_name:'',
                        deposit_bank:'',

            
                        paid_heads:getPaidHeads(studentHeadsCopy, updatedHeads),
                        concession_reason:''
                    });
                    if(paymentRes === 0){
                        toast({title:'Please create a session first', variant:'alert'});
                        return;
                    };


                    // Removing the payment id from local storage
                    const newPendingPayments = pendingPayments.filter((pp:any) => pp.txnId !== p.txnId);
                    localStorage.setItem('payments', JSON.stringify(newPendingPayments));


                    // Toast
                    toast({title:'Payment saved successfully'});

                };
            });


            // Fetcher
            fetcher();


            // Set is loading to false
            setIsLoading(false);

        }catch(err){
            console.log(err);  
        };
    };


    // Fetcher
    const fetcher = async () => {
        const classesRes = await fetchClasses();
        const sectionsRes = await fetchSections();
        const studentsRes = await fetchFeeEntryAdmittedStudents();
        const installmentsRes = await fetchInstallments();
        setClasses(classesRes);
        setSections(sectionsRes);
        setStudents(studentsRes);
        setAllInstallments(installmentsRes);
    };


    // Use effects
    useEffect(() => {
        paymentHandler();
    }, []);
    useEffect(() => {
        const fetcher = async () => {
            const paymentsRes = await fetchStudentPayments({student:selectedStudent.name});
            setPayments(paymentsRes);
        };
        fetcher();
    }, [selectedStudent]);

    return (
        <div className='h-full flex flex-col items-center justify-start bg-white overflow-hidden'>
            {isLoading ? (
                <LoadingIcon />
            ) : isReceiptOpened ? (
                <FeeReceipt
                    receiptPaymentData={receiptPaymentData}
                    setIsReceiptOpened={setIsReceiptOpened}
                    totalNumberGenerator={totalNumberGenerator}
                />
            ) : isViewOpened ? (
                <ViewCom
                    students={students}
                    setIsViewOpened={setIsViewOpened}
                    setSelectedStudent={setSelectedStudent}
                    setInstallments={setInstallments}
                    setSelectedInstallments={setSelectedInstallments}
                    allInstallments={allInstallments}
                />
            ) : (
                <FormCom
                    classes={classes}
                    sections={sections}
                    installments={installments}
                    students={students}
                    selectedStudent={selectedStudent}
                    selectedInstallments={selectedInstallments}
                    setSelectedInstallments={setSelectedInstallments}
                    setSelectedStudent={setSelectedStudent}
                    setIsViewOpened={setIsViewOpened}
                    setInstallments={setInstallments}
                    setIsLoading={setIsLoading}
                    payments={payments}
                    heads={heads}
                    setHeads={setHeads}
                    totalNumberGenerator={totalNumberGenerator}
                    allInstallments={allInstallments}
                    isLoadingHeads={isLoadingHeads}
                    setIsReceiptOpened={setIsReceiptOpened}
                    setReceiptPaymentData={setReceiptPaymentData}
                    setIsLoadingHeads={setIsLoadingHeads}
                    paymentsReceiptNo={paymentsReceiptNo}
                    setPaymentReceiptNo={setPaymentReceiptNo}
                    allPayments={allPayments}
                    setPayments={setPayments}
                    setAllPayments={setAllPayments}
                />
            )}
        </div>
    );
};





// Export
export default page;