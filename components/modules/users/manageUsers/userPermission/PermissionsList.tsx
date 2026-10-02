// components/modules/users/manageUsers/userPermission/PermissionsList.tsx
// Imports
import {Checkbox} from '@/components/ui/checkbox';
import {humanize} from '@/lib/utils';
import {UserPermissionRow} from '@/api/users';


const COLUMNS = [
    {key:'add', label:'Add'},
    {key:'modify', label:'Modify'},
    {key:'delete', label:'Delete'},
    {key:'print', label:'Print'},
    {key:'read_only', label:'Read Only'},
] as const;
type Flag = typeof COLUMNS[number]['key'];

interface Props{
    rows:UserPermissionRow[];
    onToggle:(itemId:number, flag:Flag) => void;
    onToggleAll:(flag:Flag) => void;
}


// Main function
const PermissionsList = ({rows, onToggle, onToggleAll}:Props) => (
    <div className='w-[95%] h-full overflow-x-scroll custom-sidebar-scrollbar rounded-[4px]'>
        <div className='w-full h-full min-w-[750px] flex flex-col bg-[#F2F8FA] rounded-[4px]'>

            {/* Headers */}
            <ul className='flex flex-row items-center justify-between bg-[#435680] text-white border-[0.5px] border-[#ccc] rounded-t-[4px]'>
                <li className='basis-[10%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                    Sr. No.
                </li>
                <li className='basis-[40%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                    Page
                </li>
                {COLUMNS.map((c) => (
                    <li key={c.key} className='basis-[10%] flex items-center justify-center border-r-[0.5px] last:border-r-0 border-[#ccc] text-[11px] font-semibold py-2 gap-2'>
                        <Checkbox
                            className='rounded-[2px] text-white'
                            checked={rows.length > 0 && rows.every((r) => r[c.key])}
                            onCheckedChange={() => onToggleAll(c.key)}
                        />
                        {c.label}
                    </li>
                ))}
            </ul>

            {/* Values */}
            {rows.map((r, i) => (
                <ul
                    key={r.permission_item_id}
                    className={`flex flex-row items-center justify-between border-[0.5px] border-t-[0px] border-[#ccc] ${i % 2 === 0 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                >
                    <li className='basis-[10%] flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] h-[30px]'>
                        {i + 1}
                    </li>
                    <li className='basis-[40%] flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] h-[30px]'>
                        {humanize(r.page_name)}
                    </li>
                    {COLUMNS.map((c) => (
                        <li key={c.key} className='basis-[10%] flex items-center justify-center text-hash-color border-r-[0.5px] last:border-r-0 border-[#ccc] text-[11px] h-[30px]'>
                            <Checkbox
                                className='rounded-[2px] text-hash-color'
                                checked={r[c.key]}
                                onCheckedChange={() => onToggle(r.permission_item_id, c.key)}
                            />
                        </li>
                    ))}
                </ul>
            ))}

        </div>
    </div>
);


// Export
export default PermissionsList;