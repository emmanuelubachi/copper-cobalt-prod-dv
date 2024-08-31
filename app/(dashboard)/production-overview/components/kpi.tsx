"use client";
import { useMemo } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DollarSign, WeightIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import KPIChart from "./kpi-trend-chart";
import { currencyFormatter, quantityFormatter } from "@/lib/utils";
import { kpiTrendProps } from "../page";
import useDeviceType from "@/hooks/useDeviceType";

type kpiDataProp = {
  year: string;
  product: string;
  quantity: string;
  transaction: string;
}[];

const shownYears = {
  2022: {
    label: "2022",
  },
  2018: {
    label: "2018",
  },
};

const coQuantityConfig = {
  quantity: {
    label: "T",
    color: "hsl(var(--chart-6))",
  },
  ...shownYears,
};
const coTransactionConfig = {
  transaction: {
    label: "$",
    color: "hsl(var(--chart-6))",
  },
  ...shownYears,
};
const cuQuantityConfig = {
  quantity: {
    label: "T",
    color: "hsl(var(--chart-5))",
  },
  ...shownYears,
};
const cuTransactionConfig = {
  transaction: {
    label: "$",
    color: "hsl(var(--chart-5))",
  },
  ...shownYears,
};

export default function KPI({
  kpi,
  kpiTrend,
}: {
  kpi: kpiDataProp;
  kpiTrend: kpiTrendProps;
}) {
  const { isMobile } = useDeviceType();

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
        <Card className="__card relative">
          <CardHeader className="flex flex-col space-y-1 py-4">
            <h3 className="text-h4 font-bold 2xl:text-h3">
              {quantityFormatter(parseFloat(cobaltData[0].quantity))}{" "}
              <span className="text-pxs text-muted-foreground">
                {isMobile ? "T" : "Tonnes"}
              </span>
            </h3>

            <h2 className="text-sm font-bold leading-none tracking-wider text-foreground/60">
              Cobalt Quantity
            </h2>
          </CardHeader>

          <div className="absolute right-5 top-6">
            <WeightIcon className="h-8 w-8 rounded-full bg-chart6/80 fill-white stroke-chart6/80 p-1" />
          </div>

          <CardContent className="__card-content">
            <KPIChart
              data={cobaltQuantityTrend}
              config={coQuantityConfig}
              yAxis="quantity"
            />
            <p className="text-pxs text-muted-foreground">
              Annual Cobalt Quantity (T)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className="__card h-32" />
      )}

      {cobaltData.length > 0 ? (
        <Card className="__card relative">
          <CardHeader className="flex flex-col space-y-1 py-4">
            <h3 className="text-h4 font-bold 2xl:text-h3">
              {currencyFormatter(parseFloat(cobaltData[0].transaction))}{" "}
            </h3>

            <h2 className="text-sm font-bold leading-none tracking-wider text-foreground/60">
              Cobalt Transaction
            </h2>
          </CardHeader>
          <div className="absolute right-5 top-6">
            <DollarSign className="h-8 w-8 rounded-full bg-chart6/80 stroke-white p-1" />
          </div>

          <CardContent className="__card-content">
            <KPIChart
              data={cobaltTransactionTrend}
              config={coTransactionConfig}
              yAxis="transaction"
            />
            <p className="text-pxs text-muted-foreground">
              Cobalt Transaction (USD)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className="__card h-32" />
      )}

      {copperData.length > 0 ? (
        <Card className="__card relative">
          <CardHeader className="space-y-1 py-4">
            <h3 className="text-h4 font-bold 2xl:text-h3">
              {quantityFormatter(parseFloat(copperData[0].quantity))}{" "}
              <span className="text-pxs text-muted-foreground">
                {isMobile ? "T" : "Tonnes"}
              </span>
            </h3>

            <h2 className="text-sm font-bold leading-none tracking-wider text-foreground/60">
              Copper Quantity
            </h2>
          </CardHeader>

          <div className="absolute right-5 top-6">
            <WeightIcon className="h-8 w-8 rounded-full bg-chart5/80 fill-white stroke-chart5/80 p-1" />
          </div>

          <CardContent className="__card-content">
            <KPIChart
              data={copperQuantityTrend}
              config={cuQuantityConfig}
              yAxis="quantity"
            />
            <p className="text-pxs text-muted-foreground">
              Annual Copper Quantity (T)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className="__card h-32" />
      )}

      {copperData.length > 0 ? (
        <Card className="__card relative">
          <CardHeader className="space-y-0 py-4">
            <h3 className="text-h4 font-bold 2xl:text-h3">
              {currencyFormatter(parseFloat(copperData[0].transaction))}{" "}
            </h3>
            <h2 className="text-sm font-bold leading-none tracking-wider text-foreground/60">
              Copper Transaction
            </h2>
          </CardHeader>
          <div className="absolute right-5 top-6">
            <DollarSign className="h-8 w-8 rounded-full bg-chart5/80 stroke-white p-1" />
          </div>
          <CardContent className="__card-content">
            <KPIChart
              data={copperTransactionTrend}
              config={cuTransactionConfig}
              yAxis="transaction"
            />
            <p className="text-pxs text-muted-foreground">
              Cobalt Transaction (USD)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className="__card h-32" />
      )}
    </div>
  );
}
