import { CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

function KPICard({ ...props }) {
  console.log(props)
  return (
    <CardContent>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">{props?.dataItem?.fileData[props?.value_kpi]}</span>
        <span
          className={`flex items-center text-xs font-medium ${props?.dataItem?.fileData[props?.percentage_kpi] >= 0
            ? "text-green-600"
            : "text-red-600"
            }`}
        >
          {props?.dataItem?.fileData[props?.percentage_kpi] >= 0 ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
          {props?.dataItem?.fileData[props?.percentage_kpi]}%
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{props?.dataItem?.fileData[props?.subtitle_kpi]}</p>
    </CardContent>
  );
}

export default KPICard;
