"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

import {
  exportQuantityData,
  exportTransactionData,
  // kpiData,
  Years,
} from "@/data/chartData";

// import { currencyFormatter, quantityFormatter } from "@/lib/utils";
import { InteractiveBarChart } from "@/components/charts/shadcn/bar-chart/interactive-bar-chart";

import kpiData from "@/data/overview/kpi_data.json";
import totalProductionData from "@/data/projects/totals_production_quantity_by_projects_&_type.json";
import cobaltDestinationData from "@/data/map/2023 cobalt production destination - origin situation des.json";
import copperDestinationData from "@/data/map/2023 copper production destination - origin situation des.json";

import {
  calculateDestinationSums,
  calculateProjectSums,
} from "@/lib/dataProcessing";
import {
  coDestSumChartConfig,
  cuDestSumChartConfig,
  exportTrendChartConfig,
  totalXChartConfig,
} from "@/constants/chart";

import { DestinationSummary, ProjectSummary } from "@/types/projects";
import CustomLabelBarChart from "@/components/charts/shadcn/bar-chart/custom-label-bar-chart";
import { LegendAreaChart } from "@/components/charts/shadcn/area-chart/legend-area-chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ProductionKpi from "./components/production_kpi";

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<string>("2022");
  const [totalProd, setTotalProd] = useState<ProjectSummary[]>([]);
  const [kpi, setKpi] = useState<typeof kpiData>([]);
  const [coDestSum, setCoDestSum] = useState<DestinationSummary[]>([]);
  const [cuDestSum, setCuDestSum] = useState<DestinationSummary[]>([]);

  useEffect(() => {
    const fetchkpiData = async () => {
      try {
        // Filter data based on _project_id
        const filtered = kpiData.filter((row) => row.year === selectedYear);

        setKpi(filtered);
      } catch (error) {
        console.error(
          "Error fetching and processing total industral projects production data:",
          error,
        );
      }
    };

    const fetchTotalProductionData = async () => {
      try {
        // Filter data based on _project_id
        const exports = totalProductionData.filter(
          (row) => row.type === "export",
        );

        // Process data
        const totalProd = calculateProjectSums(exports);

        setTotalProd(totalProd);
      } catch (error) {
        console.error(
          "Error fetching and processing total industral projects production data:",
          error,
        );
      }
    };

    const fetchCoDestinationData = async () => {
      try {
        // Filter data based on short_name
        const filtered = calculateDestinationSums(cobaltDestinationData);

        // Process data for chart - sort for top destinations
        setCoDestSum(filtered);
      } catch (error) {
        console.error(
          "Error fetching and processing co destination data:",
          error,
        );
      }
    };

    const fetchCuDestinationData = async () => {
      try {
        // Filter data based on short_name
        const filtered = calculateDestinationSums(copperDestinationData);

        // Process data for chart - sort for top destinations
        setCuDestSum(filtered);
      } catch (error) {
        console.error(
          "Error fetching and processing co destination data:",
          error,
        );
      }
    };

    fetchkpiData();
    fetchTotalProductionData();
    fetchCoDestinationData();
    fetchCuDestinationData();
  }, [selectedYear]);

  return (
    <main className="mb-24 mt-0 grid items-start gap-6 p-4 sm:mb-20 sm:mt-0 sm:gap-6 sm:px-6 sm:py-3">
      <header className="items-center justify-between gap-6 space-y-4 sm:ml-1 lg:flex lg:space-y-0">
        <h1 className="text-h4 font-medium tracking-tight">
          Copper and Cobalt Production Overview for {selectedYear}
        </h1>
        <div className="flex items-start">
          <ToggleGroup
            type="single"
            unselectable="off"
            size={"sm"}
            defaultValue={selectedYear}
            onValueChange={(value) => {
              if (value) setSelectedYear(value);
            }}
            className="rounded-md bg-accent p-1"
          >
            {Years.map((year) => (
              <ToggleGroupItem
                key={year}
                value={year}
                aria-label="Toggle bold"
                className="data-[state=on]:bg-background"
              >
                {year}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 md:gap-4">
        {/* KPI Cards */}
        <ProductionKpi kpi={kpi} />

        <div className="grid items-start gap-4 xl:grid-cols-3">
          {/* Countries/Projects */}
          <div className="space-y-4 xl:col-span-2">
            {/* {totalProd.length > 0 && ( */}
            <InteractiveBarChart
              title="Exports of Cobalt and Copper by Projects"
              description="2023 Production Volume(T)"
              config={totalXChartConfig}
              chartData={totalProd}
              firstDataKey="Cobalt"
              secondDataKey="Copper"
            />
            {/* )} */}

            <section className="grid items-start gap-2 xl:col-span-2">
              <div className="grid gap-4 lg:grid-cols-2">
                {/* {coDestSum.length > 0 && ( */}
                <CustomLabelBarChart
                  title="Top Destinations of Cobalt Production in 2023"
                  description="Quantity in Tonnes"
                  config={coDestSumChartConfig}
                  chartData={coDestSum}
                  yAxisDataKey="destination"
                  xAxisDataKey="totalQuantityTons"
                  barDataKey="totalQuantityTons"
                  yAxisLabelDataKey="Cobalt"
                  barLabelDataKey="label"
                  footNote={
                    <>
                      <div className="leading-none text-muted-foreground">
                        Showing top destinations in 2023.
                      </div>
                    </>
                  }
                />
                {/* )} */}

                {/* {coDestSum.length > 0 && ( */}
                <CustomLabelBarChart
                  title="Top Destinations of Copper Production in 2023"
                  description="Quantity in Tonnes"
                  config={cuDestSumChartConfig}
                  chartData={cuDestSum}
                  yAxisDataKey="destination"
                  xAxisDataKey="totalQuantityTons"
                  barDataKey="totalQuantityTons"
                  yAxisLabelDataKey="Copper"
                  barLabelDataKey="label"
                  footNote={
                    <>
                      <div className="leading-none text-muted-foreground">
                        Showing top destinations in 2023.
                      </div>
                    </>
                  }
                />
                {/* )} */}
              </div>
            </section>
          </div>

          {/* Eport Trend Cards */}
          <section className="space-y-4">
            {/* <Tabs className="" defaultValue="quantity">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="quantity">Quantity</TabsTrigger>
                  <TabsTrigger value="transaction">Transaction</TabsTrigger>
                </TabsList>
              </div> */}

            {/* <TabsContent value="quantity"> */}
            <Card className="__card">
              <LegendAreaChart
                title="Export Trend"
                description="Total quantity of exported products."
                config={exportTrendChartConfig}
                chartData={exportQuantityData}
                xAxisDataKey="date"
                firstDataKey="Cobalt"
                secondDataKey="Copper"
                formatter="quantityFormatter"
                // footNote={
                //   <div className="leading-none text-muted-foreground">
                //     Includes quantities both exported and sold locally.
                //   </div>
                // }
              />
              {/* <Card className="__card">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Export Trend</CardTitle>
                  <CardDescription>
                    Total quantity of exported products.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <AreaChartRender
                  data={exportQuantityData}
                  valueFormatter="quantityFormatter"
                />
              </CardContent>
            </Card> */}
              {/* </TabsContent> */}

              {/* <TabsContent value="transaction"> */}
              <LegendAreaChart
                title="Export Trend"
                description="Total quantity of exported products."
                config={exportTrendChartConfig}
                chartData={exportTransactionData}
                xAxisDataKey="date"
                firstDataKey="Cobalt"
                secondDataKey="Copper"
                formatter="quantityFormatter"
              />
            </Card>
            {/* <Card className="__card">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Export Trend</CardTitle>
                  <CardDescription>
                    Total value of exported products.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <AreaChartRender
                  data={exportTransactionData}
                  valueFormatter={"currencyFormatter"}
                />
              </CardContent>
            </Card> */}
            {/* </TabsContent> */}
            {/* </Tabs> */}

            {/* <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader className="min-h-14">
              <CardTitle className="flex min-h-14 items-start pt-2">
                Countries present in the copper and cobalt sector in the DRC
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <BarListChart title={"DRC"} />
            </CardContent>
          </Card> */}
          </section>
        </div>
      </div>
    </main>
  );
}
