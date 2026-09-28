'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTabsStore } from '@/store/tabStore';
import { resolveBreadcrumb } from '@/lib/breadcrumb';
import { getTabPath } from '@/lib/utils';

const TabSync = () => {
  const pathname = usePathname();
  const openTab = useTabsStore((s) => s.openTab);

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length < 2) return;

    const tabPath = getTabPath(pathname);
    const crumbs = resolveBreadcrumb(tabPath);
    const label = crumbs[crumbs.length - 1]?.label ?? tabPath;
    openTab({ path: tabPath, label, activePath: pathname });
  }, [pathname, openTab]);

  return null;
};

export default TabSync;