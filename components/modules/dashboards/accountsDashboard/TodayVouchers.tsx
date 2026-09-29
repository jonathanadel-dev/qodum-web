// Imports
import Link from 'next/link';
import React from 'react'





// Main function
const TodayVouchers = () => {
    return (
        <div className='w-full flex flex-col gap-4 bg-white rounded-[8px] px-4 py-4 lg:min-w-[400px] lg:w-[400px]'>
            <div className='flex flex-col justify-start'>
                <h3 className='text-lg'>TODAY'S VOUCHERS / RECEIPT SUMMARY</h3>
                <p className='text-xs text-hash-color'>30 - Mars - 2023</p>
            </div>
            <div className='flex flex-col border-b-[0.5px] border-[#ccc] pb-4'>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center'>
                        <p className='text-sm'>Voucher No : </p>
                        <p className='font-semibold ml-2'>BR0408</p>
                    </div>
                    <div className='flex flex-row items-center'>
                        <p className='text-sm'>Bank Type : </p>
                        <p className='font-semibold ml-2'>BANKR</p>
                    </div>
                </div>
                <div className='flex flex-col justify-start'>
                    <div className='flex flex-row items-center gap-2 mt-4 text-sm'>
                        <p>HDFC A/C</p>
                        <p className='font-semibold'>911025026940590</p>
                    </div>
                    <p className='font-bold mt-[2px] text-lg text-[#4BB543]'>₹ 25,255 Dr</p>
                </div>
                <div className='flex flex-col justify-start mt-4'>
                    <p className='text-sm'>Aliya Electrical</p>
                    <p className='font-bold mt-[2px] text-lg text-[#FF9494]'>₹ 25,255 Dr</p>
                </div>
            </div>
            <div className='flex flex-col border-b-[0.5px] border-[#ccc] pb-4'>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center'>
                        <p className='text-sm'>Voucher No : </p>
                        <p className='font-semibold ml-2'>CA0024</p>
                    </div>
                    <div className='flex flex-row items-center'>
                        <p className='text-sm'>Bank Type : </p>
                        <p className='font-semibold ml-2'>FEEDP</p>
                    </div>
                </div>
                <div className='flex flex-col justify-start'>
                    <div className='flex flex-row items-center gap-2 mt-4 text-sm'>
                        <p>ICICI A/C</p>
                        <p className='font-semibold'>911025026940590</p>
                    </div>
                    <p className='font-bold mt-[2px] text-lg text-[#4BB543]'>₹ 20,000 Dr</p>
                </div>
                <div className='flex flex-col justify-start mt-4'>
                    <p className='text-sm'>Aliya Electrical</p>
                    <p className='font-bold mt-[2px] text-lg text-[#FF9494]'>₹ 20,000 Dr</p>
                </div>
            </div>
            <div className='flex flex-row items-center text-hash-color text-xs'>
                *
                <Link
                    href='/'
                    className='underline px-2 text-black'
                >
                    Click
                </Link>
                to see the explanation of abbreviated entry type
            </div>
        </div>
    );
};





// Export
export default TodayVouchers;