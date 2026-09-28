'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { resolveBreadcrumb } from '@/lib/breadcrumb';

export default function BreadCrumb() {
  const pathname = usePathname();
  const crumbs = resolveBreadcrumb(pathname);

  if (crumbs.length <= 1) return null;

  return (
    <div>
      <nav className='flex items-center gap-1 text-sm'>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          
          return (
            <React.Fragment key={`${crumb.label}-${i}`}>
              {i > 0 && (
                <ChevronRight className='h-4 w-4 text-[#8390A1]' />
              )}
              
              {isLast ? (
                <span className='text-[#2CABE3] font-medium'>
                  {crumb.label}
                </span>
              ) : crumb.href ? (
                <Link 
                  href={crumb.href}
                  className='text-[#52627A] hover:text-[#2CABE3] transition-colors'
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className='text-[#52627A]'>
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}