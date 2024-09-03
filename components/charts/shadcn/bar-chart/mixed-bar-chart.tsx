"use client";

import { ReactNode } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type MixedBarChartProps = {
  title: string;
  description?: string;
  config: ChartConfig;
  chartData: any[];
  footNote?: ReactNode;
};

export default function MixedBarChart({ ...props }: MixedBarChartProps) {
  const chartConfig = props.config satisfies ChartConfig;

  return (
    <Card className="border-none shadow-none dark:bg-neutral-900">
      <CardHeader className="border-b px-4">
        <CardTitle>{props.title}</CardTitle>
        {/* <CardDescription>{props.description}</CardDescription> */}
      </CardHeader>
      <CardContent className="px-4 pt-1 sm:px-6 sm:pt-2">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={props.chartData}
            layout="vertical"
            margin={{
              right: 30,
              left: 30,
            }}
          >
            <YAxis
              dataKey="destination"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) =>
              //   (
              //     chartConfig[value as keyof typeof chartConfig]?.label || ""
              //   ).toString()
              // }
            />
            {/* <XAxis dataKey="cobalt" type="number" hide /> */}
            <XAxis dataKey="copper" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="copper"
              layout="vertical"
              radius={5}
              fill={`var(--color-copper`}
            />
            <Bar
              dataKey="cobalt"
              layout="vertical"
              radius={5}
              fill={`var(--color-cobalt)`}
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
