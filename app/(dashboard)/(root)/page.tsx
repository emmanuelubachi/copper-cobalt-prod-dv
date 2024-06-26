"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";

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

import { ArtisanalSite } from "@/types";
import { fetchTinybirdData } from "@/lib/fetchData";

import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import useMapDetailsStore from "@/store/mapDetailsStore";

import MapDetailsContent from "./mapDetailsContent";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const ACTIVE_SITES_API_URL =
  "https://api.tinybird.co/v0/pipes/artisanal_sites_active.json";
const INACTIVE_SITES_API_URL =
  "https://api.tinybird.co/v0/pipes/artisanal_sites_inactive.json";

export default function Home() {
  const { theme, systemTheme } = useTheme();
  const [mapStyle, setMapStyle] = useState("");
  const { isMobile } = useDeviceType();
  const [activesites, setActivesites] = useState<ArtisanalSite[]>([]);
  const [inactivesites, setInactivesites] = useState<ArtisanalSite[]>([]);

  const { showActiveMarkers, showInactiveMarkers } = useMarkerVisibilityStore();
  const { openMapDetails, setMapDetailsContent } = useMapDetailsStore();

  const mapRef = useRef<MapRef | null>(null);

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
      const active_sites_data = await fetchTinybirdData(ACTIVE_SITES_API_URL);
      const inactive_sites_data = await fetchTinybirdData(
        INACTIVE_SITES_API_URL,
      );
      setActivesites(active_sites_data);

      setInactivesites(inactive_sites_data);
    }
    getData();
  }, []);

  const handleMapDetailsClick = useCallback(
    (site: string, latitude: number, longitude: number) => {
      openMapDetails();
      setMapDetailsContent(<MapDetailsContent name={site} />);
      mapRef.current?.flyTo({
        center: [longitude, latitude],
        duration: 2000,
        zoom: 12,
      });
    },
    [openMapDetails, setMapDetailsContent],
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

        {showActiveMarkers &&
          activesites.map((site, index) => (
            <Marker
              key={`active-${index}`}
              longitude={site.longitude}
              latitude={site.latitude}
              anchor="bottom"
              onClick={() =>
                handleMapDetailsClick(
                  site.site_name,
                  site.latitude,
                  site.longitude,
                )
              }
            >
              <Pin className="fill-cyan-700 stroke-cyan-50 dark:fill-cyan-500 dark:stroke-white" />
            </Marker>
          ))}

        {showInactiveMarkers &&
          inactivesites.map((site, index) => (
            <Marker
              key={`inactive-${index}`}
              longitude={site.longitude}
              latitude={site.latitude}
              anchor="bottom"
              onClick={() =>
                handleMapDetailsClick(
                  site.site_name,
                  site.latitude,
                  site.longitude,
                )
              }
            >
              <Pin className="fill-neutral-500 stroke-gray-50 dark:fill-neutral-400 dark:stroke-white" />
            </Marker>
          ))}
      </Map>
    </main>
  );
}
