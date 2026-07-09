import * as React from "react"

import { NavMain } from "@/Components/nav-main"
import { NavUser } from "@/Components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, Box ,ShoppingCart , UsersIcon, BadgeIndianRupee , Settings2Icon, CircleHelpIcon, SearchIcon, CommandIcon } from "lucide-react"
import { useAuth } from "@/Context/Authcontext/AuthProvider";

const data = {

  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Products",
      url: "/products",
      icon: (
        <Box
        />
      ),
    },
  
    {
      title: "Order",
      url: "/order",
      icon: (
        <ShoppingCart 
        />
      ),
    },
    {
      title: "Customer",
      url: "/customer",
      icon: (
        <UsersIcon
        />
      ),
    },
    {
      title: "Sales",
      url: "/sales",
      icon: (
        <BadgeIndianRupee 
        />
      ),
    }
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
    },
    {
      title: "Get Help",
      url: "#",
      icon: (
        <CircleHelpIcon
        />
      ),
    },
    {
      title: "Search",
      url: "#",
      icon: (
        <SearchIcon
        />
      ),
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout ,user} = useAuth();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a>
                <CommandIcon className="size-6! text-primary" />
                <span className="text-lg font-semibold">FlowWork</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user&&<NavUser user={user} logout={logout} />}
      </SidebarFooter>
    </Sidebar>
  )
}
