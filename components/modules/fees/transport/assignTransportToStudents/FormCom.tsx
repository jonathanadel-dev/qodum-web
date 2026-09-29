'use client';
// Imports
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import StudentsList from './StudentList';
import {Button} from '@/components/ui/button';
import {AuthContext} from '@/context/AuthContext';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {useContext, useEffect, useState} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {fetchRouteStops} from '@/lib/actions/fees/transport/routeStop.actions';
import {fetchVehicleRoutes} from '@/lib/actions/fees/transport/vehicleRoute.actions';
import {fetchVehiclesDetails} from '@/lib/actions/fees/transport/vehicleDetails.actions';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {AssignTransportToStudentsValidation} from '@/lib/validations/fees/transport/assignTransportToStudents.validation';
import {ModifyStudentsTransportDetails, fetchStudentsByClassAndSectionTransport} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const FormCom = ({classes, sections, students, setStudents}:any) => {

    // User
    const {user} = useContext(AuthContext);


    // Permissions
    const [permissions, setPermissions] = useState({
        add:false,
        modify:false,
        delete:false,
        print:false,
        read_only:false
    });


    // Toast
    const {toast} = useToast();


    // Routes
    const [routes, setRoutes] = useState<any>([{}]);


    // Stops
    const [stops, setStops] = useState<any>([{}]);


    // Vehicles
    const [vehicles, setVehicles] = useState<any>([{}]);


    // Is students loading
    const [isStudentsLoading, setIsStudentsLoading] = useState(false);


    // Selected students
    const [selectedStudents, setSelectedStudents] = useState<any>([]);


    // Form
    const form = useForm({
        resolver: zodResolver(AssignTransportToStudentsValidation),
        defaultValues:{
            class_name:'',
            section_name:''
        }
    });


    // Fetcher
    const fetcher = async () => {
        const routesRes = await fetchVehicleRoutes();
        const stopsRes = await fetchRouteStops();
        const vehiclesRes = await fetchVehiclesDetails();
        setRoutes(routesRes);
        setStops(stopsRes);
        setVehicles(vehiclesRes);
        const res = await fetchStudentsByClassAndSectionTransport({class_name:form.getValues().class_name, section:form.getValues().section_name});
        setStudents(res.map((s:any) => {
            return {
                adm_no:s.student.adm_no,
                name:s.student.name,
                father_name:s.parents.father.father_name,
                route:s?.transport_details?.route || '',
                stop:s?.transport_details?.stop || '',
                vehicle:s?.transport_details?.vehicle || '',
                seat_no:s?.transport_details?.seat_no || 1,
                months:s?.transport_details?.months || [],
                is_transport_assigned:s?.transport_details?.route
            };
        }));
        setSelectedStudents([]);
        setIsStudentsLoading(false);
    };


    // Submit handler
    const onSubmit = async (values: z.infer<typeof AssignTransportToStudentsValidation>) => {
        try {

            // Empty validation
            if(selectedStudents.length === 0){
                toast({title:'Please select students', variant:'alert'});
                return;
            };


            // Assigning student transport details
            if(selectedStudents[0].name !== ''){
                selectedStudents.map(async (s:any) => {
                    await ModifyStudentsTransportDetails({
                        adm_no:s.adm_no,
                        transport_details:{
                            route:s.route,
                            stop:s.stop,
                            vehicle:s.vehicle,
                            months:s.months,
                            seat_no:s.seat_no
                        }
                    });
                })
            };


            // Toast
            toast({title:'Assigned Successfully!'});

            // Reseting
            // form.reset({
            //     class_name:'',
            //     section_name:''
            // });
            // setStudents([]);
            // setSelectedStudents([{}]);
            fetcher();

        } catch (err:any) {
            console.log(err);
        }
    };


    // Use effect
    useEffect(() => {
        if(form.getValues().class_name !== '' && form.getValues().section_name !== ''){
            setIsStudentsLoading(true);
            fetcher();
        };
    }, [form.watch('class_name'), form.watch('section_name')]);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Fees')?.permissions?.find((pp:any) => pp.sub_menu === 'Assign Transport To Students');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-[95%] max-w-[1100px] flex flex-col items-center rounded-[8px] sm:w-[95%]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col gap-6 pt-0 items-center px-2 sm:px-4 sm:gap-2 lg:pt-4'
                >

                    <div className='w-full max-w-[500px] flex flex-col justify-between gap-2 lg:flex-row lg:items-end'>


                        {/* Class */}
                        <div className='flex-1'>
                            <FormLabel className='text-xs text-[#726E71]'>Class</FormLabel>
                            <FormField
                                control={form.control}
                                name='class_name'
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                disabled={!permissions.read_only}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Select Class' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {classes.length < 1 ? (
                                                        <p className='text-xs text-hash-color'>No classes yet</p>
                                                    ) : // @ts-ignore
                                                    !classes[0]?.class_name ? (
                                                        <LoadingIcon />
                                                    ) : classes.map((c:any) => (
                                                        <SelectItem value={c.class_name} key={c._id}>{c.class_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute top-[75%] left-0 text-red-500 text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Section */}
                        <div className='flex-1'>
                            <FormLabel className='text-xs text-[#726E71]'>Section</FormLabel>
                            <FormField
                                control={form.control}
                                name='section_name'
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                disabled={!permissions.read_only}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Select Section' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {sections.length < 1 ? (
                                                        <p className='text-xs text-hash-color'>No sections yet</p>
                                                    ) : // @ts-ignore
                                                    !sections[0]?.section_name ? (
                                                        <LoadingIcon />
                                                    ) : sections.map((s:any) => (
                                                        <SelectItem value={s.section_name} key={s._id}>{s.section_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute top-[75%] left-0 text-red-500 text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>


                        {permissions.modify && (
                            <Button
                                type='submit'
                                className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                            >
                                Update
                            </Button>
                        )}
                    </div>


                    <StudentsList selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} students={students} isStudentsLoading={isStudentsLoading} setStudents={setStudents} vehicles={vehicles} routes={routes} stops={stops}/>
                </form>
            </Form>


        </div>
    );
};





// Export
export default FormCom;