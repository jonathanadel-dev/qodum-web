'use client';
// Imports
import moment from 'moment';
import {Line} from 'react-chartjs-2';
import {useEffect, useState} from 'react';
import {Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from 'chart.js';





// Main function
const TransactionHistoryOfLast30Days = ({paymentsRes, totalNumberGenerator, registrationFees}) => {


    // Registering
    ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);


    // Options
    const options = {
        plugins:{
            legend:{display:false},
            datalabels:{display:true}
        },
        elements:{
            line:{
                tension:0.4
            }
        }
    };


    // Payments
    const [payments, setPayments] = useState<any>([]);


    // Last 30 days 
    var last30Days = [];
    var currentDate = new Date();
    for (var i = 0; i < 30; i++) {
        var date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        last30Days.push(moment(date).format('D-MMM'));
    };


    // Data
    const data = {
        title:'Transaction History of The Last 30 Days',
        subTitle:'',
        sideLabel:'Collection',
        bottomLabel:'Tranaactions Date',
        categories:[],
        data:{
            labels:last30Days,
            datasets: [
                {
                    label:'',
                    fill:true,
                    data:payments,
                    borderWidth:2,
                    borderColor:'#2AA9EF',
                    backgroundColor:'#3babc540',
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#a3a3a3',
                                formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[0].data[ctx.dataIndex]}`,
                                align:'end',
                                anchor:'end',
                            }
                        },
                    },
                }
            ]
        }
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const paymentsArray = last30Days.map((d:any) => {
                return totalNumberGenerator([
                    
                    ...paymentsRes.filter((p:any) => moment(p.received_date).format('D-MMM') === d).map((p:any) => {
                        return totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))));
                    }),

                    ...registrationFees.filter((f:any) => moment(f.createdAt).format('D-MMM') === d).map((f:any) => Number(f?.student?.amount))
            
                ]);
            });
            setPayments(paymentsArray);
        };
        fetcher();
    }, []);
  

    return (
        <div className='relative max-w-[1800px] w-full h-full flex flex-col justify-center bg-white rounded-[8px] p-2 pl-10 pb-6 lg:pb-8 lg:pl-16'>


            {/* Side Label */}
            <p className='absolute top-[50%] left-0 -rotate-90 text-xs text-hash-color lg:text-sm'>{data.sideLabel}</p>


            {/* Bottom Label */}
            <p className='absolute bottom-2 left-[50%] text-xs text-hash-color lg:text-sm'>{data.bottomLabel}</p>


            <div className='w-full flex flex-row items-center justify-between mb-2'>
                <div className='flex flex-row items-center justify-center text-sm'>
                    <p className='font-bold'>{data.title}</p>
                    <span className='ml-[2px] text-hash-color text-xs'>{data.subTitle}</span>
                </div>
                <div className='flex flex-row gap-2 ml-8'>
                    {data.categories.map((category:any) => (
                        <div className='flex flex-row items-center text-hash-color text-xs'>
                            <span className='w-2 h-2' style={{backgroundColor:category.color}}/>
                            <p className='pl-[2px]'>{category.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Line
                // @ts-ignore
                data={data.data}
                options={options}
            />
        </div>
    );
};





// Export
export default TransactionHistoryOfLast30Days;