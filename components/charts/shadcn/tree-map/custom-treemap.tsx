"use client";
import { ReactNode } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

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

type TreeMapChartProps = {
  title: string;
  description: string;
  config: ChartConfig;
  chartData: any;
  footNote?: ReactNode;
  classname?: string;
};

// interface CustomizedContentProps {
//   root: any;
//   depth: number;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   index: number;
//   name: string;
// }
const COLORS = [
  "#8889DD",
  "#9597E4",
  "#8DC77B",
  "#A5D297",
  "#E2CF45",
  "#F8C12D",
];

const CustomizedContent = ({
  root,
  depth,
  x,
  y,
  width,
  height,
  index,
  name,
}: any) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill:
            depth < 2
              ? COLORS[Math.floor((index / root.children.length) * 6)]
              : "#ffffff00",
          stroke: "#fff",
          strokeWidth: 1 / (depth + 1e-10),
          strokeOpacity: 0.5 / (depth + 1e-10),
        }}
      />
      {depth === 1 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
          {/* <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={16}
            fillOpacity={0.9}
          >
            {index + 1}
          </text> */}
        </>
      )}
    </g>
  );
};

const TooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="treemap-custom-tooltip rounded-md bg-white p-2 dark:bg-black">
        <p className="font-bold">{`${payload[0].payload.root.name}`}</p>
        <p>{`${payload[0].payload.name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function TreeMapChart({ ...props }: TreeMapChartProps) {
  const chartConfig = props.config satisfies ChartConfig;

  return (
    <Card className="__card">
      <CardHeader className="border-b px-4">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center px-4 pt-4 sm:px-6 sm:pb-8 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className={cn(
            "aspect-auto h-[420px] w-[98%] rounded-lg",
            props.classname,
          )}
        >
          <ResponsiveContainer>
            <Treemap
              nameKey="name"
              width={400}
              height={400}
              data={props.chartData}
              dataKey="size"
              stroke="#fff"
              fill="#8884d8"
              content={<CustomizedContent />}
            >
              <Tooltip content={<TooltipContent />} />
            </Treemap>
          </ResponsiveContainer>
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
