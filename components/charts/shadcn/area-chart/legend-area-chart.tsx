"use client";
import { ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
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
import {
  numberFormatter,
  quantityFormatter,
  quantityFormatterT,
} from "@/lib/utils";
import { Divide } from "lucide-react";

type LegendAreaChartProps = {
  title?: string;
  description: string;
  config: ChartConfig;
  chartData: any;
  xAxisDataKey: string;
  firstDataKey: string;
  secondDataKey: string;
  footNote?: ReactNode;
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
              left: 16,
              right: 16,
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={props.xAxisDataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
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
                  nameKey={props.firstDataKey}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
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
              dot
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-muted-foreground"
                fontSize={10}
                dataKey={props.firstDataKey}
                formatter={(value: number) => {
                  return numberFormatter(value);
                }}
              />
            </Area>
            <Area
              dataKey={props.secondDataKey}
              type="monotone"
              fill={`var(--color-${props.secondDataKey}`}
              fillOpacity={0.3}
              stroke={`var(--color-${props.secondDataKey}`}
              stackId="b"
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-muted-foreground"
                fontSize={10}
                dataKey={props.secondDataKey}
                formatter={(value: number) => numberFormatter(value)}
              />
            </Area>
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
