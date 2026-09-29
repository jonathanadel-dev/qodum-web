'use client';
// Imports
import {useState} from 'react';
import {Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';





// Main function
const DefaulterStatistics = ({defaulterStudentsData}:any) => {


    // Registering
    ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);


    // Selected tab
    const [selectedTab, setSelectedTab] = useState('Standard Wise');


    // Data
    const data = {
        title:{
            name:'Fee Defaulter Statistics',
            subName:'(Year To Date)',
            sideLabel:'No. of defaulter',
            bottomLabel:'Standard',
            bottomNote:''
        },
        rightText:{
            main:'Total No. of Defaulter Students: ',
            secondary:`${defaulterStudentsData.defaulter_students_count}/${defaulterStudentsData.total_students_count}`
        },
        select:[],
        categories:[],
        data:{
            labels:defaulterStudentsData.classes_names,
            datasets: [
                {
                    data:defaulterStudentsData.classes_number_of_defaulters,
                    borderWidth:2,
                    backgroundColor:'#53CC89',
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#a3a3a3',
                                formatter:(val:any, ctx:any) => ctx.chart.data.datasets[0].data[ctx.dataIndex],
                                align:'end',
                                anchor:'end',
                            }
                        },
                    },
                }
            ]
        }
    }


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
            <p className='absolute top-[50%] left-0 -rotate-90 text-xs text-hash-color lg:text-sm'>{data.title.sideLabel}</p>


            {/* Bottom Label */}
            <p className='absolute bottom-2 left-[50%] text-xs text-hash-color lg:text-sm'>{data.title.bottomLabel}</p>


            {/* Bottom Note */}
            <p className='absolute bottom-2 left-6 text-xs text-hash-color lg:text-sm'>{data.title.bottomNote}</p>


            <div className='w-full flex justify-between gap-2 mb-2 flex-col lg:flex-row'>


                {/* Title */}
                <div className='flex flex-col items-start'>
                    <div className='flex flex-row items-center justify-center text-sm'>
                        <p className='font-bold'>{data?.title?.name}</p>
                        <span className='ml-[2px] text-hash-color text-xs'>{data?.title?.subName}</span>
                    </div>
                    <div className='flex flex-row items-center justify-center text-sm'>
                        <p className='ml-[2px] text-hash-color text-xs'>Total: </p>
                        <span className='font-bold'>₹ {defaulterStudentsData.defaulter_amount}</span>
                    </div>
                </div>


                {/* Tabs */}
                <Tabs
                    defaultValue='Standard Wise'
                    className='border-[0.5px] border-[#ccc] rounded-[5px]'
                >
                    <TabsList
                        defaultValue='Standard Wise'
                    >
                        <TabsTrigger
                            value="Today's"
                            onClick={() => setSelectedTab('Standard Wise')}
                            className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'Standard Wise' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                        >
                            Standard Wise
                        </TabsTrigger>
                        <TabsTrigger
                            value='Installment Wise'
                            onClick={() => setSelectedTab('Installment Wise')}
                            className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === 'Installment Wise' ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                        >
                            Installment Wise
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                {
                    <div className='flex items-center'>
                        <div className='flex flex-row items-center justify-center text-sm'>
                            <span className='ml-[2px] text-hash-color text-xs'>{data.rightText.main}</span>
                            <p className='font-bold'>{data.rightText.secondary}</p>
                        </div>
                    </div>
                }


            </div>
            <Bar
                // @ts-ignore
                data={data?.data}
                options={options}
            />

        </div>
    );
};





// Export
export default DefaulterStatistics;