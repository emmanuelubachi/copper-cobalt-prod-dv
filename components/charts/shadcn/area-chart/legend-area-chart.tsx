"use client";

import { ReactNode } from "react";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type LegendAreaChartProps = {
  title: string;
  description: string;
  config: ChartConfig;
  chartData: any;
  xAxisDataKey: string;
  firstDataKey: string;
  secondDataKey: string;
  footNote?: ReactNode;
  formatter: string;
};

export function LegendAreaChart({ ...props }: LegendAreaChartProps) {
  const chartConfig = props.config satisfies ChartConfig;
  const chartData = props.chartData;

  return (
    <>
      <CardHeader className="px-4">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[355px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={props.xAxisDataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  year: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  className="w-[150px]"
                  // nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      //   month: "short",
                      //   day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Area
              dataKey={props.firstDataKey}
              type="monotone"
              fill={`var(--color-${props.firstDataKey}`}
              fillOpacity={0.3}
              stroke={`var(--color-${props.firstDataKey}`}
              stackId="a"
            />
            <Area
              dataKey={props.secondDataKey}
              type="monotone"
              fill={`var(--color-${props.secondDataKey}`}
              fillOpacity={0.3}
              stroke={`var(--color-${props.secondDataKey}`}
              stackId="b"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </>
  );
}
