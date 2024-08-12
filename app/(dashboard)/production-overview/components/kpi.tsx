import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import { DollarSign, Weight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import KPIChart from "./card_chart";
import { currencyFormatter, quantityFormatter } from "@/lib/utils";

// type kpiDataProp = {
//   title: string;
//   description: string;
//   category: string;
//   value: string;
//   icon: ForwardRefExoticComponent<
//     Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
//   >;
//   process: number;
//   year: string;
// }[];

type kpiDataProp = {
  year: string;
  product: string;
  quantity: string;
  transaction: string;
  // value: string;
  // icon: ForwardRefExoticComponent<
  //   Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  // >;
  // process: number;
}[];

export default function KPI({ kpi }: { kpi: kpiDataProp }) {
  // const kpi1 = kpi[0];
  // const kpi2 = kpi[1];
  // const kpi3 = kpi[2];
  // const kpi4 = kpi[3];

  const copperData = kpi.filter((row) => row.product === "Copper");
  const cobaltData = kpi.filter((row) => row.product === "Cobalt");

  const data = [
    {
      date: "2024-01-01",
      resting: 62,
    },
    {
      date: "2024-01-02",
      resting: 72,
    },
    {
      date: "2024-01-03",
      resting: 35,
    },
    {
      date: "2024-01-04",
      resting: 62,
    },
    {
      date: "2024-01-05",
      resting: 52,
    },
    {
      date: "2024-01-06",
      resting: 62,
    },
    {
      date: "2024-01-07",
      resting: 70,
    },
  ];

  const cobaltConfig = {
    resting: {
      label: "Resting",
      color: "hsl(var(--chart-6))",
    },
  };
  const copperConfig = {
    resting: {
      label: "Resting",
      color: "hsl(var(--chart-5))",
    },
  };

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cobaltData.length > 0 ? (
        <Card className="__card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h2 className="text-sm font-bold leading-none tracking-wider text-chart6">
              Cobalt
            </h2>

            {/* {<Weight className="m-2 h-6 w-6 text-chart6/50" />} */}
          </CardHeader>
          <CardContent className="__card-content">
            <h3 className="text-h4 font-bold">
              {quantityFormatter(parseFloat(cobaltData[0].quantity))}{" "}
              <span className="text-h6 text-muted-foreground">Tonnes</span>
            </h3>
            {/* <KPIChart data={data} config={cobaltConfig} /> */}
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
            <h2 className="text-sm font-bold leading-none tracking-wider text-chart6">
              Cobalt
            </h2>
            {/* {<DollarSign className="m-2 h-6 w-6 text-chart6/50" />} */}
          </CardHeader>
          <CardContent className="__card-content">
            <h3 className="text-h4 font-bold">
              {currencyFormatter(parseFloat(cobaltData[0].transaction))}{" "}
            </h3>
            {/* <KPIChart data={data} config={cobaltConfig} /> */}
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
            {/* <KPIChart data={data} config={copperConfig} /> */}
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
            {/* <KPIChart data={data} config={copperConfig} /> */}
            <p className="text-xs text-muted-foreground">
              Total Cobalt Transaction (USD)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className="__card h-32" />
      )}
    </div>
    // <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
    //   {kpi1 ? (
    //     <Card className="__card">
    //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <CardTitle className="text-sm font-medium text-muted-foreground">
    //           {kpi1.title}
    //         </CardTitle>
    //         {<kpi1.icon className="m-2 h-6 w-6 text-muted-foreground" />}
    //       </CardHeader>
    //       <CardContent className="__card-content">
    //         <h3 className="text-h4 font-bold">
    //           {kpi1.value}{" "}
    //           <span className="text-h6 text-muted-foreground">Tonnes</span>
    //         </h3>
    //         {/* <KPIChart data={data} config={cobaltConfig} /> */}
    //         <p className="text-xs text-muted-foreground">{kpi1.description}</p>
    //       </CardContent>
    //     </Card>
    //   ) : (
    //     <Skeleton className="__card h-32" />
    //   )}

    //   {kpi2 ? (
    //     <Card className="__card">
    //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <CardTitle className="text-sm font-medium text-muted-foreground">
    //           {kpi2.title}
    //         </CardTitle>
    //         {<kpi2.icon className="h-6 w-6 text-muted-foreground" />}
    //       </CardHeader>
    //       <CardContent className="__card-content">
    //         <div className="text-h4 font-bold">{kpi2.value}</div>
    //         {/* <KPIChart data={data} config={cobaltConfig} /> */}
    //         <p className="text-xs text-muted-foreground">{kpi2.description}</p>
    //       </CardContent>
    //     </Card>
    //   ) : (
    //     <Skeleton className="__card h-32" />
    //   )}

    //   {kpi3 ? (
    //     <Card className="__card">
    //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <CardTitle className="text-sm font-medium text-muted-foreground">
    //           {kpi3.title}
    //         </CardTitle>
    //         {<kpi3.icon className="h-6 w-6 text-muted-foreground" />}
    //       </CardHeader>
    //       <CardContent className="__card-content">
    //         <h3 className="text-h4 font-bold">
    //           {kpi3.value}{" "}
    //           <span className="text-h6 text-muted-foreground">Tonnes</span>
    //         </h3>
    //         {/* <KPIChart data={data} config={copperConfig} /> */}
    //         <p className="text-xs text-muted-foreground">{kpi3.description}</p>
    //       </CardContent>
    //     </Card>
    //   ) : (
    //     <Skeleton className="__card h-32" />
    //   )}

    //   {kpi4 ? (
    //     <Card className="__card">
    //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <CardTitle className="text-sm font-medium text-muted-foreground">
    //           {kpi4.title}
    //         </CardTitle>
    //         {<kpi4.icon className="h-6 w-6 text-muted-foreground" />}
    //       </CardHeader>
    //       <CardContent className="__card-content">
    //         <div className="text-h4 font-bold">{kpi4.value}</div>
    //         {/* <KPIChart data={data} config={copperConfig} /> */}
    //         <p className="text-xs text-muted-foreground">{kpi4.description}</p>
    //       </CardContent>
    //     </Card>
    //   ) : (
    //     <Skeleton className="__card h-32" />
    //   )}
    // </div>
  );
}
