import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Multiple = ({ value, options, placeholder, onSelect }) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(value || [])
    const multipleSelect = useRef()

    const removeSelected = (i) => {
        setSelected(selected.filter((_, j) => i !== j))
    }

    useEffect(() => {
        if (selected.length == options.length && open) {
            setOpen(false)
        }

        onSelect && onSelect(selected)
    }, [selected])

    useEffect(() => {
        const clickOutside = (e) => {
            if (!multipleSelect.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', clickOutside)
        return () => document.removeEventListener('click', clickOutside)
    }, [])

    return (
        <div className="relative" ref={multipleSelect}>
            <div className="px-2 py-1.5 inset-0 shadow-xs border-1 border-input bg-transparent rounded-md min-h-9 h-max flex flex-wrap gap-2" role="button" onClick={() => setOpen(true)}>
                {selected.length > 0 ? selected.map((option, index) => (
                    <Badge key={index} variant="outline" className='m-0'>
                        {option.label}
                        <span className="ml-2 cursor-pointer" onClick={() => removeSelected(index)} role="button">
                            <X size={12}/>
                        </span>
                    </Badge>
                )) : <span className="text-gray-500 dark:text-gray-400">{placeholder || 'Select options...'}</span>}
            </div>
            {open &&
                <div className="absolute top-full mt-2 w-full bg-white rounded-md shadow-lg border-[1px] border-gray-200 dark:bg-gray-800 dark:border-gray-700 z-10 overflow-y-auto max-h-80">
                    <ul className="py-1">
                        {options?.filter(val => !selected.includes(val)).map((option, index) => (
                            <li key={index} className="block px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setSelected([...selected, option])} role="option">{option.label}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}

export default Multiple;