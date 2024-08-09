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
import {
  InteractiveBarChart,
  SingleInteractiveBarChart,
} from "@/components/charts/shadcn/bar-chart/interactive-bar-chart";

import kpiData from "@/data/overview/kpi_data.json";
import historyByExporterData from "@/data/overview/exports_history_by_exporter_data_2015-2022.json";
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
import KPI from "./components/kpi";
import YearToggle from "@/components/year-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type xhistoryProps = {
  // year: string;
  exporter: string;
  quantity: number;
  // transaction: string;
};

const coXhistoryChartConfig = {
  views: {
    label: "Volume",
  },
  quantity: {
    label: "Quantity",
    color: "hsl(var(--chart-6))",
  },
};

const cuXhistoryChartConfig = {
  views: {
    label: "Volume",
  },
  quantity: {
    label: "Quantity",
    color: "hsl(var(--chart-5))",
  },
};

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<string>("2022");
  const [coXhistory, setCoXhistory] = useState<xhistoryProps[]>([]);
  const [cuXhistory, setCuXhistory] = useState<xhistoryProps[]>([]);
  // const [totalProd, setTotalProd] = useState<ProjectSummary[]>([]);
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

    const fetchHistoryByExporterData = async () => {
      try {
        // Filter data based on year
        const filteredhistory = historyByExporterData.filter(
          (row) => row.year === selectedYear,
        );

        // Then filter data based on both product
        const cofiltered: any = filteredhistory.filter(
          (row) => row.product === "Cobalt",
        );
        const cufiltered: any = filteredhistory.filter(
          (row) => row.product === "Copper",
        );

        // Process each data
        const codata: xhistoryProps[] = cofiltered.map((row: any) => ({
          exporter: row.exporter,
          quantity: parseFloat(row.quantity),
        }));
        const cudata: xhistoryProps[] = cufiltered.map((row: any) => ({
          exporter: row.exporter,
          quantity: parseFloat(row.quantity),
        }));

        setCoXhistory(codata);
        setCuXhistory(cudata);
      } catch (error) {
        console.error(
          "Error fetching and processing total industral projects production data:",
          error,
        );
      }
    };

    // const fetchTotalProductionData = async () => {
    //   try {
    //     // Filter data based on _project_id
    //     const exports = totalProductionData.filter(
    //       (row) => row.type === "export",
    //     );

    //     // Process data
    //     const totalProd = calculateProjectSums(exports);

    //     setTotalProd(totalProd);
    //   } catch (error) {
    //     console.error(
    //       "Error fetching and processing total industral projects production data:",
    //       error,
    //     );
    //   }
    // };

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
    fetchHistoryByExporterData();
    // fetchTotalProductionData();
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
          <YearToggle
            defaultValue={selectedYear}
            onChangeFunction={setSelectedYear}
            years={Years}
          />
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 md:gap-4">
        {/* KPI Cards */}
        <KPI kpi={kpi} />

        <div className="grid items-start gap-4 xl:grid-cols-3">
          <div className="space-y-4 xl:col-span-2">
            {/* Total Production Volume Chart */}

            <Tabs defaultValue="cobalt">
              <TabsList>
                <TabsTrigger value="cobalt">Cobalt</TabsTrigger>
                <TabsTrigger value="copper">Copper</TabsTrigger>
              </TabsList>
              <TabsContent value="cobalt">
                <SingleInteractiveBarChart
                  title="Exports of Cobalt by Projects"
                  description={`${selectedYear} Production Volume(T)`}
                  config={coXhistoryChartConfig}
                  chartData={coXhistory}
                  xdataKey="exporter"
                  ydataKey="quantity"
                />
              </TabsContent>
              <TabsContent value="copper">
                <SingleInteractiveBarChart
                  title="Exports of Copper by Projects"
                  description={`${selectedYear} Production Volume(T)`}
                  config={cuXhistoryChartConfig}
                  chartData={cuXhistory}
                  xdataKey="exporter"
                  ydataKey="quantity"
                />
              </TabsContent>
            </Tabs>

            {/* Top Destinations Chart */}
            <section className="grid items-start gap-2 xl:col-span-2">
              <div className="grid gap-4 lg:grid-cols-2">
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
                  // footNote={
                  //   <>
                  //     <div className="leading-none text-muted-foreground">
                  //       Showing top destinations in 2023.
                  //     </div>
                  //   </>
                  // }
                />

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
                  // footNote={
                  //   <>
                  //     <div className="leading-none text-muted-foreground">
                  //       Showing top destinations in 2023.
                  //     </div>
                  //   </>
                  // }
                />
              </div>
            </section>
          </div>

          {/* Eport Trend Cards */}
          <section className="space-y-4">
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
          </section>
        </div>
      </div>
    </main>
  );
}
