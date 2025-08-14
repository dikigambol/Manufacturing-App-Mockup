import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar'
import { ChevronsUpDown, LogOut, Shell } from 'lucide-react'

export const Brand = () => {
    const { isMobile } = useSidebar()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                            <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                                {/* <activeTeam.logo className='size-4' /> */}
                                <Shell className='size-4' />
                            </div>
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-semibold'>
                                    Username
                                </span>
                                <span className='truncate text-xs'>example@mail.com</span>
                            </div>
                            <ChevronsUpDown className='ml-auto' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                        align='start'
                        side={isMobile ? 'bottom' : 'right'}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className='text-xs text-muted-foreground'>
                            Option
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                            key='logout'
                            // onClick={() => setActiveTeam(team)}
                            className='gap-2 p-2'
                        >
                            <div className='flex size-6 items-center justify-center rounded-sm border'>
                                <LogOut className='size-4 shrink-0' />
                            </div>
                            Logout
                            <DropdownMenuShortcut></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        {/* <DropdownMenuSeparator /> */}
                        {/* <DropdownMenuItem className='gap-2 p-2'>
                            <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                                <Plus className='size-4' />
                            </div>
                            <div className='font-medium text-muted-foreground'>
                                Add Company
                            </div>
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}