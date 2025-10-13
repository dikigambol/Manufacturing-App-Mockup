# 🎯 Navigation Redesign - Manufacturing Dashboard

## Overview
Navigation telah diredesign agar lebih intuitif dengan pemisahan yang jelas antara line selection dan dashboard views per line.

---

## 🏗️ New Architecture

```
┌─────────────────────────────────────────────────┐
│           USER NAVIGATION FLOW                  │
└─────────────────────────────────────────────────┘
                      │
                      ▼
          ┌──────────────────┐
          │  Line Selection  │  ← /lines
          │  (All Lines)     │
          └────────┬─────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌──────────────┐      ┌──────────────┐
│   Line 1     │      │   Line 2     │
│  Dashboard   │      │  Dashboard   │
└──────────────┘      └──────────────┘
        │                     │
        ▼                     ▼
┌──────────────┐      ┌──────────────┐
│   Sidebar    │      │   Sidebar    │
│  (Line 1     │      │  (Line 2     │
│   Views)     │      │   Views)     │
└──────────────┘      └──────────────┘
```

---

## 📍 Line Selection Page (`/lines`)

### Purpose
Central hub untuk:
- **Memilih production line** yang ingin dimonitor
- **Melihat overview** semua production lines
- **Melihat statistics** overall production
- **Access** ke dashboard spesifik per line

### Features
✅ **Production Overview Stats**
- Total Production (units today)
- Overall OEE (efficiency)
- Active Machines (running/total)
- Quality Rate (percentage)

✅ **Line Cards**
- Line 1 - Engine Assembly (Running, 92% efficiency, 8 machines)
- Line 2 - Quality Control (Idle, 87% efficiency, 6 machines)
- Line 3 - Packaging (Maintenance, 0% efficiency, 4 machines)

✅ **Quick Actions**
- Direct access to line dashboard
- Status indicators (running/idle/maintenance)
- Real-time updates

### Navigation
- **From**: Welcome → Login → Lines
- **To**: Line Dashboard (click "Access Dashboard")

---

## 🏭 Line Dashboard (`/dashboard/:lineId`)

### Purpose
Dashboard spesifik untuk **1 production line** dengan:
- Real-time monitoring
- Customizable widgets
- Line-specific analytics
- Machine status

### URL Structure
```
/dashboard/line_1  → Engine Assembly Line 1
/dashboard/line_2  → Quality Control Line 2
/dashboard/line_3  → Packaging Line 3
```

### Components

#### **Header Features:**
1. **Back to Lines Button** (kiri)
   - Navigate kembali ke line selection
   - Always visible when on line dashboard
   
2. **Line Switcher Dropdown** (kiri tengah)
   - Quick switch antar lines
   - Shows current line dengan status indicator
   - Color-coded (green/yellow/blue)
   
3. **Page Title** (tengah)
   - Dynamic title based on current line
   - Line description
   
4. **Status Badges** (kanan)
   - Online/Offline status
   - System Active indicator

5. **Action Buttons** (kanan)
   - Notifications (with counter)
   - Settings
   - Save layout
   - User profile

#### **Sidebar Menu (Line-Specific):**

**Section 1: Dashboard**
- Overview
- Production Monitoring
- Machine Status

**Section 2: Analytics**
- Quality Control
- Material & Inventory
- Maintenance
- Energy & Efficiency
- Operator Performance

**Section 3: Management**
- Data Resources
- Settings

### Key Points
✅ **1 Sidebar = 1 Line** - Sidebar fokus ke views dalam line yang sedang aktif
✅ **Switching Lines** - Via header dropdown, bukan sidebar
✅ **Navigation** - Sidebar untuk analytical views, header untuk line switching

---

## 🔄 Navigation Flow Examples

### Scenario 1: Monitor Specific Line
```
User → Login
     → /lines (Select Line 1)
     → /dashboard/line_1
     → Sidebar shows: Overview, Production, Machines, QC, etc.
     → All views are for Line 1 only
     → To switch to Line 2: Use header dropdown
```

