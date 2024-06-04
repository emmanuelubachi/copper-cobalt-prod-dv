"use client";

import React from "react";
import {
  AreaChart,
  type AreaChartEventProps,
} from "@/components/chartRaw/areaChart";
import { areachartdata, chartdata2 } from "@/data/chartdata";

export const AreaChartAxisLabelsExample = () => (
  <AreaChart
    className="h-80"
    data={areachartdata}
    index="date"
    categories={["SolarPanels", "Inverters"]}
    colors={["gray", "blue"]}
    valueFormatter={(number: number) =>
      `$${Intl.NumberFormat("us").format(number).toString()}`
    }
    onValueChange={(v) => console.log(v)}
    xAxisLabel="Month"
    yAxisLabel="Spend Category"
  />
);

export const AreaChartOnValueChangeExample = () => {
  const [value, setValue] = React.useState<AreaChartEventProps>(null);
  return (
    <>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata2}
        index="date"
        categories={["2022", "2023"]}
        colors={["gray", "blue"]}
        yAxisWidth={30}
        onValueChange={(v) => setValue(v)}
      />
      {/* <pre className="mt-8 rounded-md bg-gray-950 p-3 text-sm text-white dark:bg-gray-800">
        {JSON.stringify(value, null, 2)}
      </pre> */}
    </>
  );
};
