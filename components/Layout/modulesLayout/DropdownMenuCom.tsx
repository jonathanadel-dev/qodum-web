// components/Layout/modulesLayout/DropdownMenuCom.tsx
// Imports
import Link from 'next/link';
import Image from 'next/image';
import {Menu} from 'lucide-react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import { CurrentUser } from '@/lib/auth/session';
import { toSlug, usePermittedModules } from '@/lib/hooks/usePermittedModules';





// Main function
const DropdownMenuCom = ({user}: {user: CurrentUser | null}) => {

    // Permitted modules
    const permittedModules = usePermittedModules(user);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none flex justify-center items-center border-2 text-hash-color border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                <Menu
                    size={18}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='bg-white rounded-[8px] w-[200px]'
            >
                {permittedModules.map((module:any) => (
                    <Link
                        key={module.title}
                        href={`/${toSlug(module.title)}`}
                        target='_blank'
                    >
                        <DropdownMenuItem className='h-full w-full py-0 px-0 cursor-pointer'>
                            <div
                                className={`group w-full flex flex-row justify-between px-2 py-2 text-xs transition hover:bg-[#e1e1e1]`}
                            >
                                    <div className={`flex flex-row w-full items-center gap-2 transition`}>
                                        <div className='flex justify-center'>
                                            {module.icon && (
                                                <Image
                                                    src={module.icon}
                                                    alt='Icon'
                                                    height={20}
                                                    width={20}
                                                />
                                            )}
                                        </div>
                                        <p className=''>
                                            {module.title}
                                        </p>
                                    </div>
                            </div>
                        </DropdownMenuItem>
                    </Link>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};





// Export
export default DropdownMenuCom;