/**
 * Dummy Data Service
 * 
 * This service simulates database CRUD operations using dummy data.
 * It provides the same interface as the real DatabaseService will have,
 * making migration easier when we switch to real database.
 * 
 * Features:
 * - In-memory data storage
 * - CRUD operations (Create, Read, Update, Delete)
 * - Data validation
 * - Error simulation
 * - Auto-increment IDs
 * 
 * Usage:
 * import DummyDataService from '@/services/DummyDataService';
 * const users = await DummyDataService.users.getAll();
 */

import {
    dummyAccessLevels,
    dummyUsers,
    dummyMachines,
    dummySpareparts,
    dummyAndonTickets,
    dummyMaintenanceTickets,
    dummyMaintenanceSchedule,
    dummyMachineHistory,
    dummyOEEData,
    dummyProductionData
} from '@/data/dummyData';

// ============================================
// IN-MEMORY DATA STORAGE
// ============================================

let accessLevels = [...dummyAccessLevels];
let users = [...dummyUsers];
let machines = [...dummyMachines];
let spareparts = [...dummySpareparts];
let andonTickets = [...dummyAndonTickets];
let maintenanceTickets = [...dummyMaintenanceTickets];
let maintenanceSchedule = [...dummyMaintenanceSchedule];
let machineHistory = [...dummyMachineHistory];

// ============================================
// HELPER FUNCTIONS
// ============================================

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

const getNextId = (array) => {
    if (array.length === 0) return 1;
    return Math.max(...array.map(item => item.id)) + 1;
};

const formatDate = (date = new Date()) => {
    return date.toISOString().replace('T', ' ').substring(0, 19);
};

// ============================================
// MASTER DATA - ACCESS LEVELS
// ============================================

const AccessLevelService = {
    async getAll() {
        await delay();
        return [...accessLevels];
    },

    async getById(id) {
        await delay();
        return accessLevels.find(item => item.id === id) || null;
    },

    async create(data) {
        await delay();
        const newAccessLevel = {
            id: getNextId(accessLevels),
            access_level_id: data.access_level_id || `AL${Date.now()}`,
            name: data.name,
            description: data.description || '',
            allowed_menus: data.allowed_menus || [],
            created_at: formatDate(),
            updated_at: formatDate()
        };
        accessLevels.push(newAccessLevel);
        return newAccessLevel;
    },

    async update(id, data) {
        await delay();
        const index = accessLevels.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Access Level not found');

        accessLevels[index] = {
            ...accessLevels[index],
            ...data,
            updated_at: formatDate()
        };
        return accessLevels[index];
    },

    async delete(id) {
        await delay();
        const index = accessLevels.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Access Level not found');

        accessLevels.splice(index, 1);
        return { success: true, message: 'Access Level deleted successfully' };
    },

    async search(query) {
        await delay();
        const lowerQuery = query.toLowerCase();
        return accessLevels.filter(item =>
            item.name.toLowerCase().includes(lowerQuery) ||
            item.access_level_id.toLowerCase().includes(lowerQuery)
        );
    }
};

// ============================================
// MASTER DATA - USERS
// ============================================

