import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Trash2, Copy, Settings } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const PropertiesPanel = ({ selectedNode, onNodeUpdate, onNodeDelete, onNodeDuplicate }) => {
    const [nodeData, setNodeData] = useState(null);

    useEffect(() => {
        if (selectedNode) {
            setNodeData({ ...selectedNode });
        } else {
            setNodeData(null);
        }
    }, [selectedNode]);

    const handleDataChange = (field, value) => {
        if (!nodeData) return;

        const updatedData = {
            ...nodeData,
            data: {
                ...nodeData.data,
                [field]: value
            }
        };

        setNodeData(updatedData);
        onNodeUpdate(updatedData);
    };

    const handlePositionChange = (axis, value) => {
        if (!nodeData) return;

        const updatedData = {
            ...nodeData,
            position: {
                ...nodeData.position,
                [axis]: parseFloat(value) || 0
            }
        };

        setNodeData(updatedData);
        onNodeUpdate(updatedData);
    };

    if (!selectedNode || !nodeData) {
        return (
            <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-700">
                    <h3 className="text-sm font-semibold text-white">Properties</h3>
                </div>

                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center">
                        <Settings className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-400">
                            Select a node to view and edit its properties
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-gray-800">
            {/* Header */}
            <div className="flex-shrink-0 p-4 border-b border-gray-700">
                <h3 className="text-sm font-semibold text-white mb-2">Properties</h3>
                <Badge variant="outline" className="text-xs">
                    {nodeData.type || 'Node'}
                </Badge>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto min-h-0">
                <div className="p-4 space-y-4">
                    {/* Machine ID */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Machine ID</Label>
                        <Input
                            value={nodeData.data?.machine_id || ''}
                            onChange={(e) => handleDataChange('machine_id', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                            disabled
                        />
                    </div>

                    {/* Machine Name */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Machine Name</Label>
                        <Input
                            value={nodeData.data?.name || ''}
                            onChange={(e) => handleDataChange('name', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                        />
                    </div>

                    {/* Machine Type */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Machine Type</Label>
                        <Select
                            value={nodeData.data?.machine_type || 'Assembly'}
                            onValueChange={(value) => handleDataChange('machine_type', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Assembly">Assembly</SelectItem>
                                <SelectItem value="Testing">Testing</SelectItem>
                                <SelectItem value="Inspection">Inspection</SelectItem>
                                <SelectItem value="Automated">Automated</SelectItem>
                                <SelectItem value="Manual">Manual</SelectItem>
                                <SelectItem value="Packaging">Packaging</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Status */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Status</Label>
                        <Select
                            value={nodeData.data?.status || 'disconnected'}
                            onValueChange={(value) => handleDataChange('status', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="running">
                                    <span className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        Running
                                    </span>
                                </SelectItem>
                                <SelectItem value="idle">
                                    <span className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                        Idle
                                    </span>
                                </SelectItem>
                                <SelectItem value="alarm">
                                    <span className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                        Alarm
                                    </span>
                                </SelectItem>
                                <SelectItem value="disconnected">
                                    <span className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-500" />
                                        Disconnected
                                    </span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator className="bg-gray-700" />

                    {/* Position */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Position</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label className="text-xs text-gray-500">X</Label>
                                <Input
                                    type="number"
                                    value={Math.round(nodeData.position?.x || 0)}
                                    onChange={(e) => handlePositionChange('x', e.target.value)}
                                    className="bg-gray-700 border-gray-600 text-white"
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-gray-500">Y</Label>
                                <Input
                                    type="number"
                                    value={Math.round(nodeData.position?.y || 0)}
                                    onChange={(e) => handlePositionChange('y', e.target.value)}
                                    className="bg-gray-700 border-gray-600 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Specifications</Label>
                        <Textarea
                            value={nodeData.data?.specifications || ''}
                            onChange={(e) => handleDataChange('specifications', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white min-h-20"
                            placeholder="Enter machine specifications..."
                        />
                    </div>

                    <Separator className="bg-gray-700" />

                    {/* Advanced Options */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Advanced Options</Label>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                                <span className="text-xs text-gray-300">Needs Maintenance</span>
                                <input
                                    type="checkbox"
                                    checked={nodeData.data?.needsMaintenance || false}
                                    onChange={(e) => handleDataChange('needsMaintenance', e.target.checked)}
                                    className="rounded"
                                />
                            </div>

                            <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                                <span className="text-xs text-gray-300">Show OEE</span>
                                <input
                                    type="checkbox"
                                    checked={nodeData.data?.showOEE || false}
                                    onChange={(e) => handleDataChange('showOEE', e.target.checked)}
                                    className="rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* OEE Value (if showOEE is enabled) */}
                    {nodeData.data?.showOEE && (
                        <div>
                            <Label className="text-xs text-gray-400 mb-2">OEE Value (%)</Label>
                            <Input
                                type="number"
                                min="0"
                                max="100"
                                value={nodeData.data?.oee || 0}
                                onChange={(e) => handleDataChange('oee', parseInt(e.target.value) || 0)}
                                className="bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Actions Footer */}
            <div className="flex-shrink-0 p-4 border-t border-gray-700 space-y-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => onNodeDuplicate && onNodeDuplicate(nodeData)}
                >
                    <Copy className="h-4 w-4" />
                    Duplicate Node
                </Button>

                <Button
                    variant="destructive"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => onNodeDelete && onNodeDelete(nodeData.id)}
                >
                    <Trash2 className="h-4 w-4" />
                    Delete Node
                </Button>
            </div>
        </div>
    );
};

export default PropertiesPanel;

