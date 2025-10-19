# 🏗️ Database Schema Building - Manufacturing System

## 🎯 Overview

Dokumen ini menyinkronkan dan mengintegrasikan ketiga analisis database:
1. **Database Model Analysis** - Struktur data dari codebase
2. **Multi-Source Database Setup** - Manajemen multiple data sources
3. **Assembly Manufacturing Data Sources** - Data sources khusus manufacturing

---

## 📊 Complete Database Schema Architecture

### **🗄️ Database Structure Overview**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              MANUFACTURING DATABASE                              │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                        CORE SYSTEM TABLES                              │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Master Data   │  │   Transactional │  │   Dashboard & Analytics │ │   │
│  │  │   (8 tables)    │  │   (8 tables)    │  │   (8 tables)            │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  │                                                                         │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Authentication│  │   Configuration │  │   Safety & Compliance   │ │   │
│  │  │   (2 tables)    │  │   (2 tables)    │  │   (3 tables)            │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  │                                                                         │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Operator      │  │   Advanced      │  │   Layout Designer       │ │   │
│  │  │   Performance   │  │   Analytics     │  │   (5 tables)            │ │   │
│  │  │   (2 tables)    │  │   (8 tables)    │  └─────────────────────────┘ │   │
│  │  └─────────────────┘  └─────────────────┘                             │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    MULTI-SOURCE MANAGEMENT TABLES                      │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Data Source   │  │   Connections   │  │   Mappings & History    │ │   │
│  │  │   Registry      │  │   (2 tables)    │  │   (3 tables)            │ │   │
│  │  │   (1 table)     │  └─────────────────┘  └─────────────────────────┘ │   │
│  │  └─────────────────┘                                                 │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    MANUFACTURING DATA TABLES                           │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Machine Data  │  │   Production    │  │   Quality & Analytics   │ │   │
│  │  │   (5 tables)    │  │   Data (3 tables│  │   (4 tables)            │ │   │
│  │  └─────────────────┘  │   )             │  └─────────────────────────┘ │   │
│  │                      └─────────────────┘                             │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Operator &    │  │   Utility &     │  │   Material &            │ │   │
│  │  │   Safety Data   │  │   Environmental │  │   Process Data          │ │   │
│  │  │   (4 tables)    │  │   (4 tables)    │  │   (4 tables)            │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Complete Database Schema

### **📋 1. CORE SYSTEM TABLES (40 tables)**

#### **🔧 Master Data Tables (8 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 1 | `access_levels` | `id` | Master Data | User permission levels management | `access_level_id`, `name`, `allowed_menus` | **Flow**: Admin creates access levels → Assigns menu permissions → Users inherit permissions. **Usage**: Controls dashboard access, menu visibility, feature restrictions |
| 2 | `users` | `id` | Master Data | Employee data and authentication | `user_id`, `nrp`, `rfid`, `access_level_id` | **Flow**: HR creates user → Assigns access level → User gets RFID card → Can login system. **Usage**: Authentication, RFID tracking, operator identification, performance tracking |
| 3 | `machines` | `id` | Master Data | Machine master data and specifications | `machine_id`, `asset_no`, `machine_type`, `position_x/y` | **Flow**: Machine installed → Added to system → Configured in layout designer → Connected to sensors. **Usage**: Layout designer positioning, maintenance tracking, performance monitoring, asset management |
| 4 | `spareparts` | `id` | Master Data | Spare parts inventory management | `part_number`, `stock`, `machine_compatibility` | **Flow**: Parts received → Added to inventory → Stock tracked → Used in maintenance → Reorder when low. **Usage**: Maintenance planning, inventory alerts, cost tracking, supplier management |
| 5 | `production_lines` | `id` | Master Data | Production line configurations | `line_id`, `capacity_per_hour` | **Flow**: Line setup → Capacity defined → Machines assigned → Production scheduled. **Usage**: Production planning, capacity management, line performance, shift scheduling |
| 6 | `suppliers` | `id` | Master Data | Supplier information and contacts | `supplier_id`, `contact_person`, `address` | **Flow**: Supplier registered → Contact info added → Parts linked → Orders placed → Performance tracked. **Usage**: Purchase orders, supplier evaluation, contact management, procurement |
| 7 | `products` | `id` | Master Data | Product master data and specifications | `product_id`, `product_type`, `specifications` | **Flow**: Product designed → Specs defined → BOM created → Production orders generated. **Usage**: Production planning, quality standards, BOM management, customer orders |
| 8 | `bill_of_materials` | `id` | Master Data | Bill of materials for products | `bom_id`, `product_id`, `component_id`, `quantity` | **Flow**: Product created → Components listed → Quantities defined → Material requirements calculated. **Usage**: Material planning, cost calculation, production orders, inventory requirements |

**💡 SQL Code**: Available in `DATABASE_MODEL_ANALYSIS.md` - Master Data Models section

