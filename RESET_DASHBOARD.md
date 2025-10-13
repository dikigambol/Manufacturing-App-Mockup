# 🔄 Reset Dashboard Guide

## Problem
Setelah update default dashboard untuk Line 3, localStorage masih menyimpan data lama yang kosong.

## Quick Fix

### Option 1: Clear Browser Storage (Recommended)

**Via Browser Console:**
```javascript
// Clear all dashboard data
localStorage.clear();
// Reload page
window.location.reload();
```

**Via DevTools:**
1. Open Chrome DevTools (F12)
2. Go to "Application" tab
3. Click "Local Storage" → `http://localhost:5173`
4. Right click → "Clear"
5. Refresh page

### Option 2: Update Specific Dashboard

**Via Browser Console:**
```javascript
// Get current dashboard list
let dashboards = JSON.parse(localStorage.getItem('dashboard_list'));

// Check Line 3 (id_dash: 3)
console.log('Line 3:', dashboards.find(d => d.id_dash === 3));

// If Line 3 is empty, clear all and reload
if (dashboards.find(d => d.id_dash === 3)?.component.length === 0) {
  localStorage.removeItem('hasVisited');
  window.location.reload();
}
```

### Option 3: Force Reinitialize

**Via Browser Console:**
```javascript
// Remove first visit flag
localStorage.removeItem('hasVisited');

// Reload - this will reinitialize with default data
window.location.reload();
```

## Verification

After reset, check:

### Line 1 (/dashboard/line_1)
Should have:
- ✅ OEE Test (Gauge)
- ✅ Target Test (KPI Card)
- ✅ Versus Test (Bar Chart)
- ✅ Cycle Time Test (Area Chart)
- ✅ Stat Test (Stat Card)
- ✅ Datatable Test
- ✅ Pie Test

### Line 2 (/dashboard/line_2)
Should have:
- ✅ Cycle Time (Area Chart)
- ✅ OEE (Gauge)
- ✅ Comparation Production & Rejected Engines (Bar)
- ✅ Actual Production (Bar)
- ✅ Gap Target & Actual (Stat Card)
- ✅ Production Target (KPI Card)

### Line 3 (/dashboard/line_3) - NEW!
Should have:
- ✅ OEE Monitoring (Gauge)
- ✅ Production Target (KPI Card)
- ✅ Production vs Reject (Bar Chart)
- ✅ Cycle Time Trend (Area Chart)

## Default Widget Layout

Each line now has a consistent default layout:
- Left column: OEE Gauge (tall)
- Middle column: KPI Cards + Bar Charts
- Right column: Trend charts (Area/Line)

## Testing Steps

1. **Clear localStorage** (Option 1)
2. **Refresh browser** (Ctrl+R or F5)
3. **Login** with "Admin"
4. **Go to /lines** → See all 3 lines
5. **Click Line 1** → Should see default widgets
6. **Switch to Line 2** (via header dropdown) → Different widgets
7. **Switch to Line 3** → Should see new default widgets!

## Automated Reset (Future Enhancement)

You can add a "Reset Dashboard" button in settings:

```javascript
// components/ResetButton.jsx
const handleReset = () => {
  if (confirm('Reset all dashboards to default? This cannot be undone.')) {
    localStorage.removeItem('dashboard_list');
    localStorage.removeItem('hasVisited');
    window.location.reload();
  }
};
```

---

**Note:** After clearing localStorage, all custom configurations will be lost. Make sure to export/backup if needed.

