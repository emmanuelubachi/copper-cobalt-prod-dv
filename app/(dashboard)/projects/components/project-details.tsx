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
import YearToggle from "@/components/year-toggle";
import { Years } from "@/data/chartData";
import TreeMapChart from "@/components/charts/shadcn/tree-map/custom-treemap";
import { ChartConfig } from "@/components/ui/chart";
import FilterButton from "@/components/elements/filterButton";
import ProjectFilter from "./project-filter";
import useDeviceType from "@/hooks/useDeviceType";

export default function ProjectDetails({
  projectInfo,
}: {
  projectInfo: ProjectInfo;
}) {
  const { isMobile } = useDeviceType();

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

  const treeMapChartConfig: ChartConfig = {
    Metals: {
      label: "Metals",
      color: "hsl(var(--chart-1))",
    },
    Cobalt: {
      label: "Cobalt",
      color: "hsl(var(--chart-2))",
    },
    Copper: {
      label: "Copper",
      color: "hsl(var(--chart-3))",
    },
    Gold: {
      label: "Gold",
      color: "hsl(var(--chart-4))",
    },
    Silver: {
      label: "Silver",
      color: "hsl(var(--chart-5))",
    },
    Platinum: {
      label: "Platinum",
      color: "hsl(var(--chart-6))",
    },
  };
  const data = [
    {
      name: "Metals",
      children: [
        { name: "Axes", size: 1302 },
        { name: "Axis", size: 24593 },
        { name: "AxisGridLine", size: 652 },
        { name: "AxisLabel", size: 636 },
        { name: "CartesianAxes", size: 6703 },
      ],
    },
    {
      name: "Cobalt",
      children: [
        { name: "AnchorControl", size: 2138 },
        { name: "ClickControl", size: 3824 },
        { name: "Control", size: 1353 },
        { name: "ControlList", size: 4665 },
        { name: "DragControl", size: 2649 },
        { name: "ExpandControl", size: 2832 },
        { name: "HoverControl", size: 4896 },
        { name: "IControl", size: 763 },
        { name: "PanZoomControl", size: 5222 },
        { name: "SelectionControl", size: 7862 },
        { name: "TooltipControl", size: 8435 },
      ],
    },
    {
      name: "Copper",
      children: [
        { name: "Data", size: 20544 },
        { name: "DataList", size: 19788 },
        { name: "DataSprite", size: 10349 },
        { name: "EdgeSprite", size: 3301 },
        { name: "NodeSprite", size: 19382 },
        {
          name: "render",
          children: [
            { name: "ArrowType", size: 698 },
            { name: "EdgeRenderer", size: 5569 },
            { name: "IRenderer", size: 353 },
            { name: "ShapeRenderer", size: 2247 },
          ],
        },
        { name: "ScaleBinding", size: 11275 },
        { name: "Tree", size: 7147 },
        { name: "TreeBuilder", size: 9930 },
      ],
    },
    {
      name: "Platinum",
      children: [
        { name: "DataEvent", size: 7313 },
        { name: "SelectionEvent", size: 6880 },
        { name: "TooltipEvent", size: 3701 },
        { name: "VisualizationEvent", size: 2117 },
      ],
    },
    {
      name: "Silver",
      children: [
        { name: "Legend", size: 20859 },
        { name: "LegendItem", size: 4614 },
        { name: "LegendRange", size: 10530 },
      ],
    },
    {
      name: "Gold",
      children: [
        {
          name: "distortion",
          children: [
            { name: "BifocalDistortion", size: 4461 },
            { name: "Distortion", size: 6314 },
            { name: "FisheyeDistortion", size: 3444 },
          ],
        },
        {
          name: "encoder",
          children: [
            { name: "ColorEncoder", size: 3179 },
            { name: "Encoder", size: 4060 },
            { name: "PropertyEncoder", size: 4138 },
            { name: "ShapeEncoder", size: 1690 },
            { name: "SizeEncoder", size: 1830 },
          ],
        },
        {
          name: "filter",
          children: [
            { name: "FisheyeTreeFilter", size: 5219 },
            { name: "GraphDistanceFilter", size: 3165 },
            { name: "VisibilityFilter", size: 3509 },
          ],
        },
        { name: "IOperator", size: 1286 },
        {
          name: "label",
          children: [
            { name: "Labeler", size: 9956 },
            { name: "RadialLabeler", size: 3899 },
            { name: "StackedAreaLabeler", size: 3202 },
          ],
        },
        {
          name: "layout",
          children: [
            { name: "AxisLayout", size: 6725 },
            { name: "BundledEdgeRouter", size: 3727 },
            { name: "CircleLayout", size: 9317 },
            { name: "CirclePackingLayout", size: 12003 },
            { name: "DendrogramLayout", size: 4853 },
            { name: "ForceDirectedLayout", size: 8411 },
            { name: "IcicleTreeLayout", size: 4864 },
            { name: "IndentedTreeLayout", size: 3174 },
            { name: "Layout", size: 7881 },
            { name: "NodeLinkTreeLayout", size: 12870 },
            { name: "PieLayout", size: 2728 },
            { name: "RadialTreeLayout", size: 12348 },
            { name: "RandomLayout", size: 870 },
            { name: "StackedAreaLayout", size: 9121 },
            { name: "TreeMapLayout", size: 9191 },
          ],
        },
        { name: "Operator", size: 2490 },
        { name: "OperatorList", size: 5248 },
        { name: "OperatorSequence", size: 4190 },
        { name: "OperatorSwitch", size: 2581 },
        { name: "SortOperator", size: 2023 },
      ],
    },
  ];

  return (
    <section className="space-y-2">
      <div className="left-0 right-0 z-20 items-center justify-end gap-6 space-y-4 bg-background/50 py-4 backdrop-blur-md dark:bg-neutral-900/50 lg:flex lg:space-y-0">
        <div className="flex items-center justify-end gap-2">
          <YearToggle
            defaultValue={selectedYear}
            onChangeFunction={setSelectedYear}
            years={Years}
          />
          <div>
            {isMobile ? (
              <FilterButton
                content={<ProjectFilter />}
                label="Projects"
                type="tooltip"
                tooltip="Select a project"
                className="!rounded-full text-xs transition-all duration-300"
                size={"icon"}
              />
            ) : (
              <FilterButton
                content={<ProjectFilter />}
                label="Projects"
                type="tooltip"
                tooltip="Select a project"
                className="text-xs"
              />
            )}
          </div>
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

            {/* Product Composition */}
            <TreeMapChart
              title="Production of Copper and Cobalt in 2023"
              description="Quantity in Tonnes"
              config={treeMapChartConfig}
              chartData={data}
            />
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
