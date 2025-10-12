# ⚡ Quick Reference Guide - Manufacturing App

> Panduan cepat untuk developer yang bekerja dengan Manufacturing App

---

## 🚀 Quick Start Commands

```bash
# Development
npm run dev                 # Start dev server (localhost:5173)
npm run build              # Build for production
npm run preview            # Preview production build
npm run lint               # Run ESLint

# Git
git pull origin main       # Update from remote
git checkout -b feature/x  # Create new branch
git add .                  # Stage changes
git commit -m "message"    # Commit changes
git push origin feature/x  # Push to remote
```

---

## 📁 File Structure at a Glance

```
src/
├── app.jsx              → Router & Context setup
├── main.jsx             → Entry point
├── components/
│   ├── custom/app/      → Widget, Card, Datatable
│   ├── custom/layout/   → Sidebar, Header, Nav
│   └── ui/              → Radix UI components
├── contexts/            → State management
│   ├── interact.jsx     → Layout & Dashboard state
│   ├── source.jsx       → Data sources
│   ├── sheet.jsx        → Configuration panel
│   └── thems.jsx        → Dark/Light mode
├── pages/
│   ├── dashbaord/home   → Main dashboard view
│   └── data-resources/  → Data management
├── layouts/
│   ├── container.jsx    → Grid layout wrapper
│   └── dashbaord.jsx    → Dashboard layout
└── utils/               → Helper functions
```

---

## 🎯 Common Tasks

### 1. Add New Dashboard

**Step 1**: Add route in `app.jsx`
```javascript
<Route path="/new-dashboard" element={<Home />} />
```

**Step 2**: Add menu in `components/data/sidebar-data.js`
```javascript
{
  title: 'New Dashboard',
  url: '/new-dashboard',
  id_dash: 10,  // Unique number
  icon: IconDashboard,
}
```

**Step 3**: Add default in `utils/constant.js`
```javascript
{
  id_dash: 10,
  component: [],
  layout: []
}
```

---

### 2. Add New Widget Type

**Step 1**: Create component in `components/custom/app/`
```javascript
// MyNewWidget.jsx
export default function MyNewWidget({ data, config }) {
  return <div>My Widget</div>;
}
```

**Step 2**: Update `Widget.jsx`
```javascript
// Import
const MyNewWidget = lazy(() => import('./MyNewWidget'));

// Add in renderCard
if (item.props.chart_type == 'mynew') {
  return <MyNewWidget {...item.props} />
}
```

**Step 3**: Add to configuration in `Widget.jsx` (AppSheetChildren)
```javascript
<SelectItem value="mynew">My New Widget</SelectItem>
```

---

### 3. Add Data Source Programmatically

```javascript
import { local } from '@/utils/access';

// Your data
const data = [
  { date: '2025-01-01', value: 100 },
  { date: '2025-01-02', value: 150 }
];

// Create source
const newSource = {
  id: Date.now(),
  name: 'My Data',
  type: 'json',
  fileName: 'mydata.json',
  fileData: btoa(JSON.stringify(data))
};

// Save
const sources = local.get('dataSources') || [];
sources.push(newSource);
local.save('dataSources', sources);

// Trigger reload
window.dispatchEvent(new Event('dataSourcesUpdated'));
```

---

### 4. Debug Data Issues

```javascript
// Check localStorage in browser console
console.log('Dashboards:', JSON.parse(localStorage.getItem('dashboard_list')));
console.log('Data Sources:', JSON.parse(localStorage.getItem('dataSources')));

// Check context values in component
import { useContext } from 'react';
import { SourceContext } from '@/contexts/source';

const { sources } = useContext(SourceContext);
console.log('Available sources:', sources);

// Clear all data and reset
localStorage.clear();
window.location.reload();
```

---

### 5. Modify Widget Configuration

```javascript
// Get current dashboard
const dashboards = JSON.parse(localStorage.getItem('dashboard_list'));
const activeDash = dashboards.find(d => d.id_dash === 1);

// Modify widget props
activeDash.component[0].props = {
  ...activeDash.component[0].props,
  title: 'New Title',
  chart_type: 'bar'
};

// Save back
localStorage.setItem('dashboard_list', JSON.stringify(dashboards));
window.location.reload();
```

