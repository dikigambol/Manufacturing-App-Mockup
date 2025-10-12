import { LayoutContext } from "@/contexts/interact"
import { Container } from "@/layouts/container"
import { useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Plus,
    BarChart3,
    Settings,
    Factory,
    TrendingUp,
    ArrowRight,
    Zap,
    Target,
    Activity
} from "lucide-react"
import { Link } from "react-router"

const Home = () => {
    const { components } = useContext(LayoutContext)

    // If there are components, show the dashboard
    if (components.length > 0) {
        return <Container />
    }

    // Empty state - show welcome dashboard
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Welcome to Manufacturing Dashboard
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Monitor your production lines and optimize manufacturing operations
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        System Online
                    </Badge>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                            Production Lines
                        </CardTitle>
                        <Factory className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">3</div>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                            Active lines
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                            OEE Average
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-900 dark:text-green-100">92%</div>
                        <p className="text-xs text-green-600 dark:text-green-400">
                            +2% from last week
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
                            Daily Production
                        </CardTitle>
                        <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">1,247</div>
                        <p className="text-xs text-orange-600 dark:text-orange-400">
                            Units produced
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                            Active Machines
                        </CardTitle>
                        <Activity className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">24</div>
                        <p className="text-xs text-purple-600 dark:text-purple-400">
                            Running smoothly
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Quick Actions */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Zap className="h-5 w-5 text-blue-600" />
                                <span>Quick Actions</span>
                            </CardTitle>
                            <CardDescription>
                                Get started with your manufacturing dashboard
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button className="w-full justify-start" asChild>
                                <Link to="/data-resources">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Data Source
                                </Link>
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Settings className="h-4 w-4 mr-2" />
                                Configure Dashboard
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <BarChart3 className="h-4 w-4 mr-2" />
                                View Analytics
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Latest updates from your production lines
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Line 1 - Production Started</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">2 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Maintenance Completed</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">15 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Quality Check Passed</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">1 hour ago</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Getting Started */}
                <div className="space-y-6">
                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-800/20">
                        <CardHeader>
                            <CardTitle className="text-blue-900 dark:text-blue-100">
                                🚀 Getting Started
                            </CardTitle>
                            <CardDescription className="text-blue-700 dark:text-blue-300">
                                Set up your manufacturing dashboard in minutes
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                                    <span className="text-sm text-blue-800 dark:text-blue-200">Upload your production data</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                                    <span className="text-sm text-blue-800 dark:text-blue-200">Configure your dashboard widgets</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                                    <span className="text-sm text-blue-800 dark:text-blue-200">Start monitoring your production</span>
                                </div>
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                                <Link to="/data-resources">
                                    <ArrowRight className="h-4 w-4 mr-2" />
                                    Start Setup
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Production Lines Overview</CardTitle>
                            <CardDescription>
                                Status of your manufacturing lines
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="font-medium">Line 1 - Engine Assembly</span>
                                    </div>
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        Running
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <span className="font-medium">Line 2 - Quality Control</span>
                                    </div>
                                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                        Idle
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span className="font-medium">Line 3 - Packaging</span>
                                    </div>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        Maintenance
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Home