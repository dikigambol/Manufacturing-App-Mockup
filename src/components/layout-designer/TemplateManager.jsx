import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
    LayoutGrid,
    Download,
    Save,
    Trash2,
    Eye,
    Plus,
    Sparkles
} from 'lucide-react';
import DummyDataService from '@/services/DummyDataService';

// Pre-defined template configurations
const PREDEFINED_TEMPLATES = [
    {
        id: 'template_linear',
        name: 'Linear Production Line',
        description: 'Traditional assembly line with sequential workflow',
        category: 'predefined',
        layout_type: 'linear',
        thumbnail: '🔗',
        nodes: [
            {
                id: 'node_1',
                type: 'machine',
                position: { x: 100, y: 250 },
                data: {
                    machine_id: 'MCH-START',
                    name: 'Material Input',
                    machine_type: 'Manual',
                    status: 'running'
                }
            },
            {
                id: 'node_2',
                type: 'machine',
                position: { x: 350, y: 250 },
                data: {
                    machine_id: 'MCH-ASM-1',
                    name: 'Assembly Station 1',
                    machine_type: 'Assembly',
                    status: 'running'
                }
            },
            {
                id: 'node_3',
                type: 'machine',
                position: { x: 600, y: 250 },
                data: {
                    machine_id: 'MCH-ASM-2',
                    name: 'Assembly Station 2',
                    machine_type: 'Assembly',
                    status: 'idle'
                }
            },
            {
                id: 'node_4',
                type: 'machine',
                position: { x: 850, y: 250 },
                data: {
                    machine_id: 'MCH-TEST',
                    name: 'Quality Test',
                    machine_type: 'Testing',
                    status: 'running'
                }
            },
            {
                id: 'node_5',
                type: 'machine',
                position: { x: 1100, y: 250 },
                data: {
                    machine_id: 'MCH-END',
                    name: 'Material Output',
                    machine_type: 'Packaging',
                    status: 'running'
                }
            }
        ],
        edges: [
            { id: 'e1-2', source: 'node_1', target: 'node_2', animated: true },
            { id: 'e2-3', source: 'node_2', target: 'node_3', animated: true },
            { id: 'e3-4', source: 'node_3', target: 'node_4', animated: true },
            { id: 'e4-5', source: 'node_4', target: 'node_5', animated: true }
        ]
    },
    {
        id: 'template_u_shaped',
        name: 'U-Shaped Cell',
        description: 'Efficient U-shaped layout for cellular manufacturing',
        category: 'predefined',
        layout_type: 'u_shaped',
        thumbnail: '🔄',
        nodes: [
            {
                id: 'node_1',
                type: 'machine',
                position: { x: 100, y: 100 },
                data: {
                    machine_id: 'MCH-IN',
                    name: 'Input Station',
                    machine_type: 'Manual',
                    status: 'running'
                }
            },
            {
                id: 'node_2',
                type: 'machine',
                position: { x: 350, y: 100 },
                data: {
                    machine_id: 'MCH-PROC-1',
                    name: 'Process Station 1',
                    machine_type: 'Assembly',
                    status: 'running'
                }
            },
            {
                id: 'node_3',
                type: 'machine',
                position: { x: 600, y: 100 },
                data: {
                    machine_id: 'MCH-PROC-2',
                    name: 'Process Station 2',
                    machine_type: 'Assembly',
                    status: 'idle'
                }
            },
            {
                id: 'node_4',
                type: 'machine',
                position: { x: 600, y: 400 },
                data: {
                    machine_id: 'MCH-TEST',
                    name: 'Quality Check',
                    machine_type: 'Inspection',
                    status: 'running'
                }
            },
            {
                id: 'node_5',
                type: 'machine',
                position: { x: 350, y: 400 },
                data: {
                    machine_id: 'MCH-PACK',
                    name: 'Packaging',
                    machine_type: 'Packaging',
                    status: 'running'
                }
            },
            {
                id: 'node_6',
                type: 'machine',
                position: { x: 100, y: 400 },
                data: {
                    machine_id: 'MCH-OUT',
                    name: 'Output Station',
                    machine_type: 'Manual',
                    status: 'running'
                }
            }
        ],
        edges: [
            { id: 'e1-2', source: 'node_1', target: 'node_2', animated: true },
            { id: 'e2-3', source: 'node_2', target: 'node_3', animated: true },
            { id: 'e3-4', source: 'node_3', target: 'node_4', animated: true },
            { id: 'e4-5', source: 'node_4', target: 'node_5', animated: true },
            { id: 'e5-6', source: 'node_5', target: 'node_6', animated: true }
        ]
    },
    {
        id: 'template_cellular',
        name: 'Cellular Manufacturing',
        description: 'Multiple work cells for parallel production',
        category: 'predefined',
        layout_type: 'cellular',
        thumbnail: '⚡',
        nodes: [
            // Cell 1
            {
                id: 'node_1',
                type: 'machine',
                position: { x: 100, y: 100 },
                data: {
                    machine_id: 'CELL1-ASM',
                    name: 'Cell 1 Assembly',
                    machine_type: 'Assembly',
                    status: 'running'
                }
            },
            {
                id: 'node_2',
                type: 'machine',
                position: { x: 300, y: 100 },
                data: {
                    machine_id: 'CELL1-TEST',
                    name: 'Cell 1 Test',
                    machine_type: 'Testing',
                    status: 'running'
                }
            },
            // Cell 2
            {
                id: 'node_3',
                type: 'machine',
                position: { x: 100, y: 300 },
                data: {
                    machine_id: 'CELL2-ASM',
                    name: 'Cell 2 Assembly',
                    machine_type: 'Assembly',
                    status: 'idle'
                }
            },
            {
                id: 'node_4',
                type: 'machine',
                position: { x: 300, y: 300 },
                data: {
                    machine_id: 'CELL2-TEST',
                    name: 'Cell 2 Test',
                    machine_type: 'Testing',
                    status: 'running'
                }
            },
            // Final QC
            {
                id: 'node_5',
                type: 'machine',
                position: { x: 550, y: 200 },
                data: {
                    machine_id: 'MCH-FINAL-QC',
                    name: 'Final Quality Gate',
                    machine_type: 'Inspection',
                    status: 'running'
                }
            }
        ],
        edges: [
            { id: 'e1-2', source: 'node_1', target: 'node_2', animated: true },
            { id: 'e2-5', source: 'node_2', target: 'node_5', animated: true },
            { id: 'e3-4', source: 'node_3', target: 'node_4', animated: true },
            { id: 'e4-5', source: 'node_4', target: 'node_5', animated: true }
        ]
    },
    {
        id: 'template_island',
        name: 'Island Layout',
        description: 'Centralized testing with surrounding assembly stations',
        category: 'predefined',
        layout_type: 'island',
        thumbnail: '🏝️',
        nodes: [
            // Center - Testing
            {
                id: 'node_center',
                type: 'machine',
                position: { x: 400, y: 250 },
                data: {
                    machine_id: 'MCH-TEST-CENTRAL',
                    name: 'Central Test Station',
                    machine_type: 'Testing',
                    status: 'running'
                }
            },
            // Surrounding stations
            {
                id: 'node_1',
                type: 'machine',
                position: { x: 200, y: 100 },
                data: {
                    machine_id: 'MCH-ASM-1',
                    name: 'Assembly Station 1',
                    machine_type: 'Assembly',
                    status: 'running'
                }
            },
            {
                id: 'node_2',
                type: 'machine',
                position: { x: 600, y: 100 },
                data: {
                    machine_id: 'MCH-ASM-2',
                    name: 'Assembly Station 2',
                    machine_type: 'Assembly',
                    status: 'idle'
                }
            },
            {
                id: 'node_3',
                type: 'machine',
                position: { x: 200, y: 400 },
                data: {
                    machine_id: 'MCH-ASM-3',
                    name: 'Assembly Station 3',
                    machine_type: 'Assembly',
                    status: 'running'
                }
            },
            {
                id: 'node_4',
                type: 'machine',
                position: { x: 600, y: 400 },
                data: {
                    machine_id: 'MCH-ASM-4',
                    name: 'Assembly Station 4',
                    machine_type: 'Assembly',
                    status: 'running'
                }
            }
        ],
        edges: [
            { id: 'e1-c', source: 'node_1', target: 'node_center', animated: true },
            { id: 'e2-c', source: 'node_2', target: 'node_center', animated: true },
            { id: 'e3-c', source: 'node_3', target: 'node_center', animated: true },
            { id: 'e4-c', source: 'node_4', target: 'node_center', animated: true }
        ]
    },
    {
        id: 'template_automated',
        name: 'Automated Line',
        description: 'Fully automated production line with robotic stations',
        category: 'predefined',
        layout_type: 'automated',
        thumbnail: '🤖',
        nodes: [
            {
                id: 'node_1',
                type: 'machine',
                position: { x: 100, y: 250 },
                data: {
                    machine_id: 'MCH-ROBOT-1',
                    name: 'Robot Pick & Place',
                    machine_type: 'Automated',
                    status: 'running'
                }
            },
            {
                id: 'node_2',
                type: 'machine',
                position: { x: 350, y: 250 },
                data: {
                    machine_id: 'MCH-ROBOT-2',
                    name: 'Robot Assembly',
                    machine_type: 'Automated',
                    status: 'running'
                }
            },
            {
                id: 'node_3',
                type: 'machine',
                position: { x: 600, y: 250 },
                data: {
                    machine_id: 'MCH-VISION',
                    name: 'Vision Inspection',
                    machine_type: 'Inspection',
                    status: 'running'
                }
            },
            {
                id: 'node_4',
                type: 'machine',
                position: { x: 850, y: 250 },
                data: {
                    machine_id: 'MCH-ROBOT-3',
                    name: 'Robot Packaging',
                    machine_type: 'Automated',
                    status: 'running'
                }
            }
        ],
        edges: [
            { id: 'e1-2', source: 'node_1', target: 'node_2', animated: true },
            { id: 'e2-3', source: 'node_2', target: 'node_3', animated: true },
            { id: 'e3-4', source: 'node_3', target: 'node_4', animated: true }
        ]
    }
];

