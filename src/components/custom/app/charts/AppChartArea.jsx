import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from "@/components/ui/chart";
import { LayoutContext } from "@/contexts/interact";
import { SourceContext } from "@/contexts/source";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { colors } from "@/utils/constant";

// Fungsi untuk mencerahkan/menggelapkan warna HEX
function darkenColor(hex, amount) {
	try {
		return (
			"#" +
			hex
				.replace(/^#/, "")
				.replace(/../g, (color) =>
					(
						"0" +
						Math.min(255, Math.max(0, parseInt(color, 16) - amount)).toString(16)
					).slice(-2)
				)
		);
	} catch {
		return hex; // fallback kalau error
	}
}

function AppChartArea({ ...props }) {
	const { layout } = useContext(LayoutContext);
	const { getById } = useContext(SourceContext);

	const [activeKeys, setActiveKeys] = useState([]);
	const [config, setConfig] = useState({});
	const [datas, setData] = useState([]);
	const chartarea = useRef();
	const chart = chartarea.current;
	const perent = chart?.parentElement;

	// auto height
	const autoHeight = () => {
		if (perent) {
			chart.style.maxHeight = `${perent?.clientHeight - 76}px`;
		}
	};

	useMemo(() => {
		autoHeight();
	}, [layout]);

	// Grouping data berdasarkan x_data
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

	// Ambil data dari SourceContext
	useEffect(() => {
		const data = getById(props.id_resource_data);
		const yKeys = props.yData?.map((y) => y.value) || [];
		const grouped = groupDataByXData(data.fileData, props?.x_data, yKeys);
		setData(grouped);

		// default pilih semua yData
		setActiveKeys(yKeys);

		// set config warna
		const cfg = {};
		yKeys.forEach((key, idx) => {
			cfg[key] = {
				label: props.yData[idx]?.label || key,
				color: colors[idx % colors.length]
			};
		});
		setConfig(cfg);
	}, [props.id_resource_data, props.yData, props.x_data]);

	autoHeight();

	// Toggle pilihan yData
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
						return (
							<Badge
								key={yKey}
								role="button"
								className="cursor-pointer"
								onMouseDown={(e) => e.stopPropagation()}
								onClick={() => toggleKey(yKey)}
								variant={activeKeys.includes(yKey) ? "default" : "secondary"}
							>
								{y.label}
							</Badge>
						);
					})}
				</div>

				{/* Chart */}
				<ChartContainer
					config={config}
					className="aspect-auto w-full h-full"
					ref={chartarea}
				>
					<AreaChart accessibilityLayer data={datas}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey={props?.x_data}
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent indicator="line" className="w-max" />
							}
						/>

						{activeKeys.map((yKey, index) => (
							<Area
								key={yKey}
								dataKey={yKey}
								type="natural"
								fill={config[yKey]?.color || colors[index % colors.length]}
								fillOpacity={0.4}
								stroke={darkenColor(
									config[yKey]?.color || colors[index % colors.length],
									40
								)}
								strokeWidth={2}
							/>
						))}
					</AreaChart>
				</ChartContainer>
			</>
		)
	);
}

export default AppChartArea;
