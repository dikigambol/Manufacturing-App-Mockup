import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { LayoutContext } from '@/contexts/interact';
import { allFeatures } from "@/utils/config";
import { utils } from "@/utils/function";
import { ArrowRight, SearchCheck } from 'lucide-react';
import { useContext, useEffect, useState } from "react";

export function AppCommand() {
    const { updateComponent, components } = useContext(LayoutContext)
    const [state, setState] = useState([])
    const [open, setOpen] = useState(false)

    const getData = () => {
        setState(allFeatures)
    }

    const updateState = ({ label, element, props }) => {
        updateComponent([...components, {
            label,
            component: element,
            i: utils.generateName(6).toString(),
            props
        }])
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