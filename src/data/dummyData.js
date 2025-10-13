/**
 * Dummy Data for Manufacturing System
 * 
 * This file contains all dummy data for UI development phase.
 * Data structure follows the database schema defined in DEVELOPMENT_PLAN.md
 * 
 * Usage: Import the data you need in your components
 * Example: import { dummyUsers, dummyMachines } from '@/data/dummyData';
 */

// ============================================
// MASTER DATA - ACCESS LEVELS
// ============================================

export const dummyAccessLevels = [
    {
        id: 1,
        access_level_id: "ADMIN",
        name: "Administrator",
        description: "Full system access with all permissions",
        allowed_menus: [
            "dashboard",
            "main_dashboard",
            "machine_detail",
            "master_data",
            "access_level",
            "users",
            "machines",
            "spareparts",
            "andon_system",
            "maintenance",
            "traceability"
        ],
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-01 08:00:00"
    },
    {
        id: 2,
        access_level_id: "OPERATOR",
        name: "Operator",
        description: "Basic operational access for production line operators",
        allowed_menus: [
            "dashboard",
            "main_dashboard",
            "andon_system",
            "traceability"
        ],
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-01 08:00:00"
    },
    {
        id: 3,
        access_level_id: "TECHNICIAN",
        name: "Technician",
        description: "Maintenance and repair access for technical staff",
        allowed_menus: [
            "dashboard",
            "main_dashboard",
            "machine_detail",
            "andon_system",
            "maintenance",
            "traceability"
        ],
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-01 08:00:00"
    },
    {
        id: 4,
        access_level_id: "SUPERVISOR",
        name: "Supervisor",
        description: "Supervisory access with monitoring capabilities",
        allowed_menus: [
            "dashboard",
            "main_dashboard",
            "machine_detail",
            "andon_system",
            "maintenance",
            "traceability"
        ],
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-01 08:00:00"
    }
];

// ============================================
// MASTER DATA - USERS
// ============================================

export const dummyUsers = [
    {
        id: 1,
        user_id: "USR001",
        name: "John Doe",
        nrp: "297498",
        password: "admin123",
        access_level_id: 1,
        access_level_name: "Administrator",
        rfid: "34567890",
        picture_url: "/images/users/john-doe.jpg",
        status: "active",
        email: "john.doe@manufacturing.com",
        phone: "+62 812-3456-7890",
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-01 08:00:00"
    },
    {
        id: 2,
        user_id: "USR002",
        name: "Asep Gunandar",
        nrp: "297499",
        password: "operator123",
        access_level_id: 2,
        access_level_name: "Operator",
        rfid: "34567891",
        picture_url: "/images/users/asep-gunandar.jpg",
        status: "active",
        email: "asep.gunandar@manufacturing.com",
        phone: "+62 812-3456-7891",
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-01 08:00:00"
    },
    {
        id: 3,
        user_id: "USR003",
        name: "Ucup Irawan",
        nrp: "297500",
        password: "tech123",
        access_level_id: 3,
        access_level_name: "Technician",
        rfid: "34567892",
        picture_url: "/images/users/ucup-irawan.jpg",
        status: "active",
        email: "ucup.irawan@manufacturing.com",
        phone: "+62 812-3456-7892",
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-01 08:00:00"
    },
    {
        id: 4,
        user_id: "USR004",
        name: "Gunawan Santoso",
        nrp: "297501",
        password: "super123",
        access_level_id: 4,
        access_level_name: "Supervisor",
        rfid: "34567893",
        picture_url: "/images/users/gunawan-santoso.jpg",
        status: "active",
        email: "gunawan.santoso@manufacturing.com",
        phone: "+62 812-3456-7893",
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-01 08:00:00"
    },
    {
        id: 5,
        user_id: "USR005",
        name: "Usman Hakim",
        nrp: "297502",
        password: "operator123",
        access_level_id: 2,
        access_level_name: "Operator",
        rfid: "34567894",
        picture_url: "/images/users/usman-hakim.jpg",
        status: "active",
        email: "usman.hakim@manufacturing.com",
        phone: "+62 812-3456-7894",
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-01 08:00:00"
    }
];

