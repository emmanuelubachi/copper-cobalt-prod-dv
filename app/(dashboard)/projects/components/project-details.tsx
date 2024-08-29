"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectInfo } from "@/types";
import MultipleBarChart from "@/components/charts/shadcn/bar-chart/multiple-bar-chart";

import {
  coDestChartConfig,
  cuDestChartConfig,
  monthlyProdChartConfig,
} from "@/constants/chart";
import {
  IndustralProjectDetailsProps,
  TDestinationData,
  TMonthlyProductionData,
} from "@/types/map";
import { DetailedYearlySummary, YearlySummary } from "@/types/projects";
import CustomLabelBarChart from "@/components/charts/shadcn/bar-chart/custom-label-bar-chart";
import YearToggle from "@/components/year-toggle";
import { Years } from "@/data/chartData";
import TreeMapChart from "@/components/charts/shadcn/tree-map/custom-treemap";
import { ChartConfig } from "@/components/ui/chart";
import useDeviceType from "@/hooks/useDeviceType";
import SearchBarDialog from "@/components/elements/searchBar";
import { CompaniesList, TreemapData } from "@/constants/application";
import { treeMapChartConfig } from "@/constants/chart";
import {
  calculateDetailedYearlySums,
  calculateYearlySums,
  transformDestinationData,
  transformMonthlyData,
} from "@/lib/dataProcessing";

export default function ProjectDetails({
  projectInfo,
  projectData,
  productData,
  productionYears,
  totalProductionData,
}: {
  projectInfo: ProjectInfo;
  projectData: IndustralProjectDetailsProps;
  productData: any[];
  productionYears: string[];
  totalProductionData: any[];
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

  const maxYear =
    productionYears.length > 0
      ? Math.max(...productionYears.map(Number)).toString()
      : undefined;

  // Manage the selected year in state
  const [selectedYear, setSelectedYear] = useState<string | undefined>(maxYear);

  // Update the selected year when productionYears or maxYear changes
  useEffect(() => {
    // Determine the maximum year from productionYears
    const maxYear =
      productionYears.length > 0
        ? Math.max(...productionYears.map(Number)).toString()
        : undefined;
    setSelectedYear(maxYear);
  }, [productionYears, project_id]);

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

        setTotalProd(totalProd);
        setTotalProdDetails(totalProd2);
      } catch (error) {
        console.error(
          "Error fetching and processing total industral projects production data:",
          error,
        );
      }
    };

    //   const fetchMonthlyData = async () => {
    //     try {
    //       // Filter data based on _project_id
    //       const filtered = montlyProductionData.filter(
    //         (row) => row._project_id === project_id,
    //       );
    //       // Process data for chart
    //       const MonthlyProductionData = transformMonthlyData(filtered);

    //       setMonthlyData(MonthlyProductionData);
    //     } catch (error) {
    //       console.error(
    //         "Error fetching and processing monthly industral projects production data:",
    //         error,
    //       );
    //     }
    //   };

    //   const fetchCoDestinationData = async () => {
    //     try {
    //       // Filter data based on short_name
    //       const filtered = cobaltDestinationData.filter(
    //         (row) => row._project_id === project_id,
    //       );

    //       // Process data for chart - sort for top destinations
    //       const CoDestinationData = transformDestinationData(filtered);

    //       setCoDestinationData(CoDestinationData);
    //     } catch (error) {
    //       console.error(
    //         "Error fetching and processing co destination data:",
    //         error,
    //       );
    //     }
    //   };

    //   const fetchCuDestinationData = async () => {
    //     try {
    //       // Filter data based on short_name
    //       const filtered = copperDestinationData.filter(
    //         (row) => row._project_id === project_id,
    //       );

    //       // Process data for chart - sort for top destinations
    //       const CuDestinationData = transformDestinationData(filtered);

    //       setCuDestinationData(CuDestinationData);
    //     } catch (error) {
    //       console.error(
    //         "Error fetching and processing cu destination data:",
    //         error,
    //       );
    //     }
    //   };

    fetchTotalProductionData();
    //   fetchMonthlyData();
    //   fetchCoDestinationData();
    //   fetchCuDestinationData();
  }, [project_id, totalProductionData]);

  const products = productData
    .filter((d) => d.year === selectedYear)
    .map((d) => ({
      name: d.concentration,
      size: parseInt(d.quantity),
      transaction: parseInt(d.transaction),
    }));

  console.log("products", products);

  return (
    <section className="space-y-0">
      <div className="left-0 right-0 z-20 flex w-full flex-col-reverse gap-4 space-y-2 bg-background/50 py-2 backdrop-blur-md dark:bg-neutral-900/50 sm:justify-between sm:py-4 lg:flex-row lg:space-y-0">
        <h2 className="text-start text-h5 font-medium tracking-tight">
          {projectInfo.project_name}
        </h2>
        <div className="ml-auto flex w-full flex-col items-center justify-end gap-2 md:w-fit md:flex-row">
          <SearchBarDialog data={CompaniesList} />
          <YearToggle
            value={selectedYear}
            onChangeFunction={setSelectedYear}
            years={Years}
            dynamicYears={productionYears}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-4">
        <div className="grid items-start gap-4 xl:grid-cols-3">
          {/* Project Info and Treemap */}
          <div className="space-y-4 xl:col-span-2">
            {totalProd.length > 0 && (
              <Card className="shrink border-none bg-transparent shadow-none lg:col-span-2 lg:h-fit">
                <CardContent className="space-y-4 px-0 lg:pt-2">
                  <div className="grid gap-8 lg:grid-cols-2">
                    {/* Project Info */}
                    <div className="flex flex-col flex-wrap gap-2 text-start text-sm tracking-tight text-muted-foreground sm:text-p">
                      <h4 className="leading-none">
                        Nationality:{" "}
                        <span className="font-medium text-foreground">
                          {projectData && projectData.Nationality}
                        </span>
                      </h4>

                      <h4 className="leading-none">
                        Province:{" "}
                        <span className="font-medium text-foreground">
                          {projectData && projectData.Province}
                        </span>
                      </h4>

                      <h4 className="leading-none">
                        Coordinates:{" "}
                        <span className="font-medium text-foreground">
                          {projectData && projectData.Geographical_coordinates}
                        </span>
                      </h4>
                      <h4 className="leading-none">
                        Ownership:{" "}
                        <span className="font-medium text-foreground">
                          {projectData && projectData.Ownership}
                        </span>
                      </h4>
                    </div>

                    {/* Annual Exports */}
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold leading-none tracking-tight">
                          {totalProd.length > 0 && totalProd[0].year} Annual
                          Exports
                        </h4>
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
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Product Composition */}
            {products.length > 0 && (
              <TreeMapChart
                title={`Product Composition in ${selectedYear}`}
                description="Quantity in Tonnes"
                config={treeMapChartConfig}
                // chartData={TreemapData}
                chartData={products}
              />
            )}
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
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
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
        </div>
      </div>
    </section>
  );
}
