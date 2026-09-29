// Imports
import {ChevronDown} from 'lucide-react';
import {Input} from '@/components/ui/input';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const CopyReportSetting = ({form, layouts}:any) => {
    return (
        <div className='w-full flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
            <h2 className='w-full bg-[#EDF1F5] font-[900] text-start text-xs py-2 px-2 rounded-[5px]'>Copy Report Setting</h2>
            <div className='flex flex-col px-4 py-4 gap-2 lg:flex-row'>

                {/* Copy From */}
                <div className='w-full flex flex-col items-center'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71]'>Copy From</FormLabel>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                        <FormField
                            control={form.control}
                            name='copy_report_setting.copy_from'
                            render={({ field }) => (
                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field?.value}
                                            onValueChange={field?.onChange}
                                        >
                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {layouts?.length < 1 ? (
                                                    <p>No reports</p>
                                                ) : !layouts[0]?.report_setting?.report_name ? (
                                                    <LoadingIcon />
                                                ) : layouts?.map((l:any) => (
                                                    <SelectItem value={l.report_setting?.report_name} key={l?._id}>{l?.report_setting?.report_name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                {/* Report Name */}
                <FormField
                    control={form.control}
                    name='copy_report_setting.report_name'
                    render={({ field }) => (
                        <FormItem className='w-full lg:mt-2'>
                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Report Name</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
                {/* Report Title */}
                <FormField
                    control={form.control}
                    name='copy_report_setting.report_title'
                    render={({ field }) => (
                        <FormItem className='w-full mt-2'>
                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Report Title</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};





// Export
export default CopyReportSetting;