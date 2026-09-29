'use client';
// Imports
import TabsCom from './TabsCom';
import {Bar} from 'react-chartjs-2';
import {ChevronDown} from 'lucide-react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';  
import {Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';





// Main function
const BarCom = ({barData}:any) => {


    // Registering
    ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);


    // Options
    const options = {
        responsive:true,
        plugins:{
            legend:{
                display:false
            },
            datalabels: {
                display:true
            },
        },
        layout: {
            padding:{
                top:30,
                bottom:0,
            }
        },
    };
  

    return (


        <div className='relative max-w-[1800px] w-full h-full flex flex-col items-center justify-center bg-white rounded-[8px] p-2 pl-10 pb-6 lg:pl-16'>


            {/* Side Label */}
            <p className='absolute top-[50%] left-0 -rotate-90 text-xs text-hash-color lg:text-sm'>{barData().title.sideLabel}</p>


            {/* Bottom Label */}
            <p className='absolute bottom-2 left-[50%] text-xs text-hash-color lg:text-sm'>{barData().title.bottomLabel}</p>


            {/* Bottom Note */}
            <p className='absolute bottom-2 left-6 text-xs text-hash-color lg:text-sm'>{barData().title.bottomNote}</p>


            <div className={`w-full flex justify-between gap-2 mb-2 ${barData()?.tabs?.length > 0 ? 'flex-col lg:flex-row' : 'flex-row'}`}>


                {/* Title */}
                <div className='flex flex-col items-start'>
                    <div className='flex flex-row items-center justify-center text-sm'>
                        <p className='font-bold'>{barData()?.title?.name}</p>
                        <span className='ml-[2px] text-hash-color text-xs'>{barData()?.title?.subName}</span>
                    </div>
                    {barData().titleTwo && (
                        <div className='flex flex-row items-center justify-center text-sm'>
                            <p className='ml-[2px] text-hash-color text-xs'>{barData().titleTwo.name}</p>
                            <span className='font-bold'>{barData().titleTwo.subName}</span>
                        </div>
                    )}
                </div>


                {/* Tabs */}
                {barData()?.tabs?.length > 0 && (
                    <TabsCom tabs={barData().tabs}/>
                )}


                {/* Select */}
                {barData()?.select?.length > 0 && (
                    <div>
                        <Select>
                            <SelectTrigger className='h-10 px-3 text-sm bg-[#F4F4F4]'>
                                <SelectValue placeholder={barData().select[0].name}/>
                                <ChevronDown className='h-4 w-4 opacity-50'/>
                            </SelectTrigger>
                            <SelectContent>
                                {barData().select.map((choice:any) => (
                                    <SelectItem value={choice.name}>
                                        <div className='flex flex-row items-center gap-4 pr-4'>
                                            <p className='text-sm'>{choice.name}</p>
                                            <p>{choice.amount}</p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    
                )}


                {/* Categories */}
                {barData()?.categories.length > 0 && (
                    <div className={`grid gap-2 ${barData().categories.length > 2 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {
                            barData().categories.map((category:any) => (
                                <div className='flex flex-row items-center text-xs ml-2'>
                                    <span className='w-2 h-2' style={{backgroundColor:category.color}}/>
                                    <p className='pl-[2px] text-hash-color'>{category.name}</p>
                                </div>
                            ))
                        }
                    </div>
                )}


                {/* Right Text */}
                {barData()?.rightText && (
                    <div className='flex items-center'>
                        <div className='flex flex-row items-center justify-center text-sm'>
                            <span className='ml-[2px] text-hash-color text-xs'>{barData().rightText.main}</span>
                            <p className='font-bold'>{barData().rightText.secondary}</p>
                        </div>
                    </div>
                )}


            </div>
            <Bar
                data={barData()?.data}
                options={options}
            />
        </div>
    );
};





// Export
export default BarCom;