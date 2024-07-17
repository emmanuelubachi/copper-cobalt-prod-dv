"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
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
import useDeviceType from "@/hooks/useDeviceType";
import MapContents from "./mapContents";
import { GeoJSONFeatureCollection } from "@/types/geojson";

type MapProps = {
  geojsonData: GeoJSONFeatureCollection;
};

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MainMap({ geojsonData }: MapProps) {
  const { theme, systemTheme } = useTheme();
  const [mapStyle, setMapStyle] = useState("");
  const { isMobile } = useDeviceType();
  const mapRef = useRef<MapRef | null>(null);
  const [viewState, setViewState] = useState(
    isMobile
      ? {
          longitude: 23.52741376552,
          latitude: -3.050471588628,
          zoom: 3,
        }
      : {
          longitude: 23.52741376552,
          latitude: -3.050471588628,
          zoom: 5,
        },
  );
  const [hoveredFeature, setHoveredFeature] = useState<{
    feature: any;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      setMapStyle("mapbox://styles/mapbox/dark-v10");
    } else {
      setMapStyle("mapbox://styles/mapbox/streets-v10");
    }
  }, [theme, systemTheme]);

  useEffect(() => {
    console.log("geojsonData:", geojsonData);
  });

  const onHover = useCallback((event: any) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hovered = features && features[0];
    setHoveredFeature(hovered ? { feature: hovered, x, y } : null);
  }, []);

  console.log("event:", hoveredFeature);

  const onLeave = useCallback(() => {
    setHoveredFeature(null);
  }, []);

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
      onMouseMove={onHover}
      onMouseLeave={onLeave}
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
      {geojsonData && (
        <Source id="geojson-data" type="geojson" data={geojsonData}>
          <Layer
            id="data-layer"
            type="fill"
            paint={{
              "fill-color": [
                "match",
                ["get", "nat-0"],
                "australie",
                "#546475",
                "canada",
                "#13B8B1",
                "chine",
                "#F16067",
                "rdcongo",
                "#ADBCDD",
                "inde",
                "#ECC0A7",
                "kazakhstan",
                "#A28882",
                "suisse",
                "#FB9635",
                "#033550",
              ],
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                0.95,
                0.6,
              ],
            }}
            interactive={true}
          />
        </Source>
      )}
      {hoveredFeature && (
        <div
          style={{
            position: "absolute",
            left: hoveredFeature.x,
            top: hoveredFeature.y,
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "3px",
          }}
        >
          <div>{hoveredFeature.feature.properties.name}</div>
        </div>
      )}
    </Map>
  );
}
