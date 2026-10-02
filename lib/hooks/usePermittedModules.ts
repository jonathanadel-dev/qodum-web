import { useMemo } from 'react';
import modules from '@/constants/modulesHome';
import { CurrentUser } from '@/lib/auth/session';


// Module title -> slug (same format as permission module names and the route folders)
export const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');


// Modules the user can open (admins get all of them)
export const usePermittedModules = (user: CurrentUser | null) =>
    useMemo(() => {
        if (user?.is_admin) return modules;

        const granted = new Set<string>();
        user?.permissions?.forEach((p) => {
            if (p.add || p.modify || p.delete || p.print || p.read_only) {
                granted.add(p.module_name);
            }
        });

        return modules.filter((m: any) => granted.has(toSlug(m.title)));
    }, [user]);