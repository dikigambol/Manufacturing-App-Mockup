# 📊 Database Model Analysis & Design

## 🎯 Overview

Dokumen ini menganalisis struktur data dari codebase Manufacturing Dashboard System untuk menentukan model database yang diperlukan untuk **Phase 1B: Database Integration**.

**Current Status**: UI Development Complete (~85%)  
**Next Phase**: Database Integration (PostgreSQL/MySQL)  
**Analysis Date**: October 2025

---

## 📋 Table of Contents

1. [Master Data Models](#master-data-models)
2. [Transactional Models](#transactional-models)
3. [Dashboard & Analytics Models](#dashboard--analytics-models)
4. [Authentication & Session Models](#authentication--session-models)
5. [Configuration & System Models](#configuration--system-models)
6. [Safety & Compliance Models](#safety--compliance-models)
7. [Operator Performance Models](#operator-performance-models)
8. [Advanced Analytics Models](#advanced-analytics-models)
9. [Machine Layout Designer Models](#machine-layout-designer-models)
10. [Database Schema Recommendations](#database-schema-recommendations)
11. [Migration Strategy](#migration-strategy)

---

## 🏗️ Master Data Models

### 1. **Access Levels** (`access_levels`)
```sql
CREATE TABLE access_levels (
    id SERIAL PRIMARY KEY,
    access_level_id VARCHAR(20) UNIQUE NOT NULL,  -- ADMIN, OPERATOR, TECHNICIAN, SUPERVISOR
    name VARCHAR(100) NOT NULL,
    description TEXT,
    allowed_menus JSON,  -- Array of menu permissions
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- `access_level_id`: Unique identifier (ADMIN, OPERATOR, etc.)
- `allowed_menus`: JSON array of menu permissions
- **Sample Data**: 4 access levels (Admin, Operator, Technician, Supervisor)

### 2. **Users** (`users`)
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(20) UNIQUE NOT NULL,  -- USR001, USR002, etc.
    name VARCHAR(100) NOT NULL,
    nrp VARCHAR(20) UNIQUE NOT NULL,  -- Employee Number
    password VARCHAR(255) NOT NULL,  -- Hashed password
    access_level_id INTEGER REFERENCES access_levels(id),
    rfid VARCHAR(50),  -- RFID card number
    picture_url VARCHAR(500),
    status VARCHAR(20) DEFAULT 'active',  -- active, inactive
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- `user_id`: Unique user identifier
- `nrp`: Employee Number (National Registration Number)
- `rfid`: RFID card for physical access
- **Sample Data**: 5 users with different access levels

### 3. **Machines** (`machines`)
```sql
CREATE TABLE machines (
    id SERIAL PRIMARY KEY,
    machine_id VARCHAR(20) UNIQUE NOT NULL,  -- MCH-001, MCH-002, etc.
    name VARCHAR(200) NOT NULL,
    asset_no VARCHAR(50) UNIQUE,
    acquisition_year INTEGER,
    machine_type VARCHAR(50),  -- Assembly, Testing, Inspection, etc.
    specifications TEXT,
    status VARCHAR(20) DEFAULT 'idle',  -- running, idle, alarm, disconnected
    image_url VARCHAR(500),
    line_id VARCHAR(20),  -- line_1, line_2, line_3
    position_x INTEGER,  -- For layout designer
    position_y INTEGER,  -- For layout designer
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- `machine_id`: Unique machine identifier
- `asset_no`: Asset management number
- `position_x/y`: Coordinates for Machine Layout Designer
- **Sample Data**: 25 machines across 3 production lines

### 4. **Spareparts** (`spareparts`)
```sql
CREATE TABLE spareparts (
    id SERIAL PRIMARY KEY,
    part_number VARCHAR(50) UNIQUE NOT NULL,
    part_name VARCHAR(200) NOT NULL,
    specification TEXT,
    brand VARCHAR(100),
    type VARCHAR(100),  -- Hydraulic Component, Pneumatic Component, etc.
    stock INTEGER DEFAULT 0,
    min_stock INTEGER DEFAULT 0,
    unit VARCHAR(20) DEFAULT 'pcs',
    price DECIMAL(15,2) DEFAULT 0,
    image_url VARCHAR(500),
    machine_compatibility JSON,  -- Array of compatible machine IDs
    supplier VARCHAR(200),
    last_purchase_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- `part_number`: Unique part identifier
- `machine_compatibility`: JSON array of compatible machines
- **Sample Data**: 5 spareparts with inventory tracking

---

## 🔄 Transactional Models

### 5. **Andon Tickets** (`andon_tickets`)
```sql
CREATE TABLE andon_tickets (
    id SERIAL PRIMARY KEY,
    ticket_id VARCHAR(20) UNIQUE NOT NULL,  -- CALL-001, CALL-002, etc.
    issued_date TIMESTAMP NOT NULL,
    machine_id INTEGER REFERENCES machines(id),
    call_by_user_id INTEGER REFERENCES users(id),
    arrival_time TIMESTAMP,
    response_by_user_id INTEGER REFERENCES users(id),
    duration INTEGER,  -- Response time in minutes
    status VARCHAR(20) DEFAULT 'open',  -- open, closed, in_progress, escalated
    priority VARCHAR(20) DEFAULT 'medium',  -- critical, high, medium, low
    issue_type VARCHAR(50),  -- mechanical, electrical, quality, safety
    description TEXT,
    resolution TEXT,
    attachments JSON,  -- Array of attachment URLs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- `ticket_id`: Unique ticket identifier
- `duration`: Response time tracking
- **Sample Data**: 4 andon tickets with different statuses

### 6. **Maintenance Tickets** (`maintenance_tickets`)
```sql
CREATE TABLE maintenance_tickets (
    id SERIAL PRIMARY KEY,
    ticket_id VARCHAR(20) UNIQUE NOT NULL,  -- MTC-001, MTC-002, etc.
    maintenance_no VARCHAR(50),
    issued_date TIMESTAMP NOT NULL,
    machine_id INTEGER REFERENCES machines(id),
    type VARCHAR(20),  -- Corrective, Preventive, WO (Work Order)
    problem TEXT,
    repair TEXT,
    created_by_user_id INTEGER REFERENCES users(id),
    response_by_user_id INTEGER REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'new',  -- new, on_progress, done, cancelled
    duration INTEGER,  -- Repair duration in minutes
    priority VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- `type`: Maintenance type classification
- **Sample Data**: 4 maintenance tickets with different types

### 7. **Maintenance Schedule** (`maintenance_schedule`)
```sql
CREATE TABLE maintenance_schedule (
    id SERIAL PRIMARY KEY,
    schedule_date DATE NOT NULL,
    type VARCHAR(20),  -- Preventive, Corrective, WO
    description TEXT,
    machine_id INTEGER REFERENCES machines(id),
    assigned_to_user_id INTEGER REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'scheduled',  -- scheduled, completed, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 8. **Maintenance Parts Used** (`maintenance_parts_used`)
```sql
CREATE TABLE maintenance_parts_used (
    id SERIAL PRIMARY KEY,
    maintenance_ticket_id INTEGER REFERENCES maintenance_tickets(id),
    sparepart_id INTEGER REFERENCES spareparts(id),
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- Junction table for many-to-many relationship
- **Sample Data**: Parts used in maintenance tickets

### 9. **Machine History** (`machine_history`)
```sql
CREATE TABLE machine_history (
    id SERIAL PRIMARY KEY,
    machine_id INTEGER REFERENCES machines(id),
    last_maintenance DATE,
    next_maintenance DATE,
    total_runtime_hours INTEGER DEFAULT 0,
    total_downtime_hours INTEGER DEFAULT 0,
    oee_percentage DECIMAL(5,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'idle',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- Performance tracking data
- **Sample Data**: 3 machines with historical data

### 10. **Maintenance History Records** (`maintenance_history_records`)
```sql
CREATE TABLE maintenance_history_records (
    id SERIAL PRIMARY KEY,
    machine_history_id INTEGER REFERENCES machine_history(id),
    record_no INTEGER,
    issued_date TIMESTAMP,
    ticket_no VARCHAR(50),
    problem TEXT,
    repair TEXT,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📊 Dashboard & Analytics Models

### 11. **OEE Data** (`oee_data`)
```sql
CREATE TABLE oee_data (
    id SERIAL PRIMARY KEY,
    line_id VARCHAR(20) NOT NULL,  -- zap line_1, line_2, line_3
    date DATE NOT NULL,
    availability DECIMAL(5,2) DEFAULT 0,
    performance DECIMAL(5,2) DEFAULT 0,
    quality DECIMAL(5,2) DEFAULT 0,
    total_oee DECIMAL(5,2) DEFAULT 0,
    cycle_time DECIMAL(8,2) DEFAULT 0,
    part_ok INTEGER DEFAULT 0,
    part_ng INTEGER DEFAULT 0,
    engineering_calls INTEGER DEFAULT 0,
    maintenance_calls INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- Line-based OEE metrics
- **Sample Data**: 3 production lines with performance data

### 12. **Production Data** (`production_data`)
```sql
CREATE TABLE production_data (
    id SERIAL PRIMARY KEY,
    period VARCHAR(20) NOT NULL,  -- month, quarter, year
    period_value VARCHAR(20) NOT NULL,  -- Jan, Q1, 2025
    line_id VARCHAR(20),
    downtime INTEGER DEFAULT 0,
    target INTEGER DEFAULT 0,
    actual INTEGER DEFAULT 0,
    consumption DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- Time-series production metrics
- **Sample Data**: 12 months of production data

### 13. **Dashboards** (`dashboards`)
```sql
CREATE TABLE dashboards (
    id SERIAL PRIMARY KEY,
    id_dash INTEGER UNIQUE NOT NULL,  -- Dashboard ID from constant.js
    name VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- `id_dash`: Dashboard ID from constant.js (1-11)
- **Sample Data**: 11 dashboards (some empty, some with components)

### 14. **Dashboard Components** (`dashboard_components`)
```sql
CREATE TABLE dashboard_components (
    id SERIAL PRIMARY KEY,
    dashboard_id INTEGER REFERENCES dashboards(id_dash),
    component_id VARCHAR(50) NOT NULL,  -- Unique component identifier (i field)
    label VARCHAR(50) NOT NULL,  -- Widget, Card, Datatable
    title VARCHAR(200),
    chart_type VARCHAR(50),  -- gauge, bar, area, pie, donut, machine_layout, calendar
    id_resource_data BIGINT,  -- Reference to data source
    x_data VARCHAR(100),
    y_data JSON,  -- Array of yData objects
    value_kpi VARCHAR(100),
    max_rate VARCHAR(20),
    card_type VARCHAR(20),  -- kpi, stat
    subtitle_kpi VARCHAR(100),
    percentage_kpi VARCHAR(100),
    data_1 VARCHAR(100),
    title_1 VARCHAR(100),
    data_2 VARCHAR(100),
    title_2 VARCHAR(100),
    displayed_fields JSON,  -- Array of displayed fields for datatables
    threshold_lines JSON,  -- Array of threshold line configurations
    variant VARCHAR(20),  -- compact, expanded
    text_size VARCHAR(20),  -- large, medium, small
    props JSON,  -- Additional component properties
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- `component_id`: Unique identifier (i field from constant.js)
- `y_data`: JSON array of chart data configuration
- **Sample Data**: Multiple components across different dashboards

### 15. **Dashboard Layouts** (`dashboard_layouts`)
```sql
CREATE TABLE dashboard_layouts (
    id SERIAL PRIMARY KEY,
    dashboard_id INTEGER REFERENCES dashboards(id_dash),
    component_id VARCHAR(50) NOT NULL,  -- References dashboard_components.component_id
    w INTEGER NOT NULL,  -- Width in grid units
    h INTEGER NOT NULL,  -- Height in grid units
    x INTEGER NOT NULL,  -- X position
    y INTEGER NOT NULL,  -- Y position
    i VARCHAR(50) NOT NULL,  -- Component identifier
    static BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- React Grid Layout configuration
- **Sample Data**: Layout data for each dashboard component

### 16. **Data Sources** (`data_sources`)
```sql
CREATE TABLE data_sources (
    id SERIAL PRIMARY KEY,
    source_id BIGINT UNIQUE NOT NULL,  -- ID from constant.js default_source_data
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) DEFAULT 'json',  -- json, api, database
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- `source_id`: Unique ID from constant.js (e.g., 1755265050554)
- **Sample Data**: 40+ data sources for charts and widgets

### 17. **Chart Colors** (`chart_colors`)
```sql
CREATE TABLE chart_colors (
    id SERIAL PRIMARY KEY,
    color_code VARCHAR(7) UNIQUE NOT NULL,  -- Hex color code
    color_name VARCHAR(100),
    category VARCHAR(50),  -- safety, contrast, warning, etc.
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields**:
- Color palette for charts and UI
- **Sample Data**: 16 predefined colors from constant.js

---

## 🔐 Authentication & Session Models

### 15. **User Sessions** (`user_sessions`)
```sql
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    session_token VARCHAR(255) UNIQUE NOT NULL,
    selected_line VARCHAR(20),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 16. **Login Logs** (`login_logs`)
```sql
CREATE TABLE login_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    logout_time TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    status VARCHAR(20) DEFAULT 'success'  -- success, failed, expired
);
```

---

## ⚙️ Configuration & System Models

### 18. **System Configuration** (`system_config`)
```sql
CREATE TABLE system_config (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT,
    config_type VARCHAR(50),  -- string, number, boolean, json
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 19. **File Storage** (`file_storage`)
```sql
CREATE TABLE file_storage (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(100),
    file_size INTEGER,
    uploaded_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 20. **Safety & Compliance Models**

#### **Safety Incidents** (`safety_incidents`)
```sql
CREATE TABLE safety_incidents (
    id SERIAL PRIMARY KEY,
    incident_id VARCHAR(20) UNIQUE NOT NULL,
    incident_date DATE NOT NULL,
    incident_type VARCHAR(50),  -- safety, environmental, quality
    severity VARCHAR(20),  -- low, medium, high, critical
    description TEXT,
    location VARCHAR(200),
    reported_by INTEGER REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'reported',  -- reported, investigating, resolved
    resolution TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Safety Checklists** (`safety_checklists`)
```sql
CREATE TABLE safety_checklists (
    id SERIAL PRIMARY KEY,
    checklist_date DATE NOT NULL,
    checklist_type VARCHAR(50),  -- daily, weekly, monthly
    line_id VARCHAR(20),
    checked_by INTEGER REFERENCES users(id),
    items JSON,  -- Array of checklist items with status
    overall_status VARCHAR(20),  -- pass, fail, partial
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **SOP Compliance** (`sop_compliance`)
```sql
CREATE TABLE sop_compliance (
    id SERIAL PRIMARY KEY,
    sop_id VARCHAR(20) NOT NULL,
    sop_name VARCHAR(200) NOT NULL,
    compliance_date DATE NOT NULL,
    compliance_percentage DECIMAL(5,2) DEFAULT 0,
    total_sop INTEGER DEFAULT 0,
    fulfilled_sop INTEGER DEFAULT 0,
    line_id VARCHAR(20),
    reviewed_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 21. **Operator Performance Models**

#### **Operator Efficiency** (`operator_efficiency`)
```sql
CREATE TABLE operator_efficiency (
    id SERIAL PRIMARY KEY,
    operator_id INTEGER REFERENCES users(id),
    shift_date DATE NOT NULL,
    shift VARCHAR(20),  -- morning, afternoon, night
    output_unit INTEGER DEFAULT 0,
    work_hours DECIMAL(4,2) DEFAULT 0,
    efficiency_percentage DECIMAL(5,2) DEFAULT 0,
    reject_rate_percentage DECIMAL(5,2) DEFAULT 0,
    line_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Shift Productivity** (`shift_productivity`)
```sql
CREATE TABLE shift_productivity (
    id SERIAL PRIMARY KEY,
    shift_date DATE NOT NULL,
    shift VARCHAR(20),  -- morning, afternoon, night
    production_unit INTEGER DEFAULT 0,
    reject_unit INTEGER DEFAULT 0,
    line_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 22. **Advanced Analytics Models**

#### **OFM Data** (`ofm_data`) - Overall Factory Management
```sql
CREATE TABLE ofm_data (
    id SERIAL PRIMARY KEY,
    period VARCHAR(20) NOT NULL,  -- monthly, quarterly, yearly
    period_value VARCHAR(20) NOT NULL,  -- Jan, Q1, 2025
    ofm_value DECIMAL(10,2) DEFAULT 0,
    line_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **OFE Data** (`ofe_data`) - Overall Factory Efficiency
```sql
CREATE TABLE ofe_data (
    id SERIAL PRIMARY KEY,
    period VARCHAR(20) NOT NULL,
    period_value VARCHAR(20) NOT NULL,
    ofe_value DECIMAL(10,2) DEFAULT 0,
    line_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **NRFC Data** (`nrfc_data`) - Non-Running Factory Components
```sql
CREATE TABLE nrfc_data (
    id SERIAL PRIMARY KEY,
    period VARCHAR(20) NOT NULL,
    period_value VARCHAR(20) NOT NULL,
    nrfc_value DECIMAL(10,2) DEFAULT 0,
    line_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **NRFW Data** (`nrfw_data`) - Non-Running Factory Workers
```sql
CREATE TABLE nrfw_data (
    id SERIAL PRIMARY KEY,
    period VARCHAR(20) NOT NULL,
    period_value VARCHAR(20) NOT NULL,
    nrfw_value DECIMAL(10,2) DEFAULT 0,
    line_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **NRDAE Data** (`nrdae_data`) - Non-Running Data Acquisition Equipment
```sql
CREATE TABLE nrdae_data (
    id SERIAL PRIMARY KEY,
    period VARCHAR(20) NOT NULL,
    period_value VARCHAR(20) NOT NULL,
    nrdae_value DECIMAL(10,2) DEFAULT 0,
    line_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Power Consumption** (`power_consumption`)
```sql
CREATE TABLE power_consumption (
    id SERIAL PRIMARY KEY,
    period VARCHAR(20) NOT NULL,
    period_value VARCHAR(20) NOT NULL,
    power_value DECIMAL(10,2) DEFAULT 0,  -- in KWH
    line_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Product Information** (`product_info`)
```sql
CREATE TABLE product_info (
    id SERIAL PRIMARY KEY,
    period VARCHAR(20) NOT NULL,
    period_value VARCHAR(20) NOT NULL,
    production_value DECIMAL(10,2) DEFAULT 0,
    upper_threshold DECIMAL(10,2) DEFAULT 0,
    lower_threshold DECIMAL(10,2) DEFAULT 0,
    line_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Temperature Vibration** (`temperature_vibration`)
```sql
CREATE TABLE temperature_vibration (
    id SERIAL PRIMARY KEY,
    period VARCHAR(20) NOT NULL,
    period_value VARCHAR(20) NOT NULL,
    temperature_value DECIMAL(8,2) DEFAULT 0,
    vibration_value DECIMAL(8,2) DEFAULT 0,
    machine_id INTEGER REFERENCES machines(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 23. **Machine Layout Designer Models**

#### **Layout Templates** (`layout_templates`)
```sql
CREATE TABLE layout_templates (
    id SERIAL PRIMARY KEY,
    template_id VARCHAR(50) UNIQUE NOT NULL,  -- template_linear, template_cellular, etc.
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(20) DEFAULT 'predefined',  -- predefined, custom
    layout_type VARCHAR(50),  -- linear, cellular, island, custom
    thumbnail VARCHAR(10),  -- Emoji thumbnail
    line_id VARCHAR(20),  -- Associated production line
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Layout Template Nodes** (`layout_template_nodes`)
```sql
CREATE TABLE layout_template_nodes (
    id SERIAL PRIMARY KEY,
    template_id INTEGER REFERENCES layout_templates(id),
    node_id VARCHAR(50) NOT NULL,  -- node_1, node_2, etc.
    node_type VARCHAR(20) DEFAULT 'machine',
    position_x INTEGER NOT NULL,
    position_y INTEGER NOT NULL,
    machine_id VARCHAR(20),  -- References machines.machine_id
    machine_name VARCHAR(200),
    machine_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'idle',
    show_oee BOOLEAN DEFAULT false,
    needs_maintenance BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Layout Template Edges** (`layout_template_edges`)
```sql
CREATE TABLE layout_template_edges (
    id SERIAL PRIMARY KEY,
    template_id INTEGER REFERENCES layout_templates(id),
    edge_id VARCHAR(50) NOT NULL,  -- e1-2, e2-3, etc.
    source_node_id VARCHAR(50) NOT NULL,  -- References node_id
    target_node_id VARCHAR(50) NOT NULL,  -- References node_id
    is_animated BOOLEAN DEFAULT false,
    edge_type VARCHAR(20) DEFAULT 'default',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Saved Layouts** (`saved_layouts`)
```sql
CREATE TABLE saved_layouts (
    id SERIAL PRIMARY KEY,
    layout_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    line_id VARCHAR(20) NOT NULL,
    layout_data JSON,  -- Complete layout configuration
    metadata JSON,  -- Additional metadata (created, nodeCount, edgeCount)
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Layout History** (`layout_history`)
```sql
CREATE TABLE layout_history (
    id SERIAL PRIMARY KEY,
    layout_id INTEGER REFERENCES saved_layouts(id),
    version INTEGER NOT NULL,
    layout_data JSON,  -- Snapshot of layout at this version
    change_description TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🗄️ Database Schema Recommendations

### **Primary Database**: PostgreSQL
**Reasons**:
- Excellent JSON support for flexible data structures
- Advanced indexing capabilities
- Strong ACID compliance
- Excellent performance for manufacturing data

### **Alternative**: MySQL 8.0+
**Reasons**:
- Good JSON support
- Widely adopted
- Good performance
- Cost-effective

### **Key Design Decisions**:

1. **JSON Fields**: Used for flexible data like `allowed_menus`, `machine_compatibility`, `attachments`
2. **Foreign Keys**: Proper relationships for data integrity
3. **Indexes**: Essential for performance on frequently queried fields
4. **Timestamps**: Audit trail for all transactional data
5. **Status Fields**: Standardized status values across all modules

---

## 🚀 Migration Strategy

### **Phase 1B Implementation Plan**:

#### **Week 1: Database Setup**
1. **Database Creation**
   - Setup PostgreSQL/MySQL database
   - Create initial schema with all tables
   - Setup indexes and constraints

2. **Data Migration**
   - Migrate dummy data to database
   - Create seed data scripts
   - Setup initial admin user

#### **Week 2: API Development**
1. **REST API Endpoints**
   - Master Data CRUD operations
   - Transactional data operations
   - Dashboard data endpoints

2. **Authentication Integration**
   - JWT token implementation
   - Session management
   - Permission checking

#### **Week 3: Frontend Integration**
1. **Service Layer Updates**
   - Replace DummyDataService with API calls
   - Error handling and loading states
   - Offline capability maintenance

2. **Testing & Validation**
   - Unit testing for API endpoints
   - Integration testing
   - Performance optimization

---

## 📈 Data Volume Estimates

### **Current Data Volume**:
- **Users**: ~5 records
- **Machines**: ~25 records  
- **Spareparts**: ~5 records
- **Andon Tickets**: ~4 records
- **Maintenance Tickets**: ~4 records
- **OEE Data**: ~3 production lines
- **Production Data**: ~12 months historical
- **Dashboards**: 11 dashboard configurations
- **Dashboard Components**: ~50+ components across dashboards
- **Data Sources**: 40+ data source configurations
- **Chart Colors**: 16 predefined colors
- **Layout Templates**: 3 predefined templates (Linear, Cellular, Island)
- **Machine Layout Data**: Position data for 25 machines

### **Production Scale Estimates**:
- **Users**: 100-500 employees
- **Machines**: 50-200 machines
- **Spareparts**: 100-1000 parts
- **Andon Tickets**: 1000+ per month
- **Maintenance Tickets**: 500+ per month
- **OEE Data**: Daily records per line
- **Production Data**: Daily/hourly records
- **Dashboard Components**: 100-500 components
- **Safety Incidents**: 50-200 per month
- **Operator Efficiency**: Daily records per operator
- **Advanced Analytics**: Monthly/quarterly/yearly aggregations
- **Layout Templates**: 10-50 custom templates per line
- **Saved Layouts**: 5-20 saved layouts per production line
- **Layout History**: Version history for each saved layout

---

## 🔧 Technical Considerations

### **Performance Optimization**:
1. **Indexing Strategy**:
   - Primary keys (auto-indexed)
   - Foreign keys
   - Status fields
   - Date/time fields
   - Machine ID, User ID

2. **Query Optimization**:
   - Dashboard queries with proper joins
   - Pagination for large datasets
   - Caching for frequently accessed data

3. **Data Archiving**:
   - Historical data archiving strategy
   - Partitioning for large tables
   - Backup and recovery procedures

### **Security Considerations**:
1. **Data Encryption**:
   - Password hashing (bcrypt)
   - Sensitive data encryption
   - API token security

2. **Access Control**:
   - Role-based permissions
   - API endpoint security
   - Audit logging

---

## ✅ Implementation Checklist

### **Database Setup**:
- [ ] Create database schema
- [ ] Setup indexes and constraints
- [ ] Create initial admin user
- [ ] Migrate dummy data

### **API Development**:
- [ ] Master Data endpoints
- [ ] Transactional endpoints
- [ ] Dashboard data endpoints
- [ ] Authentication endpoints
- [ ] File upload endpoints

### **Frontend Integration**:
- [ ] Update DummyDataService
- [ ] Add error handling
- [ ] Implement loading states
- [ ] Add offline capability
- [ ] Update authentication flow

### **Testing & Deployment**:
- [ ] Unit tests for API
- [ ] Integration tests
- [ ] Performance testing
- [ ] Security testing
- [ ] Production deployment

---

## 📝 Next Steps

1. **Immediate Actions**:
   - Setup PostgreSQL database
   - Create database schema
   - Begin API development

2. **Week 1 Deliverables**:
   - Complete database setup
   - Basic CRUD operations for Master Data
   - Authentication system integration

3. **Week 2 Deliverables**:
   - Complete transactional APIs
   - Dashboard data endpoints
   - Frontend integration

4. **Success Criteria**:
   - All dummy data replaced with database queries
   - Authentication working with database
   - Performance acceptable for production use
   - Data integrity maintained

---

**Document Version**: 1.0  
**Last Updated**: October 2025  
**Status**: Ready for Implementation  
**Next Phase**: Phase 1C - Machine Integration (API sync)
