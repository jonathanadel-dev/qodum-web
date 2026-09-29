// Improts
import moment from 'moment';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import { any } from 'zod';





// Main Function
const RecentTransactionsCard = ({payments, students, registrationFees}:any) => {


    // New payments
    const [newPayments, setNewPayments] = useState([]);


    // Use effect
    useEffect(() => {
        setNewPayments([
                ...payments.map((p:any) => {
                    return{
                        ...p,
                        image:students.filter((s:any) => s.student.name === p.student)[0]?.student?.image
                    };
                }),
                ...registrationFees.map((f:any) => {
                    return{
                        student:f?.student?.name,
                        image:f?.student?.image,
                        class_name:f?.student?.class,
                        section:f?.student?.section,
                        paid_amount:f?.student?.amount,
                        paymode:f?.student?.payment_mode,
                        received_date:f?.createdAt,
                    };
                })
            ]
        );
    }, []);


    return (
        <div className='h-full flex flex-col bg-white rounded-[8px] gap-6 px-4 py-4'>
            <div className='flex flex-row items-center gap-2'>
                <h3 className='font-semibold'>Recent Transactions</h3>
                <p className='text-hash-color text-xs'>(Student Wise)</p>
            </div>
            <div className='h-[400px] overflow-y-scroll flex flex-col gap-4 custom-sidebar-scrollbar'>

                { // @ts-ignore
                newPayments?.sort((a:any, b:any) => new Date(b.received_date) - new Date(a.received_date)).map((p:any) => (
                    <div className='flex flex-row'>
                        {p.image === '' ? (
                            <div className='h-[50px] w-[50px] flex items-center justify-center rounded-full border-[0.5px] border-[#ccc] text-[10px] text-hash-color'>
                                No Photo
                            </div>
                        ) : (
                            <div className='h-[50px] w-[50px] rounded-full border-[0.5px] border-[#ccc]'>
                                <Image
                                    alt="Student's Image"
                                    width={100}
                                    height={100}
                                    // fill
                                    src={p.image}
                                    className='h-full w-full rounded-full border-[0.5px] border-[#ccc]'
                                />
                            </div>
                        )}
                        <div className='flex flex-col ml-4'>
                            <div className='flex flex-row items-center gap-[2px]'>
                                <p>{p.student}</p>
                                <p className='text-xs text-hash-color'>{p.class_name} - {p.section}</p>
                            </div>
                            <div className='flex flex-row items-center gap-[2px]'>
                                <p className='text-[#28C289]'>₹ {p.paid_amount}</p>
                                <p>by {p.paymode}</p>
                            </div>
                            <p className='text-hash-color text-xs'>(Receipt date: {moment(p.received_date).format('D, MMM, Y')})</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};





// Export
export default RecentTransactionsCard;