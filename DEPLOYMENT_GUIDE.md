# 🚀 Deployment Guide

## 📋 **Overview**

This guide explains how to preserve your dashboard configurations, data sources, and layout templates when deploying to a server or moving between environments.

---

## 🔄 **Data Persistence Strategy**

### **Current Architecture:**
- **Dashboard Layouts**: Stored in browser `localStorage` (`dashboard_list`)
- **Data Sources**: Stored in browser `localStorage` (`dataSources`)
- **Layout Templates**: Stored in browser `localStorage` (`layoutTemplates`)

### **Default Configurations:**
- Default dashboards are defined in `src/utils/constant.js`
- Default data sources are auto-loaded on first visit
- When localStorage is empty, defaults are automatically initialized

---

## 📦 **Before Deployment: Backup Your Data**

### **Method 1: Using the UI (Recommended)**

1. Navigate to **Settings → Data Management** page
2. Click **"Download Backup File"**
3. Save the `.json` file securely
4. This file contains:
   - ✅ All dashboard layouts (Line 1, Line 2, Line 3, etc.)
   - ✅ Data source configurations
   - ✅ Saved layout templates from Layout Designer
   - ✅ Widget configurations and positions

### **Method 2: Using Browser Console**

```javascript
// Open browser console (F12)
DataBackup.downloadBackup()
```

### **Method 3: Manual Export**

```javascript
// Get raw backup object
const backup = DataBackup.exportAll();
console.log(JSON.stringify(backup, null, 2));

// Copy and save to a file
```

---

## 🌐 **After Deployment: Restore Your Data**

### **Option A: Import Backup File**

1. Open your deployed application
2. Navigate to **Settings → Data Management**
3. Click **"Upload Backup File"**
4. Select your previously downloaded `.json` file
5. Page will automatically refresh
6. ✅ All your configurations are restored!

### **Option B: Share with Team**

1. Download backup file from your local development
2. Share the `.json` file with team members
3. Each team member imports the file on their browser
4. Everyone gets the same dashboard configurations

### **Option C: Set as Default Configuration**

If you want specific configurations to be the default for all users:

1. Export your configurations using `DataBackup.exportAll()`
2. Copy the dashboard configurations to `src/utils/constant.js`
3. Update the `default_dash` array with your configurations
4. Commit and push to repository
5. All users will get these defaults automatically

---

## 🛠️ **Default Configuration Management**

### **File: `src/utils/constant.js`**

This file contains default configurations that are used when localStorage is empty:

```javascript
export const default_dash = [
  {
    id_dash: 2,  // Dashboard for Line 1
    component: [/* widgets */],
    layout: [/* positions */]
  },
  {
    id_dash: 5,  // Dashboard for Line 2
    component: [/* widgets */],
    layout: [/* positions */]
  },
  // ... more dashboards
];

export const default_source_data = [
  {
    id: 1755265050554,
    name: "Line 1 - Production Data",
    type: "json",
    fileData: "base64_encoded_data..."
  },
  // ... more data sources
];
```

### **How to Update Defaults:**

1. **Configure dashboards in your local environment**
2. **Export the configuration:**
   ```javascript
   const backup = DataBackup.exportAll();
   console.log(backup.data.dashboards);
   ```
3. **Copy the output to `constant.js`**
4. **Update `default_dash` array**
5. **Commit and push**

---

## 📊 **Workflow Examples**

### **Scenario 1: Moving from Local to Production**

```
Local Development → Production Server

1. 📥 Download backup file from local
2. 🚀 Deploy code to production
3. 📤 Upload backup file to production
4. ✅ Done!
```

### **Scenario 2: Sharing Configurations with Team**

```
Developer A → Developer B

1. 📥 Developer A downloads backup
2. 📧 Shares .json file with Developer B
3. 📤 Developer B imports backup file
4. ✅ Both have same dashboard setup!
```

### **Scenario 3: Setting Organization-Wide Defaults**

```
Admin → All Users

1. 📥 Admin configures perfect dashboard
2. 📝 Exports and updates constant.js
3. 🔄 Commits to repository
4. ✅ All users get defaults automatically!
```

---

## 🔐 **Data Structure**

### **Backup File Format:**

```json
{
  "version": "1.0.0",
  "timestamp": "2025-10-14T12:00:00.000Z",
  "data": {
    "dashboards": [
      {
        "id_dash": 2,
        "component": [...],
        "layout": [...]
      }
    ],
    "dataSources": [...],
    "layoutTemplates": [...],
    "selectedLine": "line_1"
  }
}
```

---

## 🚨 **Important Notes**

### **⚠️ Browser-Specific Storage:**
- Each browser/device has its own localStorage
- Clearing browser cache will DELETE all data
- Always keep backup files in a safe location

### **✅ Best Practices:**

1. **Regular Backups**: Download backup files regularly
2. **Version Control**: Keep backup files in version control (optional)
3. **Team Sharing**: Share backup files with team members
4. **Default Config**: Update `constant.js` for organization-wide defaults
5. **Documentation**: Document any custom configurations

### **🔄 When to Backup:**

- ✅ Before deploying to production
- ✅ After major dashboard changes
- ✅ Before sharing with team
- ✅ Before updating browser/OS
- ✅ Before clearing browser cache

---

## 🛟 **Troubleshooting**

### **Q: Lost all my dashboards after deploying!**
**A:** Import your backup file from Settings → Data Management

### **Q: New team member doesn't see any dashboards**
**A:** Either:
  - Share your backup file for them to import
  - Or ensure defaults are set in `constant.js`

### **Q: Want to reset to factory defaults**
**A:** Settings → Data Management → Clear All Data

### **Q: Backup file is too large**
**A:** This is normal if you have many custom layouts. Storage info available in Data Management page.

### **Q: Can I use a database instead of localStorage?**
**A:** Yes! Future versions may include backend storage. For now, backup/restore is the recommended approach.

---

## 📞 **Developer Tools**

### **Browser Console Commands:**

```javascript
// Download backup
DataBackup.downloadBackup()

// Get backup object (for copying)
const backup = DataBackup.exportAll()

// Import backup from object
DataBackup.importAll(backup)

// Show storage info
DataBackup.printStorageInfo()

// Export only dashboards
DataBackup.exportDashboards()

// Export only data sources
DataBackup.exportDataSources()

// Export only layout templates
DataBackup.exportLayoutTemplates()

// Clear everything (⚠️ dangerous!)
DataBackup.clearAll()
```

---

## 📝 **Checklist for Deployment**

- [ ] Configure all dashboards (Line 1, Line 2, Line 3)
- [ ] Save custom layout templates in Layout Designer
- [ ] Configure all data sources
- [ ] Download backup file from Data Management page
- [ ] Save backup file to secure location
- [ ] Deploy code to server
- [ ] Open deployed application
- [ ] Import backup file
- [ ] Verify all dashboards are correct
- [ ] Share backup file with team (if needed)
- [ ] Update `constant.js` with defaults (optional)
- [ ] Document any custom configurations
- [ ] ✅ Deployment complete!

---

## 🎯 **Summary**

| Task | Method | Location |
|------|--------|----------|
| **Backup Data** | Download Backup File | Settings → Data Management |
| **Restore Data** | Upload Backup File | Settings → Data Management |
| **Set Defaults** | Edit `default_dash` | `src/utils/constant.js` |
| **Storage Info** | Show Storage Info | Settings → Data Management |
| **Clear Data** | Clear All Data | Settings → Data Management (⚠️ Danger Zone) |

---

**Need Help?** Check browser console for detailed error messages or contact your development team.

