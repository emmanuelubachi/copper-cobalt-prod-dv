"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import Map, {
  MapRef,
  AttributionControl,
  NavigationControl,
  FullscreenControl,
  Marker,
} from "react-map-gl";
import useDeviceType from "@/hooks/useDeviceType";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "@/components/svg/pin";
import { ArtisanalSite, ProcessingEntities } from "@/types";
import { fetchTinybirdData } from "@/lib/fetchData";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import useMapDetailsStore from "@/store/mapDetailsStore";
import ArtisanalSiteContent, {
  ProcessingEntitiesContent,
} from "./components/mapDetailsContent";
import Link from "next/link";
import {
  active_sites,
  inactive_sites,
  processing_entities,
} from "@/data/mapData";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const ACTIVE_SITES_API_URL =
  "https://api.tinybird.co/v0/pipes/artisanal_sites_active.json";
const INACTIVE_SITES_API_URL =
  "https://api.tinybird.co/v0/pipes/artisanal_sites_inactive.json";

export default function Home() {
  const { theme, systemTheme } = useTheme();
  const [mapStyle, setMapStyle] = useState("");
  const { isMobile } = useDeviceType();

  const [activeSites, setActiveSites] = useState<ArtisanalSite[]>([]);
  const [inactiveSites, setInactiveSites] = useState<ArtisanalSite[]>([]);
  const [processingEntities, setProcessingEntities] = useState<
    ProcessingEntities[]
  >([]);

  const {
    showActiveSiteMarkers,
    showInactiveSiteMarkers,
    showProcessingEntiteMarkers,
  } = useMarkerVisibilityStore();
  const { openMapDetails, closeMapDetails, setMapDetailsContent } =
    useMapDetailsStore();
  const mapRef = useRef<MapRef | null>(null);
  const searchParams = useSearchParams();
  const artisanal_site_id = searchParams.get("artisanal_site_id");
  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  const [viewState, setViewState] = useState({
    longitude: 23.52741376552,
    latitude: -3.050471588628,
    zoom: 4,
  });

  useEffect(() => {
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      setMapStyle("mapbox://styles/mapbox/dark-v10");
    } else {
      setMapStyle("mapbox://styles/mapbox/streets-v10");
    }
  }, [theme, systemTheme]);

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
  }, [artisanal_site_id, activeSites, inactiveSites]);

  const handleArtisanalSiteClick = useCallback(
    (site_name: string, latitude: number, longitude: number) => {
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
    [openMapDetails, setMapDetailsContent],
  );

  const handleMapDetailsClick = useCallback(
    (site_name: string, latitude: number, longitude: number) => {
      setSelectedSite(site_name);
      closeMapDetails();
      // setMapDetailsContent(<ProcessingEntitiesContent site_name={site_name} />);

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          duration: 1500,
          zoom: 12,
        });
      }
    },
    [closeMapDetails],
  );

  return (
    <main className="relative h-screen sm:mb-0 sm:ml-0 sm:pr-16">
      <Map
        ref={mapRef}
        mapboxAccessToken={TOKEN}
        mapStyle={mapStyle}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ position: "absolute" }}
        maxZoom={15}
        minZoom={3}
        attributionControl={false}
      >
        {isMobile ? (
          <>
            <AttributionControl
              style={{ position: "absolute", bottom: "64px", right: "0px" }}
              position="bottom-right"
              customAttribution={
                '<a href="https://www.ubachi.com/" target="_blank">© Ubachi</a>'
              }
            />
            <FullscreenControl
              position="bottom-right"
              style={{ position: "absolute", bottom: "192px", right: "0px" }}
            />
            <NavigationControl
              position="bottom-right"
              style={{ position: "absolute", bottom: "96px", right: "0px" }}
            />
          </>
        ) : (
          <>
            <AttributionControl
              position="bottom-right"
              customAttribution={
                '<a href="https://www.ubachi.com/" target="_blank">© Ubachi</a>'
              }
            />
            <NavigationControl position="bottom-right" />
            <FullscreenControl position="bottom-right" />
          </>
        )}

        {showActiveSiteMarkers &&
          activeSites.map((site, index) => (
            <Marker
              key={`active-${index}`}
              longitude={site.longitude}
              latitude={site.latitude}
              anchor="bottom"
              onClick={() =>
                handleArtisanalSiteClick(
                  site.site_name,
                  site.latitude,
                  site.longitude,
                )
              }
            >
              <Link href={`/?artisanal_site_id=${site.site_name}`}>
                <Pin
                  className={`${
                    selectedSite === site.site_name
                      ? "h-12 w-12 animate-bounce fill-red-700"
                      : "h-6 w-6 fill-cyan-700 stroke-cyan-50 dark:fill-cyan-500 dark:stroke-white"
                  } ${artisanal_site_id === site.site_name && ""}`}
                />
              </Link>
            </Marker>
          ))}

        {showInactiveSiteMarkers &&
          inactiveSites.map((site, index) => (
            <Marker
              key={`inactive-${index}`}
              longitude={site.longitude}
              latitude={site.latitude}
              anchor="bottom"
              onClick={() =>
                handleArtisanalSiteClick(
                  site.site_name,
                  site.latitude,
                  site.longitude,
                )
              }
            >
              <Link href={`/?artisanal_site_id=${site.site_name}`}>
                <Pin
                  className={`${
                    selectedSite === site.site_name
                      ? "h-12 w-12 animate-bounce fill-red-400 dark:fill-red-800"
                      : "h-6 w-6 fill-neutral-700 stroke-neutral-50 dark:fill-neutral-500 dark:stroke-white"
                  } ${artisanal_site_id === site.site_name && ""} `}
                />
              </Link>
            </Marker>
          ))}

        {showProcessingEntiteMarkers &&
          processingEntities.map((site, index) => (
            <Marker
              key={`inactive-${index}`}
              longitude={parseFloat(site.longitude)}
              latitude={parseFloat(site.latitude)}
              anchor="bottom"
              color="rgb(22 163 74)"
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleMapDetailsClick(
                  site.project_name,
                  parseFloat(site.latitude),
                  parseFloat(site.longitude),
                )
              }
            >
              {/* <Link href={`/?artisanal_site_id=${site.site_name}`}>
            <Pin
              className={`${
                selectedSite === site.site_name
                  ? "h-12 w-12 animate-bounce fill-red-400 dark:fill-red-800"
                  : "h-6 w-6 fill-neutral-700 stroke-neutral-50 dark:fill-neutral-500 dark:stroke-white"
              } ${artisanal_site_id === site.site_name && ""} `}
            />
          </Link> */}
            </Marker>
          ))}
      </Map>
    </main>
  );
}
