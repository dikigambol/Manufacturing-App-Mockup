# 📋 Sidebar Navigation Structure

## Overview
Sidebar telah direorganisasi untuk memberikan navigasi yang lebih intuitif dan terstruktur sesuai dengan flow multi-line production dashboard. Sistem ini telah berkembang menjadi **Complete Manufacturing System** dengan fitur-fitur advanced yang telah diimplementasi.

---

## 🗂️ Complete Sidebar Structure

```
┌─────────────────────────────────────┐
│  Manufacturing Co.                  │
│  Production Manager                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📍 Production Lines                │
│  ├── All Lines                      │ → /lines
│  ├── Line 1 - Engine Assembly       │ → /dashboard/line_1
│  ├── Line 2 - Quality Control       │ → /dashboard/line_2
│  └── Line 3 - Packaging             │ → /dashboard/line_3
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📊 Dashboard Views                 │
│  ├── Production Info                │ → /inf-prod
│  ├── Line Monitoring                │ → /mon-line
│  ├── Quality Control                │ → /qc
│  ├── Material & Inventory           │ → /mater-inv
│  ├── Maintenance                    │ → /mainten
│  ├── Safety & Compliance            │ → /saf-comp
│  ├── Energy & Efficiency            │ → /enrg-effcy
│  └── Operator Performance           │ → /opp-perf
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🗃️ Master Data                     │
│  ├── Access Levels                  │ → /master-data/access-level
│  ├── Users                          │ → /master-data/users
│  ├── Machines                       │ → /master-data/machines
│  └── Spareparts                     │ → /master-data/spareparts
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🏭 Manufacturing Systems            │
│  ├── Andon System                   │ → /andon/list
│  ├── Maintenance                    │ → /maintenance/list
│  └── Traceability                   │ → /traceability/list
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🎨 Advanced Tools                  │
│  ├── Layout Designer                │ → /layout-designer
│  └── Machine Detail                 │ → /machines/:id
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  ⚙️ Management                      │
│  ├── Data Resources                 │ → /data-resources
│  └── Settings                       │ → /settings
└─────────────────────────────────────┘
```

---

## 📍 Section 1: Production Lines

**Purpose**: Quick navigation between production lines

| Menu Item | URL | Dashboard ID | Icon | Description |
|-----------|-----|--------------|------|-------------|
| All Lines | `/lines` | - | Factory | Line selection overview |
| Line 1 - Engine Assembly | `/dashboard/line_1` | 1 | BarChart3 | Main engine assembly line |
| Line 2 - Quality Control | `/dashboard/line_2` | 2 | Shield | Quality control line |
| Line 3 - Packaging | `/dashboard/line_3` | 3 | Package | Packaging line |

**Features**:
- Direct access to specific production lines
- Each line has its own dashboard configuration
- Line-specific widgets and layouts
- Independent data per line

---

## 📊 Section 2: Dashboard Views

**Purpose**: Different analytical views across all lines

| Menu Item | URL | Dashboard ID | Icon | Description |
|-----------|-----|--------------|------|-------------|
| Production Info | `/inf-prod` | 4 | Factory | Production information overview |
| Line Monitoring | `/mon-line` | 5 | TrendingUp | Real-time line monitoring |
| Quality Control | `/qc` | 6 | Shield | Quality control metrics |
| Material & Inventory | `/mater-inv` | 7 | Package | Material and inventory tracking |
| Maintenance | `/mainten` | 8 | Wrench | Maintenance schedules |
| Safety & Compliance | `/saf-comp` | 9 | Shield | Safety compliance tracking |
| Energy & Efficiency | `/enrg-effcy` | 10 | Zap | Energy efficiency metrics |
| Operator Performance | `/opp-perf` | 11 | Users | Operator performance analytics |

**Features**:
- Cross-line analytics
- Customizable dashboard layouts
- Different perspectives on production data
- Historical data visualization
- **NEW**: Enhanced widgets with OEE monitoring, Machine Layout widgets

---

## 🗃️ Section 3: Master Data

**Purpose**: Manage manufacturing master data (complete system)

