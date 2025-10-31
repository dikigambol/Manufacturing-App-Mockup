export const colors = [
  "#4CAF50", // hijau safety
  "#2196F3", // biru kontras
  "#FFC107", // kuning terang
  "#F44336", // merah warning
  "#9C27B0", // ungu kontras
  "#FF9800", // oranye tegas
  "#009688", // teal industrial
  "#E91E63", // magenta/rose
  "#795548", // coklat industrial
  "#3F51B5", // biru navy kontras
  "#CDDC39", // lime hijau neon
  "#00BCD4", // cyan terang
  "#607D8B", // abu kebiruan industrial
  "#8BC34A", // hijau segar
  "#FF5722", // oranye kemerahan
];

export const default_dash = [
  {
    "id_dash": 1,
    "component": [
      {
        "label": "Widget",
        "i": "sQOWZh",
        "props": {
          "title": "OEE Test",
          "chart_type": "gauge",
          "id_resource_data": 1755265050554,
          "x_data": [],
          "yData": [],
          "value_kpi": "total_oee",
          "max_rate": "100"
        }
      },
      {
        "label": "Card",
        "i": "pGqvSV",
        "props": {
          "title": "Target Test",
          "chart_type": "gauge",
          "id_resource_data": 1755265864644,
          "x_data": [],
          "yData": [],
          "value_kpi": "value",
          "max_rate": "100",
          "card_type": "kpi",
          "subtitle_kpi": "subtitle",
          "percentage_kpi": "percentage",
          "data_1": "",
          "title_1": "",
          "data_2": "",
          "title_2": ""
        }
      },
      {
        "label": "Widget",
        "i": "kVrGBr",
        "props": {
          "title": "Versus Test",
          "chart_type": "bar",
          "id_resource_data": 1755265080795,
          "x_data": "tanggal",
          "yData": [
            {
              "label": "produksi",
              "value": "produksi"
            },
            {
              "label": "reject",
              "value": "reject"
            }
          ],
          "value_kpi": "",
          "max_rate": ""
        }
      },
      {
        "label": "Widget",
        "i": "SKeIaE",
        "props": {
          "title": "Cycle Time Test",
          "chart_type": "area",
          "id_resource_data": 1755265039617,
          "x_data": "hour",
          "yData": [
            {
              "label": "cycle_time",
              "value": "cycle_time"
            }
          ],
          "value_kpi": "",
          "max_rate": ""
        }
      },
      {
        "label": "Card",
        "i": "KeJXxt",
        "props": {
          "title": "Stat Test",
          "chart_type": "area",
          "id_resource_data": 1755265095961,
          "x_data": "hour",
          "yData": [
            {
              "label": "cycle_time",
              "value": "cycle_time"
            }
          ],
          "value_kpi": [],
          "max_rate": "",
          "card_type": "stat",
          "subtitle_kpi": [],
          "percentage_kpi": "",
          "data_1": "target_unit",
          "title_1": "Target",
          "data_2": "actual_unit",
          "title_2": "Actual"
        }
      },
      {
        "label": "Datatable",
        "i": "CSSlyk",
        "props": {
          "title": "Datatable Test",
          "chart_type": "area",
          "id_resource_data": 1755266250978,
          "x_data": "hour",
          "yData": [
            {
              "label": "cycle_time",
              "value": "cycle_time"
            }
          ],
          "value_kpi": [],
          "max_rate": "",
          "card_type": "stat",
          "subtitle_kpi": [],
          "percentage_kpi": "",
          "data_1": "target_unit",
          "title_1": "Target",
          "data_2": "actual_unit",
          "title_2": "Actual",
          "displayed_fields": [
            {
              "label": "item",
              "value": "item"
            },
            {
              "label": "status",
              "value": "status"
            }
          ]
        }
      },
      {
        "label": "Widget",
        "i": "RWptxj",
        "props": {
          "title": "Pie Test",
          "chart_type": "pie",
          "id_resource_data": 1755265080795,
          "x_data": "tanggal",
          "yData": [
            {
              "label": "produksi",
              "value": "produksi"
            },
            {
              "label": "reject",
              "value": "reject"
            }
          ],
          "value_kpi": "",
          "max_rate": "",
          "card_type": "stat",
          "subtitle_kpi": [],
          "percentage_kpi": "",
          "data_1": "target_unit",
          "title_1": "Target",
          "data_2": "actual_unit",
          "title_2": "Actual",
          "displayed_fields": [
            {
              "label": "item",
              "value": "item"
            },
            {
              "label": "status",
              "value": "status"
            }
          ]
        }
      }
    ],
    "layout": [
      {
        "w": 10,
        "h": 21,
        "x": 0,
        "y": 0,
        "i": "sQOWZh",
        "static": false
      },
      {
        "w": 10,
        "h": 8,
        "x": 10,
        "y": 0,
        "i": "pGqvSV",
        "static": false
      },
      {
        "w": 10,
        "h": 13,
        "x": 10,
        "y": 8,
        "i": "kVrGBr",
        "static": false
      },
      {
        "w": 18,
        "h": 21,
        "x": 20,
        "y": 0,
        "i": "SKeIaE",
        "static": false
      },
      {
        "w": 10,
        "h": 21,
        "x": 38,
        "y": 0,
        "i": "KeJXxt",
        "static": false
      },
      {
        "w": 16,
        "h": 22,
        "x": 0,
        "y": 21,
        "i": "CSSlyk",
        "static": false
      },
      {
        "w": 13,
        "h": 22,
        "x": 16,
        "y": 21,
        "i": "RWptxj",
        "static": false
      }
    ]
  },
  {
    "id_dash": 2,
    "component": [
      {
        "label": "Widget",
        "i": "CrOtPL",
        "props": {
          "title": "OEE (Overall Equipment Effectiveness)",
          "chart_type": "donut",
          "id_resource_data": 1755265050554
        }
      },
      {
        "label": "Widget",
        "i": "MachLayout",
        "props": {
          "title": "LAYOUT ENGINE ASSEMBLY - LINE 1",
          "chart_type": "machine_layout",
          "id_resource_data": 1755270000001
        }
      },
      {
        "label": "Widget",
        "i": "CalendarMain",
        "props": {
          "title": "Production Calendar",
          "chart_type": "calendar",
          "id_resource_data": 1755270000002
        }
      },
      {
        "label": "Widget",
        "i": "DowntimeChart",
        "props": {
          "title": "Downtime (minutes)",
          "chart_type": "bar",
          "id_resource_data": 1755270000003,
          "x_data": "month",
          "yData": [
            {
              "label": "downtime",
              "value": "downtime"
            }
          ]
        }
      },
      {
        "label": "Widget",
        "i": "TargetActualChart",
        "props": {
          "title": "Target vs Actual (units)",
          "chart_type": "bar",
          "id_resource_data": 1755270000004,
          "x_data": "month",
          "yData": [
            {
              "label": "target",
              "value": "target"
            },
            {
              "label": "actual",
              "value": "actual"
            }
          ]
        }
      },
      {
        "label": "Widget",
        "i": "ElectricChart",
        "props": {
          "title": "Electric Consumption (KWH)",
          "chart_type": "bar",
          "id_resource_data": 1755270000005,
          "x_data": "month",
          "yData": [
            {
              "label": "consumption",
              "value": "consumption"
            }
          ]
        }
      }
    ],
    "layout": [
      {
        "w": 10,
        "h": 25,
        "x": 0,
        "y": 0,
        "i": "CrOtPL",
        "static": false
      },
      {
        "w": 28,
        "h": 25,
        "x": 10,
        "y": 0,
        "i": "MachLayout",
        "static": false
      },
      {
        "w": 10,
        "h": 25,
        "x": 38,
        "y": 0,
        "i": "CalendarMain",
        "static": false
      },
      {
        "w": 16,
        "h": 20,
        "x": 0,
        "y": 25,
        "i": "DowntimeChart",
        "static": false
      },
      {
        "w": 16,
        "h": 20,
        "x": 16,
        "y": 25,
        "i": "TargetActualChart",
        "static": false
      },
      {
        "w": 16,
        "h": 20,
        "x": 32,
        "y": 25,
        "i": "ElectricChart",
        "static": false
      }
    ]
  },
  {
    "id_dash": 3,
    "component": [
      {
        "label": "Widget",
        "i": "line3_oee",
        "props": {
          "title": "OEE Monitoring",
          "chart_type": "gauge",
          "id_resource_data": 1755265050554,
          "x_data": [],
          "yData": [],
          "value_kpi": "total_oee",
          "max_rate": "100"
        }
      },
      {
        "label": "Card",
        "i": "line3_target",
        "props": {
          "title": "Production Target",
          "chart_type": "gauge",
          "id_resource_data": 1755265864644,
          "x_data": [],
          "yData": [],
          "value_kpi": "value",
          "max_rate": "100",
          "card_type": "kpi",
          "subtitle_kpi": "subtitle",
          "percentage_kpi": "percentage",
          "data_1": "",
          "title_1": "",
          "data_2": "",
          "title_2": ""
        }
      },
      {
        "label": "Widget",
        "i": "line3_prod",
        "props": {
          "title": "Production vs Reject",
          "chart_type": "bar",
          "id_resource_data": 1755265080795,
          "x_data": "tanggal",
          "yData": [
            {
              "label": "produksi",
              "value": "produksi"
            },
            {
              "label": "reject",
              "value": "reject"
            }
          ],
          "value_kpi": "",
          "max_rate": ""
        }
      },
      {
        "label": "Widget",
        "i": "line3_cycle",
        "props": {
          "title": "Cycle Time Trend",
          "chart_type": "area",
          "id_resource_data": 1755265039617,
          "x_data": "hour",
          "yData": [
            {
              "label": "cycle_time",
              "value": "cycle_time"
            }
          ],
          "value_kpi": "",
          "max_rate": ""
        }
      }
    ],
    "layout": [
      {
        "w": 12,
        "h": 20,
        "x": 0,
        "y": 0,
        "i": "line3_oee",
        "static": false
      },
      {
        "w": 12,
        "h": 10,
        "x": 12,
        "y": 0,
        "i": "line3_target",
        "static": false
      },
      {
        "w": 12,
        "h": 15,
        "x": 12,
        "y": 10,
        "i": "line3_prod",
        "static": false
      },
      {
        "w": 24,
        "h": 20,
        "x": 24,
        "y": 0,
        "i": "line3_cycle",
        "static": false
      }
    ]
  },
  {
    "id_dash": 4,
    "component": [],
    "layout": []
  },
  {
    "id_dash": 5,
    "component": [
      {
        "label": "Widget",
        "i": "L2_OEE_Donut",
        "props": {
          "title": "OEE (Overall Equipment Effectiveness)",
          "chart_type": "donut",
          "id_resource_data": 1755265050554,
          "variant": "expanded"
        }
      },
      {
        "label": "Widget",
        "i": "L2_MachLayout",
        "props": {
          "title": "LAYOUT ENGINE ASSEMBLY - LINE 2",
          "chart_type": "machine_layout",
          "id_resource_data": 1755270000006
        }
      },
      {
        "label": "Card",
        "i": "L2_CycleTime",
        "props": {
          "title": "Cycle Time Line",
          "chart_type": "gauge",
          "id_resource_data": 1755265050554,
          "card_type": "kpi",
          "value_kpi": "cycle_time",
          "subtitle_kpi": "Sec",
          "text_size": "large"
        }
      },
      {
        "label": "Card",
        "i": "L2_PartOK",
        "props": {
          "title": "Part OK",
          "chart_type": "gauge",
          "id_resource_data": 1755265050554,
          "card_type": "kpi",
          "value_kpi": "part_ok",
          "subtitle_kpi": "Part"
        }
      },
      {
        "label": "Card",
        "i": "L2_PartNG",
        "props": {
          "title": "Part NG",
          "chart_type": "gauge",
          "id_resource_data": 1755265050554,
          "card_type": "kpi",
          "value_kpi": "part_ng",
          "subtitle_kpi": "Part"
        }
      },
      {
        "label": "Card",
        "i": "L2_EngCall",
        "props": {
          "title": "Engineering Call",
          "card_type": "stat",
          "id_resource_data": 1755270000002,
          "data_1": "engineering_calls",
          "title_1": "Total Calls"
        }
      },
      {
        "label": "Card",
        "i": "L2_Maintenance",
        "props": {
          "title": "Maintenance",
          "card_type": "stat",
          "id_resource_data": 1755270000002,
          "data_1": "maintenance_calls",
          "title_1": "Total Calls"
        }
      },
      {
        "label": "Widget",
        "i": "L2_OFMChart",
        "props": {
          "title": "OFM",
          "chart_type": "bar",
          "id_resource_data": 1755270000007,
          "x_data": "month",
          "yData": [
            {
              "label": "OFM",
              "value": "ofm",
              "color": "#2196F3"
            }
          ]
        }
      },
      {
        "label": "Widget",
        "i": "L2_OFEChart",
        "props": {
          "title": "OFE",
          "chart_type": "bar",
          "id_resource_data": 1755270000008,
          "x_data": "month",
          "yData": [
            {
              "label": "OFE",
              "value": "ofe",
              "color": "#2196F3"
            }
          ]
        }
      },
      {
        "label": "Widget",
        "i": "L2_NRFCChart",
        "props": {
          "title": "NRFC",
          "chart_type": "bar",
          "id_resource_data": 1755270000009,
          "x_data": "month",
          "yData": [
            {
              "label": "NRFC",
              "value": "nrfc",
              "color": "#2196F3"
            }
          ]
        }
      },
      {
        "label": "Widget",
        "i": "L2_NRFWChart",
        "props": {
          "title": "NRFW",
          "chart_type": "bar",
          "id_resource_data": 1755270000010,
          "x_data": "month",
          "yData": [
            {
              "label": "NRFW",
              "value": "nrfw",
              "color": "#4CAF50"
            }
          ]
        }
      },
      {
        "label": "Widget",
        "i": "L2_NRDAEChart",
        "props": {
          "title": "NRDAE",
          "chart_type": "bar",
          "id_resource_data": 1755270000011,
          "x_data": "month",
          "yData": [
            {
              "label": "NRDAE",
              "value": "nrdae",
              "color": "#9C27B0"
            }
          ]
        }
      },
      {
        "label": "Widget",
        "i": "L2_PowerChart",
        "props": {
          "title": "Power",
          "chart_type": "bar",
          "id_resource_data": 1755270000012,
          "x_data": "month",
          "yData": [
            {
              "label": "Power",
              "value": "power",
              "color": "#FFC107"
            }
          ]
        }
      },
      {
        "label": "Widget",
        "i": "L2_ProductInfoChart",
        "props": {
          "title": "Product Information",
          "chart_type": "bar",
          "id_resource_data": 1755270000013,
          "x_data": "month",
          "yData": [
            {
              "label": "Production",
              "value": "production",
              "color": "#FF9800"
            }
          ],
          "threshold_lines": [
            {
              "label": "Upper Threshold",
              "value": "upper_threshold",
              "color": "#F44336",
              "lineStyle": "dashed"
            },
            {
              "label": "Lower Threshold",
              "value": "lower_threshold",
              "color": "#4CAF50",
              "lineStyle": "dashed"
            }
          ]
        }
      },
      {
        "label": "Widget",
        "i": "L2_TempVibChart",
        "props": {
          "title": "Temperature vs Vibration",
          "chart_type": "bar",
          "id_resource_data": 1755270000014,
          "x_data": "month",
          "yData": [
            {
              "label": "Temperature",
              "value": "temperature",
              "color": "#F44336"
            },
            {
              "label": "Vibration",
              "value": "vibration",
              "color": "#B71C1C"
            }
          ]
        }
      }
    ],
    "layout": [
      {
        "w": 18,
        "h": 15,
        "x": 0,
        "y": 0,
        "i": "L2_OEE_Donut",
        "static": false
      },
      {
        "w": 30,
        "h": 30,
        "x": 18,
        "y": 0,
        "i": "L2_MachLayout",
        "static": false
      },
      {
        "w": 9,
        "h": 15,
        "x": 0,
        "y": 15,
        "i": "L2_CycleTime",
        "static": false
      },
      {
        "w": 4,
        "h": 7,
        "x": 9,
        "y": 15,
        "i": "L2_PartOK",
        "static": false
      },
      {
        "w": 5,
        "h": 7,
        "x": 13,
        "y": 15,
        "i": "L2_PartNG",
        "static": false
      },
      {
        "w": 4,
        "h": 8,
        "x": 9,
        "y": 22,
        "i": "L2_EngCall",
        "static": false
      },
      {
        "w": 5,
        "h": 8,
        "x": 13,
        "y": 22,
        "i": "L2_Maintenance",
        "static": false
      },
      {
        "w": 12,
        "h": 15,
        "x": 0,
        "y": 30,
        "i": "L2_OFMChart",
        "static": false
      },
      {
        "w": 12,
        "h": 15,
        "x": 12,
        "y": 30,
        "i": "L2_OFEChart",
        "static": false
      },
      {
        "w": 12,
        "h": 15,
        "x": 24,
        "y": 30,
        "i": "L2_NRFCChart",
        "static": false
      },
      {
        "w": 12,
        "h": 15,
        "x": 36,
        "y": 30,
        "i": "L2_NRFWChart",
        "static": false
      },
      {
        "w": 12,
        "h": 15,
        "x": 0,
        "y": 45,
        "i": "L2_NRDAEChart",
        "static": false
      },
      {
        "w": 12,
        "h": 15,
        "x": 12,
        "y": 45,
        "i": "L2_PowerChart",
        "static": false
      },
      {
        "w": 12,
        "h": 15,
        "x": 24,
        "y": 45,
        "i": "L2_ProductInfoChart",
        "static": false
      },
      {
        "w": 12,
        "h": 15,
        "x": 36,
        "y": 45,
        "i": "L2_TempVibChart",
        "static": false
      }
    ]
  },
  {
    "id_dash": 6,
    "component": [],
    "layout": []
  },
  {
    "id_dash": 8,
    "component": [],
    "layout": []
  },
  {
    "id_dash": 7,
    "component": [
      {
        "label": "Widget",
        "i": "YadNaU",
        "props": {
          "title": "Incident Count",
          "chart_type": "pie",
          "id_resource_data": 1755266118262,
          "x_data": "type",
          "yData": [
            {
              "label": "count",
              "value": "count"
            }
          ],
          "value_kpi": "",
          "max_rate": ""
        }
      },
      {
        "label": "Datatable",
        "i": "evBPcy",
        "props": {
          "title": "Daily Safety Checklist",
          "displayed_fields": [
            {
              "label": "item",
              "value": "item"
            },
            {
              "label": "status",
              "value": "status"
            }
          ],
          "id_resource_data": 1755266250978
        }
      },
      {
        "label": "Card",
        "i": "gZfeuE",
        "props": {
          "title": "SOP Stat",
          "card_type": "stat",
          "id_resource_data": 1755266511471,
          "value_kpi": [],
          "subtitle_kpi": [],
          "percentage_kpi": "",
          "data_1": "total_sop",
          "title_1": "Total SOP",
          "data_2": "terpenuhi",
          "title_2": "Terpenuhi"
        }
      }
    ],
    "layout": [
      {
        "w": 10,
        "h": 22,
        "x": 0,
        "y": 0,
        "i": "YadNaU",
        "static": false
      },
      {
        "w": 18,
        "h": 40,
        "x": 10,
        "y": 0,
        "i": "evBPcy",
        "static": false
      },
      {
        "w": 10,
        "h": 18,
        "x": 0,
        "y": 22,
        "i": "gZfeuE",
        "static": false
      }
    ]
  },
  {
    "id_dash": 9,
    "component": [
      {
        "label": "Widget",
        "i": "lADqtT",
        "props": {
          "title": "Production/Shift",
          "chart_type": "bar",
          "id_resource_data": 1755266873115,
          "x_data": "shift",
          "yData": [
            {
              "label": "produksi_unit",
              "value": "produksi_unit"
            },
            {
              "label": "reject_unit",
              "value": "reject_unit"
            }
          ],
          "value_kpi": "",
          "max_rate": ""
        }
      },
      {
        "label": "Datatable",
        "i": "hFtyHj",
        "props": {
          "title": "Efficiency/Operator",
          "chart_type": "bar",
          "id_resource_data": 1755266977629,
          "x_data": "shift",
          "yData": [
            {
              "label": "produksi_unit",
              "value": "produksi_unit"
            },
            {
              "label": "reject_unit",
              "value": "reject_unit"
            }
          ],
          "value_kpi": "",
          "max_rate": "",
          "displayed_fields": [
            {
              "label": "nama",
              "value": "nama"
            },
            {
              "label": "output_unit",
              "value": "output_unit"
            },
            {
              "label": "jam_kerja",
              "value": "jam_kerja"
            },
            {
              "label": "efisiensi_persen",
              "value": "efisiensi_persen"
            },
            {
              "label": "reject_rate_persen",
              "value": "reject_rate_persen"
            }
          ]
        }
      },
      {
        "label": "Widget",
        "i": "iaJKkc",
        "props": {
          "title": "Rejected Rate/Operator Visualize",
          "chart_type": "pie",
          "id_resource_data": 1755266977629,
          "x_data": "nama",
          "yData": [
            {
              "label": "reject_rate_persen",
              "value": "reject_rate_persen"
            }
          ],
          "value_kpi": "",
          "max_rate": ""
        }
      }
    ],
    "layout": [
      {
        "w": 15,
        "h": 19,
        "x": 0,
        "y": 0,
        "i": "lADqtT",
        "static": false
      },
      {
        "w": 19,
        "h": 19,
        "x": 15,
        "y": 0,
        "i": "hFtyHj",
        "static": false
      },
      {
        "w": 10,
        "h": 19,
        "x": 34,
        "y": 0,
        "i": "iaJKkc",
        "static": false
      }
    ]
  },
  {
    "id_dash": 4,
    "component": [],
    "layout": []
  },
  {
    "id_dash": 5,
    "component": [],
    "layout": []
  },
  {
    "id_dash": 6,
    "component": [],
    "layout": []
  },
  {
    "id_dash": 7,
    "component": [],
    "layout": []
  },
  {
    "id_dash": 8,
    "component": [],
    "layout": []
  },
  {
    "id_dash": 9,
    "component": [],
    "layout": []
  },
  {
    "id_dash": 10,
    "component": [],
    "layout": []
  },
  {
    "id_dash": 11,
    "component": [],
    "layout": []
  }
]

