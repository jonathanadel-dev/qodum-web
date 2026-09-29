// Imports
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {ChevronDown, ChevronsUpDown, Trash} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import { Checkbox } from '@/components/ui/checkbox';





// Main function
const StaffSalaryHeads = ({form}:any) => {

    // Heads
    const heads = [
        {
            name:'Dearness Allowance',
            value:0,
            type:'Percentage'
        },
        {
            name:'House Rent Allowance',
            value:0,
            type:'Percentage'
        },
        {
            name:'Transport Allowance',
            value:0,
            type:'Amount'
        },
        {
            name:'	Medical Allowance',
            value:0,
            type:'Amount'
        },
        {
            name:'City expenses',
            value:0,
            type:'Amount'
        },
        {
            name:'Other Allowances',
            value:0,
            type:'Occasional'
        },
        {
            name:'Basic Arrear',
            value:0,
            type:'Occasional'
        },
        {
            name:'Dearness Allowance Arrea',
            value:0,
            type:'Occasional'
        },
        {
            name:'House Rent Allowance Arrear',
            value:0,
            type:'Occasional'
        },
        {
            name:'Transport Allowance Arrear',
            value:0,
            type:'Occasional'
        },
        {
            name:'Provident Fund',
            value:0,
            type:'Custom'
        },
        {
            name:'Employee State Insurance',
            value:0,
            type:'Percentage'
        },
        {
            name:'Income Tax',
            value:0,
            type:'Amount'
        },
        {
            name:'Advance',
            value:0,
            type:'Occasional'
        },
        {
            name:'Other Deduction',
            value:0,
            type:'Occasional'
        },
        {
            name:'Provident Fund Arrear',
            value:0,
            type:'Occasional'
        },
        {
            name:'Staff Welfare',
            value:0,
            type:'Occasional'
        },
        {
            name:'Petrol',
            value:0,
            type:'Occasional'
        },
        {
            name:'Vol Provident Fund',
            value:0,
            type:'Occasional'
        },
        {
            name:'Over Time',
            value:0,
            type:'Occasional'
        },
        {
            name:'Telephone',
            value:0,
            type:'Occasional'
        },
        {
            name:'Telephone',
            value:0,
            type:'Occasional'
        },
        {
            name:'Electricty',
            value:0,
            type:'Occasional'
        },
        {
            name:'Fee Exempted',
            value:0,
            type:'Percentage'
        },
        {
            name:'Accomidation',
            value:0,
            type:'Percentage'
        },
        {
            name:'Fully Furnished',
            value:0,
            type:'Percentage'
        },
        {
            name:'Insurance',
            value:0,
            type:'Occasional'
        },
    ];

    return (
        <div className='flex justify-center'>
            <div className='w-[90%] flex flex-col items-center mt-4 rounded-[8px] border-[0.5px] border-[#E8E8E8]'>

                {/* Headers */}
                <ul className='w-full flex flex-row text-[10px] text-white border-b-[0.5px] bg-[#435680] border-[#ccc] cursor-pointer rounded-t-[8px] sm:text-xs md:text-md'>
                    <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                        Sr. No.
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                        Select
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                        Head Name
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                        Value
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[20%] flex flex-row items-center justify-center px-2 py-[2px]'>
                        Value Type
                        <ChevronsUpDown size={12} />
                    </li>
                </ul>

                {/* Values */}
                {heads.map((h:any) => (
                    <ul className='w-full flex flex-row text-[10px] border-b-[1px] border-[#ccc] sm:text-xs md:text-md'>
                        <li className='basis-[20%] flex flex-row items-center px-2 py-2 border-r-[.5px] border-[#ccc]'>{heads.indexOf(h) + 1}</li>
                        <li className='basis-[20%] flex flex-row items-center px-2 py-2 border-r-[.5px] border-[#ccc]'>
                            <Checkbox
                                disabled={true}
                                className='rounded-[2px] border-[#ccc]'
                            />
                        </li>
                        <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                            {h.name}
                        </li>
                        <li className='basis-[20%] flex-grow flex flex-row items-center px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            <Input
                                type='number'
                                disabled={true}
                                className='h-full flex flex-row items-center text-[11px] pl-2 py-1 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                            />
                        </li>
                        <li className='basis-[20%] flex items-center justify-center p-[2px]'>{h.type}</li>
                    </ul>
                ))}

            </div>
        </div>
    );
};





// Export
export default StaffSalaryHeads;