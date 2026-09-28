'use client';
import { X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTabsStore } from '@/store/tabStore';
import { usePageStateStore } from '@/store/pageStateStore';
import { getModuleRoot, getModuleSlug } from '@/lib/utils';

export default function Tabs() {
  const pathname = usePathname();
  const router = useRouter();
  const hasHydrated = useTabsStore((s) => s.hasHydrated);
  const allOpenTabs = useTabsStore((s) => s.openTabs);
  const closeTab = useTabsStore((s) => s.closeTab);
  const closeAllTabs = useTabsStore((s) => s.closeAllTabs);
  const clearPage = usePageStateStore((s) => s.clearPage);

  const moduleSlug = getModuleSlug(pathname);
  const openTabs = allOpenTabs.filter((t) => t.path.startsWith(`/${moduleSlug}/`));

  if (!hasHydrated || openTabs.length === 0) return null;

  const isWithinTab = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const handleClose = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    closeTab(path);
    clearPage(path);
    if (isWithinTab(path)) {
      const remaining = openTabs.filter((t) => t.path !== path);
      router.push(remaining[remaining.length - 1]?.activePath ?? getModuleRoot(path));
    }
  };

  const handleCloseAll = () => {
    openTabs.forEach((t) => clearPage(t.path));
    closeAllTabs(moduleSlug);
    router.push(getModuleRoot(pathname));
  };

  return (
    <div className='flex items-center justify-between px-4 bg-white border-b border-[#E5E8EF]'>
      <div className='flex items-center gap-2 overflow-x-auto no-scrollbar'>
        {openTabs.map((tab) => {
          const isActive = isWithinTab(tab.path);
          return (
            <div
              key={tab.path}
              onClick={() => router.push(tab.activePath)}
              className={`
                flex items-center gap-2 px-3 py-1.5 text-xs rounded-t-[6px] cursor-pointer whitespace-nowrap transition-all
                ${
                  isActive
                    ? 'bg-[#F0F7FF] text-[#2CABE3] font-medium border border-[#DCECF7]'
                    : 'bg-white text-[#52627A] border border-[#E5E8EF] hover:bg-[#F8FAFC]'
                }
              `}
            >
              <span>{tab.label}</span>
              <X 
                size={14} 
                onClick={(e) => handleClose(e, tab.path)} 
                className={`
                  shrink-0 transition-colors 
                  ${isActive ? 'text-[#2CABE3] hover:text-red-500' : 'text-[#8390A1] hover:text-red-500'}
                `} 
              />
            </div>
          );
        })}
      </div>
      
      <button
        onClick={handleCloseAll}
        title='Close all tabs'
        className='flex items-center gap-1.5 px-2 py-1.5 text-sm text-[#52627A] hover:text-red-500 hover:bg-[#F8FAFC] rounded-md transition-colors shrink-0'
      >
        <X size={14} />
        Close all
      </button>
    </div>
  );
};