| Menu Item | URL | Icon | Description |
|-----------|-----|------|-------------|
| Access Levels | `/master-data/access-level` | Shield | Manage user access levels and permissions |
| Users | `/master-data/users` | Users | User management and role assignment |
| Machines | `/master-data/machines` | Cog | Manage machine/engine master data |
| Spareparts | `/master-data/spareparts` | Wrench | Manage spareparts inventory |

**Features**:
- **Access Level Management**: Role-based access control (Admin, Technician, Operator)
- **User Management**: Complete user administration with different roles
- **Machine Management**: Add/Edit/Delete machines with specifications
- **Sparepart Management**: Inventory tracking and machine compatibility
- **Image Upload**: Machine and sparepart image management
- **Search & Filter**: Advanced search and filtering capabilities
- **CRUD Operations**: Full Create, Read, Update, Delete functionality

**Data Fields**:

**Access Levels**:
- Access Level ID (unique identifier)
- Name (Admin, Technician, Operator)
- Description
- Permissions (array of allowed actions)
- Created Date
- Updated Date

**Users**:
- User ID (unique identifier)
- Username
- Full Name
- Email
- Access Level ID (foreign key)
- Status (Active/Inactive)
- Created Date
- Last Login

**Machines**:
- Machine ID (unique identifier)
- Name
- Asset Number
- Acquisition Year
- Machine Type
- Specifications
- Status (Active/Inactive/Maintenance)
- Image
- **NEW**: Real-time status integration
- **NEW**: Performance metrics (OEE, MTTR, MTBF)

**Spareparts**:
- Part Number (unique identifier)
- Part Name
- Specification
- Brand
- Type
- Stock quantity
- Image
- Machine Compatibility (array of machine IDs)
- **NEW**: Reorder level tracking
- **NEW**: Usage history

---

## 🏭 Section 4: Manufacturing Systems

**Purpose**: Complete manufacturing workflow management

| Menu Item | URL | Icon | Description |
|-----------|-----|------|-------------|
| Andon System | `/andon/list` | AlertTriangle | Real-time issue reporting and response tracking |
| Maintenance | `/maintenance/list` | Wrench | Comprehensive maintenance ticket management |
| Traceability | `/traceability/list` | Search | Complete machine history and root cause analysis |

**Features**:
- **Andon System**: Real-time issue reporting, technician response tracking, MTTR calculation
- **Maintenance System**: Preventive and corrective maintenance, sparepart tracking, scheduling
- **Traceability System**: Complete machine history, root cause analysis, performance tracking
- **Integration**: All systems integrated with Master Data and Dashboard systems

---

## 🎨 Section 5: Advanced Tools

**Purpose**: Advanced manufacturing configuration and monitoring tools

| Menu Item | URL | Icon | Description |
|-----------|-----|------|-------------|
| Layout Designer | `/layout-designer` | Layout | Visual machine layout configuration with React Flow |
| Machine Detail | `/machines/:id` | Monitor | Individual machine monitoring and analysis |

**Features**:
- **Machine Layout Designer**: 
  - Drag & Drop visual configuration dengan React Flow
  - Machine Palette dengan search & filter
  - Template Management (pre-defined & custom layouts)
  - Properties Panel untuk node & edge configuration
  - Line-specific layout storage
  - Undo/Redo functionality
  - Export/Import JSON templates

- **Machine Detail Page**:
  - 3-column layout (Description, Information, Charts)
  - MTTR/MTBF Bar Charts dengan time range selector
  - Performance Donut Chart (status distribution)
  - Maintenance History List
  - Full-width Gantt Chart (24h timeline dengan S1-S2-S3 shifts)
  - Shift visualization dengan status colors
  - Real-time machine status integration

---

## ⚙️ Section 6: Management

**Purpose**: System configuration and data management

| Menu Item | URL | Icon | Description |
|-----------|-----|------|-------------|
| Data Resources | `/data-resources` | Database | Upload and manage data sources |
| Settings | `/settings` | Settings | System and user settings |

**Features**:
- Upload JSON data sources
- Configure system settings
- Manage user preferences
- Data source management

---

## 🎯 Navigation Logic