const UserService = {
    async getAll() {
        await delay();
        return [...users];
    },

    async getById(id) {
        await delay();
        return users.find(item => item.id === id) || null;
    },

    async getByNRP(nrp) {
        await delay();
        return users.find(item => item.nrp === nrp) || null;
    },

    async create(data) {
        await delay();

        // Validate unique NRP
        if (users.some(u => u.nrp === data.nrp)) {
            throw new Error('NRP already exists');
        }

        // Validate unique RFID
        if (data.rfid && users.some(u => u.rfid === data.rfid)) {
            throw new Error('RFID already exists');
        }

        const newUser = {
            id: getNextId(users),
            user_id: data.user_id || `USR${String(getNextId(users)).padStart(3, '0')}`,
            name: data.name,
            nrp: data.nrp,
            password: data.password,
            access_level_id: data.access_level_id,
            access_level_name: accessLevels.find(al => al.id === data.access_level_id)?.name || '',
            rfid: data.rfid || '',
            picture_url: data.picture_url || '',
            status: data.status || 'active',
            email: data.email || '',
            phone: data.phone || '',
            created_at: formatDate(),
            updated_at: formatDate()
        };
        users.push(newUser);
        return newUser;
    },

    async update(id, data) {
        await delay();
        const index = users.findIndex(item => item.id === id);
        if (index === -1) throw new Error('User not found');

        // Validate unique NRP if changed
        if (data.nrp && data.nrp !== users[index].nrp) {
            if (users.some(u => u.nrp === data.nrp)) {
                throw new Error('NRP already exists');
            }
        }

        // Validate unique RFID if changed
        if (data.rfid && data.rfid !== users[index].rfid) {
            if (users.some(u => u.rfid === data.rfid)) {
                throw new Error('RFID already exists');
            }
        }

        users[index] = {
            ...users[index],
            ...data,
            access_level_name: data.access_level_id
                ? accessLevels.find(al => al.id === data.access_level_id)?.name
                : users[index].access_level_name,
            updated_at: formatDate()
        };
        return users[index];
    },

    async delete(id) {
        await delay();
        const index = users.findIndex(item => item.id === id);
        if (index === -1) throw new Error('User not found');

        users.splice(index, 1);
        return { success: true, message: 'User deleted successfully' };
    },

    async search(query) {
        await delay();
        const lowerQuery = query.toLowerCase();
        return users.filter(item =>
            item.name.toLowerCase().includes(lowerQuery) ||
            item.nrp.toLowerCase().includes(lowerQuery) ||
            item.user_id.toLowerCase().includes(lowerQuery)
        );
    },

    async authenticate(nrp, password) {
        await delay();
        const user = users.find(u => u.nrp === nrp && u.password === password);
        if (!user) throw new Error('Invalid credentials');
        if (user.status !== 'active') throw new Error('User account is inactive');
        return user;
    }
};

// ============================================
// MASTER DATA - MACHINES
// ============================================

const MachineService = {
    async getAll() {
        await delay();
        return [...machines];
    },

    async getById(id) {
        await delay();
        return machines.find(item => item.id === id) || null;
    },

    async getByMachineId(machineId) {
        await delay();
        return machines.find(item => item.machine_id === machineId) || null;
    },

    async getByLine(lineId) {
        await delay();
        return machines.filter(item => item.line_id === lineId);
    },

    async create(data) {
        await delay();

        // Validate unique machine_id
        if (machines.some(m => m.machine_id === data.machine_id)) {
            throw new Error('Machine ID already exists');
        }

        const newMachine = {
            id: getNextId(machines),
            machine_id: data.machine_id,
            name: data.name,
            asset_no: data.asset_no || '',
            acquisition_year: data.acquisition_year || new Date().getFullYear(),
            machine_type: data.machine_type || '',
            specifications: data.specifications || '',
            status: data.status || 'active',
            image_url: data.image_url || '',
            line_id: data.line_id || '',
            position_x: data.position_x || 0,
            position_y: data.position_y || 0,
            created_at: formatDate(),
            updated_at: formatDate()
        };
        machines.push(newMachine);
        return newMachine;
    },

    async update(id, data) {
        await delay();
        const index = machines.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Machine not found');

        // Validate unique machine_id if changed
        if (data.machine_id && data.machine_id !== machines[index].machine_id) {
            if (machines.some(m => m.machine_id === data.machine_id)) {
                throw new Error('Machine ID already exists');
            }
        }

        machines[index] = {
            ...machines[index],
            ...data,
            updated_at: formatDate()
        };
        return machines[index];
    },

    async delete(id) {
        await delay();
        const index = machines.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Machine not found');

        machines.splice(index, 1);
        return { success: true, message: 'Machine deleted successfully' };
    },

    async search(query) {
        await delay();
        const lowerQuery = query.toLowerCase();
        return machines.filter(item =>
            item.name.toLowerCase().includes(lowerQuery) ||
            item.machine_id.toLowerCase().includes(lowerQuery) ||
            item.asset_no.toLowerCase().includes(lowerQuery)
        );
    },

    async updateStatus(id, status) {
        await delay();
        const index = machines.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Machine not found');

        machines[index].status = status;
        machines[index].updated_at = formatDate();
        return machines[index];
    }
};

// ============================================
// MASTER DATA - SPAREPARTS
// ============================================

