"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components//ui/chart";

export default function KPIChart({ data, config }: { data: any; config: any }) {
  return (
    <ChartContainer config={config} className="max-h-32 w-full">
      <LineChart
        accessibilityLayer
        margin={{
          left: 2,
          right: 2,
          top: 2,
        }}
        data={data}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke="hsl(var(--muted-foreground))"
          strokeOpacity={0.0}
        />
        <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            return new Date(value).toLocaleDateString("en-US", {
              weekday: "short",
            });
          }}
          hide
        />
        <Line
          dataKey="resting"
          type="natural"
          fill="var(--color-resting)"
          stroke="var(--color-resting)"
          strokeWidth={2}
          dot={false}
          activeDot={{
            fill: "var(--color-resting)",
            stroke: "var(--color-resting)",
            r: 4,
          }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="line"
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
              }}
            />
          }
          cursor={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
