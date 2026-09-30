'use client';
import { useMemo, useState } from 'react';
import { ChevronsUpDown, ChevronUp, ChevronDown, ChevronRight, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingIcon from '@/components/shared/LoadingIcon';
import { useFieldState, usePageStateStore } from '@/store/pageStateStore';
import { useRouter } from 'next/navigation';


// Interfaces
export interface ListColumn {
  title: string;
  value: (row: any) => string | number;
}
interface ListViewProps<T> {
    title: string;
    data: T[];
    isLoading?: boolean;
    emptyRecord: T;
    tabPath: string;
    columns?: ListColumn[];
    hidden?: string[]; 
}


// Functions
function humanizeKey(key: string) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
function deriveColumns(emptyRecord: Record<string, any>, extraHidden: string[] = []): ListColumn[] {
    const hidden = new Set(['id', 'password', ...extraHidden]);
    return Object.keys(emptyRecord)
        .filter((key) => !hidden.has(key))
        .map((key) => {
        const def = emptyRecord[key];
        const isBoolean = typeof def === 'boolean';
        const isArray = Array.isArray(def);
        return {
            title: humanizeKey(key),
            value: (row: any) =>
                isBoolean ? (row[key] ? 'True' : 'False')
                    : isArray ? (Array.isArray(row[key]) ? row[key].join(', ') : '')
                    : row[key] ?? '',
        };
    });
}
function hydrateRecord(row: any, emptyRecord: Record<string, any>) {
    const record: any = { id: String(row.id) };
    for (const key of Object.keys(emptyRecord)) {
        if (key === 'id') continue;
        const raw = row[key];
        const def = emptyRecord[key];
        if (raw === undefined || raw === null) record[key] = def;
        else if (typeof def === 'string' && typeof raw !== 'string') record[key] = String(raw);
        else if (Array.isArray(def) && Array.isArray(raw)) record[key] = raw.map(String);
        else record[key] = raw;
    }
    return record;
}


// Page sizes
const PAGE_SIZES = [15, 25, 50, 100];


// List view
export default function ListView<T>({ title, data, isLoading, emptyRecord, tabPath, columns: columnsProp, hidden }: ListViewProps<T>) {

    // Store
    const router = useRouter();
    const clearPage = usePageStateStore((s) => s.clearPage);
    const [, setRecord] = useFieldState('record', emptyRecord, tabPath);
    

    // State
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState<{ index: number; direction: 'asc' | 'desc' } | null>(null);
    const [pageSize, setPageSize] = useState(25);
    const [page, setPage] = useState(1);
    const columns = useMemo(
        () => columnsProp ?? deriveColumns(emptyRecord, hidden),
        [columnsProp, emptyRecord, hidden]
    );


    // Filtered, sorted, and paginated data
    const filtered = useMemo(() => {
        if (!query.trim()) return data;
        const q = query.toLowerCase();
        return data.filter((row) => columns.some((c) => String(c.value(row)).toLowerCase().includes(q)));
    }, [data, columns, query]);
    const sorted = useMemo(() => {
        if (!sort) return filtered;
        const col = columns[sort.index];
        return [...filtered].sort((a, b) => {
            const av = col.value(a);
            const bv = col.value(b);
            const cmp = av > bv ? 1 : av < bv ? -1 : 0;
            return sort.direction === 'asc' ? cmp : -cmp;
        });
    }, [filtered, sort, columns]);
    const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
    const currentPage = Math.min(page, pageCount);
    const pageData = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);


    // Sort toggle
    const toggleSort = (index: number) => {
        setSort((prev) =>
            prev?.index === index
                ? { index, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
                : { index, direction: 'asc' }
        );
    };


    // Get ID
    const getId = (u: any) => u.id;


    // Select handler
    const selectHandler = (row: any) => {
        clearPage(tabPath);
        setRecord(hydrateRecord(row, emptyRecord));
        router.push(tabPath);
    };


    // Close handler
    const closeHandler = () => {
       router.push(tabPath);
    };

    return (
        <div className='w-full h-full flex flex-col items-center bg-white'>
            <div className='w-[95%] max-w-[1400px] h-full flex flex-col rounded-[8px] border-[0.5px] border-[#E8E8E8] overflow-hidden'>

                <div className='flex flex-row items-center justify-between w-full px-3 py-2 text-sm font-bold text-main-color bg-[#e7f0f7]'>
                    <h2>{title}</h2>
                    <X color='#3a3a3a' size={18} className='cursor-pointer' onClick={closeHandler} />
                </div>

                <div className='w-full flex flex-row items-center justify-between px-3 py-2 bg-white border-b-[0.5px] border-[#E4E4E4]'>
                    <p className='text-[11px] text-[#726E71]'>
                        {sorted.length} {sorted.length === 1 ? 'record' : 'records'}
                    </p>
                    <input
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                        placeholder='Search...'
                        className='h-8 w-[220px] text-xs px-3 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-full outline-none focus:border-main-color'
                    />
                </div>

                <div className='w-full flex-1 overflow-auto'>
                    <table className='w-full text-[11px] border-collapse'>
                        <thead className='sticky top-0 z-10 bg-[#F7F8FA]'>
                            <tr>
                                <th className='w-10 px-2 py-2 text-left font-medium text-[#A0A0A0] border-b border-[#E4E4E4]'>#</th>
                                    {columns.map((c, i) => (
                                        <th
                                            key={c.title}
                                            onClick={() => toggleSort(i)}
                                            className='px-3 py-2 font-medium text-[#726E71] border-b border-[#E4E4E4] cursor-pointer select-none whitespace-nowrap hover:text-main-color text-left'
                                        >
                                            <span className='inline-flex items-center gap-1'>
                                                {c.title}
                                                {sort?.index === i ? (
                                                    sort.direction === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />
                                                ) : (
                                                    <ChevronsUpDown size={11} className='opacity-30' />
                                                )}
                                            </span>
                                        </th>
                                    ))}
                                <th className='w-10 border-b border-[#E4E4E4]' />
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={columns.length + 2} className='p-4'><LoadingIcon /></td></tr>
                            ) : data.length < 1 ? (
                                <tr><td colSpan={columns.length + 2} className='p-4 text-center text-sm text-[#A0A0A0]'>No records</td></tr>
                            ) : pageData.length < 1 ? (
                                <tr><td colSpan={columns.length + 2} className='p-4 text-center text-sm text-[#A0A0A0]'>No matches</td></tr>
                            ) : (
                                pageData.map((row, i) => (
                                    <tr
                                        key={getId(row)}
                                        onClick={() => selectHandler(row)}
                                        className='group cursor-pointer border-b border-[#F0F0F0] hover:bg-[#F5F8FF] transition'
                                    >
                                        <td className='px-2 py-1.5 text-[#A0A0A0]'>{(currentPage - 1) * pageSize + i + 1}</td>
                                        {columns.map((c) => (
                                            <td
                                                key={c.title}
                                                className='px-3 py-1.5 max-w-[220px] truncate text-left'
                                            >
                                                {c.value(row)}
                                            </td>
                                        ))}
                                        <td className='px-2'>
                                            <ChevronRight size={14} className='text-[#3D67B0] opacity-0 group-hover:opacity-100 transition' />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className='w-full flex flex-row items-center justify-between px-3 py-2 border-t-[0.5px] border-[#E4E4E4] bg-white'>
                    <div className='text-[11px] flex flex-row items-center gap-2 text-[#726E71]'>
                        <span>Rows per page:</span>
                        <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setPage(1); }}>
                            <SelectTrigger className='h-7 w-[70px] cursor-pointer text-[11px] px-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-full'>
                                <SelectValue />
                                <ChevronDown size={14} className='ml-1 opacity-50' />
                            </SelectTrigger>
                            <SelectContent>
                                {PAGE_SIZES.map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='flex flex-row items-center gap-1'>
                        <button disabled={currentPage === 1} onClick={() => setPage(1)} className='h-7 px-3 text-[11px] rounded-full border-[0.5px] border-[#E4E4E4] text-[#726E71] hover:bg-[#F0F0F0] disabled:opacity-30 disabled:cursor-not-allowed transition'>First</button>
                        <button disabled={currentPage === 1} onClick={() => setPage((p) => p - 1)} className='h-7 px-3 text-[11px] rounded-full border-[0.5px] border-[#E4E4E4] text-[#726E71] hover:bg-[#F0F0F0] disabled:opacity-30 disabled:cursor-not-allowed transition'>Prev</button>
                        <span className='h-7 px-3 flex items-center text-[11px] text-[#403D3F]'>{currentPage} / {pageCount}</span>
                        <button disabled={currentPage === pageCount} onClick={() => setPage((p) => p + 1)} className='h-7 px-3 text-[11px] rounded-full border-[0.5px] border-[#E4E4E4] text-[#726E71] hover:bg-[#F0F0F0] disabled:opacity-30 disabled:cursor-not-allowed transition'>Next</button>
                        <button disabled={currentPage === pageCount} onClick={() => setPage(pageCount)} className='h-7 px-3 text-[11px] rounded-full border-[0.5px] border-[#E4E4E4] text-[#726E71] hover:bg-[#F0F0F0] disabled:opacity-30 disabled:cursor-not-allowed transition'>Last</button>
                    </div>
                </div>

            </div>
        </div>
    );
}