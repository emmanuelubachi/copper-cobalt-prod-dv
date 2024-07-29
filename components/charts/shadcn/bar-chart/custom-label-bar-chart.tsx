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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type CustomLabelBarChartProps = {
  title: string;
  description: string;
  config: ChartConfig;
  chartData: any;
  yAxisDataKey: string;
  xAxisDataKey: string;
  barDataKey: string;
  yAxisLabelDataKey: string;
  barLabelDataKey: string;
  footNote?: ReactNode;
};

export default function CustomLabelBarChart({
  ...props
}: CustomLabelBarChartProps) {
  const chartConfig = props.config satisfies ChartConfig;
  //   console.log("chartData", props.chartData);

  const chartData = props.chartData;
  return (
    <Card className="__card">
      <CardHeader className="border-b px-4">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 20,
              //   left: 96,
            }}
          >
            {/* <CartesianGrid horizontal={false} /> */}
            <YAxis
              dataKey={props.yAxisDataKey}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              //   hide
            />
            <XAxis dataKey={props.xAxisDataKey} type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey={props.barDataKey}
              layout="vertical"
              fill={`var(--color-${props.barDataKey})`}
              radius={4}
            >
              {/* <LabelList
                dataKey="destination"
                position="left"
                offset={8}
                className="truncate fill-foreground" //fill-[--color-label]
                fontSize={12}
              /> */}
              <LabelList
                dataKey={props.barLabelDataKey}
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
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