### Scenario 2: Switch Between Lines
```
User on Line 1 Dashboard
     → Click header dropdown
     → Select "Line 2 - Quality Control"
     → Navigate to /dashboard/line_2
     → Sidebar updates to Line 2 views
     → Header shows Line 2 title
```

### Scenario 3: Return to Line Selection
```
User on Line 1 Dashboard
     → Click "Back to Lines" button
     → Navigate to /lines
     → See all lines overview
     → Can select different line
```

### Scenario 4: View Different Analytics
```
User on Line 1 Dashboard → Overview
     → Click sidebar "Quality Control"
     → Navigate to /dashboard/qc
     → View QC analytics for Line 1
     → Sidebar still shows Line 1 views
```

---

## 📊 URL Structure Comparison

### Before (Berantakan)
```
/                    → Dashboard (unclear which line)
/inf-prod           → Production info (unclear which line)
/mon-line           → Monitoring (unclear which line)
/qc                 → Quality Control (unclear which line)
```
❌ Problem: No clear line context

### After (Terstruktur)
```
/lines                     → Line selection (overview all lines)
/dashboard/line_1          → Line 1 specific dashboard
/dashboard/line_2          → Line 2 specific dashboard
/dashboard/overview        → Dashboard overview view
/dashboard/production      → Production monitoring view
/dashboard/qc              → Quality control view
```
✅ Solution: Clear line context in URL

---

## 🎨 UI Components

### Header Components (Line Dashboard)

```
┌─────────────────────────────────────────────────────────────┐
│ [☰] [← Back to Lines] [🏭 Line 1 ▼] Manufacturing Dashboard │
│                                            [🔔3] [⚙] [💾] [👤]│
└─────────────────────────────────────────────────────────────┘
  │      │                │                              │
  │      │                │                              └─ User Actions
  │      │                └─ Line Switcher Dropdown
  │      └─ Back Navigation
  └─ Sidebar Toggle
```

### Sidebar Structure (Line Dashboard)

```
┌─────────────────────────┐
│ Manufacturing Co.       │
│ Production Manager      │
├─────────────────────────┤
│ 📊 Dashboard            │
│  ├ Overview             │
│  ├ Production Monitoring│
│  └ Machine Status       │
├─────────────────────────┤
│ 📈 Analytics            │
│  ├ Quality Control      │
│  ├ Material & Inventory │
│  ├ Maintenance          │
│  ├ Energy & Efficiency  │
│  └ Operator Performance │
├─────────────────────────┤
│ ⚙️ Management           │
│  ├ Data Resources       │
│  └ Settings             │
└─────────────────────────┘
```

---

## 💡 Design Decisions

### Why Line Switcher in Header?
1. **Context Clarity** - User always knows which line they're viewing
2. **Quick Access** - One click to switch lines
3. **Visual Hierarchy** - Primary navigation in header
4. **Sidebar Focus** - Sidebar dedicated to analytical views

### Why No Line Links in Sidebar?
1. **Avoid Confusion** - Sidebar is for views within current line
2. **Clear Separation** - Line selection vs view selection
3. **Better UX** - Users don't accidentally switch lines
4. **Scalability** - Easy to add more views per line

### Why Production Info in Line Selection?
1. **Overview First** - See all lines before diving in
2. **Decision Making** - Help users choose which line to monitor
3. **Aggregated Data** - Overall production metrics
4. **Better Flow** - Natural progression from overview to detail

---

## 🚀 Implementation Details

### Line Switcher Component (in Header)

**When to Show:**
- Only on `/dashboard/line_1`, `/dashboard/line_2`, `/dashboard/line_3`
- Not on dashboard views (`/dashboard/overview`, etc.)
- Not on management pages

**Features:**
- Dropdown select with 3 options
- Status indicators (colored dots)
- Current line highlighted
- onClick navigates to selected line

**Code:**
```javascript
{location.pathname.startsWith('/dashboard/') && 
 lineId && 
 ['line_1', 'line_2', 'line_3'].includes(lineId) && (
    <Select value={lineId} onValueChange={(value) => navigate(`/dashboard/${value}`)}>
      {/* Line options */}
    </Select>
)}
```

### Back Button Component (in Header)

**When to Show:**
- Only on `/dashboard/:lineId` routes
- Not on other pages