#### **🔄 Transactional Tables (8 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 9 | `andon_tickets` | `id` | Transactional | Issue tracking and response management | `ticket_id`, `machine_id`, `duration`, `status` | **Flow**: Operator encounters issue → Taps Andon button → Ticket created → Technician responds → Issue resolved → Ticket closed. **Usage**: Real-time issue tracking, response time monitoring, problem escalation, performance metrics |
| 10 | `maintenance_tickets` | `id` | Transactional | Maintenance work orders and repairs | `ticket_id`, `type`, `problem`, `repair`, `status` | **Flow**: Issue detected → Maintenance ticket created → Technician assigned → Repair performed → Parts used → Ticket completed. **Usage**: Maintenance tracking, repair history, cost analysis, technician performance |
| 11 | `maintenance_schedule` | `id` | Transactional | Preventive maintenance scheduling | `schedule_date`, `type`, `machine_id`, `status` | **Flow**: Schedule created → Technician assigned → Maintenance performed → Status updated → Next schedule planned. **Usage**: Preventive maintenance planning, resource allocation, compliance tracking, machine reliability |
| 12 | `maintenance_parts_used` | `id` | Transactional | Parts usage in maintenance | `maintenance_ticket_id`, `sparepart_id`, `quantity` | **Flow**: Maintenance ticket → Parts selected → Quantity used → Inventory updated → Cost calculated. **Usage**: Parts consumption tracking, cost analysis, inventory management, maintenance budgeting |
| 13 | `machine_history` | `id` | Transactional | Machine performance and maintenance history | `machine_id`, `total_runtime_hours`, `oee_percentage` | **Flow**: Machine runs → Runtime tracked → Performance calculated → Maintenance scheduled → History updated. **Usage**: Machine performance analysis, maintenance planning, OEE calculation, reliability tracking |
| 14 | `maintenance_history_records` | `id` | Transactional | Detailed maintenance records | `machine_history_id`, `record_no`, `ticket_no` | **Flow**: Maintenance performed → Record created → Details logged → History maintained → Reports generated. **Usage**: Maintenance documentation, compliance reporting, trend analysis, warranty tracking |
| 15 | `production_orders` | `id` | Transactional | Production order management | `order_id`, `product_id`, `quantity`, `status` | **Flow**: Customer order → Production order created → Materials allocated → Work orders generated → Production started. **Usage**: Production planning, order tracking, material planning, delivery scheduling |
| 16 | `work_orders` | `id` | Transactional | Work order execution tracking | `work_order_id`, `production_order_id`, `operator_id` | **Flow**: Production order → Work orders created → Operators assigned → Work performed → Status updated. **Usage**: Operator assignment, work tracking, productivity measurement, performance analysis |

**💡 SQL Code**: Available in `DATABASE_MODEL_ANALYSIS.md` - Transactional Models section

#### **📊 Dashboard & Analytics Tables (8 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 17 | `dashboards` | `id` | Dashboard | Dashboard configurations and metadata | `id_dash`, `name`, `is_active`, `created_by` | **Flow**: Admin creates dashboard → Configures components → Sets layout → Users access dashboard. **Usage**: User interface management, role-based dashboards, customization, monitoring views |
| 18 | `dashboard_components` | `id` | Dashboard | Widget and component configurations | `component_id`, `chart_type`, `y_data`, `props` | **Flow**: Component created → Data source linked → Chart type selected → Properties configured → Added to dashboard. **Usage**: Chart configuration, data visualization, widget management, KPI display |
| 19 | `dashboard_layouts` | `id` | Dashboard | React Grid Layout positions and sizing | `component_id`, `w`, `h`, `x`, `y`, `i` | **Flow**: Component positioned → Size defined → Layout saved → User drags/resizes → Layout updated. **Usage**: UI layout management, responsive design, user customization, component positioning |
| 20 | `data_sources` | `id` | Dashboard | Data source configurations for charts | `source_id`, `name`, `type`, `file_path` | **Flow**: Data source registered → Connection configured → Data mapped → Charts linked → Data refreshed. **Usage**: Data integration, chart data binding, multi-source management, real-time updates |
| 21 | `chart_colors` | `id` | Dashboard | Color palette for charts and UI | `color_code`, `color_name`, `category` | **Flow**: Colors defined → Categories assigned → Charts use colors → UI themed → Brand consistency maintained. **Usage**: UI theming, chart styling, brand consistency, visual hierarchy |
| 22 | `oee_data` | `id` | Analytics | OEE metrics and performance data | `line_id`, `availability`, `performance`, `quality` | **Flow**: Machine data collected → OEE calculated → Performance analyzed → Dashboard updated → Reports generated. **Usage**: Performance monitoring, efficiency tracking, bottleneck identification, improvement planning |
| 23 | `production_data` | `id` | Analytics | Production metrics and targets | `period`, `period_value`, `target`, `actual` | **Flow**: Production runs → Data collected → Targets compared → Variance calculated → Performance reported. **Usage**: Production monitoring, target tracking, variance analysis, performance reporting |
| 24 | `cycle_time_data` | `id` | Analytics | Cycle time measurements | `period`, `cycle_time_value`, `machine_id` | **Flow**: Machine cycles → Time measured → Data recorded → Trends analyzed → Optimization identified. **Usage**: Performance optimization, cycle time analysis, efficiency improvement, capacity planning |

