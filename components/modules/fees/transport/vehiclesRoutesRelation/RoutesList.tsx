// Imports
import {ChevronsUpDown} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Command, CommandItem, CommandList} from '@/components/ui/command';





// Main Function
const RoutesList = ({routes, selectedRoutes, setSelectedRoutes}:any) => {
    return (       
        <Command className='w-[100%] max-h-[90%] flex flex-col items-center mt-4 pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'>
                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[600px] flex flex-row text-[10px] text-white border-b-[0.5px] bg-[#435680] border-[#ccc] cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[60%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            {`Route No. => Description`} 
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-center px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            {routes.length > 0 && (
                                <Checkbox
                                    checked={selectedRoutes.length === routes.length}
                                    onCheckedChange={() => {
                                        selectedRoutes.length === routes.length
                                            ?
                                                setSelectedRoutes([])
                                            :
                                                setSelectedRoutes(routes.map((r:any) => r.route_no));
                                    }}
                                    className='rounded-[2px] text-hash-color'
                                />
                            )}
                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>
                        {routes?.length < 1 ? (
                                <p className='w-full min-w-[600px] flex flex-row p-2 text-sm bg-[#fff] border-b-[0.5px] border-[#ccc]'>
                                    No Students
                                </p>
                            ) : !routes[0].route_no ? (
                                <LoadingIcon />
                            ) : routes?.map((r: any, index: number) => (
                                <CommandItem
                                    key={index}
                                    className={`w-full min-w-[600px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((routes.indexOf(r) + 1) / 2) * 2 !== routes.indexOf(r) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                                >
                                    <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>{routes.indexOf(r) + 1}</li>
                                    <li className='basis-[60%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {`${r.route_no} => ${r.route_description}`}
                                    </li>
                                    <li className='basis-[20%] flex items-center justify-center p-[2px]'>
                                        <Checkbox
                                            checked={selectedRoutes.map((s:any) => s.route_no).includes(r.route_no)}
                                            onCheckedChange={() => {
                                                selectedRoutes.map((s:any) => s.route_no).includes(r.route_no)
                                                    ?
                                                        setSelectedRoutes(selectedRoutes.filter((s:any) => s.route_no !== r.route_no))
                                                    :
                                                        setSelectedRoutes([...selectedRoutes, r])
                                            }}
                                            className='rounded-[2px] text-hash-color'
                                        />
                                    </li>

                                </CommandItem>
                            ))
                        }
                    </CommandList>
                </div>
        </Command>    
    );
};





// Export
export default RoutesList;