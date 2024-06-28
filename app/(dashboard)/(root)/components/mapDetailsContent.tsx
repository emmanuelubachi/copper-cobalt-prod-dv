"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { active_sites, inactive_sites } from "@/data/mapData";

import Map from "react-map-gl";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface SiteDetailsProps {
  sources: string;
  site_name: string;
  visit_date: string;
  site_visit__bgr: string;
  site_visit__cgsp: string;
  geom: string;
  longitude: number;
  latitude: number;
  location_origin: string;
  province__territory: string;
  cooperative_in_charge: string | null;
  employees: number;
  minerals_extracted: string;
  point_of_sale__purchasing_station: string | null;
  status_in_2023: string;
}

const siteDetailsLabels: { key: keyof SiteDetailsProps; label: string }[] = [
  { key: "sources", label: "Sources" },
  { key: "visit_date", label: "Visit Date" },
  { key: "site_visit__bgr", label: "Visited by BGR" },
  { key: "site_visit__cgsp", label: "Visited by CGSP" },
  { key: "longitude", label: "Longitude" },
  { key: "latitude", label: "Latitude" },
  { key: "location_origin", label: "Location Origin" },
  { key: "province__territory", label: "Province/Territory" },
  { key: "cooperative_in_charge", label: "Cooperative in Charge" },
  { key: "employees", label: "Employees" },
  { key: "minerals_extracted", label: "Minerals Extracted" },
  { key: "point_of_sale__purchasing_station", label: "Point of Sale" },
  { key: "status_in_2023", label: "Status in 2023" },
];

const SiteDetails = ({
  site,
  className,
}: {
  site: SiteDetailsProps;
  className?: string;
}) => {
  return (
    <div className={`grid gap-2 ${className}`}>
      <h2 className="text-xl font-bold">{site.site_name}</h2>
      <div className="mb-4 flex shrink grow flex-col space-y-4 rounded-lg border p-2 shadow-lg">
        {siteDetailsLabels.map(({ key, label }) => (
          <p key={key}>
            <span className="font-semibold">{label}:</span> {site[key] ?? "N/A"}
          </p>
        ))}
      </div>
    </div>
  );
};

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
    zoom: 4,
  });

  useEffect(() => {
    if (site_latitude && site_longitude) {
      setViewState({
        longitude: site_longitude,
        latitude: site_latitude,
        zoom: 14,
      });
    }
  }, [site_latitude, site_longitude]);

  return (
    <div className="relative h-48 w-full sm:h-80">
      <Map
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        {...viewState}
        style={{ position: "absolute" }}
        attributionControl={false}
      ></Map>
    </div>
  );
};

export default function MapDetailsContent({
  site_name,
}: {
  site_name: string;
}) {
  const searchParams = useSearchParams();
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
      <SiteMap
        site_latitude={artisanal_site_details?.latitude}
        site_longitude={artisanal_site_details?.longitude}
      />
      <SiteDetails
        className="p-4 sm:p-6"
        site={artisanal_site_details as SiteDetailsProps}
      />
    </div>
  );
}