const SparepartService = {
    async getAll() {
        await delay();
        return [...spareparts];
    },

    async getById(id) {
        await delay();
        return spareparts.find(item => item.id === id) || null;
    },

    async getByPartNumber(partNumber) {
        await delay();
        return spareparts.find(item => item.part_number === partNumber) || null;
    },

    async getByMachine(machineId) {
        await delay();
        return spareparts.filter(item =>
            item.machine_compatibility && item.machine_compatibility.includes(machineId)
        );
    },

    async create(data) {
        await delay();

        // Validate unique part_number
        if (spareparts.some(s => s.part_number === data.part_number)) {
            throw new Error('Part Number already exists');
        }

        const newSparepart = {
            id: getNextId(spareparts),
            part_number: data.part_number,
            part_name: data.part_name,
            specification: data.specification || '',
            brand: data.brand || '',
            type: data.type || '',
            stock: data.stock || 0,
            min_stock: data.min_stock || 0,
            unit: data.unit || 'pcs',
            price: data.price || 0,
            image_url: data.image_url || '',
            machine_compatibility: data.machine_compatibility || [],
            supplier: data.supplier || '',
            last_purchase_date: data.last_purchase_date || null,
            created_at: formatDate(),
            updated_at: formatDate()
        };
        spareparts.push(newSparepart);
        return newSparepart;
    },

    async update(id, data) {
        await delay();
        const index = spareparts.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Sparepart not found');

        // Validate unique part_number if changed
        if (data.part_number && data.part_number !== spareparts[index].part_number) {
            if (spareparts.some(s => s.part_number === data.part_number)) {
                throw new Error('Part Number already exists');
            }
        }

        spareparts[index] = {
            ...spareparts[index],
            ...data,
            updated_at: formatDate()
        };
        return spareparts[index];
    },

    async delete(id) {
        await delay();
        const index = spareparts.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Sparepart not found');

        spareparts.splice(index, 1);
        return { success: true, message: 'Sparepart deleted successfully' };
    },

    async search(query) {
        await delay();
        const lowerQuery = query.toLowerCase();
        return spareparts.filter(item =>
            item.part_name.toLowerCase().includes(lowerQuery) ||
            item.part_number.toLowerCase().includes(lowerQuery) ||
            item.brand.toLowerCase().includes(lowerQuery) ||
            item.type.toLowerCase().includes(lowerQuery)
        );
    },

    async updateStock(id, quantity, operation = 'add') {
        await delay();
        const index = spareparts.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Sparepart not found');

        if (operation === 'add') {
            spareparts[index].stock += quantity;
        } else if (operation === 'subtract') {
            if (spareparts[index].stock < quantity) {
                throw new Error('Insufficient stock');
            }
            spareparts[index].stock -= quantity;
        }

        spareparts[index].updated_at = formatDate();
        return spareparts[index];
    }
};

// ============================================
// ANDON SYSTEM
// ============================================

const AndonService = {
    async getAll() {
        await delay();
        return [...andonTickets].sort((a, b) =>
            new Date(b.issued_date) - new Date(a.issued_date)
        );
    },

    async getById(id) {
        await delay();
        return andonTickets.find(item => item.id === id) || null;
    },

    async getByStatus(status) {
        await delay();
        return andonTickets.filter(item => item.status === status);
    },

    async getByMachine(machineId) {
        await delay();
        return andonTickets.filter(item => item.machine_id === machineId);
    },

    async create(data) {
        await delay();

        const machine = machines.find(m => m.id === data.machine_id);
        const callByUser = users.find(u => u.id === data.call_by_user_id);

        const newTicket = {
            id: getNextId(andonTickets),
            ticket_id: `CALL-${String(getNextId(andonTickets)).padStart(3, '0')}`,
            issued_date: formatDate(),
            machine_id: data.machine_id,
            machine_name: machine?.name || '',
            call_by_user_id: data.call_by_user_id,
            call_by_name: callByUser?.name || '',
            arrival_time: null,
            response_by_user_id: null,
            response_by_name: null,
            duration: null,
            status: 'open',
            priority: data.priority || 'medium',
            issue_type: data.issue_type || '',
            description: data.description || '',
            resolution: null,
            attachments: data.attachments || [],
            created_at: formatDate(),
            updated_at: formatDate()
        };
        andonTickets.push(newTicket);
        return newTicket;
    },

    async respond(id, data) {
        await delay();
        const index = andonTickets.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Andon Ticket not found');

        const responseByUser = users.find(u => u.id === data.response_by_user_id);

        andonTickets[index] = {
            ...andonTickets[index],
            arrival_time: data.arrival_time || formatDate(),
            response_by_user_id: data.response_by_user_id,
            response_by_name: responseByUser?.name || '',
            duration: data.duration || null,
            status: data.status || 'closed',
            resolution: data.resolution || '',
            updated_at: formatDate()
        };
        return andonTickets[index];
    },

    async updateStatus(id, status) {
        await delay();
        const index = andonTickets.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Andon Ticket not found');

        andonTickets[index].status = status;
        andonTickets[index].updated_at = formatDate();
        return andonTickets[index];
    },

    async delete(id) {
        await delay();
        const index = andonTickets.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Andon Ticket not found');

        andonTickets.splice(index, 1);
        return { success: true, message: 'Andon Ticket deleted successfully' };
    },

    async search(query) {
        await delay();
        const lowerQuery = query.toLowerCase();
        return andonTickets.filter(item =>
            item.ticket_id.toLowerCase().includes(lowerQuery) ||
            item.machine_name.toLowerCase().includes(lowerQuery) ||
            item.call_by_name.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery)
        );
    }
};

