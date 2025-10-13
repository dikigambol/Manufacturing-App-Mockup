import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    ReactFlowProvider,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './LayoutDesigner.css'; // Scoped styles for Layout Designer
import { Button } from '@/components/ui/button';
import { Save, FolderOpen, Download, ArrowLeft, Home, Undo, Redo } from 'lucide-react';
import MachinePalette from '@/components/layout-designer/MachinePalette';
import MachineNode from '@/components/layout-designer/MachineNode';
import PropertiesPanel from '@/components/layout-designer/PropertiesPanel';
import EdgePropertiesPanel from '@/components/layout-designer/EdgePropertiesPanel';
import TemplateManager from '@/components/layout-designer/TemplateManager';

// Define node types
const nodeTypes = {
    machine: MachineNode,
};

const LayoutDesignerInner = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get current line from localStorage or location state
    const getCurrentLine = () => {
        // Try from location state first
        if (location.state?.lineId) {
            return location.state.lineId;
        }
        // Fallback to localStorage
        return localStorage.getItem('selectedLine') || 'line_1';
    };

    const [currentLine] = useState(getCurrentLine());
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedEdge, setSelectedEdge] = useState(null);
    const [showTemplateManager, setShowTemplateManager] = useState(false);
    const [templateManagerTab, setTemplateManagerTab] = useState('predefined');
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    // Undo/Redo state
    const [history, setHistory] = useState([{ nodes: [], edges: [] }]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const handleGoBack = () => {
        navigate(-1); // Go back to previous page
    };

    const handleGoHome = () => {
        navigate('/lines'); // Go to line selection
    };

    // Save to history for undo/redo
    const saveToHistory = useCallback((newNodes, newEdges) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({ nodes: newNodes, edges: newEdges });
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [history, historyIndex]);

    // Undo handler
    const handleUndo = useCallback(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setNodes(history[newIndex].nodes);
            setEdges(history[newIndex].edges);
            setSelectedNode(null);
            setSelectedEdge(null);
        }
    }, [historyIndex, history]);

    // Redo handler
    const handleRedo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setNodes(history[newIndex].nodes);
            setEdges(history[newIndex].edges);
            setSelectedNode(null);
            setSelectedEdge(null);
        }
    }, [historyIndex, history]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Undo: Ctrl+Z or Cmd+Z
            if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
                event.preventDefault();
                handleUndo();
            }
            // Redo: Ctrl+Y or Cmd+Shift+Z
            if (
                ((event.ctrlKey || event.metaKey) && event.key === 'y') ||
                ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z')
            ) {
                event.preventDefault();
                handleRedo();
            }
            // Delete: Delete or Backspace
            if (event.key === 'Delete' || event.key === 'Backspace') {
                if (selectedEdge) {
                    event.preventDefault();
                    handleEdgeDelete(selectedEdge.id);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleUndo, handleRedo, selectedEdge]);

    // React Flow handlers with optimized updates
    const onNodesChange = useCallback(
        (changes) => {
            setNodes((nds) => {
                const updatedNodes = applyNodeChanges(changes, nds);

                // Only save to history when drag ends (not during drag)
                const isDragEnd = changes.some(change =>
                    change.type === 'position' && change.dragging === false
                );

                if (isDragEnd) {
                    // Use setTimeout to avoid blocking the UI
                    setTimeout(() => {
                        saveToHistory(updatedNodes, edges);
                    }, 0);
                }

                return updatedNodes;
            });
        },
        [edges, saveToHistory]
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
        setSelectedEdge(null);
    }, []);

    const onEdgeClick = useCallback((event, edge) => {
        setSelectedEdge(edge);
        setSelectedNode(null);
    }, []);

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
        setSelectedEdge(null);
    }, []);

    const handleEdgeDelete = useCallback((edgeId) => {
        setEdges((eds) => {
            const newEdges = eds.filter((edge) => edge.id !== edgeId);
            saveToHistory(nodes, newEdges);
            return newEdges;
        });
        setSelectedEdge(null);
    }, [nodes, saveToHistory]);

    const handleEdgeUpdate = useCallback((updatedEdge) => {
        setEdges((eds) => {
            // Create a completely new array with new edge object
            const newEdges = eds.map((edge) => {
                if (edge.id === updatedEdge.id) {
                    return { ...updatedEdge };
                }
                return edge;
            });
            return newEdges;
        });
        setSelectedEdge(updatedEdge);
    }, []);

    // Drag and Drop handlers
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            if (!reactFlowInstance) return;

            const type = 'machine';
            const dataStr = event.dataTransfer.getData('application/reactflow');

            if (!dataStr) return;

            const { data: machineData } = JSON.parse(dataStr);

            // Use screenToFlowPosition instead of deprecated project
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type,
                position,
                data: {
                    ...machineData,
                    showOEE: false,
                    needsMaintenance: false,
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    // Node management handlers
    const handleNodeUpdate = useCallback((updatedNode) => {
        setNodes((nds) =>
            nds.map((node) => (node.id === updatedNode.id ? updatedNode : node))
        );
        setSelectedNode(updatedNode);
    }, []);

    const handleNodeDelete = useCallback((nodeId) => {
        setNodes((nds) => nds.filter((node) => node.id !== nodeId));
        setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
        setSelectedNode(null);
    }, []);

    const handleNodeDuplicate = useCallback((node) => {
        const newNode = {
            ...node,
            id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            position: {
                x: node.position.x + 50,
                y: node.position.y + 50,
            },
        };
        setNodes((nds) => [...nds, newNode]);
    }, []);

    // Template handlers
    const handleSaveTemplate = () => {
        // Open template manager directly to SAVE tab
        setTemplateManagerTab('save');
        setShowTemplateManager(true);
    };

    const handleLoadTemplate = (template) => {
        if (template.nodes && template.edges) {
            setNodes(template.nodes);
            setEdges(template.edges);
            setSelectedNode(null);
        }
    };

    const handleOpenTemplateManager = () => {
        // Open template manager to browse templates (predefined or custom)
        setTemplateManagerTab('predefined');
        setShowTemplateManager(true);
    };

    const handleExport = () => {
        const template = {
            nodes,
            edges,
            metadata: {
                created: new Date().toISOString(),
                nodeCount: nodes.length,
                edgeCount: edges.length,
            },
        };

        const dataStr = JSON.stringify(template, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `machine-layout-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="layout-designer-view fixed inset-0 flex flex-col bg-gray-900">
            {/* Header */}
            <div className="flex-shrink-0 bg-gray-800 border-b border-gray-700 px-6 py-3 z-10">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleGoBack}
                                className="gap-2 text-gray-300 hover:text-white"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                            <div className="h-6 w-px bg-gray-600" />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleGoHome}
                                className="gap-2 text-gray-300 hover:text-white"
                            >
                                <Home className="h-4 w-4" />
                                Home
                            </Button>
                        </div>

                        {/* Title */}
                        <div className="flex-shrink-0 pl-4 border-l border-gray-600">
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold text-white">Machine Layout Designer</h1>
                                <span className="px-2 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded">
                                    {currentLine.toUpperCase().replace('_', ' ')}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400">
                                Drag & drop machines to create production line layouts
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                        {/* Undo/Redo Buttons */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleUndo}
                            disabled={historyIndex === 0}
                            className="gap-2"
                            title="Undo (Ctrl+Z)"
                        >
                            <Undo className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRedo}
                            disabled={historyIndex === history.length - 1}
                            className="gap-2"
                            title="Redo (Ctrl+Y)"
                        >
                            <Redo className="h-4 w-4" />
                        </Button>

                        <div className="h-6 w-px bg-gray-600 mx-1" />

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleOpenTemplateManager}
                            className="gap-2"
                        >
                            <FolderOpen className="h-4 w-4" />
                            Templates
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSaveTemplate}
                            className="gap-2"
                        >
                            <Save className="h-4 w-4" />
                            Save
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleExport}
                            className="gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Export JSON
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content - 3 Column Layout */}
            <div className="flex-1 flex overflow-hidden min-h-0">
                {/* Left Sidebar - Machine Palette */}
                <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col overflow-hidden">
                    <MachinePalette />
                </div>

                {/* Center - React Flow Canvas */}
                <div className="flex-1 relative overflow-hidden" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        onEdgeClick={onEdgeClick}
                        onPaneClick={onPaneClick}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        nodeTypes={nodeTypes}
                        edgesFocusable={true}
                        edgesUpdatable={false}
                        elementsSelectable={true}
                        nodesDraggable={true}
                        nodesConnectable={true}
                        selectNodesOnDrag={false}
                        autoPanOnNodeDrag={true}
                        autoPanOnConnect={true}
                        panOnDrag={true}
                        panActivationKeyCode="Space"
                        panOnScroll={false}
                        preventScrolling={true}
                        zoomOnScroll={true}
                        zoomOnPinch={true}
                        zoomOnDoubleClick={false}
                        fitView
                        fitViewOptions={{ padding: 0.2 }}
                        snapToGrid={true}
                        snapGrid={[20, 20]}
                        connectionLineStyle={{ stroke: '#3b82f6', strokeWidth: 3 }}
                        connectionLineType="smoothstep"
                        defaultEdgeOptions={{
                            type: 'smoothstep',
                            animated: true,
                            style: {
                                stroke: '#3b82f6',
                                strokeWidth: 3,
                            },
                            markerEnd: {
                                type: 'arrowclosed',
                                color: '#3b82f6',
                            },
                        }}
                        deleteKeyCode="Delete"
                        multiSelectionKeyCode="Shift"
                    >
                        <Background
                            variant="dots"
                            gap={20}
                            size={1}
                            color="#374151"
                        />
                        <Controls
                            className="bg-gray-800 border border-gray-700"
                        />
                        <MiniMap
                            className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
                            nodeColor={(node) => {
                                switch (node.data?.status) {
                                    case 'running': return '#10b981';
                                    case 'idle': return '#f59e0b';
                                    case 'alarm': return '#ef4444';
                                    default: return '#6b7280';
                                }
                            }}
                            nodeStrokeColor={(node) => {
                                return node.selected ? '#3b82f6' : '#1f2937';
                            }}
                            nodeStrokeWidth={2}
                            nodeBorderRadius={8}
                            maskColor="rgba(17, 24, 39, 0.8)"
                            pannable={true}
                            zoomable={true}
                            inversePan={false}
                            zoomStep={10}
                        />
                    </ReactFlow>

                    {/* Empty State */}
                    {nodes.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <div className="mb-4 text-6xl">🏭</div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Start Building Your Layout
                                </h3>
                                <p className="text-gray-400 max-w-md">
                                    Drag machines from the left panel to create your production line layout.
                                    Connect machines by dragging from connection points.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Sidebar - Properties Panel */}
                <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col overflow-hidden">
                    {selectedEdge ? (
                        <EdgePropertiesPanel
                            selectedEdge={selectedEdge}
                            onEdgeUpdate={handleEdgeUpdate}
                            onEdgeDelete={handleEdgeDelete}
                        />
                    ) : (
                        <PropertiesPanel
                            selectedNode={selectedNode}
                            onNodeUpdate={handleNodeUpdate}
                            onNodeDelete={handleNodeDelete}
                            onNodeDuplicate={handleNodeDuplicate}
                        />
                    )}
                </div>
            </div>

            {/* Status Bar */}
            <div className="flex-shrink-0 bg-gray-800 border-t border-gray-700 px-6 py-2 z-10">
                <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                        <span>Nodes: {nodes.length}</span>
                        <span>Connections: {edges.length}</span>
                        <span>Snap to Grid: 20px</span>
                    </div>
                    <div>
                        Ready
                    </div>
                </div>
            </div>

            {/* Template Manager Dialog */}
            <TemplateManager
                isOpen={showTemplateManager}
                onClose={() => setShowTemplateManager(false)}
                onLoadTemplate={handleLoadTemplate}
                currentLayout={{ nodes, edges }}
                defaultTab={templateManagerTab}
                currentLine={currentLine}
            />
        </div>
    );
};

// Wrapper component with ReactFlowProvider
const LayoutDesigner = () => {
    return (
        <ReactFlowProvider>
            <LayoutDesignerInner />
        </ReactFlowProvider>
    );
};

export default LayoutDesigner;

