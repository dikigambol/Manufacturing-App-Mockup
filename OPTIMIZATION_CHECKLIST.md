# 🚀 Optimization Checklist - Manufacturing App

## Quick Start Optimization Guide

Gunakan checklist ini untuk melakukan optimasi secara bertahap. Setiap item memiliki estimasi waktu dan impact.

---

## 📊 Priority Matrix

| Priority | Impact | Effort | Items |
|----------|--------|--------|-------|
| 🔴 P0 (Critical) | High | Low | 5 items |
| 🟠 P1 (High) | High | Medium | 6 items |
| 🟡 P2 (Medium) | Medium | Medium | 4 items |
| 🟢 P3 (Low) | Low | Low | 3 items |

---

## 🔴 P0 - Critical (Do First)

### ✅ 1. Add React.memo to Widget Components
**Time**: 30 minutes  
**Impact**: 40-60% reduction in re-renders  
**Difficulty**: Easy

**Files to modify**:
- [ ] `src/components/custom/app/Widget.jsx`
- [ ] `src/components/custom/app/AppCard.jsx`
- [ ] `src/components/custom/app/Datatable.jsx`

**Implementation**:
```javascript
import { memo } from 'react';

const Widget = memo(({ props, elementId }) => {
  // existing code
}, (prevProps, nextProps) => {
  return (
    prevProps.props === nextProps.props && 
    prevProps.elementId === nextProps.elementId
  );
});
```

**Test**:
```bash
# Open React DevTools Profiler
# Drag a widget
# Check "Render time" before/after
```

---

### ✅ 2. Debounce Layout Save Operations
**Time**: 20 minutes  
**Impact**: 80% reduction in localStorage writes  
**Difficulty**: Easy

**Files to modify**:
- [ ] `src/layouts/container.jsx`

**Implementation**:
```javascript
// Add utility function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Use in component
const debouncedLayoutChange = useMemo(
  () => debounce((layout) => {
    // existing onChangeLayout logic
  }, 500),
  []
);
```

**Test**:
```bash
# Open DevTools > Application > Local Storage
# Drag widget multiple times quickly
# Verify save only happens after 500ms pause
```

---

### ✅ 3. Cache Parsed Data Sources
**Time**: 45 minutes  
**Impact**: 30-50% faster data access  
**Difficulty**: Medium

**Files to modify**:
- [ ] `src/contexts/source.jsx`

**Implementation**:
```javascript
const [parsedCache] = useState(new Map());

const getById = useCallback((id) => {
  // Check cache first
  if (parsedCache.has(id)) {
    return parsedCache.get(id);
  }
  
  // Parse and cache
  const source = sources.find(s => s.id === id);
  if (source) {
    const parsed = {
      ...source,
      fileData: JSON.parse(utils.base64ToText(source.fileData))
    };
    parsedCache.set(id, parsed);
    return parsed;
  }
}, [sources]);
```

**Test**:
```javascript
// In browser console
console.time('getData');
getById(1755265013522);
console.timeEnd('getData');
// Should be <5ms on second call
```

---

### ✅ 4. Add Suspense Boundaries
**Time**: 15 minutes  
**Impact**: Better UX, prevent blank screens  
**Difficulty**: Easy

**Files to modify**:
- [ ] `src/layouts/container.jsx`

**Current**: Already has Suspense, but improve fallback

**Enhancement**:
```javascript
// Create skeleton component
const WidgetSkeleton = () => (
  <div className="h-full w-full animate-pulse bg-gray-200 rounded-lg">
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-32 bg-gray-300 rounded"></div>
    </div>
  </div>
);

// Use in Suspense
<Suspense fallback={<WidgetSkeleton />}>
  <Widget {...item} />
</Suspense>
```

---

### ✅ 5. Fix useEffect Dependencies
**Time**: 30 minutes  
**Impact**: Prevent bugs and unnecessary renders  
**Difficulty**: Easy

**Files to audit**:
- [ ] `src/contexts/interact.jsx` (line 99-106)
- [ ] `src/components/custom/app/Widget.jsx`
- [ ] `src/pages/dashbaord/home.jsx`

**Action**:
```javascript
// Run ESLint
npm run lint

// Fix all warnings about missing dependencies
// Add to dependency array or use useCallback/useMemo
```

---

## 🟠 P1 - High Priority

### ✅ 6. Implement Virtual Scrolling for Datatables
**Time**: 1.5 hours  
**Impact**: Handle 10,000+ rows smoothly  
**Difficulty**: Medium

**Installation**:
```bash
npm install react-window
```

**Files to modify**:
- [ ] `src/components/custom/app/Datatable.jsx`

