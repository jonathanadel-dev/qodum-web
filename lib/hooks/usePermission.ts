import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { resolvePermissionKey } from '../utils';

const fullPermission = { add: true, modify: true, delete: true, print: true, read_only: true };
const emptyPermission = { add: false, modify: false, delete: false, print: false, read_only: false };

export const usePermission = (user: any, permissionPath?: string) => {
  const pathname = usePathname();
  const [permissions, setPermissions] = useState(emptyPermission);

  useEffect(() => {
    if (user?.is_admin) {
      setPermissions(fullPermission);
      return;
    }
    const key = resolvePermissionKey(permissionPath ?? pathname);
    const found = key && user?.permissions?.find(
      (p: any) => p.module_name === key.moduleName && p.page_name === key.pageName
    );
    setPermissions(found ?? emptyPermission);
  }, [user, pathname, permissionPath]);

  return permissions;
};