### For Line-Specific Dashboards
When user clicks on a production line:
1. Navigate to `/dashboard/:lineId`
2. Set active line in context
3. Load line-specific dashboard layout
4. Show line name in header
5. Display "Back to Lines" button

### For Dashboard Views
When user clicks on a dashboard view:
1. Navigate to specific view URL (e.g., `/inf-prod`)
2. Load view-specific dashboard configuration
3. Show view name in header
4. Use shared dashboard infrastructure

### For Master Data Pages
When user clicks on master data items:
1. Navigate to master data page
2. Show table-based UI with search and CRUD operations
3. No dashboard grid (custom page layout)
4. Display appropriate form modals for Add/Edit

### For Manufacturing Systems
When user clicks on manufacturing system items:
1. Navigate to system-specific page
2. Show workflow-specific UI (Andon, Maintenance, Traceability)
3. **NEW**: Real-time data integration
4. **NEW**: Workflow status tracking

### For Advanced Tools
When user clicks on advanced tools:
1. **Layout Designer**: Navigate to `/layout-designer` (full-screen, no sidebar)
2. **Machine Detail**: Navigate to `/machines/:id` (full-screen, no sidebar)
3. **NEW**: Full-screen mode untuk advanced tools
4. **NEW**: Context-aware navigation

### For Management Pages
When user clicks on management items:
1. Navigate to management page
2. Show appropriate UI (data upload, settings, etc.)
3. No dashboard grid (custom page layout)

---

## 🔄 Dashboard ID Mapping

| Dashboard ID | Type | Associated With |
|--------------|------|-----------------|
| 1 | Line Dashboard | Line 1 - Engine Assembly |
| 2 | Line Dashboard | Line 2 - Quality Control |
| 3 | Line Dashboard | Line 3 - Packaging |
| 4 | Dashboard View | Production Info |
| 5 | Dashboard View | Line Monitoring |
| 6 | Dashboard View | Quality Control |
| 7 | Dashboard View | Material & Inventory |
| 8 | Dashboard View | Maintenance |
| 9 | Dashboard View | Safety & Compliance |
| 10 | Dashboard View | Energy & Efficiency |
| 11 | Dashboard View | Operator Performance |

**NEW**: Dashboard IDs 4-11 are now fully implemented with cross-line analytics

---

## 💾 Data Storage

Each dashboard ID has its own storage in `localStorage`:
```javascript
{
  "dashboard_list": [
    {
      "id_dash": 1,
      "component": [...],  // Widgets for Line 1
      "layout": [...]      // Grid layout for Line 1
    },
    {
      "id_dash": 2,
      "component": [...],  // Widgets for Line 2
      "layout": [...]      // Grid layout for Line 2
    },
    // ... up to id_dash: 11
  ]
}
```

**NEW**: Additional storage for advanced features:
```javascript
{
  "layout_templates": [...],  // Machine layout templates
  "machine_status": {...},    // Real-time machine status
  "user_sessions": {...},     // User authentication data
  "system_config": {...}      // System configuration
}
```

---

## 🎨 Visual Organization

### Group 1: Production Lines (Primary Navigation)
- **Color Theme**: Blue
- **Icon Style**: Outlined, modern
- **Use Case**: Quick line switching
- **Badge**: Shows line status (Running/Idle/Maintenance)

### Group 2: Dashboard Views (Secondary Navigation)
- **Color Theme**: Mixed (based on function)
- **Icon Style**: Filled, professional
- **Use Case**: Different analytical perspectives
- **Badge**: Can show data availability

### Group 3: Master Data (Foundation Navigation)
- **Color Theme**: Green
- **Icon Style**: Solid, professional
- **Use Case**: Data management foundation
- **Badge**: Shows data count or status

### Group 4: Manufacturing Systems (Operational Navigation)
- **Color Theme**: Orange
- **Icon Style**: Filled, operational
- **Use Case**: Manufacturing workflows
- **Badge**: Shows active tickets or alerts

### Group 5: Advanced Tools (Expert Navigation)
- **Color Theme**: Purple
- **Icon Style**: Modern, advanced
- **Use Case**: Expert configuration and monitoring
- **Badge**: Shows tool status or notifications

