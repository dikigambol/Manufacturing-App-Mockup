# 📊 Dummy Data Guide - Manufacturing System

## 🎯 Overview

File ini berisi panduan lengkap untuk menggunakan dummy data dalam development phase. Semua data sudah disiapkan dan ready untuk digunakan dalam UI development.

**Files Created:**
- ✅ `src/data/dummyData.js` - All dummy data
- ✅ `src/services/DummyDataService.js` - CRUD operations service

---

## 📋 Available Dummy Data

### **1. Master Data - Access Levels** (4 records)

| ID | Access Level ID | Name | Allowed Menus |
|----|----------------|------|---------------|
| 1 | ADMIN | Administrator | All menus |
| 2 | OPERATOR | Operator | Dashboard, Andon, Traceability |
| 3 | TECHNICIAN | Technician | Dashboard, Machine Detail, Andon, Maintenance, Traceability |
| 4 | SUPERVISOR | Supervisor | Dashboard, Machine Detail, Andon, Maintenance, Traceability |

**Usage:**
```javascript
import { dummyAccessLevels } from '@/data/dummyData';
import DummyDataService from '@/services/DummyDataService';

// Get all access levels
const accessLevels = await DummyDataService.accessLevels.getAll();

// Get by ID
const admin = await DummyDataService.accessLevels.getById(1);

// Create new
const newLevel = await DummyDataService.accessLevels.create({
  name: "Manager",
  allowed_menus: ["dashboard", "master_data"]
});

// Update
await DummyDataService.accessLevels.update(1, { name: "Super Admin" });

// Delete
await DummyDataService.accessLevels.delete(4);

// Search
const results = await DummyDataService.accessLevels.search("admin");
```

---

### **2. Master Data - Users** (5 records)

| ID | Name | NRP | Access Level | RFID | Status |
|----|------|-----|--------------|------|--------|
| 1 | John Doe | 297498 | Administrator | 34567890 | Active |
| 2 | Asep Gunandar | 297499 | Operator | 34567891 | Active |
| 3 | Ucup Irawan | 297500 | Technician | 34567892 | Active |
| 4 | Gunawan Santoso | 297501 | Supervisor | 34567893 | Active |
| 5 | Usman Hakim | 297502 | Operator | 34567894 | Active |

**Default Passwords:**
- Admin: `admin123`
- Operator: `operator123`
- Technician: `tech123`
- Supervisor: `super123`

**Usage:**
```javascript
import DummyDataService from '@/services/DummyDataService';

// Get all users
const users = await DummyDataService.users.getAll();

// Get by ID
const user = await DummyDataService.users.getById(1);

// Get by NRP
const user = await DummyDataService.users.getByNRP("297498");

// Authenticate
const authenticatedUser = await DummyDataService.users.authenticate("297498", "admin123");

// Create new user
const newUser = await DummyDataService.users.create({
  name: "New User",
  nrp: "297503",
  password: "password123",
  access_level_id: 2,
  rfid: "34567895"
});

// Update user
await DummyDataService.users.update(1, { 
  name: "John Doe Updated",
  phone: "+62 812-9999-9999"
});

// Delete user
await DummyDataService.users.delete(5);

// Search users
const results = await DummyDataService.users.search("asep");
```

---

### **3. Master Data - Machines** (6 records)

| ID | Machine ID | Name | Asset No | Year | Type | Status | Line |
|----|-----------|------|----------|------|------|--------|------|
| 1 | MCH-001 | Nut Runner Cyl Head 1 | 1234567890 | 2023 | Assembly | Running | line_1 |
| 2 | MCH-002 | Leak Tester Station 1 | 1234567891 | 2023 | Testing | Idle | line_1 |
| 3 | MCH-003 | Quality Gate 1 | 1234567892 | 2022 | Inspection | Alarm | line_1 |
| 4 | MCH-004 | Press Bearing Station | 1234567893 | 2023 | Assembly | Running | line_2 |
| 5 | MCH-005 | Oil Filling Machine | 1234567894 | 2024 | Filling | Running | line_2 |
| 6 | MCH-006 | Torque Click System | 1234567895 | 2024 | Testing | Disconnected | line_3 |

