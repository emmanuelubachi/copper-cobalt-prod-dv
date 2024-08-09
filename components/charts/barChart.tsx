"use client";
import { BarChart } from "@tremor/react";
import { quantityFormatter } from "@/lib/utils";

export default function BarChartRender({ chartData }: { chartData: any }) {
  return (
    <BarChart
      className="mt-6"
      data={chartData}
      index="destination"
      categories={["totalQuantityTons"]}
      colors={["orange"]}
      valueFormatter={quantityFormatter}
      layout="vertical"
      //   yAxisWidth={48}
    />
  );
}