---

## 🎨 Styling Quick Reference

### Tailwind Classes Used

```javascript
// Layout
'flex', 'grid', 'grid-cols-1', 'gap-4'

// Spacing
'p-4', 'm-2', 'px-4', 'py-2', 'space-x-2'

// Colors
'bg-gray-100', 'text-gray-900', 'border-gray-300'

// Interactive
'hover:bg-gray-200', 'active:scale-95', 'transition-all'

// Sizing
'w-full', 'h-full', 'min-h-screen', 'max-w-7xl'

// Positioning
'relative', 'absolute', 'fixed', 'top-0', 'left-0'

// Effects
'shadow-md', 'rounded-lg', 'opacity-50', 'blur-sm'
```

### Custom CSS Variables

```css
/* In custom.css */
--chart-1: ...
--chart-2: ...
--chart-3: ...
```

---

## 🔧 Context API Cheatsheet

### LayoutContext

```javascript
import { useContext } from 'react';
import { LayoutContext } from '@/contexts/interact';

const {
  activeIdDash,        // Current dashboard ID
  layout,              // Grid layout array
  components,          // Widgets array
  setActiveIdDash,     // Switch dashboard
  updateLayout,        // Update grid
  updateComponent,     // Update widgets
  ensureDashboardExists // Create if not exists
} = useContext(LayoutContext);
```

### SourceContext

```javascript
import { SourceContext } from '@/contexts/source';

const {
  sources,             // All data sources
  getById,             // Get source by ID
  loadSources          // Reload from storage
} = useContext(SourceContext);
```

### SheetContext

```javascript
import { SheetContext } from '@/contexts/sheet';

const {
  isSheetOpen,         // Sheet visibility
  sheetProps,          // Sheet config
  sheetForm,           // Form values
  setSheetOpen,        // Toggle sheet
  setSheetProps,       // Set content
  setSheetFormValue    // Update form field
} = useContext(SheetContext);
```

### ThemeContext

```javascript
import { useTheme } from '@/contexts/thems';

const { theme, setTheme } = useTheme();
// theme: 'light' | 'dark' | 'system'
```

---

## 📊 Data Structure Reference

### Dashboard Object

```javascript
{
  id_dash: 1,              // Unique ID
  component: [             // Array of widgets
    {
      label: "Widget",     // Type: Widget, Card, Datatable
      i: "abc123",         // Unique identifier
      props: {             // Widget configuration
        title: "My Chart",
        chart_type: "bar", // bar, pie, area, gauge
        id_resource_data: 123456,
        x_data: "date",
        yData: [{ label: "Value", value: "value" }]
      }
    }
  ],
  layout: [                // Grid positions
    {
      i: "abc123",         // Match component.i
      x: 0, y: 0,          // Position
      w: 10, h: 20,        // Size
      static: false        // Locked?
    }
  ]
}
```

### Data Source Object

```javascript
{
  id: 1234567890,          // Timestamp
  name: "My Data",
  type: "json",
  fileName: "data.json",
  fileData: "base64..."    // Base64 encoded JSON
}
```

---

## 🐛 Common Issues & Solutions

### Issue: Dashboard not showing widgets

**Solution**:
```javascript
// Check if components array is empty
const { components } = useContext(LayoutContext);
console.log('Components:', components);

// Ensure activeIdDash is set
const { activeIdDash, ensureDashboardExists } = useContext(LayoutContext);
ensureDashboardExists(1);
```

---

### Issue: Widget not updating after configuration

**Solution**:
```javascript
// Make sure to save to localStorage
const { updateComponent, saveLayoutToLocal } = useContext(LayoutContext);
updateComponent(newComponents);
saveLayoutToLocal();
```

---

### Issue: Data not loading in widget

**Solution**:
```javascript
// Check if data source exists
const { getById } = useContext(SourceContext);
const data = getById(props.id_resource_data);
console.log('Data:', data);

// Check if base64 decoding works
import { utils } from '@/utils/function';
const decoded = utils.base64ToText(data.fileData);
console.log('Decoded:', decoded);
```

---

### Issue: Layout not persisting

