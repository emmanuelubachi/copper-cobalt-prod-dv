"use client";
import { useEffect, useMemo, useState } from "react";
import KPI from "./components/kpi";
import YearToggle from "@/components/year-toggle";
import ExportTrend from "./components/export-trend";
import TopDestinations from "./components/top-destinations";
import ProductionExports from "./components/production-exports";

import {
  Years,
  exportQuantityData,
  exportTransactionData,
} from "@/data/chartData";

import kpiData from "@/data/overview/kpi_data.json";
import trendData from "@/data/overview/kpitrend_year_data.json";
import historyByExporterData from "@/data/overview/exports_history_by_exporter_data_2015-2022.json";
import historyByDestinationData from "@/data/overview/quantity-transaction_history_by_destination-country_2015-2022.json";

import {
  summarizeDestinations,
  transformTrendData,
} from "@/lib/dataProcessing";

export type kpiTrendProps = {
  date: string;
  quantity: number;
  transaction: number;
  product: string;
}[];
type xhistoryProps = {
  exporter: string;
  quantity: number;
};

export type OverviewDestinationSummary = {
  short_destination: string;
  long_destination: string;
  quantity: number;
  transaction: number;
};

export type quantityTrendProps = {
  date: string;
  quantity: number;
  product: string;
}[];

export type transactionTrendProps = {
  date: string;
  transaction: number;
  product: string;
}[];

export type InputData = {
  date: string;
  quantity?: string;
  transaction?: string;
  product: string;
}[];

export type TransformedData = {
  date: string;
  Cobalt?: number;
  Copper?: number;
}[];

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<string>("2022");
  const [kpi, setKpi] = useState<typeof kpiData>([]);
  const [coXhistory, setCoXhistory] = useState<xhistoryProps[]>([]);
  const [cuXhistory, setCuXhistory] = useState<xhistoryProps[]>([]);
  const [coDestSum, setCoDestSum] = useState<OverviewDestinationSummary[]>([]);
  const [cuDestSum, setCuDestSum] = useState<OverviewDestinationSummary[]>([]);

  // Memoize processedKpiTrendData to avoid unnecessary recalculations
  const processedKpiTrendData: kpiTrendProps = useMemo(() => {
    return trendData.map((row) => ({
      date: row.date,
      quantity: parseFloat(row.quantity),
      transaction: parseFloat(row.transaction),
      product: row.product,
    }));
  }, []);

  useEffect(() => {
    const fetchkpiData = async () => {
      try {
        // Filter kpi data by year
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
        const cofiltered: xhistoryProps[] = filteredhistory
          .filter((row) => row.product === "Cobalt")
          .map((row: any) => ({
            exporter: row.exporter,
            quantity: parseFloat(row.quantity),
          }));

        const cufiltered: xhistoryProps[] = filteredhistory
          .filter((row) => row.product === "Copper")
          .map((row: any) => ({
            exporter: row.exporter,
            quantity: parseFloat(row.quantity),
          }));

        setCoXhistory(cofiltered);
        setCuXhistory(cufiltered);
      } catch (error) {
        console.error(
          "Error fetching and processing production exports by projects data:",
          error,
        );
      }
    };

    const fetchCoDestinationData = async () => {
      try {
        // Filter data
        const filter1 = historyByDestinationData.filter(
          (row) => row.year === selectedYear,
        );

        const filter2 = filter1
          .filter((row) => row.product === "Cobalt")
          .map((row) => ({
            short_destination: row.short_destination,
            long_destination: row.long_destination,
            quantity: parseFloat(row.quantity),
            transaction: parseFloat(row.transaction),
          }));

        // Process data: sum by destination and sort for top quntity or transaction
        const coDestData = summarizeDestinations(filter2);

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
        const filter1 = historyByDestinationData.filter(
          (row) => row.year === selectedYear,
        );

        const filter2 = filter1
          .filter((row) => row.product === "Copper")
          .map((row) => ({
            short_destination: row.short_destination,
            long_destination: row.long_destination,
            quantity: parseFloat(row.quantity),
            transaction: parseFloat(row.transaction),
          }));

        // Process data for chart - sort for top destinations
        const cuDestData = summarizeDestinations(filter2);

        setCuDestSum(cuDestData);
      } catch (error) {
        console.error(
          "Error fetching and processing cu destination data:",
          error,
        );
      }
    };

    fetchkpiData();
    fetchCoDestinationData();
    fetchCuDestinationData();
    fetchHistoryByExporterData();
  }, [selectedYear]);

  // Memoize quantityTrendData to avoid unnecessary recalculations
  const quantityTrendData: TransformedData = useMemo(() => {
    const data: InputData = trendData.map((row) => ({
      date: row.date,
      quantity: row.quantity,
      product: row.product,
    }));
    return transformTrendData(data);
  }, []);

  // Memoize transactionTrendData to avoid unnecessary recalculations
  const transactionTrendData: TransformedData = useMemo(() => {
    const data: InputData = trendData.map((row) => ({
      date: row.date,
      transaction: row.transaction,
      product: row.product,
    }));
    return transformTrendData(data);
  }, []);

  return (
    <main className="mb-24 mt-0 grid items-start gap-6 p-4 sm:mb-20 sm:mt-0 sm:gap-6 sm:px-6 sm:py-3">
      <header className="left-0 right-0 z-20 items-center justify-between gap-6 space-y-4 rounded-lg bg-white p-4 dark:bg-muted lg:sticky lg:top-4 lg:flex lg:space-y-0">
        <h1 className="text-h4 font-medium tracking-tight">
          Copper and Cobalt Production Overview for{" "}
          <span className="border-b-2 border-primary/50 font-black">
            {selectedYear}
          </span>
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
        <KPI kpi={kpi} kpiTrend={processedKpiTrendData} />

        <div className="grid items-start gap-4 xl:grid-cols-3">
          <div className="space-y-4 xl:col-span-2">
            {/* Exports Production by Projects Chart */}
            <ProductionExports
              selectedYear={selectedYear}
              coXhistory={coXhistory}
              cuXhistory={cuXhistory}
            />

            {/* Top Destinations Chart */}
            <TopDestinations
              selectedYear={selectedYear}
              coDestSum={coDestSum}
              cuDestSum={cuDestSum}
            />
          </div>

          {/* Eport Trend Cards */}
          <ExportTrend
            exportQuantityData={quantityTrendData}
            exportTransactionData={transactionTrendData}
          />
        </div>
      </div>
    </main>
  );
}
