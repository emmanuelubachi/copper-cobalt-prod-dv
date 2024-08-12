"use client";
import { useMemo } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DollarSign, Weight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import KPIChart from "./card-chart";
import { currencyFormatter, quantityFormatter } from "@/lib/utils";
import { kpiTrendProps } from "../page";

type kpiDataProp = {
  year: string;
  product: string;
  quantity: string;
  transaction: string;
}[];

const coQuantityConfig = {
  quantity: {
    label: "T",
    color: "hsl(var(--chart-6))",
  },
};
const coTransactionConfig = {
  transaction: {
    label: "$",
    color: "hsl(var(--chart-6))",
  },
};
const cuQuantityConfig = {
  quantity: {
    label: "T",
    color: "hsl(var(--chart-5))",
  },
};
const cuTransactionConfig = {
  transaction: {
    label: "$",
    color: "hsl(var(--chart-5))",
  },
};

export default function KPI({
  kpi,
  kpiTrend,
}: {
  kpi: kpiDataProp;
  kpiTrend: kpiTrendProps;
}) {
  // Memoize data processing to prevent unnecessary recalculations
  const cobaltData = useMemo(
    () => kpi.filter((row) => row.product === "Cobalt"),
    [kpi],
  );
  const copperData = useMemo(
    () => kpi.filter((row) => row.product === "Copper"),
    [kpi],
  );

  const cobaltDataTrend = useMemo(
    () => kpiTrend.filter((row) => row.product === "Cobalt"),
    [kpiTrend],
  );
  const copperDataTrend = useMemo(
    () => kpiTrend.filter((row) => row.product === "Copper"),
    [kpiTrend],
  );

  const cobaltQuantityTrend = useMemo(
    () =>
      cobaltDataTrend.map((row) => ({
        date: row.date,
        quantity: parseInt(row.quantity.toFixed(0)),
      })),
    [cobaltDataTrend],
  );

  const cobaltTransactionTrend = useMemo(
    () =>
      cobaltDataTrend.map((row) => ({
        date: row.date,
        transaction: row.transaction,
      })),
    [cobaltDataTrend],
  );

  const copperQuantityTrend = useMemo(
    () =>
      copperDataTrend.map((row) => ({
        date: row.date,
        quantity: parseInt(row.quantity.toFixed(0)),
      })),
    [copperDataTrend],
  );

  const copperTransactionTrend = useMemo(
    () =>
      copperDataTrend.map((row) => ({
        date: row.date,
        transaction: row.transaction,
      })),
    [copperDataTrend],
  );

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cobaltData.length > 0 ? (
        <Card className="__card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h2 className="text-sm font-bold leading-none tracking-wider text-blue-700 dark:text-blue-400">
              Cobalt
            </h2>

            {/* {<Weight className="m-2 h-6 w-6 text-chart6/50" />} */}
          </CardHeader>
          <CardContent className="__card-content">
            <h3 className="text-h4 font-bold">
              {quantityFormatter(parseFloat(cobaltData[0].quantity))}{" "}
              <span className="text-h6 text-muted-foreground">Tonnes</span>
            </h3>
            <KPIChart
              data={cobaltQuantityTrend}
              config={coQuantityConfig}
              yAxis="quantity"
            />
            <p className="text-xs text-muted-foreground">
              Total Quantities Cobalt (T)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className="__card h-32" />
      )}

      {cobaltData.length > 0 ? (
        <Card className="__card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h2 className="text-sm font-bold leading-none tracking-wider text-blue-700 dark:text-blue-400">
              Cobalt
            </h2>
            {/* {<DollarSign className="m-2 h-6 w-6 text-chart6/50" />} */}
          </CardHeader>
          <CardContent className="__card-content">
            <h3 className="text-h4 font-bold">
              {currencyFormatter(parseFloat(cobaltData[0].transaction))}{" "}
            </h3>
            <KPIChart
              data={cobaltTransactionTrend}
              config={coTransactionConfig}
              yAxis="transaction"
            />
            <p className="text-xs text-muted-foreground">
              Total Cobalt Transaction (USD)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className="__card h-32" />
      )}

      {copperData.length > 0 ? (
        <Card className="__card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h2 className="text-sm font-bold leading-none tracking-wider text-chart5">
              Copper
            </h2>
            {/* {<Weight className="m-2 h-6 w-6 text-chart5/50" />} */}
          </CardHeader>
          <CardContent className="__card-content">
            <h3 className="text-h4 font-bold">
              {quantityFormatter(parseFloat(copperData[0].quantity))}{" "}
              <span className="text-h6 text-muted-foreground">Tonnes</span>
            </h3>
            <KPIChart
              data={copperQuantityTrend}
              config={cuQuantityConfig}
              yAxis="quantity"
            />
            <p className="text-xs text-muted-foreground">
              Total Quantities Copper (T)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className="__card h-32" />
      )}

      {copperData.length > 0 ? (
        <Card className="__card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h2 className="text-sm font-bold leading-none tracking-wider text-chart5">
              Copper
            </h2>
            {/* {<DollarSign className="m-2 h-6 w-6 text-muted-foreground" />} */}
          </CardHeader>
          <CardContent className="__card-content">
            <h3 className="text-h4 font-bold">
              {currencyFormatter(parseFloat(copperData[0].transaction))}{" "}
            </h3>
            <KPIChart
              data={copperTransactionTrend}
              config={cuTransactionConfig}
              yAxis="transaction"
            />
            <p className="text-xs text-muted-foreground">
              Total Cobalt Transaction (USD)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className="__card h-32" />
      )}
    </div>
  );
}
//
