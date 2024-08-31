"use client";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components//ui/chart";

export default function KPIChart({
  data,
  config,
  yAxis,
}: {
  data: any;
  config: any;
  yAxis: string;
}) {
  return (
    <ChartContainer config={config} className="max-h-32 w-full">
      <LineChart
        accessibilityLayer
        margin={{
          left: 12,
          right: 12,
          top: 20,
          bottom: 10,
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
          hide={true}
          tickFormatter={(value) => {
            return new Date(value).toLocaleDateString("en-US", {
              year: "numeric",
            });
          }}
        />
        <Line
          dataKey={yAxis}
          type="natural"
          fill={`var(--color-${yAxis})`}
          stroke={`var(--color-${yAxis})`}
          strokeWidth={2}
          dot={{ fill: `var(--color-${yAxis})` }}
          activeDot={{
            fill: `var(--color-${yAxis})`,
            stroke: `var(--color-${yAxis})`,
            r: 4,
          }}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-muted-foreground"
            fontSize={10}
            dataKey="date"
            formatter={(value: keyof typeof config) => config[value]?.label}
          />
        </Line>
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="line"
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  // day: "numeric",
                  // month: "long",
                  year: "numeric",
                });
              }}
              // formatter={(value, name) => {
              //   return (
              //     <div>
              //       <span>{name}:</span>
              //       {quantityFormatter(value)}
              //     </div>
              //   );
              // }}
            />
          }
          cursor={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
