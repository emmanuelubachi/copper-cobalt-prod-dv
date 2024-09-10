"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";
import { useTheme } from "next-themes";

/**
 * A Sankey chart component that renders a Sankey chart using the ECharts library.
 *
 * @param {Object} props Component props.
 * @param {any} props.data The data to be rendered as a Sankey chart.
 * @param {string} [props.height] The height of the chart in pixels.
 * @returns {ReactElement} The Sankey chart component.
 */
export default function SankeyChart({
  data,
  height,
}: {
  data: any;
  height: number;
}) {
  const { theme, systemTheme } = useTheme();
  const isDarkMode =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <ReactEcharts
      style={{
        height: `${height + 30 + "px"}`,
        width: "100%",
      }}
      option={{
        tooltip: {
          trigger: "item",
        },

        height: height,

        series: [
          {
            type: "sankey",
            layout: "none",
            height: height,
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
