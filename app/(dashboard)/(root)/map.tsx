"use client";
import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Map, {
  MapRef,
  AttributionControl,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useDeviceType from "@/hooks/useDeviceType";
import MapContents from "./mapContents";
import { ArtisanalSite, ProcessingEntities } from "@/types";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MainMap() {
  const { theme, systemTheme } = useTheme();
  const [mapStyle, setMapStyle] = useState("");
  const { isMobile } = useDeviceType();
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

  return (
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
      <MapContents reference={mapRef} />
    </Map>
  );
}
