"use client";
import React, { useState } from "react";
import ProductToggle from "@/components/product-toggle";
import SankeyChart from "@/components/charts/echarts/sankey";
import { CardContent, Card, CardHeader } from "@/components/ui/card";
import YearToggle from "@/components/year-toggle";
import useDeviceType from "@/hooks/useDeviceType";

function shortenText(text: string): string {
  return text.split(" ")[0];
}

export default function ExportFlow({
  data,
  data2,
  hasYear = true,
}: {
  data: any[];
  data2: any[];
  hasYear?: boolean;
}) {
  const { isMobile, isTablet } = useDeviceType();
  const [selectedYear, setSelectedYear] = useState<string>("2023");
  const [selectedProduct, setSelectedProduct] = useState<string>("Cobalt");

  const years = ["2022", "2023"];

  hasYear
    ? (data = data.filter((d) => d.year === selectedYear))
    : (data = data);

  const exportFlowData = data
    // .filter((d) => d.year === selectedYear)
    .filter((d) => d.product === selectedProduct)
    .map((d) => ({
      source: isTablet || isMobile ? d._project_id : d.project,
      target: isTablet || isMobile ? shortenText(d.importer) : d.importer,
      value: parseFloat(d.quantity),
    }));
  // .sort((a, b) => b.value - a.value); // Sort by quantity descending

  hasYear
    ? (data2 = data2.filter((d) => d.year === selectedYear))
    : (data2 = data2);

  const importerFlowData = data2
    // .filter((d) => d.year === selectedYear)
    .filter((d) => d.product === selectedProduct)
    .map((d) => ({
      source: isTablet || isMobile ? shortenText(d.importer) : d.importer,
      target: d.destination,
      value: parseFloat(d.quantity),
    }))
    .sort((a, b) => b.value - a.value); // Sort by quantity descending

  const sources = exportFlowData.map((d) => ({
    name: d.source,
    itemStyle: {
      color: "#f63185",
      borderColor: "#f63185",
    },
  }));

  const targets = exportFlowData.map((d) => ({
    name: d.target,
    itemStyle: {
      color: "#6E6A68",
      borderColor: "#6E6A68",
    },
  }));

  const importTarget = importerFlowData.map((d) => ({
    name: d.target,
    itemStyle: {
      color: "#ac7430",
      borderColor: "#ac7430",
    },
  }));

  // Merge sources and targets, then remove duplicates by converting to a Set and back to an array
  const _data = Array.from(
    new Set(
      [...sources, ...targets, ...importTarget].map((item) =>
        JSON.stringify(item),
      ),
    ),
  ).map((item) => JSON.parse(item));

  // Combine and sort the links
  const _links = [...exportFlowData, ...importerFlowData];

  const sankeyData = [
    {
      data: _data,
    },
    {
      links: _links,
    },
  ];

  return (
    <>
      {hasYear && (
        <div className="z-20 flex items-center justify-between gap-6 space-y-4 py-4 lg:space-y-0">
          <h2 className="text-start text-h5 font-medium tracking-tight">
            {`${selectedYear} Export Flows`}
          </h2>
          <div>
            <YearToggle
              years={years}
              value={selectedYear}
              onChangeFunction={setSelectedYear}
            />
          </div>
        </div>
      )}

      <Card className="__card">
        <CardHeader>
          <div className="flex items-center justify-end">
            <ProductToggle
              defaultValue={selectedProduct}
              onValueChange={setSelectedProduct}
            />
          </div>
        </CardHeader>
        <CardContent className="">
          <SankeyChart data={sankeyData} />
        </CardContent>
      </Card>
    </>
  );
}