**💡 SQL Code**: Available in `DATABASE_MODEL_ANALYSIS.md` - Dashboard & Analytics Models section

#### **🔐 Authentication & Session Tables (2 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 25 | `user_sessions` | `id` | Authentication | User session management and tracking | `user_id`, `session_token`, `selected_line`, `expires_at` | **Flow**: User logs in → Session created → Line selected → Session active → Auto logout when expired. **Usage**: User authentication, session security, line selection tracking, access control |
| 26 | `login_logs` | `id` | Authentication | User login/logout tracking and audit | `user_id`, `login_time`, `logout_time`, `ip_address` | **Flow**: User attempts login → Log entry created → Success/failure recorded → Logout logged → Audit trail maintained. **Usage**: Security monitoring, access tracking, audit compliance, suspicious activity detection |

**💡 SQL Code**: Available in `DATABASE_MODEL_ANALYSIS.md` - Authentication & Session Models section

#### **⚙️ Configuration & System Tables (2 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 27 | `system_config` | `id` | Configuration | System configuration settings | `config_key`, `config_value`, `config_type` | **Flow**: System parameter set → Configuration saved → System uses config → Value updated → Changes applied. **Usage**: System settings, feature toggles, parameter management, environment configuration |
| 28 | `file_storage` | `id` | Configuration | File upload and storage management | `file_name`, `file_path`, `file_type`, `uploaded_by` | **Flow**: File uploaded → Metadata stored → File saved → Access controlled → File retrieved. **Usage**: Document management, image storage, file sharing, version control, backup management |

**💡 SQL Code**: Available in `DATABASE_MODEL_ANALYSIS.md` - Configuration & System Models section

#### **🛡️ Safety & Compliance Tables (3 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 29 | `safety_incidents` | `id` | Safety | Safety incident reporting and tracking | `incident_id`, `incident_type`, `severity`, `status` | **Flow**: Incident occurs → Report filed → Investigation started → Resolution implemented → Status closed. **Usage**: Safety monitoring, incident tracking, compliance reporting, risk management |
| 30 | `safety_checklists` | `id` | Safety | Safety checklist compliance tracking | `checklist_date`, `checklist_type`, `items`, `overall_status` | **Flow**: Checklist scheduled → Items checked → Status recorded → Compliance verified → Report generated. **Usage**: Safety compliance, routine checks, audit preparation, safety culture monitoring |
| 31 | `sop_compliance` | `id` | Safety | Standard Operating Procedure compliance | `sop_id`, `sop_name`, `compliance_percentage`, `fulfilled_sop` | **Flow**: SOP defined → Compliance measured → Performance tracked → Training scheduled → Compliance improved. **Usage**: Procedure adherence, training management, compliance monitoring, quality assurance |

**💡 SQL Code**: Available in `DATABASE_MODEL_ANALYSIS.md` - Safety & Compliance Models section

#### **👥 Operator Performance Tables (2 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 32 | `operator_efficiency` | `id` | Performance | Operator performance and efficiency tracking | `operator_id`, `shift_date`, `efficiency_percentage`, `reject_rate` | **Flow**: Operator works shift → Performance measured → Efficiency calculated → Data recorded → Performance reviewed. **Usage**: Operator evaluation, training needs, performance improvement, incentive programs |
| 33 | `shift_productivity` | `shift_date`, `shift`, `production_unit`, `reject_unit` | Performance | Shift-based productivity metrics | `shift_date`, `shift`, `production_unit`, `reject_unit` | **Flow**: Shift starts → Production tracked → Output measured → Quality checked → Productivity calculated. **Usage**: Shift performance comparison, productivity analysis, resource planning, efficiency optimization |

**💡 SQL Code**: Available in `DATABASE_MODEL_ANALYSIS.md` - Operator Performance Models section

