import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Nav } from '@/components/custom/layout/nav'
import { Brand } from '@/components/custom/layout/user'
import { getSidebarData } from '../../data/sidebar-data'
import { useAuth } from '@/contexts/auth'
import { useTheme } from '@/contexts/thems'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useMemo } from 'react'



export const AppSidebar = ({ ...props }) => {
  const { setTheme } = useTheme()
  const { getCurrentLine } = useAuth()

  // Get dynamic sidebar data based on current line
  const currentLine = getCurrentLine();
  const sidebarData = useMemo(() => getSidebarData(currentLine), [currentLine]);

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <Nav key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className={"w-full"}>
              <span className="">Change Theme</span>
              <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
              <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}