import { useState, useEffect, useContext } from 'react';
import { Search, Plus, Pencil, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
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

const MasterDataUsers = () => {
    const [users, setUsers] = useState([]);
    const [accessLevels, setAccessLevels] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        nrp: '',
        password: '',
        access_level_id: '',
        rfid: '',
        picture_url: '',
        email: '',
        phone: '',
        status: 'active'
    });
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
    }, [searchQuery, users]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [usersData, accessLevelsData] = await Promise.all([
                DummyDataService.users.getAll(),
                DummyDataService.accessLevels.getAll()
            ]);
            setUsers(usersData);
            setAccessLevels(accessLevelsData);
            setFilteredData(usersData);
        } catch (error) {
            showAlert('error', 'Failed to load users: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        if (!searchQuery.trim()) {
            setFilteredData(users);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = users.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.nrp.toLowerCase().includes(query) ||
            item.user_id?.toLowerCase().includes(query) ||
            item.access_level_name?.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                name: user.name,
                nrp: user.nrp,
                password: user.password,
                access_level_id: user.access_level_id,
                rfid: user.rfid || '',
                picture_url: user.picture_url || '',
                email: user.email || '',
                phone: user.phone || '',
                status: user.status || 'active'
            });
        } else {
            setEditingUser(null);
            setFormData({
                name: '',
                nrp: '',
                password: '',
                access_level_id: '',
                rfid: '',
                picture_url: '',
                email: '',
                phone: '',
                status: 'active'
            });
        }
        setShowModal(true);
        setShowPassword(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingUser(null);
        setShowPassword(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, picture_url: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            if (!formData.name.trim()) {
                showAlert('error', 'Name is required');
                return;
            }
            if (!formData.nrp.trim()) {
                showAlert('error', 'NRP is required');
                return;
            }
            if (!editingUser && !formData.password.trim()) {
                showAlert('error', 'Password is required');
                return;
            }
            if (!formData.access_level_id) {
                showAlert('error', 'Access Level is required');
                return;
            }

            if (editingUser) {
                await DummyDataService.users.update(editingUser.id, formData);
                showAlert('success', 'User updated successfully');
            } else {
                await DummyDataService.users.create(formData);
                showAlert('success', 'User created successfully');
            }

            handleCloseModal();
            await loadData();
        } catch (error) {
            showAlert('error', 'Failed to save: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            await DummyDataService.users.delete(id);
            showAlert('success', 'User deleted successfully');
            await loadData();
        } catch (error) {
            showAlert('error', 'Failed to delete: ' + error.message);
        }
    };

    const handleAccessLevelChange = async (userId, newAccessLevelId) => {
        try {
            await DummyDataService.users.update(userId, {
                access_level_id: parseInt(newAccessLevelId)
            });
            showAlert('success', 'Access level updated successfully');
            await loadData();
        } catch (error) {
            showAlert('error', 'Failed to update access level: ' + error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">MASTER DATA - USERS</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage user accounts and access permissions
                    </p>
                </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search users..."
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
                            <TableHead>Name</TableHead>
                            <TableHead>NRP</TableHead>
                            <TableHead>Password</TableHead>
                            <TableHead>Access Level</TableHead>
                            <TableHead>RFID</TableHead>
                            <TableHead>Picture</TableHead>
                            <TableHead className="w-32 text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    {searchQuery ? 'No users found matching your search' : 'No users available'}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredData.map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell className="font-mono text-sm">{user.nrp}</TableCell>
                                    <TableCell>
                                        <Input
                                            type="password"
                                            value="************"
                                            readOnly
                                            className="w-32 h-8 text-xs bg-muted cursor-not-allowed"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={user.access_level_id?.toString()}
                                            onValueChange={(value) => handleAccessLevelChange(user.id, value)}
                                        >
                                            <SelectTrigger className="w-40 h-8">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {accessLevels.map(level => (
                                                    <SelectItem key={level.id} value={level.id.toString()}>
                                                        {level.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {user.rfid || '-'}
                                    </TableCell>
                                    <TableCell>
                                        {user.picture_url ? (
                                            <img
                                                src={user.picture_url}
                                                alt={user.name}
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                                <span className="text-xs text-muted-foreground">
                                                    {user.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleOpenModal(user)}
                                            >
                                                <Pencil className="h-3 w-3 mr-1" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(user.id)}
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
                            {editingUser ? 'Edit User' : '+ Add User'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingUser
                                ? 'Update user information and permissions'
                                : 'Create a new user account'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., John Doe"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* NRP */}
                            <div className="space-y-2">
                                <Label htmlFor="nrp">NRP (Employee ID) *</Label>
                                <Input
                                    id="nrp"
                                    value={formData.nrp}
                                    onChange={(e) => setFormData({ ...formData, nrp: e.target.value })}
                                    placeholder="e.g., 297498"
                                    disabled={editingUser !== null}
                                />
                            </div>

                            {/* RFID */}
                            <div className="space-y-2">
                                <Label htmlFor="rfid">RFID Card Number</Label>
                                <Input
                                    id="rfid"
                                    value={formData.rfid}
                                    onChange={(e) => setFormData({ ...formData, rfid: e.target.value })}
                                    placeholder="e.g., 34567890"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password {!editingUser && '*'}</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder={editingUser ? 'Leave blank to keep current password' : 'Enter password'}
                                    className="pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Access Level */}
                        <div className="space-y-2">
                            <Label htmlFor="access_level">Access Level *</Label>
                            <Select
                                value={formData.access_level_id?.toString()}
                                onValueChange={(value) => setFormData({ ...formData, access_level_id: parseInt(value) })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select access level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {accessLevels.map(level => (
                                        <SelectItem key={level.id} value={level.id.toString()}>
                                            {level.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="user@manufacturing.com"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+62 812-xxxx-xxxx"
                                />
                            </div>
                        </div>

                        {/* Picture Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="picture">Profile Picture</Label>
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                                {formData.picture_url ? (
                                    <div className="space-y-3">
                                        <img
                                            src={formData.picture_url}
                                            alt="User preview"
                                            className="mx-auto h-24 w-24 rounded-full object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setFormData({ ...formData, picture_url: '' })}
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
                            {editingUser ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MasterDataUsers;

