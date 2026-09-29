'use client';
import { Control } from 'react-hook-form';
import { Check, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


// Types
export type FieldConfig =
  | { type: 'text' | 'password' | 'number'; name: string; label: string; span?: 'full' }
  | { type: 'select'; name: string; label: string; options: { value: string; label: string }[]; loading?: boolean; span?: 'full' }
  | { type: 'multiselect'; name: string; label: string; options: { value: string; label: string }[]; loading?: boolean; selectAll?: boolean; span?: 'full' }
  | { type: 'switch'; name: string; label: string };


// Dynamic field
const DynamicField = ({ field, control }: { field: FieldConfig; control: Control<any> }) => {
  if (field.type === 'switch') {
    return (
      <FormField
        control={control}
        name={field.name}
        render={({ field: rhf }) => (
          <div className='flex items-center gap-2'>
            <Switch id={field.name} checked={rhf.value} onCheckedChange={rhf.onChange} />
            <Label htmlFor={field.name} className='text-xs font-medium text-[#403D3F]'>{field.label}</Label>
          </div>
        )}
      />
    );
  }

  const spanClass = field.span === 'full' ? 'sm:col-span-2' : '';

  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: rhf }) => (
        <FormItem className={`flex flex-col gap-1 ${spanClass}`}>
          <FormLabel className='text-[11px] font-medium text-[#726E71]'>{field.label}</FormLabel>
          <FormControl>
            {field.type === 'multiselect' ? (
              <Select>
                <SelectTrigger className='h-8 w-full flex flex-row items-center text-[11px] pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                  <SelectValue placeholder={
                    rhf.value.length < 1 ? 'Please select'
                      : rhf.value.length === 1 ? '1 selected'
                      : `${rhf.value.length} selected`
                  } />
                  <ChevronDown className='h-4 w-4 opacity-50' />
                </SelectTrigger>
                <SelectContent>
                  {field.loading ? <LoadingIcon /> : (
                    <>
                      {field.selectAll && (
                        <div className='flex flex-row gap-3 px-2 py-1 border-b border-[#eee]'>
                          <button type='button' onClick={() => rhf.onChange(field.options.map((o) => o.value))} className='flex items-center gap-1 text-xs hover:underline'>
                            <Check size={12} /> All
                          </button>
                          <button type='button' onClick={() => rhf.onChange([])} className='flex items-center gap-1 text-xs hover:underline'>
                            <X size={12} /> Clear
                          </button>
                        </div>
                      )}
                      <ul className='py-1'>
                        {field.options.map((o) => (
                          <li className='flex items-center gap-2 px-2 py-1' key={o.value}>
                            <Checkbox
                              className='rounded-[3px]'
                              checked={rhf.value.includes(o.value)}
                              onClick={() => rhf.onChange(
                                rhf.value.includes(o.value)
                                  ? rhf.value.filter((v: string) => v !== o.value)
                                  : [...rhf.value, o.value]
                              )}
                            />
                            <p className='text-[11px]'>{o.label}</p>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </SelectContent>
              </Select>
            ) : field.type === 'select' ? (
              <Select value={rhf.value} onValueChange={rhf.onChange}>
                <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                  <SelectValue placeholder='Please select' />
                  <ChevronDown className='h-4 w-4 opacity-50' />
                </SelectTrigger>
                <SelectContent>
                  {field.loading ? <LoadingIcon /> : field.options.map((o) => (
                    <SelectItem value={o.value} key={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input {...rhf} type={field.type} className='h-8 text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none remove-arrow' />
            )}
          </FormControl>
          <FormMessage className='text-[11px]' />
        </FormItem>
      )}
    />
  );
};

export default DynamicField;