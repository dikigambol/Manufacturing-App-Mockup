import { useState, useEffect, useContext } from 'react';
import { Search, Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
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
import DummyDataService from '@/services/DummyDataService';
import { AlertContext } from '@/contexts/alert';

const MasterDataMachines = () => {
    const [machines, setMachines] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingMachine, setEditingMachine] = useState(null);
    const [formData, setFormData] = useState({
        machine_id: '',
        name: '',
        asset_no: '',
        acquisition_year: new Date().getFullYear(),
        machine_type: '',
        specifications: '',
        status: 'active',
        image_url: '',
        line_id: ''
    });
    const alertContext = useContext(AlertContext);

    const showAlert = (status, message) => {
        if (alertContext && alertContext.alert) {
            alertContext.alert({ status, message, time: 3 });
        }
    };

    useEffect(() => {
        loadMachines();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchQuery, machines]);

    const loadMachines = async () => {
        try {
            setLoading(true);
            const data = await DummyDataService.machines.getAll();
            setMachines(data);
            setFilteredData(data);
        } catch (error) {
            showAlert('error', 'Failed to load machines: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        if (!searchQuery.trim()) {
            setFilteredData(machines);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = machines.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.machine_id.toLowerCase().includes(query) ||
            item.asset_no?.toLowerCase().includes(query) ||
            item.machine_type?.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    const handleOpenModal = (machine = null) => {
        if (machine) {
            setEditingMachine(machine);
            setFormData({
                machine_id: machine.machine_id,
                name: machine.name,
                asset_no: machine.asset_no || '',
                acquisition_year: machine.acquisition_year || new Date().getFullYear(),
                machine_type: machine.machine_type || '',
                specifications: machine.specifications || '',
                status: machine.status || 'active',
                image_url: machine.image_url || '',
                line_id: machine.line_id || ''
            });
        } else {
            setEditingMachine(null);
            setFormData({
                machine_id: '',
                name: '',
                asset_no: '',
                acquisition_year: new Date().getFullYear(),
                machine_type: '',
                specifications: '',
                status: 'active',
                image_url: '',
                line_id: ''
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingMachine(null);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image_url: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            if (!formData.machine_id.trim()) {
                showAlert('error', 'Machine ID is required');
                return;
            }
            if (!formData.name.trim()) {
                showAlert('error', 'Machine Name is required');
                return;
            }

            if (editingMachine) {
                await DummyDataService.machines.update(editingMachine.id, formData);
                showAlert('success', 'Machine updated successfully');
            } else {
                await DummyDataService.machines.create(formData);
                showAlert('success', 'Machine created successfully');
            }

            handleCloseModal();
            await loadMachines();
        } catch (error) {
            showAlert('error', 'Failed to save: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this machine?')) {
            return;
        }

        try {
            await DummyDataService.machines.delete(id);
            showAlert('success', 'Machine deleted successfully');
            await loadMachines();
        } catch (error) {
            showAlert('error', 'Failed to delete: ' + error.message);
        }
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            running: 'bg-green-500/10 text-green-600 border-green-500/20',
            idle: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
            alarm: 'bg-red-500/10 text-red-600 border-red-500/20',
            disconnected: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
            active: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
            maintenance: 'bg-orange-500/10 text-orange-600 border-orange-500/20'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.active}`}>
                {status}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading machines...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">MASTER DATA - MACHINES</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage machine inventory and configurations
                    </p>
                </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search machines..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button onClick={() => handleOpenModal()} className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                </Button>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">No</TableHead>
                            <TableHead>Machine ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Asset No</TableHead>
                            <TableHead>Acquisition Year</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-32 text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    {searchQuery ? 'No machines found matching your search' : 'No machines available'}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredData.map((machine, index) => (
                                <TableRow key={machine.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-mono text-sm">{machine.machine_id}</TableCell>
                                    <TableCell className="font-medium">{machine.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{machine.asset_no || '-'}</TableCell>
                                    <TableCell>{machine.acquisition_year}</TableCell>
                                    <TableCell>
                                        <span className="text-sm text-muted-foreground">
                                            {machine.machine_type || '-'}
                                        </span>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(machine.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleOpenModal(machine)}
                                            >
                                                <Pencil className="h-3 w-3 mr-1" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(machine.id)}
                                            >
                                                <Trash2 className="h-3 w-3 mr-1" />
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Add/Edit Modal */}
            <Dialog open={showModal} onOpenChange={handleCloseModal}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingMachine ? 'Edit Machine' : '+ Add Machine'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingMachine
                                ? 'Update machine information and specifications'
                                : 'Add a new machine to the inventory'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Machine ID */}
                            <div className="space-y-2">
                                <Label htmlFor="machine_id">Machine ID *</Label>
                                <Input
                                    id="machine_id"
                                    value={formData.machine_id}
                                    onChange={(e) => setFormData({ ...formData, machine_id: e.target.value })}
                                    placeholder="e.g., MCH-001"
                                    disabled={editingMachine !== null}
                                />
                            </div>

                            {/* Asset No */}
                            <div className="space-y-2">
                                <Label htmlFor="asset_no">Asset No</Label>
                                <Input
                                    id="asset_no"
                                    value={formData.asset_no}
                                    onChange={(e) => setFormData({ ...formData, asset_no: e.target.value })}
                                    placeholder="e.g., 1234567890"
                                />
                            </div>
                        </div>

                        {/* Machine Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Machine Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Nut Runner Cyl Head"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Acquisition Year */}
                            <div className="space-y-2">
                                <Label htmlFor="acquisition_year">Acquisition Year</Label>
                                <Input
                                    id="acquisition_year"
                                    type="number"
                                    value={formData.acquisition_year}
                                    onChange={(e) => setFormData({ ...formData, acquisition_year: parseInt(e.target.value) })}
                                    placeholder="e.g., 2023"
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                />
                            </div>

                            {/* Machine Type */}
                            <div className="space-y-2">
                                <Label htmlFor="machine_type">Machine Type</Label>
                                <Select
                                    value={formData.machine_type}
                                    onValueChange={(value) => setFormData({ ...formData, machine_type: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Assembly">Assembly</SelectItem>
                                        <SelectItem value="Testing">Testing</SelectItem>
                                        <SelectItem value="Inspection">Inspection</SelectItem>
                                        <SelectItem value="Filling">Filling</SelectItem>
                                        <SelectItem value="Packaging">Packaging</SelectItem>
                                        <SelectItem value="Machining">Machining</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Status */}
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="running">Running</SelectItem>
                                        <SelectItem value="idle">Idle</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                        <SelectItem value="alarm">Alarm</SelectItem>
                                        <SelectItem value="disconnected">Disconnected</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Line Assignment */}
                            <div className="space-y-2">
                                <Label htmlFor="line_id">Production Line</Label>
                                <Select
                                    value={formData.line_id}
                                    onValueChange={(value) => setFormData({ ...formData, line_id: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select line" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="line_1">Line 1</SelectItem>
                                        <SelectItem value="line_2">Line 2</SelectItem>
                                        <SelectItem value="line_3">Line 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Specifications */}
                        <div className="space-y-2">
                            <Label htmlFor="specifications">Specifications</Label>
                            <Input
                                id="specifications"
                                value={formData.specifications}
                                onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                                placeholder="e.g., Torque: 45 Nm, Speed: 100 RPM"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="image">Machine Image</Label>
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                                {formData.image_url ? (
                                    <div className="space-y-3">
                                        <img
                                            src={formData.image_url}
                                            alt="Machine preview"
                                            className="mx-auto h-32 w-32 object-cover rounded-lg"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setFormData({ ...formData, image_url: '' })}
                                        >
                                            Remove Image
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Click to upload machine image
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            PNG, JPG up to 5MB
                                        </p>
                                    </div>
                                )}
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            {editingMachine ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MasterDataMachines;

