import { useState, useEffect, useContext } from 'react';
import { Search, Calendar, TrendingUp, Activity } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DummyDataService from '@/services/DummyDataService';
import { AlertContext } from '@/contexts/alert';

const TraceabilityList = () => {
    const [machineHistory, setMachineHistory] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const alertContext = useContext(AlertContext);

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
    }, [searchQuery, machineHistory]);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await DummyDataService.traceability.getAll();
            setMachineHistory(data);
            setFilteredData(data);
            if (data.length > 0) {
                setSelectedMachine(data[0]);
            }
        } catch (error) {
            showAlert('error', 'Failed to load data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        if (!searchQuery.trim()) {
            setFilteredData(machineHistory);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = machineHistory.filter(item =>
            item.machine_name.toLowerCase().includes(query) ||
            item.machine_id.toString().includes(query) ||
            item.asset_no?.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    const handleSelectMachine = (machine) => {
        setSelectedMachine(machine);
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            running: 'bg-green-500/10 text-green-600 border-green-500/20',
            idle: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
            alarm: 'bg-red-500/10 text-red-600 border-red-500/20',
            disconnected: 'bg-gray-500/10 text-gray-600 border-gray-500/20'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.idle}`}>
                {status}
            </span>
        );
    };

    const getMaintenanceStatusBadge = (status) => {
        const statusColors = {
            done: 'bg-green-500/10 text-green-600 border-green-500/20',
            on_progress: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
            cancelled: 'bg-gray-500/10 text-gray-600 border-gray-500/20'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.done}`}>
                {status}
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
                    <p className="mt-4 text-muted-foreground">Loading traceability data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">TRACEABILITY</h1>
                    <p className="text-muted-foreground mt-1">
                        Complete machine history and performance tracking
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search Machine ID, Name, or Asset No..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side - Machine List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">TRACEABILITY LIST</h2>
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">No</TableHead>
                                    <TableHead>Machine ID</TableHead>
                                    <TableHead>Machine Name</TableHead>
                                    <TableHead>Asset No</TableHead>
                                    <TableHead>Last Maintenance</TableHead>
                                    <TableHead className="w-24">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            {searchQuery ? 'No machines found' : 'No machine data available'}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((machine, index) => (
                                        <TableRow
                                            key={machine.id}
                                            className={selectedMachine?.id === machine.id ? 'bg-muted/50' : ''}
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="font-mono text-sm">{machine.machine_id}</TableCell>
                                            <TableCell className="font-medium">{machine.machine_name}</TableCell>
                                            <TableCell className="text-sm">{machine.asset_no}</TableCell>
                                            <TableCell className="text-sm">{formatDate(machine.last_maintenance)}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleSelectMachine(machine)}
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

                {/* Right Side - Machine Detail */}
                {selectedMachine && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">MACHINE DETAIL</h2>

                        <Card>
                            <CardContent className="pt-6">
                                {/* Machine Info */}
                                <div className="space-y-4">
                                    {/* Machine Picture Placeholder */}
                                    <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                                        <div className="text-center text-muted-foreground">
                                            <Activity className="h-12 w-12 mx-auto mb-2" />
                                            <p className="text-sm">Machine Image</p>
                                        </div>
                                    </div>

                                    {/* Machine General Info */}
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-muted-foreground">Machine ID:</span>
                                            <p className="font-mono font-medium">{selectedMachine.machine_id}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Machine Name:</span>
                                            <p className="font-medium">{selectedMachine.machine_name}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Asset No:</span>
                                            <p className="font-medium">{selectedMachine.asset_no}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Acquisition Year:</span>
                                            <p className="font-medium">{selectedMachine.acquisition_year}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Last Maintenance:</span>
                                            <p className="font-medium">{formatDate(selectedMachine.last_maintenance)}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Next Maintenance:</span>
                                            <p className="font-medium">{formatDate(selectedMachine.next_maintenance)}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-muted-foreground">Status:</span>
                                            <div className="mt-1">{getStatusBadge(selectedMachine.status)}</div>
                                        </div>
                                    </div>

                                    {/* Performance Metrics */}
                                    <div className="grid grid-cols-3 gap-3 pt-4 border-t">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">{selectedMachine.total_runtime_hours}h</div>
                                            <div className="text-xs text-muted-foreground">Total Runtime</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-red-600">{selectedMachine.total_downtime_hours}h</div>
                                            <div className="text-xs text-muted-foreground">Total Downtime</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">{selectedMachine.oee_percentage}%</div>
                                            <div className="text-xs text-muted-foreground">OEE</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Maintenance History */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">MAINTENANCE HISTORY</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-12">No</TableHead>
                                                <TableHead>Issued Date</TableHead>
                                                <TableHead>Ticket No</TableHead>
                                                <TableHead>Problem</TableHead>
                                                <TableHead>Repair</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {selectedMachine.maintenance_history && selectedMachine.maintenance_history.length > 0 ? (
                                                selectedMachine.maintenance_history.map((record) => (
                                                    <TableRow key={record.no}>
                                                        <TableCell>{record.no}</TableCell>
                                                        <TableCell className="text-xs">{formatDateTime(record.issued_date)}</TableCell>
                                                        <TableCell className="font-mono text-xs">{record.ticket_no}</TableCell>
                                                        <TableCell className="text-xs max-w-xs truncate">{record.problem}</TableCell>
                                                        <TableCell className="text-xs max-w-xs truncate">{record.repair}</TableCell>
                                                        <TableCell>{getMaintenanceStatusBadge(record.status)}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground text-sm">
                                                        No maintenance history available
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TraceabilityList;

