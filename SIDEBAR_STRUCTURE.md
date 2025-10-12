# 📋 Sidebar Navigation Structure

## Overview
Sidebar telah direorganisasi untuk memberikan navigasi yang lebih intuitif dan terstruktur sesuai dengan flow multi-line production dashboard.

---

## 🗂️ New Sidebar Structure

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

---

## ⚙️ Section 3: Management

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

### Group 3: Management (Utility Navigation)
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

### Scenario 3: Data Management
```
User → Login
     → Click "Data Resources" from sidebar
     → Upload new data sources
     → Manage existing data
     → Return to dashboard
```

---

## 🎯 Benefits of New Structure

### 1. Clear Hierarchy
- Primary focus on production lines
- Secondary analytical views
- Tertiary management functions

### 2. Logical Grouping
- Related items grouped together
- Clear section titles
- Intuitive organization

### 3. Scalable
- Easy to add new lines
- Easy to add new views
- Easy to add new management tools

### 4. User-Friendly
- Less scrolling to find items
- Visual separation of concerns
- Quick access to frequently used items

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

### Removing Unused Items
Simply comment out or remove the item from `sidebar-data.js` `navGroups` array.

---

## 📱 Responsive Behavior

### Desktop (≥ 1024px)
- Sidebar expanded by default
- All menu text visible
- Icons + text labels
- Collapsible to icon-only mode

### Tablet (768px - 1023px)
- Sidebar auto-collapsed
- Icon-only mode by default
- Tooltip on hover
- Expandable on toggle

### Mobile (< 768px)
- Sidebar hidden by default
- Hamburger menu to open
- Full overlay when open
- Close on item click

---

## 🎨 Styling Guidelines

### Active State
- Highlighted background
- Blue accent color
- Bolder font weight
- Subtle animation

### Hover State
- Light background
- Smooth transition
- Icon color change
- Scale animation (optional)

### Disabled State
- Grayed out
- Not clickable
- Tooltip explains why
- Visual feedback

---

## 🔍 Search & Quick Navigation

### Command Palette (Ctrl/Cmd + K)
All sidebar items are searchable via command palette:
- Type to search
- Keyboard navigation
- Quick access to any page
- Recent items prioritized

---

## 📊 Analytics & Tracking

### User Navigation Patterns
Consider tracking:
- Most visited pages
- Average time per page
- Navigation path analysis
- Feature usage statistics

### Future Enhancements
- Recent/Favorite items section
- Personalized sidebar order
- Pinned items
- Custom shortcuts

---

**Last Updated**: October 11, 2025  
**Version**: 2.0.0  
**Maintainer**: Development Team

