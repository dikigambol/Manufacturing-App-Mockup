# 🏭 Multi-Line Dashboard Implementation Strategy

## 📋 Overview

Implementasi dashboard untuk multiple production lines (3 lines) dengan arsitektur yang scalable dan maintainable. Setiap line akan memiliki dashboard terpisah dengan data dan konfigurasi yang independen.

---

## 🏗️ Architecture Design

### **1. Multi-Tenant Architecture**

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Line 1      │  │ Line 2      │  │ Line 3      │     │
│  │ Dashboard   │  │ Dashboard   │  │ Dashboard   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                   Context Layer                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │           LineContextProvider                   │   │
│  │  - Current Line Selection                      │   │
│  │  - Line-specific Data                          │   │
│  │  - Line Configuration                          │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Line 1      │  │ Line 2      │  │ Line 3      │     │
│  │ Data        │  │ Data        │  │ Data        │     │
│  │ Storage     │  │ Storage     │  │ Storage     │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Implementation Strategy

### **Phase 1: Line Management System**

#### 1.1 Line Configuration Structure

```javascript
// src/config/lines.js
export const PRODUCTION_LINES = {
  LINE_1: {
    id: 'line_1',
    name: 'Engine Assembly Line 1',
    description: 'Main engine assembly production line',
    machines: [
      { id: 'MC_001', name: 'MC Coil Ignition Assy', type: 'assembly' },
      { id: 'LT_001', name: 'Leak Tester Cylinder Head', type: 'testing' },
      { id: 'QG_001', name: 'Quality Gate 1', type: 'quality' },
      // ... more machines
    ],
    layout: {
      width: 1200,
      height: 800,
      positions: {
        'MC_001': { x: 100, y: 200 },
        'LT_001': { x: 300, y: 200 },
        'QG_001': { x: 500, y: 200 },
        // ... machine positions
      }
    },
    dashboard: {
      id_dash: 1,
      components: [],
      layout: []
    }
  },
  LINE_2: {
    id: 'line_2',
    name: 'Engine Assembly Line 2',
    description: 'Secondary engine assembly production line',
    machines: [
      { id: 'MC_002', name: 'MC Coil Ignition Assy', type: 'assembly' },
      { id: 'LT_002', name: 'Leak Tester Cylinder Head', type: 'testing' },
      // ... different machines for line 2
    ],
    layout: {
      width: 1200,
      height: 800,
      positions: {
        'MC_002': { x: 100, y: 200 },
        'LT_002': { x: 300, y: 200 },
        // ... different positions
      }
    },
    dashboard: {
      id_dash: 2,
      components: [],
      layout: []
    }
  },
  LINE_3: {
    id: 'line_3',
    name: 'Engine Assembly Line 3',
    description: 'Tertiary engine assembly production line',
    machines: [
      { id: 'MC_003', name: 'MC Coil Ignition Assy', type: 'assembly' },
      { id: 'LT_003', name: 'Leak Tester Cylinder Head', type: 'testing' },
      // ... different machines for line 3
    ],
    layout: {
      width: 1200,
      height: 800,
      positions: {
        'MC_003': { x: 100, y: 200 },
        'LT_003': { x: 300, y: 200 },
        // ... different positions
      }
    },
    dashboard: {
      id_dash: 3,
      components: [],
      layout: []
    }
  }
};
```

#### 1.2 Line Context Provider

```javascript
// src/contexts/lineContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTION_LINES } from '@/config/lines';

const LineContext = createContext();

export const LineProvider = ({ children }) => {
  const [currentLine, setCurrentLine] = useState('line_1');
  const [lineData, setLineData] = useState({});
  const [allLinesData, setAllLinesData] = useState({});

  // Load line-specific data
  const loadLineData = async (lineId) => {
    try {
      // Load from localStorage or API
      const data = localStorage.getItem(`line_${lineId}_data`);
      if (data) {
        setLineData(JSON.parse(data));
      } else {
        // Initialize with default data
        const defaultData = {
          machines: PRODUCTION_LINES[lineId.toUpperCase()].machines,
          oee: { availability: 0, performance: 0, quality: 0, total: 0 },
          production: { cycleTime: 0, partOK: 0, partNG: 0 },
          alerts: [],
          maintenance: []
        };
        setLineData(defaultData);
        localStorage.setItem(`line_${lineId}_data`, JSON.stringify(defaultData));
      }
    } catch (error) {
      console.error('Error loading line data:', error);
    }
  };

  // Switch to different line
  const switchLine = (lineId) => {
    setCurrentLine(lineId);
    loadLineData(lineId);
    // Update URL
    window.history.pushState({}, '', `/dashboard/${lineId}`);
  };

  // Get current line configuration
  const getCurrentLineConfig = () => {
    return PRODUCTION_LINES[currentLine.toUpperCase()];
  };

  // Update line data
  const updateLineData = (newData) => {
    setLineData(prev => ({ ...prev, ...newData }));
    localStorage.setItem(`line_${currentLine}_data`, JSON.stringify({ ...lineData, ...newData }));
  };

  useEffect(() => {
    loadLineData(currentLine);
  }, [currentLine]);

  return (
    <LineContext.Provider value={{
      currentLine,
      lineData,
      allLinesData,
      switchLine,
      getCurrentLineConfig,
      updateLineData,
      loadLineData
    }}>
      {children}
    </LineContext.Provider>
  );
};

export const useLine = () => {
  const context = useContext(LineContext);
  if (!context) {
    throw new Error('useLine must be used within LineProvider');
  }
  return context;
};
```

