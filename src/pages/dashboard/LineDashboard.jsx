import { useParams } from "react-router";
import { useEffect, useContext } from "react";
import { useAuth } from "@/contexts/auth";
import { LayoutContext } from "@/contexts/interact";
import Home from "@/pages/dashbaord/home";

const LineDashboard = () => {
    const { lineId } = useParams();
    const { getCurrentLine, selectLine } = useAuth();
    const { ensureDashboardExists } = useContext(LayoutContext);

    // Map lineId to unique dashboard ID
    const getLineDashboardId = (lineId) => {
        const lineIdMap = {
            'line_1': 2,   // Line 1 uses dashboard ID 2 (Dashboard Option 1 - with calendar)
            'line_2': 5,   // Line 2 uses dashboard ID 5 (Dashboard Option 2 - detailed layout, no calendar)
            'line_3': 3,   // Line 3 uses dashboard ID 3
        };
        return lineIdMap[lineId] || 1;
    };

    // Ensure we're on the correct line and load its dashboard
    useEffect(() => {
        const currentLine = getCurrentLine();
        if (currentLine !== lineId) {
            selectLine(lineId);
        }

        // Load dashboard configuration for this specific line
        const dashboardId = getLineDashboardId(lineId);
        ensureDashboardExists(dashboardId);
    }, [lineId]); // Only re-run when lineId changes

    // Use the existing Home component which has all the dashboard functionality
    return <Home />;
};

export default LineDashboard;
