import { useState, useEffect } from 'react';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import DummyDataService from '@/services/DummyDataService';
import { AlertContext } from '@/contexts/alert';
import { useContext } from 'react';

const MasterDataAccessLevel = () => {
    const [accessLevels, setAccessLevels] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingAccessLevel, setEditingAccessLevel] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        allowed_menus: []
    });
    const alertContext = useContext(AlertContext);

    // Helper function untuk show alert
    const showAlert = (status, message) => {
        if (alertContext && alertContext.alert) {
            alertContext.alert({ status, message, time: 3 });
        }
    };

    // Menu structure for permissions
    const menuStructure = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            children: [
                { id: 'main_dashboard', name: 'Main Dashboard' },
                { id: 'machine_detail', name: 'Machine Detail' }
            ]
        },
        {
            id: 'master_data',
            name: 'Master Data',
            children: [
                { id: 'access_level', name: 'Access Level' },
                { id: 'users', name: 'Users' },
                { id: 'machines', name: 'Machines' },
                { id: 'spareparts', name: 'Spareparts' }
            ]
        },
        { id: 'andon_system', name: 'Andon System' },
        { id: 'maintenance', name: 'Maintenance' },
        { id: 'traceability', name: 'Traceability' }
    ];

    useEffect(() => {
        loadAccessLevels();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchQuery, accessLevels]);

    const loadAccessLevels = async () => {
        try {
            setLoading(true);
            const data = await DummyDataService.accessLevels.getAll();
            setAccessLevels(data);
            setFilteredData(data);
        } catch (error) {
            showAlert('error', 'Failed to load access levels: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        if (!searchQuery.trim()) {
            setFilteredData(accessLevels);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = accessLevels.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.access_level_id.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    const handleOpenModal = (accessLevel = null) => {
        if (accessLevel) {
            setEditingAccessLevel(accessLevel);
            setFormData({
                name: accessLevel.name,
                description: accessLevel.description || '',
                allowed_menus: accessLevel.allowed_menus || []
            });
        } else {
            setEditingAccessLevel(null);
            setFormData({
                name: '',
                description: '',
                allowed_menus: []
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingAccessLevel(null);
        setFormData({
            name: '',
            description: '',
            allowed_menus: []
        });
    };

    const handleMenuToggle = (menuId, checked) => {
        setFormData(prev => {
            const newMenus = checked
                ? [...prev.allowed_menus, menuId]
                : prev.allowed_menus.filter(id => id !== menuId);
            return { ...prev, allowed_menus: newMenus };
        });
    };

    const handleSave = async () => {
        try {
            if (!formData.name.trim()) {
                showAlert('error', 'Access Level Name is required');
                return;
            }

            if (editingAccessLevel) {
                await DummyDataService.accessLevels.update(editingAccessLevel.id, formData);
                showAlert('success', 'Access Level updated successfully');
            } else {
                await DummyDataService.accessLevels.create(formData);
                showAlert('success', 'Access Level created successfully');
            }

            handleCloseModal();
            await loadAccessLevels();
        } catch (error) {
            showAlert('error', 'Failed to save: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this access level?')) {
            return;
        }

        try {
            await DummyDataService.accessLevels.delete(id);
            showAlert('success', 'Access Level deleted successfully');
            await loadAccessLevels();
        } catch (error) {
            showAlert('error', 'Failed to delete: ' + error.message);
        }
    };

    const getMenuNames = (allowedMenus) => {
        if (!allowedMenus || allowedMenus.length === 0) return 'No access';

        const menuNames = [];
        allowedMenus.forEach(menuId => {
            const menu = menuStructure.find(m => m.id === menuId);
            if (menu) {
                menuNames.push(menu.name);
            } else {
                // Check in children
                menuStructure.forEach(parent => {
                    if (parent.children) {
                        const child = parent.children.find(c => c.id === menuId);
                        if (child) {
                            menuNames.push(`${parent.name} > ${child.name}`);
                        }
                    }
                });
            }
        });

        return menuNames.length > 0 ? menuNames.join(', ') : 'Custom access';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading access levels...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">MASTER DATA - ACCESS LEVEL</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage user access levels and permissions
                    </p>
                </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search access levels..."
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
                            <TableHead>Access Level Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Allowed Menu</TableHead>
                            <TableHead className="w-32 text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    {searchQuery ? 'No access levels found matching your search' : 'No access levels available'}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredData.map((accessLevel, index) => (
                                <TableRow key={accessLevel.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{accessLevel.name}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {accessLevel.description || '-'}
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-muted-foreground">
                                            {getMenuNames(accessLevel.allowed_menus)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleOpenModal(accessLevel)}
                                            >
                                                <Pencil className="h-3 w-3 mr-1" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(accessLevel.id)}
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
                            {editingAccessLevel ? 'Edit Access Level' : '+ Add Access Level'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingAccessLevel
                                ? 'Update access level information and permissions'
                                : 'Create a new access level with specific permissions'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Access Level Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Administrator, Operator, Technician"
                            />
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief description of this access level"
                            />
                        </div>

                        {/* Allowed Menu Permissions */}
                        <div className="space-y-2">
                            <Label>Allowed Menu Permissions *</Label>
                            <div className="border rounded-lg p-4 max-h-96 overflow-y-auto bg-muted/30">
                                {menuStructure.map(menu => (
                                    <div key={menu.id} className="mb-4 last:mb-0">
                                        {/* Parent Menu */}
                                        <div className="flex items-center space-x-3 mb-2">
                                            <Checkbox
                                                id={menu.id}
                                                checked={formData.allowed_menus.includes(menu.id)}
                                                onCheckedChange={(checked) => handleMenuToggle(menu.id, checked)}
                                            />
                                            <Label
                                                htmlFor={menu.id}
                                                className="font-semibold text-base cursor-pointer"
                                            >
                                                {menu.name}
                                            </Label>
                                        </div>

                                        {/* Child Menus */}
                                        {menu.children && (
                                            <div className="ml-8 space-y-2">
                                                {menu.children.map(child => (
                                                    <div key={child.id} className="flex items-center space-x-3">
                                                        <Checkbox
                                                            id={child.id}
                                                            checked={formData.allowed_menus.includes(child.id)}
                                                            onCheckedChange={(checked) => handleMenuToggle(child.id, checked)}
                                                        />
                                                        <Label
                                                            htmlFor={child.id}
                                                            className="text-sm cursor-pointer text-muted-foreground"
                                                        >
                                                            {child.name}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Select the menus that users with this access level can access
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            {editingAccessLevel ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MasterDataAccessLevel;

