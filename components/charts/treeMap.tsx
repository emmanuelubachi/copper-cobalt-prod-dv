"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Treemap() {
  const option = {
    series: [
      {
        type: "treemap",
        data: [
          {
            name: "nodeA", // First tree
            value: 10,
            children: [
              {
                name: "nodeAa", // First leaf of first tree
                value: 4,
              },
              {
                name: "nodeAb", // Second leaf of first tree
                value: 6,
              },
            ],
          },
          {
            name: "nodeB", // Second tree
            value: 20,
            children: [
              {
                name: "nodeBa", // Son of first tree
                value: 20,
                children: [
                  {
                    name: "nodeBa1", // Granson of first tree
                    value: 20,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <ReactEcharts
      option={option}
      className="min-h-96 w-full"
      opts={{ renderer: "svg" }}
    />
  );
}
