"use client";
import { BarChart } from "@tremor/react";
import { quantityFormatter } from "@/lib/utils";

export default function BarChartRender(chartdata: any) {
  return (
    <BarChart
      className="mt-6"
      data={chartdata.data}
      index="name"
      categories={["Number of threatened species"]}
      colors={["blue"]}
      valueFormatter={quantityFormatter}
      //   yAxisWidth={48}
    />
  );
}
