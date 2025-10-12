import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar'
import { ChevronsUpDown, LogOut, Factory, User, Settings, Bell } from 'lucide-react'

export const Brand = () => {
    const { isMobile } = useSidebar()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50'>
                            <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm'>
                                <Factory className='size-4' />
                            </div>
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-semibold text-slate-900 dark:text-white'>
                                    Manufacturing Co.
                                </span>
                                <span className='truncate text-xs text-slate-600 dark:text-slate-400'>Production Manager</span>
                            </div>
                            <ChevronsUpDown className='ml-auto size-4 text-slate-500' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                        align='start'
                        side={isMobile ? 'bottom' : 'right'}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className='text-xs text-muted-foreground'>
                            Account
                        </DropdownMenuLabel>
                        <DropdownMenuItem className='gap-2 p-2'>
                            <div className='flex size-6 items-center justify-center rounded-sm border bg-blue-50 dark:bg-blue-900/20'>
                                <User className='size-4 text-blue-600 dark:text-blue-400' />
                            </div>
                            <div>
                                <div className='font-medium'>John Doe</div>
                                <div className='text-xs text-muted-foreground'>john.doe@company.com</div>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className='gap-2 p-2'>
                            <div className='flex size-6 items-center justify-center rounded-sm border'>
                                <Settings className='size-4 shrink-0' />
                            </div>
                            Settings
                        </DropdownMenuItem>

                        <DropdownMenuItem className='gap-2 p-2'>
                            <div className='flex size-6 items-center justify-center rounded-sm border'>
                                <Bell className='size-4 shrink-0' />
                            </div>
                            Notifications
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className='gap-2 p-2 text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400'
                        >
                            <div className='flex size-6 items-center justify-center rounded-sm border border-red-200 dark:border-red-800'>
                                <LogOut className='size-4 shrink-0' />
                            </div>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}