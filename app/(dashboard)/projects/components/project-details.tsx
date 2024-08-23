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
import FilterButton from "@/components/elements/filterButton";
import ProjectFilter from "./project-filter";
import { ShareButton } from "@/components/elements/shareButton";
import YearToggle from "@/components/year-toggle";

import { Years } from "@/data/chartData";

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

  const [selectedYear, setSelectedYear] = useState<string>("2022");

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
    <section className="space-y-2">
      <div className="left-0 right-0 z-20 items-center justify-end gap-6 space-y-4 bg-background/50 py-4 backdrop-blur-md dark:bg-neutral-900/50 lg:flex lg:space-y-0">
        <div className="flex items-center justify-end gap-2">
          <YearToggle
            defaultValue={selectedYear}
            onChangeFunction={setSelectedYear}
            years={Years}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-4">
        <div className="grid items-start gap-4 xl:grid-cols-3">
          {/* Total production */}
          <div className="space-y-4 xl:col-span-2">
            {totalProd.length > 0 && (
              <Card className="shrink border-none bg-transparent shadow-none lg:col-span-2 lg:h-fit">
                <CardContent className="space-y-4 px-0 lg:pt-2">
                  <CardTitle className="text-start text-h5 font-medium tracking-tight">
                    {projectInfo.project_name}
                  </CardTitle>

                  <div className="grid gap-2 lg:grid-cols-2">
                    <h3 className="text-start text-p font-medium tracking-tight">
                      {projectInfo.project_name}
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <CardTitle>
                          {totalProd.length > 0 && totalProd[0].year} Annual
                          Production
                        </CardTitle>
                        <CardDescription>
                          Total Production including quantity sold locally and
                          exported
                        </CardDescription>
                      </div>

                      <div className="flex gap-10">
                        {totalProd[0].totalCobalt > 0 && (
                          <div className="space-y-4">
                            <div className="border-l-4 border-chart6 pl-4 font-bold">
                              <p className="text-h5 font-bold text-foreground/90">
                                {totalProd[0].totalCobalt > 0 &&
                                  totalProd[0].totalCobalt
                                    .toFixed(1)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                {" t"}
                              </p>
                              <p className="text-sm text-foreground/70">
                                <span className="text-chart6">Cobalt</span>{" "}
                                Production
                              </p>
                            </div>

                            {/* <div className="flex items-center justify-between pr-8">
                              {totalProdDetails[0].totalCobaltExport > 0 && (
                                <div className="font-bold">
                                  <p className="text-p font-bold text-foreground/80">
                                    {totalProdDetails[0].totalCobaltExport
                                      .toFixed(1)
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                      " t"}
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
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                      " t"}
                                  </p>
                                  <span className="text-pxs font-bold text-foreground/50">
                                    Co Domestic Sales
                                  </span>
                                </div>
                              )}
                            </div> */}
                          </div>
                        )}
                        {totalProd[0].totalCopper > 0 && (
                          <div className="space-y-4">
                            <div className="border-l-4 border-chart5 pl-4 font-bold">
                              <p className="text-h5 font-bold text-foreground/90">
                                {totalProd[0].totalCopper > 0 &&
                                  totalProd[0].totalCopper
                                    .toFixed(1)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                {" t"}
                              </p>
                              <p className="text-sm text-foreground/70">
                                <span className="text-chart5">Copper</span>{" "}
                                Production
                              </p>
                            </div>

                            {/* <div className="flex items-center justify-between pr-8">
                              {totalProdDetails[0].totalCopperExport > 0 && (
                                <div className="font-bold">
                                  <p className="text-p font-bold text-foreground/80">
                                    {totalProdDetails[0].totalCopperExport
                                      .toFixed(1)
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                      " t"}
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
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                      " t"}
                                  </p>
                                  <span className="text-pxs font-bold text-foreground/50">
                                    Cu Domestic Sales
                                  </span>
                                </div>
                              )}
                            </div> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Destination */}
            <div className="grid">
              {coDestinationData.length > 0 && (
                <CustomLabelBarChart
                  title="Top Destinations of Cobalt Production in 2023"
                  description="Quantity in Tonnes"
                  config={coDestChartConfig}
                  chartData={coDestinationData}
                  yAxisDataKey="destination"
                  xAxisDataKey="quantity_tons"
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
            </div>
          </div>

          {/* Monthly Production */}
          <div className="grid grid-cols-1 gap-4">
            {monthlyData.length > 0 && (
              <div className="">
                <MultipleBarChart
                  title="Production of Copper and Cobalt in 2023"
                  description="Quantity in Tonnes"
                  config={monthlyProdChartConfig}
                  chartData={monthlyData}
                  firstDataKey="Cobalt"
                  secondDataKey="Copper"
                  classname="h-[189px]"
                  footNote={
                    <div className="leading-none text-muted-foreground">
                      Includes quantities both exported and sold locally.
                    </div>
                  }
                />
              </div>
            )}
            {monthlyData.length > 0 && (
              <div className="">
                <MultipleBarChart
                  title="Production of Copper and Cobalt in 2023"
                  description="Quantity in Tonnes"
                  config={monthlyProdChartConfig}
                  chartData={monthlyData}
                  firstDataKey="Cobalt"
                  secondDataKey="Copper"
                  classname="h-[189px]"
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
        {/* Destination */}
        {/* <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
          {coDestinationData.length > 0 && (
            <CustomLabelBarChart
              title="Top Destinations of Cobalt Production in 2023"
              description="Quantity in Tonnes"
              config={coDestChartConfig}
              chartData={coDestinationData}
              yAxisDataKey="destination"
              xAxisDataKey="quantity_tons"
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
        </div> */}
      </div>
    </section>
  );
}