---

### **Phase 2: Routing & Navigation**

#### 2.1 Multi-Line Routing

```javascript
// src/app.jsx - Updated routing
import { LineProvider } from '@/contexts/lineContext';
import LineDashboard from '@/pages/dashboard/LineDashboard';
import LineSelector from '@/components/LineSelector';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LineProvider>
        <SourceProvider>
          <SheetProvider>
            <LayoutProvider>
              <AlertProvider>
                <BrowserRouter>
                  <Routes>
                    <Route element={<Protected />}>
                      <Route element={<Dashboard />}>
                        {/* Line-specific routes */}
                        <Route path="/dashboard/line-1" element={<LineDashboard lineId="line_1" />} />
                        <Route path="/dashboard/line-2" element={<LineDashboard lineId="line_2" />} />
                        <Route path="/dashboard/line-3" element={<LineDashboard lineId="line_3" />} />
                        
                        {/* Default route - redirect to line selector */}
                        <Route path="/dashboard" element={<LineSelector />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        
                        {/* Other routes */}
                        <Route path="/data-resources" element={<DataSource />} />
                      </Route>
                    </Route>
                  </Routes>
                </BrowserRouter>
              </AlertProvider>
            </LayoutProvider>
          </SheetProvider>
        </SourceProvider>
      </LineProvider>
    </ThemeProvider>
  );
}
```

#### 2.2 Line Selector Component

```javascript
// src/components/LineSelector.jsx
import { useLine } from '@/contexts/lineContext';
import { PRODUCTION_LINES } from '@/config/lines';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Factory, Settings, BarChart3 } from 'lucide-react';

const LineSelector = () => {
  const { switchLine } = useLine();

  const handleLineSelect = (lineId) => {
    switchLine(lineId);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Production Line Dashboard</h1>
        <p className="text-gray-600">Select a production line to view its dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(PRODUCTION_LINES).map((line) => (
          <Card key={line.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Factory className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle>{line.name}</CardTitle>
                  <p className="text-sm text-gray-600">{line.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{line.machines.length} Machines</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Active Production</span>
                </div>

                <Button 
                  onClick={() => handleLineSelect(line.id)}
                  className="w-full"
                >
                  View Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LineSelector;
```

---

### **Phase 3: Line-Specific Dashboard**

#### 3.1 Line Dashboard Component

```javascript
// src/pages/dashboard/LineDashboard.jsx
import { useLine } from '@/contexts/lineContext';
import { useEffect } from 'react';
import MachineLayout from '@/components/dashboard/MachineLayout';
import OEEDashboard from '@/components/dashboard/OEEDashboard';
import ProductionMetrics from '@/components/dashboard/ProductionMetrics';
import HistoricalCharts from '@/components/dashboard/HistoricalCharts';
import LineHeader from '@/components/dashboard/LineHeader';

const LineDashboard = ({ lineId }) => {
  const { 
    currentLine, 
    lineData, 
    getCurrentLineConfig, 
    switchLine 
  } = useLine();

  // Ensure we're on the correct line
  useEffect(() => {
    if (currentLine !== lineId) {
      switchLine(lineId);
    }
  }, [lineId, currentLine, switchLine]);

  const lineConfig = getCurrentLineConfig();

  if (!lineConfig) {
    return <div>Line not found</div>;
  }

  return (
    <div className="line-dashboard">
      {/* Line Header with navigation */}
      <LineHeader 
        lineConfig={lineConfig}
        onSwitchLine={switchLine}
      />

      {/* Main Dashboard Content */}
      <div className="dashboard-content p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* OEE Dashboard */}
          <div className="lg:col-span-1">
            <OEEDashboard 
              data={lineData.oee}
              lineId={currentLine}
            />
          </div>

          {/* Machine Layout */}
          <div className="lg:col-span-2">
            <MachineLayout 
              machines={lineData.machines}
              layout={lineConfig.layout}
              lineId={currentLine}
            />
          </div>
        </div>

        {/* Production Metrics */}
        <div className="mb-6">
          <ProductionMetrics 
            data={lineData.production}
            lineId={currentLine}
          />
        </div>

        {/* Historical Charts */}
        <div>
          <HistoricalCharts 
            lineId={currentLine}
          />
        </div>
      </div>
    </div>
  );
};

export default LineDashboard;
```

