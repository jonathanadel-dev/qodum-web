// Imports
import React from 'react';
import {Landmark, Banknote} from 'lucide-react';
import {Progress} from '@/components/ui/progress';





// Main function
const AccountCards = () => {
    return (
        <div className='grid grid-rows-3 gap-4 mx-4 mt-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1'>


            {/* Card One */}
            <div className='flex flex-col flex-1 bg-white py-4 px-2 rounded-[8px]'>
                <div className='flex flex-row justify-center text-sm'>
                    <p className='font-bold'>COLLECTION</p>
                    <span className='ml-2 text-hash-color'>(YTD)</span>
                </div>
                <div className='flex flex-row justify-center mt-2 items-center'>
                    <span className='text-hash-color text-sm'>Total:</span>
                    <p className='font-bold ml-2 text-xl'>₹ 14,56,25,255.23</p>
                </div>
                <div className='flex flex-col mt-4 gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <Landmark color='#FFD700'/>
                            <div className='ml-2 flex-1'>
                                <p className='text-xs mb-[2px]'>Bank</p>
                                <Progress value={94.32} indicatorColor='bg-[#FFD700]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col justify-center items-center text-sm xl:flex-row'>
                            <p>₹ 14,56,25,255.23</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>(94.32%)</span>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <Banknote color='#168118'/>
                            <div className='ml-2 flex-1'>
                                <p className='text-xs mb-[2px]'>Cash</p>
                                <Progress value={5.68} indicatorColor='bg-[#168118]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col justify-center items-center text-sm xl:flex-row'>
                            <p>₹ 87,32,850</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>(5.68%)</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Card Two */}
            <div className='flex flex-col flex-1 bg-white py-4 px-2 rounded-[8px]'>
                <div className='flex flex-row justify-center text-sm'>
                    <p className='font-bold'>PAYMENT</p>
                    <span className='ml-2 text-hash-color'>(YTD)</span>
                </div>
                <div className='flex flex-row justify-center mt-2 items-center'>
                    <span className='text-hash-color text-sm'>Total:</span>
                    <p className='font-bold ml-2 text-xl'>₹ 14,56,25,255.23</p>
                </div>
                <div className='flex flex-col mt-4 gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <Landmark color='#FFD700'/>
                            <div className='ml-2 flex-1'>
                                <p className='text-xs mb-[2px]'>Bank</p>
                                <Progress value={94.32} indicatorColor='bg-[#FFD700]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col justify-center items-center text-sm xl:flex-row'>
                            <p>₹ 14,56,25,255.23</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>(94.32%)</span>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <Banknote color='#168118'/>
                            <div className='ml-2 flex-1'>
                                <p className='text-xs mb-[2px]'>Cash</p>
                                <Progress value={5.68} indicatorColor='bg-[#168118]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col justify-center items-center text-sm xl:flex-row'>
                            <p>₹ 87,32,850</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>(5.68%)</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Card Three */}
            <div className='flex flex-col col-span-1 bg-white py-4 px-2 rounded-[8px] sm:col-span-2 lg:col-span-1'>
                <div className='flex flex-col justify-center items-center text-sm'>
                    <p className='font-bold'>TODAY'S SUMMARY</p>
                    <span className='ml-2 text-hash-color'>(30-June-2023)</span>
                </div>
                <div className='flex flex-row justify-center mt-2 items-center'>
                    <span className='text-hash-color text-sm'>Total Vouchers</span>
                    <p className='font-bold ml-2 text-xl'>50</p>
                </div>
                <div className='flex flex-col mt-4 gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <Landmark color='#FFD700'/>
                            <div className='flex-1 ml-2 text-hash-color text-sm lg:text-xs 2xl:text-md'>
                                Bank (Collection/Payment)
                            </div>
                        </div>
                        <p className='flex-1 flex flex-col items-end text-sm lg:text-xs xl:text-sm'>
                            ₹ 15,65,110 / ₹ 10,500
                        </p>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <Banknote color='#168118'/>
                            <div className='flex-1 ml-2 text-hash-color text-sm lg:text-xs 2xl:text-md'>
                                Cash (Collection/Payment)
                            </div>
                        </div>
                        <p className='flex-1 flex flex-col items-end text-sm lg:text-xs xl:text-sm'>
                            ₹ 50,700 / ₹ 5,530
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
};





// Export
export default AccountCards;