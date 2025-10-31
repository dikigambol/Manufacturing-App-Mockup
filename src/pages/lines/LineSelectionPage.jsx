import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Factory,
    BarChart3,
    Settings,
    Users,
    TrendingUp,
    Activity,
    LogOut,
    ArrowLeft,
    Play,
    AlertCircle,
    CheckCircle,
    Clock
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/auth";

const LineSelectionPage = () => {
    const [selectedLine, setSelectedLine] = useState(null);
    const { user, logout, selectLine } = useAuth();
    const navigate = useNavigate();

    const productionLines = [
        {
            id: "line_1",
            name: "Engine Assembly Line 1",
            description: "Main engine assembly production line",
            status: "running",
            efficiency: 92,
            machines: 8,
            operator: "John Doe",
            lastUpdate: "2 minutes ago",
            color: "green"
        },
        {
            id: "line_2",
            name: "Engine Assembly Line 2",
            description: "Secondary engine assembly production line",
            status: "idle",
            efficiency: 87,
            machines: 6,
            operator: "Jane Smith",
            lastUpdate: "5 minutes ago",
            color: "yellow"
        },
        {
            id: "line_3",
            name: "Engine Assembly Line 3",
            description: "Tertiary engine assembly production line",
            status: "maintenance",
            efficiency: 0,
            machines: 4,
            operator: "Mike Johnson",
            lastUpdate: "1 hour ago",
            color: "blue"
        }
    ];

    const handleLineSelect = (lineId) => {
        // Store selected line using auth context
        selectLine(lineId);
        navigate(`/dashboard/${lineId}`);
    };

    const handleLogout = () => {
        logout();
        navigate("/welcome");
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "running":
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case "idle":
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case "maintenance":
                return <Settings className="w-4 h-4 text-blue-500" />;
            default:
                return <AlertCircle className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "running":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
            case "idle":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
            case "maintenance":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Header */}
            <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate("/welcome")}
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Welcome
                            </Button>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                                    <Factory className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Production Line Selection
                                    </h1>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                        Choose a production line to monitor
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    {user?.username || 'Guest'}
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {user?.role?.replace('_', ' ').toUpperCase() || 'USER'}
                                </p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                {/* System Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                Total Production
                            </CardTitle>
                            <Factory className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">2,450</div>
                            <p className="text-xs text-blue-600 dark:text-blue-400">
                                Units today
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                                Overall OEE
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900 dark:text-green-100">89%</div>
                            <p className="text-xs text-green-600 dark:text-green-400">
                                +3% from yesterday
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
                                Active Machines
                            </CardTitle>
                            <Settings className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">18/18</div>
                            <p className="text-xs text-orange-600 dark:text-orange-400">
                                All operational
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                Quality Rate
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">97.5%</div>
                            <p className="text-xs text-purple-600 dark:text-purple-400">
                                Above target
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        Production Lines
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Select a line to access real-time monitoring dashboard and detailed analytics.
                    </p>
                </div>

                {/* Production Lines Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {productionLines.map((line) => (
                        <Card
                            key={line.id}
                            className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${selectedLine === line.id
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                                }`}
                            onClick={() => setSelectedLine(line.id)}
                        >
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                            <Factory className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{line.name}</CardTitle>
                                            <CardDescription className="text-sm">
                                                {line.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Badge className={getStatusColor(line.status)}>
                                        {getStatusIcon(line.status)}
                                        <span className="ml-1 capitalize">{line.status}</span>
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    {/* Efficiency */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                            <span className="text-sm font-medium">Efficiency</span>
                                        </div>
                                        <span className="text-lg font-bold text-green-600">
                                            {line.efficiency}%
                                        </span>
                                    </div>

                                    {/* Machines */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Settings className="w-4 h-4 text-blue-500" />
                                            <span className="text-sm font-medium">Machines</span>
                                        </div>
                                        <span className="text-lg font-bold text-blue-600">
                                            {line.machines}
                                        </span>
                                    </div>

                                    {/* Operator */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Users className="w-4 h-4 text-purple-500" />
                                            <span className="text-sm font-medium">Operator</span>
                                        </div>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">
                                            {line.operator}
                                        </span>
                                    </div>

                                    {/* Last Update */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Activity className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm font-medium">Last Update</span>
                                        </div>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">
                                            {line.lastUpdate}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <Button
                                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLineSelect(line.id);
                                    }}
                                >
                                    <Play className="w-4 h-4 mr-2" />
                                    Access Dashboard
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default LineSelectionPage;