**Usage:**
```javascript
import DummyDataService from '@/services/DummyDataService';

// Get all machines
const machines = await DummyDataService.machines.getAll();

// Get by ID
const machine = await DummyDataService.machines.getById(1);

// Get by Machine ID
const machine = await DummyDataService.machines.getByMachineId("MCH-001");

// Get by Line
const line1Machines = await DummyDataService.machines.getByLine("line_1");

// Create new machine
const newMachine = await DummyDataService.machines.create({
  machine_id: "MCH-007",
  name: "New Machine",
  asset_no: "1234567896",
  acquisition_year: 2024,
  machine_type: "Assembly",
  line_id: "line_1"
});

// Update machine
await DummyDataService.machines.update(1, { 
  status: "maintenance",
  specifications: "Updated specs"
});

// Update status only
await DummyDataService.machines.updateStatus(1, "running");

// Delete machine
await DummyDataService.machines.delete(6);

// Search machines
const results = await DummyDataService.machines.search("nut runner");
```

---

### **4. Master Data - Spareparts** (5 records)

| ID | Part Number | Part Name | Brand | Type | Stock | Min Stock |
|----|------------|-----------|-------|------|-------|-----------|
| 1 | HYD-VAL-001 | Hydraulic Valve | Yuken | Hydraulic | 25 | 5 |
| 2 | PNE-CYL-032 | Pneumatic Cylinder | SMC | Pneumatic | 15 | 3 |
| 3 | BRG-6205 | Ball Bearing 6205 | SKF | Bearing | 50 | 10 |
| 4 | SEN-PRX-001 | Proximity Sensor | Omron | Sensor | 30 | 8 |
| 5 | FLT-AIR-001 | Air Filter | Festo | Pneumatic | 20 | 5 |

**Usage:**
```javascript
import DummyDataService from '@/services/DummyDataService';

// Get all spareparts
const spareparts = await DummyDataService.spareparts.getAll();

// Get by ID
const part = await DummyDataService.spareparts.getById(1);

// Get by Part Number
const part = await DummyDataService.spareparts.getByPartNumber("HYD-VAL-001");

// Get by Machine compatibility
const parts = await DummyDataService.spareparts.getByMachine("MCH-001");

// Create new sparepart
const newPart = await DummyDataService.spareparts.create({
  part_number: "NEW-001",
  part_name: "New Part",
  brand: "Brand",
  type: "Type",
  stock: 10,
  min_stock: 2
});

// Update sparepart
await DummyDataService.spareparts.update(1, { 
  stock: 30,
  price: 1600000
});

// Update stock (add or subtract)
await DummyDataService.spareparts.updateStock(1, 5, 'add'); // Add 5 units
await DummyDataService.spareparts.updateStock(1, 2, 'subtract'); // Remove 2 units

// Delete sparepart
await DummyDataService.spareparts.delete(5);

// Search spareparts
const results = await DummyDataService.spareparts.search("hydraulic");
```

---

### **5. Andon System - Tickets** (4 records)

| ID | Ticket ID | Machine | Call By | Status | Priority | Issue Type |
|----|-----------|---------|---------|--------|----------|------------|
| 1 | CALL-001 | Nut Runner Cyl Head 1 | Asep Gunandar | Closed | Medium | Mechanical |
| 2 | CALL-002 | Quality Gate 1 | Asep Gunandar | Open | High | Electrical |
| 3 | CALL-003 | Leak Tester Station 1 | Usman Hakim | Open | Low | Quality |
| 4 | CALL-004 | Nut Runner Cyl Head 1 | Asep Gunandar | Closed | Critical | Safety |

