import { local } from "@/utils/access";
import { createContext, useEffect, useReducer } from "react";
import { default_dash } from "@/utils/constant";

export const LayoutContext = createContext(undefined);

const initialState = {
    activeIdDash: 1, // default
    layout: [],
    components: [],
    dashboard: [],
};

const actionReducer = (state, action) => {
    switch (action.type) {
        case "SET_ACTIVE_ID":
            return { ...state, activeIdDash: action.id };
        case "LAYOUT":
            return { ...state, layout: action.data };
        case "COMPONENT":
            return { ...state, components: action.data };
        case "DASHBOARD":
            return { ...state, dashboard: action.data };
        default:
            return state;
    }
};

export const LayoutProvider = ({ children }) => {
    const [state, dispatch] = useReducer(actionReducer, initialState);

    const setActiveIdDash = (id) => {
        local.save("activeIdDash", id);
        dispatch({ type: "SET_ACTIVE_ID", id });
    };

    const saveLayoutToLocal = () => {
        if (!state.activeIdDash) return;

        const storedDashboard = local.get("dashboard_list") || [];
        const updatedList = storedDashboard.map((d) =>
            d.id_dash === state.activeIdDash
                ? { ...d, layout: state.layout }
                : d
        );

        local.save("dashboard_list", updatedList);
    };

    const updateLayout = (data) => {
        dispatch({ type: "LAYOUT", data });
    };

    const updateComponent = (data) => {
        if (!state.activeIdDash) return;
        const storedDashboard = local.get("dashboard_list") || [];
        const updatedList = storedDashboard.map((d) =>
            d.id_dash === state.activeIdDash ? { ...d, component: data } : d
        );
        local.save("dashboard_list", updatedList);
        dispatch({ type: "COMPONENT", data });
    };

    const updateDashboard = (data) => {
        dispatch({ type: "DASHBOARD", data });
    };

    const ensureDashboardExists = (idDashTarget) => {
        if (idDashTarget) {
            const storedDashboard = local.get("dashboard_list") || [];
            const dashboardExists = storedDashboard.some(
                (d) => d.id_dash === idDashTarget
            );

            if (!dashboardExists) {
                // Try to load from default_dash first
                const defaultDashboard = default_dash.find(
                    (d) => d.id_dash === idDashTarget
                );

                const newDashboard = defaultDashboard || {
                    id_dash: idDashTarget,
                    component: [],
                    layout: [],
                };

                const updatedList = [...storedDashboard, newDashboard];
                local.save("dashboard_list", updatedList);
                dispatch({ type: "LAYOUT", data: newDashboard.layout || [] });
                dispatch({ type: "COMPONENT", data: newDashboard.component || [] });
                dispatch({ type: "DASHBOARD", data: [newDashboard] });
            } else {
                const dashboardData = storedDashboard.find(
                    (d) => d.id_dash === idDashTarget
                );
                dispatch({ type: "LAYOUT", data: dashboardData.layout || [] });
                dispatch({ type: "COMPONENT", data: dashboardData.component || [] });
                dispatch({ type: "DASHBOARD", data: [dashboardData] });
            }

            setActiveIdDash(idDashTarget);
        }
    };

    // Load awal
    useEffect(() => {
        const savedActiveId = local.get("activeIdDash");
        if (savedActiveId) {
            ensureDashboardExists(savedActiveId);
        } else {
            ensureDashboardExists(1);
        }
    }, []);

    return (
        <LayoutContext.Provider
            value={{
                activeIdDash: state.activeIdDash,
                layout: state.layout,
                components: state.components,
                dashboard: state.dashboard,
                setActiveIdDash,
                updateLayout,
                updateComponent,
                updateDashboard,
                ensureDashboardExists,
                saveLayoutToLocal
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};