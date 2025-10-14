import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import './MachineLayoutReactFlow.css'; // Scoped styles for this widget
import DummyDataService from '@/services/DummyDataService';
import MachineNode from '@/components/layout-designer/MachineNode';
import { useNavigate } from 'react-router';

const nodeTypes = {
    machine: MachineNode,
};

const MachineLayoutReactFlowInner = ({ template_id }) => {
    const navigate = useNavigate();
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLayout = async () => {
            try {
                if (template_id && template_id !== 'auto') {
                    // Load from template
                    const template = DummyDataService.getLayoutTemplate(template_id);
                    if (template) {
                        setNodes(template.nodes || []);
                        setEdges(template.edges || []);
                    }
                } else {
                    // Auto-load from Master Data
                    const currentLine = localStorage.getItem('selectedLine') || 'line_1';
                    const allMachines = DummyDataService.getMachines();
                    const lineMachines = allMachines.filter(m => m.line_id === currentLine);

                    // Auto-generate simple horizontal layout
                    const autoNodes = lineMachines.map((machine, index) => ({
                        id: `node_${machine.id}`,
                        type: 'machine',
                        position: {
                            x: 100 + (index * 250),
                            y: 150
                        },
                        data: {
                            machine_id: machine.machine_id,
                            name: machine.name,
                            status: machine.status || 'running',
                            machine_type: machine.type,
                            oee: machine.oee,
                            needsMaintenance: machine.needs_maintenance || false,
                        }
                    }));

                    // Auto-generate connections (sequential)
                    const autoEdges = autoNodes.slice(0, -1).map((node, index) => ({
                        id: `e${index}-${index + 1}`,
                        source: node.id,
                        target: autoNodes[index + 1].id,
                        type: 'smoothstep',
                        animated: true,
                        style: { stroke: '#3b82f6', strokeWidth: 3 },
                        markerEnd: { type: 'arrowclosed', color: '#3b82f6' },
                    }));

                    setNodes(autoNodes);
                    setEdges(autoEdges);
                }
            } catch (error) {
                console.error('Error loading layout:', error);
            } finally {
                setLoading(false);
            }
        };

        loadLayout();
    }, [template_id]);

    // Handle node click - navigate to machine detail page
    const onNodeClick = useCallback((event, node) => {
        const { machine_id } = node.data;
        navigate(`/machines/${machine_id}`);
    }, [navigate]);

    if (loading) {
        return (
            <div className="machine-layout-widget loading-container">
                <div className="text-center space-y-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-sm">Loading layout...</p>
                </div>
            </div>
        );
    }

    if (nodes.length === 0) {
        return (
            <div className="machine-layout-widget empty-container">
                <div className="text-center space-y-2">
                    <p className="font-semibold">No Machines Found</p>
                    <p className="text-xs">Add machines in Master Data or configure a template</p>
                </div>
            </div>
        );
    }

    return (
        <div className="machine-layout-widget">
            {/* Info Banner */}
            <div className="info-banner">
                <p className="text-xs text-gray-300">
                    <span className="text-blue-400 font-semibold">💡 Click</span> machines to view details •
                    <span className="text-green-400 font-semibold"> Drag</span> to pan •
                    <span className="text-purple-400 font-semibold">Scroll</span> to zoom •
                    <span className="text-orange-400 font-semibold">Minimap</span> to navigate
                </p>
            </div>

            {/* Legend - Status Colors */}
            <div className="status-legend">
                <div className="legend-item">
                    <div className="legend-dot bg-green-500"></div>
                    <span>Running</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot bg-yellow-500"></div>
                    <span>Idle</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot bg-red-500"></div>
                    <span>Alarm</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot bg-gray-500"></div>
                    <span>Disconnected</span>
                </div>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                // Read-only props
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={true}
                panOnDrag={true}
                zoomOnScroll={true}
                zoomOnPinch={true}
                zoomOnDoubleClick={false}
                fitView
                fitViewOptions={{ padding: 0.15, maxZoom: 0.8, minZoom: 0.05 }}
                minZoom={0.05}
                maxZoom={2}
                // Styling
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                    style: { stroke: '#3b82f6', strokeWidth: 3 },
                }}
            >
                <Background
                    variant="dots"
                    gap={20}
                    size={1}
                    color="#374151"
                />
                <Controls
                    className="bg-gray-800 border border-gray-700"
                    showInteractive={false}
                />
                <MiniMap
                    className="bg-gray-800 border border-gray-700 rounded-lg"
                    nodeColor={(node) => {
                        switch (node.data?.status) {
                            case 'running': return '#10b981';
                            case 'idle': return '#f59e0b';
                            case 'alarm': return '#ef4444';
                            default: return '#6b7280';
                        }
                    }}
                    nodeStrokeWidth={2}
                    nodeBorderRadius={8}
                    maskColor="rgba(17, 24, 39, 0.8)"
                    pannable={true}
                    zoomable={true}
                />
            </ReactFlow>
        </div>
    );
};

// Wrapper with ReactFlowProvider
const MachineLayoutReactFlow = (props) => {
    return (
        <ReactFlowProvider>
            <MachineLayoutReactFlowInner {...props} />
        </ReactFlowProvider>
    );
};

export default MachineLayoutReactFlow;

