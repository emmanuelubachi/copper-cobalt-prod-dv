"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import MultipleBarChart from "@/components/charts/shadcn/bar-chart/multiple-bar-chart";

import {
  chartConfig,
  coDestChartConfig,
  cuDestChartConfig,
  monthlyProdChartConfig,
} from "@/constants/chart";
import {
  IndustralProjectDetailsProps,
  TDestinationData,
  TMonthlyProductionData,
} from "@/types/map";
import {
  DetailedYearlySummary,
  ProjectDataProps,
  YearlySummary,
} from "@/types/projects";
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
  transformProdDesData,
} from "@/lib/dataProcessing";
import ProjectDetails from "./project-details";
import { ProjectInfo } from "@/types";
import MixedBarChart from "@/components/charts/shadcn/bar-chart/mixed-bar-chart";
import SiteMap from "./map";

export default function Projects({
  projectInfo,
  projectData,
  productData,
  productionYears,
  montlyProductionData,
  cobaltDestinationData,
  copperDestinationData,
}: {
  projectInfo: ProjectInfo;
  projectData: ProjectDataProps;
  productData: any[];
  productionYears: string[];
  montlyProductionData: any[];
  cobaltDestinationData: any[];
  copperDestinationData: any[];
}) {
  const [monthlyData, setMonthlyData] = useState<TMonthlyProductionData[]>([]);
  // const [coDestinationData, setCoDestinationData] = useState<
  //   TDestinationData[]
  // >([]);
  // const [cuDestinationData, setCuDestinationData] = useState<
  //   TDestinationData[]
  // >([]);

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
    // const fetchCoDestinationData = async () => {
    //   try {
    //     // Filter data based on short_name
    //     const filtered = cobaltDestinationData.filter(
    //       (row) => row._project_id === project_id,
    //     );
    //     // Process data for chart - sort for top destinations
    //     const CoDestinationData = transformDestinationData(filtered);
    //     setCoDestinationData(CoDestinationData);
    //   } catch (error) {
    //     console.error(
    //       "Error fetching and processing co destination data:",
    //       error,
    //     );
    //   }
    // };
    // const fetchCuDestinationData = async () => {
    //   try {
    //     // Filter data based on short_name
    //     const filtered = copperDestinationData.filter(
    //       (row) => row._project_id === project_id,
    //     );
    //     // Process data for chart - sort for top destinations
    //     const CuDestinationData = transformDestinationData(filtered);
    //     setCuDestinationData(CuDestinationData);
    //   } catch (error) {
    //     console.error(
    //       "Error fetching and processing cu destination data:",
    //       error,
    //     );
    //   }
    // };
    fetchMonthlyData();
    // fetchCoDestinationData();
    // fetchCuDestinationData();
  }, [
    project_id,
    montlyProductionData,
    // cobaltDestinationData,
    // copperDestinationData,
  ]);

  const products = productData
    .filter((d) => d.year === selectedYear)
    .map((d) => ({
      product: d.product,
      concentration: d.concentration,
      quantity: parseInt(d.quantity),
      transaction: parseInt(d.transaction),
    }));

  const destinationData = productData
    .filter((d) => d.year === selectedYear)
    .map((d) => ({
      destination: d.destination,
      product: d.product,
      quantity: parseInt(d.quantity),
      transaction: parseInt(d.transaction),
    }));

  // console.log("destinationData", destinationData);
  console.log("Transformed", transformProdDesData(destinationData));

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
            isDynamic
            dynamicYears={productionYears}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-4">
        <div className="grid items-start gap-4 xl:grid-cols-3">
          {/* Project Info and Treemap */}
          <div className="space-y-4 xl:col-span-2">
            {products.length > 0 && (
              <ProjectDetails
                projectData={projectData}
                productData={products}
                year={selectedYear}
              />
            )}

            {/* Product Composition */}
            {products.length > 0 && (
              <TreeMapChart
                title={`Product Composition in ${selectedYear}`}
                description="Quantity in Tonnes"
                config={treeMapChartConfig}
                namekey="concentration"
                sizekey="quantity"
                chartData={products}
              />
            )}
          </div>

          {/* Destination */}
          <div className="grid grid-cols-1 gap-4">
            {destinationData.length > 0 &&
              projectData.latitude &&
              projectData.longitude && (
                <SiteMap
                  site_latitude={parseFloat(projectData.latitude)}
                  site_longitude={parseFloat(projectData.longitude)}
                />
              )}

            {/* {coDestinationData.length > 0 && (
              <CustomLabelBarChart
                title="Top Destinations of Cobalt Production in 2023"
                description="Quantity in Tonnes"
                config={coDestChartConfig}
                chartData={coDestinationData}
                yAxisDataKey="destination"
                xAxisDataKey="quantity_tons"
                className="h-[200px]"
                footNote={
                  <>
                    <div className="leading-none text-muted-foreground">
                      Showing top {coDestinationData.length > 4 ? 5 : ""}{" "}
                      destinations in 2023.
                    </div>
                  </>
                }
              />
            )} */}
            {destinationData.length > 0 && (
              <MixedBarChart
                title={`Top Destinations of ${projectInfo.project_name} Exports in ${selectedYear}`}
                description="Quantity in Tonnes"
                config={chartConfig}
                chartData={transformProdDesData(destinationData)}
              />
            )}

            {/* {cuDestinationData.length > 0 && (
              <CustomLabelBarChart
                title="Top Destinations of Copper Production in 2023"
                description="Quantity in Tonnes"
                config={cuDestChartConfig}
                chartData={cuDestinationData}
                yAxisDataKey="destination"
                xAxisDataKey="quantity_tons"
                className="h-[200px]"
                footNote={
                  <>
                    <div className="leading-none text-muted-foreground">
                      Showing top {cuDestinationData.length > 4 ? 5 : ""}{" "}
                      destinations in 2023.
                    </div>
                  </>
                }
              />
            )} */}
          </div>
        </div>
        {/* Monthly Production */}
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
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
    </section>
  );
}
