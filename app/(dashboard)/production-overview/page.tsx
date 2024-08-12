"use client";
import { useEffect, useState } from "react";
import YearToggle from "@/components/year-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingleInteractiveBarChart } from "@/components/charts/shadcn/bar-chart/interactive-bar-chart";
import { Years } from "@/data/chartData";
import kpiData from "@/data/overview/kpi_data.json";
import historyByExporterData from "@/data/overview/exports_history_by_exporter_data_2015-2022.json";
import totalProductionData from "@/data/projects/totals_production_quantity_by_projects_&_type.json";
import cobaltDestinationData from "@/data/overview/quantity-transaction_history_by_destination-country_2015-2022.json";
import copperDestinationData from "@/data/overview/quantity-transaction_history_by_destination-country_2015-2022.json";
// import cobaltDestinationData from "@/data/map/2023 cobalt production destination - origin situation des.json";
// import copperDestinationData from "@/data/map/2023 copper production destination - origin situation des.json";
import { exportQuantityData, exportTransactionData } from "@/data/chartData";
import KPI from "./components/kpi";
import TopDestinations from "./components/top-destinations";
import ExportTrend from "./components/export-trend";
import { calculateDestinationSums } from "@/lib/dataProcessing";
import { DestinationSummary } from "@/types/projects";

type xhistoryProps = {
  exporter: string;
  quantity: number;
  // transaction: string;
};

const coXhistoryChartConfig = {
  views: {
    label: "Quantity",
  },
  quantity: {
    label: "Quantity",
    color: "hsl(var(--chart-6))",
  },
};

const cuXhistoryChartConfig = {
  views: {
    label: "Quantity",
  },
  quantity: {
    label: "Quantity",
    color: "hsl(var(--chart-5))",
  },
};

type OverviewDestinationSummary = {
  short_destination: string;
  long_destination: string;
  quantity: number;
  transaction: number;
};

function summarizeDestinations(
  data: OverviewDestinationSummary[],
  sortBy?: "quantity" | "transaction",
): OverviewDestinationSummary[] {
  const summaryMap = new Map<string, OverviewDestinationSummary>();

  data.forEach((item) => {
    const existing = summaryMap.get(item.short_destination);

    if (existing) {
      existing.quantity += item.quantity;
      existing.transaction += item.transaction;
    } else {
      summaryMap.set(item.short_destination, { ...item });
    }
  });

  let summarizedData = Array.from(summaryMap.values());

  if (sortBy) {
    summarizedData.sort((a, b) => b[sortBy] - a[sortBy]);
  } else {
    summarizedData.sort((a, b) => b.quantity - a.quantity);
  }

  return summarizedData;
}

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<string>("2022");
  const [kpi, setKpi] = useState<typeof kpiData>([]);
  const [coXhistory, setCoXhistory] = useState<xhistoryProps[]>([]);
  const [cuXhistory, setCuXhistory] = useState<xhistoryProps[]>([]);
  const [coDestSum, setCoDestSum] = useState<OverviewDestinationSummary[]>([]);
  const [cuDestSum, setCuDestSum] = useState<OverviewDestinationSummary[]>([]);

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

    const fetchCoDestinationData = async () => {
      try {
        // Filter data
        const filter1 = cobaltDestinationData.filter(
          (row) => row.year === selectedYear,
        );

        const filter2 = filter1.filter((row) => row.product === "Cobalt");

        const filtered = filter2.map((row) => ({
          short_destination: row.short_destination,
          long_destination: row.long_destination,
          quantity: parseFloat(row.quantity),
          transaction: parseFloat(row.transaction),
        }));

        // Process data: sum by destination and sort for top quntity or transaction
        const coDestData = summarizeDestinations(filtered);

        setCoDestSum(coDestData);
      } catch (error) {
        console.error(
          "Error fetching and processing co destination data:",
          error,
        );
      }
    };

    const fetchCuDestinationData = async () => {
      try {
        // Filter data
        const filter1 = cobaltDestinationData.filter(
          (row) => row.year === selectedYear,
        );

        const filter2 = filter1.filter((row) => row.product === "Copper");

        const filtered = filter2.map((row) => ({
          short_destination: row.short_destination,
          long_destination: row.long_destination,
          quantity: parseFloat(row.quantity),
          transaction: parseFloat(row.transaction),
        }));

        // Process data for chart - sort for top destinations

        const cuDestData = summarizeDestinations(filtered);

        setCuDestSum(cuDestData);
      } catch (error) {
        console.error(
          "Error fetching and processing co destination data:",
          error,
        );
      }
    };

    fetchkpiData();
    fetchCoDestinationData();
    fetchCuDestinationData();
    fetchHistoryByExporterData();
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
                  description={`${selectedYear} Production Quantity(T)`}
                  config={coXhistoryChartConfig}
                  chartData={coXhistory}
                  xdataKey="exporter"
                  ydataKey="quantity"
                />
              </TabsContent>
              <TabsContent value="copper">
                <SingleInteractiveBarChart
                  title="Exports of Copper by Projects"
                  description={`${selectedYear} Production Quantity(T)`}
                  config={cuXhistoryChartConfig}
                  chartData={cuXhistory}
                  xdataKey="exporter"
                  ydataKey="quantity"
                />
              </TabsContent>
            </Tabs>

            {/* Top Destinations Chart */}
            <TopDestinations
              selectedYear={selectedYear}
              coDestSum={coDestSum}
              cuDestSum={cuDestSum}
            />
          </div>

          {/* Eport Trend Cards */}
          <ExportTrend
            exportQuantityData={exportQuantityData}
            exportTransactionData={exportTransactionData}
          />
        </div>
      </div>
    </main>
  );
}