#### **📈 Advanced Analytics Tables (8 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 34 | `ofm_data` | `id` | Analytics | Overall Factory Maintenance metrics | `period`, `period_value`, `ofm_value`, `line_id` | **Flow**: Maintenance data collected → OFM calculated → Performance analyzed → Trends identified → Improvement planned. **Usage**: Maintenance optimization, resource allocation, preventive planning, cost reduction |
| 35 | `ofe_data` | `id` | Analytics | Overall Factory Efficiency metrics | `period`, `period_value`, `ofe_value`, `line_id` | **Flow**: Factory operations monitored → Efficiency measured → OFE calculated → Performance benchmarked → Optimization identified. **Usage**: Factory performance, efficiency tracking, benchmarking, continuous improvement |
| 36 | `nrfc_data` | `id` | Analytics | Non-Running Factory Components data | `period`, `period_value`, `nrfc_value`, `line_id` | **Flow**: Component status tracked → Non-running time measured → NRFC calculated → Utilization analyzed → Optimization planned. **Usage**: Component utilization, downtime analysis, capacity optimization, investment planning |
| 37 | `nrfw_data` | `id` | Analytics | Non-Running Factory Workers data | `period`, `period_value`, `nrfw_value`, `line_id` | **Flow**: Worker activity tracked → Non-productive time measured → NRFW calculated → Productivity analyzed → Training scheduled. **Usage**: Workforce optimization, productivity analysis, training needs, resource allocation |
| 38 | `nrdae_data` | `id` | Analytics | Non-Running Data Acquisition Equipment | `period`, `period_value`, `nrdae_value`, `line_id` | **Flow**: Equipment status monitored → Non-running time tracked → NRDAE calculated → Utilization analyzed → Maintenance scheduled. **Usage**: Equipment utilization, maintenance planning, investment optimization, performance monitoring |
| 39 | `power_consumption` | `id` | Analytics | Power consumption monitoring data | `period`, `period_value`, `power_value`, `line_id` | **Flow**: Power usage measured → Consumption tracked → Trends analyzed → Efficiency calculated → Optimization planned. **Usage**: Energy management, cost optimization, efficiency improvement, sustainability tracking |
| 40 | `product_info` | `id` | Analytics | Product information and thresholds | `period`, `production_value`, `upper_threshold`, `lower_threshold` | **Flow**: Production data collected → Thresholds defined → Performance compared → Alerts generated → Quality maintained. **Usage**: Quality control, performance monitoring, alert management, process optimization |
| 41 | `temperature_vibration` | `id` | Analytics | Temperature and vibration monitoring | `period`, `temperature_value`, `vibration_value`, `machine_id` | **Flow**: Sensors collect data → Temperature/vibration measured → Thresholds checked → Alerts generated → Maintenance scheduled. **Usage**: Predictive maintenance, equipment monitoring, failure prevention, condition-based maintenance |

**💡 SQL Code**: Available in `DATABASE_MODEL_ANALYSIS.md` - Advanced Analytics Models section

#### **🎨 Machine Layout Designer Tables (5 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 42 | `layout_templates` | `id` | Layout Designer | Layout template configurations | `template_id`, `name`, `layout_type`, `thumbnail` | **Flow**: Template created → Machines positioned → Layout saved → Template used → New layouts based on template. **Usage**: Layout standardization, quick setup, best practices, design consistency |
| 43 | `layout_template_nodes` | `id` | Layout Designer | Machine nodes in layout templates | `template_id`, `node_id`, `position_x/y`, `machine_id` | **Flow**: Template selected → Machines added → Positions set → Nodes configured → Layout visualized. **Usage**: Machine positioning, layout design, visual planning, space optimization |
| 44 | `layout_template_edges` | `id` | Layout Designer | Connections between nodes in templates | `template_id`, `edge_id`, `source_node_id`, `target_node_id` | **Flow**: Machines connected → Edges defined → Flow paths created → Material flow visualized → Layout optimized. **Usage**: Flow visualization, connection mapping, material flow planning, layout optimization |
| 45 | `saved_layouts` | `id` | Layout Designer | User saved layout configurations | `layout_id`, `name`, `line_id`, `layout_data`, `metadata` | **Flow**: Layout designed → Configuration saved → Layout used → Changes made → New version saved. **Usage**: Layout management, version control, user customization, layout sharing |
| 46 | `layout_history` | `id` | Layout Designer | Version history for saved layouts | `layout_id`, `version`, `layout_data`, `change_description` | **Flow**: Layout modified → Change tracked → Version created → History maintained → Rollback available. **Usage**: Change tracking, version control, audit trail, rollback capability |

**💡 SQL Code**: Available in `DATABASE_MODEL_ANALYSIS.md` - Machine Layout Designer Models section

---

### **📋 2. MULTI-SOURCE MANAGEMENT TABLES (6 tables)**

