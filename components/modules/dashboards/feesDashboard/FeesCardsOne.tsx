// Imports
import Image from 'next/image';
import {Progress} from '@/components/ui/progress';
import {PersonStanding, Hourglass, Briefcase} from 'lucide-react';





// Main function
const FeesCardsOne = ({students, boys, girls, academicYear, totalNumberGenerator, registrationFees}:any) => {

    // Revenues
    const allRevenue = totalNumberGenerator([...students.map((s:any) => totalNumberGenerator(s?.affiliated_heads?.heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.value || 0)))))), ...registrationFees.map((f:any) => Number(f?.student?.amount))]);
    const outstandingRevenue = totalNumberGenerator(students.map((s:any) => totalNumberGenerator(s?.affiliated_heads?.heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.value || 0) - Number(a.last_rec_amount || 0)))))));
    const receivedRevenue = allRevenue - outstandingRevenue;

    return (
        <div className='flex flex-col gap-4 md:flex-row'>


            {/* Card One */}
            <div className='flex flex-col w-full bg-white py-4 px-2 rounded-[8px] md:w-1/2 lg:w-1/3'>
                <div className='flex flex-row justify-center text-sm'>
                    <p className='font-bold'>Student Headcounts</p>
                    <span className='ml-2 text-hash-color'>(YTD)</span>
                </div>
                <div className='flex flex-row justify-center mt-2 items-center'>
                    <span className='text-hash-color text-sm'>Total:</span>
                    <p className='font-bold ml-2 text-xl'>{students.length}</p>
                </div>
                <div className='flex flex-col mt-4 gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <PersonStanding color='#959595'/>
                            <div className='ml-2 flex-1'>
                                <p className='text-xs mb-[2px]'>Boys</p>
                                <Progress
                                    value={
                                        // @ts-ignore
                                        Number(parseFloat(boys / students.length * 100).toFixed(1))
                                    }
                                    indicatorColor='bg-[#959595]'
                                />
                            </div>
                        </div>
                        <div className='flex-1 flex flex-row ml-[2px] justify-center items-center text-sm xl:flex-row'>
                            <p>{boys}</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>({
                                // @ts-ignore
                                boys === 0 ? 0 : parseFloat(boys / students.length * 100).toFixed(1)
                           }%)</span>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <Image
                                width={25}
                                height={25}
                                alt='Girl icon'
                                src='/assets/girl.png'
                            />
                            <div className='ml-2 flex-1'>
                                <p className='text-xs mb-[2px]'>Girls</p>
                                <Progress
                                    value={
                                        // @ts-ignore
                                        Number(parseFloat(girls / students.length * 100).toFixed(1))
                                    }
                                    indicatorColor='bg-[#dd288f]'
                                />
                            </div>
                        </div>
                        <div className='flex-1 flex flex-row ml-[2px] justify-center items-center text-sm xl:flex-row'>
                            <p>{girls}</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>({
                                // @ts-ignore
                                girls === 0 ? 0 : parseFloat(girls / students.length * 100).toFixed(1)
                            }%)</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Card Two */}
            <div className='flex flex-col w-full bg-white py-4 px-2 rounded-[8px] md:w-1/2 lg:w-2/3'>
                    <div className='flex flex-row justify-center text-sm'>
                        <p className='font-bold'>Fee Revenue Summary</p>
                        <span className='ml-2 text-hash-color'>({academicYear})</span>
                    </div>
                    <div className='flex flex-row justify-center mt-2 items-center'>
                        <span className='text-hash-color text-sm'>Total:</span>
                        <p className='font-bold ml-2 text-xl'>₹ {allRevenue}</p>
                    </div>
                    <div className='flex flex-col mt-4 gap-2'>
                        <div className='flex flex-row items-center justify-between'>
                            <div className='flex-1 flex flex-row items-center justify-start'>
                                <Hourglass color='#FE7565'/>
                                <div className='ml-2 flex-1'>
                                    <p className='text-xs mb-[2px]'>Outstanding Revenue</p>
                                    <Progress
                                        value={
                                            // @ts-ignore
                                            Number(parseFloat(outstandingRevenue / allRevenue * 100).toFixed(1))
                                        }
                                        indicatorColor='bg-[#FE7565]'
                                    />
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col justify-center items-center text-sm xl:flex-row'>
                                <p>₹ {outstandingRevenue}</p>
                                <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>({
                                    // @ts-ignore
                                    parseFloat(outstandingRevenue / allRevenue * 100 || 0).toFixed(1)
                                }%)</span>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <div className='flex-1 flex flex-row items-center justify-start'>
                                <Briefcase color='#31BE8B'/>
                                <div className='ml-2 flex-1'>
                                    <p className='text-xs mb-[2px]'>Total Received (YTD)</p>
                                    <Progress
                                        value={
                                            // @ts-ignore
                                            Number(parseFloat(receivedRevenue / allRevenue * 100).toFixed(1))
                                        }
                                        indicatorColor='bg-[#31BE8B]'
                                    />
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col justify-center items-center text-sm xl:flex-row'>
                                <p>₹ {receivedRevenue}</p>
                                <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>({
                                    // @ts-ignore
                                    parseFloat(receivedRevenue / allRevenue * 100 || 0).toFixed(1)
                                }%)</span>
                            </div>
                        </div>
                    </div>
                </div>


        </div>
    );
};





// Export
export default FeesCardsOne;