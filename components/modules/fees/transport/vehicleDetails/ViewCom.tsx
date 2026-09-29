// Imports
import {Button} from '@/components/ui/button';
import {ChevronsUpDown, X} from 'lucide-react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from '@/components/ui/command';
import LoadingIcon from '@/components/shared/LoadingIcon';





// Main Function
const ViewCom = ({setIsViewOpened, vehiclesDetails, setUpdateVehicleDetails}:any) => {


    // Select handler
    const selectHandler = (vehicleDetails:any) => {
        setUpdateVehicleDetails({
            id:vehicleDetails._id,
            isDeleteClicked:false,
            vehicle_owner:vehicleDetails.vehicle_owner,
            vehicle_type:vehicleDetails.vehicle_type,
            vehicle_name:vehicleDetails.vehicle_name,
            vehicle_reg_no:vehicleDetails.vehicle_reg_no,
            driver_name:vehicleDetails.driver_name,
            attendent_name:vehicleDetails.attendent_name,
            fule_type:vehicleDetails.fule_type,
            seating_capacity:vehicleDetails.seating_capacity,
            facility_in_bus:{
                cctv:vehicleDetails.facility_in_bus.cctv,
                wifi:vehicleDetails.facility_in_bus.wifi,
                gps:vehicleDetails.facility_in_bus.gps,
                ac:vehicleDetails.facility_in_bus.ac
            },
            driver_mobile_no:vehicleDetails.driver_mobile_no,
            gps_no:vehicleDetails.gps_no,
            service_due_date:vehicleDetails.service_due_date,
            insurance_due_date:vehicleDetails.insurance_due_date,
            vendor:vehicleDetails.vendor
        });
        setIsViewOpened(false);
    };


    return (
        <Command
            className='w-[90%] max-h-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8] lg:w-[80%]'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Vehicles Details List</h2>
                <X color='#3a3a3a' size={18} cursor={'pointer'} onClick={() => setIsViewOpened(false)}/>
            </div>
            <div className='w-[95%] h-[90%] flex flex-col items-center bg-[#F1F1F1] rounded-[8px]'>


                {/* Search input */}
                <div className='w-full flex flex-row justify-end pr-4 py-2 border-b-[0.5px] border-[#ccc]'>
                    <CommandInput
                        placeholder='Search list'
                        className='h-full text-xs text-hash-color w-[250px] bg-white'
                    />
                </div>


                {/* Vehicle Details */}
                <div className='w-full flex flex-col h-[90%] overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[1200px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[7.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Select
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Transport For
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Vehicle Name
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Vehicle Type
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Vehicle No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Driver Name
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Driver Mobile
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Agency Name
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2'>
                            Agency Mobile No.
                            <ChevronsUpDown size={12}/>
                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>
                        {
                            vehiclesDetails.length < 1 ? (
                                <p className='w-full min-w-[1200px] flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-[0.5px] border-[#ccc]'>
                                    No vehicle details yet
                                </p>
                            ): !vehiclesDetails[0]?.vehicle_name ? (
                                <LoadingIcon />
                            ) : vehiclesDetails.map((vehicleDetails:any) => (
                                <CommandItem
                                    value={`${vehiclesDetails.indexOf(vehicleDetails) + 1} ${vehicleDetails?.vehicle_owner} ${vehicleDetails?.vehicle_name} ${vehicleDetails?.vehicle_type} ${vehicleDetails?.vehicle_reg_no} ${vehicleDetails?.driver_name} ${vehicleDetails?.driver_mobile_no}`}
                                    className='w-full min-w-[1200px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                >
                                    <li className='basis-[7.5%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{vehiclesDetails.indexOf(vehicleDetails) + 1}</li>
                                    <li className='basis-[10%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                        <Button
                                            className='px-[8px] h-6 text-[10px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[0.5px] rounded-full border-[#E2E4FF]
                                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-xs sm:px-4'
                                            onClick={() => selectHandler(vehicleDetails)}
                                        >
                                            Select
                                        </Button>
                                    </li>
                                    <li className='basis-[12.5%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{vehicleDetails?.vehicle_owner}</li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{vehicleDetails?.vehicle_name}</li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{vehicleDetails?.vehicle_type}</li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{vehicleDetails?.vehicle_reg_no}</li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{vehicleDetails?.driver_name || '-'}</li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{vehicleDetails?.driver_mobile_no || '-'}</li>
                                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>N/A</li>
                                    <li className='basis-[10%] flex flex-row items-center px-2'>N/A</li>
                                </CommandItem>
                            ))
                        }
                    </CommandList>

                    {vehiclesDetails.length > 0 && <CommandEmpty>No results found</CommandEmpty>}
                </div>


                {/* Buttons */}
                <div className='w-full flex flex-row items-center justify-between py-4 px-2 border-t-[0.5px] border-[#ccc]'>
                    {/* Items per page */}
                    <div className='text-[10px] flex flex-col items-center gap-2 sm:text-sm sm:flex-row'>
                        <p className='text-hash-color'>Items per page:</p>
                        <Select>
                            <SelectTrigger className='flex flex-row items-center h-8 pl-2 text-[10px] bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] sm:text-xs'>
                                <SelectValue placeholder='1000' className='text-xs'/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='10'>10</SelectItem>
                                <SelectItem value='15'>15</SelectItem>
                                <SelectItem value='50'>50</SelectItem>
                                <SelectItem value='100'>100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Skipping */}
                    <div className='flex flex-row items-center gap-[2px] sm:gap-[4px]'>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>First</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Prev.</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>1</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Next</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Last</Button>
                    </div>
                </div>


            </div>
        </Command>
    );
};





// Export
export default ViewCom;