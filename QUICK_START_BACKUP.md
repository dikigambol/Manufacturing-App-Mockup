# 🚀 Quick Start: Backup & Restore Dashboard

## ⚡ **TL;DR - Before Deploy**

```bash
1. Open app: http://localhost:5173/settings
2. Click "Download Backup File"
3. Save the .json file
4. Deploy your code to server
5. Open deployed app
6. Go to Settings → Upload Backup File
7. Done! ✅
```

---

## 📥 **Backup Your Data (3 Ways)**

### **Way 1: Using UI (Easiest)** ⭐
1. Navigate to `http://localhost:5173/settings`
2. Click **"Download Backup File"** button
3. File saved: `dashboard-backup-YYYY-MM-DD.json`

### **Way 2: Browser Console**
```javascript
// Press F12, then type:
DataBackup.downloadBackup()
```

### **Way 3: Get JSON Object**
```javascript
// Press F12, then type:
const backup = DataBackup.exportAll()
console.log(JSON.stringify(backup, null, 2))
// Copy & paste the output
```

---

## 📤 **Restore Your Data (2 Ways)**

### **Way 1: Using UI (Easiest)** ⭐
1. Navigate to `http://YOUR-SERVER/settings`
2. Click **"Upload Backup File"** button
3. Select your `.json` file
4. Page will refresh automatically
5. ✅ Done!

### **Way 2: Browser Console**
```javascript
// Press F12, then type:
const backup = {/* paste your backup JSON here */}
DataBackup.importAll(backup)
// Then refresh page
```

---

## 📊 **What Gets Backed Up?**

✅ Dashboard layouts for all lines (Line 1, 2, 3, etc.)
✅ Widget configurations and positions
✅ Data source connections
✅ Saved layout templates from Layout Designer
✅ Custom machine layouts

---

## 🎯 **Common Scenarios**

### **Scenario: Moving to Production Server**
```
Local → Server

1. Backup: Download file from http://localhost:5173/settings
2. Deploy: Upload code to production server
3. Restore: Upload backup at http://YOUR-SERVER/settings
```

### **Scenario: Sharing with Team Member**
```
You → Colleague

1. Download backup file
2. Send .json file to colleague (email, Slack, etc.)
3. Colleague uploads file on their browser
4. Both have same dashboard!
```

### **Scenario: Fresh Installation**
```
New Setup

1. Install and run app
2. Defaults load automatically from constant.js
3. (Optional) Customize and save backup for later
```

---

## ⚠️ **Important Notes**

- 📍 **localStorage is browser-specific**
  Each browser has its own data (Chrome ≠ Firefox ≠ Safari)

- 🔄 **Auto-refresh after import**
  Page refreshes automatically after successful restore

- 💾 **Keep backup files safe**
  Store in cloud, version control, or shared drive

- 🧹 **Clearing cache = losing data**
  Always backup before clearing browser cache

---

## 🛟 **Troubleshooting**

**Q: Where did my dashboards go?**
→ Import your backup file from Settings page

**Q: New computer, no dashboards**
→ Import backup file OR defaults will load automatically

**Q: Want to reset everything**
→ Settings → Danger Zone → Clear All Data

**Q: Backup file won't upload**
→ Make sure it's valid JSON format

---

## 📍 **File Locations**

| What | Where |
|------|-------|
| Settings Page | `http://localhost:5173/settings` |
| Backup Utility | `src/utils/dataBackup.js` |
| Default Configs | `src/utils/constant.js` |
| Deployment Guide | `DEPLOYMENT_GUIDE.md` |

---

## 🔧 **Developer Console Cheatsheet**

```javascript
// Download backup
DataBackup.downloadBackup()

// View storage usage
DataBackup.printStorageInfo()

// Export specific data
DataBackup.exportDashboards()
DataBackup.exportDataSources()
DataBackup.exportLayoutTemplates()

// Get full backup object
const backup = DataBackup.exportAll()

// Restore from backup
DataBackup.importAll(backup)

// Nuclear option (⚠️ deletes everything)
DataBackup.clearAll()
```

---

**That's it!** Just download backup before deploy, upload after deploy. Easy! 🎉

