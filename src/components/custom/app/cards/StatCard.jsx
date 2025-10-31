import React from 'react'
import {
  Label as RechartLabel,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

export default function StatCard({ ...props }) {
  // Safely extract data with fallbacks
  const data1 = props?.dataItem?.fileData?.[props?.data_1] || 0;
  const data2 = props?.dataItem?.fileData?.[props?.data_2] || 0;

  const chartData = [
    { visitors: Number(data2) || 0, fill: "#4966dcff" },
  ];

  const target = Number(data1) || 1; // Avoid division by zero
  const angleConvert = target > 0 ? (chartData[0].visitors / target) * 360 : 0;

  return (
    <div className="px-3 ">
      {/* Bagian KPI Target & Actual */}
      <div className="flex justify-between">
        <div>
          <p className="text-xs text-gray-500">{props?.title_1 || 'Total'}</p>
          <p className="text-sm font-semibold">{data1}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">{props?.title_2 || 'Value'}</p>
          <p className="text-sm font-semibold">{data2}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="flex justify-center">
        <ChartContainer
          config={{}}
          className="p-0 w-[150px] h-[150px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={angleConvert}
            innerRadius={60}
            outerRadius={80}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[66, 54]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <RechartLabel
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {(chartData[0].visitors || 0).toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </div>
    </div>
  )
}
