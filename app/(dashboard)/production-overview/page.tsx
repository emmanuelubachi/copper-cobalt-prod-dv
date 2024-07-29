"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { ArrowUpRight, File, ListFilter, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AreaChartRender } from "@/components/charts/areaChart";
import { BarListChart } from "@/components/charts/barListChart";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  exportQuantityData,
  exportTransactionData,
  kpiData,
  companyData,
} from "@/data/chartData";

import { classNames, sliceData } from "@/lib/utils";
import { Years } from "@/data/chartData";

import { currencyFormatter, quantityFormatter } from "@/lib/utils";
import BarChartRender from "@/components/charts/barChart";
import { SparkAreaChart } from "@tremor/react";
import BarChart from "@/components/charts/echarts/barChart";

import totalProductionData from "@/data/projects/totals_production_quantity_by_projects_&_type.json";
import { ProjectSummary, YearlySummary } from "@/types/projects";
import { calculateProjectSums } from "@/lib/dataProcessing";
import { InteractiveBarChart } from "@/components/charts/shadcn/bar-chart/interactive-bar-chart";
import { totalXChartConfig } from "@/constants/chart";

const chartdata = [
  {
    name: "A",
    "Number of threatened species": 2488,
  },
  {
    name: "B",
    "Number of threatened species": 1445,
  },
  {
    name: "C",
    "Number of threatened species": 743,
  },
  {
    name: "D",
    "Number of threatened species": 281,
  },
  {
    name: "E",
    "Number of threatened species": 251,
  },
  {
    name: "F",
    "Number of threatened species": 232,
  },
  {
    name: "G",
    "Number of threatened species": 198,
  },
  {
    name: "H",
    "Number of threatened species": 248,
  },
  {
    name: "I",
    "Number of threatened species": 145,
  },
  {
    name: "J",
    "Number of threatened species": 74,
  },
  {
    name: "K",
    "Number of threatened species": 81,
  },
  {
    name: "L",
    "Number of threatened species": 51,
  },
  {
    name: "M",
    "Number of threatened species": 22,
  },
  {
    name: "N",
    "Number of threatened species": 98,
  },
];

const Product = [
  { category: "all", labal: "All" },
  { category: "copper", labal: "Copper" },
  { category: "cobalt", labal: "Cobalt" },
];

export default function Dashboard() {
  const [totalProd, setTotalProd] = useState<ProjectSummary[]>([]);
  const [kpi, setKpi] = useState<typeof kpiData>([]);

  const Company = sliceData(companyData, 9);

  useEffect(() => {
    const fetchTotalProductionData = async () => {
      try {
        // Filter data based on _project_id
        const exports = totalProductionData.filter(
          (row) => row.type === "export",
        );

        // console.log("exports", exports);

        // Process data
        const totalProd = calculateProjectSums(exports);

        // console.log("totalProd", totalProd);

        setTotalProd(totalProd);
      } catch (error) {
        console.error(
          "Error fetching and processing total industral projects production data:",
          error,
        );
      }
    };

    fetchTotalProductionData();
  }, []);

  useEffect(() => {
    const fetchkpiData = async () => {
      try {
        // Filter data based on _project_id
        const filtered = kpiData.filter((row) => row.year === "2023");

        setKpi(filtered);
      } catch (error) {
        console.error(
          "Error fetching and processing total industral projects production data:",
          error,
        );
      }
    };

    fetchkpiData();
  }, []);

  return (
    <main className="mb-24 mt-0 grid items-start gap-6 p-4 sm:mb-20 sm:mt-0 sm:gap-8 sm:px-6 sm:py-3">
      <header className="items-center justify-between gap-6 space-y-4 sm:ml-1 lg:flex lg:space-y-0">
        <h1 className="text-h4 font-medium tracking-tight">
          Copper and Cobalt Production Overview
        </h1>
      </header>

      <div className="flex flex-1 flex-col gap-4 md:gap-4">
        {/* KPI Cards */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpi.map((kpi) => (
            <Card
              key={kpi.title}
              x-chunk="dashboard-01-chunk-0"
              className="__card"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                {<kpi.icon className="h-6 w-6 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-h4 font-bold">{kpi.value}</div>
                {/* <SparkAreaChart
                  data={chartdata}
                  categories={["Performance"]}
                  index={"date"}
                  colors={["emerald"]}
                  className="h-8 w-20 sm:h-10 sm:w-36"
                /> */}
                <p className="text-xs text-muted-foreground">
                  {kpi.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid items-start gap-4 xl:grid-cols-3">
          {/* Countries/Projects */}
          <div className="space-y-4 xl:col-span-2">
            {totalProd.length > 0 && (
              <InteractiveBarChart
                title="Exports of Cobalt and Copper by Projects"
                description="2023 Production Volume(T)"
                config={totalXChartConfig}
                chartData={totalProd}
                firstDataKey="Cobalt"
                secondDataKey="Copper"
              />
            )}

            <section className="grid items-start gap-2 xl:col-span-2">
              <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-3">
                <Card x-chunk="dashboard-01-chunk-5" className="__card">
                  <CardHeader className="min-h-14">
                    <CardTitle className="flex min-h-14 items-start pt-2">
                      Countries present in the copper and cobalt sector in the
                      DRC
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-8">
                    <BarChart />
                  </CardContent>
                </Card>

                <Card
                  className="__card lg:col-span-2"
                  x-chunk="dashboard-01-chunk-4"
                >
                  <CardHeader className="flex min-h-14 flex-row items-start">
                    <CardTitle className="flex min-h-14 items-start pt-2">
                      Shares of mining production by project groups
                    </CardTitle>
                    <Button asChild size="sm" className="ml-auto hidden gap-1">
                      <Link href="#">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="">
                    <BarChartRender data={chartdata} />
                  </CardContent>
                </Card>
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
            </Card>
            {/* </TabsContent> */}

            {/* <TabsContent value="transaction"> */}
            <Card className="__card">
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
            </Card>
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
