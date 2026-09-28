'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MoveRight,
} from 'lucide-react';

import modules from '@/constants/modules';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { humanize } from '@/lib/utils';

// Types
type Permission = {
    module_name?: string;
    page_name?: string;
    add?: boolean;
    modify?: boolean;
    delete?: boolean;
    print?: boolean;
    read_only?: boolean;
};

// Helpers
const hasPermission = (permission: Permission) => {
    return (
        permission?.add ||
        permission?.modify ||
        permission?.delete ||
        permission?.print ||
        permission?.read_only
    );
};

// Main function
export default function Sidebar({ user }: { user?: any }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const moduleSlug = pathname.split('/')[1] || '';
    const currentModule = modules.find((module: any) => module.moduleName === moduleSlug);

    const permittedPageNames = new Set(
        (user?.permissions ?? [])
            .filter((permission: Permission) => permission?.module_name === currentModule?.moduleName)
            .filter(hasPermission)
            .map((permission: Permission) => permission.page_name)
            .filter(Boolean)
    );

    const permittedSubModules = currentModule?.subModules
        ?.map((subModule: any) => {
            const permittedPages = subModule?.pages
                ?.map((page: any) => {
                    if (Array.isArray(page?.threads)) {
                        const permittedThreads = user?.is_admin
                            ? page.threads
                            : page.threads.filter((thread: string) => permittedPageNames.has(thread));

                        if (permittedThreads.length === 0) return null;

                        return { ...page, threads: permittedThreads };
                    }

                    const pageIsPermitted = user?.is_admin || permittedPageNames.has(page?.pageName);
                    return pageIsPermitted ? page : null;
                })
                .filter(Boolean) || [];

            if (permittedPages.length === 0) return null;

            return { ...subModule, pages: permittedPages };
        })
        .filter(Boolean) || [];

    if (!currentModule) {
        return (
            <div className='flex h-full w-auto items-center justify-center px-4 text-center bg-white'>
                <div>
                    <p className='text-sm font-medium text-[#52627A] whitespace-nowrap'>Module not found</p>
                    <p className='mt-1 text-xs text-[#98A3B2] whitespace-nowrap'>Unable to determine the current module.</p>
                </div>
            </div>
        );
    }

    if (permittedSubModules.length === 0) {
        return (
            <div className='flex h-full w-auto items-center justify-center px-4 text-center bg-white'>
                <div>
                    <div className='mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F7FA] text-[#8A96A6]'>
                        <Image src={currentModule.icon} width={24} height={24} alt='' className='opacity-60' />
                    </div>
                    <p className='text-sm font-medium text-[#52627A] whitespace-nowrap'>No pages available</p>
                    <p className='mt-1 text-xs text-[#98A3B2] whitespace-nowrap'>You don't have permission to access this module.</p>
                </div>
            </div>
        );
    }

    // Helper to check if a route is currently active
    const isActiveRoute = (slug: string) => {
        return pathname === `/${moduleSlug}/${slug}`;
    };

    return (
        <div className={`flex h-full flex-col overflow-hidden bg-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-auto min-w-55'}`}>
            
            {/* Collapsed State View */}
            {isCollapsed ? (
                <div className="flex h-full flex-col items-center py-4 gap-4 animate-in fade-in duration-300">
                    <button 
                        onClick={() => setIsCollapsed(false)}
                        className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#F2F9FD] text-[#52627A] transition-colors"
                        title="Expand sidebar"
                    >
                        <ChevronRight size={20} />
                    </button>
                    {currentModule?.icon && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#F4F7FA] shadow-sm">
                            <Image src={currentModule.icon} width={24} height={24} alt="" className="object-contain" />
                        </div>
                    )}
                </div>
            ) : (
                /* Expanded State View */
                <div className="flex h-full flex-col animate-in fade-in duration-300">
                    <div className='shrink-0 border-b border-[#E8EDF2] bg-white px-3 py-3'>

                        {/* Collapse Toggle Button */}
                        <div className="flex justify-end mb-2">
                            <button 
                                onClick={() => setIsCollapsed(true)}
                                className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-[#F2F9FD] text-[#52627A] transition-colors"
                                title="Collapse sidebar"
                            >
                                <ChevronLeft size={18} />
                            </button>
                        </div>

                        {/* Institution Logo */}
                        <Link
                            href="/"
                            className='flex h-12 items-center justify-center rounded-[8px] border border-[#E7ECF1] bg-[#FAFBFC] px-3'
                        >
                            <Image
                                alt='Logo'
                                width={100}
                                height={40}
                                src="/assets/logo.png"
                                className='h-auto max-h-[50px] w-auto object-contain'
                            />
                        </Link>

                        <Accordion type='single' collapsible defaultValue={currentModule.moduleName} className='mt-4'>
                            <AccordionItem value={currentModule.moduleName} className='border-none'>
                                <AccordionTrigger className='rounded-[11px] border border-[#DCECF7] bg-[#F2F9FD] px-3 py-3 text-[#2CABE3] transition hover:no-underline hover:bg-[#ECF7FC]'>
                                    <div className='flex items-center gap-3 flex-1'>
                                        <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-white shadow-sm'>
                                            {currentModule.icon && (
                                                <Image src={currentModule.icon} width={24} height={24} alt='' className='object-contain' />
                                            )}
                                        </div>
                                        <div className='text-left'>
                                            <p className='text-sm font-bold text-[#17233C] whitespace-nowrap'>
                                                {humanize(currentModule.moduleName)}
                                            </p>
                                        </div>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className='pb-0 pt-3'>
                                    <div className='max-h-[calc(100vh-180px)] overflow-y-auto pr-1 custom-sidebar-scrollbar'>
                                        <Accordion type='single' collapsible className='w-full'>
                                            {permittedSubModules.map((subModule: any) => {
                                                const hasPages = subModule?.pages?.length > 0;
                                                if (!hasPages) return null;

                                                // Check if any child route is active to highlight the parent
                                                const isParentActive = subModule.pages.some((page: any) => {
                                                    if (Array.isArray(page.threads)) {
                                                        return page.threads.some((t: string) => isActiveRoute(t));
                                                    }
                                                    return isActiveRoute(page.pageName);
                                                });

                                                return (
                                                    <AccordionItem key={subModule.subModuleName} value={subModule.subModuleName} className='border-none'>
                                                        <AccordionTrigger className={`mb-1 rounded-[9px] px-3 py-2.5 text-left text-[13px] font-semibold transition hover:no-underline w-full ${isParentActive ? 'bg-[#F2F9FD] text-[#2CABE3]' : 'text-[#455368] hover:bg-[#F7F9FB]'}`}>
                                                            <div className='flex items-center gap-2'>
                                                                <span className='whitespace-nowrap'>{humanize(subModule.subModuleName)}</span>
                                                                <ChevronDown size={16} className="shrink-0 text-[#8390A1] transition-transform duration-200" />
                                                            </div>
                                                        </AccordionTrigger>

                                                        <AccordionContent className='pb-1 pt-0'>
                                                            <div className='ml-3 border-l border-[#E5EBF1] pl-3'>
                                                                {subModule.pages.map((page: any) => {
                                                                    const hasThreads = Array.isArray(page?.threads) && page.threads.length > 0;

                                                                    if (hasThreads) {
                                                                        return (
                                                                            <Accordion key={page.pageName} type='single' collapsible className='w-full'>
                                                                                <AccordionItem value={page.pageName} className='border-none'>
                                                                                    <AccordionTrigger className='rounded-[8px] px-2 py-2 text-left text-[12px] font-medium text-[#536176] transition hover:bg-[#F7F9FB] hover:no-underline w-full'>
                                                                                        <div className='flex items-center gap-2'>
                                                                                            <span className='whitespace-nowrap'>{humanize(page.pageName)}</span>
                                                                                            <ChevronDown size={14} className="shrink-0 text-[#8290A1] transition-transform duration-200" />
                                                                                        </div>
                                                                                    </AccordionTrigger>

                                                                                    <AccordionContent className='pb-1 pt-0'>
                                                                                        <div className='ml-2 flex flex-col gap-0.5'>
                                                                                            {page.threads.map((thread: string) => {
                                                                                                const isSelected = isActiveRoute(thread);
                                                                                                const href = `/${moduleSlug}/${thread}`;

                                                                                                return (
                                                                                                    <Link
                                                                                                        key={thread}
                                                                                                        href={href}
                                                                                                        className={`group flex w-full items-center justify-between rounded-[7px] px-2.5 py-2 text-left text-[12px] transition ${isSelected ? 'bg-[#F2F9FD] font-medium text-[#2CABE3]' : 'text-[#687689] hover:bg-[#F7F9FB] hover:text-[#2CABE3]'}`}
                                                                                                    >
                                                                                                        <span className='whitespace-nowrap'>{humanize(thread)}</span>
                                                                                                        <MoveRight size={14} className={`shrink-0 transition ${isSelected ? 'translate-x-0 opacity-100' : '-translate-x-0.75 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                                                                                                    </Link>
                                                                                                );
                                                                                            })}
                                                                                        </div>
                                                                                    </AccordionContent>
                                                                                </AccordionItem>
                                                                            </Accordion>
                                                                        );
                                                                    }

                                                                    // Normal Page (No Threads)
                                                                    const isSelected = isActiveRoute(page.pageName);
                                                                    const href = `/${moduleSlug}/${page.pageName}`;

                                                                    return (
                                                                        <Link
                                                                            key={page.pageName}
                                                                            href={href}
                                                                            className={`group flex w-full items-center justify-between rounded-[8px] px-2 py-2 text-left text-[12px] transition ${isSelected ? 'bg-[#F2F9FD] font-medium text-[#2CABE3]' : 'text-[#687689] hover:bg-[#F7F9FB] hover:text-[#2CABE3]'}`}
                                                                        >
                                                                            <div className='flex items-center gap-2'>
                                                                                <span className='whitespace-nowrap'>{humanize(page.pageName)}</span>
                                                                            </div>
                                                                            <MoveRight size={14} className={`shrink-0 transition ${isSelected ? 'translate-x-0 opacity-100' : '-translate-x-0.75 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                );
                                            })}
                                        </Accordion>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            )}
        </div>
    );
}