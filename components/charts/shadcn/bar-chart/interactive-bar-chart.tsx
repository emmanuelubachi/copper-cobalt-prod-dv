"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type InteractiveBarChartProps = {
  title: string;
  description: string;
  config: ChartConfig;
  chartData: {
    _project_id: string;
    totalCobalt: number;
    totalCopper: number;
  }[];
  firstDataKey: string;
  secondDataKey: string;
  footNote?: React.ReactNode;
};

export function InteractiveBarChart({ ...props }: InteractiveBarChartProps) {
  const chartConfig = props.config satisfies ChartConfig;
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("totalCopper");

  const chartData = props.chartData;

  const total = React.useMemo(
    () => ({
      totalCobalt: chartData
        .reduce((acc, curr) => acc + curr.totalCobalt, 0)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      totalCopper: chartData
        .reduce((acc, curr) => acc + curr.totalCopper, 0)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    }),
    [chartData],
  );

  return (
    <Card className="__card">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 md:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </div>
        <div className="flex">
          {["totalCobalt", "totalCopper"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="_project_id"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 7)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => value.slice(0, 7)}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
