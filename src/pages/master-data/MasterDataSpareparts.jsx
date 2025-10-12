import { useState, useEffect, useContext } from 'react';
import { Search, Plus, Pencil, Trash2, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import DummyDataService from '@/services/DummyDataService';
import { AlertContext } from '@/contexts/alert';

const MasterDataSpareparts = () => {
    const [spareparts, setSpareparts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingSparepart, setEditingSparepart] = useState(null);
    const [formData, setFormData] = useState({
        part_number: '',
        part_name: '',
        specification: '',
        brand: '',
        type: '',
        stock: 0,
        min_stock: 0,
        unit: 'pcs',
        price: 0,
        image_url: '',
        supplier: ''
    });
    const alertContext = useContext(AlertContext);

    const showAlert = (status, message) => {
        if (alertContext && alertContext.alert) {
            alertContext.alert({ status, message, time: 3 });
        }
    };

    useEffect(() => {
        loadSpareparts();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchQuery, spareparts]);

    const loadSpareparts = async () => {
        try {
            setLoading(true);
            const data = await DummyDataService.spareparts.getAll();
            setSpareparts(data);
            setFilteredData(data);
        } catch (error) {
            showAlert('error', 'Failed to load spareparts: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        if (!searchQuery.trim()) {
            setFilteredData(spareparts);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = spareparts.filter(item =>
            item.part_name.toLowerCase().includes(query) ||
            item.part_number.toLowerCase().includes(query) ||
            item.brand?.toLowerCase().includes(query) ||
            item.type?.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    const handleOpenModal = (sparepart = null) => {
        if (sparepart) {
            setEditingSparepart(sparepart);
            setFormData({
                part_number: sparepart.part_number,
                part_name: sparepart.part_name,
                specification: sparepart.specification || '',
                brand: sparepart.brand || '',
                type: sparepart.type || '',
                stock: sparepart.stock || 0,
                min_stock: sparepart.min_stock || 0,
                unit: sparepart.unit || 'pcs',
                price: sparepart.price || 0,
                image_url: sparepart.image_url || '',
                supplier: sparepart.supplier || ''
            });
        } else {
            setEditingSparepart(null);
            setFormData({
                part_number: '',
                part_name: '',
                specification: '',
                brand: '',
                type: '',
                stock: 0,
                min_stock: 0,
                unit: 'pcs',
                price: 0,
                image_url: '',
                supplier: ''
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingSparepart(null);
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
            if (!formData.part_number.trim()) {
                showAlert('error', 'Part Number is required');
                return;
            }
            if (!formData.part_name.trim()) {
                showAlert('error', 'Part Name is required');
                return;
            }

            if (editingSparepart) {
                await DummyDataService.spareparts.update(editingSparepart.id, formData);
                showAlert('success', 'Sparepart updated successfully');
            } else {
                await DummyDataService.spareparts.create(formData);
                showAlert('success', 'Sparepart created successfully');
            }

            handleCloseModal();
            await loadSpareparts();
        } catch (error) {
            showAlert('error', 'Failed to save: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this sparepart?')) {
            return;
        }

        try {
            await DummyDataService.spareparts.delete(id);
            showAlert('success', 'Sparepart deleted successfully');
            await loadSpareparts();
        } catch (error) {
            showAlert('error', 'Failed to delete: ' + error.message);
        }
    };

    const getStockStatus = (stock, minStock) => {
        if (stock === 0) {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-600 border border-red-500/20">
                    <AlertTriangle className="h-3 w-3" />
                    Out of Stock
                </span>
            );
        }
        if (stock <= minStock) {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                    <AlertTriangle className="h-3 w-3" />
                    Low Stock
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600 border border-green-500/20">
                In Stock
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading spareparts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">MASTER DATA - SPAREPARTS</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage sparepart inventory and stock levels
                    </p>
                </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search spareparts..."
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
            <div className="border rounded-lg overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">No</TableHead>
                            <TableHead>Part Number</TableHead>
                            <TableHead>Part Name</TableHead>
                            <TableHead>Specification</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Picture</TableHead>
                            <TableHead className="w-32 text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                                    {searchQuery ? 'No spareparts found matching your search' : 'No spareparts available'}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredData.map((sparepart, index) => (
                                <TableRow key={sparepart.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-mono text-sm">{sparepart.part_number}</TableCell>
                                    <TableCell className="font-medium">{sparepart.part_name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                                        {sparepart.specification || '-'}
                                    </TableCell>
                                    <TableCell>{sparepart.brand || '-'}</TableCell>
                                    <TableCell>
                                        <span className="text-sm text-muted-foreground">
                                            {sparepart.type || '-'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-medium">
                                            {sparepart.stock} {sparepart.unit}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {getStockStatus(sparepart.stock, sparepart.min_stock)}
                                    </TableCell>
                                    <TableCell>
                                        {sparepart.image_url ? (
                                            <img
                                                src={sparepart.image_url}
                                                alt={sparepart.part_name}
                                                className="h-10 w-10 rounded object-cover"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleOpenModal(sparepart)}
                                            >
                                                <Pencil className="h-3 w-3 mr-1" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(sparepart.id)}
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
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingSparepart ? 'Edit Sparepart' : '+ Add Sparepart'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingSparepart
                                ? 'Update sparepart information and stock levels'
                                : 'Add a new sparepart to the inventory'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Part Number */}
                            <div className="space-y-2">
                                <Label htmlFor="part_number">Part Number *</Label>
                                <Input
                                    id="part_number"
                                    value={formData.part_number}
                                    onChange={(e) => setFormData({ ...formData, part_number: e.target.value })}
                                    placeholder="e.g., HYD-VAL-001"
                                    disabled={editingSparepart !== null}
                                />
                            </div>

                            {/* Brand */}
                            <div className="space-y-2">
                                <Label htmlFor="brand">Brand</Label>
                                <Input
                                    id="brand"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    placeholder="e.g., Yuken, SMC, SKF"
                                />
                            </div>
                        </div>

                        {/* Part Name */}
                        <div className="space-y-2">
                            <Label htmlFor="part_name">Part Name *</Label>
                            <Input
                                id="part_name"
                                value={formData.part_name}
                                onChange={(e) => setFormData({ ...formData, part_name: e.target.value })}
                                placeholder="e.g., Hydraulic Valve"
                            />
                        </div>

                        {/* Specification */}
                        <div className="space-y-2">
                            <Label htmlFor="specification">Specification</Label>
                            <Textarea
                                id="specification"
                                value={formData.specification}
                                onChange={(e) => setFormData({ ...formData, specification: e.target.value })}
                                placeholder="e.g., 3/8&quot; BSP, 350 Bar, Directional Control"
                                rows={2}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Type */}
                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <Input
                                    id="type"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    placeholder="e.g., Hydraulic Component"
                                />
                            </div>

                            {/* Supplier */}
                            <div className="space-y-2">
                                <Label htmlFor="supplier">Supplier</Label>
                                <Input
                                    id="supplier"
                                    value={formData.supplier}
                                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                                    placeholder="e.g., PT Supplier Indonesia"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {/* Stock */}
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock *</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            {/* Min Stock */}
                            <div className="space-y-2">
                                <Label htmlFor="min_stock">Min Stock</Label>
                                <Input
                                    id="min_stock"
                                    type="number"
                                    value={formData.min_stock}
                                    onChange={(e) => setFormData({ ...formData, min_stock: parseInt(e.target.value) || 0 })}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            {/* Unit */}
                            <div className="space-y-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Input
                                    id="unit"
                                    value={formData.unit}
                                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                    placeholder="pcs"
                                />
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (Rp)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Picture Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="picture">Part Picture</Label>
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                                {formData.image_url ? (
                                    <div className="space-y-3">
                                        <img
                                            src={formData.image_url}
                                            alt="Part preview"
                                            className="mx-auto h-32 w-32 object-cover rounded-lg"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setFormData({ ...formData, image_url: '' })}
                                        >
                                            Remove Picture
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Please insert image
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            PNG, JPG up to 5MB
                                        </p>
                                    </div>
                                )}
                                <Input
                                    id="picture"
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
                            {editingSparepart ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MasterDataSpareparts;

