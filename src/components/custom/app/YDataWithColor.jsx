import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const YDataWithColor = ({ value, options, placeholder, onSelect }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(value || []);
    const [editingIndex, setEditingIndex] = useState(-1);
    const multipleSelect = useRef();

    const removeSelected = (i) => {
        setSelected(selected.filter((_, j) => i !== j));
    };

    const updateColor = (index, color) => {
        const updated = [...selected];
        updated[index] = { ...updated[index], color };
        setSelected(updated);
    };

    const addOption = (option) => {
        const newOption = {
            ...option,
            color: option.color || '#2196F3' // Default blue color
        };
        setSelected([...selected, newOption]);
    };

    useEffect(() => {
        if (selected.length == options.length && open) {
            setOpen(false);
        }
        onSelect && onSelect(selected);
    }, [selected]);

    useEffect(() => {
        const clickOutside = (e) => {
            if (!multipleSelect.current.contains(e.target)) {
                setOpen(false);
                setEditingIndex(-1);
            }
        };
        document.addEventListener('click', clickOutside);
        return () => document.removeEventListener('click', clickOutside);
    }, []);

    return (
        <div className="relative" ref={multipleSelect}>
            <div
                className="px-2 py-1.5 inset-0 shadow-xs border-1 border-input bg-transparent rounded-md min-h-9 h-max flex flex-wrap gap-2"
                role="button"
                onClick={() => setOpen(true)}
            >
                {selected.length > 0 ? selected.map((option, index) => (
                    <Badge key={index} variant="outline" className='m-0 flex items-center gap-1'>
                        <div
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: option.color || '#2196F3' }}
                        />
                        {option.label}
                        <span className="ml-1 cursor-pointer" onClick={() => removeSelected(index)} role="button">
                            <X size={12} />
                        </span>
                    </Badge>
                )) : <span className="text-gray-500 dark:text-gray-400">{placeholder || 'Select options...'}</span>}
            </div>

            {open && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-md shadow-lg border-[1px] border-gray-200 dark:bg-gray-800 dark:border-gray-700 z-10 overflow-y-auto max-h-80">
                    <ul className="py-1">
                        {options?.filter(val => !selected.some(s => s.value === val.value)).map((option, index) => (
                            <li
                                key={index}
                                className="block px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                                onClick={() => addOption(option)}
                                role="option"
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Color Editor Modal */}
            {editingIndex >= 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Edit Color</h3>
                        <div className="space-y-4">
                            <div>
                                <Label>Data Series: {selected[editingIndex]?.label}</Label>
                            </div>
                            <div>
                                <Label htmlFor="color-picker">Color</Label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Input
                                        id="color-picker"
                                        type="color"
                                        value={selected[editingIndex]?.color || '#2196F3'}
                                        onChange={(e) => updateColor(editingIndex, e.target.value)}
                                        className="w-12 h-8 p-1 border rounded"
                                    />
                                    <Input
                                        type="text"
                                        value={selected[editingIndex]?.color || '#2196F3'}
                                        onChange={(e) => updateColor(editingIndex, e.target.value)}
                                        placeholder="#2196F3"
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => setEditingIndex(-1)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => setEditingIndex(-1)}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Color Edit Buttons */}
            {selected.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                    {selected.map((option, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingIndex(index)}
                            className="h-6 px-2 text-xs"
                        >
                            <Palette size={10} className="mr-1" />
                            {option.label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YDataWithColor;
