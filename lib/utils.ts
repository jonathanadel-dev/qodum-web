// Imports
import {twMerge} from 'tailwind-merge';
import {type ClassValue, clsx} from 'clsx';
import modules from '@/constants/modules';


// Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};


// Deep equal
export const deepEqual:any = (x:any, y:any) => {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
      ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
};


// Transforming numbers
export const toDbNumber = (v: string | undefined): number | undefined =>
  v === undefined || v === '' ? undefined : Number(v);
export const fromDbNumber = (v: number | undefined | null): string =>
  v === undefined || v === null ? '' : String(v);


// Resolve permission key
export const resolvePermissionKey = (pathname: string) => {
  const [moduleSlug, leafSlug] = pathname.split('/').filter(Boolean);
  const currentModule = (modules as any[]).find((m) => m.moduleName === moduleSlug);
  if (!currentModule) return null;

  for (const subModule of currentModule.subModules ?? []) {
    for (const page of subModule.pages ?? []) {
      const isMatch = page.pageName === leafSlug
        || page.threads?.some((t: string) => t === leafSlug);
      if (isMatch) return { moduleName: currentModule.moduleName, pageName: leafSlug };
    }
  }
  return null;
};


// Humanize
export const humanize = (slug: string) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');


// Get tab path
export const getTabPath = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length >= 2 ? `/${segments[0]}/${segments[1]}` : pathname;
};


// Slugify
export const slugify = (label: string) =>
  label.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');


// Get module root
export const getModuleRoot = (pathname: string) => {
  const [moduleSlug] = pathname.split('/').filter(Boolean);
  return moduleSlug ? `/${moduleSlug}` : '/';
};


// Get module slug
export const getModuleSlug = (pathname: string) => {
  const [moduleSlug] = pathname.split('/').filter(Boolean);
  return moduleSlug ?? '';
};