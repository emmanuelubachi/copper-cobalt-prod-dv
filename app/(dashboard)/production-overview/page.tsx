"use client";
import { useEffect, useMemo, useState } from "react";
import KPI from "./components/kpi";
import YearToggle from "@/components/year-toggle";
import ExportTrend from "./components/export-trend";
import TopDestinations from "./components/top-destinations";
import ProductionExports from "./components/production-exports";

import { Years } from "@/data/chartData";

import kpiData from "@/data/overview/kpi_data.json";
import trendData from "@/data/overview/kpitrend_year_data.json";
import historyByExporterData from "@/data/overview/exports_history_by_exporter_data_2015-2022.json";
import historyByDestinationData from "@/data/overview/quantity-transaction_history_by_destination-country_2015-2022.json";
import exporterShareData from "@/data/overview/exporters_share_table.json";

import {
  summarizeDestinations,
  transformTrendData,
} from "@/lib/dataProcessing";
import ExportTable from "./components/export-table";
import { ShareButton } from "@/components/elements/shareButton";

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

export type xShareDataProps = {
  product: string;
  exporter: string;
  quantity: number;
  quantity_percent: number;
  transaction: number;
  transaction_percent: number;
}[];

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<string>("2022");
  const [kpi, setKpi] = useState<typeof kpiData>([]);
  const [coXhistory, setCoXhistory] = useState<xhistoryProps[]>([]);
  const [cuXhistory, setCuXhistory] = useState<xhistoryProps[]>([]);
  const [coDestSum, setCoDestSum] = useState<OverviewDestinationSummary[]>([]);
  const [cuDestSum, setCuDestSum] = useState<OverviewDestinationSummary[]>([]);
  const [xshareData, setXshareData] = useState<xShareDataProps>([]);

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

    const fetchExporterShareData = async () => {
      try {
        const filtered = exporterShareData.filter(
          (row) => row.year === selectedYear,
        );

        const data = filtered.map((row) => ({
          product: row.product,
          exporter: row.exporter,
          quantity: parseFloat(row.quantity),
          quantity_percent: parseFloat(
            (parseFloat(row.quantity_percent) * 100).toFixed(2),
          ),
          transaction: parseInt(row.transaction),
          transaction_percent: parseFloat(
            (parseFloat(row.transaction_percent) * 100).toFixed(2),
          ),
        }));

        setXshareData(data);
      } catch (error) {
        console.error(
          "Error fetching and processing total industral projects production data:",
          error,
        );
      }
    };

    fetchkpiData();
    fetchCoDestinationData();
    fetchCuDestinationData();
    fetchHistoryByExporterData();
    fetchExporterShareData();
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
    <main className="mb-24 mt-0 grid items-start gap-6 px-4 sm:mb-20 sm:mt-0 sm:gap-6 sm:px-8">
      <header className="left-0 right-0 z-20 items-center justify-between gap-6 space-y-4 bg-white py-4 dark:bg-neutral-900 lg:sticky lg:top-0 lg:flex lg:space-y-0">
        <h1 className="text-center text-h5 font-medium tracking-tight lg:text-start lg:text-h5 xl:text-h5">
          Copper and Cobalt Production Overview for{" "}
          <span className="border-b-2 border-primary/50 font-black">
            {selectedYear}
          </span>
        </h1>
        <div className="flex items-center justify-center sm:items-start lg:justify-end">
          <div className="flex items-center gap-2">
            <YearToggle
              defaultValue={selectedYear}
              onChangeFunction={setSelectedYear}
              years={Years}
            />
            <ShareButton />
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 md:gap-6">
        {/* KPI Cards */}
        <KPI kpi={kpi} kpiTrend={processedKpiTrendData} />

        <div className="grid items-start gap-4 md:gap-6 xl:grid-cols-3">
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

        <ExportTable data={xshareData} />
      </div>
    </main>
  );
}