#### 3.2 Line Header Component

```javascript
// src/components/dashboard/LineHeader.jsx
import { useLine } from '@/contexts/lineContext';
import { PRODUCTION_LINES } from '@/config/lines';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Settings, RefreshCw } from 'lucide-react';

const LineHeader = ({ lineConfig, onSwitchLine }) => {
  const { currentLine, updateLineData } = useLine();

  const handleLineChange = (newLineId) => {
    onSwitchLine(newLineId);
  };

  const handleRefresh = () => {
    // Trigger data refresh
    updateLineData({ lastRefresh: new Date().toISOString() });
  };

  return (
    <div className="line-header bg-white shadow-sm border-b p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lines
          </Button>
          
          <div>
            <h1 className="text-2xl font-bold">{lineConfig.name}</h1>
            <p className="text-sm text-gray-600">{lineConfig.description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Line Selector */}
          <Select value={currentLine} onValueChange={handleLineChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Line" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(PRODUCTION_LINES).map((line) => (
                <SelectItem key={line.id} value={line.id}>
                  {line.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Action Buttons */}
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LineHeader;
```

---

### **Phase 4: Data Management**

#### 4.1 Line-Specific Data Storage

```javascript
// src/utils/lineDataManager.js
export class LineDataManager {
  static getLineDataKey(lineId) {
    return `line_${lineId}_data`;
  }

  static getLineDashboardKey(lineId) {
    return `line_${lineId}_dashboard`;
  }

  static saveLineData(lineId, data) {
    const key = this.getLineDataKey(lineId);
    localStorage.setItem(key, JSON.stringify(data));
  }

  static loadLineData(lineId) {
    const key = this.getLineDataKey(lineId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static saveLineDashboard(lineId, dashboard) {
    const key = this.getLineDashboardKey(lineId);
    localStorage.setItem(key, JSON.stringify(dashboard));
  }

  static loadLineDashboard(lineId) {
    const key = this.getLineDashboardKey(lineId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static getAllLinesData() {
    const lines = ['line_1', 'line_2', 'line_3'];
    const allData = {};
    
    lines.forEach(lineId => {
      allData[lineId] = {
        data: this.loadLineData(lineId),
        dashboard: this.loadLineDashboard(lineId)
      };
    });
    
    return allData;
  }

  static clearLineData(lineId) {
    localStorage.removeItem(this.getLineDataKey(lineId));
    localStorage.removeItem(this.getLineDashboardKey(lineId));
  }

  static clearAllLinesData() {
    const lines = ['line_1', 'line_2', 'line_3'];
    lines.forEach(lineId => this.clearLineData(lineId));
  }
}
```

#### 4.2 Real-time Data Updates

```javascript
// src/hooks/useLineWebSocket.js
import { useEffect, useState } from 'react';
import { useLine } from '@/contexts/lineContext';

export const useLineWebSocket = () => {
  const { currentLine, updateLineData } = useLine();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to WebSocket for current line
    const ws = new WebSocket(`ws://localhost:8080/line/${currentLine}`);
    
    ws.onopen = () => {
      setIsConnected(true);
      console.log(`Connected to line ${currentLine} WebSocket`);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Update line-specific data
      switch (data.type) {
        case 'machine_status':
          updateLineData({
            machines: data.machines
          });
          break;
        case 'oee_update':
          updateLineData({
            oee: data.oee
          });
          break;
        case 'production_update':
          updateLineData({
            production: data.production
          });
          break;
        case 'alert':
          updateLineData({
            alerts: [...lineData.alerts, data.alert]
          });
          break;
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log(`Disconnected from line ${currentLine} WebSocket`);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [currentLine]);

  const sendMessage = (message) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    }
  };

  return {
    socket,
    isConnected,
    sendMessage
  };
};
```

---

### **Phase 5: Component Updates**

#### 5.1 Updated Machine Layout Component

```javascript
// src/components/dashboard/MachineLayout.jsx
import { useLine } from '@/contexts/lineContext';
import { useLineWebSocket } from '@/hooks/useLineWebSocket';

