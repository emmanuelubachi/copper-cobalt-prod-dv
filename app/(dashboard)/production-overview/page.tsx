// "use client";
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
  kpiCard,
  companyData,
} from "@/data/chartData";

import { classNames, sliceData } from "@/lib/utils";
import { Years } from "@/data/chartData";

import { currencyFormatter, quantityFormatter } from "@/lib/utils";
import BarChartRender from "@/components/charts/barChart";

const chartdata = [
  {
    name: "Amphibians",
    "Number of threatened species": 2488,
  },
  {
    name: "Birds",
    "Number of threatened species": 1445,
  },
  {
    name: "Crustaceans",
    "Number of threatened species": 743,
  },
  {
    name: "Ferns",
    "Number of threatened species": 281,
  },
  {
    name: "Arachnids",
    "Number of threatened species": 251,
  },
  {
    name: "Corals",
    "Number of threatened species": 232,
  },
  {
    name: "Algae",
    "Number of threatened species": 98,
  },
];

export default function Dashboard() {
  const Company = sliceData(companyData, 9);
  return (
    <main className="mb-24 mt-10 grid items-start gap-4 p-4 sm:mb-20 sm:mt-14 sm:gap-4 sm:px-6 sm:py-4">
      <header className="items-start justify-between gap-6 space-y-4 lg:flex lg:space-y-0">
        <h1 className="text-h4 font-medium tracking-tight">
          Copper and Cobalt Production Overview
        </h1>
        <div className="flex items-start">
          <ToggleGroup
            type="single"
            size={"sm"}
            defaultValue="2023"
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

      <div className="flex flex-1 flex-col gap-4 md:gap-8">
        <section className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {kpiCard.map((kpi) => (
            <Card key={kpi.title} x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
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
                {/* <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button> */}
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
                  <AreaChartRender
                    data={exportQuantityData}
                    valueFormatter="quantityFormatter"
                  />
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
                  <AreaChartRender
                    data={exportTransactionData}
                    valueFormatter={"currencyFormatter"}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

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
        </section>

        {/* TODO: Make table responsive for Fold mobile devices */}
        <section className="grid flex-1 items-start gap-4 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="copper">Copper</TabsTrigger>
                <TabsTrigger value="cobalt">Cobalt</TabsTrigger>
              </TabsList>

              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Total Sales
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Laser Lemonade Machine
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Draft</Badge>
                        </TableCell>
                        <TableCell>$499.99</TableCell>
                        <TableCell className="hidden md:table-cell">
                          25
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-07-12 10:42 AM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Hypernova Headpho
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell>$129.99</TableCell>
                        <TableCell className="hidden md:table-cell">
                          100
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-10-18 03:21 PM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          AeroGlow Desk Lamp
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell>$39.99</TableCell>
                        <TableCell className="hidden md:table-cell">
                          50
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-11-29 08:15 AM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          TechTonic Energy Drink
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">Draft</Badge>
                        </TableCell>
                        <TableCell>$2.99</TableCell>
                        <TableCell className="hidden md:table-cell">
                          0
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-12-25 11:59 PM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Gamer Gear Pro Controller
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell>$59.99</TableCell>
                        <TableCell className="hidden md:table-cell">
                          75
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2024-01-01 12:00 AM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Luminous VR Headset
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell>$199.99</TableCell>
                        <TableCell className="hidden md:table-cell">
                          30
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2024-02-14 02:14 PM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <Card
            className="lg:col-span-2 xl:col-span-1 xl:hidden"
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
                    <p className="line-clamp-2 hidden text-sm text-muted-foreground md:flex xl:hidden 2xl:flex">
                      {company.email}
                    </p>
                  </div>
                  <div className="ml-auto hidden font-medium">+$1,999.00</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
