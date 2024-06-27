import React from "react";
import { Marker } from "react-map-gl";
import Link from "next/link";
import Pin from "@/components/svg/pin";
import { ArtisanalSite } from "@/types";

interface MarkersComponentProps {
  activeSites: ArtisanalSite[];
  inactiveSites: ArtisanalSite[];
  showActiveMarkers: boolean;
  showInactiveMarkers: boolean;
  artisanal_site_id: string | null;
  handleMapDetailsClick: (latitude: number, longitude: number) => void;
}

const MarkersComponent: React.FC<MarkersComponentProps> = ({
  activeSites,
  inactiveSites,
  showActiveMarkers,
  showInactiveMarkers,
  artisanal_site_id,
  handleMapDetailsClick,
}) => {
  return (
    <>
      {showActiveMarkers &&
        activeSites.map((site, index) => (
          <Marker
            key={`active-${index}`}
            longitude={site.longitude}
            latitude={site.latitude}
            anchor="bottom"
            onClick={() => handleMapDetailsClick(site.latitude, site.longitude)}
          >
            <Link href={`/?artisanal_site_id=${site.site_name}`}>
              <Pin
                className={`${
                  artisanal_site_id === site.site_name
                    ? "h-12 w-12 animate-pulse fill-cyan-700 stroke-cyan-50"
                    : "h-6 w-6 fill-cyan-700 stroke-cyan-50 dark:fill-cyan-500 dark:stroke-white"
                }`}
              />
            </Link>
          </Marker>
        ))}

      {showInactiveMarkers &&
        inactiveSites.map((site, index) => (
          <Marker
            key={`inactive-${index}`}
            longitude={site.longitude}
            latitude={site.latitude}
            anchor="bottom"
            onClick={() => handleMapDetailsClick(site.latitude, site.longitude)}
          >
            <Link href={`/?artisanal_site_id=${site.site_name}`}>
              <Pin className="fill-neutral-500 stroke-gray-50 dark:fill-neutral-400 dark:stroke-white" />
            </Link>
          </Marker>
        ))}
    </>
  );
};

export default MarkersComponent;
