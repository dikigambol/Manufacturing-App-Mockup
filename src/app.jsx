import { AlertProvider } from "@/contexts/alert";
import { LayoutProvider } from "@/contexts/interact";
import { AuthProvider } from "@/contexts/auth";
import Dashbaord from "@/layouts/dashbaord";
import Home from "@/pages/dashbaord/home";
import WelcomePage from "@/pages/welcome/WelcomePage";
import LoginPage from "@/pages/auth/LoginPage";
import LineSelectionPage from "@/pages/lines/LineSelectionPage";
import LineDashboard from "@/pages/dashboard/LineDashboard";
import DashboardView from "@/pages/dashboard/DashboardView";
import Protected from "@/utils/protected";
import MasterDataAccessLevel from "@/pages/master-data/MasterDataAccessLevel";
import MasterDataMachines from "@/pages/master-data/MasterDataMachines";
import MasterDataUsers from "@/pages/master-data/MasterDataUsers";
import MasterDataSpareparts from "@/pages/master-data/MasterDataSpareparts";
import AndonList from "@/pages/andon/AndonList";
import MaintenanceList from "@/pages/maintenance/MaintenanceList";
import TraceabilityList from "@/pages/traceability/TraceabilityList";
import LayoutDesigner from "@/pages/machine-layout-designer/LayoutDesigner";
import MachineDetailPage from "@/pages/machines/MachineDetailPage";
import DataManagement from "@/pages/settings/DataManagement";
import UnderConstruction from "@/pages/common/UnderConstruction";
import NotFound from "@/pages/common/NotFound";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { SheetProvider } from "./contexts/sheet";
import { SourceProvider } from "./contexts/source";
import DataSource from "./pages/data-resources";
import { default_dash, default_source_data } from "./utils/constant";
import { useEffect } from "react";
import { ThemeProvider } from "./contexts/thems";

function App() {
  useEffect(() => {
    const isFirstVisit = localStorage.getItem("hasVisited");

    if (!isFirstVisit) {
      localStorage.clear();
      localStorage.setItem("dashboard_list", JSON.stringify(default_dash));
      localStorage.setItem("dataSources", JSON.stringify(default_source_data));
      localStorage.setItem("hasVisited", "true");

      window.location.reload();
    }
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <SourceProvider>
          <SheetProvider>
            <LayoutProvider>
              <AlertProvider>
                <BrowserRouter>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Line Selection - Requires Authentication */}
                    <Route path="/lines" element={
                      <Protected>
                        <LineSelectionPage />
                      </Protected>
                    } />

                    {/* Dashboard Routes - With Sidebar Layout */}
                    <Route element={<Protected />}>
                      <Route element={<Dashbaord />}>
                        {/* Line-specific dashboards */}
                        <Route path="/dashboard/:lineId" element={<LineDashboard />} />

                        {/* Dashboard views */}
                        <Route path="/dashboard/overview" element={<DashboardView />} />
                        <Route path="/dashboard/production" element={<DashboardView />} />
                        <Route path="/dashboard/machines" element={<DashboardView />} />

                        {/* Analytics Pages - Under Construction */}
                        <Route path="/dashboard/qc" element={<UnderConstruction />} />
                        <Route path="/dashboard/inventory" element={<UnderConstruction />} />
                        <Route path="/dashboard/maintenance" element={<UnderConstruction />} />
                        <Route path="/dashboard/energy" element={<UnderConstruction />} />
                        <Route path="/dashboard/operators" element={<UnderConstruction />} />

                        {/* Management pages */}
                        <Route path="/data-resources" element={<DataSource />} />
                        <Route path="/settings" element={<DataManagement />} />
                        <Route path="/settings/data-management" element={<DataManagement />} />

                        {/* Master Data Routes */}
                        <Route path="/master-data/access-level" element={<MasterDataAccessLevel />} />
                        <Route path="/master-data/users" element={<MasterDataUsers />} />
                        <Route path="/master-data/machines" element={<MasterDataMachines />} />
                        <Route path="/master-data/spareparts" element={<MasterDataSpareparts />} />

                        {/* System Routes */}
                        <Route path="/andon/list" element={<AndonList />} />
                        <Route path="/maintenance/list" element={<MaintenanceList />} />
                        <Route path="/traceability/list" element={<TraceabilityList />} />
                      </Route>

                      {/* Layout Designer - Standalone Full Screen */}
                      <Route path="/layout-designer" element={<LayoutDesigner />} />

                      {/* Machine Detail - Standalone Full Screen */}
                      <Route path="/machines/:machineId" element={<MachineDetailPage />} />
                    </Route>

                    {/* Default redirect */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter >
              </AlertProvider>
            </LayoutProvider>
          </SheetProvider>
        </SourceProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
