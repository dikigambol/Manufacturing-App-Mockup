import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Nav } from '@/components/custom/layout/nav'
import { Brand } from '@/components/custom/layout/user'
import { sidebarData } from '../../data/sidebar-data'

export const AppSidebar = ({ ...props }) => {
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
    </Sidebar>
  )
}