**Implementation**:
```javascript
import { FixedSizeList } from 'react-window';

const VirtualizedTable = ({ data, columns }) => {
  const Row = ({ index, style }) => (
    <div style={style} className="flex border-b">
      {columns.map(col => (
        <div key={col.key} className="flex-1 p-2">
          {data[index][col.key]}
        </div>
      ))}
    </div>
  );

  return (
    <FixedSizeList
      height={400}
      itemCount={data.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
};
```

**Test with large dataset**:
```javascript
// Generate test data
const largeData = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  value: Math.random() * 100
}));
```

---

### ✅ 7. Add Intersection Observer for Lazy Loading
**Time**: 1 hour  
**Impact**: 50-70% faster initial page load  
**Difficulty**: Medium

**Installation**:
```bash
npm install react-intersection-observer
```

**Files to modify**:
- [ ] `src/layouts/container.jsx`

**Implementation**:
```javascript
import { useInView } from 'react-intersection-observer';

const LazyWidget = ({ item }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: '200px',
  });

  return (
    <div ref={ref} className="h-full">
      {inView ? (
        <Suspense fallback={<WidgetSkeleton />}>
          <Widget props={item.props} elementId={item.i} />
        </Suspense>
      ) : (
        <WidgetSkeleton />
      )}
    </div>
  );
};
```

**Test**:
- Create dashboard with 20+ widgets
- Scroll and check Network tab
- Verify components load on-demand

---

### ✅ 8. Optimize Recharts Imports
**Time**: 30 minutes  
**Impact**: 20-30% bundle size reduction  
**Difficulty**: Easy

**Files to modify**:
- [ ] `src/components/custom/app/charts/AppChartBar.jsx`
- [ ] `src/components/custom/app/charts/AppChartArea.jsx`
- [ ] `src/components/custom/app/charts/AppChartPie.jsx`

**Before**:
```javascript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
```

**After**:
```javascript
import BarChart from 'recharts/lib/chart/BarChart';
import Bar from 'recharts/lib/cartesian/Bar';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
// ... etc
```

**Verify**:
```bash
npm run build
# Check dist folder size before/after
```

---

### ✅ 9. Add Error Boundaries
**Time**: 45 minutes  
**Impact**: Prevent entire app crashes  
**Difficulty**: Medium

**Create new file**:
- [ ] `src/components/ErrorBoundary.jsx`

**Implementation**:
```javascript
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-red-800 font-bold">Something went wrong</h2>
          <p className="text-red-600">{this.state.error?.message}</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Usage**:
```javascript
// app.jsx
import ErrorBoundary from './components/ErrorBoundary';

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

### ✅ 10. Add Loading States
**Time**: 30 minutes  
**Impact**: Better perceived performance  
**Difficulty**: Easy

**Files to modify**:
- [ ] `src/pages/data-resources/index.jsx`
- [ ] `src/pages/dashbaord/home.jsx`

**Implementation**:
```javascript
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  // Simulate loading
  const timer = setTimeout(() => setIsLoading(false), 300);
  return () => clearTimeout(timer);
}, []);

if (isLoading) {
  return <LoadingSpinner />;
}
```

---

### ✅ 11. Compress Data with LZ-String
**Time**: 1 hour  
**Impact**: 60-80% storage reduction  
**Difficulty**: Medium

**Installation**:
```bash
npm install lz-string
```

**Files to modify**:
- [ ] `src/utils/storageHelper.js`
- [ ] `src/contexts/source.jsx`
- [ ] `src/contexts/interact.jsx`

**Implementation**:
```javascript
import LZString from 'lz-string';

export const compressedStorage = {
  save: (key, data) => {
    const json = JSON.stringify(data);
    const compressed = LZString.compressToUTF16(json);
    localStorage.setItem(key, compressed);
  },
  
  get: (key) => {
    const compressed = localStorage.getItem(key);
    if (!compressed) return null;
    const decompressed = LZString.decompressFromUTF16(compressed);
    return JSON.parse(decompressed);
  }
};
```

**Test**:
```javascript
// Compare sizes
const original = JSON.stringify(largeData);
const compressed = LZString.compressToUTF16(original);
console.log('Original:', original.length);
console.log('Compressed:', compressed.length);
console.log('Ratio:', (compressed.length / original.length * 100).toFixed(2) + '%');
```

---

## 🟡 P2 - Medium Priority

### ✅ 12. Migrate to IndexedDB
**Time**: 3 hours  
**Impact**: Async operations, unlimited storage  
**Difficulty**: Hard

**Installation**:
```bash
npm install idb
```

