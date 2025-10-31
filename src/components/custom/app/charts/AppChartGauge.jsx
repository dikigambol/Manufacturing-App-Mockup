import React from "react";
import GaugeComponent from "react-gauge-component";

export default function AppChartGauge(props) {
    let valueOfKPI = 0;
    const SAFE_MIN_GAUGE = 66;

    if (props?.value_kpi && props?.dataItem) {
        valueOfKPI = props?.dataItem.fileData[props?.value_kpi]
    }
    return (
        <>
            <GaugeComponent
                value={valueOfKPI}
                maxValue={Math.max(props?.max_rate || SAFE_MIN_GAUGE, SAFE_MIN_GAUGE)}
                type="radial"
                // className="w-full h-full text-indigo-700"
                // style={{
                //     '--text': 'red', // warna teks
                // }}
            />
        </>
    );
}
