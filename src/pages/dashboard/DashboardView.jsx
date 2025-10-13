import { useLocation, useContext, useEffect } from "react";
import { LayoutContext } from "@/contexts/interact";
import Home from "@/pages/dashbaord/home";

const DashboardView = () => {
    const location = useLocation();
    const { ensureDashboardExists } = useContext(LayoutContext);

    // Map URL to dashboard ID
    const getDashboardId = (pathname) => {
        const viewIdMap = {
            '/dashboard/overview': 4,
            '/dashboard/production': 5,
            '/dashboard/machines': 6,
            '/dashboard/qc': 7,
            '/dashboard/inventory': 8,
            '/dashboard/maintenance': 9,
            '/dashboard/energy': 10,
            '/dashboard/operators': 11,
        };
        return viewIdMap[pathname] || 4;
    };

    // Load dashboard configuration for this view
    useEffect(() => {
        const dashboardId = getDashboardId(location.pathname);
        ensureDashboardExists(dashboardId);
    }, [location.pathname]);

    // Use the existing Home component
    return <Home />;
};

export default DashboardView;
