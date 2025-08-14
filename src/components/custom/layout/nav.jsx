import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { LayoutContext } from '@/contexts/interact'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router'

export const Nav = ({ title, items }) => {
    const { state } = useSidebar()
    const href = useLocation({ select: (location) => location.href })
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const key = `${item.title}-${item.url}`

                        if (!item.items)
                            return <SidebarMenuLink key={key} item={item} href={href} />

                        if (state === 'collapsed')
                            return (
                                <SidebarMenuCollapsedDropdown key={key} item={item} href={href} />
                            )

                        return <SidebarMenuCollapsible key={key} item={item} href={href} />
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

const SidebarMenuLink = ({ item, href }) => {
    const { setOpenMobile } = useSidebar()
    const { ensureDashboardExists } = useContext(LayoutContext);
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={checkIsActive(href, item)}
                tooltip={item.title}
            >
                <Link to={item.url} onClick={() => { setOpenMobile(false); ensureDashboardExists(item.id_dash); }}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {/* {item.badge && <NavBadge>{item.badge}</NavBadge>} */}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

function checkIsActive(href, item, mainNav = false) {
    return (
        href == item.url || href.pathname.split('?')[0] === item.url || // endpoint
        !!item?.items?.filter((i) => i.url === href).length || // if child nav is active
        (mainNav &&
            href.split('/')[1] !== '' &&
            href.split('/')[1] === item?.url?.split('/')[1])
    )
}