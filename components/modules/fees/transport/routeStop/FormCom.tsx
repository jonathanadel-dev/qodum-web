'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import MonthsList from './MonthsList';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {RouteStopValidation} from '@/lib/validations/fees/transport/routeStop.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createRouteStop, deleteRouteStop, modifyRouteStop} from '@/lib/actions/fees/transport/routeStop.actions';





// Main function
const FormCom = ({setIsViewOpened, routeStops, updateRouteStop, setUpdateRouteStop, vehicleRoutes, transportGroups}:any) => {

    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        route_no:updateRouteStop.route_no,
        stop_no:updateRouteStop.stop_no,
        stop_name:updateRouteStop.stop_name,
        morning_arrival_time:{
            hour:updateRouteStop.morning_arrival_time.hour,
            minute:updateRouteStop.morning_arrival_time.minute,
            meridiem:updateRouteStop.morning_arrival_time.meridiem
        },
        afternoon_arrival_time:{
            hour:updateRouteStop.afternoon_arrival_time.hour,
            minute:updateRouteStop.afternoon_arrival_time.minute,
            meridiem:updateRouteStop.afternoon_arrival_time.meridiem
        },
        transport_groups:{
            jan:updateRouteStop.transport_groups.jan,
            feb:updateRouteStop.transport_groups.feb,
            mar:updateRouteStop.transport_groups.mar,
            apr:updateRouteStop.transport_groups.apr,
            may:updateRouteStop.transport_groups.may,
            jun:updateRouteStop.transport_groups.jun,
            jul:updateRouteStop.transport_groups.jul,
            aug:updateRouteStop.transport_groups.aug,
            sep:updateRouteStop.transport_groups.sep,
            oct:updateRouteStop.transport_groups.oct,
            nov:updateRouteStop.transport_groups.nov,
            dec:updateRouteStop.transport_groups.dec
        }
    };
    
    
    // Form
    const form = useForm({
        resolver:zodResolver(RouteStopValidation),
        defaultValues:{
            route_no:updateRouteStop.id === '' ? '' : updateRouteStop.route_no,
            stop_no:updateRouteStop.id === '' ? 0 : updateRouteStop.stop_no,
            stop_name:updateRouteStop.id === '' ? '' : updateRouteStop.stop_name,
            morning_arrival_time:{
                hour:updateRouteStop.id === '' ? '01' : updateRouteStop.morning_arrival_time.hour,
                minute:updateRouteStop.id === '' ? '00' : updateRouteStop.morning_arrival_time.minute,
                meridiem:updateRouteStop.id === '' ? 'AM' : updateRouteStop.morning_arrival_time.meridiem
            },
            afternoon_arrival_time:{
                hour:updateRouteStop.id === '' ? '01' : updateRouteStop.afternoon_arrival_time.hour,
                minute:updateRouteStop.id === '' ? '00' : updateRouteStop.afternoon_arrival_time.minute,
                meridiem:updateRouteStop.id === '' ? 'PM' : updateRouteStop.afternoon_arrival_time.meridiem
            },
            transport_groups:{
                jan:updateRouteStop.id === '' ? '' : updateRouteStop.transport_groups.jan,
                feb:updateRouteStop.id === '' ? '' : updateRouteStop.transport_groups.feb,
                mar:updateRouteStop.id === '' ? '' : updateRouteStop.transport_groups.mar,
                apr:updateRouteStop.id === '' ? '' : updateRouteStop.transport_groups.apr,
                may:updateRouteStop.id === '' ? '' : updateRouteStop.transport_groups.may,
                jun:updateRouteStop.id === '' ? '' : updateRouteStop.transport_groups.jun,
                jul:updateRouteStop.id === '' ? '' : updateRouteStop.transport_groups.jul,
                aug:updateRouteStop.id === '' ? '' : updateRouteStop.transport_groups.aug,
                sep:updateRouteStop.id === '' ? '' : updateRouteStop.transport_groups.sep,
                oct:updateRouteStop.id === '' ? '' : updateRouteStop.transport_groups.oct,
                nov:updateRouteStop.id === '' ? '' : updateRouteStop.transport_groups.nov,
                dec:updateRouteStop.id === '' ? '' : updateRouteStop.transport_groups.dec
            }
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof RouteStopValidation>) => {
        // Create transport group
        if(updateRouteStop.id === ''){
            const res = await createRouteStop({
                route_no:values.route_no,
                stop_no:values.stop_no,
                stop_name:values.stop_name,
                morning_arrival_time:{
                    hour:values.morning_arrival_time.hour,
                    minute:values.morning_arrival_time.minute,
                    meridiem:values.morning_arrival_time.meridiem
                },
                afternoon_arrival_time:{
                    hour:values.afternoon_arrival_time.hour,
                    minute:values.afternoon_arrival_time.minute,
                    meridiem:values.afternoon_arrival_time.meridiem
                },
                transport_groups:{
                    jan:values.transport_groups.jan,
                    feb:values.transport_groups.feb,
                    mar:values.transport_groups.mar,
                    apr:values.transport_groups.apr,
                    may:values.transport_groups.may,
                    jun:values.transport_groups.jun,
                    jul:values.transport_groups.jul,
                    aug:values.transport_groups.aug,
                    sep:values.transport_groups.sep,
                    oct:values.transport_groups.oct,
                    nov:values.transport_groups.nov,
                    dec:values.transport_groups.dec
                }
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify transport group
        else if(!deepEqual(comparisonObject, values)){
            await modifyRouteStop({
                id:updateRouteStop.id,
                route_no:values.route_no,
                stop_no:values.stop_no,
                stop_name:values.stop_name,
                morning_arrival_time:{
                    hour:values.morning_arrival_time.hour,
                    minute:values.morning_arrival_time.minute,
                    meridiem:values.morning_arrival_time.meridiem
                },
                afternoon_arrival_time:{
                    hour:values.afternoon_arrival_time.hour,
                    minute:values.afternoon_arrival_time.minute,
                    meridiem:values.afternoon_arrival_time.meridiem
                },
                transport_groups:{
                    jan:values.transport_groups.jan,
                    feb:values.transport_groups.feb,
                    mar:values.transport_groups.mar,
                    apr:values.transport_groups.apr,
                    may:values.transport_groups.may,
                    jun:values.transport_groups.jun,
                    jul:values.transport_groups.jul,
                    aug:values.transport_groups.aug,
                    sep:values.transport_groups.sep,
                    oct:values.transport_groups.oct,
                    nov:values.transport_groups.nov,
                    dec:values.transport_groups.dec
                }
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete transport group
        else if(updateRouteStop.isDeleteClicked){
            await deleteRouteStop({id:updateRouteStop.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateRouteStop({
            id:'',
            isDeleteClicked:false,
            route_no:'',
            stop_no:'',
            stop_name:'',
            morning_arrival_time:{
                hour:'01',
                minute:'00',
                meridiem:'AM'
            },
            afternoon_arrival_time:{
                hour:'01',
                minute:'00',
                meridiem:'PM'
            },
            transport_groups:{
                jan:'',
                feb:'',
                mar:'',
                apr:'',
                may:'',
                jun:'',
                jul:'',
                aug:'',
                sep:'',
                oct:'',
                nov:'',
                dec:''
            }
        });
        // Reseting form
        form.reset({
            route_no:'',
            stop_no:'',
            stop_name:'',
            morning_arrival_time:{
                hour:'01',
                minute:'00',
                meridiem:'AM'
            },
            afternoon_arrival_time:{
                hour:'01',
                minute:'00',
                meridiem:'PM'
            },
            transport_groups:{
                jan:'',
                feb:'',
                mar:'',
                apr:'',
                may:'',
                jun:'',
                jul:'',
                aug:'',
                sep:'',
                oct:'',
                nov:'',
                dec:''
            }
        });
    };


    // Hours loop
    let hoursLoop:any = [];
    for (let i = 1; i < 13; i++) {
        hoursLoop.push(i);
    };
    const hoursLoopWithZeros = hoursLoop.map((n:any) => {
        if(JSON.stringify(n).length === 1){
            return `0${n}`;
        }else{
            return `${n}`;
        }
    });


    // Minutes loop
    let minutesLoop:any = [];
    for (let i = 0; i < 60; i++) {
        minutesLoop.push(i);
    };
    const minutesLoopWithZeros = minutesLoop.map((n:any) => {
        if(JSON.stringify(n).length === 1){
            return `0${n}`;
        }else{
            return `${n}`;
        }
    });

    return (
        <div className='w-[90%] max-w-[1000px] h-[90%] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%] overflow-y-scroll custom-sidebar-scrollbar'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Route Stop</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center gap-8 px-2 py-2 sm:px-4 sm:gap-3'
                >

                    <div className='w-full flex flex-row gap-12'>
                        <div className='flex-1 flex flex-col gap-3 py-2'>
                            {/* Route No. */}
                            <FormField
                                control={form.control}
                                name='route_no'
                                render={({field}) => (
                                    <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                        <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Route No.</FormLabel>
                                        <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                        <SelectValue placeholder='Select'/>
                                                        <ChevronDown className='h-4 w-4 opacity-50'/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {vehicleRoutes.length < 1 ? (
                                                            <p className='text-xs text-hash-color'>No vehicle routes</p>
                                                        ) : !vehicleRoutes[0].route_no ? (
                                                            <LoadingIcon />
                                                        ) : vehicleRoutes.map((v:any) => (
                                                            <SelectItem value={v.route_no} key={v._id}>{v.route_no}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage className='text-xs mt-[-20px]'/>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Stop No. */}
                            <FormField
                                control={form.control}
                                name='stop_no'
                                render={({field}) => (
                                    <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                        <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Stop No.</FormLabel>
                                        <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                />
                                            </FormControl>
                                            <FormMessage className='text-xs mt-[-20px]'/>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Stop Name */}
                            <FormField
                                control={form.control}
                                name='stop_name'
                                render={({field}) => (
                                    <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                        <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Stop Name</FormLabel>
                                        <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                                />
                                            </FormControl>
                                            <FormMessage className='text-xs mt-[-20px]'/>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='flex-1 flex flex-col justify-between gap-3 py-2'>
                            {/* Morning Arrival Time */}
                            <div className='flex flex-row items-center gap-2'>
                                <p className='basis-auto text-center text-xs min-w-[150px] text-[#726E71]'>Morning Arrival Time</p>
                                {/* Hour */}
                                <FormField
                                    control={form.control}
                                    name='morning_arrival_time.hour'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {hoursLoopWithZeros.map((n:any) => (
                                                                <SelectItem value={n} key={n}>{n}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {/* Minute */}
                                <FormField
                                    control={form.control}
                                    name='morning_arrival_time.minute'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {minutesLoopWithZeros.map((n:any) => (
                                                                <SelectItem value={n} key={n}>{n}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='morning_arrival_time.meridiem'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value='AM'>AM</SelectItem>
                                                            <SelectItem value='PM'>PM</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Afternoon Arrival Time */}
                            <div className='flex flex-row items-center gap-2'>
                                <p className='basis-auto text-center text-xs min-w-[150px] text-[#726E71]'>Afternoon Arrival Time</p>
                                {/* Hour */}
                                <FormField
                                    control={form.control}
                                    name='afternoon_arrival_time.hour'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {hoursLoopWithZeros.map((n:any) => (
                                                                <SelectItem value={n} key={n}>{n}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {/* Minute */}
                                <FormField
                                    control={form.control}
                                    name='afternoon_arrival_time.minute'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {minutesLoopWithZeros.map((n:any) => (
                                                                <SelectItem value={n} key={n}>{n}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='afternoon_arrival_time.meridiem'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value='AM'>AM</SelectItem>
                                                            <SelectItem value='PM'>PM</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            
                            {/* Buttons */}
                            <div className='sm:px-10'>
                                <Buttons setIsViewOpened={setIsViewOpened} routeStops={routeStops} updateRouteStop={updateRouteStop} setUpdateRouteStop={setUpdateRouteStop} onSubmit={onSubmit} form={form}/>
                            </div>
                        </div>
                    </div>



                    {/* Months list */}
                    <MonthsList form={form} transportGroups={transportGroups}/>

                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;