### Group 6: Management (Utility Navigation)
- **Color Theme**: Gray/Neutral
- **Icon Style**: Simple, clean
- **Use Case**: System configuration
- **Badge**: Can show notification counts

---

## 🚀 User Experience Flow

### Scenario 1: Line-Focused Monitoring
```
User → Login
     → Select "Line 1 - Engine Assembly" from sidebar
     → View Line 1 dashboard
     → Can switch to Line 2 or 3 via sidebar
     → Or click "Back to Lines" to see all lines
```

### Scenario 2: Cross-Line Analytics
```
User → Login
     → Click "Production Info" from sidebar
     → View production metrics across all lines
     → Click "Quality Control" for QC view
     → Switch between different analytical views
```

### Scenario 3: Master Data Management
```
User → Login
     → Click "Machines" from sidebar
     → View all machines in table format
     → Click "Add" to create new machine
     → Fill machine details and upload image
     → Save machine to master data
     → Navigate to "Spareparts"
     → Link spareparts to machines
     → Return to dashboard
```

### Scenario 4: Line Configuration
```
User → Login
     → Navigate to Line Selection page
     → Click "Configure" button on Line 1
     → Open Line Configuration Modal
     → Tab 1: Drag machines from Master Data to layout
     → Tab 2: Configure dashboard widgets
     → Tab 3: Set line parameters
     → Save configuration
     → View configured dashboard
```

### Scenario 5: Layout Configuration
```
User → Login
     → Click "Layout Designer" from sidebar
     → Open full-screen layout designer
     → Drag machines from palette to canvas
     → Connect machines with edges
     → Configure machine properties
     → Save as template
     → Use template in dashboard widget
```

### Scenario 6: Manufacturing Workflow
```
User → Login
     → Click "Andon System" from sidebar
     → View active issues and tickets
     → Create new issue ticket
     → Assign to technician
     → Track resolution progress
     → Close ticket when resolved
```

### Scenario 7: Machine Analysis
```
User → Login
     → Navigate to Line 1 dashboard
     → Click on specific machine
     → Open Machine Detail Page
     → Review MTTR/MTBF charts
     → Check maintenance history
     → Analyze Gantt chart for patterns
     → Plan preventive maintenance
```

### Scenario 8: Data Management
```
User → Login
     → Click "Data Resources" from sidebar
     → Upload new data sources
     → Manage existing data
     → Return to dashboard
```

---

## 🎯 Benefits of Complete Structure

### 1. Clear Hierarchy
- Primary focus on production lines
- Secondary analytical views
- Tertiary management functions
- **NEW**: Advanced tools for expert users
- **NEW**: Complete manufacturing workflow support

### 2. Logical Grouping
- Related items grouped together
- Clear section titles
- Intuitive organization
- Master Data separated from operational views
- **NEW**: Manufacturing systems grouped together
- **NEW**: Advanced tools in dedicated section

### 3. Scalable
- Easy to add new lines
- Easy to add new views
- Easy to add new management tools
- Master Data system supports unlimited machines and spareparts
- **NEW**: Template system for layouts
- **NEW**: Modular system architecture

### 4. User-Friendly
- Less scrolling to find items
- Visual separation of concerns
- Quick access to frequently used items
- Master Data accessible from sidebar for quick management
- **NEW**: Role-based access control
- **NEW**: Context-aware navigation

### 5. Manufacturing-Focused
- Master Data foundation for all operations
- Engine-to-sparepart relationship tracking
- Line configuration based on master data
- Complete manufacturing workflow support
- **NEW**: Real-time monitoring and control
- **NEW**: Advanced analytics and reporting

---

## 🔧 Customization Options

### Adding New Production Line
```javascript
// In sidebar-data.js
{
  title: 'Line 4 - Testing',
  url: '/dashboard/line_4',
  id_dash: 12,
  icon: IconName,
}

// In constants.js
{
  "id_dash": 12,
  "component": [],
  "layout": []
}
```

