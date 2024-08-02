"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MapRef, Popup, Marker } from "react-map-gl";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import useMapDetailsStore from "@/store/mapDetailsStore";
import { RiMapPin2Fill } from "@remixicon/react";
import useDeviceType from "@/hooks/useDeviceType";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import Supercluster, { AnyProps, PointFeature } from "supercluster";

import { PopupContent } from "./components/popupContent";
import { ArtisanalSiteContent } from "./components/mining-activites/artisanal-content";
import { ArtisanalSite, ProcessingEntities } from "@/types";

// Import map data
// TODO: use tinybird api or local data
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
  const { isMobile } = useDeviceType();
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
  const [clusters, setClusters] = useState<any[]>([]);
  const [supercluster, setSupercluster] = useState<Supercluster | null>(null);
  const [zoom, setZoom] = useState(10);

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
    isProcessingEntiteMarkerVisible,
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
    if (mapRef.current) {
      mapRef.current.on("move", () => {
        setZoom(mapRef.current?.getZoom() || 3);
      });
    }
  }, [mapRef]);

  useEffect(() => {
    const points: PointFeature<AnyProps>[] = processingEntities.map((site) => ({
      type: "Feature",
      properties: {
        cluster: false,
        ...site,
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(site.longitude), parseFloat(site.latitude)],
      },
    }));

    // Create supercluster instance
    const index = new Supercluster({
      radius: 40,
      maxZoom: 16,
    });

    index.load(points);
    setSupercluster(index);

    if (mapRef.current) {
      const bounds = mapRef.current.getBounds().toArray().flat() as [
        number,
        number,
        number,
        number,
      ];
      const clusters = index.getClusters(bounds, Math.floor(zoom));
      setClusters(clusters);
    }
  }, [processingEntities, zoom, mapRef]);

  // Set selected site on page load by searchParam
  useEffect(() => {
    if (selected_site_sParam) {
      if (selected_site && mapRef.current) {
        const handleZoom = () => {
          if (mapRef.current) {
            isMobile
              ? mapRef.current.flyTo({
                  center: [
                    selected_site.longitude,
                    selected_site.latitude - 0.1,
                  ],
                  duration: 1500,
                  zoom: 9,
                })
              : mapRef.current.flyTo({
                  center: [selected_site.longitude, selected_site.latitude],
                  duration: 1500,
                  zoom: 10,
                });
          }
        };

        const timeoutId = setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.on("load", handleZoom);
          }
        }, 1000);

        openMapDetails();
        setSelectedSite(selected_site_sParam);
        setMapDetailsContent(
          <ArtisanalSiteContent site_name={selected_site_sParam} />,
        );

        return () => {
          clearTimeout(timeoutId);
        };
      }
    }
  }, [
    mapRef,
    isMobile,
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

      setSelectedSite(site_name);
      openMapDetails();
      setMapDetailsContent(<ArtisanalSiteContent site_name={site_name} />);

      if (mapRef.current) {
        isMobile
          ? mapRef.current.flyTo({
              center: [longitude, latitude - 0.1],
              duration: 1500,
              zoom: 9,
            })
          : mapRef.current.flyTo({
              center: [longitude, latitude],
              duration: 1500,
              zoom: 10,
            });
      }
    },
    [
      mapRef,
      router,
      isMobile,
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
        const mapzoom = mapRef.current.getZoom();
        const newzoom = mapzoom > 10 ? mapzoom + 0.5 : 10;

        mapRef.current.flyTo({
          center: [longitude, latitude],
          duration: 1500,
          zoom: newzoom,
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
                  : "h-8 w-8 fill-neutral-300 stroke-neutral-400 dark:fill-neutral-400 dark:stroke-neutral-500"
              }`}
            />
          </Marker>
        ))}

      {isProcessingEntiteMarkerVisible &&
        clusters.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${index}`}
                longitude={longitude}
                latitude={latitude}
                anchor="bottom"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster?.getClusterExpansionZoom(cluster.id) || 16,
                    20,
                  );

                  if (mapRef.current) {
                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      duration: 1000,
                      zoom: expansionZoom,
                    });
                  }
                }}
              >
                <div className="rounded-full bg-teal-500/50 p-2">
                  <div
                    className="bg-teal-500 p-3 text-sm font-bold text-white dark:text-black"
                    style={{
                      width: `${10 + (pointCount / 100) * 20}px`,
                      height: `${10 + (pointCount / 100) * 20}px`,
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {pointCount}
                  </div>
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`processing-${index}`}
              longitude={parseFloat(cluster.properties.longitude)}
              latitude={parseFloat(cluster.properties.latitude)}
              anchor="bottom"
              color={"rgba(20 184 166)"}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleProcessingEntityClick(
                  cluster.properties,
                  parseFloat(cluster.properties.latitude),
                  parseFloat(cluster.properties.longitude),
                );
              }}
            >
              {/* <RiMapPin2Fill
                className={`${
                  selectedSite === cluster.properties.project_name
                    ? "h-12 w-12 animate-bounce fill-red-500 dark:fill-red-700"
                    : "h-8 w-8 fill-teal-700 stroke-teal-50 dark:fill-teal-500 dark:stroke-teal-700"
                }`}
              /> */}
            </Marker>
          );
        })}

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