const MachineLayout = ({ machines, layout, lineId }) => {
  const { lineData } = useLine();
  const { isConnected } = useLineWebSocket();

  return (
    <div className="machine-layout-container">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Machine Layout - {lineId}</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="machine-layout" style={{ width: layout.width, height: layout.height }}>
        {machines.map(machine => (
          <MachineNode 
            key={machine.id}
            machine={machine}
            position={layout.positions[machine.id]}
            status={lineData.machines?.find(m => m.id === machine.id)?.status || 'disconnected'}
            lineId={lineId}
          />
        ))}
        
        {/* Connection lines */}
        {layout.connections?.map(connection => (
          <ConnectionLine 
            key={`${connection.from}-${connection.to}`}
            from={layout.positions[connection.from]}
            to={layout.positions[connection.to]}
            status={connection.status}
          />
        ))}
      </div>
    </div>
  );
};

const MachineNode = ({ machine, position, status, lineId }) => {
  const statusColors = {
    running: 'bg-green-500',
    idle: 'bg-yellow-500',
    alarm: 'bg-red-500',
    disconnected: 'bg-gray-500'
  };

  return (
    <div 
      className={`machine-node ${statusColors[status]} text-white p-2 rounded-lg shadow-md absolute`}
      style={{ 
        left: position.x, 
        top: position.y,
        width: 120,
        height: 80
      }}
    >
      <div className="text-xs font-medium truncate">{machine.name}</div>
      <div className="text-xs opacity-75 capitalize">{status}</div>
      <div className="text-xs opacity-75">{machine.type}</div>
    </div>
  );
};

export default MachineLayout;
```

---

## 🎯 Implementation Steps

### **Step 1: Setup Line Configuration (Day 1-2)**

```bash
# 1. Create line configuration
mkdir -p src/config
touch src/config/lines.js

# 2. Create line context
touch src/contexts/lineContext.jsx

# 3. Update app.jsx with LineProvider
```

### **Step 2: Update Routing (Day 3)**

```bash
# 1. Create line selector component
mkdir -p src/components
touch src/components/LineSelector.jsx

# 2. Create line dashboard component
mkdir -p src/pages/dashboard
touch src/pages/dashboard/LineDashboard.jsx

# 3. Update routing in app.jsx
```

### **Step 3: Implement Line-Specific Components (Day 4-7)**

```bash
# 1. Update existing components to be line-aware
# 2. Create line header component
# 3. Implement data management utilities
# 4. Setup WebSocket connections per line
```

### **Step 4: Testing & Integration (Day 8-10)**

```bash
# 1. Test line switching
# 2. Test data isolation between lines
# 3. Test real-time updates per line
# 4. Performance testing with multiple lines
```

---

## 📊 Data Structure per Line

```javascript
// Example data structure for each line
const lineDataStructure = {
  line_1: {
    machines: [
      { id: 'MC_001', name: 'MC Coil Ignition Assy', status: 'running', type: 'assembly' },
      { id: 'LT_001', name: 'Leak Tester Cylinder Head', status: 'idle', type: 'testing' }
    ],
    oee: {
      availability: 88,
      performance: 90,
      quality: 85,
      total: 92
    },
    production: {
      cycleTime: 21.4,
      partOK: 1100,
      partNG: 4,
      target: 1200
    },
    alerts: [
      { id: 1, type: 'alarm', message: 'Machine MC_001 has temperature warning', timestamp: '2025-10-11T10:30:00Z' }
    ],
    maintenance: [
      { id: 1, machineId: 'LT_001', type: 'scheduled', dueDate: '2025-10-15T08:00:00Z' }
    ]
  },
  line_2: {
    // Similar structure but different data
  },
  line_3: {
    // Similar structure but different data
  }
};
```

---

## 🚀 Benefits of This Approach

### **1. Scalability**
- Easy to add new production lines
- Independent data management per line
- Modular component architecture

### **2. Maintainability**
- Clear separation of concerns
- Line-specific configurations
- Centralized line management

### **3. Performance**
- Only load data for current line
- Efficient WebSocket connections
- Optimized rendering per line

### **4. User Experience**
- Quick line switching
- Consistent interface across lines
- Line-specific customizations

---

## 🎯 Next Steps

1. **Review** this implementation strategy
2. **Choose** which line to implement first
3. **Setup** the line configuration structure
4. **Implement** the LineProvider and routing
5. **Test** with one line first, then expand

Apakah strategi implementasi multi-line ini sudah sesuai dengan kebutuhan Anda? Ada yang perlu disesuaikan atau ditambahkan? 😊
