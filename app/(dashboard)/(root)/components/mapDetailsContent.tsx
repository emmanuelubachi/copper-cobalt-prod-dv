"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Map from "react-map-gl";
import { active_sites, inactive_sites } from "@/data/mapData";
import {
  ArticanalsiteDetailsLabels,
  IndustrialProjectDetailsLabels,
} from "@/constants/application";
import {
  IndustralProjectDetailsProps,
  ArtisanalSiteDetailsProps,
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

const ArtisanalSiteDetails = ({
  site,
  className,
}: {
  site: ArtisanalSiteDetailsProps;
  className?: string;
}) => {
  return (
    <div className={`grid gap-2 ${className}`}>
      <h2 className="text-xl font-bold">{site.site_name}</h2>
      <div className="mb-4 flex shrink grow flex-col space-y-4 rounded-lg border p-2 shadow-lg">
        {ArticanalsiteDetailsLabels.map(({ key, label }) => (
          <p key={key}>
            <span className="font-semibold">{label}:</span> {site[key] ?? "N/A"}
          </p>
        ))}
      </div>
    </div>
  );
};

const mapDataToProjectInfo = (data: any): IndustralProjectDetailsProps => ({
  N: data["N°"],
  ProjectName: data["Project_name"],
  ShortName: data["Short_name"],
  PermitID: data["Permit_ID"],
  Code: data["Code"],
  Ownership: data["Ownership"],
  Nationality: data["Nationality"],
  AnnualProduction2022: data["Copper/Cobalt_annual_production_(2022)"],
  ISOA3: data["ISO_A3"],
  Province: data["Province"],
  GeographicalCoordinates: data["Geographical_coordinates"],
  LatitudeLongitude: data["latitude_longitude"],
  GeographicalDescription:
    data["Geographical_description_&_project_description"],
  ProjectSize: data["Project_size"],
  DepositSize: data["Deposit size (official_reserves)"],
  MineLifePermitValidity: data["Mine_life/permit_validity"],
  MineType: data["Mine_type"],
  ContractType: data["Contract_type"],
  ShareAllocation: data["Share_allocation"],
  ProjectBackground: data["Project_background"],
  Management: data["Management"],
  NumberOfEmployees: data["Number of employees"],
  SourcesLinks: data["Sources/Liens"],
  Nat0: data["nat-0"],
  Nat1: data["nat-1"],
});

const IndustrialProjectDetails = ({
  project,
  className,
}: {
  project: IndustralProjectDetailsProps;
  className?: string;
}) => {
  return (
    <div className={`grid gap-2 ${className}`}>
      <h2 className="text-xl font-bold">{project.ProjectName}</h2>

      <div className="mb-4 flex shrink grow flex-col space-y-4 rounded-lg border p-2 shadow-lg">
        {IndustrialProjectDetailsLabels.map(({ key, label }) => {
          const value = project[key];
          if (value && value !== "N/A" && value !== "") {
            return (
              <p key={key}>
                <span className="font-semibold">{label}:</span> {value}
              </p>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export function ArtisanalSiteContent({ site_name }: { site_name: string }) {
  const searchParams = useSearchParams();
  // const selectedSite = searchParams.get("selected_site");

  const artisanal_site_id = site_name;

  if (!artisanal_site_id) {
    return <div>No artisanal site selected</div>;
  }

  const activeSites = active_sites.data;
  const inactiveSites = inactive_sites.data;

  const artisanal_site_details =
    activeSites.find((site) => site.site_name === artisanal_site_id) ||
    inactiveSites.find((site) => site.site_name === artisanal_site_id);

  return (
    <div className="mx-auto">
      {/* <h1 className="text-3xl font-bold">selected site: {selectedSite}</h1> */}
      <SiteMap
        site_latitude={artisanal_site_details?.latitude}
        site_longitude={artisanal_site_details?.longitude}
      />
      <ArtisanalSiteDetails
        className="p-4 sm:p-6"
        site={artisanal_site_details as ArtisanalSiteDetailsProps}
      />
    </div>
  );
}

export function IndustrialProjectsContent({
  data,
}: {
  data: IndustralProjectDetailsProps | null;
}) {
  if (!data) {
    return <div>No industral projects selected</div>;
  }

  const projectData = mapDataToProjectInfo(data);

  return (
    <div className="mx-auto">
      <IndustrialProjectDetails className="p-4 sm:p-6" project={projectData} />
    </div>
  );
}

export function ProcessingEntitiesContent({
  site_name,
}: {
  site_name: string;
}) {
  return <div> {site_name}</div>;
}
