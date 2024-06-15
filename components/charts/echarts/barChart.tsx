"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";

export default function BarChart() {
  const option = {
    yAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 5, // only the largest 3 bars will be displayed
    },
    xAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        realtimeSort: true,
        tooltip: true,
        onclick,
      },
    ],
  };

  return (
    <ReactEcharts
      option={option}
      className="min-h-80"
      opts={{ renderer: "svg" }}
    />
  );
}
