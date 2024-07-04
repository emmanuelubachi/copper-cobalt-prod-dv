"use client";
import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Map, {
  MapRef,
  Source,
  Layer,
  AttributionControl,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";

import useDeviceType from "@/hooks/useDeviceType";
import MapContents from "./mapContents";

interface MapProps {
  // projectFilter: string[];
  dataCsv: any[]; // adjust the type based on your actual data structure
}

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MainMap({ dataCsv }: MapProps) {
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

  // useEffect(() => {
  //   if (mapRef.current) {
  //     const projectNameLabel = "Project name";
  //     const dataToZoom = dataCsv.filter((d) =>
  //       projectFilter.includes(d[projectNameLabel]),
  //     );

  //     if (dataToZoom.length > 0) {
  //       const bbox = turf.bbox(
  //         turf.featureCollection(
  //           dataToZoom.map((d) => turf.point([d.longitude, d.latitude])),
  //         ),
  //       );
  //       mapRef.current.fitBounds(
  //         [
  //           [bbox[0], bbox[1]],
  //           [bbox[2], bbox[3]],
  //         ],
  //         { duration: 2000, maxZoom: 8 },
  //       );
  //     }
  //   }
  // }, [projectFilter, dataCsv]);

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
