"use client";
import React, { useState, useEffect } from "react";
import Map from "react-map-gl";
import { active_sites, inactive_sites } from "@/data/mapData";
import { ArticanalsiteDetailsLabels } from "@/constants/application";
import { ArtisanalSiteDetailsProps } from "@/types/miningActivities";

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

export function ArtisanalSiteContent({ site_name }: { site_name: string }) {
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

export function ProcessingEntitiesContent({
  site_name,
}: {
  site_name: string;
}) {
  return <div> {site_name}</div>;
}
