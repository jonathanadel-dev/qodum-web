'use client';
// Imports
import Image from 'next/image';
import {Progress} from '@/components/ui/progress';
import {Landmark, PersonStanding, Globe} from 'lucide-react';





// Main function
const AdmissionCards = ({studentsCount, newStudentsCount, studentsOnlineAndOfflineCount}:any) => {
    return (
        <div className='grid grid-rows-4 grid-cols-1 gap-4 mt-4 sm:grid-cols-2 sm:grid-rows-2 md:grid-rows-4 md:grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 2xl:grid-cols-4 2xl:grid-rows-1'>

            {/* Card One */}
            <div className='flex flex-col flex-1 bg-white py-4 px-2 rounded-[8px]'>
                <div className='flex flex-row justify-center text-sm'>
                    <p className='font-bold'>Student Headcounts</p>
                    <span className='ml-2 text-hash-color'>(YTD)</span>
                </div>
                <div className='flex flex-row justify-center mt-2 items-center'>
                    <span className='text-hash-color text-sm'>Total:</span>
                    <p className='font-bold ml-2 text-xl'>{studentsCount.all_students_count}</p>
                </div>
                <div className='flex flex-col mt-4 gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <PersonStanding color='#959595'/>
                            <div className='ml-2 flex-1'>
                                <p className='text-xs mb-[2px]'>Boys</p>
                                <Progress value={(studentsCount.boys_count / studentsCount.all_students_count) * 100} indicatorColor='bg-[#959595]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-row ml-[2px] justify-center items-center text-sm xl:flex-row'>
                            <p>{studentsCount.boys_count}</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>({Math.round((studentsCount.boys_count / studentsCount.all_students_count) * 100 || 0)}%)</span>
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
                                <Progress value={(studentsCount.girls_count / studentsCount.all_students_count) * 100} indicatorColor='bg-[#dd288f]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-row ml-[2px] justify-center items-center text-sm xl:flex-row'>
                            <p>{studentsCount.girls_count}</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>({Math.round((studentsCount.girls_count / studentsCount.all_students_count) * 100 || 0)}%)</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Card Two */}
            <div className='flex flex-col flex-1 bg-white py-4 px-2 rounded-[8px]'>
                <div className='flex flex-row justify-center text-sm'>
                    <p className='font-bold'>New Admission Statistics</p>
                    <span className='ml-2 text-hash-color'>(YTD)</span>
                </div>
                <div className='flex flex-row justify-center mt-2 items-center'>
                    <span className='text-hash-color text-sm'>Total:</span>
                    <p className='font-bold ml-2 text-xl'>{studentsOnlineAndOfflineCount.all_students_count}</p>
                </div>
                <div className='flex flex-col mt-4 gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <Landmark color='#EC8428'/>
                            <div className='ml-2 flex-1'>
                                <p className='text-xs mb-[2px]'>Reg. At School</p>
                                <Progress value={studentsOnlineAndOfflineCount.online_count / studentsOnlineAndOfflineCount.all_students_count * 100} indicatorColor='bg-[#EC8428]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-row ml-[2px] justify-center items-center text-sm xl:flex-row'>
                            <p>{studentsOnlineAndOfflineCount.online_count}</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>({(studentsOnlineAndOfflineCount.online_count / studentsOnlineAndOfflineCount.all_students_count * 100 || 0).toFixed(1)}%)</span>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex-1 flex flex-row items-center justify-start'>
                            <Globe color='#12A6C5'/>
                            <div className='ml-2 flex-1'>
                                <p className='text-xs mb-[2px]'>Online Reg.</p>
                                <Progress value={studentsOnlineAndOfflineCount.offline_count / studentsOnlineAndOfflineCount.all_students_count * 100} indicatorColor='bg-[#12A6C5]'/>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-row ml-[2px] justify-center items-center text-sm xl:flex-row'>
                            <p>{studentsOnlineAndOfflineCount.offline_count}</p>
                            <span className='text-hash-color text-xs mt-[1px] xl:ml-2'>({(studentsOnlineAndOfflineCount.offline_count / studentsOnlineAndOfflineCount.all_students_count * 100 || 0).toFixed(1)}%)</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Card Three */}
            <div className='flex flex-col bg-white py-4 px-2 rounded-[8px]'>
                <div className='flex flex-row justify-center text-sm'>
                    <p className='font-bold'>New Admission Ratio</p>
                    <span className='ml-2 text-hash-color'>(vs. prev. year)</span>
                </div>
                <div className='flex-1 flex flex-row mt-4 gap-2'>
                    <div className='flex-1 flex flex-col'>
                        <div className='flex-1'/>
                        <div className='flex-1 flex flex-row items-center'>
                            <PersonStanding color='#959595'/>
                            <p className='text-xs'>Boys</p>
                        </div>
                        <div className='flex-1 flex flex-row items-center'>
                            <Image
                                width={25}
                                height={25}
                                alt='Girl icon'
                                src='/assets/girl.png'
                            />
                            <p className='text-xs'>Girls</p>
                        </div>
                    </div>
                    <div className='flex-1 flex flex-col items-center'>
                        <p className='flex-1 flex items-center font-semibold'>This Year</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>
                            {newStudentsCount.boys_count}
                            (
                                {(newStudentsCount.boys_count === newStudentsCount.previous_boys_count) ? '' : newStudentsCount.boys_count > newStudentsCount.previous_boys_count ? '+' : '-'}
                                {Math.round((newStudentsCount.boys_count === newStudentsCount.previous_boys_count) ? 0 : newStudentsCount.boys_count > newStudentsCount.previous_boys_count ? ((newStudentsCount.boys_count - newStudentsCount.previous_boys_count) / (newStudentsCount.previous_boys_count || 1)) * 10 : ((newStudentsCount.previous_boys_count - newStudentsCount.boys_count) / newStudentsCount.previous_boys_count) * 10) / 10 * 100}%
                            )
                        </p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>
                            {newStudentsCount.girls_count}
                            (
                                {(newStudentsCount.girls_count === newStudentsCount.previous_girls_count) ? '' : newStudentsCount.girls_count > newStudentsCount.previous_girls_count ? '+' : '-'}
                                {Math.round((newStudentsCount.girls_count === newStudentsCount.previous_girls_count) ? 0 : newStudentsCount.girls_count > newStudentsCount.previous_girls_count ? ((newStudentsCount.girls_count - newStudentsCount.previous_girls_count) / (newStudentsCount.previous_girls_count || 1)) * 10 : ((newStudentsCount.previous_girls_count - newStudentsCount.girls_count) / newStudentsCount.previous_girls_count) * 10) / 10 * 100}%
                            )
                        </p>
                    </div>
                    <div className='flex-1 flex flex-col items-center'>
                        <p className='flex-1 flex items-center font-semibold'>Prev Year</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>{newStudentsCount.previous_boys_count}</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>{newStudentsCount.previous_girls_count}</p>
                    </div>
                </div>
            </div>


            {/* Card Four */}
            <div className='flex flex-col bg-white py-4 px-2 rounded-[8px]'>
                <div className='flex flex-row justify-center text-sm'>
                    <p className='font-bold'>Student Statistics</p>
                    <span className='ml-2 text-hash-color'>(vs. prev. year)</span>
                </div>
                <div className='flex-1 flex flex-row items-center mt-4 gap-2'>
                    <div className='h-full flex-1 flex flex-col'>
                        <div className='flex-1'/>
                        <div className='flex-1 flex flex-row items-center'>
                            <PersonStanding color='#959595'/>
                            <p className='text-xs'>Boys</p>
                        </div>
                        <div className='flex-1 flex flex-row items-center'>
                            <Image
                                width={25}
                                height={25}
                                alt='Girl icon'
                                src='/assets/girl.png'
                            />
                            <p className='text-xs'>Girls</p>
                        </div>
                    </div>
                    <div className='h-full flex-1 flex flex-col items-center justify-between'>
                        <p className='flex-1 flex items-center font-semibold'>This Year</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>
                            {newStudentsCount.boys_count}
                            (
                                {(newStudentsCount.boys_count === newStudentsCount.previous_boys_count) ? '' : newStudentsCount.boys_count > newStudentsCount.previous_boys_count ? '+' : '-'}
                                {Math.round((newStudentsCount.boys_count === newStudentsCount.previous_boys_count) ? 0 : newStudentsCount.boys_count > newStudentsCount.previous_boys_count ? ((newStudentsCount.boys_count - newStudentsCount.previous_boys_count) / (newStudentsCount.previous_boys_count || 1)) * 10 : ((newStudentsCount.previous_boys_count - newStudentsCount.boys_count) / newStudentsCount.previous_boys_count) * 10) / 10 * 100}%
                            )
                        </p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>
                            {newStudentsCount.girls_count}
                            (
                                {(newStudentsCount.girls_count === newStudentsCount.previous_girls_count) ? '' : newStudentsCount.girls_count > newStudentsCount.previous_girls_count ? '+' : '-'}
                                {Math.round((newStudentsCount.girls_count === newStudentsCount.previous_girls_count) ? 0 : newStudentsCount.girls_count > newStudentsCount.previous_girls_count ? ((newStudentsCount.girls_count - newStudentsCount.previous_girls_count) / (newStudentsCount.previous_girls_count || 1)) * 10 : ((newStudentsCount.previous_girls_count - newStudentsCount.girls_count) / newStudentsCount.previous_girls_count) * 10) / 10 * 100}%
                            )
                        </p>
                    </div>
                    <div className='h-full flex-1 flex flex-col items-center'>
                        <p className='flex-1 flex items-center font-semibold'>Prev Year</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>{newStudentsCount.previous_boys_count}</p>
                        <p className='flex-1 flex flex-row items-center justify-center text-sm'>{newStudentsCount.previous_girls_count}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};





// Export
export default AdmissionCards;