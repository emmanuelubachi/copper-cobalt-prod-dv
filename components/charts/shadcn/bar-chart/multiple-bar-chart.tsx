"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  secondDataKey: string;
};

export default function MultipleBarChart({ ...props }: MultipleBarChartProps) {
  const chartConfig = props.config satisfies ChartConfig;

  const chartData = props.chartData;

  return (
    <Card className="m-0 border-none bg-muted/50 shadow-none">
      <CardHeader className="border-b px-4">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig}>
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
              dataKey={props.secondDataKey}
              fill={`var(--color-${props.secondDataKey}`}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
