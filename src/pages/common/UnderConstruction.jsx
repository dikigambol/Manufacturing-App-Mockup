import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Construction,
    ArrowLeft,
    Home,
    Calendar,
    CheckCircle2,
    Wrench,
    Zap,
    Package,
    Shield,
    Users as UsersIcon
} from 'lucide-react';

const UnderConstruction = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get page info from URL
    const getPageInfo = () => {
        const path = location.pathname;

        const pageMap = {
            '/dashboard/qc': {
                title: 'Quality Control Dashboard',
                icon: Shield,
                color: 'text-blue-500',
                bgColor: 'bg-blue-500/10',
                description: 'Monitor quality metrics, defect rates, inspection results, and compliance tracking.',
                features: [
                    'Real-time defect tracking',
                    'Quality trend analysis',
                    'Inspection compliance monitoring',
                    'First-time quality rate',
                    'Pareto analysis for defects'
                ]
            },
            '/dashboard/inventory': {
                title: 'Material & Inventory Dashboard',
                icon: Package,
                color: 'text-purple-500',
                bgColor: 'bg-purple-500/10',
                description: 'Track material consumption, inventory levels, stock alerts, and supply chain metrics.',
                features: [
                    'Real-time inventory levels',
                    'Material consumption tracking',
                    'Low stock alerts',
                    'Supplier performance metrics',
                    'Material usage forecasting'
                ]
            },
            '/dashboard/maintenance': {
                title: 'Maintenance Dashboard',
                icon: Wrench,
                color: 'text-orange-500',
                bgColor: 'bg-orange-500/10',
                description: 'Monitor maintenance schedules, equipment health, downtime analysis, and spare parts inventory.',
                features: [
                    'Preventive maintenance tracking',
                    'Equipment health monitoring',
                    'Downtime analysis',
                    'Spare parts inventory',
                    'Maintenance cost tracking'
                ]
            },
            '/dashboard/energy': {
                title: 'Energy & Efficiency Dashboard',
                icon: Zap,
                color: 'text-yellow-500',
                bgColor: 'bg-yellow-500/10',
                description: 'Track energy consumption, efficiency metrics, cost analysis, and sustainability KPIs.',
                features: [
                    'Real-time energy consumption',
                    'Energy cost analysis',
                    'Equipment efficiency tracking',
                    'Carbon footprint monitoring',
                    'Peak demand management'
                ]
            },
            '/dashboard/operators': {
                title: 'Operator Performance Dashboard',
                icon: UsersIcon,
                color: 'text-green-500',
                bgColor: 'bg-green-500/10',
                description: 'Monitor operator productivity, skill levels, training status, and performance metrics.',
                features: [
                    'Operator productivity metrics',
                    'Skill matrix tracking',
                    'Training compliance',
                    'Performance benchmarking',
                    'Shift efficiency analysis'
                ]
            }
        };

        return pageMap[path] || {
            title: 'Page Under Construction',
            icon: Construction,
            color: 'text-gray-500',
            bgColor: 'bg-gray-500/10',
            description: 'This feature is currently under development.',
            features: []
        };
    };

    const pageInfo = getPageInfo();
    const Icon = pageInfo.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-6">
            <Card className="max-w-2xl w-full shadow-2xl">
                <CardHeader className="text-center space-y-4 pb-8">
                    {/* Animated Icon */}
                    <div className={`mx-auto w-24 h-24 ${pageInfo.bgColor} rounded-full flex items-center justify-center animate-pulse`}>
                        <Icon className={`h-12 w-12 ${pageInfo.color}`} />
                    </div>

                    {/* Title */}
                    <div>
                        <CardTitle className="text-3xl font-bold mb-2">
                            {pageInfo.title}
                        </CardTitle>
                        <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-400">
                            <Construction className="h-5 w-5" />
                            <span className="font-semibold">Under Construction</span>
                        </div>
                    </div>

                    {/* Description */}
                    <CardDescription className="text-base">
                        {pageInfo.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Planned Features */}
                    {pageInfo.features.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-2 font-semibold">
                                <Calendar className="h-5 w-5 text-blue-500" />
                                <span>Planned Features:</span>
                            </div>
                            <ul className="space-y-2">
                                {pageInfo.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Status Info */}
                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-center">
                            <span className="font-semibold">📋 Development Status:</span> In Planning Phase
                        </p>
                        <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-1">
                            This dashboard will be available in future updates
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="outline"
                            className="flex-1"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                        <Button
                            onClick={() => {
                                const selectedLine = localStorage.getItem('selectedLine') || 'line_1';
                                navigate(`/dashboard/${selectedLine}`);
                            }}
                            className="flex-1"
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Go to Dashboard
                        </Button>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center pt-4 border-t">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            💡 <span className="font-semibold">Tip:</span> Use the sidebar to navigate to available features like Dashboard Overview, Data Resources, and Layout Designer.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UnderConstruction;

