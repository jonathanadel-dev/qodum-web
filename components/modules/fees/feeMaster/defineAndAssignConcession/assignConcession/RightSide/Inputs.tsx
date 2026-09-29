// Imports
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {fetchTypes} from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchConcessionsTypes} from '@/lib/actions/fees/feeMaster/defineAndAssignConcession/concessionType.actions';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';





// Main function
const Inputs = ({form, showButtonClick, selectedStudent}:any) => {


    // Toast
    const {toast} = useToast();


    // Fee types
    const [feeTypes, setFeeTypes] = useState<any>([{}]);


    // Concession types
    const [concessionTypes, setConcessionTypes] = useState<any>([{}]);


    // Installments
    const [installments, setInstallments] = useState<any>([]);


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const feeTypesRes = await fetchTypes();
            const concessionTypesRes = await fetchConcessionsTypes();
            setFeeTypes(feeTypesRes);
            setConcessionTypes(concessionTypesRes);


            // Insallments
            const singleInstallments = selectedStudent?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length === 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name)[0]);
            const allInstallments = selectedStudent?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length > 1).length > 0
                ? selectedStudent?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length > 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name).concat(singleInstallments))[0]
                : selectedStudent?.affiliated_heads?.heads?.filter((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount))).length === 1)?.map((h:any) => h.amounts?.filter((a:any) => Number(a.value) !== (Number(a.last_rec_amount) + Number(a.conc_amount)))?.map((a:any) => a.name)[0]);
            setInstallments(allInstallments.filter((name:any, index:any, self:any) => self.indexOf(name) === index));

        };
        fetcher();
    }, [selectedStudent]);


    // Use effect
    useEffect(() => {
        form.setValue('installment', installments[0]);
    }, [installments]);


    return (
        <div className='flex flex-col gap-2 p-4 bg-[#F7F7F7] rounded-[4px] border-[0.5px] border-[#ccc]'>
            <div className='flex flex-row items-center gap-2'>
                {/* Fees Type */}
                <FormField
                    control={form.control}
                    name='fees_type'
                    render={({field}) => (
                        <FormItem className='basis-[33.3%] min-w-[125px]'>
                            <div className='flex flex-col'>
                                <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Fees Type</FormLabel>
                                <Select
                                    {...field}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='All fee types'>All fee types</SelectItem>
                                        {feeTypes.length === 0 ? (
                                            <p className='text-xs text-hash-color'>No fee types</p>
                                        ) : !feeTypes[0].name ? (
                                            <LoadingIcon />
                                        ) : feeTypes.map((t:any) => (
                                            <SelectItem value={t.name} key={t._id}>{t.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </FormItem>
                    )}
                />
                {/* Concession Types */}
                <FormField
                    control={form.control}
                    name='concession_type'
                    render={({field}) => (
                        <FormItem className='basis-[33.3%] min-w-[125px]'>
                            <div className='flex flex-col'>
                                <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Concession Type</FormLabel>
                                <Select
                                    {...field}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {concessionTypes.length === 0 ? (
                                            <p className='text-xs text-hash-color'>No concession types</p>
                                        ) : !concessionTypes[0].type ? (
                                            <LoadingIcon />
                                        ) : concessionTypes.map((t:any) => (
                                            <SelectItem value={t.type} key={t._id}>{t.type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </FormItem>
                    )}
                />
            </div>
            <div className='flex flex-col items-end justify-between gap-2 lg:flex-row'>
                <div className='flex flex-row items-center gap-4'>
                    {/* Installments */}
                    <FormField
                        control={form.control}
                        name='installment'
                        render={({field}) => (
                            <FormItem className='basis-[33.3%] min-w-[125px]'>
                                <div className='flex flex-col'>
                                    <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Installment</FormLabel>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {installments.length === 0 ? (
                                                <p className='text-xs text-hash-color'>No installments</p>
                                            ) : !installments[0] ? (
                                                <LoadingIcon />
                                            ) : installments.map((t:any) => (
                                                <SelectItem value={t} key={t._id}>{t}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Copy to other installments */}
                    <FormField
                        control={form.control}
                        name='copy_to_other_installments'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            id='copy_to_other_installments'
                                            {...field}
                                            value={field.value}
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='copy_to_other_installments'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Copy to other installments
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Show Button */}
                <span
                    className='flex items-center justify-center px-4 h-8 text-sm text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    onClick={() => selectedStudent.name === '' ? toast({title:'Please select a student', variant:'alert'}) : showButtonClick()}
                >
                    Show
                </span>
            </div>
        </div>
    );
};





// Export
export default Inputs;