// ============================================
// MASTER DATA - MACHINES
// ============================================

export const dummyMachines = [
    {
        id: 1,
        machine_id: "MCH-001",
        name: "Nut Runner Cyl Head 1",
        asset_no: "1234567890",
        acquisition_year: 2023,
        machine_type: "Assembly",
        specifications: "Torque: 45 Nm, Speed: 100 RPM",
        status: "running",
        image_url: "/images/machines/nut-runner-1.jpg",
        line_id: "line_1",
        position_x: 100,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 2,
        machine_id: "MCH-002",
        name: "Leak Tester Station 1",
        asset_no: "1234567891",
        acquisition_year: 2023,
        machine_type: "Testing",
        specifications: "Pressure: 350 Bar, Accuracy: 0.01%",
        status: "idle",
        image_url: "/images/machines/leak-tester-1.jpg",
        line_id: "line_1",
        position_x: 300,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 3,
        machine_id: "MCH-003",
        name: "Quality Gate 1",
        asset_no: "1234567892",
        acquisition_year: 2022,
        machine_type: "Inspection",
        specifications: "Vision System: 4K, Processing: Real-time",
        status: "alarm",
        image_url: "/images/machines/quality-gate-1.jpg",
        line_id: "line_1",
        position_x: 500,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 4,
        machine_id: "MCH-004",
        name: "Press Bearing Station",
        asset_no: "1234567893",
        acquisition_year: 2023,
        machine_type: "Assembly",
        specifications: "Force: 50 kN, Precision: 0.05mm",
        status: "running",
        image_url: "/images/machines/press-bearing.jpg",
        line_id: "line_2",
        position_x: 100,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 5,
        machine_id: "MCH-005",
        name: "Oil Filling Machine",
        asset_no: "1234567894",
        acquisition_year: 2024,
        machine_type: "Filling",
        specifications: "Capacity: 5L/min, Accuracy: ±2ml",
        status: "running",
        image_url: "/images/machines/oil-filling.jpg",
        line_id: "line_2",
        position_x: 300,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 6,
        machine_id: "MCH-006",
        name: "Torque Click System",
        asset_no: "1234567895",
        acquisition_year: 2024,
        machine_type: "Testing",
        specifications: "Range: 10-100 Nm, Accuracy: ±0.5 Nm",
        status: "disconnected",
        image_url: "/images/machines/torque-click.jpg",
        line_id: "line_3",
        position_x: 100,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 7,
        machine_id: "MCH-007",
        name: "Robot Welding Station 1",
        asset_no: "1234567896",
        acquisition_year: 2023,
        machine_type: "Automated",
        specifications: "6-Axis Robot, Welding Torch, 0.1mm Precision",
        status: "running",
        image_url: "/images/machines/robot-welding.jpg",
        line_id: "line_1",
        position_x: 700,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 8,
        machine_id: "MCH-008",
        name: "CNC Drilling Machine",
        asset_no: "1234567897",
        acquisition_year: 2022,
        machine_type: "Assembly",
        specifications: "Max Speed: 5000 RPM, 3-Axis Control",
        status: "idle",
        image_url: "/images/machines/cnc-drill.jpg",
        line_id: "line_1",
        position_x: 900,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 9,
        machine_id: "MCH-009",
        name: "Vision Inspection System",
        asset_no: "1234567898",
        acquisition_year: 2024,
        machine_type: "Inspection",
        specifications: "8K Camera, AI Detection, 99.9% Accuracy",
        status: "running",
        image_url: "/images/machines/vision-inspect.jpg",
        line_id: "line_1",
        position_x: 100,
        position_y: 400,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 10,
        machine_id: "MCH-010",
        name: "Hydraulic Press 500T",
        asset_no: "1234567899",
        acquisition_year: 2021,
        machine_type: "Assembly",
        specifications: "Force: 500 Ton, Stroke: 600mm",
        status: "running",
        image_url: "/images/machines/hydraulic-press.jpg",
        line_id: "line_2",
        position_x: 500,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 11,
        machine_id: "MCH-011",
        name: "Laser Marking Station",
        asset_no: "1234567900",
        acquisition_year: 2024,
        machine_type: "Manual",
        specifications: "Fiber Laser 30W, Marking Speed: 7000mm/s",
        status: "running",
        image_url: "/images/machines/laser-mark.jpg",
        line_id: "line_2",
        position_x: 700,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 12,
        machine_id: "MCH-012",
        name: "Conveyor Belt System A",
        asset_no: "1234567901",
        acquisition_year: 2023,
        machine_type: "Manual",
        specifications: "Length: 50m, Speed: 0.5m/s, Load: 200kg",
        status: "running",
        image_url: "/images/machines/conveyor.jpg",
        line_id: "line_1",
        position_x: 300,
        position_y: 400,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 13,
        machine_id: "MCH-013",
        name: "Packaging Robot Station",
        asset_no: "1234567902",
        acquisition_year: 2024,
        machine_type: "Automated",
        specifications: "Pick & Place, 15 cycles/min, 4-Axis",
        status: "alarm",
        image_url: "/images/machines/pack-robot.jpg",
        line_id: "line_3",
        position_x: 300,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 14,
        machine_id: "MCH-014",
        name: "Thermal Testing Chamber",
        asset_no: "1234567903",
        acquisition_year: 2023,
        machine_type: "Testing",
        specifications: "Temp Range: -40°C to 150°C, Humidity Control",
        status: "running",
        image_url: "/images/machines/thermal-test.jpg",
        line_id: "line_3",
        position_x: 500,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 15,
        machine_id: "MCH-015",
        name: "Ultrasonic Cleaning Unit",
        asset_no: "1234567904",
        acquisition_year: 2022,
        machine_type: "Manual",
        specifications: "40kHz, Tank: 100L, Heat: 80°C",
        status: "idle",
        image_url: "/images/machines/ultrasonic.jpg",
        line_id: "line_2",
        position_x: 100,
        position_y: 400,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 16,
        machine_id: "MCH-016",
        name: "3D Coordinate Measuring",
        asset_no: "1234567905",
        acquisition_year: 2024,
        machine_type: "Inspection",
        specifications: "Accuracy: 2µm, Measuring Volume: 700x1000x600",
        status: "running",
        image_url: "/images/machines/cmm.jpg",
        line_id: "line_1",
        position_x: 500,
        position_y: 400,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 17,
        machine_id: "MCH-017",
        name: "Deburring Machine Auto",
        asset_no: "1234567906",
        acquisition_year: 2023,
        machine_type: "Assembly",
        specifications: "Brush Speed: 3000 RPM, Auto Feed",
        status: "running",
        image_url: "/images/machines/deburr.jpg",
        line_id: "line_2",
        position_x: 300,
        position_y: 400,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 18,
        machine_id: "MCH-018",
        name: "Pneumatic Screwdriver Station",
        asset_no: "1234567907",
        acquisition_year: 2023,
        machine_type: "Assembly",
        specifications: "Torque: 1-10 Nm, Speed: 1500 RPM",
        status: "running",
        image_url: "/images/machines/pneumatic-screw.jpg",
        line_id: "line_1",
        position_x: 700,
        position_y: 400,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 19,
        machine_id: "MCH-019",
        name: "X-Ray Inspection System",
        asset_no: "1234567908",
        acquisition_year: 2024,
        machine_type: "Inspection",
        specifications: "Resolution: 1µm, Voltage: 160kV",
        status: "disconnected",
        image_url: "/images/machines/xray.jpg",
        line_id: "line_3",
        position_x: 700,
        position_y: 200,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 20,
        machine_id: "MCH-020",
        name: "Barcode Printer Station",
        asset_no: "1234567909",
        acquisition_year: 2023,
        machine_type: "Packaging",
        specifications: "Speed: 300mm/s, 2D/QR Code Support",
        status: "running",
        image_url: "/images/machines/barcode.jpg",
        line_id: "line_2",
        position_x: 500,
        position_y: 400,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 21,
        machine_id: "MCH-021",
        name: "Gluing Robot Arm",
        asset_no: "1234567910",
        acquisition_year: 2024,
        machine_type: "Automated",
        specifications: "5-Axis, Precision Dispenser, 0.1ml Accuracy",
        status: "idle",
        image_url: "/images/machines/glue-robot.jpg",
        line_id: "line_1",
        position_x: 900,
        position_y: 400,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 22,
        machine_id: "MCH-022",
        name: "Vacuum Leak Detector",
        asset_no: "1234567911",
        acquisition_year: 2023,
        machine_type: "Testing",
        specifications: "Sensitivity: 1x10⁻⁹ mbar·l/s, Chamber: 300L",
        status: "running",
        image_url: "/images/machines/vacuum-leak.jpg",
        line_id: "line_3",
        position_x: 100,
        position_y: 400,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 23,
        machine_id: "MCH-023",
        name: "Surface Roughness Tester",
        asset_no: "1234567912",
        acquisition_year: 2024,
        machine_type: "Inspection",
        specifications: "Ra: 0.01-40µm, Measurement Speed: 1mm/s",
        status: "running",
        image_url: "/images/machines/roughness.jpg",
        line_id: "line_2",
        position_x: 700,
        position_y: 400,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 24,
        machine_id: "MCH-024",
        name: "AGV Loading Station",
        asset_no: "1234567913",
        acquisition_year: 2024,
        machine_type: "Automated",
        specifications: "Load Capacity: 500kg, Auto Docking System",
        status: "running",
        image_url: "/images/machines/agv.jpg",
        line_id: "line_3",
        position_x: 300,
        position_y: 400,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 25,
        machine_id: "MCH-025",
        name: "Cooling Tower System",
        asset_no: "1234567914",
        acquisition_year: 2022,
        machine_type: "Manual",
        specifications: "Cooling Capacity: 100kW, Flow: 300L/min",
        status: "running",
        image_url: "/images/machines/cooling.jpg",
        line_id: "line_1",
        position_x: 100,
        position_y: 600,
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    }
];