#### **🔗 Data Source Management Tables**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 47 | `data_source_registry` | `id` | Multi-Source | Registry of all data sources | `source_id`, `name`, `source_type`, `connection_type`, `status` | **Flow**: Data source identified → Registry entry created → Configuration added → Status monitored → Alerts generated. **Usage**: Source management, connection monitoring, status tracking, integration planning |
| 48 | `data_source_connections` | `id` | Multi-Source | Connection configurations for data sources | `source_id`, `connection_name`, `connection_type`, `connection_config` | **Flow**: Source registered → Connection configured → Credentials set → Connection tested → Status active. **Usage**: Connection management, authentication, configuration storage, connection pooling |
| 49 | `data_source_mappings` | `id` | Multi-Source | Field mappings and transformations | `source_id`, `target_table`, `mapping_config`, `sync_strategy` | **Flow**: Source connected → Fields mapped → Transformations defined → Sync strategy set → Mapping tested. **Usage**: Data transformation, field mapping, sync configuration, data validation |
| 50 | `data_source_sync_history` | `id` | Multi-Source | Sync operation tracking and history | `source_id`, `sync_type`, `sync_status`, `records_processed` | **Flow**: Sync started → Progress tracked → Records processed → Status updated → History logged. **Usage**: Sync monitoring, performance tracking, error analysis, audit trail |
| 51 | `data_source_templates` | `id` | Multi-Source | Predefined data source templates | `template_name`, `template_type`, `template_config`, `is_predefined` | **Flow**: Template created → Configuration defined → Template saved → New sources use template → Configuration applied. **Usage**: Quick setup, standardization, best practices, configuration reuse |
| 52 | `data_source_alerts` | `id` | Multi-Source | Data source monitoring and alerts | `source_id`, `alert_type`, `alert_message`, `severity`, `status` | **Flow**: Issue detected → Alert generated → Notification sent → Issue resolved → Alert closed. **Usage**: Issue monitoring, alert management, notification system, problem resolution |

**💡 SQL Code**: Available in `MULTI_SOURCE_DATABASE_SETUP.md` - Multi-Source Database Architecture section

---

### **📋 3. MANUFACTURING DATA TABLES (24 tables)**

#### **🔧 Machine & Equipment Data Tables (5 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 53 | `machine_realtime_status` | `id` | Manufacturing | Real-time machine status and parameters | `machine_id`, `status`, `temperature`, `pressure`, `speed` | **Flow**: Machine sensors collect data → Status updated → Parameters monitored → Alerts generated → Dashboard updated. **Usage**: Real-time monitoring, status tracking, parameter monitoring, alert generation |
| 54 | `machine_production_data` | `id` | Manufacturing | Daily production metrics per machine | `machine_id`, `production_date`, `shift`, `total_products`, `oee_percentage` | **Flow**: Machine produces parts → Production tracked → Metrics calculated → Data recorded → Performance analyzed. **Usage**: Production monitoring, OEE calculation, performance analysis, shift reporting |
| 55 | `machine_sensor_data` | `id` | Manufacturing | Sensor readings and alert thresholds | `machine_id`, `sensor_type`, `sensor_value`, `is_alert` | **Flow**: Sensors measure values → Data collected → Thresholds checked → Alerts generated → Maintenance scheduled. **Usage**: Condition monitoring, predictive maintenance, alert management, sensor management |
| 56 | `plc_data` | `id` | Manufacturing | PLC data and control information | `machine_id`, `plc_id`, `data_type`, `value`, `status` | **Flow**: PLC controls machine → Data collected → Status monitored → Control signals sent → Machine responds. **Usage**: Machine control, automation monitoring, PLC communication, control system management |
| 57 | `robot_data` | `id` | Manufacturing | Robot position and operation data | `machine_id`, `robot_id`, `position_x/y/z`, `program_status` | **Flow**: Robot executes program → Position tracked → Status monitored → Program controlled → Operation optimized. **Usage**: Robot control, position tracking, program management, automation optimization |

**💡 SQL Code**: Available in `ASSEMBLY_MANUFACTURING_DATA_SOURCES.md` - Machine & Equipment Data Sources section

#### **📈 Production & Quality Data Tables (3 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 58 | `production_metrics` | `id` | Manufacturing | Production line performance metrics | `line_id`, `production_date`, `shift`, `target_production`, `actual_production` | **Flow**: Production line runs → Output measured → Targets compared → Metrics calculated → Performance reported. **Usage**: Line performance, target tracking, efficiency analysis, shift comparison |
| 59 | `quality_control_data` | `id` | Manufacturing | Quality inspection and control data | `machine_id`, `inspection_date`, `inspection_type`, `pass_count`, `fail_count` | **Flow**: Products inspected → Pass/fail counted → Quality data recorded → Trends analyzed → Quality improved. **Usage**: Quality monitoring, defect tracking, quality improvement, compliance reporting |
| 60 | `mes_data` | `id` | Manufacturing | Manufacturing Execution System data | `work_order_id`, `production_order_id`, `machine_id`, `operator_id`, `quantity_produced` | **Flow**: Work order created → Production started → Progress tracked → Completion recorded → Data synchronized. **Usage**: Production tracking, work order management, MES integration, production reporting |

**💡 SQL Code**: Available in `ASSEMBLY_MANUFACTURING_DATA_SOURCES.md` - Production & Quality Data Sources section

