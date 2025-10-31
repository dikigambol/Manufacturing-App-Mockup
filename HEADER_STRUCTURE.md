# 📋 Header Structure Documentation

## Overview
Header component adalah bagian atas dari aplikasi yang menyediakan navigasi, status, dan kontrol utama. Header ini dirancang untuk memberikan konteks yang jelas tentang halaman yang sedang aktif dan memungkinkan navigasi yang mudah antar production lines.

---

## 🏗️ Header Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            HEADER LAYOUT                                │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Left      │  │   Center    │  │   Right     │  │   User      │   │
│  │   Section   │  │   Section   │  │   Section   │  │   Section   │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Left Section Components
- **Sidebar Trigger**: Toggle sidebar visibility
- **Back to Lines Button**: Navigate back to line selection (dashboard pages only)
- **Line Switcher**: Switch between production lines (line-specific dashboards only)
- **Page Title & Description**: Dynamic title based on current page
- **Command Palette**: Quick search and navigation (except data-resources page)

### Center Section Components
- **Connection Status**: Online/Offline indicator
- **System Status**: System active indicator

### Right Section Components
- **Notifications**: Bell icon with notification count
- **Settings**: Settings access
- **Save Button**: Save current layout (except data-resources page)
- **User Profile**: User information and avatar

---

## 🎯 Dynamic Page Title System

### Line-Specific Dashboard Titles
```javascript
const getLineInfo = (lineId) => {
    const lines = {
        line_1: {
            name: "Engine Assembly Line 1",
            description: "Main engine assembly production line",
            status: "running"
        },
        line_2: {
            name: "Engine Assembly Line 2", 
            description: "Secondary engine assembly production line",
            status: "idle"
        },
        line_3: {
            name: "Engine Assembly Line 3",
            description: "Tertiary engine assembly production line", 
            status: "maintenance"
        }
    };
    return lines[lineId] || null;
};
```

### Dashboard View Titles
| Path | Title | Description |
|------|-------|-------------|
| `/dashboard/overview` | Dashboard Overview | Overview dashboard |
| `/dashboard/production` | Production Monitoring | Production metrics |
| `/dashboard/machines` | Machine Status | Machine monitoring |
| `/dashboard/qc` | Quality Control | Quality control metrics |
| `/dashboard/inventory` | Material & Inventory | Inventory tracking |
| `/dashboard/maintenance` | Maintenance | Maintenance schedules |
| `/dashboard/energy` | Energy & Efficiency | Energy metrics |
| `/dashboard/operators` | Operator Performance | Operator analytics |

### Other Page Titles
| Path | Title | Description |
|------|-------|-------------|
| `/` | Dashboard | Main dashboard |
| `/data-resources` | Data Resources | Data source management |
| `/settings` | Settings | System settings |
| Default | Manufacturing Dashboard | Generic title |

---

## 🔄 Line Switcher Component

### Visibility Logic
- **Shows**: Only on line-specific dashboards (`line_1`, `line_2`, `line_3`)
- **Hides**: On dashboard views and other pages

### Line Options
```javascript
<SelectItem value="line_1">
    <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span>Line 1 - Engine Assembly</span>
    </div>
</SelectItem>
<SelectItem value="line_2">
    <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        <span>Line 2 - Quality Control</span>
    </div>
</SelectItem>
<SelectItem value="line_3">
    <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span>Line 3 - Packaging</span>
    </div>
</SelectItem>
```

### Status Indicators
- **Green**: Line 1 - Running
- **Yellow**: Line 2 - Idle  
- **Blue**: Line 3 - Maintenance

---

## 🎨 Visual Design

### Header Styling
```css
header {
    position: sticky;
    top: 0;
    z-index: 50;
    border-bottom: 1px solid;
    background: white/80 dark:bg-slate-900/80;
    backdrop-filter: blur-sm;
}
```

### Component Styling
- **Height**: 64px (h-16)
- **Padding**: 24px horizontal (px-6)
- **Background**: Semi-transparent with backdrop blur
- **Border**: Bottom border for separation

### Status Badges
```css
/* Online Status */
.online {
    background: green-100;
    color: green-800;
    dark:bg-green-900 dark:text-green-200;
}

/* Offline Status */
.offline {
    background: red-100;
    color: red-800;
    dark:bg-red-900 dark:text-red-200;
}

/* System Active */
.system-active {
    background: blue-50;
    color: blue-700;
    border: blue-200;
    dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800;
}
```

---

## 🔧 Functionality

### Save Functionality
```javascript
const save = () => {
    saveLayoutToLocal()
    updateComponent(components)
    
    // Dynamic success message based on current line
    let message = 'Layout has been saved successfully!';
    if (lineId && ['line_1', 'line_2', 'line_3'].includes(lineId)) {
        const lineInfo = getLineInfo(lineId);
        if (lineInfo) {
            message = `${lineInfo.name} dashboard saved successfully!`;
        }
    }
    
    alert({
        time: 10,
        status: 'success',
        message: message,
    })
}
```

### Keyboard Shortcuts
- **Ctrl/Cmd + S**: Save current layout
- **Global**: Works on all pages except data-resources

### Online/Offline Detection
```javascript
useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
    }
}, [])
```

---

## 📱 Responsive Behavior

### Desktop (≥ 1024px)
- All sections visible
- Full line switcher with status indicators
- Complete notification and user sections
- Command palette available

### Tablet (768px - 1023px)
- Center section hidden (status badges)
- Line switcher may be compressed
- User name hidden, icon only
- Command palette available