// ============================================
// MASTER DATA - SPAREPARTS
// ============================================

export const dummySpareparts = [
    {
        id: 1,
        part_number: "HYD-VAL-001",
        part_name: "Hydraulic Valve",
        specification: "3/8\" BSP, 350 Bar, Directional Control",
        brand: "Yuken",
        type: "Hydraulic Component",
        stock: 25,
        min_stock: 5,
        unit: "pcs",
        price: 1500000,
        image_url: "/images/spareparts/hydraulic-valve.jpg",
        machine_compatibility: ["MCH-001", "MCH-002", "MCH-003"],
        supplier: "PT Hydraulic Indonesia",
        last_purchase_date: "2025-09-15",
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 2,
        part_number: "PNE-CYL-032",
        part_name: "Pneumatic Cylinder",
        specification: "32mm Bore, 100mm Stroke, Double Acting",
        brand: "SMC",
        type: "Pneumatic Component",
        stock: 15,
        min_stock: 3,
        unit: "pcs",
        price: 850000,
        image_url: "/images/spareparts/pneumatic-cylinder.jpg",
        machine_compatibility: ["MCH-001", "MCH-004"],
        supplier: "PT SMC Indonesia",
        last_purchase_date: "2025-09-20",
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 3,
        part_number: "BRG-6205",
        part_name: "Ball Bearing 6205",
        specification: "25x52x15mm, Deep Groove",
        brand: "SKF",
        type: "Bearing",
        stock: 50,
        min_stock: 10,
        unit: "pcs",
        price: 125000,
        image_url: "/images/spareparts/ball-bearing.jpg",
        machine_compatibility: ["MCH-001", "MCH-002", "MCH-004", "MCH-005"],
        supplier: "PT SKF Indonesia",
        last_purchase_date: "2025-10-01",
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 4,
        part_number: "SEN-PRX-001",
        part_name: "Proximity Sensor",
        specification: "M18, NPN, NO, 8mm Detection",
        brand: "Omron",
        type: "Sensor",
        stock: 30,
        min_stock: 8,
        unit: "pcs",
        price: 350000,
        image_url: "/images/spareparts/proximity-sensor.jpg",
        machine_compatibility: ["MCH-001", "MCH-002", "MCH-003", "MCH-006"],
        supplier: "PT Omron Indonesia",
        last_purchase_date: "2025-09-25",
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    },
    {
        id: 5,
        part_number: "FLT-AIR-001",
        part_name: "Air Filter",
        specification: "1/4\" NPT, 40 Micron, Auto Drain",
        brand: "Festo",
        type: "Pneumatic Component",
        stock: 20,
        min_stock: 5,
        unit: "pcs",
        price: 450000,
        image_url: "/images/spareparts/air-filter.jpg",
        machine_compatibility: ["MCH-001", "MCH-002", "MCH-004"],
        supplier: "PT Festo Indonesia",
        last_purchase_date: "2025-09-18",
        created_at: "2025-10-01 08:00:00",
        updated_at: "2025-10-12 10:30:00"
    }
];