// New structure using external JSON files
export const default_source_data = [
  {
    "id": 1755265013522,
    "name": "Aktual Produksi",
    "type": "json",
    "fileName": "actual_production.json",
    "filePath": "/src/data/json/actual_production.json"
  },
  {
    "id": 1755265039617,
    "name": "Cycle Time",
    "type": "json",
    "fileName": "cycletrendtime.json",
    "filePath": "/src/data/json/cycletrendtime.json"
  },
  {
    "id": 1755265050554,
    "name": "OEE",
    "type": "json",
    "fileName": "OEE.json",
    "filePath": "/src/data/json/OEE.json"
  },
  {
    "id": 1755265080795,
    "name": "Produksi & Rejected Mesin",
    "type": "json",
    "fileName": "production_rejected_engine.json",
    "filePath": "/src/data/json/production_rejected_engine.json"
  },
  {
    "id": 1755265095961,
    "name": "Target vs Actual",
    "type": "json",
    "fileName": "production_target.json",
    "filePath": "/src/data/json/production_target.json"
  },
  {
    "id": 1755265864644,
    "name": "Target Produksi",
    "type": "json",
    "fileName": "production_target.json",
    "filePath": "/src/data/json/production_target.json"
  },
  {
    "id": 1755266118262,
    "name": "Jumlah Insiden",
    "type": "json",
    "fileName": "incidentcount.json",
    "filePath": "/src/data/json/incidentcount.json"
  },
  {
    "id": 1755270000001,
    "name": "Machine Layout - Line 1",
    "type": "json",
    "fileName": "machine_layout_line1.json",
    "filePath": "/src/data/json/machine_layout_line1.json"
  },
  {
    "id": 1755270000002,
    "name": "Calendar - October 2025",
    "type": "json",
    "fileName": "calendar_october_2025.json",
    "filePath": "/src/data/json/calendar_october_2025.json"
  },
  {
    "id": 1755270000003,
    "name": "Downtime (minutes)",
    "type": "json",
    "fileName": "downtime_monthly.json",
    "filePath": "/src/data/json/downtime_monthly.json"
  },
  {
    "id": 1755270000004,
    "name": "Target vs Actual (units)",
    "type": "json",
    "fileName": "target_vs_actual.json",
    "filePath": "/src/data/json/target_vs_actual.json"
  },
  {
    "id": 1755270000005,
    "name": "Electric Consumption (KWH)",
    "type": "json",
    "fileName": "electric_consumption.json",
    "filePath": "/src/data/json/electric_consumption.json"
  },
  {
    "id": 1755270000006,
    "name": "Machine Layout - Line 2 (Detailed)",
    "type": "json",
    "fileName": "machine_layout_line2_detailed.json",
    "filePath": "/src/data/json/machine_layout_line2_detailed.json"
  },
  {
    "id": 1755266250978,
    "name": "Safety Checklist Harian",
    "type": "json",
    "fileName": "dailychecklist.json",
    "filePath": "/src/data/json/dailychecklist.json"
  },
  {
    "id": 1755266511471,
    "name": "Pemenuhan SOP",
    "type": "json",
    "fileName": "sop_percentage.json",
    "filePath": "/src/data/json/sop_percentage.json"
  },
  {
    "id": 1755266873115,
    "name": "Produksi Per Shift",
    "type": "json",
    "fileName": "per_shift_productivity.json",
    "filePath": "/src/data/json/per_shift_productivity.json"
  },
  {
    "id": 1755266977629,
    "name": "Data Operator",
    "type": "json",
    "fileName": "operator_efficiency.json",
    "filePath": "/src/data/json/operator_efficiency.json"
  },
  {
    "id": 1755270000007,
    "name": "OFM (Overall Factory Management)",
    "type": "json",
    "fileName": "ofm_monthly.json",
    "filePath": "/src/data/json/ofm_monthly.json"
  },
  {
    "id": 1755270000007.1,
    "name": "OFM (Overall Factory Management) - Quarterly",
    "type": "json",
    "fileName": "ofm_quarterly.json",
    "filePath": "/src/data/json/ofm_quarterly.json"
  },
  {
    "id": 1755270000007.2,
    "name": "OFM (Overall Factory Management) - Yearly",
    "type": "json",
    "fileName": "ofm_yearly.json",
    "filePath": "/src/data/json/ofm_yearly.json"
  },
  {
    "id": 1755270000008,
    "name": "OFE (Overall Factory Efficiency)",
    "type": "json",
    "fileName": "ofe_monthly.json",
    "filePath": "/src/data/json/ofe_monthly.json"
  },
  {
    "id": 1755270000008.1,
    "name": "OFE (Overall Factory Efficiency) - Quarterly",
    "type": "json",
    "fileName": "ofe_quarterly.json",
    "filePath": "/src/data/json/ofe_quarterly.json"
  },
  {
    "id": 1755270000008.2,
    "name": "OFE (Overall Factory Efficiency) - Yearly",
    "type": "json",
    "fileName": "ofe_yearly.json",
    "filePath": "/src/data/json/ofe_yearly.json"
  },
  {
    "id": 1755270000009,
    "name": "NRFC (Non-Running Factory Components)",
    "type": "json",
    "fileName": "nrfc_monthly.json",
    "filePath": "/src/data/json/nrfc_monthly.json"
  },
  {
    "id": 1755270000009.1,
    "name": "NRFC (Non-Running Factory Components) - Quarterly",
    "type": "json",
    "fileName": "nrfc_quarterly.json",
    "filePath": "/src/data/json/nrfc_quarterly.json"
  },
  {
    "id": 1755270000009.2,
    "name": "NRFC (Non-Running Factory Components) - Yearly",
    "type": "json",
    "fileName": "nrfc_yearly.json",
    "filePath": "/src/data/json/nrfc_yearly.json"
  },
  {
    "id": 1755270000010,
    "name": "NRFW (Non-Running Factory Workers)",
    "type": "json",
    "fileName": "nrfw_monthly.json",
    "filePath": "/src/data/json/nrfw_monthly.json"
  },
  {
    "id": 1755270000010.1,
    "name": "NRFW (Non-Running Factory Workers) - Quarterly",
    "type": "json",
    "fileName": "nrfw_quarterly.json",
    "filePath": "/src/data/json/nrfw_quarterly.json"
  },
  {
    "id": 1755270000010.2,
    "name": "NRFW (Non-Running Factory Workers) - Yearly",
    "type": "json",
    "fileName": "nrfw_yearly.json",
    "filePath": "/src/data/json/nrfw_yearly.json"
  },
  {
    "id": 1755270000011,
    "name": "NRDAE (Non-Running Data Acquisition Equipment)",
    "type": "json",
    "fileName": "nrdae_monthly.json",
    "filePath": "/src/data/json/nrdae_monthly.json"
  },
  {
    "id": 1755270000011.1,
    "name": "NRDAE (Non-Running Data Acquisition Equipment) - Quarterly",
    "type": "json",
    "fileName": "nrdae_quarterly.json",
    "filePath": "/src/data/json/nrdae_quarterly.json"
  },
  {
    "id": 1755270000011.2,
    "name": "NRDAE (Non-Running Data Acquisition Equipment) - Yearly",
    "type": "json",
    "fileName": "nrdae_yearly.json",
    "filePath": "/src/data/json/nrdae_yearly.json"
  },
  {
    "id": 1755270000012,
    "name": "Power Consumption",
    "type": "json",
    "fileName": "power_consumption_monthly.json",
    "filePath": "/src/data/json/power_consumption_monthly.json"
  },
  {
    "id": 1755270000012.1,
    "name": "Power Consumption - Quarterly",
    "type": "json",
    "fileName": "power_consumption_quarterly.json",
    "filePath": "/src/data/json/power_consumption_quarterly.json"
  },
  {
    "id": 1755270000012.2,
    "name": "Power Consumption - Yearly",
    "type": "json",
    "fileName": "power_consumption_yearly.json",
    "filePath": "/src/data/json/power_consumption_yearly.json"
  },
  {
    "id": 1755270000013,
    "name": "Product Information (Production with Threshold)",
    "type": "json",
    "fileName": "product_info_threshold_monthly.json",
    "filePath": "/src/data/json/product_info_threshold_monthly.json"
  },
  {
    "id": 1755270000013.1,
    "name": "Product Information (Production with Threshold) - Quarterly",
    "type": "json",
    "fileName": "product_info_threshold_quarterly.json",
    "filePath": "/src/data/json/product_info_threshold_quarterly.json"
  },
  {
    "id": 1755270000013.2,
    "name": "Product Information (Production with Threshold) - Yearly",
    "type": "json",
    "fileName": "product_info_threshold_yearly.json",
    "filePath": "/src/data/json/product_info_threshold_yearly.json"
  },
  {
    "id": 1755270000014,
    "name": "Temperature vs Vibration",
    "type": "json",
    "fileName": "temperature_vibration_monthly.json",
    "filePath": "/src/data/json/temperature_vibration_monthly.json"
  },
  {
    "id": 1755270000014.1,
    "name": "Temperature vs Vibration - Quarterly",
    "type": "json",
    "fileName": "temperature_vibration_quarterly.json",
    "filePath": "/src/data/json/temperature_vibration_quarterly.json"
  },
  {
    "id": 1755270000014.2,
    "name": "Temperature vs Vibration - Yearly",
    "type": "json",
    "fileName": "temperature_vibration_yearly.json",
    "filePath": "/src/data/json/temperature_vibration_yearly.json"
  }
]
