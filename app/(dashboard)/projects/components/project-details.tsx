"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectInfo } from "@/types";
import MultipleBarChart from "@/components/charts/shadcn/bar-chart/multiple-bar-chart";
import totalProductionData from "@/data/projects/totals_production_quantity_by_projects_&_type.json";
import montlyProductionData from "@/data/map/2023 Industrial Projects Monthly cobalt-copper Production - origin Statistiques M.json";
import cobaltDestinationData from "@/data/map/2023 cobalt production destination - origin situation des.json";
import copperDestinationData from "@/data/map/2023 copper production destination - origin situation des.json";
import {
  calculateDetailedYearlySums,
  calculateYearlySums,
  transformDestinationData,
  transformMonthlyData,
} from "@/lib/dataProcessing";
import {
  coDestChartConfig,
  cuDestChartConfig,
  monthlyProdChartConfig,
} from "@/constants/chart";
import { TDestinationData, TMonthlyProductionData } from "@/types/map";
import { DetailedYearlySummary, YearlySummary } from "@/types/projects";
import CustomLabelBarChart from "@/components/charts/shadcn/bar-chart/custom-label-bar-chart";

export default function ProjectDetails({
  projectInfo,
}: {
  projectInfo: ProjectInfo;
}) {
  const [totalProd, setTotalProd] = useState<YearlySummary[]>([]);
  const [totalProdDetails, setTotalProdDetails] = useState<
    DetailedYearlySummary[]
  >([]);
  const [monthlyData, setMonthlyData] = useState<TMonthlyProductionData[]>([]);
  const [coDestinationData, setCoDestinationData] = useState<
    TDestinationData[]
  >([]);
  const [cuDestinationData, setCuDestinationData] = useState<
    TDestinationData[]
  >([]);

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
        const totalProd2 = calculateDetailedYearlySums(filtered);

        console.log("totalProd2", totalProd2);

        setTotalProd(totalProd);
        setTotalProdDetails(totalProd2);

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

    const fetchCoDestinationData = async () => {
      try {
        // Filter data based on short_name
        const filtered = cobaltDestinationData.filter(
          (row) => row._project_id === project_id,
        );

        // Process data for chart - sort for top destinations
        const CoDestinationData = transformDestinationData(filtered);

        setCoDestinationData(CoDestinationData);
      } catch (error) {
        console.error(
          "Error fetching and processing co destination data:",
          error,
        );
      }
    };

    const fetchCuDestinationData = async () => {
      try {
        // Filter data based on short_name
        const filtered = copperDestinationData.filter(
          (row) => row._project_id === project_id,
        );

        // Process data for chart - sort for top destinations
        const CuDestinationData = transformDestinationData(filtered);

        setCuDestinationData(CuDestinationData);
      } catch (error) {
        console.error(
          "Error fetching and processing cu destination data:",
          error,
        );
      }
    };

    fetchTotalProductionData();
    fetchMonthlyData();
    fetchCoDestinationData();
    fetchCuDestinationData();
  }, [project_id]);

  return (
    <main className="mb-24 mt-0 items-start space-y-4 p-4 sm:mb-20 sm:mt-0 sm:px-8 sm:py-3">
      <header>
        <h1 className="text-center text-h4 font-medium tracking-tight lg:text-start lg:text-h5 xl:text-h4">
          {projectInfo.project_name}
        </h1>
      </header>
      <div className="items-start justify-between gap-6 space-y-4 lg:flex lg:space-y-0">
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
        <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-3">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {totalProd.length > 0 && (
              <Card className="__card">
                <CardHeader>
                  <CardTitle>
                    {totalProd.length > 0 && totalProd[0].year} Annual
                    Production
                  </CardTitle>
                  <CardDescription>Quantity in Tonnes</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="mt-2 lg:h-[330px]">
                  <div className="flex flex-col gap-7">
                    {totalProd[0].totalCobalt > 0 && (
                      <div className="space-y-5">
                        <div className="font-bold">
                          <p className="text-h4 font-bold text-chart6">
                            {totalProd[0].totalCobalt > 0 &&
                              totalProd[0].totalCobalt
                                .toFixed(1)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            {" t"}
                          </p>
                          <span className="text-sm text-foreground/50">
                            {" "}
                            Total Cobalt Production
                          </span>
                        </div>

                        <div className="flex items-center justify-between pr-8">
                          {totalProdDetails[0].totalCobaltExport > 0 && (
                            <div className="font-bold">
                              <p className="text-p font-bold text-foreground/80">
                                {totalProdDetails[0].totalCobaltExport
                                  .toFixed(1)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " t"}
                              </p>
                              <span className="text-pxs text-foreground/50">
                                Co Exports
                              </span>
                            </div>
                          )}
                          {totalProdDetails[0].totalCobaltLocal > 0 && (
                            <div className="font-bold">
                              <p className="text-p font-bold text-foreground/80">
                                {totalProdDetails[0].totalCobaltLocal

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
                    {totalProd[0].totalCopper > 0 && (
                      <div className="space-y-5">
                        <div className="font-bold">
                          <p className="text-h4 font-bold text-chart5">
                            {totalProd[0].totalCopper > 0 &&
                              totalProd[0].totalCopper
                                .toFixed(1)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            {" t"}
                          </p>
                          <span className="text-sm text-foreground/50">
                            {" "}
                            Total Copper Production
                          </span>
                        </div>

                        <div className="flex items-center justify-between pr-8">
                          {totalProdDetails[0].totalCopperExport > 0 && (
                            <div className="font-bold">
                              <p className="text-p font-bold text-foreground/80">
                                {totalProdDetails[0].totalCopperExport
                                  .toFixed(1)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " t"}
                              </p>
                              <span className="text-pxs text-foreground/50">
                                Cu Exports
                              </span>
                            </div>
                          )}
                          {totalProdDetails[0].totalCopperLocal > 0 && (
                            <div className="font-bold">
                              <p className="text-p font-bold text-foreground/80">
                                {totalProdDetails[0].totalCopperLocal
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
            )}

            {monthlyData.length > 0 && (
              <div className="shrink lg:col-span-2">
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

          <div className="grid gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-2">
            {coDestinationData.length > 0 && (
              <CustomLabelBarChart
                title="Top Destinations of Cobalt Production in 2023"
                description="Quantity in Tonnes"
                config={coDestChartConfig}
                chartData={coDestinationData}
                yAxisDataKey="destination"
                xAxisDataKey="quantity_tons"
                // barDataKey="quantity_tons"
                // yAxisLabelDataKey="Cobalt"
                // barLabelDataKey="label"
                footNote={
                  <>
                    <div className="leading-none text-muted-foreground">
                      Showing top {coDestinationData.length > 4 ? 5 : ""}{" "}
                      destinations in 2023.
                    </div>
                  </>
                }
              />
            )}

            {cuDestinationData.length > 0 && (
              <CustomLabelBarChart
                title="Top Destinations of Copper Production in 2023"
                description="Quantity in Tonnes"
                config={cuDestChartConfig}
                chartData={cuDestinationData}
                yAxisDataKey="destination"
                xAxisDataKey="quantity_tons"
                // barDataKey="quantity_tons"
                // yAxisLabelDataKey="Cobalt"
                // barLabelDataKey="label"
                footNote={
                  <>
                    <div className="leading-none text-muted-foreground">
                      Showing top {cuDestinationData.length > 4 ? 5 : ""}{" "}
                      destinations in 2023.
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
