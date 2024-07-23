"use client";
import React, { useState, useEffect } from "react";
import Map from "react-map-gl";
import { IndustralProjectDetailsProps } from "@/types/miningActivities";
import InteractiveAreaChart from "@/components/charts/shadcn/interactive-area-chart";
import MixedBarChart from "@/components/charts/shadcn/bar-chart/mixed-bar-chart";

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

export function IndustrialProjectsContent({
  data,
}: {
  data: IndustralProjectDetailsProps | null;
}) {
  if (!data) {
    return <div>No industral projects selected</div>;
  }

  const projectData = data;

  const latitude = parseFloat(projectData.latitude_longitude?.split(",")[0]);
  const longitude = parseFloat(projectData.latitude_longitude?.split(",")[1]);

  return (
    <div className="mx-auto">
      <SiteMap site_latitude={latitude} site_longitude={longitude} />
      <div className={`grid gap-4 p-4 sm:p-6`}>
        <h2 className="text-xl font-semibold">{projectData.Project_name}</h2>

        <div className="mb-4 flex shrink grow flex-col space-y-6 p-1 text-sm font-semibold text-foreground">
          {/* Geographical Details */}
          <div className="grid gap-2">
            {projectData.Nationality && (
              <div>
                <p>
                  <span className="font-semibold text-foreground/70">
                    Nationality:{" "}
                  </span>
                  {projectData.Nationality}
                </p>
              </div>
            )}

            {projectData.Province && (
              <div>
                <span className="font-semibold text-foreground/70">
                  Province:{" "}
                </span>
                {projectData.Province}
              </div>
            )}

            {projectData.Geographical_coordinates && (
              <div className="flex items-center gap-1">
                <p>
                  <span className="font-semibold text-foreground/70">
                    Geographical Coordinates:{" "}
                  </span>
                  {projectData.Geographical_coordinates}
                </p>
              </div>
            )}

            {projectData.Geographical_description_project_description && (
              <div className="">
                <span className="font-semibold text-foreground/70">
                  Geographical Description:
                </span>
                <p className="font-semibold">
                  {projectData.Geographical_description_project_description}
                </p>
              </div>
            )}
          </div>

          {/* Mining Details */}
          <div className="grid gap-2">
            {projectData["Copper/Cobalt_annual_production_(2022)"] && (
              <div className="">
                <span className="font-semibold text-foreground/70">
                  Annual Production 2022:
                </span>
                <p className="text-xl font-bold text-blue-600">
                  {projectData["Copper/Cobalt_annual_production_(2022)"]}
                </p>
              </div>
            )}

            <InteractiveAreaChart />
            <MixedBarChart />
          </div>

          {/* Mine Details */}
          <div className="grid gap-2">
            {projectData["Deposit_size_(official_reserves)"] && (
              <div>
                <p>
                  <span className="font-semibold text-foreground/70">
                    Deposit Size:{" "}
                  </span>
                  {projectData["Deposit_size_(official_reserves)"]}
                </p>
              </div>
            )}
            {projectData.Project_size && (
              <div>
                <p>
                  <span className="font-semibold text-foreground/70">
                    Project Size:{" "}
                  </span>
                  {projectData.Project_size}
                </p>
              </div>
            )}
            {projectData.Permit_ID && (
              <div>
                <p>
                  <span className="font-semibold text-foreground/70">
                    Permit ID:{" "}
                  </span>
                  {projectData.Permit_ID}
                </p>
              </div>
            )}

            {projectData["Mine_life/permit_validity"] && (
              <div className="">
                <p>
                  <span className="font-semibold text-foreground/70">
                    Mine Life/Permit Validity:{" "}
                  </span>
                  {projectData["Mine_life/permit_validity"]}
                </p>
              </div>
            )}

            {projectData.Mine_type && (
              <div>
                <p>
                  <span className="font-semibold text-foreground/70">
                    Mine Type:{" "}
                  </span>
                  {projectData.Mine_type}
                </p>
              </div>
            )}

            {projectData.Ownership && (
              <div className="">
                <p>
                  <span className="font-semibold text-foreground/70">
                    Ownership:{" "}
                  </span>
                  {projectData.Ownership}
                </p>
              </div>
            )}

            {projectData.Share_allocation && (
              <div>
                <p>
                  <span className="font-semibold text-foreground/70">
                    Share Allocation:{" "}
                  </span>
                  {projectData.Share_allocation}
                </p>
              </div>
            )}

            {projectData.Contract_type && (
              <div>
                <p>
                  <span className="font-semibold text-foreground/70">
                    Contract Type:{" "}
                  </span>
                  {projectData.Contract_type}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
