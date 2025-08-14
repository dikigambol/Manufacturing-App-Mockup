import { AlertProvider } from "@/contexts/alert";
import { LayoutProvider } from "@/contexts/interact";
import Dashbaord from "@/layouts/dashbaord";
import Home from "@/pages/dashbaord/home";
import Protected from "@/utils/protected";
import { BrowserRouter, Route, Routes } from "react-router";
import { SheetProvider } from "./contexts/sheet";
import { SourceProvider } from "./contexts/source";
import DataSource from "./pages/data-resources";

function App() {

  return (
    <SourceProvider>
      <SheetProvider>
        <LayoutProvider>
          <AlertProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Protected />}>
                  <Route element={<Dashbaord />} >
                    <Route path="/" element={<Home />} />
                    <Route path="/inf-prod" element={<Home />} />
                    <Route path="/mon-line" element={<Home />} />
                    <Route path="/qc" element={<Home />} />
                    <Route path="/mater-inv" element={<Home />} />
                    <Route path="/mainten" element={<Home />} />
                    <Route path="/saf-comp" element={<Home />} />
                    <Route path="/enrg-effcy" element={<Home />} />
                    <Route path="/opp-perf" element={<Home />} />
                    <Route path="/data-resources" element={<DataSource />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter >
          </AlertProvider>
        </LayoutProvider>
      </SheetProvider>
    </SourceProvider>
  )
}

export default App