// ============================================
// ANDON SYSTEM - TICKETS
// ============================================

export const dummyAndonTickets = [
    {
        id: 1,
        ticket_id: "CALL-001",
        issued_date: "2025-10-03 06:00:00",
        machine_id: 1,
        machine_name: "Nut Runner Cyl Head 1",
        call_by_user_id: 2,
        call_by_name: "Asep Gunandar",
        arrival_time: "2025-10-03 06:10:00",
        response_by_user_id: 3,
        response_by_name: "Ucup Irawan",
        duration: 10,
        status: "closed",
        priority: "medium",
        issue_type: "mechanical",
        description: "Machine making unusual noise during operation",
        resolution: "Replaced worn bearing and lubricated moving parts",
        attachments: [],
        created_at: "2025-10-03 06:00:00",
        updated_at: "2025-10-03 06:10:00"
    },
    {
        id: 2,
        ticket_id: "CALL-002",
        issued_date: "2025-10-03 07:30:00",
        machine_id: 3,
        machine_name: "Quality Gate 1",
        call_by_user_id: 2,
        call_by_name: "Asep Gunandar",
        arrival_time: "2025-10-03 07:45:00",
        response_by_user_id: 3,
        response_by_name: "Ucup Irawan",
        duration: 15,
        status: "open",
        priority: "high",
        issue_type: "electrical",
        description: "Electrical fault in control panel - system not responding",
        resolution: null,
        attachments: [],
        created_at: "2025-10-03 07:30:00",
        updated_at: "2025-10-03 07:45:00"
    },
    {
        id: 3,
        ticket_id: "CALL-003",
        issued_date: "2025-10-12 08:15:00",
        machine_id: 2,
        machine_name: "Leak Tester Station 1",
        call_by_user_id: 5,
        call_by_name: "Usman Hakim",
        arrival_time: null,
        response_by_user_id: null,
        response_by_name: null,
        duration: null,
        status: "open",
        priority: "low",
        issue_type: "quality",
        description: "Leak detection sensitivity seems off - getting false positives",
        resolution: null,
        attachments: [],
        created_at: "2025-10-12 08:15:00",
        updated_at: "2025-10-12 08:15:00"
    },
    {
        id: 4,
        ticket_id: "CALL-004",
        issued_date: "2025-10-12 09:00:00",
        machine_id: 1,
        machine_name: "Nut Runner Cyl Head 1",
        call_by_user_id: 2,
        call_by_name: "Asep Gunandar",
        arrival_time: "2025-10-12 09:05:00",
        response_by_user_id: 3,
        response_by_name: "Ucup Irawan",
        duration: 5,
        status: "closed",
        priority: "critical",
        issue_type: "safety",
        description: "Emergency stop button not functioning properly",
        resolution: "Replaced emergency stop button and tested safety circuit",
        attachments: [],
        created_at: "2025-10-12 09:00:00",
        updated_at: "2025-10-12 09:05:00"
    }
];

