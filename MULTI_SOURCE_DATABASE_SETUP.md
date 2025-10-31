# 🔗 Multi-Source Database Setup - Manufacturing System

## 🎯 Overview

Berdasarkan analisis codebase, sistem ini dirancang untuk menangani **multiple data sources** dari berbagai sumber. Saat ini sudah ada **40+ data sources** yang dikonfigurasi, dan sistem perlu disiapkan untuk menangani koneksi ke berbagai jenis sumber data.

---

## 📊 Current Data Source Analysis

### **🔍 Data Source Types yang Sudah Ada:**

#### **1. JSON File Sources (40+ sources)**
```javascript
// Current data sources from constant.js
export const default_source_data = [
  {
    "id": 1755265013522,
    "name": "Aktual Produksi",
    "type": "json",
    "fileName": "actual_production.json",
    "filePath": "/src/data/json/actual_production.json"
  },
  {
    "id": 1755265039617,
    "name": "Cycle Time",
    "type": "json",
    "fileName": "cycletrendtime.json",
    "filePath": "/src/data/json/cycletrendtime.json"
  },
  // ... 40+ more sources
]
```

#### **2. Data Source Categories:**
- ✅ **Production Data**: Aktual Produksi, Target vs Actual, Production Target
- ✅ **Performance Metrics**: OEE, Cycle Time, Downtime
- ✅ **Quality Data**: Produksi & Rejected Mesin, Incident Count
- ✅ **Advanced Analytics**: OFM, OFE, NRFC, NRFW, NRDAE
- ✅ **Energy Data**: Power Consumption, Electric Consumption
- ✅ **Equipment Data**: Temperature vs Vibration, Product Information
- ✅ **Calendar Data**: Production Calendar, Shift Schedules
- ✅ **Layout Data**: Machine Layout configurations

#### **3. Planned Data Source Types:**
```javascript
// From data-resources/index.jsx
<SelectContent>
  <SelectItem value="json">JSON (example only)</SelectItem>
  <SelectItem value="db" disabled>Database (soon)</SelectItem>
  <SelectItem value="csv" disabled>CSV (soon)</SelectItem>
</SelectContent>
```

---

## 🏗️ Multi-Source Database Architecture

### **📋 Required Database Tables for Multi-Source Management:**