#### **📊 Quality & Analytics Data Tables (4 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 61 | `quality_metrics` | `id` | Manufacturing | Quality performance metrics and analysis | `line_id`, `date`, `first_pass_yield`, `defect_rate`, `rework_rate` | **Flow**: Quality data collected → Metrics calculated → Performance analyzed → Trends identified → Improvement planned. **Usage**: Quality performance, trend analysis, improvement planning, benchmarking |
| 62 | `downtime_analysis` | `id` | Manufacturing | Machine downtime tracking and analysis | `machine_id`, `downtime_date`, `downtime_start/end`, `downtime_category` | **Flow**: Downtime occurs → Start/end tracked → Category classified → Analysis performed → Improvement planned. **Usage**: Downtime reduction, root cause analysis, maintenance planning, efficiency improvement |
| 63 | `performance_analytics` | `id` | Manufacturing | Performance analytics and variance analysis | `line_id`, `analysis_date`, `metric_type`, `metric_value`, `target_value` | **Flow**: Performance data collected → Analysis performed → Variance calculated → Trends identified → Optimization planned. **Usage**: Performance analysis, variance tracking, optimization planning, continuous improvement |
| 64 | `predictive_analytics` | `id` | Manufacturing | Predictive maintenance and failure analysis | `machine_id`, `prediction_date`, `prediction_type`, `predicted_value`, `confidence_level` | **Flow**: Machine data analyzed → Patterns identified → Predictions made → Maintenance scheduled → Failures prevented. **Usage**: Predictive maintenance, failure prevention, maintenance optimization, cost reduction |

**💡 SQL Code**: Available in `ASSEMBLY_MANUFACTURING_DATA_SOURCES.md` - Analytics & Reporting Data Sources section

#### **👥 Operator & Safety Data Tables (4 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 65 | `operator_tracking` | `id` | Manufacturing | Operator time tracking and attendance | `operator_id`, `line_id`, `check_in_time`, `check_out_time`, `total_work_hours` | **Flow**: Operator arrives → RFID scanned → Check-in recorded → Work performed → Check-out recorded. **Usage**: Attendance tracking, time management, productivity measurement, payroll processing |
| 66 | `operator_performance` | `id` | Manufacturing | Operator performance scoring vs evaluation | `operator_id`, `performance_date`, `shift`, `productivity_score`, `quality_score` | **Flow**: Operator works → Performance measured → Scores calculated → Evaluation performed → Improvement planned. **Usage**: Performance evaluation, training needs, incentive programs, skill development |
| 67 | `safety_incidents` | `id` | Manufacturing | Safety incident reporting and management | `incident_id`, `incident_date`, `incident_type`, `severity`, `status` | **Flow**: Incident occurs → Report filed → Investigation started → Resolution implemented → Status closed. **Usage**: Safety monitoring, incident tracking, compliance reporting, risk management |
| 68 | `safety_compliance` | `id` | Manufacturing | Safety compliance tracking and scoring | `compliance_date`, `line_id`, `compliance_type`, `compliance_score`, `compliant_items` | **Flow**: Compliance check performed → Items verified → Score calculated → Compliance tracked → Improvement planned. **Usage**: Safety compliance, audit preparation, regulatory reporting, safety culture monitoring |

**💡 SQL Code**: Available in `ASSEMBLY_MANUFACTURING_DATA_SOURCES.md` - Human & Operator Data Sources section

#### **🔌 Utility & Environmental Data Tables (4 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 69 | `energy_consumption` | `id` | Manufacturing | Energy consumption tracking and monitoring | `line_id`, `consumption_date`, `power_consumption_kwh`, `compressed_air_cfm` | **Flow**: Energy meters collect data → Consumption tracked → Efficiency calculated → Optimization planned. **Usage**: Energy management, cost optimization, efficiency improvement, sustainability tracking |
| 70 | `environmental_data` | `id` | Manufacturing | Environmental conditions monitoring | `line_id`, `measurement_date`, `temperature_celsius`, `humidity_percentage` | **Flow**: Environmental sensors measure → Conditions monitored → Alerts generated → Controls adjusted. **Usage**: Environmental monitoring, comfort control, safety compliance, energy optimization |
| 71 | `utility_monitoring` | `id` | Manufacturing | Utility system monitoring and alerts | `utility_type`, `measurement_time`, `value`, `unit`, `is_alert` | **Flow**: Utilities monitored → Values tracked → Thresholds checked → Alerts generated → Issues resolved. **Usage**: Utility management, alert monitoring, system optimization, maintenance planning |
| 72 | `energy_efficiency` | `id` | Manufacturing | Energy efficiency metrics and analysis | `line_id`, `efficiency_date`, `energy_efficiency_ratio`, `power_factor` | **Flow**: Energy data analyzed → Efficiency calculated → Performance benchmarked → Improvement planned. **Usage**: Efficiency tracking, performance benchmarking, optimization planning, cost reduction |

