'use client';
// Imports
import {Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';





// Main function
const EstimatedCollection = ({students, totalNumberGenerator}:any) => {

    // Registering
    ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);


    // Revenues one
    const allRevenueQuarterOne = totalNumberGenerator(students.map((s:any) => totalNumberGenerator(s?.affiliated_heads?.heads.filter((h:any) => h.installment.toLowerCase() === 'april' || h.installment.toLowerCase() === 'may' || h.installment.toLowerCase() === 'june' || h.installment === 'All installments').map((h:any) => totalNumberGenerator(h?.amounts?.filter((a:any) => a.name.toLowerCase() === 'april' || a.name.toLowerCase() === 'may' || a.name.toLowerCase() === 'june').map((a:any) => Number(a.value)))))));
    const outstandingRevenueQuarterOne = totalNumberGenerator(students.map((s:any) => totalNumberGenerator(s?.affiliated_heads?.heads.filter((h:any) => h.installment.toLowerCase() === 'april' || h.installment.toLowerCase() === 'may' || h.installment.toLowerCase() === 'june' || h.installment === 'All installments').map((h:any) => totalNumberGenerator(h?.amounts?.filter((a:any) => a.name.toLowerCase() === 'april' || a.name.toLowerCase() === 'may' || a.name.toLowerCase() === 'june').map((a:any) => Number(a.payable_amount) || Number(a.value)))))));
    const receivedRevenueQuarterOne = allRevenueQuarterOne - outstandingRevenueQuarterOne;


    // Revenues two
    const allRevenueQuarterTwo = totalNumberGenerator(students.map((s:any) => totalNumberGenerator(s?.affiliated_heads?.heads.filter((h:any) => h.installment.toLowerCase() === 'july' || h.installment.toLowerCase() === 'august' || h.installment.toLowerCase() === 'september' || h.installment === 'All installments').map((h:any) => totalNumberGenerator(h?.amounts?.filter((a:any) => a.name.toLowerCase() === 'july' || a.name.toLowerCase() === 'august' || a.name.toLowerCase() === 'september').map((a:any) => Number(a.value)))))));
    const outstandingRevenueQuarterTwo = totalNumberGenerator(students.map((s:any) => totalNumberGenerator(s?.affiliated_heads?.heads.filter((h:any) => h.installment.toLowerCase() === 'july' || h.installment.toLowerCase() === 'august' || h.installment.toLowerCase() === 'september' || h.installment === 'All installments').map((h:any) => totalNumberGenerator(h?.amounts?.filter((a:any) => a.name.toLowerCase() === 'july' || a.name.toLowerCase() === 'august' || a.name.toLowerCase() === 'september').map((a:any) => Number(a.payable_amount) || Number(a.value)))))));
    const receivedRevenueQuarterTwo = allRevenueQuarterTwo - outstandingRevenueQuarterTwo;


    // Revenues three
    const allRevenueQuarterThree = totalNumberGenerator(students.map((s:any) => totalNumberGenerator(s?.affiliated_heads?.heads.filter((h:any) => h.installment.toLowerCase() === 'october' || h.installment.toLowerCase() === 'november' || h.installment.toLowerCase() === 'december' || h.installment === 'All installments').map((h:any) => totalNumberGenerator(h?.amounts?.filter((a:any) => a.name.toLowerCase() === 'october' || a.name.toLowerCase() === 'november' || a.name.toLowerCase() === 'december').map((a:any) => Number(a.value)))))));
    const outstandingRevenueQuarterThree = totalNumberGenerator(students.map((s:any) => totalNumberGenerator(s?.affiliated_heads?.heads.filter((h:any) => h.installment.toLowerCase() === 'october' || h.installment.toLowerCase() === 'november' || h.installment.toLowerCase() === 'december').map((h:any) => totalNumberGenerator(h?.amounts?.filter((a:any) => a.name.toLowerCase() === 'october' || a.name.toLowerCase() === 'november' || a.name.toLowerCase() === 'december').map((a:any) => Number(a.payable_amount) || Number(a.value)))))));
    const receivedRevenueQuarterThree = allRevenueQuarterThree - outstandingRevenueQuarterThree;


    // Revenues four
    const allRevenueQuarterFour = totalNumberGenerator(students.map((s:any) => totalNumberGenerator(s?.affiliated_heads?.heads.filter((h:any) => h.installment.toLowerCase() === 'january' || h.installment.toLowerCase() === 'february' || h.installment.toLowerCase() === 'march' || h.installment === 'All installments').map((h:any) => totalNumberGenerator(h?.amounts?.filter((a:any) => a.name.toLowerCase() === 'january' || a.name.toLowerCase() === 'february' || a.name.toLowerCase() === 'march').map((a:any) => Number(a.value)))))));
    const outstandingRevenueQuarterFour = totalNumberGenerator(students.map((s:any) => totalNumberGenerator(s?.affiliated_heads?.heads.filter((h:any) => h.installment.toLowerCase() === 'january' || h.installment.toLowerCase() === 'february' || h.installment.toLowerCase() === 'march' || h.installment === 'All installments').map((h:any) => totalNumberGenerator(h?.amounts?.filter((a:any) => a.name.toLowerCase() === 'january' || a.name.toLowerCase() === 'february' || a.name.toLowerCase() === 'march').map((a:any) => Number(a.payable_amount) || Number(a.value)))))));
    const receivedRevenueQuarterFour = allRevenueQuarterFour - outstandingRevenueQuarterFour;


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


    // Data
    const data = {
        title:{
            name:'Estimated Collection',
            subName:'(Installment Wise) (2018 - 2019)',
            sideLabel:'⟨₹⟩ Amount',
            bottomLabel:'Installement',
            bottomNote:'*L denotes value in Lacs'
        },
        titleTwo:{
            name:'Total: ',
            subName:'₹ 4,55,07,620'
        },
        categories:[
            {
                name:'Estimated',
                color:'#31C0C9'
            },
            {
                name:'Received',
                color:'#956ED5'
            },
            {
                name:'Due',
                color:'#FFBD1D'
            },
        ],
        data:{
            labels:['APR-JUN', 'JUL-SEP', 'OCT-DEC', 'JAN-MAR'],
            datasets: [
                {
                    data:[allRevenueQuarterOne, allRevenueQuarterTwo, allRevenueQuarterThree, allRevenueQuarterFour],
                    borderWidth:2,
                    backgroundColor:'#31C0C9',
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#a3a3a3',
                                formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[0].data[ctx.dataIndex]} L`,
                                align:'end',
                                anchor:'end',
                            }
                        },
                    },
                },
                {
                    data:[receivedRevenueQuarterOne, receivedRevenueQuarterTwo, receivedRevenueQuarterThree, receivedRevenueQuarterFour],
                    borderWidth:2,
                    backgroundColor:'#956ED5',
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#a3a3a3',
                                formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[1].data[ctx.dataIndex]} L`,
                                align:'end',
                                anchor:'end',
                            }
                        },
                    },
                },
                {
                    data:[outstandingRevenueQuarterOne, outstandingRevenueQuarterTwo, outstandingRevenueQuarterThree, outstandingRevenueQuarterFour],
                    borderWidth:2,
                    backgroundColor:'#FFBD1D',
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#a3a3a3',
                                formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[2].data[ctx.dataIndex]} L`,
                                align:'end',
                                anchor:'end',
                            }
                        },
                    },
                },
            ]
        }
    };
  

    return (
        <div className='relative max-w-[1800px] w-full h-full flex flex-col items-center justify-center bg-white rounded-[8px] p-2 pl-10 pb-6 lg:pl-16'>


            {/* Side Label */}
            <p className='absolute top-[50%] left-0 -rotate-90 text-xs text-hash-color lg:text-sm'>{data.title.sideLabel}</p>


            {/* Bottom Label */}
            <p className='absolute bottom-2 left-[50%] text-xs text-hash-color lg:text-sm'>{data.title.bottomLabel}</p>


            {/* Bottom Note */}
            <p className='absolute bottom-2 left-6 text-xs text-hash-color lg:text-sm'>{data.title.bottomNote}</p>


            <div className={`w-full flex justify-between gap-2 mb-2 flex-row`}>
                {/* Title */}
                <div className='flex flex-col items-start'>
                    <div className='flex flex-row items-center justify-center text-sm'>
                        <p className='font-bold'>{data?.title?.name}</p>
                        <span className='ml-[2px] text-hash-color text-xs'>{data?.title?.subName}</span>
                    </div>
                    {data.titleTwo && (
                        <div className='flex flex-row items-center justify-center text-sm'>
                            <p className='ml-[2px] text-hash-color text-xs'>{data.titleTwo.name}</p>
                            <span className='font-bold'>{data.titleTwo.subName}</span>
                        </div>
                    )}
                </div>


                {/* Categories */}
                {data?.categories.length > 0 && (
                    <div className={`grid gap-2 ${data.categories.length > 2 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {
                            data.categories.map((category:any) => (
                                <div className='flex flex-row items-center text-xs ml-2'>
                                    <span className='w-2 h-2' style={{backgroundColor:category.color}}/>
                                    <p className='pl-[2px] text-hash-color'>{category.name}</p>
                                </div>
                            ))
                        }
                    </div>
                )}
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
export default EstimatedCollection;