const TemplateCard = ({ template, onSelect, onDelete, isCustom }) => {
    return (
        <div className="group relative p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-500 transition-all">
            <div className="flex items-start gap-3">
                <div className="text-4xl">{template.thumbnail || '📋'}</div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm font-semibold text-white truncate">
                            {template.name}
                        </h4>
                        <Badge variant={template.category === 'predefined' ? 'default' : 'secondary'} className="text-xs ml-2">
                            {template.category === 'predefined' ? <><Sparkles className="h-3 w-3 mr-1" /> Pre-defined</> : 'Custom'}
                        </Badge>
                    </div>

                    <p className="text-xs text-gray-400 mb-3">
                        {template.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{template.nodes?.length || 0} machines</span>
                        <span>•</span>
                        <span>{template.edges?.length || 0} connections</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-3">
                <Button
                    size="sm"
                    variant="default"
                    className="flex-1 gap-2"
                    onClick={() => onSelect(template)}
                >
                    <Download className="h-3 w-3" />
                    Load Template
                </Button>

                {isCustom && onDelete && (
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(template.id)}
                    >
                        <Trash2 className="h-3 w-3" />
                    </Button>
                )}
            </div>
        </div>
    );
};

const TemplateManager = ({ isOpen, onClose, onLoadTemplate, currentLayout, defaultTab = 'predefined', currentLine = 'line_1' }) => {
    const [customTemplates, setCustomTemplates] = useState([]);
    const [templateName, setTemplateName] = useState('');
    const [templateDescription, setTemplateDescription] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState(defaultTab);

    useEffect(() => {
        if (isOpen) {
            loadCustomTemplates();
            setActiveTab(defaultTab); // Set tab when dialog opens
        }
    }, [isOpen, defaultTab]);

    const loadCustomTemplates = () => {
        const templates = DummyDataService.getLayoutTemplates();
        // Filter templates by current line
        const lineTemplates = templates.filter(t => t.line_id === currentLine);
        setCustomTemplates(lineTemplates);
    };

    const handleSaveTemplate = () => {
        if (!templateName.trim()) {
            alert('Please enter a template name');
            return;
        }

        if (!currentLayout || currentLayout.nodes.length === 0) {
            alert('Cannot save empty layout');
            return;
        }

        setIsSaving(true);

        const newTemplate = {
            id: `template_custom_${Date.now()}`,
            name: templateName,
            description: templateDescription || 'Custom layout template',
            category: 'custom',
            layout_type: 'custom',
            thumbnail: '💼',
            line_id: currentLine, // Associate template with specific line
            nodes: currentLayout.nodes,
            edges: currentLayout.edges,
            created_at: new Date().toISOString()
        };

        DummyDataService.saveLayoutTemplate(newTemplate);
        loadCustomTemplates();

        setTemplateName('');
        setTemplateDescription('');
        setIsSaving(false);

        alert('Template saved successfully!');
    };

    const handleDeleteTemplate = (templateId) => {
        if (confirm('Are you sure you want to delete this template?')) {
            DummyDataService.deleteLayoutTemplate(templateId);
            loadCustomTemplates();
        }
    };

    const handleSelectTemplate = (template) => {
        onLoadTemplate(template);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col bg-gray-800 border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-white">Layout Templates</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Load a pre-defined template or save your current layout as a custom template
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
                    <TabsList className="bg-gray-700 w-full">
                        <TabsTrigger value="predefined" className="flex-1">
                            Pre-defined Templates
                        </TabsTrigger>
                        <TabsTrigger value="custom" className="flex-1">
                            Custom Templates ({customTemplates.length})
                        </TabsTrigger>
                        <TabsTrigger value="save" className="flex-1">
                            Save Current Layout
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="predefined" className="flex-1 overflow-y-auto mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-2">
                            {PREDEFINED_TEMPLATES.map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    onSelect={handleSelectTemplate}
                                    isCustom={false}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="custom" className="flex-1 overflow-y-auto mt-4">
                        {customTemplates.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                <LayoutGrid className="h-16 w-16 text-gray-600 mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    No Custom Templates Yet
                                </h3>
                                <p className="text-sm text-gray-400 max-w-md">
                                    Save your current layout to create reusable templates
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-2">
                                {customTemplates.map((template) => (
                                    <TemplateCard
                                        key={template.id}
                                        template={template}
                                        onSelect={handleSelectTemplate}
                                        onDelete={handleDeleteTemplate}
                                        isCustom={true}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="save" className="flex-1 overflow-y-auto mt-4">
                        <div className="max-w-md mx-auto space-y-4">
                            <div>
                                <Label className="text-white">Template Name *</Label>
                                <Input
                                    value={templateName}
                                    onChange={(e) => setTemplateName(e.target.value)}
                                    placeholder="e.g., My Custom Layout"
                                    className="bg-gray-700 border-gray-600 text-white mt-2"
                                />
                            </div>

                            <div>
                                <Label className="text-white">Description</Label>
                                <Textarea
                                    value={templateDescription}
                                    onChange={(e) => setTemplateDescription(e.target.value)}
                                    placeholder="Describe this layout template..."
                                    className="bg-gray-700 border-gray-600 text-white mt-2"
                                    rows={3}
                                />
                            </div>

                            {currentLayout && (
                                <div className="p-3 bg-gray-700 rounded border border-gray-600">
                                    <div className="text-sm text-gray-400 mb-2">Current Layout:</div>
                                    <div className="flex items-center gap-4 text-xs text-gray-300">
                                        <span>{currentLayout.nodes?.length || 0} machines</span>
                                        <span>•</span>
                                        <span>{currentLayout.edges?.length || 0} connections</span>
                                    </div>
                                </div>
                            )}

                            <Button
                                onClick={handleSaveTemplate}
                                disabled={isSaving || !templateName.trim()}
                                className="w-full gap-2"
                            >
                                <Save className="h-4 w-4" />
                                Save as Template
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default TemplateManager;
