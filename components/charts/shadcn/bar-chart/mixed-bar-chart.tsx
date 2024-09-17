"use client";

import { ReactNode } from "react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

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
import { formatNumberWithCommas } from "@/lib/utils";

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
    <Card className="border-none shadow-none dark:bg-neutral-900/50">
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
              right: 45,
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
            >
              <LabelList
                dataKey="copper"
                position="right"
                fill="white"
                formatter={(value: number) => {
                  if (value) {
                    return `${formatNumberWithCommas(value)}\u00A0t`;
                  }
                }}
              />
            </Bar>
            <Bar
              dataKey="cobalt"
              layout="vertical"
              radius={5}
              fill={`var(--color-cobalt)`}
            >
              <LabelList
                dataKey="cobalt"
                position="right"
                fill="white"
                formatter={(value: number) => {
                  if (value) {
                    return `${formatNumberWithCommas(value)}\u00A0t`;
                  }
                }}
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
