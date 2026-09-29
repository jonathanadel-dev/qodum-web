// Imports
import React from 'react'
import {Banknote, CreditCard, Globe, Landmark, Newspaper, PenBox, QrCode} from 'lucide-react';




// Main Function
const PaymodeSummaryCard = ({payments, totalNumberGenerator, registrationFees}:any) => {
    return (
        <div className='flex flex-col gap-6 items-start bg-[white] rounded-[8px] px-4 py-4'>
            <h3 className='text-lg font-semibold'>Today's Paymode Summary</h3>
            <div className='w-full grid grid-cols-2 grid-rows-3 justify-between gap-2 md:grid-cols-3 md:grid-rows-2 xl:grid-cols-7 xl:grid-rows-1'>
                <div className='flex-1 flex flex-col items-center border-r-[0.5px] border-[#ccc]'>
                    <div className='flex flex-row items-center'>
                        <Banknote color='#32B2E6'/>
                        <p className='ml-2 text-sm'>Cash</p>
                    </div>
                    <p className='text-[#32B2E6]'>₹ {totalNumberGenerator([...payments.filter((p:any) => p.paymode === 'Cash').map((p:any) => totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))))), ...registrationFees?.filter((f:any) => f?.student?.payment_mode === 'Cash').map((f:any) => Number(f?.student?.amount))])}</p>
                </div>
                <div className='flex-1 flex flex-col items-center border-r-[0.5px] border-[#ccc]'>
                    <div className='flex flex-row items-center'>
                        <QrCode color='#FFA500'/>
                        <p className='ml-2 text-sm'>QR/UPI</p>
                    </div>
                    <p className='text-[#FFA500]'>₹ {totalNumberGenerator([...payments.filter((p:any) => p.paymode === 'UPI').map((p:any) => totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))))), ...registrationFees?.filter((f:any) => f?.student?.payment_mode === 'UPI').map((f:any) => Number(f?.student?.amount))])}</p>
                </div>
                <div className='flex-1 flex flex-col items-center border-r-[0.5px] border-[#ccc]'>
                    <div className='flex flex-row items-center'>
                        <PenBox color='#FFB6CD'/>
                        <p className='ml-2 text-sm'>DD</p>
                    </div>
                    <p className='text-[#FFB6CD]'>{totalNumberGenerator([...payments.filter((p:any) => p.paymode === 'DD').map((p:any) => totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))))), ...registrationFees?.filter((f:any) => f?.student?.payment_mode === 'DD').map((f:any) => Number(f?.student?.amount))])}</p>
                </div>
                <div className='flex-1 flex flex-col items-center border-r-[0.5px] border-[#ccc]'>
                    <div className='flex flex-row items-center'>
                        <Newspaper color='#31BE8B'/>
                        <p className='ml-2 text-sm'>Cheque</p>
                    </div>
                    <p className='text-[#31BE8B]'>₹ {totalNumberGenerator([...payments.filter((p:any) => p.paymode === 'Cheque').map((p:any) => totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))))), ...registrationFees?.filter((f:any) => f?.student?.payment_mode === 'Cheque').map((f:any) => Number(f?.student?.amount))])}</p>
                </div>
                <div className='flex-1 flex flex-col items-center border-r-[0.5px] border-[#ccc]'>
                    <div className='flex flex-row items-center'>
                        <Landmark color='#EAC474'/>
                        <p className='ml-2 text-sm'>NEFT</p>
                    </div>
                    <p className='text-[#EAC474]'>₹ {totalNumberGenerator([...payments.filter((p:any) => p.paymode === 'NEFT').map((p:any) => totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))))), ...registrationFees?.filter((f:any) => f?.student?.payment_mode === 'NEFT').map((f:any) => Number(f?.student?.amount))])}</p>
                </div>
                <div className='flex-1 flex flex-col items-center border-r-[0.5px] border-[#ccc]'>
                    <div className='flex flex-row items-center'>
                        <Globe color='#A2A2A2'/>
                        <p className='ml-2 text-sm'>Online</p>
                    </div>
                    <p className='text-[#A2A2A2]'>₹ {totalNumberGenerator([...payments.filter((p:any) => p.paymode === 'Payment Gateway' || p.paymode === 'Net Banking' || p.paymode === 'Debit Card' || p.paymode === 'Credit Card').map((p:any) => totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))))), ...registrationFees?.filter((f:any) => f?.student?.payment_mode === 'Online').map((f:any) => Number(f?.student?.amount))])}</p>
                </div>
                <div className='flex-1 flex flex-col items-center border-r-[0.5px] border-[#ccc] xl:border-r-0'>
                    <div className='flex flex-row items-center'>
                        <CreditCard color='#25B2F8'/>
                        <p className='ml-2 text-sm'>Swiped Card</p>
                    </div>
                    <p className='text-[#25B2F8]'>₹ {totalNumberGenerator([...payments.filter((p:any) => p.paymode === 'Swiped Card').map((p:any) => totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))))), ...registrationFees?.filter((f:any) => f?.student?.payment_mode === 'Swiped Card').map((f:any) => Number(f?.student?.amount))])}</p>
                </div>
            </div>
        </div>
    );
};





// Export
export default PaymodeSummaryCard;