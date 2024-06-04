"use client";
import { AreaChart } from "@tremor/react";

export function AreaChartHero(prop: any) {
  // const data = chartdata;

  return (
    <AreaChart
      className="h-80"
      data={prop.data}
      index="date"
      categories={["Copper", "Cobalt"]}
      colors={["amber", "blue"]}
      valueFormatter={(number: number) =>
        `$${Intl.NumberFormat("us").format(number).toString()}`
      }
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
      showGradient={false}
      animationDuration={500}
    />
  );
}
