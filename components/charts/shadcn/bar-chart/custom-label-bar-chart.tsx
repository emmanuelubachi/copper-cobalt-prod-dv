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
import {
  numberFormatter,
  quantityFormatter,
  quantityFormatterT,
} from "@/lib/utils";

type CustomLabelBarChartProps = {
  title: string;
  description: string;
  config: ChartConfig;
  chartData: any;
  yAxisDataKey: string;
  xAxisDataKey: string;
  // barDataKey: string;
  // yAxisLabelDataKey: string;
  // barLabelDataKey: string;
  footNote?: ReactNode;
};

export default function CustomLabelBarChart({
  ...props
}: CustomLabelBarChartProps) {
  const chartConfig = props.config satisfies ChartConfig;
  const chartData = props.chartData;

  const maxValue = Math.max(
    ...chartData.map((item: any) => item[props.xAxisDataKey]),
  );

  console.log("maxValue:", maxValue);

  return (
    <Card className="__card">
      <CardHeader className="border-b px-4">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[400px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            // margin={{ right: 30, left: 20, bottom: 5 }}
            margin={{
              right: 50,
              left: 98,
            }}
          >
            {/* <CartesianGrid horizontal={false} /> */}
            <YAxis
              dataKey={props.yAxisDataKey}
              type="category"
              tickLine={false}
              tickMargin={2}
              minTickGap={1}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 12)}
              hide
            />
            <XAxis
              dataKey={props.xAxisDataKey}
              type="number"
              tickFormatter={numberFormatter}
              domain={[0, maxValue]}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  cursor={false}
                  // label={props.yAxisLabelDataKey}
                  formatter={(value, name) => (
                    <>
                      <div className="flex min-w-[130px] items-center gap-1 text-xs text-muted-foreground">
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                          style={
                            {
                              "--color-bg": `var(--color-${name})`,
                            } as React.CSSProperties
                          }
                        />
                        {chartConfig[name as keyof typeof chartConfig]?.label ||
                          name}
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {numberFormatter(parseFloat(value as string))}
                        </div>
                      </div>
                    </>
                  )}
                />
              }
            />
            <Bar
              dataKey={props.xAxisDataKey}
              layout="vertical"
              fill={`var(--color-${props.xAxisDataKey})`}
              radius={4}
            >
              <LabelList
                dataKey={props.yAxisDataKey}
                position="left"
                offset={8}
                className="ml-2 line-clamp-1 truncate fill-foreground/80"
                fontSize={12}
                textAnchor="start"
                style={{ whiteSpace: "nowrap" }}
              />
              <LabelList
                dataKey={props.xAxisDataKey}
                position="right"
                offset={8}
                className="truncate fill-foreground/80"
                fontSize={12}
                formatter={numberFormatter}
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
