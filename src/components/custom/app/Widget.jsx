import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetDescription, SheetFooter, SheetTitle } from "@/components/ui/sheet";
import { LayoutContext } from "@/contexts/interact";
import { SheetContext } from "@/contexts/sheet";
import { SourceContext } from "@/contexts/source";
import { local } from "@/utils/access";
import { BadgeX, Lock, LockOpen, Settings, Settings2 } from "lucide-react";
import { lazy, Suspense, useContext, useEffect, useMemo, useState } from "react";
import Multiple from "./multipel";
import DummyDataService from "@/services/DummyDataService";

const AppChartBar = lazy(() => import('./charts/AppChartBar'));
const AppChartPie = lazy(() => import('./charts/AppChartPie'));
const AppChartArea = lazy(() => import('./charts/AppChartArea'));
const AppChartGauge = lazy(() => import('./charts/AppChartGauge'));
const OEEDonutChart = lazy(() => import('./OEEDonutChart'));
const MachineLayout = lazy(() => import('./MachineLayout'));
const MachineLayoutReactFlow = lazy(() => import('./MachineLayoutReactFlow'));
const CalendarWidget = lazy(() => import('./CalendarWidget'));

const Widget = ({ props, elementId }) => {
    const { layout, components, updateLayout, updateComponent } = useContext(LayoutContext)
    const { setSheetOpen, setSheetProps, setSheetFormValue } = useContext(SheetContext);
    const { getById } = useContext(SourceContext)

    let dataById = {};

    if (props?.id_resource_data) {
        const data = getById(props?.id_resource_data)
        dataById = data
    }

    const remove = (i) => {
        const newComponent = components.filter((item) => item.i !== i)
        const newLayout = layout.filter((item) => item.i !== i)
        updateComponent(newComponent)
        updateLayout(newLayout)
    }

    const lock = (i) => {
        const index = layout.findIndex((item) => item.i === i)
        if (index >= 0) {
            const newLayout = [...layout]
            newLayout[index].static = true
            updateLayout(newLayout)
        }
    }

    const unLock = (i) => {
        const index = layout.findIndex((item) => item.i === i)
        if (index >= 0) {
            const newLayout = [...layout]
            newLayout[index].static = false
            updateLayout(newLayout)
        }
    }

    const renderCard = useMemo(() => {
        return components.map((item) => {
            if (item.i === elementId && item?.props?.chart_type == 'bar') {
                return (
                    <Suspense fallback={
                        <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>Loading...</CardDescription>
                    } key={item.i}>
                        {<AppChartBar {...item.props} /> || <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>No content available</CardDescription>}
                    </Suspense>
                );
            }

            if (item.i === elementId && item?.props?.chart_type == 'pie') {
                return (
                    <Suspense fallback={
                        <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>Loading...</CardDescription>
                    } key={item.i}>
                        {<AppChartPie {...item.props} /> || <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>No content available</CardDescription>}
                    </Suspense>
                );
            }

            if (item.i === elementId && item?.props?.chart_type == 'area') {
                return (
                    <Suspense fallback={
                        <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>Loading...</CardDescription>
                    } key={item.i}>
                        {<AppChartArea {...item.props} /> || <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>No content available</CardDescription>}
                    </Suspense>
                );
            }

            if (item.i === elementId && item?.props?.chart_type == 'gauge') {
                return (
                    <Suspense fallback={
                        <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>Loading...</CardDescription>
                    } key={item.i}>
                        {<AppChartGauge {...item.props} dataItem={dataById} /> || <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>No content available</CardDescription>}
                    </Suspense>
                );
            }

            if (item.i === elementId && item?.props?.chart_type == 'donut') {
                return (
                    <Suspense fallback={
                        <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>Loading...</CardDescription>
                    } key={item.i}>
                        {<OEEDonutChart {...item.props} dataItem={dataById} /> || <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>No content available</CardDescription>}
                    </Suspense>
                );
            }

            if (item.i === elementId && (item?.props?.chart_type == 'machine_layout' || item?.props?.chart_type == 'layout')) {
                return (
                    <Suspense fallback={
                        <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>Loading...</CardDescription>
                    } key={item.i}>
                        {<MachineLayoutReactFlow template_id={item.props?.template_id} /> || <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>No content available</CardDescription>}
                    </Suspense>
                );
            }

            if (item.i === elementId && item?.props?.chart_type == 'calendar') {
                return (
                    <Suspense fallback={
                        <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>Loading...</CardDescription>
                    } key={item.i}>
                        {<CalendarWidget {...item.props} dataItem={dataById} /> || <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>No content available</CardDescription>}
                    </Suspense>
                );
            }
        });
    }, [components, elementId]);

    return (
        <Card className='overflow-hidden w-full h-full gap-0 p-1'>
            <CardHeader className='p-1 flex items-center justify-between mb-2 drag-handle cursor-move hover:bg-slate-50 dark:hover:bg-slate-800 rounded-t-lg transition-colors'>
                <CardTitle className='truncate font-semibold text-sm ml-2'>{props?.title}</CardTitle>
                <CardAction>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='rounded-md p-1 hover:shadow-md border border-gray-100 hover:border-gray-300 hover:bg-gray-100 transition-all duration-200'>
                            <Settings size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                                setSheetProps({
                                    title: "Widget Configuration",
                                    desc: "configuration for data visualitation widget",
                                    children: <AppSheetChildren elementId={elementId} props={props} />
                                });
                                setSheetFormValue('chart_type', props?.chart_type);
                                setSheetFormValue('id_resource_data', props?.id_resource_data);
                                setSheetFormValue('template_id', props?.template_id);
                                setSheetFormValue('template_name', props?.template_name);
                                setSheetOpen(true)
                            }}>
                                <Settings2 />
                                Configure
                            </DropdownMenuItem>
                            {layout.find(item => item.i === elementId)?.static ? (
                                <DropdownMenuItem onClick={() => unLock(elementId)}><LockOpen /> Unlock</DropdownMenuItem>
                            ) : (
                                <>
                                    <DropdownMenuItem onClick={() => lock(elementId)}><Lock /> Lock</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => remove(elementId)} className="text-red-500"><BadgeX className="text-red-500" /> Remove</DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardAction>
            </CardHeader>
            {props?.chart_type ?
                renderCard
                :
                <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full p-8'>
                    <div className="space-y-2 text-center">
                        <p className="font-semibold">Widget Not Configured</p>
                        <p className="text-xs">Click the ⚙️ icon above to configure this widget</p>
                    </div>
                </CardDescription>
            }
        </Card>
    );
}

