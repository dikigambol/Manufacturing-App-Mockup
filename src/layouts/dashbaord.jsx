import { AppAlert } from "@/components/custom/app/alert";
import { Header } from "@/components/custom/layout/header";
import { AppSidebar } from "@/components/custom/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";


const Dashbaord = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <AppAlert />
            <main className="w-full pe-2">
                <Header />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}

export default Dashbaord