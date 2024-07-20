"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MapRef, Popup, Marker } from "react-map-gl";

import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import useMapDetailsStore from "@/store/mapDetailsStore";

import { RiMapPin2Fill } from "@remixicon/react";

import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { PopupContent } from "./components/popupContent";
import { ArtisanalSiteContent } from "./components/mapDetailsContent";
import { ArtisanalSite, ProcessingEntities } from "@/types";

// Import map data
import {
  active_sites,
  inactive_sites,
  processing_entities,
} from "@/data/mapData";

type MapContentsProps = {
  reference: React.RefObject<MapRef>;
};

export default function MapContents({ reference }: MapContentsProps) {
  const mapRef = reference;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const createQueryString = useUpdateSearchParams();

  const selected_site_sParam = searchParams.get("selected_site");
  const active_site_sParams = searchParams.get("active_site");
  const inactive_site_sParams = searchParams.get("inactive_site");

  const [popupInfo, setPopupInfo] = useState<ProcessingEntities | null>(null);
  const [activeSites, setActiveSites] = useState<ArtisanalSite[]>([]);
  const [inactiveSites, setInactiveSites] = useState<ArtisanalSite[]>([]);
  const [processingEntities, setProcessingEntities] = useState<
    ProcessingEntities[]
  >([]);

  const {
    openMapDetails,
    closeMapDetails,
    setMapDetailsContent,
    selectedSite,
    setSelectedSite,
  } = useMapDetailsStore();
  const {
    isActiveSiteMarkersVisible,
    isInactiveSiteMarkersVisible,
    showProcessingEntiteMarkers,
    showActiveSiteMarkers,
    showInactiveSiteMarkers,
  } = useMarkerVisibilityStore();

  const selected_site =
    activeSites.find((site) => site.site_name === selected_site_sParam) ||
    inactiveSites.find((site) => site.site_name === selected_site_sParam);

  // Fetch site data
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

  // Set selected site on page load by searchParam
  useEffect(() => {
    if (selected_site_sParam) {
      if (selected_site && mapRef.current) {
        mapRef.current.flyTo({
          center: [selected_site.longitude, selected_site.latitude],
          duration: 1500,
          zoom: 11,
        });
        openMapDetails();
        setSelectedSite(selected_site_sParam);
        setMapDetailsContent(
          <ArtisanalSiteContent site_name={selected_site_sParam} />,
        );
      }
    }
  }, [
    mapRef,
    selected_site,
    selected_site_sParam,
    openMapDetails,
    setSelectedSite,
    setMapDetailsContent,
  ]);

  // Show site markers based on searchParams
  useEffect(() => {
    if (active_site_sParams === "true") {
      showActiveSiteMarkers();
    }
    if (inactive_site_sParams === "true") {
      showInactiveSiteMarkers();
    }
  }, [
    active_site_sParams,
    showActiveSiteMarkers,
    inactive_site_sParams,
    showInactiveSiteMarkers,
  ]);

  const handleArtisanalSiteClick = useCallback(
    (site_name: string, latitude: number, longitude: number) => {
      router.push(
        pathname +
          "?" +
          createQueryString("selected_site", site_name.toString()),
      );

      openMapDetails();
      setSelectedSite(site_name);
      setMapDetailsContent(<ArtisanalSiteContent site_name={site_name} />);

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          duration: 1500,
          zoom: 11,
        });
      }
    },
    [
      mapRef,
      router,
      pathname,
      openMapDetails,
      setSelectedSite,
      createQueryString,
      setMapDetailsContent,
    ],
  );

  const handleProcessingEntityClick = useCallback(
    (site: ProcessingEntities, latitude: number, longitude: number) => {
      closeMapDetails();
      setPopupInfo(site);
      setSelectedSite(null);

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          duration: 1500,
          zoom: 11,
        });
      }
    },
    [closeMapDetails, mapRef, setSelectedSite],
  );

  return (
    <>
      {isActiveSiteMarkersVisible &&
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
              }`}
            />
          </Marker>
        ))}

      {isInactiveSiteMarkersVisible &&
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
              }`}
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
              }`}
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
      )}
    </>
  );
}

// useEffect(() => {
//   if (artisanal_site_id) {
//     const artisanal_site =
//       activeSites.find((site) => site.site_name === artisanal_site_id) ||
//       inactiveSites.find((site) => site.site_name === artisanal_site_id);
//     if (artisanal_site && mapRef.current) {
//       mapRef.current.flyTo({
//         center: [
//           artisanal_site.longitude,
//           artisanal_site.latitude,
//         ],
//         duration: 1500,
//         zoom: 11,
//       });
//       openMapDetails();
//       setMapDetailsContent(
//         <ArtisanalSiteContent site_name={artisanal_site_id} />,
//       );
//     }
//   }
// }, [
//   artisanal_site_id,
//   activeSites,
//   inactiveSites,
//   mapRef,
//   openMapDetails,
//   setMapDetailsContent,
// ]);