**💡 SQL Code**: Available in `ASSEMBLY_MANUFACTURING_DATA_SOURCES.md` - Utility & Environmental Data Sources section

#### **📦 Material & Process Data Tables (4 tables)**

| No | Table Name | Primary Key | Type | Description | Key Fields | Detailed |
|---|---|---|---|---|---|---|
| 73 | `material_inventory` | `id` | Manufacturing | Material inventory management and tracking | `material_id`, `material_name`, `current_stock`, `min_stock`, `max_stock` | **Flow**: Materials received → Inventory updated → Stock tracked → Reorder alerts → Materials consumed. **Usage**: Inventory management, stock control, reorder planning, cost tracking |
| 74 | `material_consumption` | `id` | Manufacturing | Material consumption tracking per production | `production_order_id`, `material_id`, `consumed_quantity`, `consumption_date` | **Flow**: Production starts → Materials consumed → Consumption tracked → Inventory updated → Cost calculated. **Usage**: Material tracking, cost analysis, inventory management, production planning |
| 75 | `process_monitoring` | `id` | Manufacturing | Process step monitoring and tracking | `machine_id`, `process_step`, `start_time`, `end_time`, `duration_minutes` | **Flow**: Process starts → Steps monitored → Duration tracked → Performance analyzed → Optimization planned. **Usage**: Process optimization, step analysis, cycle time improvement, efficiency enhancement |
| 76 | `process_optimization` | `id` | Manufacturing | Process optimization and improvement tracking | `machine_id`, `optimization_date`, `parameter_name`, `old_value`, `new_value` | **Flow**: Process analyzed → Optimization identified → Changes implemented → Performance measured → Results tracked. **Usage**: Continuous improvement, process optimization, performance enhancement, best practices |

**💡 SQL Code**: Available in `ASSEMBLY_MANUFACTURING_DATA_SOURCES.md` - Material & Inventory Data Sources section

---

## 🔄 Data Flow Integration Strategy

### **📊 Data Flow Architecture Overview**

#### **🏗️ Integration Strategy**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              MANUFACTURING ENVIRONMENT                          │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────────┐ │
│  │   PLC Systems   │  │   Sensor Data   │  │   Robot Systems                 │ │
│  │   - Conveyor    │  │   - Temperature │  │   - Assembly Robots             │ │
│  │   - Nut Runner  │  │   - Pressure    │  │   - Welding Robots              │ │
│  │   - Leak Tester │  │   - Vibration   │  │   - Painting Robots             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────────┘ │
│           │                       │                           │                 │
│           └───────────────────────┼───────────────────────────┘                 │
│                                   │                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────────┐ │
│  │   MES Systems   │  │   Quality       │  │   Operator Systems              │ │
│  │   - Production  │  │   - Inspection  │  │   - RFID Tracking               │ │
│  │   - Scheduling  │  │   - Measurement │  │   - Time Clock                  │ │
│  │   - Traceability│  │   - Vision      │  │   - Performance                 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
                                   │
                                   │ API Interface
                                   │
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              INTERNAL HUB DATABASE                             │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    MULTI-SOURCE MANAGEMENT                             │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Data Source   │  │   Connections   │  │   Mappings & History    │ │   │
│  │  │   Registry      │  │   Management    │  │   Sync Tracking         │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                   │                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                        CORE SYSTEM DATA                                │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Master Data   │  │   Transactional │  │   Dashboard & Analytics │ │   │
│  │  │   (8 tables)    │  │   (8 tables)    │  │   (8 tables)            │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  │                                                                         │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Authentication│  │   Configuration │  │   Safety & Compliance   │ │   │
│  │  │   (2 tables)    │  │   (2 tables)    │  │   (3 tables)            │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  │                                                                         │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Operator      │  │   Advanced      │  │   Layout Designer       │ │   │
│  │  │   Performance   │  │   Analytics     │  │   (5 tables)            │ │   │
│  │  │   (2 tables)    │  │   (8 tables)    │  └─────────────────────────┘ │   │
│  │  └─────────────────┘  └─────────────────┘                             │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                   │                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    MANUFACTURING DATA                                  │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Machine Data  │  │   Production    │  │   Quality & Analytics   │ │   │
│  │  │   (5 tables)    │  │   Data (3 tables│  │   (4 tables)            │ │   │
│  │  └─────────────────┘  │   )             │  └─────────────────────────┘ │   │
│  │                      └─────────────────┘                             │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │   Operator &    │  │   Utility &     │  │   Material &            │ │   │
│  │  │   Safety Data   │  │   Environmental │  │   Process Data          │ │   │
│  │  │   (4 tables)    │  │   (4 tables)    │  │   (4 tables)            │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                   │
                                   │
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              USER INTERFACE SYSTEM                             │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────────┐ │
│  │   Dashboard     │  │   Master Data   │  │   Andon System                  │ │
│  │   System        │  │   Management    │  │   Management                    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────────┘ │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────────┐ │
│  │   Maintenance   │  │   Traceability  │  │   Layout Designer               │ │
│  │   System        │  │   System        │  │   System                        │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────────┘ │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────────┐ │
│  │   Safety        │  │   Analytics     │  │   Data Source                   │ │
│  │   System        │  │   System        │  │   Management                    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

