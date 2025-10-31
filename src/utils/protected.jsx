import { Navigate, useLocation, Outlet } from "react-router";
import { useAuth } from "@/contexts/auth";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Unauthorized from "../pages/errors/401";

const Protected = ({ children, requireLine = false }) => {
    const { isAuthenticated, hasSelectedLine, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="flex flex-col items-center space-y-4">
                    <LoadingSpinner size="xl" />
                    <p className="text-slate-600 dark:text-slate-400">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireLine && !hasSelectedLine()) {
        return <Navigate to="/lines" replace />;
    }

    // If children are passed, render them; otherwise use Outlet for nested routes
    return children ? children : <Outlet />;
};

export default Protected;