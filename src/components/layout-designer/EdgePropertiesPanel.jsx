import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Trash2, Link2, ArrowRight, ArrowLeft, ArrowLeftRight, Minus } from 'lucide-react';

const EdgePropertiesPanel = ({ selectedEdge, onEdgeUpdate, onEdgeDelete }) => {
    const [edgeData, setEdgeData] = useState(null);

    useEffect(() => {
        if (selectedEdge) {
            setEdgeData({ ...selectedEdge });
        } else {
            setEdgeData(null);
        }
    }, [selectedEdge]);

    const handleTypeChange = (value) => {
        if (!edgeData) return;

        // Create new object to force React Flow update
        const updatedEdge = {
            id: edgeData.id,
            source: edgeData.source,
            target: edgeData.target,
            sourceHandle: edgeData.sourceHandle,
            targetHandle: edgeData.targetHandle,
            type: value,
            animated: edgeData.animated,
            style: { ...edgeData.style },
            data: { lastUpdated: Date.now() },
            markerEnd: edgeData.markerEnd ? { ...edgeData.markerEnd } : undefined,
            markerStart: edgeData.markerStart ? { ...edgeData.markerStart } : undefined,
        };

        setEdgeData(updatedEdge);
        onEdgeUpdate(updatedEdge);
    };

    const handleStyleChange = (field, value) => {
        if (!edgeData) return;

        // Create new object to force React Flow update
        const newStyle = {
            ...edgeData.style,
            [field]: value,
        };

        // Remove undefined values
        if (value === undefined) {
            delete newStyle[field];
        }

        // If stroke color changes, update marker colors too
        const strokeColor = newStyle.stroke || '#3b82f6';
        const updatedMarkerEnd = edgeData.markerEnd
            ? { ...edgeData.markerEnd, color: strokeColor }
            : undefined;
        const updatedMarkerStart = edgeData.markerStart
            ? { ...edgeData.markerStart, color: strokeColor }
            : undefined;

        const updatedEdge = {
            id: edgeData.id,
            source: edgeData.source,
            target: edgeData.target,
            sourceHandle: edgeData.sourceHandle,
            targetHandle: edgeData.targetHandle,
            type: edgeData.type || 'smoothstep',
            animated: edgeData.animated,
            style: newStyle,
            data: { lastUpdated: Date.now() },
            markerEnd: updatedMarkerEnd,
            markerStart: updatedMarkerStart,
        };

        setEdgeData(updatedEdge);
        onEdgeUpdate(updatedEdge);
    };

    const handleMarkerChange = (direction, value) => {
        if (!edgeData) return;

        const strokeColor = edgeData.style?.stroke || '#3b82f6';

        // Create completely new edge object WITHOUT any markers first
        const updatedEdge = {
            id: edgeData.id,
            source: edgeData.source,
            target: edgeData.target,
            sourceHandle: edgeData.sourceHandle,
            targetHandle: edgeData.targetHandle,
            type: edgeData.type || 'smoothstep',
            animated: edgeData.animated || false,
            style: {
                stroke: strokeColor,
                strokeWidth: edgeData.style?.strokeWidth || 3,
                ...(edgeData.style?.strokeDasharray && { strokeDasharray: edgeData.style.strokeDasharray }),
            },
            data: { lastUpdated: Date.now() }, // Force update trigger
            // EXPLICITLY set markers to undefined initially
            markerEnd: undefined,
            markerStart: undefined,
        };

        // Now ONLY add the markers we need based on direction
        if (value === 'forward') {
            updatedEdge.markerEnd = { type: 'arrowclosed', color: strokeColor };
            // markerStart stays undefined
        } else if (value === 'backward') {
            updatedEdge.markerStart = { type: 'arrowclosed', color: strokeColor };
            // markerEnd stays undefined
        } else if (value === 'both') {
            updatedEdge.markerEnd = { type: 'arrowclosed', color: strokeColor };
            updatedEdge.markerStart = { type: 'arrowclosed', color: strokeColor };
        }
        // 'none' case: both markers stay undefined

        setEdgeData(updatedEdge);
        onEdgeUpdate(updatedEdge);
    };

    const handleAnimatedToggle = () => {
        if (!edgeData) return;

        // Create new object to force React Flow update
        const updatedEdge = {
            id: edgeData.id,
            source: edgeData.source,
            target: edgeData.target,
            sourceHandle: edgeData.sourceHandle,
            targetHandle: edgeData.targetHandle,
            type: edgeData.type || 'smoothstep',
            animated: !edgeData.animated,
            style: { ...edgeData.style },
            data: { lastUpdated: Date.now() },
            markerEnd: edgeData.markerEnd ? { ...edgeData.markerEnd } : undefined,
            markerStart: edgeData.markerStart ? { ...edgeData.markerStart } : undefined,
        };

        setEdgeData(updatedEdge);
        onEdgeUpdate(updatedEdge);
    };

    const getArrowDirection = () => {
        if (!edgeData) return 'forward';
        if (!edgeData.markerEnd && !edgeData.markerStart) return 'none';
        if (edgeData.markerEnd && !edgeData.markerStart) return 'forward';
        if (!edgeData.markerEnd && edgeData.markerStart) return 'backward';
        if (edgeData.markerEnd && edgeData.markerStart) return 'both';
        return 'forward';
    };

    const getLineStyle = () => {
        if (!edgeData?.style?.strokeDasharray) return 'solid';
        if (edgeData.style.strokeDasharray === '5 5') return 'dashed';
        if (edgeData.style.strokeDasharray === '1 3') return 'dotted';
        return 'solid';
    };

    if (!selectedEdge || !edgeData) {
        return (
            <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-700">
                    <h3 className="text-sm font-semibold text-white">Connection Properties</h3>
                </div>

                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center">
                        <Link2 className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-400">
                            Select a connection line to view and edit its properties
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
                <h3 className="text-sm font-semibold text-white mb-2">Connection Properties</h3>
                <Badge variant="outline" className="text-xs">
                    Edge
                </Badge>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto min-h-0">
                <div className="p-4 space-y-4">
                    {/* Connection ID */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Connection ID</Label>
                        <div className="text-sm text-white bg-gray-700 px-3 py-2 rounded border border-gray-600">
                            {edgeData.id}
                        </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    {/* Line Type */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Line Type</Label>
                        <Select
                            value={edgeData.type || 'smoothstep'}
                            onValueChange={handleTypeChange}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="smoothstep">Smooth Step (Rounded Corners)</SelectItem>
                                <SelectItem value="straight">Straight (Direct Line)</SelectItem>
                                <SelectItem value="default">Default (Bezier Curve)</SelectItem>
                                <SelectItem value="step">Step (Right Angles)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Line Style */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Line Style</Label>
                        <Select
                            value={getLineStyle()}
                            onValueChange={(value) => {
                                const dasharray =
                                    value === 'dashed' ? '5 5' :
                                        value === 'dotted' ? '1 3' :
                                            undefined;
                                handleStyleChange('strokeDasharray', dasharray);
                            }}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="solid">
                                    <div className="flex items-center gap-2">
                                        <Minus className="h-4 w-4" />
                                        Solid Line
                                    </div>
                                </SelectItem>
                                <SelectItem value="dashed">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">- -</span>
                                        Dashed Line
                                    </div>
                                </SelectItem>
                                <SelectItem value="dotted">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">· · ·</span>
                                        Dotted Line
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Arrow Direction */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Arrow Direction</Label>
                        <Select
                            value={getArrowDirection()}
                            onValueChange={(value) => handleMarkerChange('direction', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">
                                    <div className="flex items-center gap-2">
                                        <Minus className="h-4 w-4" />
                                        No Arrow
                                    </div>
                                </SelectItem>
                                <SelectItem value="forward">
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="h-4 w-4" />
                                        Forward →
                                    </div>
                                </SelectItem>
                                <SelectItem value="backward">
                                    <div className="flex items-center gap-2">
                                        <ArrowLeft className="h-4 w-4" />
                                        Backward ←
                                    </div>
                                </SelectItem>
                                <SelectItem value="both">
                                    <div className="flex items-center gap-2">
                                        <ArrowLeftRight className="h-4 w-4" />
                                        Both ↔
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator className="bg-gray-700" />

                    {/* Advanced Options */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Advanced Options</Label>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                                <span className="text-xs text-gray-300">Animated (Flowing Dots)</span>
                                <input
                                    type="checkbox"
                                    checked={edgeData.animated || false}
                                    onChange={handleAnimatedToggle}
                                    className="rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Line Width */}
                    <div>
                        <Label className="text-xs text-gray-400 mb-2">Line Width</Label>
                        <Select
                            value={String(edgeData.style?.strokeWidth || 3)}
                            onValueChange={(value) => handleStyleChange('strokeWidth', Number(value))}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Thin (1px)</SelectItem>
                                <SelectItem value="2">Normal (2px)</SelectItem>
                                <SelectItem value="3">Medium (3px)</SelectItem>
                                <SelectItem value="4">Thick (4px)</SelectItem>
                                <SelectItem value="6">Extra Thick (6px)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Actions Footer */}
            <div className="flex-shrink-0 p-4 border-t border-gray-700 space-y-2">
                <Button
                    variant="destructive"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => onEdgeDelete && onEdgeDelete(edgeData.id)}
                >
                    <Trash2 className="h-4 w-4" />
                    Delete Connection
                </Button>

                <p className="text-xs text-gray-500 text-center">
                    or press Delete/Backspace key
                </p>
            </div>
        </div>
    );
};

export default EdgePropertiesPanel;

