import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Factory,
    Eye,
    EyeOff,
    LogIn,
    Shield,
    Users,
    Activity
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/auth";
import DummyDataService from "@/services/DummyDataService";
import { AlertContext } from "@/contexts/alert";
import { useContext } from "react";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const alertContext = useContext(AlertContext);

    // Helper function untuk show alert
    const showAlert = (status, message) => {
        if (alertContext && alertContext.alert) {
            alertContext.alert({ status, message, time: 3 });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Authenticate with DummyDataService using NRP and password
            const user = await DummyDataService.users.authenticate(
                formData.username, // NRP
                formData.password
            );

            // Store user session using auth context
            const userData = {
                id: user.id,
                username: user.name,
                nrp: user.nrp,
                role: user.access_level_name,
                access_level_id: user.access_level_id,
                picture_url: user.picture_url,
                loginTime: new Date().toISOString()
            };

            login(userData);
            showAlert('success', `Welcome back, ${user.name}!`);
            navigate("/lines");
        } catch (error) {
            showAlert('error', error.message || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    const quickLogin = async (role) => {
        setIsLoading(true);

        try {
            let user;
            if (role === "admin") {
                // Login as John Doe (Admin)
                user = await DummyDataService.users.authenticate("297498", "admin123");
            } else {
                // Login as Asep Gunandar (Operator)
                user = await DummyDataService.users.authenticate("297499", "operator123");
            }

            const userData = {
                id: user.id,
                username: user.name,
                nrp: user.nrp,
                role: user.access_level_name,
                access_level_id: user.access_level_id,
                picture_url: user.picture_url,
                loginTime: new Date().toISOString()
            };

            login(userData);
            showAlert('success', `Welcome back, ${user.name}!`);
            navigate("/lines");
        } catch (error) {
            showAlert('error', error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 shadow-lg">
                        <Factory className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Manufacturing Dashboard
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Sign in to access your production monitoring system
                    </p>
                </div>

                {/* Login Form */}
                <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access the dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="h-11 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-slate-500" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-slate-500" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <LogIn className="w-4 h-4" />
                                        <span>Sign In</span>
                                    </div>
                                )}
                            </Button>
                        </form>

                        {/* Quick Login Options */}
                        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-3">
                                Quick Login (Demo)
                            </p>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => quickLogin("admin")}
                                    className="h-9"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="w-3 h-3 border-2 border-slate-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                    ) : (
                                        <Shield className="w-3 h-3 mr-2" />
                                    )}
                                    Admin
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => quickLogin("operator")}
                                    className="h-9"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="w-3 h-3 border-2 border-slate-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                    ) : (
                                        <Users className="w-3 h-3 mr-2" />
                                    )}
                                    Operator
                                </Button>
                            </div>

                            {/* Login Credentials Info */}
                            <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-3 text-xs space-y-1">
                                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Test Credentials:</p>
                                <div className="space-y-1 text-slate-600 dark:text-slate-400">
                                    <p>• <span className="font-medium">Admin:</span> NRP: 297498 | Pass: admin123</p>
                                    <p>• <span className="font-medium">Operator:</span> NRP: 297499 | Pass: operator123</p>
                                    <p>• <span className="font-medium">Technician:</span> NRP: 297500 | Pass: tech123</p>
                                    <p>• <span className="font-medium">Supervisor:</span> NRP: 297501 | Pass: super123</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-8">
                    <div className="flex items-center justify-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center space-x-1">
                            <Activity className="w-3 h-3 text-green-500" />
                            <span>System Online</span>
                        </div>
                        <span>•</span>
                        <span>Version 1.0.0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
