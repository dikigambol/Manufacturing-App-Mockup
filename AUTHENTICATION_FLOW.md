# Authentication & Line Selection Flow

## Overview
This document describes the new authentication and line selection flow implemented in the Manufacturing Dashboard application.

## User Flow

```
┌─────────────┐
│   Browser   │
│   Opens App │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│   Login Page        │
│   /login            │
│                     │
│ - Username/Password │
│ - Quick Login       │
│ - Demo Options      │
└──────┬──────────────┘
       │ (Authenticated)
       ▼
┌─────────────────────┐
│ Line Selection      │
│ /lines              │
│                     │
│ - Line 1: Running   │
│ - Line 2: Idle      │
│ - Line 3: Maint.    │
└──────┬──────────────┘
       │ (Select Line)
       ▼
┌─────────────────────┐
│ Line Dashboard      │
│ /dashboard/:lineId  │
│                     │
│ - Real-time data    │
│ - Customizable      │
│ - Line-specific     │
└─────────────────────┘
```

## Route Structure

### Public Routes
- `/login` - Login page (no authentication required)
- `/welcome` - Welcome/landing page (optional)

### Protected Routes (Requires Authentication)
- `/lines` - Production line selection page
  - Requires: User logged in
  - Shows: Available production lines
  - Action: Select line to monitor

### Protected Routes (Requires Authentication + Line Selection)
- `/dashboard/:lineId` - Line-specific dashboard
  - Requires: User logged in + Line selected
  - Shows: Real-time monitoring dashboard
  - Parameters: `lineId` (line_1, line_2, line_3)

### Legacy Routes (Auto-redirect)
All legacy routes now redirect to `/lines`:
- `/` → `/lines`
- `/dashboard` → `/lines`
- `/inf-prod` → `/lines`
- `/mon-line` → `/lines`
- `/qc` → `/lines`
- `/mater-inv` → `/lines`
- `/mainten` → `/lines`
- `/saf-comp` → `/lines`
- `/enrg-effcy` → `/lines`
- `/opp-perf` → `/lines`

## Authentication System

### AuthContext
Located: `src/contexts/auth.jsx`

**State:**
```javascript
{
  user: {
    username: string,
    role: string,
    loginTime: ISO date string
  },
  selectedLine: string (lineId),
  isLoading: boolean
}
```

**Methods:**
- `login(userData)` - Authenticates user and stores session
- `logout()` - Clears user session and selected line
- `selectLine(lineId)` - Sets the active production line
- `isAuthenticated()` - Checks if user is logged in
- `hasSelectedLine()` - Checks if line is selected
- `getCurrentUser()` - Returns current user data
- `getCurrentLine()` - Returns selected line ID

**Storage:**
- `localStorage.user` - User session data (JSON)
- `localStorage.selectedLine` - Selected line ID (string)

### Protected Component
Located: `src/utils/protected.jsx`

**Props:**
- `requireLine` (boolean) - If true, requires line selection

**Behavior:**
1. Shows loading spinner while checking auth
2. Redirects to `/login` if not authenticated
3. Redirects to `/lines` if line required but not selected
4. Renders child routes if all checks pass

## Pages

### 1. Login Page
**Location:** `src/pages/auth/LoginPage.jsx`  
**Route:** `/login`  
**Features:**
- Username/password form
- Show/hide password toggle
- Loading states
- Quick login options (Admin/Operator)
- Auto-redirect after successful login

**Demo Credentials:**
- Admin: username: `admin`, password: `password`
- Operator: username: `operator`, password: `password`

### 2. Line Selection Page
**Location:** `src/pages/lines/LineSelectionPage.jsx`  
**Route:** `/lines`  
**Features:**
- Display 3 production lines
- Real-time status indicators
- Line statistics (efficiency, machines, operator)
- System overview
- User profile display
- Logout functionality
- Direct access to line dashboards

**Production Lines:**
1. **Engine Assembly Line 1**
   - ID: `line_1`
   - Status: Running
   - Efficiency: 92%
   - Machines: 8

2. **Engine Assembly Line 2**
   - ID: `line_2`
   - Status: Idle
   - Efficiency: 87%
   - Machines: 6

3. **Engine Assembly Line 3**
   - ID: `line_3`
   - Status: Maintenance
   - Efficiency: 0%
   - Machines: 4

### 3. Line Dashboard
**Location:** `src/pages/dashboard/LineDashboard.jsx`  
**Route:** `/dashboard/:lineId`  
**Features:**
- Line-specific header with info
- Back to line selection button
- Real-time status badge
- Refresh and settings buttons
- Integrated with existing dashboard container
- Customizable widget layout

## State Management

### Session Persistence
User sessions and line selections persist across:
- Page refreshes
- Browser restarts
- Tab closures