**Solution**:
```javascript
// Check if saveLayoutToLocal is called
const { saveLayoutToLocal } = useContext(LayoutContext);

// Manually save
saveLayoutToLocal();

// Check localStorage
console.log(localStorage.getItem('dashboard_list'));
```

---

## 🎯 Performance Tips

### Quick Wins

```javascript
// 1. Memoize components
import { memo } from 'react';
export default memo(MyComponent);

// 2. Use useCallback for functions
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);

// 3. Use useMemo for expensive calculations
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);

// 4. Lazy load heavy components
const HeavyComponent = lazy(() => import('./Heavy'));

// 5. Debounce frequent operations
const debounced = debounce(fn, 500);
```

---

## 🔍 Useful DevTools Commands

```javascript
// Performance measurement
console.time('operation');
// ... code
console.timeEnd('operation');

// Memory usage
performance.memory.usedJSHeapSize / 1048576 // MB

// Check renders (in React DevTools)
// Components tab > Settings > Highlight updates

// Network performance
performance.getEntriesByType('navigation')[0]

// Check localStorage size
let size = 0;
for (let key in localStorage) {
  size += localStorage[key].length;
}
console.log('Size:', size / 1024, 'KB');
```

---

## 📦 Useful Utility Functions

### Local Storage

```javascript
import { local } from '@/utils/access';

local.save('key', value);      // Save to localStorage
local.get('key');              // Get from localStorage
local.remove('key');           // Remove from localStorage
local.clear();                 // Clear all
```

### Base64 Utils

```javascript
import { utils } from '@/utils/function';

utils.base64ToText(base64);    // Decode base64
utils.textToBase64(text);      // Encode to base64
utils.formatDate(date);        // Format date
```

### Component Utils

```javascript
import { cn } from '@/lib/utils';

// Merge Tailwind classes
cn('px-4 py-2', 'bg-blue-500', className)
```

---

## 🎨 Icon Reference

```javascript
// Tabler Icons
import { 
  IconDashboard,
  IconSettings,
  IconChartBar,
  IconTable,
  // ... see node_modules/@tabler/icons-react
} from '@tabler/icons-react';

// Lucide Icons
import { 
  Settings,
  Lock,
  Trash,
  // ... see node_modules/lucide-react
} from 'lucide-react';

// Usage
<IconDashboard size={24} />
<Settings size={16} className="text-gray-500" />
```

---

## 🧪 Testing Commands

```bash
# Manual testing checklist
# 1. Create new dashboard
# 2. Add widget
# 3. Configure widget
# 4. Drag & resize
# 5. Lock widget
# 6. Remove widget
# 7. Upload data source
# 8. Switch dashboards
# 9. Refresh page (data persists?)
# 10. Clear localStorage & reload
```

---

## 📚 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Open command palette |
| `Cmd/Ctrl + Shift + P` | (Add your shortcuts) |

---

## 🔗 Important Links

- **Recharts Docs**: https://recharts.org/
- **Tailwind Docs**: https://tailwindcss.com/
- **Radix UI**: https://www.radix-ui.com/
- **React Grid Layout**: https://github.com/react-grid-layout/react-grid-layout
- **React Router**: https://reactrouter.com/

---

## 💡 Pro Tips

1. **Use React DevTools Profiler** to find slow renders
2. **Check Network tab** for large bundles
3. **Use Lighthouse** for performance audit
4. **Console.log is your friend** when debugging
5. **Git commit often** with descriptive messages
6. **Test on multiple browsers** before deploying
7. **Check localStorage limits** (~5-10MB)
8. **Use Suspense** for better loading UX
9. **Memoize expensive operations** with useMemo
10. **Keep components small** and focused

---

## 🚨 Before Deploying

- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm run preview`
- [ ] Check all dashboards load
- [ ] Test data upload/download
- [ ] Verify localStorage persistence
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (target: >90)
- [ ] Check console for errors
- [ ] Test dark/light mode
- [ ] Verify all routes work

---

## 📞 Need Help?

1. Check `TECHNICAL_DOCUMENTATION.md` for detailed info
2. Check `OPTIMIZATION_CHECKLIST.md` for performance tips
3. Look at existing components for examples
4. Use React DevTools to inspect component tree
5. Check browser console for errors
6. Search GitHub issues

---

**Happy Coding! 🚀**

*Last updated: October 11, 2025*

