import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Wrench, AlertTriangle, Battery, Hash, AlarmClock, Bell, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import DummyDataService from '@/services/DummyDataService';

const MachineDetailPage = () => {
    const { machineId } = useParams();
    const navigate = useNavigate();
    const [machine, setMachine] = useState(null);
    const [timeRange, setTimeRange] = useState('daily');
    const [loading, setLoading] = useState(true);

    // Dummy data for charts
    const mttrData = [
        { day: '01', value: 8 },
        { day: '02', value: 9 },
        { day: '03', value: 13 },
        { day: '04', value: 18 },
        { day: '05', value: 15 },
        { day: '06', value: 17 },
        { day: '07', value: 21 },
        { day: '08', value: 24 },
        { day: '09', value: 19 },
        { day: '10', value: 16 },
        { day: '11', value: 14 },
        { day: '12', value: 18 },
        { day: '13', value: 16 },
        { day: '14', value: 12 },
        { day: '15', value: 10 },
    ];

    const mtbfData = [
        { day: '01', value: 12 },
        { day: '02', value: 8 },
        { day: '03', value: 10 },
        { day: '04', value: 7 },
        { day: '05', value: 6 },
        { day: '06', value: 8 },
        { day: '07', value: 10 },
        { day: '08', value: 7 },
        { day: '09', value: 6 },
        { day: '10', value: 9 },
        { day: '11', value: 6 },
        { day: '12', value: 7 },
        { day: '13', value: 9 },
    ];

    const performanceData = [
        { name: 'Running', value: 50, color: '#10b981' },
        { name: 'Idle', value: 30, color: '#f59e0b' },
        { name: 'Alarm', value: 15, color: '#ef4444' },
        { name: 'Disconnected', value: 5, color: '#6b7280' },
    ];

    const maintenanceList = [
        { datetime: '01 / Oct / 2025 - 12:21', problem: 'Sensor Jig tidak terbaca' },
        { datetime: '02 / Oct / 2025 - 12:21', problem: 'Gantt solonig Pneumatic' },
    ];

    // Gantt Chart Data - Timeline starts at 07:00 (S1) and ends at 06:00 next day
    // Display range: 07:00 -> 15:00 -> 23:00 -> 07:00 (next day) = 24 hours
    // We map hours 7-30 (7am to 6am next day)

    const ganttBlocks = [
        // S1 Shift (07:00 - 15:00) -> hours 7-15 in display
        { hour: 7, duration: 3, status: 'running' },     // 07:00-10:00
        { hour: 10, duration: 1, status: 'idle' },       // 10:00-11:00 (Break/Setup)
        { hour: 11, duration: 2, status: 'running' },    // 11:00-13:00
        { hour: 13, duration: 1, status: 'alarm' },      // 13:00-14:00 (Problem!)
        { hour: 14, duration: 1, status: 'running' },    // 14:00-15:00

        // S2 Shift (15:00 - 23:00) -> hours 15-23 in display
        { hour: 15, duration: 4, status: 'running' },    // 15:00-19:00
        { hour: 19, duration: 1, status: 'idle' },       // 19:00-20:00 (Break)
        { hour: 20, duration: 2, status: 'running' },    // 20:00-22:00
        { hour: 22, duration: 1, status: 'disconnected' }, // 22:00-23:00 (Network issue!)

        // S3 Shift (23:00 - 07:00 next day) -> hours 23-30 in display (23-24 + 0-6)
        { hour: 23, duration: 1, status: 'running' },    // 23:00-00:00
        { hour: 24, duration: 5, status: 'running' },    // 00:00-05:00 (displayed as 24-29)
        { hour: 29, duration: 1, status: 'idle' },       // 05:00-06:00 (Prep for S1)
        { hour: 30, duration: 1, status: 'running' },    // 06:00-07:00
    ];

    // Shift markers for visual reference (positioned in 0-24 range for calculation)
    const shiftMarkers = [
        { shift: 'S1', start: 0, end: 8, label: 'S1 (07:00-15:00)' },    // Position 0-8 = hours 7-15
        { shift: 'S2', start: 8, end: 16, label: 'S2 (15:00-23:00)' },   // Position 8-16 = hours 15-23
        { shift: 'S3', start: 16, end: 24, label: 'S3 (23:00-07:00)' },  // Position 16-24 = hours 23-7 next day
    ];

    // Time labels for display (07:00 to 06:00)
    const timeLabels = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6];

    useEffect(() => {
        const loadMachine = () => {
            const allMachines = DummyDataService.getMachines();
            const foundMachine = allMachines.find(m => m.machine_id === machineId);
            setMachine(foundMachine);
            setLoading(false);
        };

        loadMachine();
    }, [machineId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-400">Loading machine details...</p>
                </div>
            </div>
        );
    }

    if (!machine) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="text-center space-y-4">
                    <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto" />
                    <p className="text-gray-400">Machine not found</p>
                    <Button onClick={() => navigate(-1)}>Go Back</Button>
                </div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'running': return 'bg-green-500';
            case 'idle': return 'bg-yellow-500';
            case 'alarm': return 'bg-red-500';
            case 'disconnected': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusLabel = (status) => {
        return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold">MACHINE DETAIL</h1>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-400 hover:text-white"
                        >
                            <Home className="h-4 w-4" />
                            Back to Main Dashboard
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </Button>
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <User className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="p-6 space-y-6">
                {/* Top Section - 3 Column Layout */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column - Machine Description & Information */}
                    <div className="col-span-3 space-y-6">
                        {/* Machine Description */}
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-lg">Machine Description</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Machine Image Placeholder */}
                                <div className="bg-gray-700 rounded-lg h-40 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop"
                                        alt={machine.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Machine Name</span>
                                        <span className="font-semibold">{machine.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Asset No</span>
                                        <span className="font-semibold">{machine.machine_id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Acquisition Year</span>
                                        <span className="font-semibold">2023</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Machine Information */}
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-lg">Machine Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Status Machine</p>
                                        <Badge className={`${getStatusColor(machine.status)} text-white`}>
                                            {getStatusLabel(machine.status)}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Parameter IN R</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Cycle Time</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Parameter IN L</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Type Selection</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Parameter EX H</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Mode Selection</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Parameter EX L</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">PLC Battery</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Offset IN R</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Counter</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Offset IN L</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Alarm Code</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Offset EX R</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div></div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Offset EX L</p>
                                        <p className="text-sm">-</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Center Column - Detail Charts */}
                    <div className="col-span-6 space-y-6">
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">DETAIL CHART</CardTitle>
                                    <Select value={timeRange} onValueChange={setTimeRange}>
                                        <SelectTrigger className="w-32 bg-gray-700 border-gray-600">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                {/* MTTR Chart */}
                                <div>
                                    <h3 className="text-sm font-semibold mb-3">MTTR</h3>
                                    <ResponsiveContainer width="100%" height={280}>
                                        <BarChart data={mttrData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                            <XAxis dataKey="day" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                            <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                                                labelStyle={{ color: '#fff' }}
                                            />
                                            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* MTBF Chart */}
                                <div>
                                    <h3 className="text-sm font-semibold mb-3">MTBF</h3>
                                    <ResponsiveContainer width="100%" height={280}>
                                        <BarChart data={mtbfData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                            <XAxis dataKey="day" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                            <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                                                labelStyle={{ color: '#fff' }}
                                            />
                                            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Performance & Maintenance */}
                    <div className="col-span-3 space-y-6">
                        {/* Machine Performance */}
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-lg">Machine Performance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={performanceData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {performanceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                                {/* Legend */}
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    {performanceData.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span className="text-xs text-gray-400">{item.name}</span>
                                            <span className="text-xs font-semibold ml-auto">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Maintenance List */}
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-lg">Maintenance List</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-auto max-h-96">
                                    <table className="w-full">
                                        <thead className="bg-gray-700 sticky top-0">
                                            <tr>
                                                <th className="px-3 py-2 text-left text-xs font-semibold">Datetime</th>
                                                <th className="px-3 py-2 text-left text-xs font-semibold">Problem</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            {maintenanceList.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-gray-700">
                                                    <td className="px-3 py-2 text-xs">{item.datetime}</td>
                                                    <td className="px-3 py-2 text-xs">{item.problem}</td>
                                                </tr>
                                            ))}
                                            {/* Empty rows for spacing */}
                                            {[...Array(10)].map((_, idx) => (
                                                <tr key={`empty-${idx}`} className="h-8">
                                                    <td className="px-3 py-2 text-xs text-gray-600">-</td>
                                                    <td className="px-3 py-2 text-xs text-gray-600">-</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Bottom Section - Full Width Gantt Chart */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">Gantt Chart - Daily Machine Status Timeline</CardTitle>
                                <CardDescription className="mt-1">
                                    24-hour monitoring from 07:00 (S1 Start) to 06:00 (S3 End) - Tracking all 3 work shifts
                                </CardDescription>
                            </div>
                            {/* Status Legend */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                                    <span className="text-xs text-gray-400">Running</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                                    <span className="text-xs text-gray-400">Idle</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                                    <span className="text-xs text-gray-400">Alarm</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-gray-500 rounded"></div>
                                    <span className="text-xs text-gray-400">Disconnected</span>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Shift Labels Above Timeline */}
                        <div className="mb-3 relative h-10 flex items-center">
                            {shiftMarkers.map((marker, idx) => {
                                const leftPercent = (marker.start / 24) * 100;
                                const widthPercent = ((marker.end - marker.start) / 24) * 100;
                                const bgColor =
                                    marker.shift === 'S1' ? 'bg-blue-700' :
                                        marker.shift === 'S2' ? 'bg-purple-700' :
                                            'bg-indigo-700';

                                return (
                                    <div
                                        key={idx}
                                        className="absolute top-0 h-full flex items-center justify-center border-x border-yellow-500/30"
                                        style={{
                                            left: `${leftPercent}%`,
                                            width: `${widthPercent}%`
                                        }}
                                    >
                                        <div className={`text-xs font-bold text-white ${bgColor} px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap border border-gray-600`}>
                                            {marker.shift}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Single Timeline Bar - 24 Hours (07:00 - 06:00) */}
                        <div className="relative h-16 bg-gray-700/50 rounded-lg border-2 border-gray-600 overflow-hidden">
                            {/* Shift Background Areas (subtle shading) */}
                            <div className="absolute inset-0 flex">
                                {/* S1 Area */}
                                <div className="h-full bg-blue-900/10" style={{ width: '33.33%' }}></div>
                                {/* S2 Area */}
                                <div className="h-full bg-purple-900/10" style={{ width: '33.33%' }}></div>
                                {/* S3 Area */}
                                <div className="h-full bg-indigo-900/10" style={{ width: '33.34%' }}></div>
                            </div>

                            {/* Shift Separator Lines at 15:00 and 23:00 */}
                            {[
                                { position: 8, time: '15:00', label: 'S1→S2' },  // S1 → S2
                                { position: 16, time: '23:00', label: 'S2→S3' }  // S2 → S3
                            ].map((sep, idx) => (
                                <div
                                    key={idx}
                                    className="absolute top-0 bottom-0 z-20"
                                    style={{ left: `${(sep.position / 24) * 100}%` }}
                                >
                                    {/* Vertical Line */}
                                    <div className="absolute top-0 bottom-0 w-1 bg-yellow-500 shadow-lg" style={{ left: '-2px' }}></div>

                                    {/* Label Badge - Inside the bar for better visibility */}
                                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-gray-900 text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-md z-30">
                                        {sep.label}
                                    </div>
                                </div>
                            ))}

                            {/* Status Blocks */}
                            {ganttBlocks.map((block, blockIdx) => {
                                // Calculate position: hour 7 = 0%, hour 30 = 100%
                                const leftPercent = ((block.hour - 7) / 24) * 100;
                                const widthPercent = (block.duration / 24) * 100;
                                const colorClass =
                                    block.status === 'running' ? 'bg-green-500 hover:bg-green-400' :
                                        block.status === 'idle' ? 'bg-yellow-500 hover:bg-yellow-400' :
                                            block.status === 'alarm' ? 'bg-red-500 hover:bg-red-400' :
                                                'bg-gray-500 hover:bg-gray-400';

                                // Format time for tooltip
                                const startHour = block.hour >= 24 ? block.hour - 24 : block.hour;
                                const endHour = (block.hour + block.duration) >= 24 ? (block.hour + block.duration - 24) : (block.hour + block.duration);

                                return (
                                    <div
                                        key={blockIdx}
                                        className={`absolute h-full ${colorClass} transition-all cursor-pointer flex items-center justify-center text-xs font-semibold text-white shadow-md`}
                                        style={{
                                            left: `${leftPercent}%`,
                                            width: `${widthPercent}%`
                                        }}
                                        title={`${block.status.toUpperCase()} - ${block.duration}h (${String(startHour).padStart(2, '0')}:00 - ${String(endHour).padStart(2, '0')}:00)`}
                                    >
                                        {widthPercent > 4 && `${block.duration}h`}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Time Scale Labels (07:00 to 06:00) */}
                        <div className="flex justify-between mt-4 text-xs font-mono">
                            {timeLabels.map((hour, idx) => {
                                // Highlight shift change times (15:00 and 23:00)
                                const isShiftChange = hour === 15 || hour === 23;
                                const isEvenHour = idx % 2 === 0;

                                return (
                                    <div key={idx} className="flex flex-col items-center" style={{ width: '4.166%' }}>
                                        {isEvenHour && (
                                            <>
                                                <div className={`h-2 w-px mb-1 ${isShiftChange ? 'bg-yellow-500' : 'bg-gray-600'}`}></div>
                                                <span className={isShiftChange ? 'text-yellow-400 font-bold' : 'text-gray-500'}>
                                                    {String(hour).padStart(2, '0')}:00
                                                </span>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Summary Stats */}
                        <div className="mt-6 pt-4 border-t border-gray-700 grid grid-cols-4 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-400">
                                    {ganttBlocks.filter(b => b.status === 'running').reduce((sum, b) => sum + b.duration, 0)}h
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Total Running Time</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-yellow-400">
                                    {ganttBlocks.filter(b => b.status === 'idle').reduce((sum, b) => sum + b.duration, 0)}h
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Total Idle Time</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-red-400">
                                    {ganttBlocks.filter(b => b.status === 'alarm').reduce((sum, b) => sum + b.duration, 0)}h
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Total Alarm Time</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-400">
                                    {ganttBlocks.filter(b => b.status === 'disconnected').reduce((sum, b) => sum + b.duration, 0)}h
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Total Downtime</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 border-t border-gray-700 px-6 py-3 mt-6">
                <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">© Copyright 2025. Cipta Laju Kharisma</p>
                    <p className="text-xs text-gray-400">Friday, 03 October 2025 - 06:00</p>
                </div>
            </footer>
        </div>
    );
};

export default MachineDetailPage;

