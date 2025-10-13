import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Factory, TestTube, Eye, Bot, Wrench, Package } from 'lucide-react';
import DummyDataService from '@/services/DummyDataService';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MACHINE_TYPE_ICONS = {
    'Assembly': Factory,
    'Testing': TestTube,
    'Inspection': Eye,
    'Automated': Bot,
    'Manual': Wrench,
    'Packaging': Package
};

const MachineCard = ({ machine, onDragStart }) => {
    const Icon = MACHINE_TYPE_ICONS[machine.machine_type] || Factory;

    const statusColors = {
        running: 'bg-green-500',
        idle: 'bg-yellow-500',
        alarm: 'bg-red-500',
        disconnected: 'bg-gray-500'
    };

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, machine)}
            className="p-3 bg-gray-700 hover:bg-gray-650 border border-gray-600 rounded-lg cursor-grab active:cursor-grabbing transition-all hover:shadow-lg hover:border-blue-500 group"
        >
            <div className="flex items-start gap-3">
                {/* Machine Icon */}
                <div className="p-2 bg-gray-600 rounded group-hover:bg-blue-900">
                    <Icon className="h-6 w-6 text-gray-300 group-hover:text-blue-400" />
                </div>

                {/* Machine Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white truncate">
                            {machine.machine_id}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${statusColors[machine.status]}`} />
                    </div>

                    <p className="text-xs text-gray-400 truncate mb-2">
                        {machine.name}
                    </p>

                    <div className="flex items-center gap-1">
                        <Badge variant="secondary" className="text-xs px-2 py-0">
                            {machine.machine_type}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Drag Hint */}
            <div className="mt-2 pt-2 border-t border-gray-600 text-xs text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                Drag to canvas
            </div>
        </div>
    );
};

const MachinePalette = ({ onMachineAdd }) => {
    const [machines, setMachines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMachines();
    }, []);

    const loadMachines = async () => {
        try {
            setLoading(true);
            const data = await DummyDataService.machines.getAll();
            setMachines(data);
        } catch (error) {
            console.error('Failed to load machines:', error);
        } finally {
            setLoading(false);
        }
    };

    const onDragStart = (event, machine) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('application/reactflow', JSON.stringify({
            type: 'machine',
            data: machine
        }));
    };

    // Filter machines
    const filteredMachines = machines.filter(machine => {
        const matchesSearch =
            machine.machine_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            machine.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = selectedType === 'all' || machine.machine_type === selectedType;

        return matchesSearch && matchesType;
    });

    // Get unique machine types
    const machineTypes = [...new Set(machines.map(m => m.machine_type))];

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 p-4 border-b border-gray-700">
                <h3 className="text-sm font-semibold text-white mb-3">Machine Library</h3>
                <p className="text-xs text-gray-400 mb-4">
                    Drag machines to canvas to build your layout
                </p>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search machines..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                    />
                </div>
            </div>

            {/* Tabs for filtering by type */}
            <div className="flex-shrink-0 px-4 pt-3">
                <Tabs defaultValue="all" value={selectedType} onValueChange={setSelectedType}>
                    <TabsList className="w-full bg-gray-700 grid grid-cols-3 gap-1">
                        <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                        <TabsTrigger value="Assembly" className="text-xs">Assembly</TabsTrigger>
                        <TabsTrigger value="Testing" className="text-xs">Testing</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Scrollable Content Area */}
            <div
                className="flex-1 overflow-y-auto px-4 pb-4 mt-3 min-h-0"
                style={{ maxHeight: '100%', overflowY: 'auto' }}
            >
                {loading ? (
                    <div className="space-y-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-20 bg-gray-700 rounded-lg animate-pulse" />
                        ))}
                    </div>
                ) : filteredMachines.length === 0 ? (
                    <div className="text-center py-8">
                        <Factory className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">No machines found</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filteredMachines.map(machine => (
                            <MachineCard
                                key={machine.id}
                                machine={machine}
                                onDragStart={onDragStart}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Stats Footer */}
            <div className="flex-shrink-0 p-4 border-t border-gray-700 bg-gray-800">
                <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{filteredMachines.length} machines</span>
                    <span>{machineTypes.length} types</span>
                </div>
            </div>
        </div>
    );
};

export default MachinePalette;

