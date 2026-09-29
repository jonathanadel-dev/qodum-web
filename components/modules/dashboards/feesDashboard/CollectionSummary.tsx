'use client';
// Imports
import {Bar} from 'react-chartjs-2';
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';  
import {Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import moment from 'moment';





// Main function
const CollectionSummary = ({payments, classes, totalNumberGenerator, registrationFees}) => {


    // Registering
    ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);


    // Collection summary
    const [collectionSummary, setCollectionSummary] = useState<any>();


    // Selected tab
    const [selectedTab, setSelectedTab] = useState("Today's");


    // Values
    const [values, setValues] = useState([]);


    // Data
    const data = {
        title:{
            name:'Collection Summary',
            subName:'',
            sideLabel:'⟨₹⟩ Amount',
            bottomLabel:'Standard',
            bottomNote:'*K denotes value in thousand'
        },
        select:[
            {
                name:'School Fees',
                amount:'₹ 1,05,540'
            },
            {
                name:'School Counter (Amt./TXN)',
                amount:'₹ 75,500/5'
            },
            {
                name:'Bank (Amt./TXN)',
                amount:'₹ 21,000/3'
            },
            {
                name:'Online (Amt./TXN)',
                amount:'₹ 9,040/3'
            },
        ],
        categories:[],
        data:{
            labels:classes.map((c:any) => c.class_name),
            datasets: [
                {
                    data:values,
                    borderWidth:2,
                    backgroundColor:'#2EABE5',
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#a3a3a3',
                                formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[0].data[ctx.dataIndex]} K`,
                                align:'end',
                                anchor:'end',
                            }
                        },
                    },
                }
            ]
        }
    };


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


    // Use effect
    useEffect(() => {
        // Last 30 days 
        var last30Days = [];
        var currentDate = new Date();
        for (var i = 0; i < 30; i++) {
            var date = new Date(currentDate);
            date.setDate(currentDate.getDate() - i);
            last30Days.push(moment(date).format('D-MMM'));
        };


        // Last 7 days 
        var last7Days = [];
        var currentDate = new Date();
        for (var i = 0; i < 7; i++) {
            var date = new Date(currentDate);
            date.setDate(currentDate.getDate() - i);
            last7Days.push(moment(date).format('D-MMM'));
        };


        switch (selectedTab) {
            case "Today's":
                setCollectionSummary(totalNumberGenerator([

                        ...payments.filter((p:any) => moment(p.received_date).format('D-MMM') === moment(new Date()).format('D-MMM')).map((p:any) => {
                            return totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))));
                        }),

                        ...registrationFees?.filter((f:any) => moment(f?.createdAt).format('D-MMM') === moment(new Date()).format('D-MMM')).map((f:any) => {
                            return Number(f?.student?.amount);
                        })

                ]));
                setValues(classes.map((c:any) => totalNumberGenerator([

                    ...payments.filter((p:any) => moment(p.received_date).format('D-MMM') === moment(new Date()).format('D-MMM') && p.class_name === c.class_name).map((p:any) => {
                        return totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))));
                    }),

                    ...registrationFees?.filter((f:any) => moment(f?.createdAt).format('D-MMM') === moment(new Date()).format('D-MMM') && f?.student?.class === c.class_name).map((f:any) => {
                        return Number(f?.student?.amount);
                    })

                ]) / 1000));
                break;
            case "Last 7 Days":
                setCollectionSummary(totalNumberGenerator(last7Days.map((d:any) => {return totalNumberGenerator([

                    ...payments.filter((p:any) => moment(p.received_date).format('D-MMM') === d).map((p:any) => {
                        return totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))));
                    }),

                    ...registrationFees?.filter((f:any) => moment(f?.createdAt).format('D-MMM') === d).map((f:any) => {
                        return Number(f?.student?.amount);
                    })

                ]);})));
                setValues(classes.map((c:any) => totalNumberGenerator(last7Days.map((d:any) => {return totalNumberGenerator([

                    ...payments.filter((p:any) => moment(p.received_date).format('D-MMM') === d && p.class_name === c.class_name).map((p:any) => {
                        return totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))));
                    }),

                    ...registrationFees?.filter((f:any) => moment(f?.createdAt).format('D-MMM') === d && f?.student?.class === c.class_name).map((f:any) => {
                        return Number(f?.student?.amount);
                    })

                ]);})) / 1000));
                break;
            case "Last 30 Days":
                setCollectionSummary(totalNumberGenerator(last30Days.map((d:any) => {return totalNumberGenerator([

                    ...payments.filter((p:any) => moment(p.received_date).format('D-MMM') === d).map((p:any) => {
                        return totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))));
                    }),

                    ...registrationFees?.filter((f:any) => moment(f?.createdAt).format('D-MMM') === d).map((f:any) => {
                        return Number(f?.student?.amount);
                    })

                ]);})));
                setValues(classes.map((c:any) => totalNumberGenerator(last30Days.map((d:any) => {return totalNumberGenerator([
                        
                    ...payments.filter((p:any) => moment(p.received_date).format('D-MMM') === d && p.class_name === c.class_name).map((p:any) => {
                        return totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))));
                    }),

                    ...registrationFees?.filter((f:any) => moment(f?.createdAt).format('D-MMM') === d && f?.student?.class === c.class_name).map((f:any) => {
                        return Number(f?.student?.amount);
                    })

                ]);})) / 1000));
                break;
            default:
                setCollectionSummary(totalNumberGenerator(payments.filter((p:any) => moment(p.received_date).format('D-MMM') === moment(new Date()).format('D-MMM')).map((p:any) => {
                    return totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))));
                })));
                setValues(classes.map((c:any) => totalNumberGenerator(payments.filter((p:any) => moment(p.received_date).format('D-MMM') === moment(new Date()).format('D-MMM') && p.class_name === c.class_name).map((p:any) => {
                    return totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a.paid_amount)))));
                })) / 1000));
                break;
        }
    }, [selectedTab]);
  

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
                        <span className='font-bold'>₹ {collectionSummary}</span>
                    </div>
                </div>


                {/* Tabs */}
                <Tabs
                    defaultValue="Today's"
                    className='border-[0.5px] border-[#ccc] rounded-[5px]'
                >
                    <TabsList
                        defaultValue="Today's"
                    >
                        <TabsTrigger
                            value="Today's"
                            onClick={() => setSelectedTab("Today's")}
                            className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === "Today's" ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                        >
                            Today's
                        </TabsTrigger>
                        <TabsTrigger
                            value="Last 7 Days"
                            onClick={() => setSelectedTab("Last 7 Days")}
                            className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === "Last 7 Days" ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                        >
                            Last 7 Days
                        </TabsTrigger>
                        <TabsTrigger
                            value="Last 30 Days"
                            onClick={() => setSelectedTab("Last 30 Days")}
                            className={`px-[8px] h-8 transition rounded-full hover:opacity-90 sm:px-4 hover:bg-[#3D67B0] hover:text-white ${selectedTab === "Last 30 Days" ? 'bg-[#3D67B0] text-white' : 'bg-transparent text-black'}`}
                        >
                            Last 30 Days
                        </TabsTrigger>
                    </TabsList>
                </Tabs>


                {/* Select */}
                {data?.select?.length > 0 && (
                    <div>
                        <Select>
                            <SelectTrigger className='h-10 px-3 text-sm bg-[#F4F4F4]'>
                                <SelectValue placeholder={data.select[0].name}/>
                                <ChevronDown className='h-4 w-4 opacity-50'/>
                            </SelectTrigger>
                            <SelectContent>
                                {data.select.map((choice:any) => (
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
export default CollectionSummary;