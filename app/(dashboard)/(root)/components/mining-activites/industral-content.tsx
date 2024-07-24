"use client";
import React, { useState, useEffect } from "react";

import Map from "react-map-gl";
import { ArrowUpRight } from "lucide-react";

import useMapDetailsStore from "@/store/mapDetailsStore";

import LinkButton from "@/components/m-ui/link-button";
import MixedBarChart from "@/components/charts/shadcn/bar-chart/mixed-bar-chart";
import InteractiveAreaChart from "@/components/charts/shadcn/interactive-area-chart";
import MultipleBarChart from "@/components/charts/shadcn/bar-chart/multiple-bar-chart";

import { readCsvFile } from "@/app/actions/actions";

import { IndustralProjectDetailsProps } from "@/types/miningActivities";
import { transformData } from "@/lib/dataProcessing";

import {
  MonthlyProductionData,
  TMonthlyProductionData,
} from "@/types/miningActivities";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const SiteMap = ({
  site_latitude,
  site_longitude,
}: {
  site_latitude?: number;
  site_longitude?: number;
}) => {
  const [viewState, setViewState] = useState({
    longitude: 23.52741376552,
    latitude: -3.050471588628,
    zoom: 15,
  });

  useEffect(() => {
    if (site_latitude && site_longitude) {
      setViewState({
        longitude: site_longitude,
        latitude: site_latitude,
        zoom: 15,
      });
    }
  }, [site_latitude, site_longitude]);

  return (
    <div className="relative h-56 w-full sm:h-80">
      <Map
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        maxZoom={16}
        minZoom={14}
        style={{ position: "absolute" }}
        attributionControl={false}
      ></Map>
    </div>
  );
};

const SiteDetails = ({ data }: { data: IndustralProjectDetailsProps }) => {
  const { closeMapDetails } = useMapDetailsStore();
  const latitude = parseFloat(data.latitude_longitude?.split(",")[0]);
  const longitude = parseFloat(data.latitude_longitude?.split(",")[1]);

  const [filteredData, setFilteredData] = useState<MonthlyProductionData[]>([]);
  const [transformesData, setTransformesData] = useState<
    TMonthlyProductionData[]
  >([]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const csvData: MonthlyProductionData[] = await readCsvFile(
          "data/Industral Projects Monthly cobalt-copper Production - origin Statistiques.csv",
        );

        // Filter data based on short_name
        const filtered = csvData.filter(
          (row) => row.short_name === data.Short_name,
        );

        setTransformesData([]);
        setFilteredData(filtered);
      } catch (error) {
        console.error("Error fetching and processing production data:", error);
      }
    };

    fetchMonthlyData();
  }, [data.Short_name]);

  useEffect(() => {
    if (filteredData.length > 0) {
      // transform data into required format
      const transformedData = transformData(filteredData);
      setTransformesData(transformedData);
    }
  }, [filteredData]);

  const multipleBarchartConfig = {
    desktop: {
      label: "Cobalt",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Copper",
      color: "hsl(var(--chart-2))",
    },
  };

  const areaChartConfig = {
    visitors: {
      label: "Visitors",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  };

  const mixedBarChartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  };

  return (
    <div className="mx-auto">
      <SiteMap site_latitude={latitude} site_longitude={longitude} />
      <div className={`grid gap-4 p-4 sm:p-6`}>
        <h2 className="text-xl font-medium">{data.Project_name}</h2>

        <div className="mb-4 flex shrink grow flex-col space-y-6 p-1 text-sm font-medium text-foreground">
          {/* Geographical Details */}
          <div className="grid gap-2">
            {data.Nationality && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Nationality:{" "}
                  </span>
                  {data.Nationality}
                </p>
              </div>
            )}

            {data.Province && (
              <div>
                <span className="font-medium text-foreground/70">
                  Province:{" "}
                </span>
                {data.Province}
              </div>
            )}

            {data.Geographical_coordinates && (
              <div className="flex items-center gap-1">
                <p>
                  <span className="font-medium text-foreground/70">
                    Geographical Coordinates:{" "}
                  </span>
                  {data.Geographical_coordinates}
                </p>
              </div>
            )}

            {data.Geographical_description_project_description && (
              <div className="">
                <span className="font-medium text-foreground/70">
                  Geographical Description:
                </span>
                <p className="font-medium">
                  {data.Geographical_description_project_description}
                </p>
              </div>
            )}
          </div>

          {/* Mining Details */}
          <div className="grid gap-4">
            {data["Copper/Cobalt_annual_production_(2022)"] && (
              <div className="">
                <span className="font-medium text-foreground/70">
                  Annual Production 2022:
                </span>
                <p className="text-xl font-bold text-blue-600">
                  {data["Copper/Cobalt_annual_production_(2022)"]}
                </p>
              </div>
            )}

            {transformesData.length > 0 && (
              <MultipleBarChart
                title="Monthly Production of Copper and Cobalt in 2023"
                description="Quantity in Tonnes"
                config={multipleBarchartConfig}
                chartData={transformesData}
                firstDataKey="Cobalt"
                secondDataKey="Copper"
              />
            )}

            {/* <InteractiveAreaChart
              title="Copper/Cobalt"
              description="Production"
              config={areaChartConfig}
            /> */}

            <MixedBarChart
              title="Copper/Cobalt"
              description="Production"
              config={mixedBarChartConfig}
            />
          </div>

          {/* Mine Details */}
          <div className="grid gap-2">
            {data["Deposit_size_(official_reserves)"] && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Deposit Size:{" "}
                  </span>
                  {data["Deposit_size_(official_reserves)"]}
                </p>
              </div>
            )}
            {data.Project_size && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Project Size:{" "}
                  </span>
                  {data.Project_size}
                </p>
              </div>
            )}
            {data.Permit_ID && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Permit ID:{" "}
                  </span>
                  {data.Permit_ID}
                </p>
              </div>
            )}

            {data["Mine_life/permit_validity"] && (
              <div className="">
                <p>
                  <span className="font-medium text-foreground/70">
                    Mine Life/Permit Validity:{" "}
                  </span>
                  {data["Mine_life/permit_validity"]}
                </p>
              </div>
            )}

            {data.Mine_type && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Mine Type:{" "}
                  </span>
                  {data.Mine_type}
                </p>
              </div>
            )}

            {data.Ownership && (
              <div className="">
                <p>
                  <span className="font-medium text-foreground/70">
                    Ownership:{" "}
                  </span>
                  {data.Ownership}
                </p>
              </div>
            )}

            {data.Share_allocation && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Share Allocation:{" "}
                  </span>
                  {data.Share_allocation}
                </p>
              </div>
            )}

            {data.Contract_type && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Contract Type:{" "}
                  </span>
                  {data.Contract_type}
                </p>
              </div>
            )}
          </div>
        </div>

        {/*Navigate to Project Page */}
        <div>
          <LinkButton
            href={`/projects?project_id=${data.Short_name}`}
            variant="default"
            size={"lg"}
            onClick={closeMapDetails}
          >
            View Project
            <ArrowUpRight className="h-4 w-4" />
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export function IndustrialProjectsContent({
  data,
}: {
  data: IndustralProjectDetailsProps | null;
}) {
  if (!data) {
    return <div>No industral projects selected</div>;
  }
  const projectData = data;
  return <SiteDetails data={projectData} />;
}
