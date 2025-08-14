import { SidebarTrigger } from "@/components/ui/sidebar"
import { AlertContext } from "@/contexts/alert"
import { LayoutContext } from "@/contexts/interact"
import { local } from "@/utils/access"
import { Save } from "lucide-react"
import { useContext, useEffect } from "react"
import { AppCommand } from "./command"
import { utils } from "@/utils/function"
import { useLocation } from "react-router"

export const Header = () => {
    const location = useLocation();
    const { layout, components, updateComponent, updateLayout } = useContext(LayoutContext)
    const { alert } = useContext(AlertContext)

    const save = () => {
        updateComponent(components)
        updateLayout(layout)
        alert({
            time: 10,
            status: 'success',
            message: 'Layout has been saved successfully!',
        })
    }

    useEffect(() => {
        const down = (e) => {
            utils.keyHandlerCtrl("s", e, () => {
                save()
            })
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [layout])

    return (
        <header className="flex items-center justify-between py-2">
            <div className="relative flex h-16 items-center justify-between bg-slate-100/60 rounded-[0.625rem] px-4 w-full">
                <div className="flex shrink-0 items-center">
                    <SidebarTrigger />
                    {location.pathname != "/data-resources" && <AppCommand />}
                </div>
                <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                        <div role="button" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-700 hover:text-white">Team</div>
                        <div role="button" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-700 hover:text-white">Projects</div>
                        <div role="button" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-700 hover:text-white">Calendar</div>
                        {location.pathname != "/data-resources" &&
                            <div role="button" onClick={save} aria-current="page" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white flex items-center gap-2">
                                <Save size={16} /> Save
                            </div>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}