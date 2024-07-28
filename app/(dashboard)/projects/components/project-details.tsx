"use client";
import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  ListFilter,
  MoreVertical,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProjectInfo } from "@/types";
import Treemap from "@/components/charts/treeMap";
import { AreaChartRender } from "@/components/charts/areaChart";
import MultipleBarChart from "@/components/charts/shadcn/bar-chart/multiple-bar-chart";

import {
  exportQuantityData,
  exportTransactionData,
  kpiCard,
  companyData,
} from "@/data/chartData";
import { Years } from "@/data/chartData";
import montlyProductionData from "@/data/map/2023 Industrial Projects Monthly cobalt-copper Production - origin Statistiques M.json";
import cobaltDestinationData from "@/data/map/2023 cobalt production destination - origin situation des.json";
import cubaltDestinationData from "@/data/map/2023 copper production destination - origin situation des.json";

import { transformMonthlyData } from "@/lib/dataProcessing";

import { TMonthlyProductionData } from "@/types/miningActivities";

export default function ProjectDetails({
  projectInfo,
}: {
  projectInfo: ProjectInfo;
}) {
  const [monthlyData, setMonthlyData] = useState<TMonthlyProductionData[]>([]);

  const project_id = projectInfo._project_id;

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        // Filter data based on _project_id
        const filtered = montlyProductionData.filter(
          (row) => row._project_id === project_id,
        );
        // Process data for chart
        const MonthlyProductionData = transformMonthlyData(filtered);
        setMonthlyData(MonthlyProductionData);
        console.log("MonthlyProductionData", MonthlyProductionData);
      } catch (error) {
        console.error(
          "Error fetching and processing monthly industral projects production data:",
          error,
        );
      }
    };

    fetchMonthlyData();
  }, [project_id]);

  const monthlyProdChartConfig = {
    Cobalt: {
      label: "Cobalt",
      color: "hsl(var(--chart-2))",
    },
    Copper: {
      label: "Copper",
      color: "hsl(var(--chart-5))",
    },
  };
  return (
    <main className="mb-24 mt-10 grid items-start gap-4 p-4 sm:mb-20 sm:mt-14 sm:px-6 sm:py-4">
      <header className="items-start justify-between gap-6 space-y-4 lg:flex lg:space-y-0">
        <h1 className="text-h4 font-medium tracking-tight">
          {projectInfo.project_name}
        </h1>
        <div className="flex items-start">
          {/* <ToggleGroup
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
          </ToggleGroup> */}
        </div>
      </header>
      {/* <div className="">
        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Order Oe31b70H
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>Date: November 23, 2023</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Truck className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Track Order
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Order Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Glimmer Lamps x <span>2</span>
                  </span>
                  <span>$250.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Aqua Filters x <span>1</span>
                  </span>
                  <span>$49.00</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>$299.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$5.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$25.00</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>$329.00</span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <div className="font-semibold">Shipping Information</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>Liam Johnson</span>
                  <span>1234 Main St.</span>
                  <span>Anytown, CA 12345</span>
                </address>
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold">Billing Information</div>
                <div className="text-muted-foreground">
                  Same as shipping address
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Customer Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Customer</dt>
                  <dd>Liam Johnson</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href="mailto:">liam@acme.com</a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>
                    <a href="tel:">+1 234 567 890</a>
                  </dd>
                </div>
              </dl>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Payment Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Visa
                  </dt>
                  <dd>**** **** **** 4532</dd>
                </div>
              </dl>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated <time dateTime="2023-11-23">November 23, 2023</time>
            </div>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="sr-only">Previous Order</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="sr-only">Next Order</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div> */}
      <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {/* {kpiCard.map((kpi) => (
              <Card key={kpi.title} x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  {<kpi.icon className="h-6 w-6 text-muted-foreground" />}
                </CardHeader>
                <CardContent>
                  <div className="text-h5 font-bold">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {kpi.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={kpi.process}
                    aria-label={`${kpi.process}% increase`}
                  />
                </CardFooter>
              </Card>
            ))} */}
          </div>
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
            {monthlyData.length > 0 && (
              <MultipleBarChart
                title="Production of Copper and Cobalt in 2023"
                description="Quantity in Tonnes"
                config={monthlyProdChartConfig}
                chartData={monthlyData}
                firstDataKey="Cobalt"
                secondDataKey="Copper"
                footNote={
                  <>
                    {/* <div className="flex gap-2 font-medium leading-none">
                      Trending up by 5.2% this month{" "}
                      <TrendingUp className="h-4 w-4" />
                    </div> */}
                    <div className="leading-none text-muted-foreground">
                      Includes quantities both exported and sold locally.
                    </div>
                  </>
                }
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// const DataTables = () => {
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Customer</TableHead>
//           <TableHead className="hidden sm:table-cell">Type</TableHead>
//           <TableHead className="hidden sm:table-cell">Status</TableHead>
//           <TableHead className="hidden md:table-cell">Date</TableHead>
//           <TableHead className="text-right">Amount</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         <TableRow className="bg-accent">
//           <TableCell>
//             <div className="font-medium">Liam Johnson</div>
//             <div className="hidden text-sm text-muted-foreground md:inline">
//               liam@example.com
//             </div>
//           </TableCell>
//           <TableCell className="hidden sm:table-cell">Sale</TableCell>
//           <TableCell className="hidden sm:table-cell">
//             <Badge className="text-xs" variant="secondary">
//               Fulfilled
//             </Badge>
//           </TableCell>
//           <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
//           <TableCell className="text-right">$250.00</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell>
//             <div className="font-medium">Olivia Smith</div>
//             <div className="hidden text-sm text-muted-foreground md:inline">
//               olivia@example.com
//             </div>
//           </TableCell>
//           <TableCell className="hidden sm:table-cell">Refund</TableCell>
//           <TableCell className="hidden sm:table-cell">
//             <Badge className="text-xs" variant="outline">
//               Declined
//             </Badge>
//           </TableCell>
//           <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
//           <TableCell className="text-right">$150.00</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell>
//             <div className="font-medium">Noah Williams</div>
//             <div className="hidden text-sm text-muted-foreground md:inline">
//               noah@example.com
//             </div>
//           </TableCell>
//           <TableCell className="hidden sm:table-cell">Subscription</TableCell>
//           <TableCell className="hidden sm:table-cell">
//             <Badge className="text-xs" variant="secondary">
//               Fulfilled
//             </Badge>
//           </TableCell>
//           <TableCell className="hidden md:table-cell">2023-06-25</TableCell>
//           <TableCell className="text-right">$350.00</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell>
//             <div className="font-medium">Emma Brown</div>
//             <div className="hidden text-sm text-muted-foreground md:inline">
//               emma@example.com
//             </div>
//           </TableCell>
//           <TableCell className="hidden sm:table-cell">Sale</TableCell>
//           <TableCell className="hidden sm:table-cell">
//             <Badge className="text-xs" variant="secondary">
//               Fulfilled
//             </Badge>
//           </TableCell>
//           <TableCell className="hidden md:table-cell">2023-06-26</TableCell>
//           <TableCell className="text-right">$450.00</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell>
//             <div className="font-medium">Liam Johnson</div>
//             <div className="hidden text-sm text-muted-foreground md:inline">
//               liam@example.com
//             </div>
//           </TableCell>
//           <TableCell className="hidden sm:table-cell">Sale</TableCell>
//           <TableCell className="hidden sm:table-cell">
//             <Badge className="text-xs" variant="secondary">
//               Fulfilled
//             </Badge>
//           </TableCell>
//           <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
//           <TableCell className="text-right">$250.00</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell>
//             <div className="font-medium">Olivia Smith</div>
//             <div className="hidden text-sm text-muted-foreground md:inline">
//               olivia@example.com
//             </div>
//           </TableCell>
//           <TableCell className="hidden sm:table-cell">Refund</TableCell>
//           <TableCell className="hidden sm:table-cell">
//             <Badge className="text-xs" variant="outline">
//               Declined
//             </Badge>
//           </TableCell>
//           <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
//           <TableCell className="text-right">$150.00</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell>
//             <div className="font-medium">Emma Brown</div>
//             <div className="hidden text-sm text-muted-foreground md:inline">
//               emma@example.com
//             </div>
//           </TableCell>
//           <TableCell className="hidden sm:table-cell">Sale</TableCell>
//           <TableCell className="hidden sm:table-cell">
//             <Badge className="text-xs" variant="secondary">
//               Fulfilled
//             </Badge>
//           </TableCell>
//           <TableCell className="hidden md:table-cell">2023-06-26</TableCell>
//           <TableCell className="text-right">$450.00</TableCell>
//         </TableRow>
//       </TableBody>
//     </Table>
//   );
// };
