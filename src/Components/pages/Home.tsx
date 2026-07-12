import { AppSidebar } from "../app-sidebar"
import { SiteHeader } from "../site-header"
import { useAuth } from "../../Context/Authcontext/AuthProvider"
import {
    SidebarInset,
    SidebarProvider,
} from "../ui/sidebar"

import { Outlet } from "react-router-dom"

export default function Home() {
    const { user } = useAuth();
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}