// ============================================
// MAINTENANCE SYSTEM
// ============================================

const MaintenanceService = {
    async getAll() {
        await delay();
        return [...maintenanceTickets].sort((a, b) =>
            new Date(b.issued_date) - new Date(a.issued_date)
        );
    },

    async getById(id) {
        await delay();
        return maintenanceTickets.find(item => item.id === id) || null;
    },

    async getByStatus(status) {
        await delay();
        return maintenanceTickets.filter(item => item.status === status);
    },

    async getByType(type) {
        await delay();
        return maintenanceTickets.filter(item => item.type === type);
    },

    async getByMachine(machineId) {
        await delay();
        return maintenanceTickets.filter(item => item.machine_id === machineId);
    },

    async create(data) {
        await delay();

        const machine = machines.find(m => m.id === data.machine_id);
        const createdByUser = users.find(u => u.id === data.created_by_user_id);

        const newTicket = {
            id: getNextId(maintenanceTickets),
            ticket_id: `MTC-${String(getNextId(maintenanceTickets)).padStart(3, '0')}`,
            maintenance_no: `Maintenance-${String(getNextId(maintenanceTickets)).padStart(3, '0')}`,
            issued_date: formatDate(),
            machine_id: data.machine_id,
            machine_name: machine?.name || '',
            type: data.type || 'Corrective',
            problem: data.problem || '',
            repair: data.repair || '',
            created_by_user_id: data.created_by_user_id,
            created_by_name: createdByUser?.name || '',
            response_by_user_id: null,
            response_by_name: null,
            status: 'new',
            duration: null,
            priority: data.priority || 'medium',
            parts_used: [],
            created_at: formatDate(),
            updated_at: formatDate()
        };
        maintenanceTickets.push(newTicket);
        return newTicket;
    },

    async respond(id, data) {
        await delay();
        const index = maintenanceTickets.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Maintenance Ticket not found');

        const responseByUser = users.find(u => u.id === data.response_by_user_id);

        maintenanceTickets[index] = {
            ...maintenanceTickets[index],
            repair: data.repair || maintenanceTickets[index].repair,
            response_by_user_id: data.response_by_user_id,
            response_by_name: responseByUser?.name || '',
            duration: data.duration || null,
            status: data.status || 'done',
            parts_used: data.parts_used || [],
            updated_at: formatDate()
        };

        // Update sparepart stock if parts were used
        if (data.parts_used && data.parts_used.length > 0) {
            for (const part of data.parts_used) {
                const sparepart = spareparts.find(s => s.part_number === part.part_number);
                if (sparepart) {
                    await SparepartService.updateStock(sparepart.id, part.quantity, 'subtract');
                }
            }
        }

        return maintenanceTickets[index];
    },

    async updateStatus(id, status) {
        await delay();
        const index = maintenanceTickets.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Maintenance Ticket not found');

        maintenanceTickets[index].status = status;
        maintenanceTickets[index].updated_at = formatDate();
        return maintenanceTickets[index];
    },

    async delete(id) {
        await delay();
        const index = maintenanceTickets.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Maintenance Ticket not found');

        maintenanceTickets.splice(index, 1);
        return { success: true, message: 'Maintenance Ticket deleted successfully' };
    },

    async search(query) {
        await delay();
        const lowerQuery = query.toLowerCase();
        return maintenanceTickets.filter(item =>
            item.ticket_id.toLowerCase().includes(lowerQuery) ||
            item.maintenance_no.toLowerCase().includes(lowerQuery) ||
            item.machine_name.toLowerCase().includes(lowerQuery) ||
            item.problem.toLowerCase().includes(lowerQuery)
        );
    }
};

// ============================================
// MAINTENANCE SCHEDULE
// ============================================

