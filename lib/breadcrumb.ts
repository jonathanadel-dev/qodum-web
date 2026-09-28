import modules from '@/constants/modules';
import { humanize } from './utils';

export interface Crumb {
  label: string;
  href?: string;
}

export const resolveBreadcrumb = (pathname: string): Crumb[] => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return [];

  const [moduleSlug, leafSlug] = segments;
  const currentModule = (modules as any[]).find((m) => m.moduleName === moduleSlug);
  if (!currentModule) return [];

  const moduleCrumb: Crumb = { label: humanize(currentModule.moduleName), href: `/${moduleSlug}` };
  if (!leafSlug) return [moduleCrumb];

  for (const subModule of currentModule.subModules ?? []) {
    const subModuleCrumb: Crumb = { label: humanize(subModule.subModuleName) };

    for (const page of subModule.pages ?? []) {
      if (page.pageName === leafSlug) {
        return [moduleCrumb, subModuleCrumb, { label: humanize(page.pageName) }];
      }
      for (const thread of page.threads ?? []) {
        if (thread === leafSlug) {
          return [
            moduleCrumb,
            subModuleCrumb,
            { label: humanize(page.pageName) },
            { label: humanize(thread) },
          ];
        }
      }
    }
  }

  return [moduleCrumb];
};