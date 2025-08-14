import React from "react";
import GaugeComponent from "react-gauge-component";

export default function AppChartGauge(props) {
    let valueOfKPI = 0;
    if (props?.value_kpi && props?.dataItem) {
        valueOfKPI = props?.dataItem.fileData[props?.value_kpi]
    }
    console.log(props?.dataItem.fileData)
    return (
        <GaugeComponent
            value={valueOfKPI}
            maxValue={props?.max_rate}
            type="radial"
        />
    );
}
