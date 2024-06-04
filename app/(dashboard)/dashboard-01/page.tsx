import Link from "next/link";
import { ArrowUpRight, DollarSign, Weight, File } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { AreaChartHero } from "@/components/charts/areaChart";
import {
  exportQuantityData,
  exportTransactionData,
  kpiCard,
  companyData,
} from "@/data/chartData";
import { classNames, sliceData } from "@/lib/utils";
import { BarListChart } from "@/components/charts/barListChart";

export default function Dashboard() {
  const Company = sliceData(companyData, 9);
  return (
    <main className="mb-24 mt-10 grid items-start gap-4 p-4 sm:mb-20 sm:mt-14 sm:gap-4 sm:px-6 sm:py-4">
      <header>
        <h1 className="text-h4 font-medium tracking-tight">
          Copper and Cobalt Production Overview
        </h1>
      </header>

      <div className="flex flex-1 flex-col gap-4 md:gap-8">
        <section className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {kpiCard.map((kpi) => (
            <Card key={kpi.title} x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                {/* <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle> */}
                {<kpi.icon className="h-6 w-6 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-h3 font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">
                  {kpi.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Tabs className="lg:col-span-2" defaultValue="quantity">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="quantity">Quantity</TabsTrigger>
                <TabsTrigger value="transaction">Transaction</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
            </div>

            <TabsContent value="quantity">
              <Card x-chunk="dashboard-01-chunk-4">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Export Trend</CardTitle>
                    <CardDescription>
                      Total quantity of exported products.
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent>
                  <AreaChartHero data={exportQuantityData} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transaction">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Export Trend</CardTitle>
                    <CardDescription>
                      Total value of exported products.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <AreaChartHero data={exportTransactionData} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card
            className="lg:col-span-2 xl:col-span-1"
            x-chunk="dashboard-01-chunk-5"
          >
            <CardHeader className="flex flex-row items-center">
              <CardTitle>Copper and Cobalt Companies</CardTitle>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/companies">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-8 lg:grid-cols-3 xl:grid-cols-2">
              {Company.map((company) => (
                <div key={company.name} className="flex items-center gap-4">
                  <Avatar
                    className={classNames(
                      company.bgColor,
                      company.textColor,
                      "h-9 w-9 sm:flex",
                    )}
                  >
                    <AvatarImage alt="Avatar" />
                    <AvatarFallback>{company.initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="line-clamp-1 text-sm font-medium leading-none">
                      {company.name}
                    </p>
                    {/* <p className="line-clamp-2 hidden text-sm text-muted-foreground md:flex xl:hidden 2xl:flex">
                      {company.email}
                    </p> */}
                  </div>
                  {/* <div className="ml-auto font-medium">+$1,999.00</div> */}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader className="min-h-14">
              <CardTitle className="flex min-h-14 items-start pt-2">
                Countries present in the copper and cobalt sector in the DRC
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <BarListChart title={"DRC"} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex min-h-14 flex-row items-start">
              <CardTitle className="flex min-h-14 items-start pt-2">
                Shares of mining production by project groups
              </CardTitle>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-8 md:grid-cols-2">
              <BarListChart title={"Copper"} />
              <BarListChart title={"Cobalt"} />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
