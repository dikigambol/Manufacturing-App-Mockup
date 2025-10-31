import { useState, useEffect, useContext } from 'react';
import { Search, Plus, Phone, Clock, AlertCircle } from 'lucide-react';
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
import DummyDataService from '@/services/DummyDataService';
import { AlertContext } from '@/contexts/alert';
import { useAuth } from '@/contexts/auth';

const AndonList = () => {
    const [tickets, setTickets] = useState([]);
    const [machines, setMachines] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showResponseModal, setShowResponseModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [createFormData, setCreateFormData] = useState({
        machine_id: '',
        priority: 'medium',
        issue_type: '',
        description: ''
    });
    const [responseFormData, setResponseFormData] = useState({
        resolution: '',
        duration: 0,
        status: 'closed'
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
            const [ticketsData, machinesData] = await Promise.all([
                DummyDataService.andon.getAll(),
                DummyDataService.machines.getAll()
            ]);
            setTickets(ticketsData);
            setMachines(machinesData);
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
            item.machine_name.toLowerCase().includes(query) ||
            item.call_by_name.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    const handleOpenCreateModal = () => {
        setCreateFormData({
            machine_id: '',
            priority: 'medium',
            issue_type: '',
            description: ''
        });
        setShowCreateModal(true);
    };

    const handleOpenResponseModal = (ticket) => {
        setSelectedTicket(ticket);
        setResponseFormData({
            resolution: '',
            duration: 0,
            status: 'closed'
        });
        setShowResponseModal(true);
    };

    const handleCreateTicket = async () => {
        try {
            if (!createFormData.machine_id) {
                showAlert('error', 'Please select a machine');
                return;
            }
            if (!createFormData.issue_type) {
                showAlert('error', 'Please select issue type');
                return;
            }
            if (!createFormData.description.trim()) {
                showAlert('error', 'Please enter description');
                return;
            }

            await DummyDataService.andon.create({
                ...createFormData,
                call_by_user_id: user?.id || 1
            });

            showAlert('success', 'Andon ticket created successfully');
            setShowCreateModal(false);
            await loadData();
        } catch (error) {
            showAlert('error', 'Failed to create ticket: ' + error.message);
        }
    };

    const handleResponseTicket = async () => {
        try {
            if (!responseFormData.resolution.trim()) {
                showAlert('error', 'Please enter resolution details');
                return;
            }
            if (!responseFormData.duration || responseFormData.duration <= 0) {
                showAlert('error', 'Please enter valid duration');
                return;
            }

            await DummyDataService.andon.respond(selectedTicket.id, {
                ...responseFormData,
                response_by_user_id: user?.id || 3
            });

            showAlert('success', 'Ticket response submitted successfully');
            setShowResponseModal(false);
            setSelectedTicket(null);
            await loadData();
        } catch (error) {
            showAlert('error', 'Failed to respond: ' + error.message);
        }
    };

    const getStatusBadge = (status, priority) => {
        const statusColors = {
            open: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
            closed: 'bg-green-500/10 text-green-600 border-green-500/20',
            in_progress: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
            escalated: 'bg-red-500/10 text-red-600 border-red-500/20'
        };

        const priorityIcons = {
            critical: <AlertCircle className="h-3 w-3 text-red-600" />,
            high: <AlertCircle className="h-3 w-3 text-orange-600" />,
            medium: <Clock className="h-3 w-3 text-yellow-600" />,
            low: <Clock className="h-3 w-3 text-blue-600" />
        };

        return (
            <div className="flex items-center gap-2">
                {priorityIcons[priority]}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.open}`}>
                    {status}
                </span>
            </div>
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading andon tickets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">ANDON LIST</h1>
                    <p className="text-muted-foreground mt-1">
                        Machine issue reporting and response tracking
                    </p>
                </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
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
                        const openTicket = tickets.find(t => t.status === 'open');
                        if (openTicket) {
                            handleOpenResponseModal(openTicket);
                        } else {
                            showAlert('error', 'No open tickets to respond');
                        }
                    }}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Phone className="h-4 w-4 mr-2" />
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
                            <TableHead className="w-16">No</TableHead>
                            <TableHead>Andon Ticket</TableHead>
                            <TableHead>Issued Date</TableHead>
                            <TableHead>Machine</TableHead>
                            <TableHead>Call By</TableHead>
                            <TableHead>Arrival Time</TableHead>
                            <TableHead>Response By</TableHead>
                            <TableHead>Duration (min)</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                                    {searchQuery ? 'No tickets found matching your search' : 'No andon tickets available'}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredData.map((ticket, index) => (
                                <TableRow
                                    key={ticket.id}
                                    className={ticket.status === 'open' ? 'bg-yellow-50 dark:bg-yellow-950/10' : ''}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-mono text-sm font-medium">{ticket.ticket_id}</TableCell>
                                    <TableCell className="text-sm">{formatDateTime(ticket.issued_date)}</TableCell>
                                    <TableCell className="font-medium">{ticket.machine_name}</TableCell>
                                    <TableCell className="text-sm">{ticket.call_by_name}</TableCell>
                                    <TableCell className="text-sm">{formatDateTime(ticket.arrival_time)}</TableCell>
                                    <TableCell className="text-sm">{ticket.response_by_name || '-'}</TableCell>
                                    <TableCell className="text-sm">{ticket.duration || '-'}</TableCell>
                                    <TableCell>{getStatusBadge(ticket.status, ticket.priority)}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Create Ticket Modal */}
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>+ Create Ticket</DialogTitle>
                        <DialogDescription>
                            Report a machine issue or problem
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Ticket No</Label>
                            <Input
                                value={`CALL-${String(tickets.length + 1).padStart(3, '0')}`}
                                readOnly
                                className="bg-muted"
                            />
                        </div>

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
                                            {machine.name} ({machine.machine_id})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="issue_type">Issue Type *</Label>
                                <Select
                                    value={createFormData.issue_type}
                                    onValueChange={(value) => setCreateFormData({ ...createFormData, issue_type: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Issue Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mechanical">Mechanical</SelectItem>
                                        <SelectItem value="electrical">Electrical</SelectItem>
                                        <SelectItem value="sparepart">Sparepart</SelectItem>
                                        <SelectItem value="quality">Quality</SelectItem>
                                        <SelectItem value="safety">Safety</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="priority">Priority *</Label>
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
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                value={createFormData.description}
                                onChange={(e) => setCreateFormData({ ...createFormData, description: e.target.value })}
                                placeholder="Describe the issue in detail..."
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
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Phone className="h-5 w-5 text-blue-600" />
                            Response Ticket
                        </DialogTitle>
                        <DialogDescription>
                            Provide resolution details for this ticket
                        </DialogDescription>
                    </DialogHeader>

                    {selectedTicket && (
                        <div className="space-y-6 py-4">
                            {/* Phone Icon with Question */}
                            <div className="text-center">
                                <div className="mx-auto w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                                    <Phone className="h-12 w-12 text-blue-600" />
                                </div>
                                <p className="text-lg font-medium">
                                    Are you sure to close this ticket?
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Ticket: {selectedTicket.ticket_id} - {selectedTicket.machine_name}
                                </p>
                            </div>

                            {/* Ticket Info */}
                            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Issue Type:</span>
                                        <span className="ml-2 font-medium">{selectedTicket.issue_type}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Priority:</span>
                                        <span className="ml-2 font-medium capitalize">{selectedTicket.priority}</span>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <span className="text-muted-foreground">Description:</span>
                                    <p className="mt-1">{selectedTicket.description}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="resolution">Resolution *</Label>
                                <Textarea
                                    id="resolution"
                                    value={responseFormData.resolution}
                                    onChange={(e) => setResponseFormData({ ...responseFormData, resolution: e.target.value })}
                                    placeholder="Describe the resolution applied..."
                                    rows={4}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (minutes) *</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        value={responseFormData.duration}
                                        onChange={(e) => setResponseFormData({ ...responseFormData, duration: parseInt(e.target.value) || 0 })}
                                        placeholder="Enter resolution time"
                                        min="1"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={responseFormData.status}
                                        onValueChange={(value) => setResponseFormData({ ...responseFormData, status: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="closed">Closed</SelectItem>
                                            <SelectItem value="escalated">Escalated</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowResponseModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleResponseTicket}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <Phone className="h-4 w-4 mr-2" />
                            Response
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AndonList;

