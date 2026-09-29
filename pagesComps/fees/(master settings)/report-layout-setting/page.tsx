'use client';
// Imports
import {useEffect, useState} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {fetchLayouts} from '@/lib/actions/admission/masterSettings/layout.actions';
import FormCom from '@/components/modules/admission/masterSettings/reportLayoutSetting/FormCom';
import ViewCom from '@/components/modules/admission/masterSettings/reportLayoutSetting/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);

    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Layouts
    const [layouts, setLayouts] = useState([{}]);


    // Update layout
    const [updateLayout, setUpdateLayout] = useState({
        id:'',
        isDeleteClicked:false,
        // Copy report setting
        copy_report_setting:{
            copy_from:'',
            report_name:'',
            report_title:''
        },
        
        // Report setting
        report_setting:{
            report_name:'',
            report_title:''
        },

        // Header and footer setting
        header_and_footer_setting:{
            is_header_enable:false,
            is_header_line_enable:false,
            is_footer_enable:false,
            is_footer_line_enable:false,
            is_logo_enable:false,
            is_row_no:false,
            is_group:false,
            is_sum:false
        },

        // Font size setting
        font_size_setting:{
            font_size:0,
            is_total:'No'
        },

        // Page prientation and layout setting
        page_orientation_and_layout_setting:{
            page_orientation:'',
            page_layout:''
        },

        // Height and width setting
        height_and_width_setting:{
            page_width:0,
            page_height:0,
            footer_height:0,
            header_height:0,
            header_line_width:0,
            logo_height:0,
            column_width:0,
            footer_line_height:0,
            table_column_height:0
        },

        // Margin setting
        margin_setting:{
            page_margin_right:0,
            page_margin_left:0,
            page_margin_bottom:0,
            page_margin_top:0,
            logo_margin_left:0,
            logo_margin_top:0,
            table_margin_left:0,
            table_margin_top:0,
            footer_line_margin_top:0,
            header_line_margin_top:0
        }
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchLayouts();
            setLayouts(res);
        };
        fetcher();
    }, [isViewOpened, updateLayout]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isLoading ? (
                    <LoadingIcon />
                ) : isViewOpened ? (
                    <ViewCom
                        layouts={layouts}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateLayout={setUpdateLayout}
                    />
                ) : (
                    <FormCom
                        layouts={layouts}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateLayout={updateLayout}
                        setUpdateLayout={setUpdateLayout}
                        setIsLoading={setIsLoading}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;