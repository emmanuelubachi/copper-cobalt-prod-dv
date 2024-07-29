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
import totalProductionData from "@/data/projects/totals_production_quantity_by_projects_&_type.json";
import montlyProductionData from "@/data/map/2023 Industrial Projects Monthly cobalt-copper Production - origin Statistiques M.json";
import cobaltDestinationData from "@/data/map/2023 cobalt production destination - origin situation des.json";
import cubaltDestinationData from "@/data/map/2023 copper production destination - origin situation des.json";

import {
  calculateYearlySums,
  transformMonthlyData,
} from "@/lib/dataProcessing";

import { TMonthlyProductionData } from "@/types/miningActivities";
import { monthlyProdChartConfig } from "@/constants/chart";
import { YearlySummary } from "@/types/projects";
import { StackedRadialChart } from "@/components/charts/shadcn/radial-chart/stacked-radial-chart";

export default function ProjectDetails({
  projectInfo,
}: {
  projectInfo: ProjectInfo;
}) {
  const [totalProd, setTotalProd] = useState<YearlySummary[]>([]);

  const [monthlyData, setMonthlyData] = useState<TMonthlyProductionData[]>([]);

  const project_id = projectInfo._project_id;

  useEffect(() => {
    const fetchTotalProductionData = async () => {
      try {
        // Filter data based on _project_id
        const filtered = totalProductionData.filter(
          (row) => row._project_id === project_id,
        );

        // Process data for chart
        const totalProd = calculateYearlySums(filtered);

        setTotalProd(totalProd);

        // console.log("filtered", filtered);
      } catch (error) {
        console.error(
          "Error fetching and processing total industral projects production data:",
          error,
        );
      }
    };

    const fetchMonthlyData = async () => {
      try {
        // Filter data based on _project_id
        const filtered = montlyProductionData.filter(
          (row) => row._project_id === project_id,
        );
        // Process data for chart
        const MonthlyProductionData = transformMonthlyData(filtered);

        setMonthlyData(MonthlyProductionData);
      } catch (error) {
        console.error(
          "Error fetching and processing monthly industral projects production data:",
          error,
        );
      }
    };

    fetchTotalProductionData();
    fetchMonthlyData();
  }, [project_id]);

  return (
    <main className="mb-24 mt-10 items-start space-y-4 p-4 sm:mb-20 sm:mt-14 sm:px-6 sm:py-4">
      <div className="items-start justify-between gap-6 space-y-4 lg:flex lg:space-y-0">
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
      </div>

      <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="m-0 border-none bg-muted shadow-none dark:bg-muted/50">
              <CardHeader>
                <CardTitle>
                  {totalProd.length > 0 && totalProd[0].year} Annual Production
                </CardTitle>
                <CardDescription>Quantity in Tonnes</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="mt-2">
                <div className="flex flex-col gap-6">
                  {totalProd.length > 0 && (
                    <div className="space-y-2">
                      <div className="">
                        {totalProd[0].totalCobalt > 0 && (
                          <div className="font-bold">
                            <span className="text-h4 font-bold text-chart6">
                              {totalProd[0].totalCobalt > 0 &&
                                totalProd[0].totalCobalt
                                  .toFixed(1)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              {" t"}
                            </span>
                            <span className="text-sm text-foreground/50">
                              {" "}
                              Total Cobalt
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-20">
                        {totalProd[0].totalCobalt > 0 && (
                          <div className="font-bold">
                            <p className="text-h6 font-bold text-foreground/80">
                              {totalProd[0].totalCobalt > 0 &&
                                totalProd[0].totalCobalt
                                  .toFixed(1)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " t"}
                            </p>
                            <span className="text-pxs text-foreground/50">
                              Co Exports
                            </span>
                          </div>
                        )}
                        {totalProd[0].totalCobalt > 0 && (
                          <div className="font-bold">
                            <p className="text-h6 font-bold text-foreground/80">
                              {totalProd[0].totalCobalt > 0 &&
                                totalProd[0].totalCobalt
                                  .toFixed(1)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " t"}
                            </p>
                            <span className="text-pxs font-bold text-foreground/50">
                              Co Domestic Sales
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {totalProd.length > 0 && (
                    <div className="space-y-2">
                      <div className="">
                        {totalProd[0].totalCopper > 0 && (
                          <div className="font-bold">
                            {/* <p className="font-medium text-chart6">Cobalt:</p> */}

                            <span className="text-h4 font-bold text-chart5">
                              {totalProd[0].totalCopper > 0 &&
                                totalProd[0].totalCopper
                                  .toFixed(1)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              {" t"}
                            </span>
                            <span className="text-sm text-foreground/50">
                              {" "}
                              Total Copper
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-20">
                        {totalProd[0].totalCopper > 0 && (
                          <div className="font-bold">
                            <p className="text-h6 font-bold text-foreground/80">
                              {totalProd[0].totalCopper > 0 &&
                                totalProd[0].totalCopper
                                  .toFixed(1)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " t"}
                            </p>
                            <span className="text-pxs text-foreground/50">
                              Cu Exports
                            </span>
                          </div>
                        )}
                        {totalProd[0].totalCopper > 0 && (
                          <div className="font-bold">
                            <p className="text-h6 font-bold text-foreground/80">
                              {totalProd[0].totalCopper > 0 &&
                                totalProd[0].totalCopper
                                  .toFixed(1)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " t"}
                            </p>
                            <span className="text-pxs font-bold text-foreground/50">
                              Cu Domestic Sales
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {monthlyData.length > 0 && (
              <div className="h-56 xl:col-span-2">
                <MultipleBarChart
                  title="Production of Copper and Cobalt in 2023"
                  description="Quantity in Tonnes"
                  config={monthlyProdChartConfig}
                  chartData={monthlyData}
                  firstDataKey="Cobalt"
                  secondDataKey="Copper"
                  footNote={
                    <div className="leading-none text-muted-foreground">
                      Includes quantities both exported and sold locally.
                    </div>
                  }
                />
              </div>
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
