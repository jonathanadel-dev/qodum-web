'use client';
// Imports
import {Doughnut} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js';





// Main function
const NewAdmissionsIn = ({newStudentsCount}:any) => {

    // Registering
    ChartJs.register(ArcElement, Tooltip, Legend, ChartDataLabels);


    // Data
    const data = {
        labels:{
            title:'New Admissions In',
            subTitle:'',
            polls:[
                {
                    name:'Boys',
                    color:'#15ABDE'
                },
                {
                    name:'Girls',
                    color:'#FF7779'
                }
            ]
        },
        doughnutData:{
            labels:[newStudentsCount.boys_count, newStudentsCount.girls_count],
            datasets: [
                {
                    label:'%',
                    data:newStudentsCount.boys_count === 0 && newStudentsCount.girls_count === 0 ? [1, 1] : [newStudentsCount.boys_count / newStudentsCount.all_students_count * 100, newStudentsCount.girls_count / newStudentsCount.all_students_count * 100],
                    backgroundColor:['#15ABDE', '#FF7779'],
                    borderColor:['#15ABDE', '#FF7779'],
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
                    },
                }
            ]
        }
    }


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
    const centerText = newStudentsCount.all_students_count;


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
export default NewAdmissionsIn;