### Mobile (< 768px)
- Center section completely hidden
- Line switcher simplified
- User section icon only
- Command palette may be hidden
- Back button always visible

---

## 🎯 Context-Aware Features

### Back to Lines Button
- **Shows**: On all dashboard pages (`/dashboard/*`)
- **Hides**: On non-dashboard pages
- **Function**: Navigate to `/lines` (line selection page)
- **Styling**: Blue accent with arrow icon

### Line Switcher
- **Shows**: Only on line-specific dashboards (`line_1`, `line_2`, `line_3`)
- **Hides**: On dashboard views and other pages
- **Function**: Switch between production lines
- **Styling**: Blue accent with factory icon

### Save Button
- **Shows**: On all pages except `/data-resources`
- **Hides**: On data-resources page
- **Function**: Save current layout and components
- **Styling**: Blue background with save icon

### Command Palette
- **Shows**: On all pages except `/data-resources`
- **Hides**: On data-resources page
- **Function**: Quick search and navigation
- **Shortcut**: Ctrl/Cmd + K

---

## 🔄 State Management

### Context Dependencies
```javascript
const { layout, components, updateComponent, saveLayoutToLocal, activeIdDash } = useContext(LayoutContext)
const { alert } = useContext(AlertContext)
const { getCurrentLine } = useAuth()
```

### Local State
```javascript
const [isOnline, setIsOnline] = useState(navigator.onLine)
```

### Props from Router
```javascript
const location = useLocation();
const navigate = useNavigate();
const { lineId } = useParams();
```

---

## 🎨 Icon Usage

### Primary Icons
- **Factory**: Line switcher, page title
- **ArrowLeft**: Back to lines button
- **Save**: Save button
- **Bell**: Notifications
- **Settings**: Settings access
- **User**: User profile
- **Activity**: System status
- **Wifi/WifiOff**: Connection status

### Status Icons
- **Green Dot**: Line 1 - Running
- **Yellow Dot**: Line 2 - Idle
- **Blue Dot**: Line 3 - Maintenance
- **Red Dot**: Notifications count

---

## 🚀 User Experience Flow

### Scenario 1: Line Navigation
```
User → On Line 1 Dashboard
     → See "Engine Assembly Line 1" title
     → See line switcher with current line selected
     → Click line switcher
     → Select Line 2
     → Navigate to Line 2 dashboard
     → See "Engine Assembly Line 2" title
```

### Scenario 2: Dashboard View Navigation
```
User → On Production Info dashboard
     → See "Production Info" title
     → See "Back to Lines" button
     → No line switcher (not line-specific)
     → Click "Back to Lines"
     → Navigate to line selection page
```

### Scenario 3: Save Operation
```
User → Make changes to dashboard
     → Press Ctrl+S or click Save button
     → See success message with line name
     → Layout saved to localStorage
     → Changes persisted
```

### Scenario 4: Connection Status
```
User → Online: See green "Online" badge
     → Network disconnects
     → See red "Offline" badge
     → Network reconnects
     → See green "Online" badge again
```

---

## 🔧 Customization Options

### Adding New Line
```javascript
// In getLineInfo function
line_4: {
    name: "Line 4 - Testing",
    description: "Testing and validation line",
    status: "running"
}

// In line switcher
<SelectItem value="line_4">
    <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        <span>Line 4 - Testing</span>
    </div>
</SelectItem>
```

### Adding New Dashboard View
```javascript
// In getPageTitle function
case '/dashboard/new-view':
    return 'New View Name'

// In getPageDescription function  
// Add description for new view
```

### Modifying Status Colors
```javascript
// Change line status colors
line_1: { status: "running", color: "green" }
line_2: { status: "idle", color: "yellow" }
line_3: { status: "maintenance", color: "blue" }
```

---

## 📊 Performance Considerations

### Re-render Optimization
- **useEffect dependencies**: Properly managed to prevent unnecessary re-renders
- **Event listeners**: Properly cleaned up to prevent memory leaks
- **State updates**: Batched where possible

### Keyboard Event Handling
- **Global listeners**: Added/removed on component mount/unmount
- **Event delegation**: Efficient event handling
- **Shortcut conflicts**: Avoided with proper event handling

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Line Switcher Not Showing
- **Cause**: Not on line-specific dashboard
- **Solution**: Check if `lineId` is in `['line_1', 'line_2', 'line_3']`

#### 2. Save Button Not Working
- **Cause**: Missing context or layout data
- **Solution**: Check LayoutContext and component state

#### 3. Title Not Updating
- **Cause**: Location pathname not matching expected patterns
- **Solution**: Check `location.pathname` and update switch cases

#### 4. Online Status Not Updating
- **Cause**: Event listeners not properly attached
- **Solution**: Check useEffect cleanup and event listener setup

---

## 🔮 Future Enhancements

### Planned Features
- **Real-time notifications**: WebSocket integration
- **User role display**: Show current user role in header
- **Theme switcher**: Dark/light mode toggle
- **Language selector**: Multi-language support
- **Breadcrumb navigation**: Enhanced navigation context

### Advanced Features
- **Customizable header**: User-configurable header layout
- **Quick actions**: Context-sensitive action buttons
- **Status indicators**: More detailed system status
- **Integration status**: External system connectivity

---

**Last Updated**: October 13, 2025  
**Version**: 1.0.0  
**Maintainer**: Development Team  
**File**: `src/components/custom/layout/header.jsx`
