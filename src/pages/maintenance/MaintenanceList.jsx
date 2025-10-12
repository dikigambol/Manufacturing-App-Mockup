import { useState, useEffect, useContext } from 'react';
import { Search, Plus, Wrench, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DummyDataService from '@/services/DummyDataService';
import { AlertContext } from '@/contexts/alert';
import { useAuth } from '@/contexts/auth';

const MaintenanceList = () => {
    const [tickets, setTickets] = useState([]);
    const [machines, setMachines] = useState([]);
    const [spareparts, setSpareparts] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showResponseModal, setShowResponseModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectedParts, setSelectedParts] = useState([]);
    const [createFormData, setCreateFormData] = useState({
        machine_id: '',
        type: 'Corrective',
        problem: '',
        priority: 'medium'
    });
    const [responseFormData, setResponseFormData] = useState({
        repair: '',
        duration: 0,
        status: 'done'
    });
    const alertContext = useContext(AlertContext);
    const { user } = useAuth();

    const showAlert = (status, message) => {
        if (alertContext && alertContext.alert) {
            alertContext.alert({ status, message, time: 3 });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchQuery, tickets]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [ticketsData, machinesData, sparepartsData, scheduleData] = await Promise.all([
                DummyDataService.maintenance.getAll(),
                DummyDataService.machines.getAll(),
                DummyDataService.spareparts.getAll(),
                DummyDataService.maintenanceSchedule.getAll()
            ]);
            setTickets(ticketsData);
            setMachines(machinesData);
            setSpareparts(sparepartsData);
            setSchedule(scheduleData);
            setFilteredData(ticketsData);
        } catch (error) {
            showAlert('error', 'Failed to load data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        if (!searchQuery.trim()) {
            setFilteredData(tickets);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = tickets.filter(item =>
            item.ticket_id.toLowerCase().includes(query) ||
            item.maintenance_no.toLowerCase().includes(query) ||
            item.machine_name.toLowerCase().includes(query) ||
            item.problem?.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    const handleOpenCreateModal = () => {
        setCreateFormData({
            machine_id: '',
            type: 'Corrective',
            problem: '',
            priority: 'medium'
        });
        setShowCreateModal(true);
    };

    const handleOpenResponseModal = (ticket) => {
        setSelectedTicket(ticket);
        setSelectedParts([]);
        setResponseFormData({
            repair: ticket.repair || '',
            duration: 0,
            status: 'done'
        });
        setShowResponseModal(true);
    };

    const handleCreateTicket = async () => {
        try {
            if (!createFormData.machine_id) {
                showAlert('error', 'Please select a machine');
                return;
            }
            if (!createFormData.problem.trim()) {
                showAlert('error', 'Please enter problem description');
                return;
            }

            await DummyDataService.maintenance.create({
                ...createFormData,
                created_by_user_id: user?.id || 1
            });

            showAlert('success', 'Maintenance ticket created successfully');
            setShowCreateModal(false);
            await loadData();
        } catch (error) {
            showAlert('error', 'Failed to create ticket: ' + error.message);
        }
    };

    const handleResponseTicket = async () => {
        try {
            if (!responseFormData.repair.trim()) {
                showAlert('error', 'Please enter repair details');
                return;
            }

            await DummyDataService.maintenance.respond(selectedTicket.id, {
                ...responseFormData,
                response_by_user_id: user?.id || 3,
                parts_used: selectedParts
            });

            showAlert('success', 'Maintenance response submitted successfully');
            setShowResponseModal(false);
            setSelectedTicket(null);
            setSelectedParts([]);
            await loadData();
        } catch (error) {
            showAlert('error', 'Failed to respond: ' + error.message);
        }
    };

    const handleAddPart = (part) => {
        const existingPart = selectedParts.find(p => p.part_number === part.part_number);
        if (existingPart) {
            showAlert('error', 'Part already added');
            return;
        }

        setSelectedParts([...selectedParts, {
            part_number: part.part_number,
            part_name: part.part_name,
            brand: part.brand,
            quantity: 1
        }]);
    };

    const handleRemovePart = (partNumber) => {
        setSelectedParts(selectedParts.filter(p => p.part_number !== partNumber));
    };

    const handleUpdatePartQuantity = (partNumber, quantity) => {
        setSelectedParts(selectedParts.map(p =>
            p.part_number === partNumber ? { ...p, quantity: parseInt(quantity) || 1 } : p
        ));
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            new: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
            on_progress: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
            done: 'bg-green-500/10 text-green-600 border-green-500/20',
            cancelled: 'bg-gray-500/10 text-gray-600 border-gray-500/20'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.new}`}>
                {status}
            </span>
        );
    };

    const getTypeBadge = (type) => {
        const typeColors = {
            Corrective: 'bg-red-500/10 text-red-600',
            Preventive: 'bg-blue-500/10 text-blue-600',
            WO: 'bg-purple-500/10 text-purple-600'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[type] || typeColors.Corrective}`}>
                {type}
            </span>
        );
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading maintenance data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content - Ticket List */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">MAINTENANCE LIST</h1>
                            <p className="text-muted-foreground mt-1">
                                Comprehensive maintenance ticket management
                            </p>
                        </div>
                    </div>

                    {/* Search and Actions */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search tickets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button
                            onClick={() => {
                                const newTicket = tickets.find(t => t.status === 'new');
                                if (newTicket) {
                                    handleOpenResponseModal(newTicket);
                                } else {
                                    showAlert('error', 'No new tickets to respond');
                                }
                            }}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <Wrench className="h-4 w-4 mr-2" />
                            Response Ticket
                        </Button>
                        <Button onClick={handleOpenCreateModal} variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Ticket
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="border rounded-lg overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">No</TableHead>
                                    <TableHead>Issued Date</TableHead>
                                    <TableHead>Ticket No</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Machine</TableHead>
                                    <TableHead>Created By</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-24">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                                            {searchQuery ? 'No tickets found' : 'No maintenance tickets'}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((ticket, index) => (
                                        <TableRow key={ticket.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="text-sm">{formatDateTime(ticket.issued_date)}</TableCell>
                                            <TableCell className="font-mono text-sm">{ticket.ticket_id}</TableCell>
                                            <TableCell>{getTypeBadge(ticket.type)}</TableCell>
                                            <TableCell className="font-medium">{ticket.machine_name}</TableCell>
                                            <TableCell className="text-sm">{ticket.created_by_name}</TableCell>
                                            <TableCell className="text-sm">{ticket.duration ? `${ticket.duration} min` : '-'}</TableCell>
                                            <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleOpenResponseModal(ticket)}
                                                >
                                                    Detail
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Sidebar - Calendar & Schedule */}
                <div className="space-y-6">
                    {/* Maintenance Calendar */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Calendar className="h-5 w-5" />
                                Maintenance Calendar
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {schedule.slice(0, 5).map(item => (
                                    <div key={item.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="flex-shrink-0 w-12 text-center">
                                            <div className="text-lg font-bold">{new Date(item.schedule_date).getDate()}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {new Date(item.schedule_date).toLocaleDateString('en', { month: 'short' })}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium truncate">{item.description}</div>
                                            <div className="text-xs text-muted-foreground">{getTypeBadge(item.type)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Schedule Maintenance */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Clock className="h-5 w-5" />
                                Schedule Maintenance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {schedule.map(item => (
                                    <div key={item.id} className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">{formatDate(item.schedule_date)}</span>
                                            {getTypeBadge(item.type)}
                                        </div>
                                        <div className="text-xs text-muted-foreground">{item.description}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Create Ticket Modal */}
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>+ Create Ticket</DialogTitle>
                        <DialogDescription>
                            Create a new maintenance ticket
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Ticket No</Label>
                            <Input
                                value={`MTC-${String(tickets.length + 1).padStart(3, '0')}`}
                                readOnly
                                className="bg-muted"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="machine">Machine *</Label>
                                <Select
                                    value={createFormData.machine_id.toString()}
                                    onValueChange={(value) => setCreateFormData({ ...createFormData, machine_id: parseInt(value) })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Machine" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {machines.map(machine => (
                                            <SelectItem key={machine.id} value={machine.id.toString()}>
                                                {machine.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Type *</Label>
                                <Select
                                    value={createFormData.type}
                                    onValueChange={(value) => setCreateFormData({ ...createFormData, type: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Corrective">Corrective</SelectItem>
                                        <SelectItem value="Preventive">Preventive</SelectItem>
                                        <SelectItem value="WO">WO (Work Order)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                                value={createFormData.priority}
                                onValueChange={(value) => setCreateFormData({ ...createFormData, priority: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="problem">Problem Description *</Label>
                            <Textarea
                                id="problem"
                                value={createFormData.problem}
                                onChange={(e) => setCreateFormData({ ...createFormData, problem: e.target.value })}
                                placeholder="Describe the problem in detail..."
                                rows={4}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateTicket}>
                            Submit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Response Ticket Modal */}
            <Dialog open={showResponseModal} onOpenChange={setShowResponseModal}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Response Ticket</DialogTitle>
                        <DialogDescription>
                            Provide repair details and select used spareparts
                        </DialogDescription>
                    </DialogHeader>

                    {selectedTicket && (
                        <div className="grid grid-cols-2 gap-6 py-4">
                            {/* Left Side - Maintenance Info */}
                            <div className="space-y-4">
                                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                                    <h3 className="font-semibold">Maintenance Information</h3>
                                    <div className="text-sm space-y-1">
                                        <p><span className="text-muted-foreground">Ticket:</span> <span className="font-mono">{selectedTicket.ticket_id}</span></p>
                                        <p><span className="text-muted-foreground">Machine:</span> {selectedTicket.machine_name}</p>
                                        <p><span className="text-muted-foreground">Type:</span> {getTypeBadge(selectedTicket.type)}</p>
                                        <p><span className="text-muted-foreground">Problem:</span> {selectedTicket.problem}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="repair">Repair Description *</Label>
                                    <Textarea
                                        id="repair"
                                        value={responseFormData.repair}
                                        onChange={(e) => setResponseFormData({ ...responseFormData, repair: e.target.value })}
                                        placeholder="Describe the repair work performed..."
                                        rows={4}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="duration">Duration (minutes)</Label>
                                        <Input
                                            id="duration"
                                            type="number"
                                            value={responseFormData.duration}
                                            onChange={(e) => setResponseFormData({ ...responseFormData, duration: parseInt(e.target.value) || 0 })}
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={responseFormData.status}
                                            onValueChange={(value) => setResponseFormData({ ...responseFormData, status: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="done">Done</SelectItem>
                                                <SelectItem value="on_progress">On Progress</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Spareparts Selection */}
                            <div>
                                <Tabs defaultValue="part-list">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="part-list">Part List</TabsTrigger>
                                        <TabsTrigger value="selected-part">
                                            Selected Part ({selectedParts.length})
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="part-list" className="space-y-2">
                                        <Input placeholder="Search parts..." className="mb-2" />
                                        <div className="border rounded-lg max-h-96 overflow-y-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Part No</TableHead>
                                                        <TableHead>Part Name</TableHead>
                                                        <TableHead>Stock</TableHead>
                                                        <TableHead className="w-20">Action</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {spareparts.map(part => (
                                                        <TableRow key={part.id}>
                                                            <TableCell className="font-mono text-xs">{part.part_number}</TableCell>
                                                            <TableCell className="text-sm">{part.part_name}</TableCell>
                                                            <TableCell className="text-sm">{part.stock} {part.unit}</TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => handleAddPart(part)}
                                                                    disabled={part.stock === 0}
                                                                >
                                                                    Add
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="selected-part" className="space-y-2">
                                        {selectedParts.length === 0 ? (
                                            <div className="text-center py-8 text-muted-foreground">
                                                No parts selected
                                            </div>
                                        ) : (
                                            <div className="border rounded-lg">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Part No</TableHead>
                                                            <TableHead>Part Name</TableHead>
                                                            <TableHead>Qty</TableHead>
                                                            <TableHead className="w-20">Action</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {selectedParts.map(part => (
                                                            <TableRow key={part.part_number}>
                                                                <TableCell className="font-mono text-xs">{part.part_number}</TableCell>
                                                                <TableCell className="text-sm">{part.part_name}</TableCell>
                                                                <TableCell>
                                                                    <Input
                                                                        type="number"
                                                                        value={part.quantity}
                                                                        onChange={(e) => handleUpdatePartQuantity(part.part_number, e.target.value)}
                                                                        className="w-16 h-8"
                                                                        min="1"
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="destructive"
                                                                        onClick={() => handleRemovePart(part.part_number)}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowResponseModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleResponseTicket}>
                            Submit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MaintenanceList;