**Usage:**
```javascript
import DummyDataService from '@/services/DummyDataService';

// Get all tickets
const tickets = await DummyDataService.andon.getAll();

// Get by ID
const ticket = await DummyDataService.andon.getById(1);

// Get by status
const openTickets = await DummyDataService.andon.getByStatus('open');

// Get by machine
const machineTickets = await DummyDataService.andon.getByMachine(1);

// Create new ticket
const newTicket = await DummyDataService.andon.create({
  machine_id: 1,
  call_by_user_id: 2,
  priority: "high",
  issue_type: "mechanical",
  description: "Machine stopped unexpectedly",
  attachments: []
});

// Respond to ticket
await DummyDataService.andon.respond(2, {
  response_by_user_id: 3,
  arrival_time: "2025-10-12 10:30:00",
  duration: 15,
  status: "closed",
  resolution: "Fixed the issue"
});

// Update status
await DummyDataService.andon.updateStatus(2, 'closed');

// Delete ticket
await DummyDataService.andon.delete(3);

// Search tickets
const results = await DummyDataService.andon.search("nut runner");
```

---

### **6. Maintenance System - Tickets** (4 records)

| ID | Ticket ID | Machine | Type | Created By | Status | Priority |
|----|-----------|---------|------|------------|--------|----------|
| 1 | MTC-001 | Nut Runner Cyl Head 1 | Corrective | Usman Hakim | Done | Medium |
| 2 | MTC-002 | Quality Gate 1 | Preventive | Gunawan Santoso | On Progress | Low |
| 3 | MTC-003 | Press Bearing Station | WO | Gunawan Santoso | New | Medium |
| 4 | MTC-004 | Leak Tester Station 1 | Corrective | Usman Hakim | Done | High |

**Usage:**
```javascript
import DummyDataService from '@/services/DummyDataService';

// Get all tickets
const tickets = await DummyDataService.maintenance.getAll();

// Get by ID
const ticket = await DummyDataService.maintenance.getById(1);

// Get by status
const newTickets = await DummyDataService.maintenance.getByStatus('new');

// Get by type
const correctiveTickets = await DummyDataService.maintenance.getByType('Corrective');

// Get by machine
const machineTickets = await DummyDataService.maintenance.getByMachine(1);

// Create new ticket
const newTicket = await DummyDataService.maintenance.create({
  machine_id: 1,
  type: "Corrective",
  problem: "Machine issue description",
  created_by_user_id: 2,
  priority: "high"
});

// Respond to ticket
await DummyDataService.maintenance.respond(3, {
  response_by_user_id: 3,
  repair: "Detailed repair description",
  duration: 60,
  status: "done",
  parts_used: [
    { part_number: "HYD-VAL-001", part_name: "Hydraulic Valve", quantity: 1, brand: "Yuken" }
  ]
});

// Update status
await DummyDataService.maintenance.updateStatus(2, 'done');

// Delete ticket
await DummyDataService.maintenance.delete(3);

// Search tickets
const results = await DummyDataService.maintenance.search("pneumatic");
```

---

### **7. Maintenance Schedule** (4 records)

| ID | Date | Type | Machine | Assigned To | Status |
|----|------|------|---------|-------------|--------|
| 1 | 2025-10-14 | Preventive | Nut Runner Cyl Head 1 | Ucup Irawan | Scheduled |
| 2 | 2025-10-15 | WO | Press Bearing Station | Ucup Irawan | Scheduled |
| 3 | 2025-10-16 | Preventive | Leak Tester Station 1 | Ucup Irawan | Scheduled |
| 4 | 2025-10-18 | Corrective | Quality Gate 1 | Ucup Irawan | Scheduled |

**Usage:**
```javascript
import DummyDataService from '@/services/DummyDataService';

// Get all schedules
const schedules = await DummyDataService.maintenanceSchedule.getAll();

// Get by date range
const schedules = await DummyDataService.maintenanceSchedule.getByDateRange(
  "2025-10-14",
  "2025-10-20"
);

// Create new schedule
const newSchedule = await DummyDataService.maintenanceSchedule.create({
  schedule_date: "2025-10-20",
  type: "Preventive",
  description: "Monthly maintenance",
  machine_id: 1,
  assigned_to: "Ucup Irawan"
});

// Delete schedule
await DummyDataService.maintenanceSchedule.delete(4);
```

