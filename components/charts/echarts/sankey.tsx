"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";
import { useTheme } from "next-themes";

export default function SankeyChart({ data }: any) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  console.log("sankey data", data);
  return (
    <ReactEcharts
      style={{ height: "1100px", width: "100%" }}
      option={{
        tooltip: {
          trigger: "item",
        },
        height: 1000,

        series: [
          {
            type: "sankey",
            layout: "none",
            height: 1000,
            emphasis: {
              focus: "adjacency",
            },
            left: 10,
            top: 20,
            right: 80,
            bottom: 20,
            data: data[0].data,
            links: data[1].links,
          },
        ],
        lineStyle: {
          color: "source",
          curveness: 0.5,
        },
        itemStyle: {
          color: "#1f77b4",
          borderColor: "#1f77b4",
        },
        label: {
          color: isDarkMode ? "#ffffff" : "rgba(0,0,0,0.7)",
          fontFamily: "Arial",
          fontSize: 8,
        },
      }}
    />
  );
}
