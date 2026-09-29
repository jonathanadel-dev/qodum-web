// Student Strength Bar Data
const studentStrengthBarData = () => {
    return{
        title:{
            name:'Student Strength Standard Wise',
            subName:'',
            sideLabel:'No. of students',
            bottomLabel:'Standard'
        },
        categories:[
            {
                name:'Total Students',
                color:'#C4CDDE'
            },
            {
                name:'New Admission',
                color:'#15ABDE'
            },
        ],
        data:{
            labels:['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
            datasets: [
                {
                    data:[250, 210, 300, 240, 400, 100, 170, 250, 170, 320, 290, 500, 100, 300],
                    borderWidth:2,
                    backgroundColor:'#C4CDDE',
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
                },
                {
                    data:[250, 0, 0, 240, 0, 100, 0, 250, 0, 320, 0, 500, 0, 0],
                    borderWidth:2,
                    backgroundColor:'#15ABDE',
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#a3a3a3',
                                formatter:(val:any, ctx:any) => ctx.chart.data.datasets[1].data[ctx.dataIndex],
                                align:'end',
                                anchor:'end',
                            }
                        },
                    },
                }
            ]
        }
    };
};





// Student Comparision Bar Data
const studentComparisionBarData = () => {
    return{
        title:{
            name:'Student Statistics Comparison With Prev. Year',
            subName:'',
            sideLabel:'No. of students',
            bottomLabel:'Comparison values'
        },
        categories:[
            {
                name:'2017 - 18',
                color:'#C4CDDE'
            },
            {
                name:'2018 - 19',
                color:'#FF9494'
            },
        ],
        data:{
            labels:['Total Students', 'Boys', 'Girls', 'New Admission', 'TC Taken', 'Left'],
            datasets: [
                {
                    data:[3510, 2100, 1460, 280, 128, 46],
                    borderWidth:2,
                    backgroundColor:'#C4CDDE',
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
                },
                {
                    data:[3850, 2310, 1540, 240, 290, 145, 53],
                    borderWidth:2,
                    backgroundColor:'#FF9494',
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#a3a3a3',
                                formatter:(val:any, ctx:any) => ctx.chart.data.datasets[1].data[ctx.dataIndex],
                                align:'end',
                                anchor:'end',
                            }
                        },
                    },
                }
            ]
        }
    };
};





// Standard Statistics Doughnut Data
const standardStatisticsDoughnutData = () => {
    return{
        labels:{
            title:'Standard Wise Statistics',
            subTitle:'',
            class:{
                name:'Class X',
                items:[
                    {
                        label:'Boys',
                        number:'190'
                    },
                    {
                        label:'Girls',
                        number:'106'
                    }
                ]
            },
            polls:[
                {
                    name:'TC Taken',
                    color:'#15ABDE'
                },
                {
                    name:'New Admission',
                    color:'#FEC133'
                },
                {
                    name:'Old',
                    color:'#FE8125'
                }
            ]
        },
        doughnutData:{
            labels:[74, 36, 186],
            datasets: [
                {
                    label:'%',
                    data:[25, 12, 63],
                    backgroundColor:['#15ABDE', '#FEC133', '#FE8125'],
                    borderColor:['#15ABDE', '#FEC133', '#FE8125'],
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
};





// Transfer Statistics Statistics Doughnut Data
const transferDoughnutData = () => {
    return{
        labels:{
            title:'Transfer Certificate Statistics',
            subTitle:'',
            polls:[
                {
                    name:'Drafted',
                    color:'#0C7EFA'
                },
                {
                    name:'Generated',
                    color:'#FF7779'
                },
                {
                    name:'Canceled',
                    color:'#FEC133'
                }
            ]
        },
        doughnutData:{
            labels:[480, 290, 140],
            datasets: [
                {
                    label:'%',
                    data:[70, 20, 10],
                    backgroundColor:['#0C7EFA', '#FF7779', '#FEC133'],
                    borderColor:['#0C7EFA', '#FF7779', '#FEC133'],
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
};





// Category Statistics Doughnut Data
const categoryDoughnutData = () => {
    return{
        labels:{
            title:'Category Wise Student Statistics',
            subTitle:'',
            polls:[
                {
                    name:'General',
                    color:'#0C7EFA'
                },
                {
                    name:'OBC',
                    color:'#FF7779'
                },
                {
                    name:'SC/ST',
                    color:'#FEC133'
                }
            ]
        },
        doughnutData:{
            labels:[2772, 693, 385],
            datasets: [
                {
                    label:'%',
                    data:[72, 18, 10],
                    backgroundColor:['#0C7EFA', '#FF7779', '#FEC133'],
                    borderColor:['#0C7EFA', '#FF7779', '#FEC133'],
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
};





// Export
export {studentStrengthBarData, studentComparisionBarData, standardStatisticsDoughnutData, transferDoughnutData, categoryDoughnutData};