---

### **8. Traceability - Machine History** (3 records)

| Machine ID | Machine Name | Total Runtime | Total Downtime | OEE | Maintenance Records |
|-----------|--------------|---------------|----------------|-----|---------------------|
| 1 | Nut Runner Cyl Head 1 | 2450h | 48h | 92.5% | 3 records |
| 2 | Leak Tester Station 1 | 2380h | 52h | 89.3% | 2 records |
| 3 | Quality Gate 1 | 5240h | 125h | 85.7% | 3 records |

**Usage:**
```javascript
import DummyDataService from '@/services/DummyDataService';

// Get all machine history
const history = await DummyDataService.traceability.getAll();

// Get by machine ID
const machineHistory = await DummyDataService.traceability.getByMachineId(1);

// Search
const results = await DummyDataService.traceability.search("nut runner");
```

---

### **9. Dashboard Data - OEE Metrics** (3 lines)

| Line | Availability | Performance | Quality | Total OEE | Cycle Time | Part OK | Part NG |
|------|-------------|-------------|---------|-----------|------------|---------|---------|
| Line 1 | 88% | 90% | 85% | 92% | 21.4s | 1100 | 4 |
| Line 2 | 92% | 88% | 90% | 90% | 19.8s | 1250 | 2 |
| Line 3 | 85% | 87% | 88% | 87% | 23.2s | 980 | 6 |

**Usage:**
```javascript
import DummyDataService from '@/services/DummyDataService';

// Get OEE data for specific line
const oeeData = await DummyDataService.dashboard.getOEEData('line_1');

// Get production data (historical)
const productionData = await DummyDataService.dashboard.getProductionData();
```

---

### **10. Dashboard Data - Production Metrics** (12 months)

Historical data untuk charts (Downtime, Target vs Actual, Electric Consumption)

**Usage:**
```javascript
import { dummyProductionData } from '@/data/dummyData';

// Use directly in charts
<BarChart data={dummyProductionData} xKey="month" yKey="downtime" />
```

---

## 🔧 Service Features

### **✅ CRUD Operations**
All services support standard CRUD operations:
- `getAll()` - Get all records
- `getById(id)` - Get single record by ID
- `create(data)` - Create new record
- `update(id, data)` - Update existing record
- `delete(id)` - Delete record
- `search(query)` - Search records

### **✅ Data Validation**
- Unique constraints (NRP, RFID, Machine ID, Part Number)
- Required fields validation
- Stock validation for spareparts
- Status validation

### **✅ Relationships**
- Users → Access Levels (foreign key)
- Andon Tickets → Machines, Users
- Maintenance Tickets → Machines, Users, Spareparts
- Machine History → Machines

### **✅ Auto-generated Fields**
- Auto-increment IDs
- Auto-generated ticket numbers (CALL-001, MTC-001)
- Timestamps (created_at, updated_at)

---

## 🎨 Usage in Components

### **Example 1: Master Data Page**

```javascript
// src/pages/master-data/MasterDataUsers.jsx
import { useState, useEffect } from 'react';
import DummyDataService from '@/services/DummyDataService';

const MasterDataUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await DummyDataService.users.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (userData) => {
    try {
      await DummyDataService.users.create(userData);
      await loadUsers(); // Reload data
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdate = async (id, userData) => {
    try {
      await DummyDataService.users.update(id, userData);
      await loadUsers(); // Reload data
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await DummyDataService.users.delete(id);
        await loadUsers(); // Reload data
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div>
      {/* Your UI here */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.nrp}</td>
              <td>
                <button onClick={() => handleUpdate(user.id, {...user, name: 'Updated'})}>
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};
```

### **Example 2: Andon System**

```javascript
// src/pages/andon/AndonList.jsx
import { useState, useEffect } from 'react';
import DummyDataService from '@/services/DummyDataService';

const AndonList = () => {
  const [tickets, setTickets] = useState([]);
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [ticketsData, machinesData] = await Promise.all([
      DummyDataService.andon.getAll(),
      DummyDataService.machines.getAll()
    ]);
    setTickets(ticketsData);
    setMachines(machinesData);
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      await DummyDataService.andon.create(ticketData);
      await loadData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResponse = async (ticketId, responseData) => {
    try {
      await DummyDataService.andon.respond(ticketId, responseData);
      await loadData();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {/* Your UI here */}
    </div>
  );
};
```