**Create new file**:
- [ ] `src/utils/indexedDB.js`

**Implementation**:
```javascript
import { openDB } from 'idb';

const DB_NAME = 'manufacturing-app';
const DB_VERSION = 1;

export const initDB = async () => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('dashboards')) {
        db.createObjectStore('dashboards', { keyPath: 'id_dash' });
      }
      if (!db.objectStoreNames.contains('dataSources')) {
        db.createObjectStore('dataSources', { keyPath: 'id' });
      }
    },
  });
};

export const dashboardDB = {
  async save(dashboard) {
    const db = await initDB();
    await db.put('dashboards', dashboard);
  },
  
  async get(id) {
    const db = await initDB();
    return await db.get('dashboards', id);
  },
  
  async getAll() {
    const db = await initDB();
    return await db.getAll('dashboards');
  },
  
  async delete(id) {
    const db = await initDB();
    await db.delete('dashboards', id);
  }
};

export const dataSourceDB = {
  // Similar methods for dataSources
};
```

**Migration Plan**:
1. Create IndexedDB utility
2. Update contexts to use IndexedDB
3. Add migration script from localStorage to IndexedDB
4. Test thoroughly
5. Remove localStorage code

---

### ✅ 13. Add Web Workers for Data Processing
**Time**: 2 hours  
**Impact**: Non-blocking heavy computations  
**Difficulty**: Hard

**Create new file**:
- [ ] `src/workers/dataProcessor.worker.js`

**Implementation**:
```javascript
// dataProcessor.worker.js
self.addEventListener('message', (e) => {
  const { type, data, config } = e.data;
  
  let result;
  
  switch(type) {
    case 'TRANSFORM_CHART_DATA':
      result = transformChartData(data, config);
      break;
    case 'AGGREGATE_DATA':
      result = aggregateData(data, config);
      break;
    case 'FILTER_DATA':
      result = filterData(data, config);
      break;
    default:
      result = data;
  }
  
  self.postMessage({ type, result });
});

function transformChartData(data, config) {
  // Heavy transformation logic
  return data.map(item => ({
    x: item[config.xKey],
    y: item[config.yKey]
  }));
}
```

**Usage**:
```javascript
// In component
const worker = new Worker(
  new URL('../workers/dataProcessor.worker.js', import.meta.url),
  { type: 'module' }
);

worker.postMessage({
  type: 'TRANSFORM_CHART_DATA',
  data: rawData,
  config: { xKey: 'date', yKey: 'value' }
});

worker.onmessage = (e) => {
  setProcessedData(e.data.result);
};
```

---

### ✅ 14. Implement Request Deduplication
**Time**: 1 hour  
**Impact**: Prevent duplicate data fetches  
**Difficulty**: Medium

**Create new file**:
- [ ] `src/utils/requestCache.js`

**Implementation**:
```javascript
class RequestCache {
  constructor(ttl = 5000) {
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  clear() {
    this.cache.clear();
  }
}

export const dataCache = new RequestCache(5000); // 5 second TTL
```

**Usage in Context**:
```javascript
const getById = (id) => {
  const cached = dataCache.get(`source_${id}`);
  if (cached) return cached;
  
  const source = sources.find(s => s.id === id);
  if (source) {
    dataCache.set(`source_${id}`, source);
    return source;
  }
};
```

---

### ✅ 15. Add Performance Monitoring
**Time**: 45 minutes  
**Impact**: Track real performance metrics  
**Difficulty**: Easy

**Installation**:
```bash
npm install web-vitals
```

**Create new file**:
- [ ] `src/utils/analytics.js`

**Implementation**:
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals() {
  getCLS((metric) => console.log('CLS:', metric));
  getFID((metric) => console.log('FID:', metric));
  getFCP((metric) => console.log('FCP:', metric));
  getLCP((metric) => console.log('LCP:', metric));
  getTTFB((metric) => console.log('TTFB:', metric));
}

// Custom metrics
export function measureWidgetRender(widgetId) {
  performance.mark(`widget-${widgetId}-start`);
  
  return () => {
    performance.mark(`widget-${widgetId}-end`);
    performance.measure(
      `widget-${widgetId}`,
      `widget-${widgetId}-start`,
      `widget-${widgetId}-end`
    );
    
    const measure = performance.getEntriesByName(`widget-${widgetId}`)[0];
    console.log(`Widget ${widgetId} render:`, measure.duration, 'ms');
  };
}
```

**Usage**:
```javascript
// main.jsx
import { reportWebVitals } from './utils/analytics';

reportWebVitals();