// ============================================
// MAINTENANCE SYSTEM - TICKETS
// ============================================

export const dummyMaintenanceTickets = [
    {
        id: 1,
        ticket_id: "MTC-001",
        maintenance_no: "Maintenance-001",
        issued_date: "2025-10-03 06:00:00",
        machine_id: 1,
        machine_name: "Nut Runner Cyl Head 1",
        type: "Corrective",
        problem: "Selang Pneumatic Bocor - Air pressure dropping",
        repair: "Mengganti selang Pneumatic yang Bocor dengan yang baru dan test pressure",
        created_by_user_id: 2,
        created_by_name: "Usman Hakim",
        response_by_user_id: 3,
        response_by_name: "Ucup Irawan",
        status: "done",
        duration: 45,
        priority: "medium",
        parts_used: [
            { part_number: "PNE-CYL-032", part_name: "Pneumatic Cylinder", quantity: 1, brand: "SMC" }
        ],
        created_at: "2025-10-03 06:00:00",
        updated_at: "2025-10-03 06:45:00"
    },
    {
        id: 2,
        ticket_id: "MTC-002",
        maintenance_no: "Maintenance-002",
        issued_date: "2025-10-05 08:00:00",
        machine_id: 3,
        machine_name: "Quality Gate 1",
        type: "Preventive",
        problem: "Scheduled preventive maintenance - 1000 hours service",
        repair: "Regular maintenance check, cleaning, and calibration",
        created_by_user_id: 4,
        created_by_name: "Gunawan Santoso",
        response_by_user_id: 3,
        response_by_name: "Ucup Irawan",
        status: "on_progress",
        duration: null,
        priority: "low",
        parts_used: [],
        created_at: "2025-10-05 08:00:00",
        updated_at: "2025-10-05 08:00:00"
    },
    {
        id: 3,
        ticket_id: "MTC-003",
        maintenance_no: "Maintenance-003",
        issued_date: "2025-10-10 14:00:00",
        machine_id: 4,
        machine_name: "Press Bearing Station",
        type: "WO",
        problem: "Bearing replacement work order",
        repair: "Replace main shaft bearing as per maintenance schedule",
        created_by_user_id: 4,
        created_by_name: "Gunawan Santoso",
        response_by_user_id: null,
        response_by_name: null,
        status: "new",
        duration: null,
        priority: "medium",
        parts_used: [],
        created_at: "2025-10-10 14:00:00",
        updated_at: "2025-10-10 14:00:00"
    },
    {
        id: 4,
        ticket_id: "MTC-004",
        maintenance_no: "Maintenance-004",
        issued_date: "2025-10-12 10:00:00",
        machine_id: 2,
        machine_name: "Leak Tester Station 1",
        type: "Corrective",
        problem: "Sensor calibration issue - false readings",
        repair: "Recalibrate pressure sensors and replace faulty proximity sensor",
        created_by_user_id: 2,
        created_by_name: "Usman Hakim",
        response_by_user_id: 3,
        response_by_name: "Ucup Irawan",
        status: "done",
        duration: 60,
        priority: "high",
        parts_used: [
            { part_number: "SEN-PRX-001", part_name: "Proximity Sensor", quantity: 2, brand: "Omron" }
        ],
        created_at: "2025-10-12 10:00:00",
        updated_at: "2025-10-12 11:00:00"
    }
];