### **Example 3: Dashboard with OEE Data**

```javascript
// src/pages/dashboard/LineDashboard.jsx
import { useState, useEffect } from 'react';
import DummyDataService from '@/services/DummyDataService';

const LineDashboard = ({ lineId }) => {
  const [oeeData, setOeeData] = useState(null);
  const [productionData, setProductionData] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, [lineId]);

  const loadDashboardData = async () => {
    const [oee, production] = await Promise.all([
      DummyDataService.dashboard.getOEEData(lineId),
      DummyDataService.dashboard.getProductionData()
    ]);
    setOeeData(oee);
    setProductionData(production);
  };

  return (
    <div>
      {oeeData && (
        <OEEDonutChart
          availability={oeeData.availability}
          performance={oeeData.performance}
          quality={oeeData.quality}
          totalOEE={oeeData.totalOEE}
        />
      )}
      
      <BarChart data={productionData} xKey="month" yKey="downtime" />
    </div>
  );
};
```

---

## 🔄 Migration to Real Database

Ketika ready untuk migrate ke real database (Phase 2), cukup replace import:

```javascript
// Before (Dummy Data)
import DummyDataService from '@/services/DummyDataService';
const users = await DummyDataService.users.getAll();

// After (Real Database)
import DatabaseService from '@/services/DatabaseService';
const users = await DatabaseService.users.getAll();
```

**Interface yang sama**, jadi tidak perlu ubah component logic! 🎯

---

## 🛠️ Utility Functions

### **Reset All Data**
```javascript
// Reset semua data ke initial state
await DummyDataService.resetAllData();
```

### **Export All Data**
```javascript
// Export semua data untuk backup atau migration
const allData = await DummyDataService.exportAllData();
console.log(allData);
```

---

## 📊 Data Statistics

### **Total Records:**
- Access Levels: 4 records
- Users: 5 records
- Machines: 6 records
- Spareparts: 5 records
- Andon Tickets: 4 records
- Maintenance Tickets: 4 records
- Maintenance Schedule: 4 records
- Machine History: 3 records
- Production Data: 12 months

**Total**: 47 records ready untuk testing! ✅

---

## 🎯 Best Practices

### **1. Always Use Service Layer**
```javascript
// ❌ BAD - Direct import
import { dummyUsers } from '@/data/dummyData';

// ✅ GOOD - Use service
import DummyDataService from '@/services/DummyDataService';
const users = await DummyDataService.users.getAll();
```

### **2. Handle Errors**
```javascript
try {
  const user = await DummyDataService.users.create(userData);
  alert('User created successfully');
} catch (error) {
  alert(`Error: ${error.message}`);
}
```

### **3. Use Loading States**
```javascript
const [loading, setLoading] = useState(true);

const loadData = async () => {
  setLoading(true);
  try {
    const data = await DummyDataService.users.getAll();
    setUsers(data);
  } finally {
    setLoading(false);
  }
};
```

### **4. Reload After Mutations**
```javascript
const handleCreate = async (data) => {
  await DummyDataService.users.create(data);
  await loadUsers(); // Reload to show new data
};
```

---

## 🚀 Ready to Start Development!

Dengan dummy data dan service yang sudah ready, sekarang bisa langsung fokus ke:

1. ✅ **Build UI Components** - Semua data sudah tersedia
2. ✅ **Test Workflows** - CRUD operations sudah functional
3. ✅ **Focus on UX** - Tidak perlu worry tentang backend
4. ✅ **Quick Iteration** - Easy to modify data untuk testing

**Next Step**: Mulai build Master Data pages! 🎨

---

**Last Updated**: October 12, 2025  
**Version**: 1.0.0  
**Status**: Ready for UI Development