// Widget.jsx
useEffect(() => {
  const endMeasure = measureWidgetRender(elementId);
  return endMeasure;
}, []);
```

---

## 🟢 P3 - Low Priority (Nice to Have)

### ✅ 16. Add Bundle Analyzer
**Time**: 15 minutes  
**Impact**: Visualize bundle composition  
**Difficulty**: Easy

**Installation**:
```bash
npm install --save-dev rollup-plugin-visualizer
```

**vite.config.js**:
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
});
```

**Run**:
```bash
npm run build
# Opens stats.html in browser
```

---

### ✅ 17. Add Service Worker for Offline Support
**Time**: 2 hours  
**Impact**: PWA capabilities, offline mode  
**Difficulty**: Medium

**Installation**:
```bash
npm install vite-plugin-pwa --save-dev
```

**vite.config.js**:
```javascript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Manufacturing App',
        short_name: 'MfgApp',
        description: 'Manufacturing Dashboard',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/favicon.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ],
});
```

---

### ✅ 18. Optimize Images
**Time**: 30 minutes  
**Impact**: Faster asset loading  
**Difficulty**: Easy

**Installation**:
```bash
npm install --save-dev vite-plugin-imagemin
```

**vite.config.js**:
```javascript
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: {
        plugins: [{ name: 'removeViewBox', active: false }]
      }
    })
  ],
});
```

---

## 📈 Testing Checklist

After each optimization, test:

### Performance Tests
- [ ] Lighthouse score (target: >90)
- [ ] React DevTools Profiler (check render times)
- [ ] Network tab (bundle sizes)
- [ ] Memory profiler (check for leaks)

### Functional Tests
- [ ] All dashboards load correctly
- [ ] Widgets render properly
- [ ] Drag & drop works
- [ ] Data persists on reload
- [ ] Configuration saves correctly

### Browser Tests
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers

### Load Tests
- [ ] Dashboard with 20+ widgets
- [ ] Datatable with 1000+ rows
- [ ] Large data sources (>1MB)
- [ ] Rapid navigation between dashboards

---

## 📊 Measurement Tools

### Before Starting
```bash
# Measure current performance
npm run build
ls -lh dist/assets/*.js  # Check bundle sizes

# Run Lighthouse
# Open Chrome DevTools > Lighthouse > Run
```

### During Development
```javascript
// In browser console
// Check localStorage size
let totalSize = 0;
for (let key in localStorage) {
  totalSize += localStorage[key].length;
}
console.log('LocalStorage size:', (totalSize / 1024).toFixed(2), 'KB');

// Check render count
// Use React DevTools Profiler
```

### After Optimization
```bash
# Compare bundle sizes
npm run build
ls -lh dist/assets/*.js

# Run performance tests
npm run test:perf  # if you add this script
```

---

## 🎯 Success Metrics

### Target Improvements

| Metric | Before | Target | Current |
|--------|--------|--------|---------|
| Bundle Size | 250KB | <200KB | ___ KB |
| First Load | 1.2s | <800ms | ___ ms |
| Dashboard Load | 500ms | <300ms | ___ ms |
| Widget Render | 100ms | <50ms | ___ ms |
| Re-renders | Baseline | -50% | ___% |
| Lighthouse Score | 75 | >90 | ___ |

---

## 💡 Quick Wins (15 min each)

Do these first for immediate results:

1. ✅ Add `React.memo` to 3 main components
2. ✅ Fix ESLint warnings about useEffect dependencies
3. ✅ Add debounce to layout save
4. ✅ Improve Suspense fallback UI
5. ✅ Add error boundaries

---

## 📝 Notes

### Before You Start
- Create a new branch: `git checkout -b feature/optimization`
- Backup localStorage: Copy values from DevTools
- Take screenshots of current performance
- Run baseline tests

### During Optimization
- Test after each change
- Commit frequently
- Document any breaking changes
- Update tests if needed

### After Completion
- Run full test suite
- Update documentation
- Create pull request
- Monitor production metrics

---

## 🚨 Common Pitfalls

1. **Don't optimize prematurely** - Measure first
2. **Test thoroughly** - One optimization may break another
3. **Check browser compatibility** - New APIs may not work everywhere
4. **Monitor bundle size** - Adding libraries can increase size
5. **Keep it simple** - Complex optimizations may not be worth it

---

## ✅ Completion Checklist

When you finish all optimizations:

- [ ] All P0 items completed
- [ ] All P1 items completed
- [ ] Performance targets met
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Deployed to staging
- [ ] Monitoring setup
- [ ] Team trained on changes

---

**Happy Optimizing! 🚀**

Last updated: October 11, 2025

