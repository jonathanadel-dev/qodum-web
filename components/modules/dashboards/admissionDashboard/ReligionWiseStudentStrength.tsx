'use client';
// Imports
import {Doughnut} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js';





// Main function
const ReligionWiseStudentStrength = ({studentsReligionsData}:any) => {

    // Registering
    ChartJs.register(ArcElement, Tooltip, Legend, ChartDataLabels);


    // Data
    const data = {
        labels:{
            title:'Religion Wise Student Strength',
            subTitle:'',
            polls:[
                {
                    name:'Hinduism',
                    color:'#FE8125'
                },
                {
                    name:'Islam',
                    color:'#009D24'
                },
                {
                    name:'Christianity',
                    color:'#0C7EFA'
                },
                {
                    name:'Judaism',
                    color:'#7F5CB0'
                },
            ]
        },
        doughnutData:{
            labels:[studentsReligionsData.hindu_students, studentsReligionsData.christian_students, studentsReligionsData.muslim_students, studentsReligionsData.jewish_students],
            datasets: [
                {
                    label:'%',
                    data:studentsReligionsData.all_students_count === 0 ? [1, 1, 1, 1] : [studentsReligionsData.hindu_students / studentsReligionsData.all_students_count, studentsReligionsData.christian_students / studentsReligionsData.all_students_count, studentsReligionsData.muslim_students / studentsReligionsData.all_students_count, studentsReligionsData.jewish_students / studentsReligionsData.all_students_count],
                    backgroundColor:['#FE8125', '#009D24', '#0C7EFA', '#7F5CB0'],
                    borderColor:['#FE8125', '#009D24', '#0C7EFA', '#7F5CB0'],
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#000',
                                font:{size:14, weight:800},
                                backgroudColor:'#ccc',
                                formatter:(val:any, ctx:any) => ctx.chart.data.labels[ctx.dataIndex],
                                align:'end',
                                anchor:'end',
                            },
                            percentage:{
                                color:'#fff',
                                font:{size:12},
                                formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[0].data[ctx.dataIndex]}%`,
                                align:'center',
                                anchor:'center',
                            },
                        },
                    }
                }
            ]
        }
    };


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
                left:50,
                right:50
            }
        },
    };


    // Center text
    const centerText = studentsReligionsData.all_students_count;


    // Outlabels
    const textCenter = {
        id:'textCenter',
        beforeDatasetsDraw:(chart:any, args:any, pluginOptions:any) => {
            const {ctx} = chart;
            ctx.save();
            ctx.font = 'bolder 20px poppins';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText(centerText, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
    };

    return (
        <div className='max-w-[1200px] w-full flex flex-col items-center justify-between gap-4 bg-white rounded-[8px] p-2'>
            <div className='w-full flex flex-row items-center justify-between mb-2'>
                <div className='flex flex-row items-center justify-center text-sm'>
                    <p className='font-bold'>{data.labels.title}</p>
                    <span className='ml-[2px] text-hash-color text-xs'>{data.labels.subTitle}</span>
                </div>
                <div className={`grid gap-2 ${data.labels.polls.length > 4 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {   
                        data.labels.polls.map((poll:any) => (
                            <div className='flex flex-row items-center text-hash-color text-xs'>
                                <span className='w-2 h-2' style={{backgroundColor:poll.color}}/>
                                <p className='pl-[2px]'>{poll.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex-1 flex items-center justify-center h-[95%] w-[95%]'>
                <Doughnut
                    // @ts-ignore
                    data={data.doughnutData}
                    options={options}
                    plugins={[textCenter]}
                />
            </div>
        </div>
    );
};





// Export
export default ReligionWiseStudentStrength;