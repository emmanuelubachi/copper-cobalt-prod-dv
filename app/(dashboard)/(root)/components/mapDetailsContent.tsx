import React from "react";
import { useSearchParams } from "next/navigation";
import { active_sites, inactive_sites } from "@/data/mapData";

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

const SiteDetails = ({ site }: { site: SiteDetailsProps }) => {
  return (
    <div className="mb-4 space-y-4 rounded-lg border p-4 shadow-lg">
      <h2 className="text-xl font-bold">{site.site_name}</h2>
      <p>
        <span className="font-semibold">Sources:</span> {site.sources}
      </p>
      <p>
        <span className="font-semibold">Visit Date:</span> {site.visit_date}
      </p>
      <p>
        <span className="font-semibold">Visited by BGR:</span>
        {site.site_visit__bgr}
      </p>
      <p>
        <span className="font-semibold">Visited by CGSP:</span>
        {site.site_visit__cgsp}
      </p>
      <p>
        <span className="font-semibold">Longitude:</span> {site.longitude}
      </p>
      <p>
        <span className="font-semibold">Latitude:</span> {site.latitude}
      </p>
      <p>
        <span className="font-semibold">Location Origin:</span>
        {site.location_origin}
      </p>
      <p>
        <span className="font-semibold">Province/Territory:</span>
        {site.province__territory}
      </p>
      <p>
        <span className="font-semibold">Cooperative in Charge:</span>
        {site.cooperative_in_charge || "N/A"}
      </p>
      <p>
        <span className="font-semibold">Employees:</span> {site.employees}
      </p>
      <p>
        <span className="font-semibold">Minerals Extracted:</span>
        {site.minerals_extracted}
      </p>
      <p>
        <span className="font-semibold">Point of Sale:</span>
        {site.point_of_sale__purchasing_station || "N/A"}
      </p>
      <p>
        <span className="font-semibold">Status in 2023:</span>
        {site.status_in_2023}
      </p>
    </div>
  );
};

export default function MapDetailsContent({
  site_name,
}: {
  site_name: string;
}) {
  const searchParams = useSearchParams();
  // const artisanal_site_id = searchParams.get("artisanal_site_id");
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
    <div className="container mx-auto px-2">
      <SiteDetails site={artisanal_site_details as SiteDetailsProps} />
    </div>
  );
}
