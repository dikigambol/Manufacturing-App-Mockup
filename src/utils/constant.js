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
    "component": [],
    "layout": []
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

export const default_source_data = [
  {
    "id": 1755265013522,
    "name": "Aktual Produksi",
    "type": "json",
    "fileName": "actual_production.json",
    "fileData": "data:application/json;base64,Ww0KICB7DQogICAgInRhbmdnYWwiOiAiMjAyNS0wOC0wMSIsDQogICAgInVuaXQiOiA0ODANCiAgfSwNCiAgew0KICAgICJ0YW5nZ2FsIjogIjIwMjUtMDgtMDIiLA0KICAgICJ1bml0IjogNTAwDQogIH0sDQogIHsNCiAgICAidGFuZ2dhbCI6ICIyMDI1LTA4LTAzIiwNCiAgICAidW5pdCI6IDQ2NQ0KICB9LA0KICB7DQogICAgInRhbmdnYWwiOiAiMjAyNS0wOC0wNCIsDQogICAgInVuaXQiOiA0OTANCiAgfSwNCiAgew0KICAgICJ0YW5nZ2FsIjogIjIwMjUtMDgtMDUiLA0KICAgICJ1bml0IjogNTA1DQogIH0NCl0="
  },
  {
    "id": 1755265039617,
    "name": "Cycle Time",
    "type": "json",
    "fileName": "cycletrendtime.json",
    "fileData": "data:application/json;base64,Ww0KICB7DQogICAgImhvdXIiOiAiMDg6MDAiLA0KICAgICJjeWNsZV90aW1lIjogNS4yDQogIH0sDQogIHsNCiAgICAiaG91ciI6ICIwOTowMCIsDQogICAgImN5Y2xlX3RpbWUiOiA1LjANCiAgfSwNCiAgew0KICAgICJob3VyIjogIjEwOjAwIiwNCiAgICAiY3ljbGVfdGltZSI6IDQuOA0KICB9LA0KICB7DQogICAgImhvdXIiOiAiMTE6MDAiLA0KICAgICJjeWNsZV90aW1lIjogNS41DQogIH0sDQogIHsNCiAgICAiaG91ciI6ICIxMjowMCIsDQogICAgImN5Y2xlX3RpbWUiOiA2LjANCiAgfSwNCiAgew0KICAgICJob3VyIjogIjEzOjAwIiwNCiAgICAiY3ljbGVfdGltZSI6IDUuMQ0KICB9LA0KICB7DQogICAgImhvdXIiOiAiMTQ6MDAiLA0KICAgICJjeWNsZV90aW1lIjogNC45DQogIH0sDQogIHsNCiAgICAiaG91ciI6ICIxNTowMCIsDQogICAgImN5Y2xlX3RpbWUiOiA1LjMNCiAgfQ0KXQ=="
  },
  {
    "id": 1755265050554,
    "name": "OEE",
    "type": "json",
    "fileName": "OEE.json",
    "fileData": "data:application/json;base64,eyJhdmFpbGFiaWxpdHkiOjg4LjUsInBlcmZvcm1hbmNlIjo5Mi4wLCJxdWFsaXR5Ijo5Ni44LCJ0b3RhbF9vZWUiOjc4LjksImN5Y2xlX3RpbWUiOjIxLjQsInBhcnRfb2siOjExMDAsInBhcnRfbmciOjR9Cg=="
  },
  {
    "id": 1755265080795,
    "name": "Produksi & Rejected Mesin",
    "type": "json",
    "fileName": "production_rejected_engine.json",
    "fileData": "data:application/json;base64,Ww0KICB7DQogICAgInRhbmdnYWwiOiAiMjAyNS0wOC0wOSIsDQogICAgInByb2R1a3NpIjogNDgwLA0KICAgICJyZWplY3QiOiAxMA0KICB9LA0KICB7DQogICAgInRhbmdnYWwiOiAiMjAyNS0wOC0xMCIsDQogICAgInByb2R1a3NpIjogNTAwLA0KICAgICJyZWplY3QiOiAxNQ0KICB9LA0KICB7DQogICAgInRhbmdnYWwiOiAiMjAyNS0wOC0xMSIsDQogICAgInByb2R1a3NpIjogNDY1LA0KICAgICJyZWplY3QiOiAxMg0KICB9LA0KICB7DQogICAgInRhbmdnYWwiOiAiMjAyNS0wOC0xMiIsDQogICAgInByb2R1a3NpIjogNDkwLA0KICAgICJyZWplY3QiOiA5DQogIH0sDQogIHsNCiAgICAidGFuZ2dhbCI6ICIyMDI1LTA4LTEzIiwNCiAgICAicHJvZHVrc2kiOiA1MDUsDQogICAgInJlamVjdCI6IDE0DQogIH0sDQogIHsNCiAgICAidGFuZ2dhbCI6ICIyMDI1LTA4LTE0IiwNCiAgICAicHJvZHVrc2kiOiA0OTUsDQogICAgInJlamVjdCI6IDgNCiAgfSwNCiAgew0KICAgICJ0YW5nZ2FsIjogIjIwMjUtMDgtMTUiLA0KICAgICJwcm9kdWtzaSI6IDQ3MCwNCiAgICAicmVqZWN0IjogMTUNCiAgfQ0KXQ=="
  },
  {
    "id": 1755265095961,
    "name": "Target vs Actual",
    "type": "json",
    "fileName": "production_target.json",
    "fileData": "data:application/json;base64,ew0KICAidGFyZ2V0X3VuaXQiOiA1MDAsDQogICJhY3R1YWxfdW5pdCI6IDQ3MA0KfQ=="
  },
  {
    "id": 1755265864644,
    "name": "Target Produksi",
    "type": "json",
    "fileName": "production_target.json",
    "fileData": "data:application/json;base64,ew0KICAidmFsdWUiOiA0NzAsDQogICJwZXJjZW50YWdlIjogOTQuMCwNCiAgInN1YnRpdGxlIjogIlRhcmdldCA1MDAgdW5pdCBQZXJpb2RlIDE1LzA4LzIwMjUiDQp9"
  },
  {
    "id": 1755266118262,
    "name": "Jumlah Insiden",
    "type": "json",
    "fileName": "incidentcount.json",
    "fileData": "data:application/json;base64,Ww0KICB7DQogICAgInR5cGUiOiAidGVycGVsZXNldCIsDQogICAgImNvdW50IjogNQ0KICB9LA0KICB7DQogICAgInR5cGUiOiAidGVya2VuYV9hbGF0IiwNCiAgICAiY291bnQiOiA4DQogIH0sDQogIHsNCiAgICAidHlwZSI6ICJ0ZXJqYXR1aCIsDQogICAgImNvdW50IjogMw0KICB9LA0KICB7DQogICAgInR5cGUiOiAidGVyamVwaXRfbWVzaW4iLA0KICAgICJjb3VudCI6IDQNCiAgfSwNCiAgew0KICAgICJ0eXBlIjogInRlcmJha2FyIiwNCiAgICAiY291bnQiOiAyDQogIH0sDQogIHsNCiAgICAidHlwZSI6ICJ0ZXJrZW5hX2JlbmRhX3RhamFtIiwNCiAgICAiY291bnQiOiA2DQogIH0sDQogIHsNCiAgICAidHlwZSI6ICJ0ZXJwYXBhcl9iYWhhbl9raW1pYSIsDQogICAgImNvdW50IjogMQ0KICB9LA0KICB7DQogICAgInR5cGUiOiAidGVyc2VuZ2F0X2xpc3RyaWsiLA0KICAgICJjb3VudCI6IDINCiAgfSwNCiAgew0KICAgICJ0eXBlIjogImtlY2VsYWthYW5fa2VuZGFyYWFuIiwNCiAgICAiY291bnQiOiAzDQogIH0sDQogIHsNCiAgICAidHlwZSI6ICJsYWlubnlhIiwNCiAgICAiY291bnQiOiA3DQogIH0NCl0="
  },
  {
    "id": 1755270000001,
    "name": "Machine Layout - Line 1",
    "type": "json",
    "fileName": "machine_layout_line1.json",
    "fileData": "data:application/json;base64,eyJsYXlvdXQiOlt7Im1hY2hpbmVfaWQiOiJNQ0gtMDAxIiwieCI6NTAsInkiOjEwMCwid2lkdGgiOjE0MCwiaGVpZ2h0Ijo3MH0seyJtYWNoaW5lX2lkIjoiTUNILTAwMiIsIngiOjIyMCwieSI6MTAwLCJ3aWR0aCI6MTQwLCJoZWlnaHQiOjcwfSx7Im1hY2hpbmVfaWQiOiJNQ0gtMDAzIiwieCI6MzkwLCJ5IjoxMDAsIndpZHRoIjoxNDAsImhlaWdodCI6NzB9XSwiY29ubmVjdGlvbnMiOlt7ImZyb20iOnsieCI6MTkwLCJ5IjoxMzV9LCJ0byI6eyJ4IjoyMjAsInkiOjEzNX0sInR5cGUiOiJjb252ZXlvciJ9LHsiZnJvbSI6eyJ4IjozNjAsInkiOjEzNX0sInRvIjp7IngiOjM5MCwieSI6MTM1fSwidHlwZSI6ImNvbnZleW9yIn1dfQ=="
  },
  {
    "id": 1755270000002,
    "name": "Calendar - October 2025",
    "type": "json",
    "fileName": "calendar_october_2025.json",
    "fileData": "data:application/json;base64,eyJjdXJyZW50X21vbnRoIjoiT2N0b2JlciAyMDI1IiwiY3VycmVudF9kYXRlIjoxMiwiZW5naW5lZXJpbmdfY2FsbHMiOjMsIm1haW50ZW5hbmNlX2NhbGxzIjoyLCJldmVudHMiOlt7ImRhdGUiOjMsInRpdGxlIjoiUHJldmVudGl2ZSBNYWludGVuYW5jZSIsImRlc2NyaXB0aW9uIjoiTnV0IFJ1bm5lciBDeWwgSGVhZCAxIn0seyJkYXRlIjo4LCJ0aXRsZSI6IlNhZmV0eSBJbnNwZWN0aW9uIiwiZGVzY3JpcHRpb24iOiJNb250aGx5IHNhZmV0eSBjaGVjayJ9LHsiZGF0ZSI6MTIsInRpdGxlIjoiUHJvZHVjdGlvbiBSZXZpZXciLCJkZXNjcmlwdGlvbiI6IldlZWtseSBwZXJmb3JtYW5jZSByZXZpZXcifSx7ImRhdGUiOjE1LCJ0aXRsZSI6IkVxdWlwbWVudCBDYWxpYnJhdGlvbiIsImRlc2NyaXB0aW9uIjoiTGVhayBUZXN0ZXIgY2FsaWJyYXRpb24ifSx7ImRhdGUiOjIwLCJ0aXRsZSI6IlRlYW0gTWVldGluZyIsImRlc2NyaXB0aW9uIjoiTW9udGhseSB0ZWFtIHN5bmMifSx7ImRhdGUiOjI1LCJ0aXRsZSI6IkludmVudG9yeSBDaGVjayIsImRlc2NyaXB0aW9uIjoiU3BhcmVwYXJ0cyBpbnZlbnRvcnkifV0sImhpZ2hsaWdodGVkX2RhdGVzIjpbMyw4LDE1LDE5LDI1XX0="
  },
  {
    "id": 1755270000003,
    "name": "Downtime (minutes)",
    "type": "json",
    "fileName": "downtime_monthly.json",
    "fileData": "data:application/json;base64,W3sibW9udGgiOiJKYW4iLCJkb3dudGltZSI6MTV9LHsibW9udGgiOiJGZWIiLCJkb3dudGltZSI6MjJ9LHsibW9udGgiOiJNYXIiLCJkb3dudGltZSI6MTh9LHsibW9udGgiOiJBcHIiLCJkb3dudGltZSI6MTJ9LHsibW9udGgiOiJNYXkiLCJkb3dudGltZSI6MjV9LHsibW9udGgiOiJKdW4iLCJkb3dudGltZSI6MjB9LHsibW9udGgiOiJKdWwiLCJkb3dudGltZSI6MTZ9LHsibW9udGgiOiJBdWciLCJkb3dudGltZSI6MTl9LHsibW9udGgiOiJTZXAiLCJkb3dudGltZSI6MTR9LHsibW9udGgiOiJPY3QiLCJkb3dudGltZSI6MjF9LHsibW9udGgiOiJOb3YiLCJkb3dudGltZSI6MTd9LHsibW9udGgiOiJEZWMiLCJkb3dudGltZSI6MTN9XQ=="
  },
  {
    "id": 1755270000004,
    "name": "Target vs Actual (units)",
    "type": "json",
    "fileName": "target_vs_actual.json",
    "fileData": "data:application/json;base64,W3sibW9udGgiOiJKYW4iLCJ0YXJnZXQiOjUwMCwiYWN0dWFsIjo0ODB9LHsibW9udGgiOiJGZWIiLCJ0YXJnZXQiOjUwMCwiYWN0dWFsIjo0OTV9LHsibW9udGgiOiJNYXIiLCJ0YXJnZXQiOjUwMCwiYWN0dWFsIjo1MTB9LHsibW9udGgiOiJBcHIiLCJ0YXJnZXQiOjUwMCwiYWN0dWFsIjo0ODV9LHsibW9udGgiOiJNYXkiLCJ0YXJnZXQiOjUwMCwiYWN0dWFsIjo1MDV9LHsibW9udGgiOiJKdW4iLCJ0YXJnZXQiOjUwMCwiYWN0dWFsIjo0OTB9LHsibW9udGgiOiJKdWwiLCJ0YXJnZXQiOjUwMCwiYWN0dWFsIjo1MDB9LHsibW9udGgiOiJBdWciLCJ0YXJnZXQiOjUwMCwiYWN0dWFsIjo1MTV9LHsibW9udGgiOiJTZXAiLCJ0YXJnZXQiOjUwMCwiYWN0dWFsIjo0OTV9LHsibW9udGgiOiJPY3QiLCJ0YXJnZXQiOjUwMCwiYWN0dWFsIjo1MjB9LHsibW9udGgiOiJOb3YiLCJ0YXJnZXQiOjUwMCwiYWN0dWFsIjo1MDV9LHsibW9udGgiOiJEZWMiLCJ0YXJnZXQiOjUwMCwiYWN0dWFsIjo1MTB9XQ=="
  },
  {
    "id": 1755270000005,
    "name": "Electric Consumption (KWH)",
    "type": "json",
    "fileName": "electric_consumption.json",
    "fileData": "data:application/json;base64,W3sibW9udGgiOiJKYW4iLCJjb25zdW1wdGlvbiI6MTIwMH0seyJtb250aCI6IkZlYiIsImNvbnN1bXB0aW9uIjoxMzUwfSx7Im1vbnRoIjoiTWFyIiwiY29uc3VtcHRpb24iOjEyODB9LHsibW9udGgiOiJBcHIiLCJjb25zdW1wdGlvbiI6MTE1MH0seyJtb250aCI6Ik1heSIsImNvbnN1bXB0aW9uIjoxNDAwfSx7Im1vbnRoIjoiSnVuIiwiY29uc3VtcHRpb24iOjEzMjB9LHsibW9udGgiOiJKdWwiLCJjb25zdW1wdGlvbiI6MTI1MH0seyJtb250aCI6IkF1ZyIsImNvbnN1bXB0aW9uIjoxMzgwfSx7Im1vbnRoIjoiU2VwIiwiY29uc3VtcHRpb24iOjEyMjB9LHsibW9udGgiOiJPY3QiLCJjb25zdW1wdGlvbiI6MTM2MH0seyJtb250aCI6Ik5vdiIsImNvbnN1bXB0aW9uIjoxMjkwfSx7Im1vbnRoIjoiRGVjIiwiY29uc3VtcHRpb24iOjEyNDB9XQ=="
  },
  {
    "id": 1755266250978,
    "name": "Safety Checklist Harian",
    "type": "json",
    "fileName": "dailychecklist.json",
    "fileData": "data:application/json;base64,Ww0KICB7DQogICAgIml0ZW0iOiAiQVBEIChBbGF0IFBlbGluZHVuZyBEaXJpKSBsZW5na2FwIiwNCiAgICAic3RhdHVzIjogImNoZWNrZWQiDQogIH0sDQogIHsNCiAgICAiaXRlbSI6ICJBcmVhIGtlcmphIGJlYmFzIGhhbWJhdGFuIiwNCiAgICAic3RhdHVzIjogInVuY2hlY2tlZCINCiAgfSwNCiAgew0KICAgICJpdGVtIjogIlRhbmRhIGJhaGF5YSB0ZXJsaWhhdCBqZWxhcyIsDQogICAgInN0YXR1cyI6ICJ1bmNoZWNrZWQiDQogIH0sDQogIHsNCiAgICAiaXRlbSI6ICJLb3RhayBQM0sgdGVyc2VkaWEiLA0KICAgICJzdGF0dXMiOiAiY2hlY2tlZCINCiAgfSwNCiAgew0KICAgICJpdGVtIjogIlBlbWFkYW0ga2ViYWthcmFuIHRlcnNlZGlhIGRhbiBiZXJmdW5nc2kiLA0KICAgICJzdGF0dXMiOiAiY2hlY2tlZCINCiAgfSwNCiAgew0KICAgICJpdGVtIjogIlBlbmVyYW5nYW4gYXJlYSBrZXJqYSBtZW1hZGFpIiwNCiAgICAic3RhdHVzIjogInVuY2hlY2tlZCINCiAgfSwNCiAgew0KICAgICJpdGVtIjogIlZlbnRpbGFzaSBkYW4gc2lya3VsYXNpIHVkYXJhIGJhaWsiLA0KICAgICJzdGF0dXMiOiAiY2hlY2tlZCINCiAgfSwNCiAgew0KICAgICJpdGVtIjogIlBlcmFsYXRhbiB0ZXJrYWxpYnJhc2kgZGVuZ2FuIGJhaWsiLA0KICAgICJzdGF0dXMiOiAidW5jaGVja2VkIg0KICB9LA0KICB7DQogICAgIml0ZW0iOiAiTGFudGFpIHRpZGFrIGxpY2luIGRhbiBiZXJzaWgiLA0KICAgICJzdGF0dXMiOiAiY2hlY2tlZCINCiAgfSwNCiAgew0KICAgICJpdGVtIjogIlJhbWJ1IGV2YWt1YXNpIHRlcmxpaGF0IGplbGFzIiwNCiAgICAic3RhdHVzIjogInVuY2hlY2tlZCINCiAgfQ0KXQ=="
  },
  {
    "id": 1755266511471,
    "name": "Pemenuhan SOP",
    "type": "json",
    "fileName": "sop_percentage.json",
    "fileData": "data:application/json;base64,ew0KICAidG90YWxfc29wIjogMTAsDQogICJ0ZXJwZW51aGkiOiA4DQp9"
  },
  {
    "id": 1755266873115,
    "name": "Produksi Per Shift",
    "type": "json",
    "fileName": "per_shift_productivity.json",
    "fileData": "data:application/json;base64,Ww0KICB7DQogICAgInNoaWZ0IjogMSwNCiAgICAicHJvZHVrc2lfdW5pdCI6IDUyMCwNCiAgICAicmVqZWN0X3VuaXQiOiAxMg0KICB9LA0KICB7DQogICAgInNoaWZ0IjogMiwNCiAgICAicHJvZHVrc2lfdW5pdCI6IDQ4MCwNCiAgICAicmVqZWN0X3VuaXQiOiA4DQogIH0sDQogIHsNCiAgICAic2hpZnQiOiAzLA0KICAgICJwcm9kdWtzaV91bml0IjogNDUwLA0KICAgICJyZWplY3RfdW5pdCI6IDE1DQogIH0NCl0="
  },
  {
    "id": 1755266977629,
    "name": "Data Operator",
    "type": "json",
    "fileName": "operator_efficiency.json",
    "fileData": "data:application/json;base64,Ww0KICB7DQogICAgIm9wZXJhdG9yX2lkIjogIk9QMDAxIiwNCiAgICAibmFtYSI6ICJCdWRpIiwNCiAgICAib3V0cHV0X3VuaXQiOiAxMjAsDQogICAgImphbV9rZXJqYSI6IDgsDQogICAgImVmaXNpZW5zaV9wZXJzZW4iOiA5NS4wLA0KICAgICJyZWplY3RfcmF0ZV9wZXJzZW4iOiAyLjANCiAgfSwNCiAgew0KICAgICJvcGVyYXRvcl9pZCI6ICJPUDAwMiIsDQogICAgIm5hbWEiOiAiU2l0aSIsDQogICAgIm91dHB1dF91bml0IjogMTE1LA0KICAgICJqYW1fa2VyamEiOiA4LA0KICAgICJlZmlzaWVuc2lfcGVyc2VuIjogOTIuMCwNCiAgICAicmVqZWN0X3JhdGVfcGVyc2VuIjogMy4wDQogIH0sDQogIHsNCiAgICAib3BlcmF0b3JfaWQiOiAiT1AwMDMiLA0KICAgICJuYW1hIjogIkFndXMiLA0KICAgICJvdXRwdXRfdW5pdCI6IDEwMCwNCiAgICAiamFtX2tlcmphIjogOCwNCiAgICAiZWZpc2llbnNpX3BlcnNlbiI6IDg1LjAsDQogICAgInJlamVjdF9yYXRlX3BlcnNlbiI6IDUuNQ0KICB9LA0KICB7DQogICAgIm9wZXJhdG9yX2lkIjogIk9QMDA0IiwNCiAgICAibmFtYSI6ICJSaW5hIiwNCiAgICAib3V0cHV0X3VuaXQiOiA5MCwNCiAgICAiamFtX2tlcmphIjogOCwNCiAgICAiZWZpc2llbnNpX3BlcnNlbiI6IDgwLjAsDQogICAgInJlamVjdF9yYXRlX3BlcnNlbiI6IDcuMA0KICB9DQpd"
  }
]