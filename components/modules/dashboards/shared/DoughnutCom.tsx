'use client';
// Imports
import Image from 'next/image';
import TabsCom from './TabsCom';
import {Doughnut} from 'react-chartjs-2';
import {PersonStanding} from 'lucide-react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js';





// Main function
const DoughnutCom = ({data, text}:any) => {


    // Registering
    ChartJs.register(ArcElement, Tooltip, Legend, ChartDataLabels);


    // Options
    const options = {
        responsive:true,
        plugins: {
            legend:{display:false},
            datalabels: {
                display:true
            },
        },
        layout: {
            padding:{
                top:0,
                bottom:0,
                left:data().largePadding ? 100 : 50,
                right:data().largePadding ? 100 : 50
            }
        },
    };


    // Outlabels
    const textCenter = {
        id:'textCenter',
        beforeDatasetsDraw:(chart:any, args:any, pluginOptions:any) => {
            const {ctx} = chart;
            ctx.save();
            ctx.font = 'bolder 20px poppins';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText(text, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
    };


    return (
        <div className='max-w-[1200px] w-full flex flex-col items-center justify-between gap-4 bg-white rounded-[8px] p-2'>
            <div className='w-full flex flex-row items-center justify-between mb-2'>
                <div className='flex flex-row items-center justify-center text-sm'>
                    <p className='font-bold'>{data().labels.title}</p>
                    <span className='ml-[2px] text-hash-color text-xs'>{data().labels.subTitle}</span>
                </div>
                <div className={`grid gap-2 ${data().labels.polls.length > 4 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {   
                        data().labels.polls.map((poll:any) => (
                            <div className='flex flex-row items-center text-hash-color text-xs'>
                                <span className='w-2 h-2' style={{backgroundColor:poll.color}}/>
                                <p className='pl-[2px]'>{poll.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            {data?.labels?.tabs?.length > 0 &&(
                <TabsCom tabs={data().labels.tabs}/>
            )}
            {data?.labels?.class && (
                <div className='flex flex-col items-center'>
                    <h4>{data().labels.class.name}</h4>
                    <ul className='flex flex-row gap-2'>
                        {data().labels.class.items.map((item:any) => (
                            <li className='flex flex-row items-center text-sm gap-[2px]'>
                                {item.label === 'Boys' ? (
                                    <PersonStanding color='#959595'/>
                                ) : (
                                    <Image
                                        width={25}
                                        height={25}
                                        alt='Girl icon'
                                        src='/assets/girl.png'
                                    />
                                )}
                                <p>{item.label}</p>
                                <p>{item.number}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className='flex-1 flex items-center justify-center h-[95%] w-[95%]'>
                <Doughnut
                    data={data().doughnutData}
                    options={options}
                    plugins={[textCenter]}
                />
            </div>
        </div>
    );
};





// Export
export default DoughnutCom;