const MaintenanceScheduleService = {
    async getAll() {
        await delay();
        return [...maintenanceSchedule].sort((a, b) =>
            new Date(a.schedule_date) - new Date(b.schedule_date)
        );
    },

    async getByDateRange(startDate, endDate) {
        await delay();
        return maintenanceSchedule.filter(item => {
            const scheduleDate = new Date(item.schedule_date);
            return scheduleDate >= new Date(startDate) && scheduleDate <= new Date(endDate);
        });
    },

    async create(data) {
        await delay();

        const machine = machines.find(m => m.id === data.machine_id);

        const newSchedule = {
            id: getNextId(maintenanceSchedule),
            schedule_date: data.schedule_date,
            type: data.type || 'Preventive',
            description: data.description || '',
            machine_id: data.machine_id,
            machine_name: machine?.name || '',
            assigned_to: data.assigned_to || '',
            status: 'scheduled',
            created_at: formatDate()
        };
        maintenanceSchedule.push(newSchedule);
        return newSchedule;
    },

    async delete(id) {
        await delay();
        const index = maintenanceSchedule.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Schedule not found');

        maintenanceSchedule.splice(index, 1);
        return { success: true, message: 'Schedule deleted successfully' };
    }
};

// ============================================
// TRACEABILITY SYSTEM
// ============================================

const TraceabilityService = {
    async getAll() {
        await delay();
        return [...machineHistory];
    },

    async getByMachineId(machineId) {
        await delay();
        return machineHistory.find(item => item.machine_id === machineId) || null;
    },

    async search(query) {
        await delay();
        const lowerQuery = query.toLowerCase();
        return machineHistory.filter(item =>
            item.machine_name.toLowerCase().includes(lowerQuery) ||
            item.machine_id.toString().includes(lowerQuery) ||
            item.asset_no.toLowerCase().includes(lowerQuery)
        );
    }
};

// ============================================
// DASHBOARD DATA
// ============================================

const DashboardService = {
    async getOEEData(lineId) {
        await delay();
        return dummyOEEData[lineId] || dummyOEEData.line_1;
    },

    async getProductionData() {
        await delay();
        return [...dummyProductionData];
    }
};

// ============================================
// EXPORT SERVICE
// ============================================

const DummyDataService = {
    // Master Data Services
    accessLevels: AccessLevelService,
    users: UserService,
    machines: MachineService,
    spareparts: SparepartService,

    // System Services
    andon: AndonService,
    maintenance: MaintenanceService,
    maintenanceSchedule: MaintenanceScheduleService,
    traceability: TraceabilityService,

    // Dashboard Services
    dashboard: DashboardService,

    // Utility Functions
    async resetAllData() {
        accessLevels = [...dummyAccessLevels];
        users = [...dummyUsers];
        machines = [...dummyMachines];
        spareparts = [...dummySpareparts];
        andonTickets = [...dummyAndonTickets];
        maintenanceTickets = [...dummyMaintenanceTickets];
        maintenanceSchedule = [...dummyMaintenanceSchedule];
        machineHistory = [...dummyMachineHistory];
        return { success: true, message: 'All data reset to initial state' };
    },

    async exportAllData() {
        return {
            accessLevels: [...accessLevels],
            users: [...users],
            machines: [...machines],
            spareparts: [...spareparts],
            andonTickets: [...andonTickets],
            maintenanceTickets: [...maintenanceTickets],
            maintenanceSchedule: [...maintenanceSchedule],
            machineHistory: [...machineHistory]
        };
    },

    // ============================================
    // LAYOUT TEMPLATES - LocalStorage based
    // ============================================

    saveLayoutTemplate(template) {
        const templates = JSON.parse(localStorage.getItem('layoutTemplates') || '[]');
        templates.push(template);
        localStorage.setItem('layoutTemplates', JSON.stringify(templates));
        return template;
    },

    getLayoutTemplates() {
        return JSON.parse(localStorage.getItem('layoutTemplates') || '[]');
    },

    getLayoutTemplate(id) {
        const templates = this.getLayoutTemplates();
        return templates.find(t => t.id === id);
    },

    deleteLayoutTemplate(id) {
        const templates = this.getLayoutTemplates();
        const filtered = templates.filter(t => t.id !== id);
        localStorage.setItem('layoutTemplates', JSON.stringify(filtered));
        return { success: true, message: 'Template deleted successfully' };
    },

    // ============================================
    // HELPER SHORTCUTS - Direct access without async
    // ============================================

    getMachines() {
        return [...machines];
    },

    getMachine(machineId) {
        return machines.find(m => m.machine_id === machineId);
    },

    getUsers() {
        return [...users];
    },

    getAccessLevels() {
        return [...accessLevels];
    },

    getSpareparts() {
        return [...spareparts];
    }
};

export default DummyDataService;

