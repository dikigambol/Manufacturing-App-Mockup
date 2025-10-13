import React, { useState, useEffect } from 'react';
import './MachineLayout.css'; // Scoped styles for SVG-based layout
import DummyDataService from '@/services/DummyDataService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LayoutPanelTop, RefreshCw } from 'lucide-react';

const MachineLayout = ({ dataItem, template_id }) => {
    const [hoveredMachine, setHoveredMachine] = useState(null);
    const [machines, setMachines] = useState([]);
    const [availableTemplates, setAvailableTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [useTemplate, setUseTemplate] = useState(false);

    // Get layout configuration from data source OR from template_id prop
    const layoutConfig = dataItem?.fileData?.layout || [];
    const connections = dataItem?.fileData?.connections || [];

    // Load template if template_id is provided via widget configuration
    useEffect(() => {
        if (template_id && template_id !== 'auto') {
            const template = DummyDataService.getLayoutTemplate(template_id);
            if (template) {
                setSelectedTemplate(template);
                setUseTemplate(true);
            }
        }
    }, [template_id]);

    // Load available templates on mount
    useEffect(() => {
        const loadTemplates = () => {
            const currentLine = localStorage.getItem('selectedLine') || 'line_1';
            const allTemplates = DummyDataService.getLayoutTemplates();
            // Filter templates by current line
            const lineTemplates = allTemplates.filter(t => t.line_id === currentLine);
            setAvailableTemplates(lineTemplates);
        };
        loadTemplates();
    }, []);

    // Convert React Flow node positions to SVG coordinates
    const convertReactFlowToSVG = (node, index) => {
        return {
            id: node.data?.machine_id || `MCH-${index + 1}`,
            name: node.data?.name || 'Unknown Machine',
            x: node.position.x / 4, // Scale down from React Flow coordinates
            y: node.position.y / 2,
            width: 140,
            height: 70,
            status: node.data?.status || 'disconnected',
            hasAlarm: node.data?.status === 'alarm',
            needsMaintenance: node.data?.needsMaintenance || false,
            type: node.data?.machine_type
        };
    };

    // Convert React Flow edges to SVG connections
    const convertEdgesToConnections = (edges, nodesMap) => {
        return edges.map(edge => {
            const sourceNode = nodesMap[edge.source];
            const targetNode = nodesMap[edge.target];

            if (!sourceNode || !targetNode) return null;

            return {
                from: {
                    x: sourceNode.x + sourceNode.width / 2,
                    y: sourceNode.y + sourceNode.height / 2
                },
                to: {
                    x: targetNode.x + targetNode.width / 2,
                    y: targetNode.y + targetNode.height / 2
                },
                type: 'conveyor'
            };
        }).filter(Boolean);
    };

    useEffect(() => {
        // Load machines from Master Data or Template
        const loadMachines = async () => {
            try {
                if (useTemplate && selectedTemplate) {
                    // Load from selected template
                    console.log('Loading from template:', selectedTemplate);
                    const template = DummyDataService.getLayoutTemplate(selectedTemplate);

                    if (template && template.nodes) {
                        // Convert React Flow format to SVG format
                        const svgMachines = template.nodes.map(convertReactFlowToSVG);

                        // Create nodes map for edge conversion
                        const nodesMap = {};
                        svgMachines.forEach(machine => {
                            nodesMap[template.nodes.find(n => n.data.machine_id === machine.id)?.id] = machine;
                        });

                        // Convert edges to connections
                        const svgConnections = template.edges ? convertEdgesToConnections(template.edges, nodesMap) : [];

                        setMachines(svgMachines);
                        // Note: connections would need to be stored in state if we want to display them
                    }
                } else {
                    // Original logic - load from data source
                    console.log('Loading machines, layoutConfig:', layoutConfig);
                    const allMachines = await DummyDataService.machines.getAll();
                    console.log('All machines from Master Data:', allMachines);

                    // Merge Master Data with Layout Config
                    const mergedMachines = layoutConfig.map(config => {
                        // Find machine in Master Data by machine_id
                        const masterMachine = allMachines.find(m => m.machine_id === config.machine_id);
                        console.log(`Merging ${config.machine_id}:`, { config, masterMachine });

                        return {
                            id: config.machine_id,
                            name: masterMachine?.name || config.name || 'Unknown',
                            x: config.x,
                            y: config.y,
                            width: config.width || 140,
                            height: config.height || 70,
                            status: masterMachine?.status || 'disconnected',
                            hasAlarm: masterMachine?.status === 'alarm',
                            needsMaintenance: masterMachine?.status === 'maintenance' || masterMachine?.status === 'idle',
                            asset_no: masterMachine?.asset_no,
                            type: masterMachine?.machine_type
                        };
                    });

                    console.log('Merged machines:', mergedMachines);
                    setMachines(mergedMachines);
                }
            } catch (error) {
                console.error('Error loading machines:', error);
                // Fallback: use layout config only
                if (!useTemplate) {
                    setMachines(layoutConfig);
                }
            }
        };

        if ((useTemplate && selectedTemplate) || layoutConfig.length > 0) {
            loadMachines();
        } else {
            console.log('No layoutConfig or template selected');
        }
    }, [dataItem, useTemplate, selectedTemplate]);

    // Status color mapping
    const getStatusColor = (status) => {
        const colors = {
            'running': '#10B981',    // Green
            'idle': '#F59E0B',       // Yellow/Orange
            'alarm': '#EF4444',      // Red
            'disconnected': '#6B7280', // Gray
            'maintenance': '#8B5CF6'  // Purple
        };
        return colors[status?.toLowerCase()] || '#6B7280';
    };

    // Handle machine click - show info (for now, just console log)
    const handleMachineClick = (machineId) => {
        console.log('Machine clicked:', machineId);
        // TODO: Navigate to machine detail page when implemented
        // navigate(`/dashboard/machine/${machineId}`);
    };

    // Show loading or empty state
    if (machines.length === 0 && !useTemplate) {
        return (
            <div className="machine-layout-container w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                    <div className="text-4xl mb-2">🏭</div>
                    <p className="text-sm">No machines configured</p>
                    <p className="text-xs mt-1 mb-4">Select "Machine Layout - Line 1" from Data Resource</p>

                    {availableTemplates.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <p className="text-sm font-semibold">Or use a saved template:</p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setUseTemplate(true)}
                                className="gap-2"
                            >
                                <LayoutPanelTop className="h-4 w-4" />
                                View Templates ({availableTemplates.length})
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="machine-layout-container w-full h-full flex flex-col p-2">
            {/* Template Selector */}
            {availableTemplates.length > 0 && (
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex items-center gap-2 flex-1">
                        <LayoutPanelTop className="h-4 w-4 text-gray-400" />
                        <Select
                            value={useTemplate && selectedTemplate ? selectedTemplate : 'data-source'}
                            onValueChange={(value) => {
                                if (value === 'data-source') {
                                    setUseTemplate(false);
                                    setSelectedTemplate(null);
                                } else {
                                    setUseTemplate(true);
                                    setSelectedTemplate(value);
                                }
                            }}
                        >
                            <SelectTrigger className="h-8 text-xs flex-1">
                                <SelectValue placeholder="Select layout source..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="data-source">
                                    📊 Data Source Layout
                                </SelectItem>
                                {availableTemplates.map((template) => (
                                    <SelectItem key={template.id} value={template.id}>
                                        {template.thumbnail || '📋'} {template.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {useTemplate && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                // Refresh template
                                setSelectedTemplate(null);
                                setTimeout(() => setSelectedTemplate(selectedTemplate), 100);
                            }}
                            className="h-8 px-2"
                        >
                            <RefreshCw className="h-3 w-3" />
                        </Button>
                    )}
                </div>
            )}

            {/* Machine Count Badge */}
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {machines.length} Machines
                    </div>
                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {machines.filter(m => m.status === 'running').length} Running
                    </div>
                    {machines.filter(m => m.hasAlarm).length > 0 && (
                        <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                            {machines.filter(m => m.hasAlarm).length} Alarms
                        </div>
                    )}
                </div>
            </div>

            {/* SVG Machine Layout */}
            <div className="flex-1 relative bg-slate-800/30 rounded-lg p-4">
                <svg
                    viewBox="0 0 600 300"
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Define arrow marker for connections */}
                    <defs>
                        <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="10"
                            refX="9"
                            refY="3"
                            orient="auto"
                        >
                            <polygon
                                points="0 0, 10 3, 0 6"
                                fill="#60A5FA"
                            />
                        </marker>

                        {/* Glow effect for hover */}
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Draw connection lines first (behind machines) */}
                    {connections.map((conn, index) => (
                        <g key={`conn-${index}`}>
                            {/* Connection line */}
                            <line
                                x1={conn.from.x}
                                y1={conn.from.y}
                                x2={conn.to.x}
                                y2={conn.to.y}
                                stroke="#60A5FA"
                                strokeWidth="2"
                                strokeDasharray={conn.type === 'conveyor' ? '0' : '5,5'}
                                markerEnd="url(#arrowhead)"
                                opacity="0.5"
                            />
                            {/* Animated flow dots */}
                            <circle r="3" fill="#60A5FA" opacity="0.8">
                                <animateMotion
                                    dur="3s"
                                    repeatCount="indefinite"
                                    path={`M ${conn.from.x} ${conn.from.y} L ${conn.to.x} ${conn.to.y}`}
                                />
                            </circle>
                        </g>
                    ))}

                    {/* Draw machines */}
                    {machines.map((machine) => (
                        <g
                            key={machine.id}
                            className="machine-node cursor-pointer"
                            onMouseEnter={() => setHoveredMachine(machine.id)}
                            onMouseLeave={() => setHoveredMachine(null)}
                            onClick={() => handleMachineClick(machine.id)}
                            style={{ transition: 'all 0.3s ease' }}
                        >
                            {/* Shadow/Glow effect */}
                            <rect
                                x={machine.x - 2}
                                y={machine.y - 2}
                                width={(machine.width || 120) + 4}
                                height={(machine.height || 60) + 4}
                                fill={getStatusColor(machine.status)}
                                rx="10"
                                opacity="0.3"
                                filter={hoveredMachine === machine.id ? "url(#glow)" : "none"}
                            />

                            {/* Machine rectangle */}
                            <rect
                                x={machine.x}
                                y={machine.y}
                                width={machine.width || 120}
                                height={machine.height || 60}
                                fill={getStatusColor(machine.status)}
                                stroke={hoveredMachine === machine.id ? '#FFFFFF' : '#1F2937'}
                                strokeWidth={hoveredMachine === machine.id ? '3' : '2'}
                                rx="8"
                                opacity="0.95"
                            />

                            {/* Machine ID badge */}
                            <rect
                                x={machine.x + 5}
                                y={machine.y + 5}
                                width="50"
                                height="18"
                                fill="#000000"
                                opacity="0.6"
                                rx="4"
                            />
                            <text
                                x={machine.x + 30}
                                y={machine.y + 17}
                                textAnchor="middle"
                                className="fill-white font-mono text-[10px] pointer-events-none"
                            >
                                {machine.id}
                            </text>

                            {/* Machine name */}
                            <text
                                x={machine.x + (machine.width || 120) / 2}
                                y={machine.y + (machine.height || 60) / 2}
                                textAnchor="middle"
                                className="fill-white font-bold pointer-events-none"
                                style={{ fontSize: '13px' }}
                            >
                                {machine.name}
                            </text>

                            {/* Machine status badge */}
                            <rect
                                x={machine.x + (machine.width || 120) / 2 - 35}
                                y={machine.y + (machine.height || 60) / 2 + 12}
                                width="70"
                                height="16"
                                fill="#000000"
                                opacity="0.5"
                                rx="8"
                            />
                            <text
                                x={machine.x + (machine.width || 120) / 2}
                                y={machine.y + (machine.height || 60) / 2 + 23}
                                textAnchor="middle"
                                className="fill-white font-semibold pointer-events-none"
                                style={{ fontSize: '9px' }}
                            >
                                {machine.status?.toUpperCase()}
                            </text>

                            {/* Status indicators */}
                            {machine.hasAlarm && (
                                <g>
                                    <circle
                                        cx={machine.x + (machine.width || 120) - 12}
                                        cy={machine.y + 12}
                                        r="8"
                                        fill="#EF4444"
                                        stroke="#FFFFFF"
                                        strokeWidth="2"
                                        className="animate-pulse"
                                    />
                                    <text
                                        x={machine.x + (machine.width || 120) - 12}
                                        y={machine.y + 15}
                                        textAnchor="middle"
                                        className="fill-white font-bold pointer-events-none"
                                        style={{ fontSize: '10px' }}
                                    >
                                        !
                                    </text>
                                </g>
                            )}

                            {machine.needsMaintenance && (
                                <g>
                                    <circle
                                        cx={machine.x + (machine.width || 120) - 12}
                                        cy={machine.y + 32}
                                        r="8"
                                        fill="#F59E0B"
                                        stroke="#FFFFFF"
                                        strokeWidth="2"
                                    />
                                    <text
                                        x={machine.x + (machine.width || 120) - 12}
                                        y={machine.y + 36}
                                        textAnchor="middle"
                                        className="fill-white font-bold pointer-events-none"
                                        style={{ fontSize: '10px' }}
                                    >
                                        🔧
                                    </text>
                                </g>
                            )}

                            {/* Hover effect - subtle glow */}
                            {hoveredMachine === machine.id && (
                                <>
                                    <rect
                                        x={machine.x}
                                        y={machine.y}
                                        width={machine.width || 120}
                                        height={machine.height || 60}
                                        fill="white"
                                        opacity="0.15"
                                        rx="8"
                                        className="pointer-events-none"
                                    />
                                    {/* Info popup */}
                                    <g>
                                        <rect
                                            x={machine.x + (machine.width || 120) / 2 - 50}
                                            y={machine.y - 30}
                                            width="100"
                                            height="24"
                                            fill="#1F2937"
                                            stroke="#60A5FA"
                                            strokeWidth="2"
                                            rx="6"
                                        />
                                        <text
                                            x={machine.x + (machine.width || 120) / 2}
                                            y={machine.y - 13}
                                            textAnchor="middle"
                                            className="fill-white font-semibold pointer-events-none"
                                            style={{ fontSize: '10px' }}
                                        >
                                            Click for details
                                        </text>
                                    </g>
                                </>
                            )}
                        </g>
                    ))}
                </svg>
            </div>

            {/* Legend - Compact & Modern */}
            <div className="mt-3 pt-3 border-t border-gray-700/50">
                <div className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-green-500 shadow-sm"></div>
                            <span className="text-gray-400">Running</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-yellow-500 shadow-sm"></div>
                            <span className="text-gray-400">Idle</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-red-500 shadow-sm"></div>
                            <span className="text-gray-400">Alarm</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-gray-500 shadow-sm"></div>
                            <span className="text-gray-400">Disconnected</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-purple-500 shadow-sm"></div>
                            <span className="text-gray-400">Maintenance</span>
                        </div>
                    </div>
                    <div className="text-gray-500 italic">
                        💡 Click machine to view details
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MachineLayout;

