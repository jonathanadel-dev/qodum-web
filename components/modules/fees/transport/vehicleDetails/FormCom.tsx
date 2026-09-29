'use client';
// Imports
import * as z from 'zod';
import moment from 'moment';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {VehicleDetailsValidation} from '@/lib/validations/fees/transport/vehicelDetails.validation';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createVehicleDetails, deleteVehicleDetails, modifyVehicleDetails} from '@/lib/actions/fees/transport/vehicleDetails.actions';





// Main function
const FormCom = ({setIsViewOpened, vehiclesDetails, updateVehicleDetails, setUpdateVehicleDetails, vehiclesTypes, vendors}:any) => {


    // Toast
    const {toast} = useToast();


    // Date states
    const [serviceDueDate, setServiceDueDate] = useState(moment());
    const [insuranceDueDate, setInsuranceDueDate] = useState(moment());


    // Comparison object
    const comparisonObject = {
        vehicle_owner:updateVehicleDetails.vehicle_owner,
        vehicle_type:updateVehicleDetails.vehicle_type,
        vehicle_name:updateVehicleDetails.vehicle_name,
        vehicle_reg_no:updateVehicleDetails.vehicle_reg_no,
        driver_name:updateVehicleDetails.driver_name,
        attendent_name:updateVehicleDetails.attendent_name,
        fule_type:updateVehicleDetails.fule_type,
        seating_capacity:updateVehicleDetails.seating_capacity,
        facility_in_bus:{
            cctv:updateVehicleDetails.facility_in_bus.cctv,
            wifi:updateVehicleDetails.facility_in_bus.wifi,
            gps:updateVehicleDetails.facility_in_bus.gps,
            ac:updateVehicleDetails.facility_in_bus.ac
        },
        driver_mobile_no:updateVehicleDetails.driver_mobile_no,
        gps_no:updateVehicleDetails.gps_no,
        service_due_date:updateVehicleDetails.service_due_date,
        insurance_due_date:updateVehicleDetails.insurance_due_date,
        vendor:updateVehicleDetails.vendor
    };
    
    
    // Form
    const form = useForm({
        resolver:zodResolver(VehicleDetailsValidation),
        defaultValues:{
            vehicle_owner:updateVehicleDetails.id === '' ? 'school' : updateVehicleDetails.vehicle_owner,
            vehicle_type:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.vehicle_type,
            vehicle_name:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.vehicle_name,
            vehicle_reg_no:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.vehicle_reg_no,
            driver_name:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.driver_name,
            attendent_name:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.attendent_name,
            fule_type:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.fule_type,
            seating_capacity:updateVehicleDetails.id === '' ? 0 : updateVehicleDetails.seating_capacity,
            facility_in_bus:{
                cctv:updateVehicleDetails.id === '' ? false : updateVehicleDetails.facility_in_bus.cctv,
                wifi:updateVehicleDetails.id === '' ? false : updateVehicleDetails.facility_in_bus.wifi,
                gps:updateVehicleDetails.id === '' ? false : updateVehicleDetails.facility_in_bus.gps,
                ac:updateVehicleDetails.id === '' ? false : updateVehicleDetails.facility_in_bus.ac
            },
            driver_mobile_no:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.driver_mobile_no,
            gps_no:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.gps_no,
            service_due_date:updateVehicleDetails.id === '' ? new Date() : updateVehicleDetails.service_due_date,
            insurance_due_date:updateVehicleDetails.id === '' ? new Date() : updateVehicleDetails.insurance_due_date,
            vendor:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.vendor
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof VehicleDetailsValidation>) => {

        // Create vehicle details
        if(updateVehicleDetails.id === ''){
            // Emptry vendor validation
            if(values.vehicle_owner === 'vendor' && values.vendor === ''){
                if(values.vendor === ''){
                    form.setError('vendor', {message:'*Please select a vendor'});
                }
                return;
            }
            // Creating
            else{
                const res = await createVehicleDetails({
                    vehicle_owner:values.vehicle_owner,
                    vehicle_type:values.vehicle_type,
                    vehicle_name:values.vehicle_name,
                    vehicle_reg_no:values.vehicle_reg_no,
                    driver_name:values.driver_name,
                    attendent_name:values.attendent_name,
                    fule_type:values.fule_type,
                    seating_capacity:values.seating_capacity,
                    facility_in_bus:{
                        cctv:values.facility_in_bus.cctv,
                        wifi:values.facility_in_bus.wifi,
                        gps:values.facility_in_bus.gps,
                        ac:values.facility_in_bus.ac
                    },
                    driver_mobile_no:values.driver_mobile_no,
                    gps_no:values.gps_no,
                    service_due_date:values.service_due_date,
                    insurance_due_date:values.insurance_due_date,
                    vendor:values.vendor
                });
                if(res === 0){
                    toast({title:'Please create a session first', variant:'alert'});
                    return;
                };
                toast({title:'Added Successfully!'});
            }
        }
        // Modify vehicle details
        else if(!deepEqual(comparisonObject, values) || moment(values.service_due_date).format('DD-MM-YYYY') !== moment(comparisonObject.service_due_date).format('DD-MM-YYYY') || moment(values.insurance_due_date).format('DD-MM-YYYY') !== moment(comparisonObject.insurance_due_date).format('DD-MM-YYYY')){
            // Emptry vendor validation
            if(values.vehicle_owner === 'vendor' && values.vendor === ''){
                if(values.vendor === ''){
                    form.setError('vendor', {message:'*Please select a vendor'});
                }
                return;
            }
            // Modifying
            else{
                await modifyVehicleDetails({
                    id:updateVehicleDetails.id,
                    vehicle_owner:values.vehicle_owner,
                    vehicle_type:values.vehicle_type,
                    vehicle_name:values.vehicle_name,
                    vehicle_reg_no:values.vehicle_reg_no,
                    driver_name:values.driver_name,
                    attendent_name:values.attendent_name,
                    fule_type:values.fule_type,
                    seating_capacity:values.seating_capacity,
                    facility_in_bus:{
                        cctv:values.facility_in_bus.cctv,
                        wifi:values.facility_in_bus.wifi,
                        gps:values.facility_in_bus.gps,
                        ac:values.facility_in_bus.ac
                    },
                    driver_mobile_no:values.driver_mobile_no,
                    gps_no:values.gps_no,
                    service_due_date:values.service_due_date,
                    insurance_due_date:values.insurance_due_date,
                    vendor:values.vendor
                });
                toast({title:'Updated Successfully!'});
            }
        }
        // Delete vehicle details
        else if(updateVehicleDetails.isDeleteClicked){
            await deleteVehicleDetails({id:updateVehicleDetails.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateVehicleDetails({
            id:'',
            isDeleteClicked:false,
            vehicle_owner:'school',
            vehicle_type:'',
            vehicle_name:'',
            vehicle_reg_no:'',
            driver_name:'',
            attendent_name:'',
            fule_type:'',
            seating_capacity:0,
            facility_in_bus:{
                cctv:false,
                wifi:false,
                gps:false,
                ac:false
            },
            driver_mobile_no:'',
            gps_no:'',
            service_due_date:new Date(),
            insurance_due_date:new Date(),
            vendor:''
        });
        // Reseting form
        form.reset({
            vehicle_owner:'school',
            vehicle_type:'',
            vehicle_name:'',
            vehicle_reg_no:'',
            driver_name:'',
            attendent_name:'',
            fule_type:'',
            seating_capacity:0,
            facility_in_bus:{
                cctv:false,
                wifi:false,
                gps:false,
                ac:false
            },
            driver_mobile_no:'',
            gps_no:'',
            service_due_date:new Date(),
            insurance_due_date:new Date(),
            vendor:''
        });
        setServiceDueDate(moment());
        setInsuranceDueDate(moment());

    };


    // Use effects
    useEffect(() => {}, [form.watch('facility_in_bus.cctv'), form.watch('facility_in_bus.wifi'), form.watch('facility_in_bus.gps'), form.watch('facility_in_bus.ac')]);
    useEffect(() => {
        if(updateVehicleDetails.id !== ''){
            setServiceDueDate(moment(updateVehicleDetails.service_due_date));
            setInsuranceDueDate(moment(updateVehicleDetails.insurance_due_date));
        };
    }, []);
    useEffect(() => {
        if(serviceDueDate){
            // @ts-ignore
            form.setValue('service_due_date', serviceDueDate._d);
        };
    }, [serviceDueDate]);
    useEffect(() => {
        if(insuranceDueDate){
            // @ts-ignore
            form.setValue('insurance_due_date', insuranceDueDate._d);
        };
    }, [insuranceDueDate]);


    return (
        <div className='w-[90%] max-w-[500px] max-h-[90%] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] overflow-scroll custom-sidebar-scrollbar sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Vehicle Details</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center gap-8 px-2 sm:px-4 sm:gap-2'
                >


                    {/* Vehicle Owner */}
                    <FormField
                        control={form.control}
                        name='vehicle_owner'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Vehicle Owner</FormLabel>
                                <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <RadioGroup
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className='h-full flex flex-row items-center'
                                        >
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem value='school' id='school' checked={form.getValues().vehicle_owner === 'school'}/>
                                                <Label htmlFor='school'>School</Label>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem value='vendor' id='vendor' checked={form.getValues().vehicle_owner === 'vendor'}/>
                                                <Label htmlFor='vendor'>Vendor</Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage className='text-xs mt-[-20px]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Vehicle Type */}
                    <FormField
                        control={form.control}
                        name='vehicle_type'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full h-8 flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-center text-xs text-[#726E71] sm:basis-[30%]'>Vehicle Type</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
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
                                                {vehiclesTypes.length < 1 ? (
                                                    <p>No vehicle types</p>
                                                ) : vehiclesTypes[0] === '' ? (
                                                    <LoadingIcon />
                                                ) : vehiclesTypes.map((v:any) => (
                                                    <SelectItem value={v} key={v}>{v}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-xs'/>
                                </div>
                            </div>
                        </FormItem>
                        )}
                    />

                    {/* Vehicle Name */}
                    <FormField
                        control={form.control}
                        name='vehicle_name'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Vehicle Name</FormLabel>
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

                    {/* Vehicle Reg. No. */}
                    <FormField
                        control={form.control}
                        name='vehicle_reg_no'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Vehicle Reg. No.</FormLabel>
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

                    {/* Driver Name */}
                    <FormField
                        control={form.control}
                        name='driver_name'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Driver Name</FormLabel>
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

                    {/* Attendent Name */}
                    <FormField
                        control={form.control}
                        name='attendent_name'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Attendant Name</FormLabel>
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

                    {/* Fuel Type */}
                    <FormField
                        control={form.control}
                        name='fule_type'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Fuel Type</FormLabel>
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
                                                <SelectItem value='Petrol'>Petrol</SelectItem>
                                                <SelectItem value='Diesel'>Diesel</SelectItem>
                                                <SelectItem value='CNG'>CNG</SelectItem>
                                                <SelectItem value='EV'>EV</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='text-xs mt-[-20px]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Seating Capacity */}
                    <FormField
                        control={form.control}
                        name='seating_capacity'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Seating Capacity</FormLabel>
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


                    {/* Driver Mobile No. */}
                    <FormField
                        control={form.control}
                        name='driver_mobile_no'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Driver Mobile No.</FormLabel>
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

                    {/* Service Due Date */}
                    <FormField
                        control={form?.control}
                        name='service_due_date'
                        render={() => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Service Due Date</FormLabel>
                                <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <div className='w-full'>
                                        <MyDatePicker
                                            selectedDate={serviceDueDate}
                                            setSelectedDate={setServiceDueDate}
                                        />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Insurance Due Date */}
                    <FormField
                        control={form?.control}
                        name='insurance_due_date'
                        render={() => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Service Due Date</FormLabel>
                                <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <div className='w-full'>
                                        <MyDatePicker
                                            selectedDate={insuranceDueDate}
                                            setSelectedDate={setInsuranceDueDate}
                                        />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* GPS No. */}
                    <FormField
                        control={form.control}
                        name='gps_no'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>GPS No.</FormLabel>
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

                    {/* Vendor */}
                    <FormField
                        control={form.control}
                        name='vendor'
                        render={({field}) => (
                            <FormItem className={`w-full h-8 flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2 ${form.getValues().vehicle_owner === 'vendor' ? 'flex' : 'hidden'}`}>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Vendor</FormLabel>
                                <div className='relative w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
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
                                                {vendors.length < 1 ? (
                                                    <p>No vendors</p>
                                                ) : !vendors[0].travel_agency_name ? (
                                                    <LoadingIcon />
                                                ) : vendors.map((v:any) => (
                                                    <SelectItem value={v.travel_agency_name} key={v._id}>{v.travel_agency_name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='absolute bottom-[-10px] text-xs mt-[-20px]'/>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Bus Facilities */}
                    <div className='w-full flex flex-row items-center mt-1 gap-4'>
                        <p className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Bus Facilities</p>
                        <div className='basis-auto flex flex-row items-center gap-2 sm:basis-[70%]'>
                            {/* CCTV */}
                            <div className='flex items-center space-x-[2px]'>
                                <Checkbox
                                    id='cctv'
                                    checked={form.getValues().facility_in_bus.cctv}
                                    onClick={() => form.setValue('facility_in_bus.cctv', !form.getValues().facility_in_bus.cctv)}
                                    className='rounded-[2px] text-[#726E71]'
                                />
                                <label
                                    htmlFor='cctv'
                                    className='text-xs text-[#726E71]'
                                >
                                    CCTV
                                </label>
                            </div>

                            {/* Wi-fi */}
                            <div className='flex items-center space-x-[2px]'>
                                <Checkbox
                                    id='wifi'
                                    checked={form.getValues().facility_in_bus.wifi}
                                    onClick={() => form.setValue('facility_in_bus.wifi', !form.getValues().facility_in_bus.wifi)}
                                    className='rounded-[2px] text-[#726E71]'
                                />
                                <label
                                    htmlFor='wifi'
                                    className='text-xs text-[#726E71]'
                                >
                                    Wi-fi
                                </label>
                            </div>

                            {/* GPS */}
                            <div className='flex items-center space-x-[2px]'>
                                <Checkbox
                                    id='gps'
                                    checked={form.getValues().facility_in_bus.gps}
                                    onClick={() => form.setValue('facility_in_bus.gps', !form.getValues().facility_in_bus.gps)}
                                    className='rounded-[2px] text-[#726E71]'
                                />
                                <label
                                    htmlFor='gps'
                                    className='text-xs text-[#726E71]'
                                >
                                    GPS
                                </label>
                            </div>

                            {/* AC */}
                            <div className='flex items-center space-x-[2px]'>
                                <Checkbox
                                    id='ac'
                                    checked={form.getValues().facility_in_bus.ac}
                                    onClick={() => form.setValue('facility_in_bus.ac', !form.getValues().facility_in_bus.ac)}
                                    className='rounded-[2px] text-[#726E71]'
                                />
                                <label
                                    htmlFor='ac'
                                    className='text-xs text-[#726E71]'
                                >
                                    AC
                                </label>
                            </div>
                        </div>
                    </div>


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} vehiclesDetails={vehiclesDetails} updateVehicleDetails={updateVehicleDetails} setUpdateVehicleDetails={setUpdateVehicleDetails} onSubmit={onSubmit} form={form} setServiceDueDate={setServiceDueDate} setInsuranceDueDate={setInsuranceDueDate}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;