// ============================================
// MAINTENANCE SYSTEM - SCHEDULE
// ============================================

export const dummyMaintenanceSchedule = [
    {
        id: 1,
        schedule_date: "2025-10-14",
        type: "Preventive",
        description: "Monthly preventive maintenance - Nut Runner Cyl Head 1",
        machine_id: 1,
        machine_name: "Nut Runner Cyl Head 1",
        assigned_to: "Ucup Irawan",
        status: "scheduled",
        created_at: "2025-10-01 08:00:00"
    },
    {
        id: 2,
        schedule_date: "2025-10-15",
        type: "WO",
        description: "Bearing replacement - Press Bearing Station",
        machine_id: 4,
        machine_name: "Press Bearing Station",
        assigned_to: "Ucup Irawan",
        status: "scheduled",
        created_at: "2025-10-01 08:00:00"
    },
    {
        id: 3,
        schedule_date: "2025-10-16",
        type: "Preventive",
        description: "Quarterly calibration - Leak Tester Station 1",
        machine_id: 2,
        machine_name: "Leak Tester Station 1",
        assigned_to: "Ucup Irawan",
        status: "scheduled",
        created_at: "2025-10-01 08:00:00"
    },
    {
        id: 4,
        schedule_date: "2025-10-18",
        type: "Corrective",
        description: "Follow-up check - Quality Gate 1",
        machine_id: 3,
        machine_name: "Quality Gate 1",
        assigned_to: "Ucup Irawan",
        status: "scheduled",
        created_at: "2025-10-12 08:00:00"
    }
];