#### **1. Data Source Registry** (`data_source_registry`)
```sql
CREATE TABLE data_source_registry (
    id SERIAL PRIMARY KEY,
    source_id VARCHAR(50) UNIQUE NOT NULL,  -- Unique identifier
    name VARCHAR(200) NOT NULL,
    description TEXT,
    source_type VARCHAR(20) NOT NULL,  -- json, database, api, artisan, csv, excel
    connection_type VARCHAR(20) NOT NULL,  -- file, database, api, artisan
    status VARCHAR(20) DEFAULT 'active',  -- active, inactive, error, maintenance
    priority INTEGER DEFAULT 1,  -- 1=high, 2=medium, 3=low
    refresh_interval INTEGER DEFAULT 300,  -- seconds
    last_sync TIMESTAMP,
    next_sync TIMESTAMP,
    error_count INTEGER DEFAULT 0,
    last_error TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **2. Data Source Connections** (`data_source_connections`)
```sql
CREATE TABLE data_source_connections (
    id SERIAL PRIMARY KEY,
    source_id INTEGER REFERENCES data_source_registry(id),
    connection_name VARCHAR(100) NOT NULL,
    connection_type VARCHAR(20) NOT NULL,  -- database, api, artisan, file
    connection_config JSON,  -- Connection parameters
    authentication_config JSON,  -- Auth credentials (encrypted)
    is_primary BOOLEAN DEFAULT false,
    is_backup BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **3. Data Source Mappings** (`data_source_mappings`)
```sql
CREATE TABLE data_source_mappings (
    id SERIAL PRIMARY KEY,
    source_id INTEGER REFERENCES data_source_registry(id),
    target_table VARCHAR(100) NOT NULL,  -- Target table in our database
    mapping_config JSON,  -- Field mappings and transformations
    sync_strategy VARCHAR(20) DEFAULT 'incremental',  -- full, incremental, realtime
    sync_frequency VARCHAR(20) DEFAULT 'hourly',  -- realtime, minute, hourly, daily
    data_retention_days INTEGER DEFAULT 365,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **4. Data Source Sync History** (`data_source_sync_history`)
```sql
CREATE TABLE data_source_sync_history (
    id SERIAL PRIMARY KEY,
    source_id INTEGER REFERENCES data_source_registry(id),
    sync_type VARCHAR(20) NOT NULL,  -- full, incremental, realtime
    sync_status VARCHAR(20) NOT NULL,  -- success, failed, partial
    records_processed INTEGER DEFAULT 0,
    records_inserted INTEGER DEFAULT 0,
    records_updated INTEGER DEFAULT 0,
    records_deleted INTEGER DEFAULT 0,
    sync_duration_ms INTEGER,
    error_message TEXT,
    sync_started_at TIMESTAMP NOT NULL,
    sync_completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **5. Data Source Templates** (`data_source_templates`)
```sql
CREATE TABLE data_source_templates (
    id SERIAL PRIMARY KEY,
    template_name VARCHAR(100) NOT NULL,
    template_type VARCHAR(20) NOT NULL,  -- database, api, artisan, file
    template_config JSON,  -- Template configuration
    is_predefined BOOLEAN DEFAULT false,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔧 Data Source Types & Configurations

### **1. JSON File Sources** (Current)
```sql
-- Example configuration
INSERT INTO data_source_connections (source_id, connection_type, connection_config) VALUES 
(1, 'file', '{
  "file_path": "/src/data/json/actual_production.json",
  "file_type": "json",
  "encoding": "utf-8",
  "auto_reload": true
}');
```

### **2. Database Sources** (Planned)
```sql
-- Example configuration
INSERT INTO data_source_connections (source_id, connection_type, connection_config) VALUES 
(2, 'database', '{
  "host": "192.168.1.100",
  "port": 5432,
  "database": "production_db",
  "schema": "public",
  "table": "production_data",
  "connection_pool_size": 10
}');
```

### **3. API Sources** (Planned)
```sql
-- Example configuration
INSERT INTO data_source_connections (source_id, connection_type, connection_config) VALUES 
(3, 'api', '{
  "base_url": "https://api.machine1.factory.com",
  "endpoint": "/api/v1/production",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer {{token}}",
    "Content-Type": "application/json"
  },
  "rate_limit": 100,
  "timeout": 30
}');
```

### **4. Artisan Command Sources** (Planned)
```sql
-- Example configuration
INSERT INTO data_source_connections (source_id, connection_type, connection_config) VALUES 
(4, 'artisan', '{
  "command": "php artisan data:sync",
  "parameters": ["--source=machine1", "--type=production"],
  "working_directory": "/var/www/factory",
  "timeout": 60
}');
```

### **5. CSV/Excel Sources** (Planned)
```sql
-- Example configuration
INSERT INTO data_source_connections (source_id, connection_type, connection_config) VALUES 
(5, 'file', '{
  "file_path": "/data/imports/production_data.csv",
  "file_type": "csv",
  "delimiter": ",",
  "has_header": true,
  "encoding": "utf-8"
}');
```

---

## 🔄 Data Synchronization Strategy

### **📊 Sync Strategies:**

#### **1. Real-time Sync** (Machine Data)
```sql
-- For critical machine data
INSERT INTO data_source_mappings (source_id, target_table, sync_strategy, sync_frequency) VALUES 
(1, 'machine_realtime_status', 'realtime', 'realtime');
```

#### **2. Incremental Sync** (Production Data)
```sql
-- For production data with timestamps
INSERT INTO data_source_mappings (source_id, target_table, sync_strategy, sync_frequency) VALUES 
(2, 'production_data', 'incremental', 'minute');
```

#### **3. Full Sync** (Master Data)
```sql
-- For master data that changes infrequently
INSERT INTO data_source_mappings (source_id, target_table, sync_strategy, sync_frequency) VALUES 
(3, 'machines', 'full', 'daily');
```

### **🔄 Sync Process Flow:**
```
1. Data Source Registry → Check sync schedule
2. Data Source Connections → Establish connection
3. Data Source Mappings → Apply transformations
4. Target Tables → Insert/Update data
5. Infolog → Log sync results
```

---

## 🛠️ Implementation Plan

### **Phase 1: Database Setup** (Week 1)
1. ✅ Create multi-source database tables
2. ✅ Setup data source registry
3. ✅ Configure connection management
4. ✅ Implement sync history tracking

### **Phase 2: Source Integration** (Week 2-3)
1. ✅ JSON file sources (already working)
2. ✅ Database connection sources
3. ✅ API integration sources
4. ✅ Artisan command sources
5. ✅ CSV/Excel file sources

### **Phase 3: Sync Engine** (Week 4)
1. ✅ Real-time sync engine
2. ✅ Incremental sync engine
3. ✅ Full sync engine
4. ✅ Error handling and retry logic
5. ✅ Performance optimization

### **Phase 4: Monitoring & Management** (Week 5)
1. ✅ Data source monitoring dashboard
2. ✅ Sync status tracking
3. ✅ Error alerting system
4. ✅ Performance metrics
5. ✅ Data quality validation

---

## 📈 Data Volume & Performance Considerations

### **Current Data Sources:**
- **JSON Files**: 40+ sources
- **Data Volume**: ~100MB+ JSON data
- **Update Frequency**: Manual/On-demand

### **Production Scale Estimates:**
- **Data Sources**: 100-500 sources
- **Data Volume**: 1GB+ per day
- **Update Frequency**: Real-time to daily
- **Concurrent Connections**: 50-200 connections

### **Performance Optimization:**
- ✅ Connection pooling
- ✅ Data caching
- ✅ Incremental sync
- ✅ Batch processing
- ✅ Error handling
- ✅ Retry mechanisms

---

## 🎯 Benefits of Multi-Source Architecture

### **✅ Flexibility:**
- Support multiple data source types
- Easy to add new sources
- Configurable sync strategies

### **✅ Reliability:**
- Multiple connection options
- Backup data sources
- Error handling and recovery

### **✅ Scalability:**
- Handle high-volume data
- Support multiple factories
- Real-time data processing

### **✅ Maintainability:**
- Centralized configuration
- Monitoring and logging
- Easy troubleshooting

---

## 🚀 Next Steps

### **Immediate Actions:**
1. ✅ **Create multi-source database tables**
2. ✅ **Implement data source registry**
3. ✅ **Setup connection management**
4. ✅ **Build sync engine**

### **Ready for Implementation:**
- ✅ Database schema designed
- ✅ Connection types defined
- ✅ Sync strategies planned
- ✅ Monitoring system ready

**Multi-source database setup sudah siap untuk implementasi!** 🎯
