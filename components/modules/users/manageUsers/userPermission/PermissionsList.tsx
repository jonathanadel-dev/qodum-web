// Imports
import {useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';





// Main Function
const PermissionsList = ({currentUser, selectedModule, setCurrentUser}:any) => {
    return (
        <div className='w-[95%] h-full overflow-x-scroll custom-sidebar-scrollbar rounded-[4px]'>
            <div className='w-full h-full min-w-[750px] flex flex-col bg-[#F2F8FA] rounded-[4px]'>

                {/* Headers */}
                <ul className='flex flex-row items-center justify-between bg-[#435680] text-white border-[0.5px] border-[#ccc] rounded-t-[4px]'>
                    <li className='basis-[10%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                        Sr. No.
                    </li>
                    <li className='basis-[20%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                        Main Menu
                    </li>
                    <li className='basis-[20%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                        Sub Menu
                    </li>
                    <li className='basis-[10%] flex items-center justify-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2 gap-2'>
                        <Checkbox
                            className='rounded-[2px] text-white'
                            checked={currentUser?.permissions?.find((p:any) => p.name === selectedModule)?.permissions?.every((subMenu:any) => subMenu.add)}
                            onClick={() => {
                                setCurrentUser((prevUser:any) => {
                                    const modulePermissions = prevUser.permissions.find((permission:any) => permission.name === selectedModule)?.permissions;
                                    const allAddChecked = modulePermissions.every((subMenu:any) => subMenu.add);                    
                                    return{
                                        ...prevUser,
                                        permissions:prevUser.permissions.map((permission:any) => {
                                            if(permission.name === selectedModule){
                                                return {
                                                    ...permission,
                                                    permissions: permission.permissions.map((subMenu:any) => ({
                                                        ...subMenu,
                                                        add:!allAddChecked
                                                    }))
                                                };
                                            }
                                            return permission;
                                        })
                                    };
                                });
                            }}
                        />
                        Add
                    </li>
                    <li className='basis-[10%] flex items-center justify-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2 gap-2'>
                        <Checkbox
                            className='rounded-[2px] text-white'
                            checked={currentUser?.permissions?.find((p:any) => p.name === selectedModule)?.permissions?.every((subMenu:any) => subMenu.modify)}
                            onClick={() => {
                                setCurrentUser((prevUser:any) => {
                                    const modulePermissions = prevUser.permissions.find((permission:any) => permission.name === selectedModule)?.permissions;
                                    const allModifyChecked = modulePermissions.every((subMenu:any) => subMenu.modify);                    
                                    return{
                                        ...prevUser,
                                        permissions:prevUser.permissions.map((permission:any) => {
                                            if(permission.name === selectedModule){
                                                return {
                                                    ...permission,
                                                    permissions: permission.permissions.map((subMenu:any) => ({
                                                        ...subMenu,
                                                        modify:!allModifyChecked
                                                    }))
                                                };
                                            }
                                            return permission;
                                        })
                                    };
                                });
                            }}
                        />
                        Modify
                    </li>
                    <li className='basis-[10%] flex items-center justify-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2 gap-2'>
                        <Checkbox
                            className='rounded-[2px] text-white'
                            checked={currentUser?.permissions?.find((p:any) => p.name === selectedModule)?.permissions?.every((subMenu:any) => subMenu.delete)}
                            onClick={() => {
                                setCurrentUser((prevUser:any) => {
                                    const modulePermissions = prevUser.permissions.find((permission:any) => permission.name === selectedModule)?.permissions;
                                    const allDeleteChecked = modulePermissions.every((subMenu:any) => subMenu.delete);                    
                                    return{
                                        ...prevUser,
                                        permissions:prevUser.permissions.map((permission:any) => {
                                            if(permission.name === selectedModule){
                                                return {
                                                    ...permission,
                                                    permissions: permission.permissions.map((subMenu:any) => ({
                                                        ...subMenu,
                                                        delete:!allDeleteChecked
                                                    }))
                                                };
                                            }
                                            return permission;
                                        })
                                    };
                                });
                            }}
                        />
                        Delete
                    </li>
                    <li className='basis-[10%] flex items-center justify-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2 gap-2'>
                        <Checkbox
                            className='rounded-[2px] text-white'
                            checked={currentUser?.permissions?.find((p:any) => p.name === selectedModule)?.permissions?.every((subMenu:any) => subMenu.print)}
                            onClick={() => {
                                setCurrentUser((prevUser:any) => {
                                    const modulePermissions = prevUser.permissions.find((permission:any) => permission.name === selectedModule)?.permissions;
                                    const allPrintChecked = modulePermissions.every((subMenu:any) => subMenu.print);                    
                                    return{
                                        ...prevUser,
                                        permissions:prevUser.permissions.map((permission:any) => {
                                            if(permission.name === selectedModule){
                                                return {
                                                    ...permission,
                                                    permissions: permission.permissions.map((subMenu:any) => ({
                                                        ...subMenu,
                                                        print:!allPrintChecked
                                                    }))
                                                };
                                            }
                                            return permission;
                                        })
                                    };
                                });
                            }}
                        />
                        Print
                    </li>
                    <li className='basis-[10%] flex items-center justify-center text-center text-[11px] font-semibold py-2 gap-2'>
                        <Checkbox
                            className='rounded-[2px] text-white'
                            checked={currentUser?.permissions?.find((p:any) => p.name === selectedModule)?.permissions?.every((subMenu:any) => subMenu.read_only)}
                            onClick={() => {
                                setCurrentUser((prevUser:any) => {
                                    const modulePermissions = prevUser.permissions.find((permission:any) => permission.name === selectedModule)?.permissions;
                                    const allReadOnlyChecked = modulePermissions.every((subMenu:any) => subMenu.read_only);                    
                                    return{
                                        ...prevUser,
                                        permissions:prevUser.permissions.map((permission:any) => {
                                            if(permission.name === selectedModule){
                                                return {
                                                    ...permission,
                                                    permissions: permission.permissions.map((subMenu:any) => ({
                                                        ...subMenu,
                                                        read_only:!allReadOnlyChecked
                                                    }))
                                                };
                                            }
                                            return permission;
                                        })
                                    };
                                });
                            }}
                        />
                        Read Only
                    </li>
                </ul>

                {/* Values */}
                {currentUser?.permissions?.find((p:any) => p.name === selectedModule)?.permissions?.map((p:any) => (
                    <ul className={`flex flex-row items-center justify-between border-[0.5px] border-t-[0px] border-[#ccc] ${Math.floor((currentUser?.permissions?.find((p:any) => p.name === selectedModule)?.permissions.indexOf(p) + 1) / 2) * 2 !== currentUser?.permissions?.find((p:any) => p.name === selectedModule)?.permissions.indexOf(p) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                            <li className='basis-[10%] flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] h-[30px]'>
                                {p.sr_no}
                            </li>
                            <li className='basis-[20%] flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] h-[30px]'>
                                {p.main_menu}
                            </li>
                            <li className='basis-[20%] flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] h-[30px]'>
                                {p.sub_menu}
                            </li>
                            <li className='basis-[10%] flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] h-[30px]'>
                                <Checkbox
                                    className='rounded-[2px] text-hash-color'
                                    checked={p.add}
                                    onClick={() => {
                                        setCurrentUser((prevUser:any) => ({
                                            ...prevUser,
                                            permissions:prevUser.permissions.map((permission:any) => {
                                              if(permission.name === selectedModule){
                                                return {
                                                  ...permission,
                                                  permissions:permission.permissions.map((subMenu:any) => {
                                                    if(subMenu.sr_no === p.sr_no){ 
                                                      return{
                                                        ...subMenu,
                                                        add:!subMenu.add
                                                      };
                                                    }
                                                    return subMenu;
                                                  })
                                                };
                                              }
                                              return permission;
                                            })
                                        }));
                                    }}
                                />
                            </li>
                            <li className='basis-[10%] flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] h-[30px]'>
                                <Checkbox
                                    className='rounded-[2px] text-hash-color'
                                    checked={p.modify}
                                    onClick={() => {
                                        setCurrentUser((prevUser:any) => ({
                                            ...prevUser,
                                            permissions:prevUser.permissions.map((permission:any) => {
                                              if(permission.name === selectedModule){
                                                return {
                                                  ...permission,
                                                  permissions:permission.permissions.map((subMenu:any) => {
                                                    if(subMenu.sr_no === p.sr_no){ 
                                                      return{
                                                        ...subMenu,
                                                        modify:!subMenu.modify
                                                      };
                                                    }
                                                    return subMenu;
                                                  })
                                                };
                                              }
                                              return permission;
                                            })
                                        }));
                                    }}
                                />
                            </li>
                            <li className='basis-[10%] flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] h-[30px]'>
                                <Checkbox
                                    className='rounded-[2px] text-hash-color'
                                    checked={p.delete}
                                    onClick={() => {
                                        setCurrentUser((prevUser:any) => ({
                                            ...prevUser,
                                            permissions:prevUser.permissions.map((permission:any) => {
                                              if(permission.name === selectedModule){
                                                return {
                                                  ...permission,
                                                  permissions:permission.permissions.map((subMenu:any) => {
                                                    if(subMenu.sr_no === p.sr_no){ 
                                                      return{
                                                        ...subMenu,
                                                        delete:!subMenu.delete
                                                      };
                                                    }
                                                    return subMenu;
                                                  })
                                                };
                                              }
                                              return permission;
                                            })
                                        }));
                                    }}
                                />
                            </li>
                            <li className='basis-[10%] flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] h-[30px]'>
                                <Checkbox
                                    className='rounded-[2px] text-hash-color'
                                    checked={p.print}
                                    onClick={() => {
                                        setCurrentUser((prevUser:any) => ({
                                            ...prevUser,
                                            permissions:prevUser.permissions.map((permission:any) => {
                                              if(permission.name === selectedModule){
                                                return {
                                                  ...permission,
                                                  permissions:permission.permissions.map((subMenu:any) => {
                                                    if(subMenu.sr_no === p.sr_no){ 
                                                      return{
                                                        ...subMenu,
                                                        print:!subMenu.print
                                                      };
                                                    }
                                                    return subMenu;
                                                  })
                                                };
                                              }
                                              return permission;
                                            })
                                        }));
                                    }}
                                />
                            </li>
                            <li className='basis-[10%] flex items-center justify-center text-hash-color text-[11px] h-[30px]'>
                                <Checkbox
                                    className='rounded-[2px] text-hash-color'
                                    checked={p.read_only}
                                    onClick={() => {
                                        setCurrentUser((prevUser:any) => ({
                                            ...prevUser,
                                            permissions:prevUser.permissions.map((permission:any) => {
                                              if(permission.name === selectedModule){
                                                return {
                                                  ...permission,
                                                  permissions:permission.permissions.map((subMenu:any) => {
                                                    if(subMenu.sr_no === p.sr_no){ 
                                                      return{
                                                        ...subMenu,
                                                        read_only:!subMenu.read_only
                                                      };
                                                    }
                                                    return subMenu;
                                                  })
                                                };
                                              }
                                              return permission;
                                            })
                                        }));
                                    }}
                                />
                            </li>
                        </ul>
                    ))
                }
        
            </div>
        </div>
    );
};





// Export
export default PermissionsList;