// ============================================
// TRACEABILITY SYSTEM - MACHINE HISTORY
// ============================================

export const dummyMachineHistory = [
    {
        id: 1,
        machine_id: 1,
        machine_name: "Nut Runner Cyl Head 1",
        asset_no: "1234567890",
        acquisition_year: 2023,
        last_maintenance: "2025-10-03",
        next_maintenance: "2025-10-14",
        status: "running",
        total_runtime_hours: 2450,
        total_downtime_hours: 48,
        oee_percentage: 92.5,
        maintenance_history: [
            {
                no: 1,
                issued_date: "2025-10-03 06:00:00",
                ticket_no: "MTC-001",
                problem: "Selang Pneumatic Bocor",
                repair: "Mengganti selang Pneumatic yang Bocor dengan yang baru",
                status: "done"
            },
            {
                no: 2,
                issued_date: "2025-09-15 08:00:00",
                ticket_no: "MTC-PRV-001",
                problem: "Preventive maintenance schedule",
                repair: "Regular maintenance check and lubrication",
                status: "done"
            },
            {
                no: 3,
                issued_date: "2025-08-20 14:00:00",
                ticket_no: "MTC-COR-005",
                problem: "Torque sensor calibration",
                repair: "Recalibrated torque sensor to specification",
                status: "done"
            }
        ]
    },
    {
        id: 2,
        machine_id: 2,
        machine_name: "Leak Tester Station 1",
        asset_no: "1234567891",
        acquisition_year: 2023,
        last_maintenance: "2025-10-12",
        next_maintenance: "2025-10-16",
        status: "idle",
        total_runtime_hours: 2380,
        total_downtime_hours: 52,
        oee_percentage: 89.3,
        maintenance_history: [
            {
                no: 1,
                issued_date: "2025-10-12 10:00:00",
                ticket_no: "MTC-004",
                problem: "Sensor calibration issue",
                repair: "Recalibrate pressure sensors and replace faulty proximity sensor",
                status: "done"
            },
            {
                no: 2,
                issued_date: "2025-09-10 09:00:00",
                ticket_no: "MTC-PRV-002",
                problem: "Quarterly calibration",
                repair: "Full system calibration and pressure test",
                status: "done"
            }
        ]
    },
    {
        id: 3,
        machine_id: 3,
        machine_name: "Quality Gate 1",
        asset_no: "1234567892",
        acquisition_year: 2022,
        last_maintenance: "2025-10-05",
        next_maintenance: "2025-10-18",
        status: "alarm",
        total_runtime_hours: 5240,
        total_downtime_hours: 125,
        oee_percentage: 85.7,
        maintenance_history: [
            {
                no: 1,
                issued_date: "2025-10-05 08:00:00",
                ticket_no: "MTC-002",
                problem: "Scheduled preventive maintenance",
                repair: "Regular maintenance check, cleaning, and calibration",
                status: "on_progress"
            },
            {
                no: 2,
                issued_date: "2025-09-05 13:00:00",
                ticket_no: "MTC-COR-008",
                problem: "Vision system alignment",
                repair: "Realigned vision system and updated software",
                status: "done"
            },
            {
                no: 3,
                issued_date: "2025-08-12 10:00:00",
                ticket_no: "MTC-COR-006",
                problem: "Camera lens cleaning",
                repair: "Cleaned camera lens and adjusted lighting",
                status: "done"
            }
        ]
    }
];

