import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const OEEDonutChart = ({ dataItem, variant = 'compact' }) => {
    // variant: 'compact' (Dashboard 1) or 'expanded' (Dashboard 2)

    // Extract data from dataItem (from data source)
    const availability = dataItem?.fileData?.availability || 88;
    const performance = dataItem?.fileData?.performance || 90;
    const quality = dataItem?.fileData?.quality || 85;
    const cycleTime = dataItem?.fileData?.cycle_time || 21.4;
    const partOK = dataItem?.fileData?.part_ok || 1100;
    const partNG = dataItem?.fileData?.part_ng || 4;

    // Calculate total OEE (Availability × Performance × Quality)
    const totalOEE = Math.round((availability * performance * quality) / 10000);

    // Data for the donut chart - ensure values are valid numbers
    const data = [
        { name: 'Availability', value: Number(availability) || 0, color: '#10B981' },
        { name: 'Performance', value: Number(performance) || 0, color: '#F59E0B' },
        { name: 'Quality', value: Number(quality) || 0, color: '#EF4444' }
    ];

    // Variant-specific styling
    const isExpanded = variant === 'expanded';

    // Use numeric values for inner/outer radius (not percentages)
    const chartSize = isExpanded
        ? { inner: 80, outer: 120 }
        : { inner: 60, outer: 100 };

    const centerTextSize = isExpanded ? "text-5xl" : "text-4xl";
    const metricTextSize = isExpanded ? "text-lg" : "text-base";
    const labelTextSize = isExpanded ? "text-xs" : "text-[10px]";

    return (
        <div className={`oee-donut-container w-full h-full flex ${isExpanded ? 'flex-row items-center' : 'flex-col'} p-4 gap-4 min-h-[300px]`}>
            {/* Donut Chart */}
            <div className={`${isExpanded ? 'w-[55%] h-full' : 'flex-1 min-h-[220px]'} relative`}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={chartSize.inner}
                            outerRadius={chartSize.outer}
                            dataKey="value"
                            startAngle={90}
                            endAngle={450}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className={`${centerTextSize} font-bold text-white`}>{totalOEE}%</div>
                        <div className={`${labelTextSize} text-gray-400`}>OEE</div>
                    </div>
                </div>
            </div>

            {/* Metrics Section */}
            <div className={`${isExpanded ? 'w-[45%] flex flex-col justify-center' : 'flex-shrink-0'} space-y-3`}>
                {/* OEE Metrics Breakdown */}
                <div className={`grid ${isExpanded ? 'grid-cols-1' : 'grid-cols-3'} gap-2`}>
                    <div className={`${isExpanded ? 'flex items-center gap-3' : 'text-center'}`}>
                        <div className="flex items-center justify-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <div className={`${labelTextSize} text-gray-400`}>Availability</div>
                        </div>
                        <div className={`${metricTextSize} font-semibold text-green-400 ${isExpanded ? 'ml-auto' : ''}`}>{availability}%</div>
                    </div>

                    <div className={`${isExpanded ? 'flex items-center gap-3' : 'text-center'}`}>
                        <div className="flex items-center justify-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div className={`${labelTextSize} text-gray-400`}>Performance</div>
                        </div>
                        <div className={`${metricTextSize} font-semibold text-yellow-400 ${isExpanded ? 'ml-auto' : ''}`}>{performance}%</div>
                    </div>

                    <div className={`${isExpanded ? 'flex items-center gap-3' : 'text-center'}`}>
                        <div className="flex items-center justify-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className={`${labelTextSize} text-gray-400`}>Quality</div>
                        </div>
                        <div className={`${metricTextSize} font-semibold text-red-400 ${isExpanded ? 'ml-auto' : ''}`}>{quality}%</div>
                    </div>
                </div>

                {/* Production Metrics */}
                {!isExpanded && (
                    <div className="pt-2 border-t border-gray-700 grid grid-cols-3 gap-2">
                        <div className="text-center">
                            <div className="text-[10px] text-gray-400 mb-0.5">Cycle Time</div>
                            <div className="text-base font-semibold text-blue-400">{cycleTime}</div>
                            <div className="text-[9px] text-gray-500">Sec</div>
                        </div>

                        <div className="text-center">
                            <div className="text-[10px] text-gray-400 mb-0.5">Part OK</div>
                            <div className="text-base font-semibold text-green-400">{partOK}</div>
                            <div className="text-[9px] text-gray-500">Part</div>
                        </div>

                        <div className="text-center">
                            <div className="text-[10px] text-gray-400 mb-0.5">Part NG</div>
                            <div className="text-base font-semibold text-red-400">{partNG}</div>
                            <div className="text-[9px] text-gray-500">Part</div>
                        </div>
                    </div>
                )}

                {/* Production Metrics - Expanded Layout */}
                {isExpanded && (
                    <div className="pt-3 mt-3 border-t border-gray-700 space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-400">Cycle Time Line</div>
                            <div className="text-lg font-semibold text-blue-400">{cycleTime} <span className="text-xs text-gray-500">Sec</span></div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-400">Part OK</div>
                            <div className="text-lg font-semibold text-green-400">{partOK} <span className="text-xs text-gray-500">Part</span></div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-400">Part NG</div>
                            <div className="text-lg font-semibold text-red-400">{partNG} <span className="text-xs text-gray-500">Part</span></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OEEDonutChart;
