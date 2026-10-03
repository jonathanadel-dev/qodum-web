'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Scan, 
    Grid3X3, 
    Search, 
    Globe, 
    CalendarDays, 
    Flag, 
    Bell, 
    Check, 
    Shrink, 
    LogOut,
    Menu,
    ChevronDown
} from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { fetchGlobalSchoolDetails } from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
import DropdownMenuCom from './DropdownMenuCom';
import Image from 'next/image';
import { CurrentUser } from '@/lib/auth/session';
import { ActiveSession } from '@/lib/auth/activeSession';

// Main function
export default function Header({ user, session }: { user: CurrentUser | null; session: ActiveSession | null }) {

    const router = useRouter();

    // State
    const [schoolLink, setSchoolLink] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    

    // Full screen page handler
    const fullScreenHandler = (state: 'open' | 'close') => {
        if (state === 'open') {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    async function handleLogout() {
        try {
            const response = await fetch("/api/auth/logout", { method: "POST" });
            if (!response.ok) throw new Error("Logout failed");
            router.replace("/");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    // Effects
    useEffect(() => {
        const fetcher = async () => {
            try {
                const schoolRes = await fetchGlobalSchoolDetails();
                if (schoolRes && schoolRes.length > 0) {
                    setSchoolLink(schoolRes[0].website);
                }
            } catch (error) {
                console.error("Failed to fetch school details:", error);
            }
        };
        fetcher();

        function onFullscreenChange() {
            setIsFullscreen(Boolean(document.fullscreenElement));
        }
        
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    // Reusable button class for consistency
    const iconButtonClass = "flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8EDF2] bg-white text-[#52627A] transition-all hover:bg-[#F2F9FD] hover:text-[#2CABE3] hover:border-[#DCECF7]";

    return (
        <nav className='flex h-16 items-center justify-between border-b border-[#DFE3EA] px-4 lg:px-6'>
            
            {/* Left Section: Mobile Menu, Search, and Desktop Toggles */}
            <div className='flex items-center gap-3'>
                {/* Mobile Menu Trigger (Can be wired to a mobile drawer) */}
                <button className={`lg:hidden ${iconButtonClass}`}>
                    <Menu size={18} />
                </button>

                {/* Search Input */}
                <div className='relative hidden lg:block'>
                    <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-[#8390A1]' />
                    <Input
                        placeholder='Search...'
                        className='h-9 w-60 rounded-lg border border-[#E8EDF2] bg-[#F7F9FB] pl-9 pr-4 text-sm text-[#17233C] placeholder:text-[#8390A1] focus:border-[#2CABE3] focus:outline-none focus:ring-1 focus:ring-[#2CABE3] transition-all'
                    />
                </div>

                {/* Desktop Action Buttons */}
                <div className='hidden items-center gap-2 lg:flex'>
                    <DropdownMenuCom user={user}/>
                    
                    <button 
                        onClick={() => fullScreenHandler(isFullscreen ? 'close' : 'open')}
                        className={iconButtonClass}
                        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    >
                        {isFullscreen ? <Shrink size={18} /> : <Scan size={18} />}
                    </button>
                    
                    <button className={iconButtonClass} title='Apps'>
                        <Grid3X3 size={18} />
                    </button>
                </div>
            </div>

            {/* Right Section: Global Actions and Profile */}
            <div className='flex items-center gap-3'>
                
                {/* Global Actions */}
                <div className='flex items-center gap-2'>
                    {schoolLink && (
                        <a
                            href={schoolLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={iconButtonClass}
                            title='Visit Website'
                        >
                            <Globe size={18} />
                        </a>
                    )}

                    {/* Academic Year Select */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex h-9 items-center gap-2 rounded-lg border border-[#E8EDF2] bg-white px-3 text-xs font-medium text-[#52627A] outline-none hover:bg-[#F2F9FD]">
                            <CalendarDays size={16} className="text-[#8390A1]" />
                            <span className="hidden sm:inline">{session.academic_year?.year_name ?? 'No active session'}</span>
                            <ChevronDown size={14} className="opacity-50" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-[220px] bg-white p-1'>
                            <div className='flex items-center justify-between px-2 py-2 text-xs'>
                                <span className='text-[#8390A1]'>Academic Year</span>
                                <span className='font-medium text-[#17233C]'>{session.academic_year?.year_name ?? '—'}</span>
                            </div>
                            <div className='flex items-center justify-between px-2 py-2 text-xs'>
                                <span className='text-[#8390A1]'>Financial Year</span>
                                <span className='font-medium text-[#17233C]'>{session.financial_year?.year_name ?? '—'}</span>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <button className={iconButtonClass} title='Language/Region'>
                        <Flag size={18} />
                    </button>
                    
                    <button className={iconButtonClass} title='Notifications'>
                        <Bell size={18} />
                    </button>
                </div>

                {/* Divider */}
                <div className='hidden h-8 w-px bg-[#E8EDF2] md:block'></div>

                {/* Profile Section */}
                <div className='flex items-center gap-3 pl-1'>
                    {user?.profile_picture ? (
                        <Image
                            src={user.profile_picture}
                            alt='User profile'
                            className='h-10 w-10 rounded-full border border-[#E8EDF2] object-cover bg-[#F7F9FB]'
                            width={40}
                            height={40}
                        />
                    ) : (
                        <div className='flex h-10 w-10 items-center justify-center rounded-full border border-[#E8EDF2] bg-[#F7F9FB] text-sm font-semibold text-[#8390A1]'>
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    )}
                    
                    <div className='hidden flex-col items-start md:flex'>
                        <p className='text-sm font-semibold text-[#17233C] leading-tight'>{user?.name || 'User'}</p>
                        <p className='text-xs text-[#8390A1]'>{user?.designation || 'Role'}</p>
                    </div>
                    
                    <button
                        onClick={handleLogout}
                        className='flex h-9 w-9 items-center justify-center rounded-lg text-[#8390A1] transition-colors hover:bg-red-50 hover:text-red-500'
                        title='Logout'
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </nav>
    );
}