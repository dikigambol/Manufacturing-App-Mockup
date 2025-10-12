import { SidebarTrigger } from "@/components/ui/sidebar"
import { AlertContext } from "@/contexts/alert"
import { LayoutContext } from "@/contexts/interact"
import { useAuth } from "@/contexts/auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Save,
    Factory,
    Bell,
    Settings,
    User,
    Activity,
    Wifi,
    WifiOff,
    ArrowLeft,
    ChevronDown
} from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { AppCommand } from "./command"
import { utils } from "@/utils/function"
import { useLocation, useNavigate, useParams } from "react-router"

export const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { lineId } = useParams();
    const { layout, components, updateComponent, saveLayoutToLocal, activeIdDash } = useContext(LayoutContext)
    const { alert } = useContext(AlertContext)
    const { getCurrentLine } = useAuth()
    const [isOnline, setIsOnline] = useState(navigator.onLine)

    const save = () => {
        saveLayoutToLocal()
        updateComponent(components)

        // Get line info for better message
        let message = 'Layout has been saved successfully!';
        if (lineId && ['line_1', 'line_2', 'line_3'].includes(lineId)) {
            const lineInfo = getLineInfo(lineId);
            if (lineInfo) {
                message = `${lineInfo.name} dashboard saved successfully!`;
            }
        }

        alert({
            time: 10,
            status: 'success',
            message: message,
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

    useEffect(() => {
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    const getLineInfo = (lineId) => {
        const lines = {
            line_1: {
                name: "Engine Assembly Line 1",
                description: "Main engine assembly production line",
                status: "running"
            },
            line_2: {
                name: "Engine Assembly Line 2",
                description: "Secondary engine assembly production line",
                status: "idle"
            },
            line_3: {
                name: "Engine Assembly Line 3",
                description: "Tertiary engine assembly production line",
                status: "maintenance"
            }
        };
        return lines[lineId] || null;
    };

    const getPageTitle = () => {
        // Check if we're on a line-specific dashboard
        if (location.pathname.startsWith('/dashboard/')) {
            const currentLineId = getCurrentLine();
            const lineInfo = getLineInfo(currentLineId);

            // If it's a line dashboard (line_1, line_2, line_3)
            if (lineInfo) {
                return lineInfo.name;
            }

            // If it's a dashboard view
            switch (location.pathname) {
                case '/dashboard/overview':
                    return 'Dashboard Overview'
                case '/dashboard/production':
                    return 'Production Monitoring'
                case '/dashboard/machines':
                    return 'Machine Status'
                case '/dashboard/qc':
                    return 'Quality Control'
                case '/dashboard/inventory':
                    return 'Material & Inventory'
                case '/dashboard/maintenance':
                    return 'Maintenance'
                case '/dashboard/energy':
                    return 'Energy & Efficiency'
                case '/dashboard/operators':
                    return 'Operator Performance'
                default:
                    return 'Dashboard'
            }
        }

        switch (location.pathname) {
            case '/':
                return 'Dashboard'
            case '/data-resources':
                return 'Data Resources'
            case '/settings':
                return 'Settings'
            default:
                return 'Manufacturing Dashboard'
        }
    }

    const getPageDescription = () => {
        // Check if we're on a line-specific dashboard
        if (location.pathname.startsWith('/dashboard/')) {
            const currentLineId = getCurrentLine();
            const lineInfo = getLineInfo(currentLineId);

            // If it's a line dashboard, show line description
            if (lineInfo) {
                return lineInfo.description;
            }

            // For dashboard views, show generic description
            return 'Real-time analytics and monitoring';
        }
        return 'Manufacturing Monitoring System';
    }

    return (
        <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between px-6">
                {/* Left Section */}
                <div className="flex items-center space-x-4">
                    <SidebarTrigger />

                    {/* Back to Lines Button - Always show when on any dashboard */}
                    {location.pathname.startsWith('/dashboard/') && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate("/lines")}
                            className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Lines
                        </Button>
                    )}

                    {/* Line Switcher - Only show when on line-specific dashboard (line_1, line_2, line_3) */}
                    {lineId && ['line_1', 'line_2', 'line_3'].includes(lineId) && (
                        <Select
                            value={lineId}
                            onValueChange={(value) => {
                                navigate(`/dashboard/${value}`)
                            }}
                        >
                            <SelectTrigger className="w-56 border-blue-200 dark:border-blue-800">
                                <Factory className="w-4 h-4 mr-2 text-blue-600" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="line_1">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span>Line 1 - Engine Assembly</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="line_2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                        <span>Line 2 - Quality Control</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="line_3">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>Line 3 - Packaging</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    )}

                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                            <Factory className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                                {getPageTitle()}
                            </h1>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                {getPageDescription()}
                            </p>
                        </div>
                    </div>
                    {location.pathname != "/data-resources" && <AppCommand />}
                </div>

                {/* Center Section - Status */}
                <div className="hidden md:flex items-center space-x-4">
                    <Badge
                        variant="secondary"
                        className={`${isOnline ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
                    >
                        {isOnline ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
                        {isOnline ? 'Online' : 'Offline'}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                        <Activity className="w-3 h-3 mr-1" />
                        System Active
                    </Badge>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-3">
                    {/* Notifications */}
                    <Button variant="ghost" size="sm" className="relative">
                        <Bell className="h-4 w-4" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                            3
                        </span>
                    </Button>

                    {/* Settings */}
                    <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                    </Button>

                    {/* Save Button */}
                    {location.pathname != "/data-resources" && (
                        <Button
                            onClick={save}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                        </Button>
                    )}

                    {/* User Profile */}
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                            <User className="h-3 w-3" />
                        </div>
                        <span className="hidden sm:block text-sm font-medium">Admin</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}