// ============================================
// DASHBOARD DATA - OEE METRICS
// ============================================

export const dummyOEEData = {
    line_1: {
        availability: 88,
        performance: 90,
        quality: 85,
        totalOEE: 92,
        cycleTime: 21.4,
        partOK: 1100,
        partNG: 4,
        engineeringCalls: 3,
        maintenanceCalls: 2
    },
    line_2: {
        availability: 92,
        performance: 88,
        quality: 90,
        totalOEE: 90,
        cycleTime: 19.8,
        partOK: 1250,
        partNG: 2,
        engineeringCalls: 1,
        maintenanceCalls: 1
    },
    line_3: {
        availability: 85,
        performance: 87,
        quality: 88,
        totalOEE: 87,
        cycleTime: 23.2,
        partOK: 980,
        partNG: 6,
        engineeringCalls: 4,
        maintenanceCalls: 3
    }
};

// ============================================
// DASHBOARD DATA - PRODUCTION METRICS
// ============================================

export const dummyProductionData = [
    { month: "Jan", downtime: 15, target: 1000, actual: 980, consumption: 450 },
    { month: "Feb", downtime: 12, target: 1000, actual: 1020, consumption: 460 },
    { month: "Mar", downtime: 18, target: 1000, actual: 950, consumption: 440 },
    { month: "Apr", downtime: 10, target: 1000, actual: 1050, consumption: 470 },
    { month: "May", downtime: 14, target: 1000, actual: 990, consumption: 455 },
    { month: "Jun", downtime: 16, target: 1000, actual: 970, consumption: 445 },
    { month: "Jul", downtime: 11, target: 1000, actual: 1030, consumption: 465 },
    { month: "Aug", downtime: 13, target: 1000, actual: 1000, consumption: 450 },
    { month: "Sep", downtime: 17, target: 1000, actual: 960, consumption: 440 },
    { month: "Oct", downtime: 9, target: 1000, actual: 1070, consumption: 475 },
    { month: "Nov", downtime: 15, target: 1000, actual: 980, consumption: 450 },
    { month: "Dec", downtime: 12, target: 1000, actual: 1010, consumption: 460 }
];

// ============================================
// EXPORT ALL DUMMY DATA
// ============================================

export default {
    // Master Data
    dummyAccessLevels,
    dummyUsers,
    dummyMachines,
    dummySpareparts,

    // System Data
    dummyAndonTickets,
    dummyMaintenanceTickets,
    dummyMaintenanceSchedule,
    dummyMachineHistory,

    // Dashboard Data
    dummyOEEData,
    dummyProductionData
};

