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
            <main className="flex-1 flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-900/50">
                <Header />
                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}

export default Dashbaord