### Adding New Dashboard View
```javascript
// In sidebar-data.js under "Dashboard Views"
{
  title: 'New View Name',
  url: '/new-view',
  id_dash: 13,
  icon: IconName,
}

// In app.jsx
<Route path="/new-view" element={<Home />} />

// In constants.js
{
  "id_dash": 13,
  "component": [],
  "layout": []
}
```

### Adding New Manufacturing System
```javascript
// In sidebar-data.js under "Manufacturing Systems"
{
  title: 'New System',
  url: '/new-system',
  icon: IconName,
}

// In app.jsx
<Route path="/new-system" element={<NewSystemPage />} />
```

### Adding New Advanced Tool
```javascript
// In sidebar-data.js under "Advanced Tools"
{
  title: 'New Tool',
  url: '/new-tool',
  icon: IconName,
}

// In app.jsx
<Route path="/new-tool" element={<NewToolPage />} />
```

### Removing Unused Items
Simply comment out or remove the item from `sidebar-data.js` `navGroups` array.

---

## 📱 Responsive Behavior

### Desktop (≥ 1024px)
- Sidebar expanded by default
- All menu text visible
- Icons + text labels
- Collapsible to icon-only mode
- **NEW**: Advanced tools in full-screen mode

### Tablet (768px - 1023px)
- Sidebar auto-collapsed
- Icon-only mode by default
- Tooltip on hover
- Expandable on toggle
- **NEW**: Touch-friendly navigation

### Mobile (< 768px)
- Sidebar hidden by default
- Hamburger menu to open
- Full overlay when open
- Close on item click
- **NEW**: Mobile-optimized advanced tools

---

## 🎨 Styling Guidelines

### Active State
- Highlighted background
- Blue accent color
- Bolder font weight
- Subtle animation
- **NEW**: Section-specific accent colors

### Hover State
- Light background
- Smooth transition
- Icon color change
- Scale animation (optional)
- **NEW**: Context-aware hover effects

### Disabled State
- Grayed out
- Not clickable
- Tooltip explains why
- Visual feedback
- **NEW**: Role-based access indicators

---

## 🔍 Search & Quick Navigation

### Command Palette (Ctrl/Cmd + K)
All sidebar items are searchable via command palette:
- Type to search
- Keyboard navigation
- Quick access to any page
- Recent items prioritized
- **NEW**: Advanced tool shortcuts
- **NEW**: Machine-specific navigation

---

## 📊 Analytics & Tracking

### User Navigation Patterns
Consider tracking:
- Most visited pages
- Average time per page
- Navigation path analysis
- Feature usage statistics
- **NEW**: Advanced tool usage
- **NEW**: Manufacturing workflow efficiency

### Future Enhancements
- Recent/Favorite items section
- Personalized sidebar order
- Pinned items
- Custom shortcuts
- **NEW**: Role-based sidebar customization
- **NEW**: Workflow-based navigation

---

## 🚀 Advanced Features

### Machine Layout Designer Integration
- **Visual Configuration**: Drag & Drop machine layout dengan React Flow
- **Template Management**: Pre-defined dan custom templates
- **Line-specific Storage**: Setiap line memiliki layout independen
- **Real-time Integration**: Live machine status overlay
- **Export/Import**: JSON template sharing

### Machine Detail Page Integration
- **Comprehensive Monitoring**: 3-column layout dengan charts
- **Performance Analytics**: MTTR/MTBF tracking
- **Gantt Chart**: 24-hour timeline dengan shift visualization
- **Maintenance History**: Complete tracking dan analysis
- **Real-time Status**: Live machine data integration

### Manufacturing System Integration
- **Andon System**: Real-time issue reporting dan response
- **Maintenance System**: Comprehensive ticket management
- **Traceability System**: Complete machine history tracking
- **Workflow Integration**: Seamless system integration

---

**Last Updated**: October 13, 2025  
**Version**: 3.0.0  
**Maintainer**: Development Team  
**Recent Updates**:
- ✅ Complete Manufacturing System integration
- ✅ Machine Layout Designer system
- ✅ Machine Detail Page system
- ✅ Advanced manufacturing workflows
- ✅ Role-based access control
- ✅ Real-time monitoring capabilities

