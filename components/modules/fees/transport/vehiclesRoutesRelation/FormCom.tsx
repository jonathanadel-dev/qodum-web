'use client';
// Imports
import * as z from 'zod';
import {useEffect} from 'react';
import Buttons from './Buttons';
import RoutesList from './RoutesList';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {relateVehicleToRoute} from '@/lib/actions/fees/transport/vehicleDetails.actions';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {VehicleRoutesRelationValidation} from '@/lib/validations/fees/transport/vehicleRoutesRelation.validation';





// Main function
const FormCom = ({setIsViewOpened, vehicles, routes, updateRoute, setUpdateRoute, selectedRoutes, setSelectedRoutes, selectedVehicle, setSelectedVehicle}:any) => {


    // Toast
    const {toast} = useToast();
    
    
    // Form
    const form = useForm({
        resolver:zodResolver(VehicleRoutesRelationValidation),
        defaultValues:{
            vehicle_name:selectedVehicle?.vehicle_name || '',
            vehicle_no:selectedVehicle?.vehicle_reg_no || ''
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof VehicleRoutesRelationValidation>) => {


        // Relating routes to vehicle
        if(updateRoute.id === ''){
            await relateVehicleToRoute({
                id:selectedVehicle._id,
                routes:selectedRoutes.filter((r:any) => r.route_no).map((r:any) => {
                    return {
                        route_no:r.route_no,
                        route_description:r.route_description
                    };
                })
            });
            toast({title:'Vehicle route relation saved Successfully!'});
        }
        // Modifying
        else if(updateRoute.id !== '' && !updateRoute.isDeleteClicked){
            await relateVehicleToRoute({
                id:selectedVehicle._id,
                routes:selectedRoutes.filter((r:any) => r.route_no).map((r:any) => {
                    return {
                        route_no:r.route_no,
                        route_description:r.route_description
                    };
                })
            });
            toast({title:'Vehicle route relation modified Successfully!'});
        }
        // Deleting
        else if(updateRoute.isDeleteClicked){
            await relateVehicleToRoute({
                id:selectedVehicle._id,
                routes:[]
            });  
            toast({title:'Vehicle route relation deleted Successfully!'});
        };


        // Reseting form
        setUpdateRoute({
            id:''
        });
        form.reset({
            vehicle_name:'',
            vehicle_no:''
        });
        setSelectedRoutes([]);
        setSelectedVehicle({});
    };


    // Use effect
    useEffect(() => {
        if(form.getValues().vehicle_name !== ''){

            // Setting id
            const selectedVehicle = vehicles.filter((v:any) => v.vehicle_name === form.getValues().vehicle_name)[0];
            form.setValue('vehicle_no', selectedVehicle?.vehicle_reg_no || '');
            setSelectedVehicle(selectedVehicle);

            // Fetching vehicles routes
            setSelectedRoutes(routes.filter((r:any) => selectedVehicle?.routes?.map((r:any) => r.route_no).includes(r.route_no)));
        };
    }, [form.watch('vehicle_name'), selectedVehicle]);


    return (
        <div className='w-[90%] max-w-[700px] max-h-[90%] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] overflow-scroll custom-sidebar-scrollbar sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Vehicle Route Relation</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center gap-8 px-2 pt-4 sm:px-4 sm:gap-2'
                >


                    {/* Vehicle Name */}
                    <FormField
                        control={form.control}
                        name='vehicle_name'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full h-8 flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-center text-xs text-[#726E71] sm:basis-[30%]'>Vehicle Name</FormLabel>
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
                                                {vehicles.length < 1 ? (
                                                    <p>No vehicles</p>
                                                ) : !vehicles[0].vehicle_name ? (
                                                    <LoadingIcon />
                                                ) : vehicles.map((v:any) => (
                                                    <SelectItem value={v.vehicle_name} key={v._id}>{v.vehicle_name}</SelectItem>
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


                    {/* Vehicle No. */}
                    <FormField
                        control={form.control}
                        // disabled
                        name='vehicle_no'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Vehicle No.</FormLabel>
                                <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            disabled
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='text-xs mt-[-20px]'/>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Routes List */}
                    <RoutesList
                        routes={routes}
                        selectedRoutes={selectedRoutes}
                        setSelectedRoutes={setSelectedRoutes}
                    />


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} updateRoute={updateRoute} setUpdateRoute={setUpdateRoute} vehicles={vehicles} onSubmit={onSubmit} form={form} setSelectedRoutes={setSelectedRoutes}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;