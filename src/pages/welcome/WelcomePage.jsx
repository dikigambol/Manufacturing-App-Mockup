import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Factory,
    BarChart3,
    Settings,
    Users,
    TrendingUp,
    Shield,
    ArrowRight,
    Play,
    BookOpen,
    Zap
} from "lucide-react";
import { Link } from "react-router";

const WelcomePage = () => {
    const features = [
        {
            icon: Factory,
            title: "Production Monitoring",
            description: "Real-time monitoring of production lines with OEE tracking and machine status visualization."
        },
        {
            icon: BarChart3,
            title: "Analytics Dashboard",
            description: "Comprehensive analytics with historical data, trends, and performance metrics."
        },
        {
            icon: Settings,
            title: "Maintenance Management",
            description: "Track maintenance schedules, alerts, and equipment health monitoring."
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Collaborate with your team through shared dashboards and real-time notifications."
        },
        {
            icon: TrendingUp,
            title: "Performance Insights",
            description: "Get actionable insights to improve production efficiency and reduce downtime."
        },
        {
            icon: Shield,
            title: "Data Security",
            description: "Enterprise-grade security with role-based access control and data encryption."
        }
    ];

    const stats = [
        { label: "Production Lines", value: "3", icon: Factory },
        { label: "Active Machines", value: "24", icon: Settings },
        { label: "Daily Production", value: "1,200+", icon: TrendingUp },
        { label: "OEE Average", value: "92%", icon: BarChart3 }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Header */}
            <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                                <Factory className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Manufacturing Dashboard</h1>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Production Monitoring System</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                System Online
                            </Badge>
                            <Button asChild>
                                <Link to="/login">
                                    <ArrowRight className="w-4 h-4 mr-2" />
                                    Sign In
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                            <Zap className="w-3 h-3 mr-1" />
                            Manufacturing Intelligence Platform
                        </Badge>

                        <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Monitor Your Production
                            <span className="text-blue-600 dark:text-blue-400"> Lines</span>
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Real-time monitoring, analytics, and insights for your manufacturing operations.
                            Optimize production efficiency with our comprehensive dashboard system.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                                <Link to="/login">
                                    <Play className="w-5 h-5 mr-2" />
                                    Sign In to Start
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <a href="#features">
                                    <BookOpen className="w-5 h-5 mr-2" />
                                    Learn More
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white/50 dark:bg-slate-800/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-4">
                                    <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            Everything You Need for Production Monitoring
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Our comprehensive platform provides all the tools you need to monitor, analyze, and optimize your manufacturing operations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                            <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-slate-600 dark:text-slate-400">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 dark:bg-blue-700">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Optimize Your Production?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Start monitoring your production lines today and see the difference real-time insights can make.
                        </p>
                        <Button size="lg" variant="secondary" asChild>
                            <Link to="/login">
                                <ArrowRight className="w-5 h-5 mr-2" />
                                Get Started Now
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                                <Factory className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                © 2025 Manufacturing Dashboard. All rights reserved.
                            </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                            <span>Version 1.0.0</span>
                            <span>•</span>
                            <span>System Status: Online</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default WelcomePage;