export default Widget

function AppSheetChildren({ props, elementId }) {
    const { sheetForm, setSheetFormValue, setSheetOpen } = useContext(SheetContext);
    const { components, updateComponent } = useContext(LayoutContext)
    const { sources, getById } = useContext(SourceContext)
    const [xData, setDataX] = useState([]);
    const [yData, setDataY] = useState([]);
    const [zData, setDataZ] = useState([]);

    useEffect(() => {
        const id = sheetForm?.id_resource_data ?? props?.id_resource_data;
        if (id) {
            if (Array.isArray(getById(id)?.fileData)) {
                setDataX(Object.keys(getById(id)?.fileData[0]) ?? []);
                setDataY(Object.keys(getById(id)?.fileData[0]).map((item) => ({ label: item, value: item })) ?? []);
                setDataZ([]);
            } else {
                setDataX([]);
                setDataY([]);
                setDataZ(Object.keys(getById(id)?.fileData) ?? []);
            }
        }
    }, [props.id_resource_data, sheetForm?.id_resource_data]);

    const handleSaveSheet = () => {
        const updatedData = components.map(item =>
            item.i === elementId
                ? {
                    ...item,
                    props: {
                        ...item.props,
                        ...sheetForm,
                    },
                }
                : item
        );

        updateComponent(updatedData);
        setSheetOpen(false);
    };

    const SAFE_MIN_GAUGE = 66;

    return (
        <>
            <div className="flex-1 overflow-y-auto pr-4">
                <div className="grid grid-cols-1 gap-4 pl-4 pr-4">
                    <Label htmlFor={elementId}>Data Resource</Label>
                    <Select
                        defaultValue={props?.id_resource_data ?? ""}
                        onValueChange={(value) => {
                            setSheetFormValue("id_resource_data", value);
                            setSheetFormValue("x_data", []);
                            setSheetFormValue("yData", []);
                            setSheetFormValue("value_kpi", "");
                            setSheetFormValue("max_rate", "");
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>List Data</SelectLabel>
                                {sources.map((item, i) => (
                                    <SelectItem key={i} value={item.id}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div className="grid gap-3">
                        <Label htmlFor={elementId}>Widget Label</Label>
                        <Input
                            id={elementId}
                            defaultValue={props?.title}
                            onChange={(e) => setSheetFormValue("title", e.target.value)}
                        />
                    </div>

                    <Label htmlFor={elementId}>Chart Type</Label>
                    <Select
                        defaultValue={props?.chart_type ?? ""}
                        onValueChange={(value) => setSheetFormValue("chart_type", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>List Chart</SelectLabel>
                                <SelectItem value="bar">Bar Chart</SelectItem>
                                <SelectItem value="pie">Pie Chart</SelectItem>
                                <SelectItem value="area">Area Chart</SelectItem>
                                <SelectItem value="gauge">Gauge Chart</SelectItem>
                                <SelectItem value="donut">OEE Donut Chart</SelectItem>
                                <SelectItem value="machine_layout">Machine Layout</SelectItem>
                                <SelectItem value="calendar">Calendar Widget</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {['bar', 'area', 'pie'].includes(sheetForm?.chart_type ?? props?.chart_type) && (
                        <>
                            <SheetTitle>Configuration Chart</SheetTitle>
                            <SheetDescription>Set your chart data and type here.</SheetDescription>

                            <Label htmlFor={elementId}>X Data</Label>
                            <Select
                                defaultValue={props?.x_data ?? ""}
                                onValueChange={(value) => setSheetFormValue("x_data", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Keys List</SelectLabel>
                                        {xData.map((item, index) => (
                                            <SelectItem key={index} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Label htmlFor={elementId}>Y Data</Label>
                            <Multiple
                                options={yData}
                                value={props.yData}
                                placeholder='Select Options'
                                onSelect={value => setSheetFormValue('yData', value)}
                            />
                        </>
                    )}

                    {['gauge'].includes(sheetForm?.chart_type ?? props?.chart_type) && (
                        <>
                            <SheetTitle>Configuration Chart</SheetTitle>
                            <SheetDescription>Set your chart data and type here.</SheetDescription>

                            <Label htmlFor={elementId}>Value of Rate</Label>
                            <Select
                                defaultValue={props?.value_kpi ?? ""}
                                onValueChange={(value) => setSheetFormValue("value_kpi", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Keys List</SelectLabel>
                                        {zData.map((item, index) => (
                                            <SelectItem key={index} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <div className="grid gap-3">
                                <Label htmlFor={elementId}>Max Value of Rate</Label>
                                <Input
                                    id={elementId}
                                    type="number"
                                    placeholder="min set max value is 66"
                                    defaultValue={Math.max(props?.max_rate || SAFE_MIN_GAUGE, SAFE_MIN_GAUGE)}
                                    onChange={(e) => setSheetFormValue("max_rate", e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {['donut'].includes(sheetForm?.chart_type ?? props?.chart_type) && (
                        <>
                            <SheetTitle>OEE Donut Chart Configuration</SheetTitle>
                            <SheetDescription>This widget displays OEE metrics with breakdown (Availability, Performance, Quality) and production data (Cycle Time, Part OK, Part NG).</SheetDescription>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-xs text-blue-700 dark:text-blue-300">
                                <p className="font-semibold mb-1">📊 Required Data Fields:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>availability (percentage)</li>
                                    <li>performance (percentage)</li>
                                    <li>quality (percentage)</li>
                                    <li>cycle_time (seconds)</li>
                                    <li>part_ok (count)</li>
                                    <li>part_ng (count)</li>
                                </ul>
                            </div>
                        </>
                    )}

                    {['machine_layout', 'layout'].includes(sheetForm?.chart_type ?? props?.chart_type) && (
                        <>
                            <SheetTitle>Machine Layout Configuration</SheetTitle>
                            <SheetDescription>This widget displays interactive machine layout from Master Data or saved templates.</SheetDescription>

                            {/* Template Selector */}
                            <div className="space-y-2">
                                <Label>Layout Template (Optional)</Label>
                                <Select
                                    value={sheetForm?.template_id ?? props?.template_id ?? 'auto'}
                                    onValueChange={(value) => {
                                        // Set to undefined if 'auto' is selected
                                        setSheetFormValue('template_id', value === 'auto' ? undefined : value);
                                        // Find template and update title
                                        const currentLine = localStorage.getItem('selectedLine') || 'line_1';
                                        const templates = DummyDataService.getLayoutTemplates();
                                        const template = templates.find(t => t.id === value);
                                        if (template) {
                                            setSheetFormValue('template_name', template.name);
                                        } else if (value === 'auto') {
                                            setSheetFormValue('template_name', undefined);
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Auto-load from Master Data" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Saved Templates</SelectLabel>
                                            <SelectItem value="auto">Auto-load from Master Data</SelectItem>
                                            {(() => {
                                                const currentLine = localStorage.getItem('selectedLine') || 'line_1';
                                                const templates = DummyDataService.getLayoutTemplates();
                                                const lineTemplates = templates.filter(t => t.line_id === currentLine);
                                                return lineTemplates.map(template => (
                                                    <SelectItem key={template.id} value={template.id}>
                                                        {template.name}
                                                    </SelectItem>
                                                ));
                                            })()}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-gray-500">
                                    Select a saved template or leave empty to auto-load from Master Data
                                </p>
                            </div>

                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-xs text-green-700 dark:text-green-300">
                                <p className="font-semibold mb-1">🏭 Features:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Use saved templates from Layout Designer</li>
                                    <li>Or auto-loads machines from Master Data</li>
                                    <li>Filters by current line (line_1, line_2, line_3)</li>
                                    <li>Color-coded status (Running, Idle, Alarm, etc.)</li>
                                    <li>Clickable machines → navigate to detail page</li>
                                </ul>
                            </div>
                        </>
                    )}

                    {['calendar'].includes(sheetForm?.chart_type ?? props?.chart_type) && (
                        <>
                            <SheetTitle>Calendar Widget Configuration</SheetTitle>
                            <SheetDescription>This widget displays an interactive calendar with Engineering Call and Maintenance counters.</SheetDescription>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-xs text-purple-700 dark:text-purple-300">
                                <p className="font-semibold mb-1">📅 Required Data Fields:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>current_month (string, e.g., &quot;October 2025&quot;)</li>
                                    <li>current_date (number, e.g., 12)</li>
                                    <li>engineering_calls (number, e.g., 3)</li>
                                    <li>maintenance_calls (number, e.g., 2)</li>
                                    <li>events (array, optional for date indicators)</li>
                                    <li>highlighted_dates (array, optional)</li>
                                </ul>
                                <p className="mt-2 font-semibold">📞 Displays Engineering Call & Maintenance counters!</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <SheetFooter>
                <Button type="submit" onClick={handleSaveSheet}>Apply</Button>
            </SheetFooter>
        </>
    );
}
