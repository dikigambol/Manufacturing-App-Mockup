import { useContext, useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { SourceContext } from "@/contexts/source"
import { Pie, PieChart, ResponsiveContainer } from "recharts"

const colors = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
  "#FF9F40", "#00A36C", "#C71585", "#4682B4", "#FFD700"
]

export default function AppChartPieStacked(props) {
  const { getById } = useContext(SourceContext)
  const [datas, setDatas] = useState([])
  const [activeKeys, setActiveKeys] = useState([])
  const [chartConfig, setChartConfig] = useState({})
  const [chartSeries, setChartSeries] = useState([])

  function groupDataByXData(data, groupByKey, sumKeys) {
    if (!data || data.length === 0) return []
    const grouped = data.reduce((acc, curr) => {
      const groupKey = curr[groupByKey]
      if (!acc[groupKey]) {
        acc[groupKey] = { [groupByKey]: groupKey }
        sumKeys.forEach((key) => acc[groupKey][key] = 0)
      }
      sumKeys.forEach((key) => {
        const val = Number(curr[key])
        acc[groupKey][key] += isNaN(val) ? 0 : val
      })
      return acc
    }, {})
    return Object.values(grouped)
  }

  useEffect(() => {
    const data = getById(props.id_resource_data)
    const yKeys = props.yData?.map(y => y.value) || []
    const grouped = groupDataByXData(data.fileData, props?.x_data, yKeys)
    setDatas(grouped)
    setActiveKeys(yKeys)

    const cfg = {}
    props.yData?.forEach((y) => {
      cfg[y.value] = { label: y.label }
    })
    grouped.forEach((item, idx) => {
      cfg[item[props?.x_data]] = {
        label: item[props?.x_data],
        color: colors[idx % colors.length]
      }
    })
    setChartConfig(cfg)
  }, [props.id_resource_data, props.yData, props?.x_data])

  useEffect(() => {
    if (datas.length > 0 && activeKeys.length > 0) {
      const series = activeKeys.map((key) => {
        return datas.map(item => ({
          name: item[props?.x_data],
          [key]: item[key],
          yLabel: chartConfig[key]?.label || key,
          fill: chartConfig[item[props?.x_data]]?.color
        }))
      })
      setChartSeries(series)
    }
  }, [datas, activeKeys, chartConfig, props?.x_data])

  const toggleKey = (key) => {
    setActiveKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  return (
    datas.length > 0 && (
      <>
        {/* Filter Badge */}
        <div className="flex items-center gap-1 px-2 flex-wrap mb-3">
          {props.yData?.map(y => (
            <Badge
              key={y.value}
              role="button"
              className="cursor-pointer"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => toggleKey(y.value)}
              variant={activeKeys.includes(y.value) ? "default" : "secondary"}
            >
              {y.label}
            </Badge>
          ))}
        </div>
        <ChartContainer config={chartConfig} className="w-full h-full p-0 m-0">
          <ResponsiveContainer width="100%" height="100%" style={{ paddingBottom: '20px' }}>
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(_, payload) => {
                      if (payload && payload.length > 0) {
                        const p = payload[0].payload
                        return `${p.yLabel} - ${p.name}`
                      }
                      return ""
                    }}
                    valueFormatter={(value) => value?.toLocaleString()}
                  />
                }
              />
              {props.yData.length === 1 ? (
                <Pie
                  data={chartSeries[0]}
                  dataKey={activeKeys[0]}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius="100%"
                />
              ) : (
                chartSeries.map((seriesData, idx) => (
                  <Pie
                    key={idx}
                    data={seriesData}
                    dataKey={activeKeys[idx]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60 + idx * 30}
                    outerRadius={80 + idx * 30}
                  />
                ))
              )}
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </>
    )
  )
}