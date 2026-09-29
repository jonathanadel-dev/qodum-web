// Income and Expenditure Line Data
const incomeAndExpenditureLineData = () => {
    return{
        title:'Income and Expenditure',
        subTitle:'(YTD)',
        sideLabel:'Amount ⟨₹⟩',
        bottomLabel:'Month',
        bottomNote:'*CR denotes value in Crore',
        categories:[
            {
                name:'Income',
                color:'#4BB543'
            },
            {
                name:'Expenditure',
                color:'#FF9494'
            }
        ],
        data:{
            labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label:'Income',
                    data:[2, 6, 3, 4, 5, 1, 5, 4, 1, 3, 4, 2],
                    borderWidth:2,
                    borderColor:'#4BB543',
                    backgroundColor:'#4BB543',
                    datalabels:{
                        labels:{
                            labels:{
                                formatter:() => ''
                            }
                        },
                    }
                },
                {
                    label:'Expenditure',
                    data:[4, 6, 4, 3, 1, 1, 5, 2, 4, 6, 5, 3],
                    borderWidth:2,
                    borderColor:'#FF9494',
                    backgroundColor:'#FF9494',
                    datalabels:{
                        labels:{
                            labels:{
                                formatter:() => ''
                            }
                        },
                    }
                }
            ]
        }
    };
}




// Bar data
const fundFlowBarData = () => {
    return{
        title:{
            name:'Fund Flow',
            subName:'(YTD)',
            sideLabel:'Amount ⟨₹⟩',
            bottomLabel:'Month',
            bottomNote:'*CR denotes value in Crore',
        },
        categories:[
            {
                name:'Debit',
                color:'#B5C1D7'
            },
            {
                name:'Credit',
                color:'#FF9494'
            },
        ],
        data:{
            labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    data:[2, 6, 3, 4, 5, 1, 5, 4, 1, 3, 4, 2],
                    borderWidth:2,
                    backgroundColor:'#B5C1D7',
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#a3a3a3',
                                formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[0].data[ctx.dataIndex]} CR`,
                                align:'end',
                                anchor:'end',
                            }
                        },
                    },
                },
                {
                    data:[4, 6, 4, 3, 1, 1, 5, 2, 4, 6, 5, 3],
                    borderWidth:2,
                    backgroundColor:'#FF9494',
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#a3a3a3',
                                formatter:(val:any, ctx:any) => `${ctx.chart.data.datasets[1].data[ctx.dataIndex]} CR`,
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





// Category Doughnut Data
const categoryDoughnutData = () => {
    return{
        largePadding:true,
        labels:{
            title:'Voucher Statistics',
            subTitle:'(Category Wise)',
            polls:[
                {
                    name:'Bank',
                    color:'#FBBA6B'
                },
                {
                    name:'General',
                    color:'#EE706B'
                },
                {
                    name:'Party',
                    color:'#64B475'
                },
            ]
        },
        doughnutData:{
            labels:['₹ 29,47,23,103', '₹ 47,19,91,453.41', '₹ 4,93,00,395'],
            datasets: [
                {
                    label:'%',
                    data:[36.11, 57.84, 6.04],
                    vouchers:['Vouchers-10679', 'Vouchers-3005', 'Vouchers-538'],
                    backgroundColor:['#FBBA6B', '#EE706B', '#64B475'],
                    borderColor:['#FBBA6B', '#EE706B', '#64B475'],
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#000',
                                font:{size:14, weight:700},
                                backgroudColor:'#ccc',
                                formatter:(val:any, ctx:any) => ctx.chart.data.labels[ctx.dataIndex] + '\n' + ctx.chart.data.datasets[0].vouchers[ctx.dataIndex],
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
    };
};





// Entry Type Doughnut Data
const entryTypeDoughnutData = () => {
    return{
        largePadding:true,
        labels:{
            title:'Voucher Statistics',
            subTitle:'(Entry Type Wise)',
            polls:[
                {
                    name:'CASHR',
                    color:'#FBBA6B'
                },
                {
                    name:'JVENT',
                    color:'#EE706B'
                },
                {
                    name:'ADENT',
                    color:'#59A1CF'
                },
                {
                    name:'BANKR',
                    color:'#4C4A53'
                },
                {
                    name:'FEEDB',
                    color:'#4CB5B3'
                },
                {
                    name:'BANKP',
                    color:'#444587'
                },
            ]
        },
        doughnutData:{
            labels:['₹ 84,34,527', '₹ 15,98,66,105', '₹ 60,14,600', '₹ 5,11,32,282', '₹ 31,24,32,173', '₹ 27,80,94,278'],
            datasets: [
                {
                    label:'%',
                    data:[1.04, 19.79, 0.74, 6.32, 38, 34],
                    vouchers:['Vouchers-322', 'Vouchers-702', 'Vouchers-204', 'Vouchers-407', 'Vouchers-10,235', 'Vouchers-1,423'],
                    backgroundColor:['#FBBA6B', '#EE706B', '#59A1CF', '#4C4A53', '#4CB5B3', '#444587'],
                    borderColor:['#FBBA6B', '#EE706B', '#59A1CF', '#4C4A53', '#4CB5B3', '#444587'],
                    datalabels:{
                        labels:{
                            labels:{
                                color:'#000',
                                font:{size:14, weight:700},
                                backgroudColor:'#ccc',
                                formatter:(val:any, ctx:any) => ctx.chart.data.labels[ctx.dataIndex] + '\n' + ctx.chart.data.datasets[0].vouchers[ctx.dataIndex],
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
    };
};





// Export
export {incomeAndExpenditureLineData, fundFlowBarData, categoryDoughnutData, entryTypeDoughnutData};