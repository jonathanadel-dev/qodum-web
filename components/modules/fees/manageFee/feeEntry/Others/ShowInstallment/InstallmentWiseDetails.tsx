// Imports
import moment from 'moment';
import {useState} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';





// Main function
const InstallmentWiseDetails = ({selectedStudent, totalNumberGenerator, installments, setIsShowInstallment, setSelectedInstallments, payments, setReceiptPaymentData, setIsReceiptOpened}:any) => {

    // Show payment
    const [showPayment, setShowPayment] = useState<any>({});


    // Total amounts
    const totalActualAmount = totalNumberGenerator(selectedStudent.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.map((a:any) => Number(a.value)))));
    const totalPaidAmount = totalNumberGenerator(payments.map((p:any) => Number(p.paid_amount)));
    const totalConcAmount = totalNumberGenerator(payments.map((p:any) => Number(p.conc_amount || 0)));
    const totalUnpaidAmount = totalActualAmount - (totalPaidAmount + totalConcAmount);


    // Receipt no click
    const receiptNoClick = async (p:any) => {
        setReceiptPaymentData(p);
        setIsReceiptOpened(true);
    };


    // Select handler
    const selectHandler = (i:String) => {
        setSelectedInstallments([i]);
        setIsShowInstallment(false);
    };

    return (
        <div className='w-full flex flex-col gap-6 px-4'>
            {/* Totals */}
            <div className='flex flex-col border-[0.5px] border-[#ccc] mt-4'>
                <ul className='flex flex-row text-[11px] font-semibold bg-[#EDF1F5]'>
                    <li className='basis-[15%] flex items-center justify-start pl-2'>
                        Total Actual Amt.
                    </li>
                    <li className='basis-[15%] flex items-center justify-start pl-2'>
                        Total Paid Amt.
                    </li>
                    <li className='basis-[15%] flex items-center justify-start pl-2'>
                        Total Unpaid Amt.
                    </li>
                    <li className='basis-[15%] flex items-center justify-start pl-2'>
                        Total Assigned Con.
                    </li>
                    <li className='basis-[15%] flex items-center justify-start pl-2'>
                        Total Runtime Con.
                    </li>
                    <li className='basis-[10%] flex items-center justify-start pl-2'>
                        Total Advance
                    </li>
                    <li className='basis-[15%] flex items-center justify-start pl-2'>
                        Total Adjust Advance
                    </li>
                </ul>
                <ul className='flex flex-row text-[11px]'>
                    <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                        {totalActualAmount}
                    </li>
                    <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                        {totalPaidAmount}
                    </li>
                    <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                        {totalUnpaidAmount}
                    </li>
                    <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                        {totalConcAmount}
                    </li>
                    <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                        0
                    </li>
                    <li className='basis-[10%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                        0
                    </li>
                    <li className='basis-[15%] flex items-center justify-start pl-2'>
                        0
                    </li>
                </ul>
            </div>





            {/* Paid History */}
            <div className='flex flex-col border-[0.5px] border-[#ccc] rounded-[2px]'>
                <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-xs py-2 px-2 rounded-[2px] border-b-[0.5px] border-[#ccc]'>Paid History</h2>
                <ul className='flex flex-row text-[11px] font-semibold bg-[#EDF1F5]'>
                    <li className='basis-[15%] flex items-center justify-start pl-2 gap-2'>
                        Receipt No.
                    </li>
                    <li className='basis-[10%] flex items-center justify-start pl-2'>
                        Installment
                    </li>
                    <li className='basis-[15%] flex items-center justify-start pl-2'>
                        Actual Amt.
                    </li>
                    <li className='basis-[12.5%] flex items-center justify-start pl-2'>
                        Concession Amt.
                    </li>
                    <li className='basis-[10%] flex items-center justify-start pl-2'>
                        Paid Amt.
                    </li>
                    <li className='basis-[12.5%] flex items-center justify-start pl-2'>
                        Received Date
                    </li>
                    <li className='basis-[15%] flex items-center justify-start pl-2'>
                        Reconcile Status
                    </li>
                    <li className='basis-[10%] flex items-center justify-start pl-2'>
                        Remark
                    </li>
                </ul>
                {payments.length < 1 ? (
                    <p className='text-xs text-hash-color font-semibold'>No payments</p>
                ) : !payments[0].receipt_no ? (
                    <LoadingIcon />
                ) : payments.map((p:any) => (
                    <ul className='flex flex-row text-[11px] border-b-[0.5px] border-[#ccc]'>
                        <li className='basis-[15%] flex items-center justify-start pl-2 px-2 border-r-[0.5px] border-[#ccc]'>
                            <span
                                className='text-[#6767FF] cursor-pointer mr-2'
                                onClick={() => showPayment?.receipt_no === p.receipt_no ? setShowPayment({}) : setShowPayment(p)}
                            >
                                {showPayment?.receipt_no === p.receipt_no ? 'Hide' : 'Show'}
                            </span>
                            <span
                                className='text-[#6767FF] cursor-pointer'
                                onClick={() => receiptNoClick(p)}
                            >
                                {p.receipt_no}
                            </span>
                        </li>
                        <li className='basis-[10%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            {p.installments.map((i:any) => i + '-')}
                        </li>
                        <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            {p.actual_amount}
                        </li>
                        <li className='basis-[12.5%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            0
                        </li>
                        <li className='basis-[10%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            {p.paid_amount}
                        </li>
                        <li className='basis-[12.5%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            {moment(p.received_date).format('D-MMM-yy')} at {moment(showPayment.received_date).format('HH:mm A')}
                        </li>
                        <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            Not verified
                        </li>
                        <li className='basis-[10%] flex items-center justify-start pl-2'>
                            {p.remarks}
                        </li>
                    </ul>
                ))}
            </div>





            {/* Show payment */}
            {showPayment?.receipt_no && (
                <div className='w-[90%] flex flex-col border-[0.5px] border-[#ccc] rounded-[2px]'>
                    <h2 className='w-full bg-[#EDF1F5] font-semibold text-center text-xs py-2 px-2 rounded-[2px] border-b-[0.5px] border-[#ccc]'>Receipt Details</h2>
                    <ul className='flex flex-row text-[11px] font-semibold border-b-[0.5px] border-[#ccc]'>
                        <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            Paymode:-
                        </li>
                        <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            {showPayment?.paymode}
                        </li>
                        <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            User Name:-
                        </li>
                        <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            superadmin
                        </li>
                        <li className='basis-[20%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            Transaction Date:-
                        </li>
                        <li className='basis-[20%] flex items-center justify-start pl-2'>
                            {moment(showPayment.received_date).format('D-MMM-yy')} at {moment(showPayment.received_date).format('HH:mm A')}
                        </li>
                    </ul>
                    {showPayment.concession_reason !== '' && (
                        <ul className='flex flex-row text-[11px] font-semibold border-b-[0.5px] border-[#ccc]'>
                            <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                                Con Reason:-
                            </li>
                            <li className='basis-[85%] flex items-center justify-start pl-2'>
                                {showPayment.concession_reason}
                            </li>
                        </ul>
                    )}
                    <ul className='flex flex-row mt-2 text-[11px] font-semibold bg-[#EDF1F5] border-t-[0.5px] border-[#ccc]'>
                        <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            Installment
                        </li>
                        <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            Head Name
                        </li>
                        <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            Actual Amount
                        </li>
                        <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            Concession
                        </li>
                        <li className='basis-[20%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            Received Amount
                        </li>
                        <li className='basis-[20%] flex items-center justify-start pl-2'>
                            Received Date
                        </li>
                    </ul>
                    {showPayment.paid_heads.map((h:any) => (
                        <ul className='flex flex-row text-[11px] border-t-[0.5px] border-[#ccc]'>
                            <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                                {h.installment === 'All installments' ? h.amounts[0].name : h.installment}
                            </li>
                            <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                                {h.head_name}
                            </li>
                            <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                                {h.amounts.filter((a:any) => showPayment.installments.includes(a.name))[0].value}
                            </li>
                            <li className='basis-[15%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                                {h.amounts.filter((a:any) => showPayment.installments.includes(a.name))[0].conc_amount}
                            </li>
                            <li className='basis-[20%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                                {Number(h.amounts.filter((a:any) => showPayment.installments.includes(a.name))[0].last_rec_amount) + Number(h.amounts.filter((a:any) => showPayment.installments.includes(a.name))[0].paid_amount)}
                            </li>
                            <li className='basis-[20%] flex items-center justify-start pl-2'>
                                {moment(showPayment.received_date).format('D-MMM-yy')} at {moment(showPayment.received_date).format('HH:mm A')}
                            </li>
                        </ul>
                    ))}
                </div>
            )}





            {/* Unpaid History */}
            <div className='flex flex-col border-[0.5px] border-[#ccc] rounded-[2px]'>
                <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-xs py-2 px-2 rounded-[2px] border-b-[0.5px] border-[#ccc]'>Unpaid History</h2>
                <ul className='flex flex-row text-[11px] font-semibold bg-[#EDF1F5]'>
                    <li className='basis-[10%] flex items-center justify-start pl-2'>
                        Installment
                    </li>
                    <li className='basis-[10%] flex items-center justify-start pl-2'>
                        Amount
                    </li>
                    <li className='basis-[20%] flex items-center justify-start pl-2'>
                        Last Paid
                    </li>
                    <li className='basis-[20%] flex items-center justify-start pl-2'>
                        Concession
                    </li>
                    <li className='basis-[20%] flex items-center justify-start pl-2'>
                        Due Amt.
                    </li>
                    <li className='basis-[20%] flex items-center justify-start pl-2'>
                        Select
                    </li>
                </ul>
                {installments.map((i:any) => (
                    <ul className='flex flex-row text-[11px] border-b-[0.5px] border-[#ccc]'>
                        <li className='basis-[10%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            {i}
                        </li>
                        <li className='basis-[10%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            {totalNumberGenerator(
                                selectedStudent.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))
                            )}
                        </li>
                        <li className='basis-[20%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            {totalNumberGenerator(
                                selectedStudent.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.last_rec_amount))))
                            )}
                        </li>
                        <li className='basis-[20%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            {totalNumberGenerator(
                                selectedStudent.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.conc_amount))))
                            )}
                        </li>
                        <li className='basis-[20%] flex items-center justify-start pl-2 border-r-[0.5px] border-[#ccc]'>
                            {totalNumberGenerator(
                                selectedStudent.affiliated_heads.heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)))))
                            )}
                        </li>
                        <li className='basis-[20%] flex items-center justify-start pl-2'>
                            <span
                                className='flex items-center justify-start px-[8px] h-6 text-[10px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[0.5px] rounded-full border-[#E2E4FF] cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-xs sm:px-4'
                                onClick={() => selectHandler(i)}
                            >
                                Select
                            </span>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
};





// Export
export default InstallmentWiseDetails;