#### **🔄 Data Integration Flow**

| Stage | Component | Description | Data Sources | Target Tables |
|---|---|---|---|---|
| **1. Collection** | Manufacturing Environment | Real-time data from machines, sensors, robots | PLC, Sensors, Robots, MES, Quality Systems | External Machine Databases |
| **2. Interface** | API Gateway | Data transformation and validation | Multiple external sources | Data Source Registry |
| **3. Processing** | Internal Hub Database | Data storage and business logic | Validated external data + Internal data | All 76 database tables |
| **4. Presentation** | UI System | User interface and dashboards | Processed data from database | Dashboard, Forms, Reports |

#### **⚡ Integration Strategies**

| Strategy | Use Case | Frequency | Data Volume | Latency |
|---|---|---|---|---|
| **Real-time Sync** | Machine status, Safety alerts | 1-5 seconds | High | < 1 second |
| **Incremental Sync** | Production data, Sensor readings | 1-15 minutes | Medium | < 5 minutes |
| **Batch Sync** | Historical data, Reports | Daily/Weekly | Low | < 1 hour |
| **On-demand Sync** | Manual data requests | As needed | Variable | < 30 seconds |

#### **🔧 Data Source Types**

| Type | Examples | Connection Method | Sync Strategy |
|---|---|---|---|
| **JSON Files** | Configuration data, Static data | File system | Batch/On-demand |
| **Database** | MES systems, ERP systems | Database connection | Incremental/Real-time |
| **API** | Machine APIs, External services | REST/SOAP APIs | Real-time/Incremental |
| **Artisan Commands** | Custom data processing | Command execution | Batch/Scheduled |
| **CSV/Excel** | Import/Export data | File processing | Batch |

---

## 📈 Database Statistics

### **📊 Table Summary:**
- **Total Tables**: 76 tables
- **Core System Tables**: 40 tables
- **Multi-Source Management Tables**: 6 tables
- **Manufacturing Data Tables**: 24 tables
- **Additional Tables**: 6 tables (alerts, optimization, etc.)

### **📋 Data Volume Estimates:**
- **Master Data**: 100-1000 records per table
- **Transactional Data**: 1000-10000 records per month
- **Real-time Data**: 10000-100000 records per day
- **Historical Data**: 1-10 GB per month
- **Total Storage**: 100-1000 GB per year

### **⚡ Performance Requirements:**
- **Data Collection**: 1000+ data points per second
- **Data Processing**: Real-time processing < 1 second
- **Data Storage**: High-speed database with indexing
- **Data Retrieval**: Sub-second response for dashboards
- **Connection Reliability**: 99.9% uptime requirement

---

## 🛠️ Implementation Strategy

### **Phase 1: Core Database Setup** (Week 1-2)
1. ✅ **Create Core System Tables** (40 tables)
2. ✅ **Setup Multi-Source Management** (6 tables)
3. ✅ **Configure Data Source Registry**
4. ✅ **Setup Indexes and Constraints**

### **Phase 2: Manufacturing Data Integration** (Week 3-4)
1. ✅ **Create Manufacturing Data Tables** (24 tables)
2. ✅ **Setup Data Source Connections**
3. ✅ **Configure Sync Strategies**
4. ✅ **Implement Data Validation**

### **Phase 3: Advanced Features** (Week 5-6)
1. ✅ **Setup Predictive Analytics**
2. ✅ **Configure Real-time Monitoring**
3. ✅ **Implement Data Quality Checks**
4. ✅ **Setup Performance Optimization**

### **Phase 4: Production Deployment** (Week 7-8)
1. ✅ **Production Database Setup**
2. ✅ **Data Migration**
3. ✅ **Performance Testing**
4. ✅ **Go-Live Support**

---

## 🎯 Key Benefits

### **✅ Comprehensive Data Management:**
- **76 Database Tables** covering all aspects of manufacturing
- **Multi-Source Integration** supporting various data sources
- **Real-time Data Processing** for immediate insights
- **Historical Data Analysis** for trend identification

### **✅ Scalable Architecture:**
- **Modular Design** for easy maintenance and updates
- **Flexible Data Sources** supporting multiple connection types
- **High Performance** with optimized indexing and caching
- **Future-Proof** design supporting new requirements

### **✅ Manufacturing Focus:**
- **Assembly Line Specific** data structures
- **Quality Management** integrated throughout
- **Safety Compliance** built into the system
- **Operator Performance** tracking and optimization

**Complete database schema building sudah siap untuk implementasi!** 🚀
