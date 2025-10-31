import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LayoutContext } from "@/contexts/interact";
import { SourceContext } from "@/contexts/source";
import { colors } from "@/utils/constant";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from "recharts";

function AppChartBar({ ...props }) {
	const { layout } = useContext(LayoutContext);
	const { getById } = useContext(SourceContext);

	const [activeKeys, setActiveKeys] = useState([]);
	const [config, setConfig] = useState({});
	const [datas, setData] = useState([]);
	const chartbar = useRef();
	const chart = chartbar.current;
	const perent = chart?.parentElement;

	const autoHeight = () => {
		if (perent) {
			chart.style.maxHeight = `${perent?.clientHeight - 76}px`;
		}
	};

	useMemo(() => {
		autoHeight();
	}, [layout]);

	function groupDataByXData(data, groupByKey, sumKeys) {
		if (!data || data.length === 0) return [];

		const grouped = data.reduce((acc, curr) => {
			const groupKey = curr[groupByKey];
			if (!acc[groupKey]) {
				acc[groupKey] = { [groupByKey]: groupKey };
				sumKeys.forEach((key) => {
					acc[groupKey][key] = 0;
				});
			}
			sumKeys.forEach((key) => {
				const val = Number(curr[key]);
				acc[groupKey][key] += isNaN(val) ? 0 : val;
			});
			return acc;
		}, {});

		return Object.values(grouped);
	}

	useEffect(() => {
		// Get data based on time period
		let data;
		const timePeriod = props.time_period || 'monthly';

		if (timePeriod === 'quarterly') {
			// Try to get quarterly data, fallback to monthly
			const quarterlyData = getById(props.id_resource_data + 0.1);
			data = quarterlyData || getById(props.id_resource_data);
		} else if (timePeriod === 'yearly') {
			// Try to get yearly data, fallback to monthly
			const yearlyData = getById(props.id_resource_data + 0.2);
			data = yearlyData || getById(props.id_resource_data);
		} else {
			// Default to monthly
			data = getById(props.id_resource_data);
		}

		const yKeys = props.yData?.map((y) => y.value) || [];

		// Include threshold line values in grouping if they exist
		const thresholdKeys = props.threshold_lines?.map((t) => t.value) || [];
		const allKeys = [...yKeys, ...thresholdKeys];

		const grouped = groupDataByXData(data.fileData, props?.x_data, allKeys);
		setData(grouped);

		setActiveKeys(yKeys);

		const cfg = {};
		yKeys.forEach((key, idx) => {
			// Use custom color from props if available, otherwise use smart color assignment
			let color;
			if (props.yData[idx]?.color) {
				color = props.yData[idx].color; // Use custom color from props
			} else if (props.title?.toLowerCase().includes('downtime')) {
				color = '#EF4444'; // Red for downtime
			} else if (key === 'target') {
				color = '#60A5FA'; // Blue for target
			} else if (key === 'actual') {
				color = '#34D399'; // Green for actual
			} else if (props.title?.toLowerCase().includes('electric') || key === 'consumption') {
				color = '#FBBF24'; // Yellow/Orange for electric
			} else {
				color = colors[idx % colors.length];
			}

			cfg[key] = {
				label: props.yData[idx]?.label || key,
				color: color,
			};
		});

		// Add threshold line configurations
		props.threshold_lines?.forEach((threshold) => {
			cfg[threshold.value] = {
				label: threshold.label,
				color: threshold.color,
				lineStyle: threshold.lineStyle || 'solid',
			};
		});

		setConfig(cfg);
	}, [props.id_resource_data, props.yData, props.x_data, props.title, props.time_period, props.threshold_lines]);

	autoHeight();

	const toggleKey = (key) => {
		setActiveKeys((prev) =>
			prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
		);
	};

	return (
		datas.length > 0 && (
			<>
				{/* Badge Filter */}
				<div className="flex items-center mb-3 px-2 flex-wrap gap-1">
					{props.yData?.map((y) => {
						const yKey = y.value;
						const isActive = activeKeys.includes(yKey);
						const color = config[yKey]?.color || colors[props.yData.indexOf(y) % colors.length];

						return (
							<Badge
								key={yKey}
								role="button"
								className="cursor-pointer flex items-center gap-2"
								onMouseDown={(e) => e.stopPropagation()}
								onClick={() => toggleKey(yKey)}
								variant={isActive ? "default" : "secondary"}
							>
								{/* Color Indicator */}
								<div
									className="w-3 h-3 rounded-full border border-gray-300"
									style={{ backgroundColor: color }}
								/>
								{y.label}
							</Badge>
						);
					})}
				</div>

				{/* Chart */}
				<ChartContainer
					config={config}
					className="aspect-auto w-full h-full chartbar"
					ref={chartbar}
				>
					<BarChart
						accessibilityLayer
						data={datas}
						margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
					>
						<CartesianGrid
							vertical={false}
							strokeDasharray="3 3"
							stroke="#374151"
							opacity={0.3}
						/>
						<XAxis
							dataKey={props?.x_data}
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tick={{ fill: '#9CA3AF', fontSize: 12 }}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tick={{ fill: '#9CA3AF', fontSize: 12 }}
							domain={props.threshold_lines ? [0, 30] : [0, 'dataMax + 5']}
						/>
						<ChartTooltip
							content={<ChartTooltipContent className="max-w" />}
							cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
						/>

						{activeKeys.map((yKey, index) => (
							<Bar
								key={yKey}
								dataKey={yKey}
								fill={config[yKey]?.color || colors[index % colors.length]}
								radius={[4, 4, 0, 0]}
								barSize={activeKeys.length > 1 ? 16 : 20}
							/>
						))}

						{/* Threshold Lines */}
						{props.threshold_lines?.map((threshold, index) => {
							// Priority: 1. Direct value from config, 2. Value from data
							let thresholdValue = null;

							// Check if threshold has a direct numeric value (from widget config)
							if (typeof threshold.value === 'number' || (typeof threshold.value === 'string' && !isNaN(threshold.value))) {
								thresholdValue = parseFloat(threshold.value);
							} else {
								// Fallback: get the threshold value from any data point that has this threshold
								for (const dataPoint of datas) {
									if (dataPoint[threshold.value] !== undefined && dataPoint[threshold.value] !== null) {
										thresholdValue = dataPoint[threshold.value];
										break;
									}
								}
							}

							return thresholdValue !== null && thresholdValue !== undefined ? (
								<ReferenceLine
									key={`threshold-${index}`}
									y={thresholdValue}
									stroke={threshold.color}
									strokeDasharray={threshold.lineStyle === 'dashed' ? '5 5' : '0'}
									strokeWidth={2}
									label={{
										value: threshold.label,
										position: 'topRight',
										style: { fill: threshold.color, fontSize: '12px' }
									}}
								/>
							) : null;
						})}
					</BarChart>
				</ChartContainer>
			</>
		)
	);
}

export default AppChartBar;
