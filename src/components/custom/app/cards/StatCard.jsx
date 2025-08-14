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

  console.log(props)

  const chartData = [
    { visitors: props?.dataItem.fileData[props?.data_2], fill: "#4966dcff" },
  ];

  const target = props?.dataItem.fileData[props?.data_1];
  const angleConvert = (chartData[0].visitors / target) * 360
  return (
    <div className="px-3 w-[250px]">
      {/* Bagian KPI Target & Actual */}
      <div className="flex justify-between">
        <div>
          <p className="text-xs text-gray-500">{props?.title_1}</p>
          <p className="text-sm font-semibold">{props?.dataItem.fileData[props?.data_1]}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">{props?.title_2}</p>
          <p className="text-sm font-semibold">{props?.dataItem.fileData[props?.data_2]}</p>
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
                          {chartData[0].visitors.toLocaleString()}
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
