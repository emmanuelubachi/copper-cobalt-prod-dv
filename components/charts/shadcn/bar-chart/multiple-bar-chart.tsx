"use client";
import { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { cn, formatNumberWithCommas, numberFormatter } from "@/lib/utils";

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

type MultipleBarChartProps = {
  title: string;
  description: string;
  config: ChartConfig;
  chartData: any;
  firstDataKey: string;
  secondDataKey?: string;
  footNote?: ReactNode;
  classname?: string;
  domain?: [number, number];
};

import useDeviceType from "@/hooks/useDeviceType";

export default function MultipleBarChart({ ...props }: MultipleBarChartProps) {
  const chartConfig = props.config satisfies ChartConfig;

  const chartData = props.chartData;

  return (
    <Card className="__card">
      <CardHeader className="border-b px-4">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className={cn("aspect-auto h-[250px] w-full", props.classname)}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey={props.firstDataKey}
              fill={`var(--color-${props.firstDataKey}`}
              radius={4}
            />
            <Bar
              dataKey={props.secondDataKey || props.firstDataKey}
              fill={`var(--color-${props.secondDataKey}`}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {props.footNote && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {props.footNote}
        </CardFooter>
      )}
    </Card>
  );
}

export function MultipleBarChart2({ ...props }: MultipleBarChartProps) {
  const { isMobile } = useDeviceType();
  const chartConfig = props.config satisfies ChartConfig;

  const chartData = props.chartData;

  return (
    <Card className="__card">
      <CardHeader className="border-b px-4">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className={cn("aspect-auto h-96 w-full", props.classname)}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="horizontal"
            margin={{
              top: 25,
              right: 0,
              bottom: 0,
              left: -20,
            }}
          >
            <CartesianGrid vertical={false} />

            <YAxis
              dataKey="quantity"
              type="number"
              tickFormatter={(value) => `${numberFormatter(value)}\u00a0t`}
              domain={props.domain}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey={props.firstDataKey}
              fill={`var(--color-${props.firstDataKey}`}
              radius={4}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={isMobile ? 10 : 12}
                formatter={(value: number) => formatNumberWithCommas(value)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {props.footNote && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {props.footNote}
        </CardFooter>
      )}
    </Card>
  );
}