**Features:**
- Outlined button style
- Blue accent color
- Arrow icon
- Clear label "Back to Lines"

**Code:**
```javascript
{location.pathname.startsWith('/dashboard/') && lineId && (
    <Button onClick={() => navigate("/lines")}>
      <ArrowLeft /> Back to Lines
    </Button>
)}
```

---

## 📋 Sidebar Menu Structure

### Dashboard Section
**Purpose**: Main views untuk line monitoring

| Menu Item | URL | Dashboard ID | Use Case |
|-----------|-----|--------------|----------|
| Overview | `/dashboard/overview` | 1 | High-level metrics |
| Production Monitoring | `/dashboard/production` | 2 | Production details |
| Machine Status | `/dashboard/machines` | 3 | Machine health |

### Analytics Section
**Purpose**: Detailed analytical views

| Menu Item | URL | Dashboard ID | Use Case |
|-----------|-----|--------------|----------|
| Quality Control | `/dashboard/qc` | 4 | Quality metrics |
| Material & Inventory | `/dashboard/inventory` | 5 | Inventory tracking |
| Maintenance | `/dashboard/maintenance` | 6 | Maintenance schedule |
| Energy & Efficiency | `/dashboard/energy` | 7 | Energy consumption |
| Operator Performance | `/dashboard/operators` | 8 | Operator metrics |

### Management Section
**Purpose**: System configuration

| Menu Item | URL | Use Case |
|-----------|-----|----------|
| Data Resources | `/data-resources` | Upload & manage data |
| Settings | `/settings` | System configuration |

---

## 🎯 Benefits

### User Experience
✅ **Clear Context** - Always know which line you're viewing
✅ **Easy Switching** - Quick line switcher in header
✅ **Organized** - Sidebar focused on analytical views
✅ **Intuitive** - Natural flow from selection to detail

### Technical
✅ **Maintainable** - Clear separation of concerns
✅ **Scalable** - Easy to add new lines or views
✅ **Consistent** - Same sidebar structure across all lines
✅ **Flexible** - Dashboard views can be customized per line

### Business
✅ **Efficiency** - Faster navigation
✅ **Productivity** - Less clicks to access data
✅ **Insights** - Better data organization
✅ **Monitoring** - Focused line monitoring

---

## 🔄 Migration Guide

### From Old Structure
```
Sidebar had:
- All Lines
- Line 1, Line 2, Line 3
- Mixed views
```

### To New Structure
```
Header has:
- Line Switcher Dropdown (when on line dashboard)
- Back to Lines Button

Sidebar has:
- Dashboard views (Overview, Production, Machines)
- Analytics views (QC, Inventory, Maintenance, etc.)
- Management (Data Resources, Settings)
```

---

## 📱 Responsive Behavior

### Desktop
- Full header with all components
- Line switcher dropdown visible
- Sidebar expanded by default

### Tablet
- Compact header
- Line switcher smaller
- Sidebar collapsible

### Mobile
- Minimal header
- Line switcher dropdown
- Sidebar as overlay menu

---

## 🎨 Visual Design

### Header Line Switcher
- **Width**: 224px (w-56)
- **Border**: Blue accent
- **Icon**: Factory icon
- **Status Dots**: Green (running), Yellow (idle), Blue (maintenance)
- **Hover**: Light blue background

### Back Button
- **Style**: Outlined button
- **Color**: Blue accent
- **Size**: Small
- **Icon**: Arrow left
- **Text**: "Back to Lines"

---

## 🚀 Next Steps

### Immediate
- [x] Update sidebar structure
- [x] Add line switcher to header
- [x] Add back button to header
- [x] Update routing
- [x] Enhance line selection page

### Short-term
- [ ] Add line status badges in header
- [ ] Add notifications per line
- [ ] Add line-specific settings
- [ ] Add recent activity per line

### Long-term
- [ ] Multi-line comparison view
- [ ] Line performance reports
- [ ] Line-specific alerts
- [ ] Custom dashboard layouts per line

---

**Last Updated**: October 11, 2025  
**Version**: 3.0.0  
**Status**: Implemented ✅

