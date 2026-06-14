import { AppSidebar } from "@/Components/app-sidebar"
import { ChartAreaInteractive } from "@/Components/chart-area-interactive"
import { DataTable } from "@/Components/data-table"
import { SectionCards } from "@/Components/section-cards"
import { SiteHeader } from "@/Components/site-header"
import { useAuth } from "@/Context/Authcontext/AuthProvider"
import {
    SidebarInset,
    SidebarProvider,
} from "@/Components/ui/sidebar"

import data from "@/features/Dashboard/data.json"
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
