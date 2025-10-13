import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { LayoutContext } from '@/contexts/interact';
import { allFeatures } from "@/utils/config";
import { utils } from "@/utils/function";
import { ArrowRight, SearchCheck, LayoutPanelTop } from 'lucide-react';
import { useContext, useEffect, useState } from "react";
import DummyDataService from '@/services/DummyDataService';

export function AppCommand() {
    const { updateComponent, components, layout, updateLayout } = useContext(LayoutContext)
    const [state, setState] = useState([])
    const [open, setOpen] = useState(false)

    const getData = () => {
        // Get base features
        const baseFeatures = [...allFeatures];

        // Load saved layout templates for current line
        const currentLine = localStorage.getItem('selectedLine') || 'line_1';
        const allTemplates = DummyDataService.getLayoutTemplates();
        const lineTemplates = allTemplates.filter(t => t.line_id === currentLine);

        // Add saved templates as widgets if any exist
        if (lineTemplates.length > 0) {
            const templateFeatures = {
                category: 'Saved Layout Templates',
                feature: lineTemplates.map(template => ({
                    id: 'Widget',
                    label: `📐 ${template.name}`,
                    props: {
                        title: template.name,
                        chart_type: 'layout',
                        template_id: template.id,
                        template_name: template.name,
                        description: template.description || `Saved layout: ${template.name}`,
                        fileData: {
                            layout: template.nodes,
                            connections: template.edges
                        }
                    }
                }))
            };
            baseFeatures.push(templateFeatures);
        }

        setState(baseFeatures);
    }

    const updateState = ({ label, element, props }) => {
        const newId = utils.generateName(6).toString();

        // Calculate next available position
        const maxY = layout.length > 0 ? Math.max(...layout.map(l => l.y + l.h)) : 0;

        // Add component
        updateComponent([...components, {
            label,
            component: element,
            i: newId,
            props
        }]);

        // Add layout with proper default position
        updateLayout([...layout, {
            i: newId,
            x: 0,
            y: maxY, // Stack below existing widgets
            w: 12,   // Default width (1/4 of screen)
            h: 15,   // Default height
            static: false
        }]);

        setOpen((open) => !open)
    }

    useEffect(() => {
        getData()
        const down = (e) => {
            utils.keyHandlerCtrl("k", e, () => {
                setOpen((open) => !open)
            })
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    // Reload templates when dialog opens
    useEffect(() => {
        if (open) {
            getData(); // Refresh templates list when opening
        }
    }, [open])

    return (
        <>
            <div role="button" onClick={setOpen} className="flex items-center gap-1 border border-gray-300 px-2 py-0.5 rounded-lg ms-3 select-none">
                <SearchCheck size={18} className="text-gray-500" />
                <span className="p-2 pe-26 text-gray-500">Search features</span>
                <code className='text-gray-200'>
                    <span className='me-2 bg-gray-800 rounded-sm p-1 px-2 text-xs'>Ctrl</span>
                    <span className='me-2 bg-gray-800 rounded-sm p-1 px-2 text-xs'>K</span>
                </code>
            </div>
            <CommandDialog open={open} onOpenChange={setOpen} className="h-[300px] w-[600px]">
                <CommandInput placeholder="Type a CommandDialog or search..." className='border-none' />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {state.map((item, i) => (
                        <div key={i}>
                            <CommandGroup heading={item.category.toLowerCase()} className="capitalize" />
                            {item.feature.map((menu, index) => (
                                <CommandItem key={index} className='gap-20 comment-item'>
                                    <div role='button' className='flex gap-3 w-full h-full p-3' onClick={() => updateState(menu)}>
                                        <ArrowRight />
                                        <span className="capitalize">{menu.label.toLowerCase()}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </div>
                    ))}
                </CommandList>
            </CommandDialog>
        </>
    )
}