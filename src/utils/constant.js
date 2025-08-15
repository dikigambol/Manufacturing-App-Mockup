export const colors = [
  "#FF6384", // pink merah
  "#36A2EB", // biru
  "#FFCE56", // kuning
  "#4BC0C0", // toska
  "#9966FF", // ungu
  "#FF9F40", // oranye
  "#00A36C", // hijau emerald
  "#C71585", // magenta tua
  "#4682B4", // steel blue
  "#FFD700", // gold
  "#8B0000", // merah tua
  "#00CED1", // dark turquoise
  "#ADFF2F", // hijau lime
  "#FF4500", // oranye merah
  "#9400D3", // ungu gelap
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
        "i": "pjKlOB",
        "props": {
          "title": "Cycle Time",
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
        "label": "Widget",
        "i": "CrOtPL",
        "props": {
          "title": "OEE",
          "chart_type": "gauge",
          "id_resource_data": 1755265050554,
          "x_data": [],
          "yData": [],
          "value_kpi": "total_oee",
          "max_rate": "100"
        }
      },
      {
        "label": "Widget",
        "i": "BAakEv",
        "props": {
          "title": "Comparation Production & Rejected Engines",
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
        "i": "ldDqsw",
        "props": {
          "title": "Actual Production",
          "chart_type": "bar",
          "id_resource_data": 1755265013522,
          "x_data": "tanggal",
          "yData": [
            {
              "label": "unit",
              "value": "unit"
            }
          ],
          "value_kpi": "",
          "max_rate": "",
          "card_type": "stat",
          "subtitle_kpi": [],
          "percentage_kpi": "",
          "data_1": "target_unit",
          "title_1": "Target Count",
          "data_2": "actual_unit",
          "title_2": "Actual Count"
        }
      },
      {
        "label": "Card",
        "i": "FCvGYH",
        "props": {
          "title": "Gap Target & Actual",
          "id_resource_data": 1755265095961,
          "x_data": [],
          "yData": [],
          "value_kpi": [],
          "max_rate": "",
          "card_type": "stat",
          "subtitle_kpi": [],
          "percentage_kpi": "",
          "data_1": "target_unit",
          "title_1": "Target Count",
          "data_2": "actual_unit",
          "title_2": "Actual Count"
        }
      },
      {
        "label": "Card",
        "i": "WHLGiX",
        "props": {
          "title": "Production Target",
          "card_type": "kpi",
          "id_resource_data": 1755265864644,
          "value_kpi": "value",
          "subtitle_kpi": "subtitle",
          "percentage_kpi": "percentage",
          "data_1": "",
          "title_1": "",
          "data_2": "",
          "title_2": ""
        }
      }
    ],
    "layout": [
      {
        "w": 16,
        "h": 19,
        "x": 0,
        "y": 0,
        "i": "pjKlOB",
        "static": false
      },
      {
        "w": 10,
        "h": 19,
        "x": 16,
        "y": 0,
        "i": "CrOtPL",
        "static": false
      },
      {
        "w": 16,
        "h": 18,
        "x": 0,
        "y": 19,
        "i": "BAakEv",
        "static": false
      },
      {
        "w": 16,
        "h": 18,
        "x": 16,
        "y": 19,
        "i": "ldDqsw",
        "static": false
      },
      {
        "w": 10,
        "h": 19,
        "x": 26,
        "y": 0,
        "i": "FCvGYH",
        "static": false
      },
      {
        "w": 9,
        "h": 9,
        "x": 7,
        "y": 93,
        "i": "WHLGiX",
        "static": false
      }
    ]
  },
  {
    "id_dash": 3,
    "component": [],
    "layout": []
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
    "fileData": "data:application/json;base64,ew0KICAiYXZhaWxhYmlsaXR5IjogODguNSwNCiAgInBlcmZvcm1hbmNlIjogOTIuMCwNCiAgInF1YWxpdHkiOiA5Ni44LA0KICAidG90YWxfb2VlIjogNzguOQ0KfQ=="
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