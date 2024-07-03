import React from "react";
import { useCallback, useEffect, useState, useRef } from "react";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import useMapDetailsStore from "@/store/mapDetailsStore";
import { useSearchParams, useRouter } from "next/navigation";
import { RiMapPin2Fill } from "@remixicon/react";
import { Popup, Marker } from "react-map-gl";
import { MapRef } from "react-map-gl";
import ArtisanalSiteContent from "./components/mapDetailsContent";
import { PopupContent } from "./components/popupContent";
import { ArtisanalSite, ProcessingEntities } from "@/types";
import {
  active_sites,
  inactive_sites,
  processing_entities,
} from "@/data/mapData";

interface MapContentsProps {
  reference: React.RefObject<MapRef>;
}

export default function MapContents({ reference }: MapContentsProps) {
  const mapRef = reference;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSites, setActiveSites] = useState<ArtisanalSite[]>([]);
  const [inactiveSites, setInactiveSites] = useState<ArtisanalSite[]>([]);
  const [processingEntities, setProcessingEntities] = useState<
    ProcessingEntities[]
  >([]);
  const artisanal_site_id = searchParams.get("artisanal_site_id");
  const {
    showActiveSiteMarkers,
    showInactiveSiteMarkers,
    showProcessingEntiteMarkers,
  } = useMarkerVisibilityStore();
  const { openMapDetails, closeMapDetails, setMapDetailsContent } =
    useMapDetailsStore();
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [popupInfo, setPopupInfo] = useState<ProcessingEntities | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        // using tinybird api ----------------------------------------------

        // const active_sites_data = await fetchTinybirdData(ACTIVE_SITES_API_URL);
        // const inactive_sites_data = await fetchTinybirdData(
        //   INACTIVE_SITES_API_URL,
        // );

        // using local data ------------------------------------------------
        const active_sites_data = active_sites.data;
        const inactive_sites_data = inactive_sites.data;
        const processing_entities_data = processing_entities.data;

        setActiveSites(active_sites_data);
        setInactiveSites(inactive_sites_data);
        setProcessingEntities(processing_entities_data);
      } catch (error) {
        console.error("Error fetching site data:", error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (artisanal_site_id) {
      const artisanal_site =
        activeSites.find((site) => site.site_name === artisanal_site_id) ||
        inactiveSites.find((site) => site.site_name === artisanal_site_id);
      if (artisanal_site && mapRef.current) {
        mapRef.current.flyTo({
          center: [artisanal_site.longitude, artisanal_site.latitude],
          duration: 1500,
          zoom: 12,
        });
      }
    }
  }, [artisanal_site_id, activeSites, inactiveSites, mapRef]);

  const handleArtisanalSiteClick = useCallback(
    (site_name: string, latitude: number, longitude: number) => {
      router.push(`/?artisanal_site_id=${site_name}`);
      setSelectedSite(site_name);

      openMapDetails();
      setMapDetailsContent(<ArtisanalSiteContent site_name={site_name} />);

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          duration: 1500,
          zoom: 12,
        });
      }
    },
    [openMapDetails, setMapDetailsContent, router, mapRef],
  );

  const handleProcessingEntityClick = useCallback(
    (
      site: ProcessingEntities,
      site_name: string,
      latitude: number,
      longitude: number,
    ) => {
      setSelectedSite(site_name);
      closeMapDetails();

      setPopupInfo(site);

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          duration: 1500,
          zoom: 11,
        });
      }
    },
    [closeMapDetails, mapRef],
  );
  return (
    <>
      {showActiveSiteMarkers &&
        activeSites.map((site, index) => (
          <Marker
            key={`active-${index}`}
            longitude={site.longitude}
            latitude={site.latitude}
            anchor="bottom"
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleArtisanalSiteClick(
                site.site_name,
                site.latitude,
                site.longitude,
              )
            }
          >
            <RiMapPin2Fill
              className={` ${
                selectedSite === site.site_name
                  ? "dark:fill-red-70 h-12 w-12 animate-bounce fill-red-500 dark:fill-red-700"
                  : "h-8 w-8 fill-cyan-600 stroke-cyan-700 dark:fill-cyan-500 dark:stroke-cyan-600"
              } ${artisanal_site_id === site.site_name && ""}`}
            />
          </Marker>
        ))}
      {showInactiveSiteMarkers &&
        inactiveSites.map((site, index) => (
          <Marker
            key={`inactive-${index}`}
            longitude={site.longitude}
            latitude={site.latitude}
            anchor="bottom"
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleArtisanalSiteClick(
                site.site_name,
                site.latitude,
                site.longitude,
              )
            }
          >
            <RiMapPin2Fill
              className={`${
                selectedSite === site.site_name
                  ? "h-12 w-12 animate-bounce fill-red-500 dark:fill-red-700"
                  : "h-8 w-8 fill-neutral-500 stroke-neutral-600 dark:fill-neutral-400 dark:stroke-neutral-500"
              } ${artisanal_site_id === site.site_name && ""} `}
            />
          </Marker>
        ))}
      {showProcessingEntiteMarkers &&
        processingEntities.map((site, index) => (
          <Marker
            key={`inactive-${index}`}
            longitude={parseFloat(site.longitude)}
            latitude={parseFloat(site.latitude)}
            anchor="bottom"
            color={"rgb(22 163 74)"}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleProcessingEntityClick(
                site,
                site.project_name,
                parseFloat(site.latitude),
                parseFloat(site.longitude),
              );
            }}
          >
            <RiMapPin2Fill
              className={`${
                selectedSite === site.project_name
                  ? "h-12 w-12 animate-bounce fill-red-500 dark:fill-red-700"
                  : "h-8 w-8 fill-green-700 stroke-green-50 dark:fill-green-500 dark:stroke-green-700"
              } ${artisanal_site_id === site.project_name && ""} `}
            />
          </Marker>
        ))}
      {popupInfo && (
        <Popup
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          anchor="top"
          onClose={() => setPopupInfo(null)}
          style={{
            fontFamily: "var(--font-sans)",
            minWidth: "24rem",
            maxWidth: "24rem",
            borderRadius: 50,
          }}
        >
          <PopupContent {...popupInfo} />
        </Popup>
      )}{" "}
    </>
  );
}
