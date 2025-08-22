import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LayoutContext } from "@/contexts/interact";
import { SourceContext } from "@/contexts/source";
import { colors } from "@/utils/constant";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
		const data = getById(props.id_resource_data);
		const yKeys = props.yData?.map((y) => y.value) || [];
		const grouped = groupDataByXData(data.fileData, props?.x_data, yKeys);
		setData(grouped);

		setActiveKeys(yKeys);

		const cfg = {};
		yKeys.forEach((key, idx) => {
			const randomColor = colors[Math.floor(Math.random() * colors.length)];
			cfg[key] = {
				label: props.yData[idx]?.label || key,
				color: randomColor,
			};
		});
		setConfig(cfg);
	}, [props.id_resource_data, props.yData, props.x_data]);

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
					className="aspect-auto w-full h-full chartbar"
					ref={chartbar}
				>
					<BarChart accessibilityLayer data={datas}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey={props?.x_data}
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<ChartTooltip content={<ChartTooltipContent className="max-w" />} />

						{activeKeys.map((yKey, index) => (
							<Bar
								key={yKey}
								dataKey={yKey}
								fill={config[yKey]?.color || colors[index % colors.length]}
								barSize={40}
							/>
						))}
					</BarChart>
				</ChartContainer>
			</>
		)
	);
}

export default AppChartBar;
