// Imports
import {ChevronDown, ChevronsUpDown} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Command, CommandItem, CommandList} from '@/components/ui/command';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';





// Main Function
const MonthsList = ({form, transportGroups}:any) => {


    // All transport handler
    const allTransportHandler = (v:any) => {
        form.setValue('transport_groups.jan', v);
        form.setValue('transport_groups.feb', v);
        form.setValue('transport_groups.mar', v);
        form.setValue('transport_groups.apr', v);
        form.setValue('transport_groups.may', v);
        form.setValue('transport_groups.jun', v);
        form.setValue('transport_groups.jul', v);
        form.setValue('transport_groups.aug', v);
        form.setValue('transport_groups.sep', v);
        form.setValue('transport_groups.oct', v);
        form.setValue('transport_groups.nov', v);
        form.setValue('transport_groups.dec', v);
    };

    return (       
        <Command
            className='w-[100%] max-h-[90%] flex flex-col items-center mt-4 pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'
        >

                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-white bg-[#435680] cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Months
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[60%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            <Select
                                onValueChange={(v:any) => allTransportHandler(v)}
                            >
                                <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#FAFAFA]'>
                                    <SelectValue placeholder='Select'/>
                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                </SelectTrigger>
                                <SelectContent>
                                    {transportGroups.length < 1 ? (
                                        <p className='text-xs text-hash-color'>No transport groups</p>
                                    ) : !transportGroups[0]?.distance_name ? (
                                        <LoadingIcon />
                                    ) : transportGroups.map((t:any) => (
                                        <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <ChevronsUpDown size={12} />
                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>


                        {/* Apr transport group */}
                        <CommandItem
                            className='w-full flex flex-row text-[10px] bg-[#fff] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                        >
                            <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>4</li>
                            <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                Apr
                            </li>
                            <li className='basis-[60%] flex items-center justify-center py-[2px]'>
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='transport_groups.apr'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {transportGroups.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No transport groups</p>
                                                            ) : !transportGroups[0]?.distance_name ? (
                                                                <LoadingIcon />
                                                            ) : transportGroups.map((t:any) => (
                                                                <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </li>
                        </CommandItem>


                        {/* May transport group */}
                        <CommandItem
                            className='w-full flex flex-row text-[10px] bg-[#F3F8FB] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                        >
                            <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>5</li>
                            <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                May
                            </li>
                            <li className='basis-[60%] flex items-center justify-center py-[2px]'>
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='transport_groups.may'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {transportGroups.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No transport groups</p>
                                                            ) : !transportGroups[0]?.distance_name ? (
                                                                <LoadingIcon />
                                                            ) : transportGroups.map((t:any) => (
                                                                <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </li>
                        </CommandItem>


                        {/* Jun transport group */}
                        <CommandItem
                            className='w-full flex flex-row text-[10px] bg-[#fff] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                        >
                            <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>6</li>
                            <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                Jun
                            </li>
                            <li className='basis-[60%] flex items-center justify-center py-[2px]'>
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='transport_groups.jun'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {transportGroups.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No transport groups</p>
                                                            ) : !transportGroups[0]?.distance_name ? (
                                                                <LoadingIcon />
                                                            ) : transportGroups.map((t:any) => (
                                                                <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </li>
                        </CommandItem>


                        {/* Jul transport group */}
                        <CommandItem
                            className='w-full flex flex-row text-[10px] bg-[#F3F8FB] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                        >
                            <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>7</li>
                            <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                Jul
                            </li>
                            <li className='basis-[60%] flex items-center justify-center py-[2px]'>
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='transport_groups.jul'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {transportGroups.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No transport groups</p>
                                                            ) : !transportGroups[0]?.distance_name ? (
                                                                <LoadingIcon />
                                                            ) : transportGroups.map((t:any) => (
                                                                <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </li>
                        </CommandItem>


                        {/* Aug transport group */}
                        <CommandItem
                            className='w-full flex flex-row text-[10px] bg-[#fff] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                        >
                            <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>8</li>
                            <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                Aug
                            </li>
                            <li className='basis-[60%] flex items-center justify-center py-[2px]'>
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='transport_groups.aug'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {transportGroups.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No transport groups</p>
                                                            ) : !transportGroups[0]?.distance_name ? (
                                                                <LoadingIcon />
                                                            ) : transportGroups.map((t:any) => (
                                                                <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </li>
                        </CommandItem>


                        {/* Sep transport group */}
                        <CommandItem
                            className='w-full flex flex-row text-[10px] bg-[#F3F8FB] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                        >
                            <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>9</li>
                            <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                Sep
                            </li>
                            <li className='basis-[60%] flex items-center justify-center py-[2px]'>
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='transport_groups.sep'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {transportGroups.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No transport groups</p>
                                                            ) : !transportGroups[0]?.distance_name ? (
                                                                <LoadingIcon />
                                                            ) : transportGroups.map((t:any) => (
                                                                <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </li>
                        </CommandItem>


                        {/* Oct transport group */}
                        <CommandItem
                            className='w-full flex flex-row text-[10px] bg-[#fff] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                        >
                            <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>10</li>
                            <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                Oct
                            </li>
                            <li className='basis-[60%] flex items-center justify-center py-[2px]'>
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='transport_groups.oct'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {transportGroups.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No transport groups</p>
                                                            ) : !transportGroups[0]?.distance_name ? (
                                                                <LoadingIcon />
                                                            ) : transportGroups.map((t:any) => (
                                                                <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </li>
                        </CommandItem>


                        {/* Nov transport group */}
                        <CommandItem
                            className='w-full flex flex-row text-[10px] bg-[#F3F8FB] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                        >
                            <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>11</li>
                            <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                Nov
                            </li>
                            <li className='basis-[60%] flex items-center justify-center py-[2px]'>
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='transport_groups.nov'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {transportGroups.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No transport groups</p>
                                                            ) : !transportGroups[0]?.distance_name ? (
                                                                <LoadingIcon />
                                                            ) : transportGroups.map((t:any) => (
                                                                <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </li>
                        </CommandItem>


                        {/* Dec transport group */}
                        <CommandItem
                            className='w-full flex flex-row text-[10px] bg-[#fff] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                        >
                            <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>12</li>
                            <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                Dec
                            </li>
                            <li className='basis-[60%] flex items-center justify-center py-[2px]'>
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='transport_groups.dec'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {transportGroups.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No transport groups</p>
                                                            ) : !transportGroups[0]?.distance_name ? (
                                                                <LoadingIcon />
                                                            ) : transportGroups.map((t:any) => (
                                                                <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </li>
                        </CommandItem>
                        

                        {/* Jan transport group */}
                        <CommandItem
                            className='w-full flex flex-row text-[10px] bg-[#F3F8FB] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                        >
                            <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>1</li>
                            <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                Jan
                            </li>
                            <li className='basis-[60%] flex items-center justify-center py-[2px]'>
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='transport_groups.jan'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {transportGroups.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No transport groups</p>
                                                            ) : !transportGroups[0]?.distance_name ? (
                                                                <LoadingIcon />
                                                            ) : transportGroups.map((t:any) => (
                                                                <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </li>
                        </CommandItem>


                        {/* Feb transport group */}
                        <CommandItem
                            className='w-full flex flex-row text-[10px] bg-[#fff] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                        >
                            <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>2</li>
                            <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                Feb
                            </li>
                            <li className='basis-[60%] flex items-center justify-center py-[2px]'>
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='transport_groups.feb'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#fff] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {transportGroups.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No transport groups</p>
                                                            ) : !transportGroups[0]?.distance_name ? (
                                                                <LoadingIcon />
                                                            ) : transportGroups.map((t:any) => (
                                                                <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </li>
                        </CommandItem>


                        {/* Mar transport group */}
                        <CommandItem
                            className='w-full flex flex-row text-[10px] bg-[#F3F8FB] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                        >
                            <li className='basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>3</li>
                            <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                Mar
                            </li>
                            <li className='basis-[60%] flex items-center justify-center py-[2px]'>
                                {/* Meridiem */}
                                <FormField
                                    control={form.control}
                                    name='transport_groups.mar'
                                    render={({field}) => (
                                        <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                            <div className='w-full h-full flex flex-col items-start gap-4'>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='h-8 m-auto w-[50%] flex flex-row items-center text-hash-color text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                            <SelectValue placeholder='Select'/>
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {transportGroups.length < 1 ? (
                                                                <p className='text-xs text-hash-color'>No transport groups</p>
                                                            ) : !transportGroups[0]?.distance_name ? (
                                                                <LoadingIcon />
                                                            ) : transportGroups.map((t:any) => (
                                                                <SelectItem value={t.distance_name} key={t._id}>{t.distance_name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className='text-xs mt-[-20px]'/>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </li>
                        </CommandItem>

                    </CommandList>
                </div>

        </Command>    
    );
};





// Export
export default MonthsList;