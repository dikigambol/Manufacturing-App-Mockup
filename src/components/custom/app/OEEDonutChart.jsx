import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const OEEDonutChart = ({ dataItem }) => {
    // Extract data from dataItem (from data source)
    const availability = dataItem?.fileData?.availability || 88;
    const performance = dataItem?.fileData?.performance || 90;
    const quality = dataItem?.fileData?.quality || 85;
    const cycleTime = dataItem?.fileData?.cycle_time || 21.4;
    const partOK = dataItem?.fileData?.part_ok || 1100;
    const partNG = dataItem?.fileData?.part_ng || 4;

    // Calculate total OEE (Availability × Performance × Quality)
    const totalOEE = Math.round((availability * performance * quality) / 10000);

    // Data for the donut chart
    const data = [
        { name: 'Availability', value: availability, color: '#10B981' },
        { name: 'Performance', value: performance, color: '#F59E0B' },
        { name: 'Quality', value: quality, color: '#EF4444' }
    ];

    return (
        <div className="oee-donut-container w-full h-full flex flex-col p-2">
            {/* Donut Chart */}
            <div className="flex-1 relative min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="60%"
                            outerRadius="85%"
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
                        <div className="text-4xl font-bold text-white">{totalOEE}%</div>
                        <div className="text-xs text-gray-400">OEE</div>
                    </div>
                </div>
            </div>

            {/* OEE Metrics Breakdown - Grid Format */}
            <div className="mt-2 grid grid-cols-3 gap-2 flex-shrink-0">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <div className="text-[10px] text-gray-400">Availability</div>
                    </div>
                    <div className="text-base font-semibold text-green-400">{availability}%</div>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                        <div className="text-[10px] text-gray-400">Performance</div>
                    </div>
                    <div className="text-base font-semibold text-yellow-400">{performance}%</div>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                        <div className="text-[10px] text-gray-400">Quality</div>
                    </div>
                    <div className="text-base font-semibold text-red-400">{quality}%</div>
                </div>
            </div>

            {/* Production Metrics */}
            <div className="mt-2 pt-2 border-t border-gray-700 grid grid-cols-3 gap-2 flex-shrink-0">
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
        </div>
    );
};

export default OEEDonutChart;

