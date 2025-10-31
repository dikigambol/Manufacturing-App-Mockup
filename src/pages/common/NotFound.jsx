import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-6">
            <Card className="max-w-xl w-full shadow-2xl">
                <CardHeader className="text-center space-y-4 pb-8">
                    {/* 404 Animation */}
                    <div className="relative mx-auto">
                        <div className="text-8xl font-bold text-gray-300 dark:text-gray-700">
                            404
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FileQuestion className="h-16 w-16 text-gray-400 dark:text-gray-600 animate-pulse" />
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <CardTitle className="text-2xl font-bold mb-2">
                            Page Not Found
                        </CardTitle>
                        <CardDescription className="text-base">
                            Sorry, we couldn't find the page you're looking for.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Helpful Info */}
                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2 font-semibold text-sm">
                            <Search className="h-4 w-4 text-blue-500" />
                            <span>What you can do:</span>
                        </div>
                        <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                            <li>Check the URL for any typos</li>
                            <li>Use the sidebar to navigate</li>
                            <li>Return to your dashboard</li>
                            <li>Contact support if the issue persists</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
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

                    {/* Quick Links */}
                    <div className="pt-4 border-t">
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
                            Quick Links:
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <Button
                                variant="link"
                                size="sm"
                                onClick={() => navigate('/lines')}
                                className="text-xs"
                            >
                                Line Selection
                            </Button>
                            <Button
                                variant="link"
                                size="sm"
                                onClick={() => navigate('/data-resources')}
                                className="text-xs"
                            >
                                Data Resources
                            </Button>
                            <Button
                                variant="link"
                                size="sm"
                                onClick={() => navigate('/layout-designer')}
                                className="text-xs"
                            >
                                Layout Designer
                            </Button>
                            <Button
                                variant="link"
                                size="sm"
                                onClick={() => navigate('/settings')}
                                className="text-xs"
                            >
                                Settings
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotFound;

