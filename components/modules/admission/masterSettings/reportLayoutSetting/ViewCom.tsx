// Imports
import moment from 'moment';
import {Button} from '@/components/ui/button';
import {ChevronsUpDown, X} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from '@/components/ui/command';





// Main Function
const ViewCom = ({setIsViewOpened, layouts, setUpdateLayout}:any) => {


    // Select handler
    const selectHandler = (l:any) => {
        setUpdateLayout({
            id:l._id,
            isDeleteClicked:false,
            // Report setting
            report_setting:{
                report_name:l.report_setting.report_name,
                report_title:l.report_setting.report_title
            },

            // Header and footer setting
            header_and_footer_setting:{
                is_header_enable:l.header_and_footer_setting.is_header_enable,
                is_header_line_enable:l.header_and_footer_setting.is_header_line_enable,
                is_footer_enable:l.header_and_footer_setting.is_footer_enable,
                is_footer_line_enable:l.header_and_footer_setting.is_footer_line_enable,
                is_logo_enable:l.header_and_footer_setting.is_logo_enable,
                is_row_no:l.header_and_footer_setting.is_row_no,
                is_group:l.header_and_footer_setting.is_group,
                is_sum:l.header_and_footer_setting.is_sum
            },

            // Font size setting
            font_size_setting:{
                font_size:l.font_size_setting.font_size,
                is_total:l.font_size_setting.is_total
            },

            // Page prientation and layout setting
            page_orientation_and_layout_setting:{
                page_orientation:l.page_orientation_and_layout_setting.page_orientation,
                page_layout:l.page_orientation_and_layout_setting.page_layout
            },

            // Height and width setting
            height_and_width_setting:{
                page_width:l.height_and_width_setting.page_width,
                page_height:l.height_and_width_setting.page_height,
                footer_height:l.height_and_width_setting.footer_height,
                header_height:l.height_and_width_setting.header_height,
                header_line_width:l.height_and_width_setting.header_line_width,
                logo_height:l.height_and_width_setting.logo_height,
                column_width:l.height_and_width_setting.column_width,
                footer_line_height:l.height_and_width_setting.footer_line_height,
                table_column_height:l.height_and_width_setting.table_column_height
            },

            // Margin setting
            margin_setting:{
                page_margin_right:l.margin_setting.page_margin_right,
                page_margin_left:l.margin_setting.page_margin_left,
                page_margin_bottom:l.margin_setting.page_margin_bottom,
                page_margin_top:l.margin_setting.page_margin_top,
                logo_margin_left:l.margin_setting.logo_margin_left,
                logo_margin_top:l.margin_setting.logo_margin_top,
                table_margin_left:l.margin_setting.table_margin_left,
                table_margin_top:l.margin_setting.table_margin_top,
                footer_line_margin_top:l.margin_setting.footer_line_margin_top,
                header_line_margin_top:l.margin_setting.header_line_margin_top
            }
        });
        setIsViewOpened(false);
    };


    return (
        <Command
            className='w-[90%] max-h-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8] lg:w-[70%]'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Report Layouts List</h2>
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


                {/* Layouts */}
                <div className='w-full flex flex-col h-[90%] overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[600px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Select
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[30%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Report Name
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[30%] flex flex-row items-center justify-between px-2'>
                            Report Title
                            <ChevronsUpDown size={12}/>
                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>
                        {
                            layouts.length < 1 ? (
                                <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-[0.5px] border-[#ccc]'>
                                    No layouts yet
                                </p>
                            ) : !layouts[0]?.report_setting?.report_name ? (
                                    <LoadingIcon />
                                ) : layouts.map((l:any, index:number) => (
                                    <CommandItem
                                        key={index}
                                        value={`${layouts.indexOf(l) + 1} ${l.report_setting?.report_name} ${l?.report_setting?.report_title}`}
                                        className='w-full min-w-[600px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                    >
                                        <li className='basis-[20%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{layouts.indexOf(l) + 1}</li>
                                        <li className='basis-[20%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <Button
                                                className='px-[8px] h-6 text-[10px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[0.5px] rounded-full border-[#E2E4FF]
                                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-xs sm:px-4'
                                                onClick={() => selectHandler(l)}
                                            >
                                                Select
                                            </Button>
                                        </li>
                                        <li className='basis-[30%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{l?.report_setting?.report_name}</li>
                                        <li className='basis-[30%] flex flex-row items-center px-2'>{l?.report_setting?.report_title}</li>
                                    </CommandItem>
                                ))
                        }
                    </CommandList>
                    {layouts.length > 1 && (<CommandEmpty>No results found</CommandEmpty>)}
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