**Implementation:**
```javascript
// On login
localStorage.setItem('user', JSON.stringify(userData))

// On line selection
localStorage.setItem('selectedLine', lineId)

// On logout
localStorage.removeItem('user')
localStorage.removeItem('selectedLine')
```

### Context Integration
The AuthContext is integrated with existing contexts:
```javascript
<AuthProvider>
  <SourceProvider>
    <SheetProvider>
      <LayoutProvider>
        <AlertProvider>
          {/* App Routes */}
        </AlertProvider>
      </LayoutProvider>
    </SheetProvider>
  </SourceProvider>
</AuthProvider>
```

## Security Considerations

### Current Implementation (Demo/Development)
- Simple localStorage-based authentication
- No password encryption
- No token expiration
- No API validation

### Production Recommendations
1. **Use JWT tokens** instead of localStorage user objects
2. **Implement token refresh** mechanism
3. **Add password hashing** (bcrypt)
4. **Implement session timeout**
5. **Add CSRF protection**
6. **Use secure HTTP-only cookies**
7. **Implement API authentication** endpoints
8. **Add rate limiting** on login attempts
9. **Implement 2FA** for sensitive operations
10. **Add audit logging** for authentication events

## API Integration (Future)

### Suggested Endpoints
```javascript
// Authentication
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me

// Lines
GET  /api/lines
GET  /api/lines/:lineId
GET  /api/lines/:lineId/status
GET  /api/lines/:lineId/metrics

// Dashboard
GET  /api/dashboard/:lineId/layout
POST /api/dashboard/:lineId/layout
```

## Migration from Old Flow

### Before
```
User → Dashboard (/)
     → Direct access to all pages
     → No line context
```

### After
```
User → Login (/login)
     → Line Selection (/lines)
     → Line Dashboard (/dashboard/:lineId)
     → Line-specific data & context
```

### Benefits
1. **Better organization** - Clear separation of lines
2. **Improved security** - Authentication required
3. **Better UX** - Clear user journey
4. **Scalability** - Easy to add more lines
5. **Data isolation** - Each line has its own context
6. **User tracking** - Know who's monitoring what

## Testing Checklist

### Authentication Flow
- [ ] Can access login page without auth
- [ ] Cannot access /lines without login
- [ ] Cannot access /dashboard/:lineId without login
- [ ] Login redirects to /lines
- [ ] Logout clears session and redirects to /login
- [ ] Session persists across page refresh
- [ ] Protected routes redirect properly

### Line Selection Flow
- [ ] All 3 lines are displayed
- [ ] Line status badges show correctly
- [ ] Can select and access each line
- [ ] Line selection persists in localStorage
- [ ] Can switch between lines
- [ ] Can logout from line selection

### Dashboard Flow
- [ ] Line-specific dashboard loads correctly
- [ ] Line info displays in header
- [ ] Can navigate back to line selection
- [ ] Dashboard widgets work as expected
- [ ] Line context is maintained
- [ ] Can switch lines without losing layout

### Edge Cases
- [ ] Direct URL access to /dashboard/:lineId without auth
- [ ] Direct URL access to /lines without auth
- [ ] Invalid lineId in URL
- [ ] Logout while on dashboard
- [ ] Browser back button behavior
- [ ] Multiple tabs handling

## Troubleshooting

### Common Issues

1. **"Cannot access dashboard"**
   - Check if user is logged in
   - Check if line is selected
   - Check localStorage for user/selectedLine

2. **"Infinite redirect loop"**
   - Check Protected component logic
   - Check route configuration
   - Clear localStorage and try again

3. **"Line context lost"**
   - Check localStorage.selectedLine
   - Check AuthContext state
   - Verify selectLine() is called

4. **"Protected routes not working"**
   - Verify AuthProvider wraps routes
   - Check useAuth() hook usage
   - Verify isAuthenticated() logic

## Future Enhancements

1. **Multi-user support**
   - Role-based access control
   - User management
   - Permissions system

2. **Advanced line features**
   - Line comparison view
   - Multi-line dashboard
   - Line alerts/notifications

3. **Enhanced security**
   - OAuth integration
   - SSO support
   - API key management

4. **Mobile app**
   - React Native version
   - Push notifications
   - Offline mode

5. **Real-time updates**
   - WebSocket integration
   - Live line status
   - Real-time alerts

## Developer Notes

### Adding New Lines
1. Update line data in `LineSelectionPage.jsx`
2. Add line info in `LineDashboard.jsx` `getLineInfo()`
3. Update this documentation

### Modifying Auth Logic
1. Update `src/contexts/auth.jsx`
2. Test all protected routes
3. Update Protected component if needed
4. Update documentation

### Custom Line Dashboards
Currently all lines use the same dashboard layout. To create line-specific dashboards:
1. Create separate components for each line
2. Update routing in `app.jsx`
3. Add conditional rendering in `LineDashboard.jsx`

---

**Last Updated:** October 11, 2025  
**Version:** 1.0.0  
**Maintainer:** Development Team
