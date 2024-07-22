"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
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
import useMapDetailsStore from "@/store/mapDetailsStore";
import useDeviceType from "@/hooks/useDeviceType";
import MapContents from "./mapContents";
import { IndustrialProjectsContent } from "./components/mapDetailsContent";
import { GeoJSONFeatureCollection } from "@/types/geojson";
import { IndustralProjectDetailsProps } from "@/types/miningActivities";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { parseCoordinates } from "@/lib/geojsonProcessing";

type MapProps = {
  geojsonData: GeoJSONFeatureCollection;
};

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MainMap({ geojsonData }: MapProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useDeviceType();
  const { theme, systemTheme } = useTheme();

  const mapRef = useRef<MapRef | null>(null);
  const [mapStyle, setMapStyle] = useState("");
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

  const {
    checkedLayers,
    openMapDetails,
    setSelectedSite,
    setMapDetailsContent,
  } = useMapDetailsStore();
  const createQueryString = useUpdateSearchParams();

  useEffect(() => {
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      setMapStyle("mapbox://styles/mapbox/dark-v10");
    } else {
      setMapStyle("mapbox://styles/mapbox/streets-v10");
    }
  }, [theme, systemTheme]);

  const onHover = useCallback((event: any) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hovered = features && features[0];
    setHoveredFeature(hovered ? { feature: hovered, x, y } : null);
    if (mapRef.current) {
      if (hovered) {
        mapRef.current.getCanvas().style.cursor = "pointer";
      } else {
        mapRef.current.getCanvas().style.cursor = "";
      }
    }
  }, []);

  const onLeave = useCallback(() => {
    setHoveredFeature(null);
    if (mapRef.current) {
      mapRef.current.getCanvas().style.cursor = "";
    }
  }, []);

  const filteredGeojsonData = {
    ...geojsonData,
    features: geojsonData.features.filter((feature) =>
      checkedLayers.includes(feature.properties.Short_name),
    ),
  };

  const onClick = useCallback(
    (event: any) => {
      const { point } = event;
      const features = mapRef.current?.queryRenderedFeatures(point);
      const clickedFeature = features && features[0];
      if (clickedFeature && clickedFeature.properties) {
        if (clickedFeature.properties.Code) {
          const site_name = clickedFeature.properties.Short_name;
          router.push(
            pathname +
              "?" +
              createQueryString("selected_site", site_name.toString()),
          );

          // set selected site
          setSelectedSite(clickedFeature.properties.Short_name);
          openMapDetails();
          setMapDetailsContent(
            <IndustrialProjectsContent
              data={clickedFeature.properties as IndustralProjectDetailsProps}
            />,
          );

          const { latitude, longitude } = parseCoordinates(
            clickedFeature.properties.latitude_longitude,
          );

          console.log("latitude", latitude);
          console.log("longitude", longitude);

          if (mapRef.current) {
            mapRef.current.flyTo({
              center: [longitude, latitude],
              duration: 1500,
              zoom: 10,
            });
          }
        }
      }
    },
    [
      router,
      pathname,
      openMapDetails,
      setSelectedSite,
      createQueryString,
      setMapDetailsContent,
    ],
  );

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
      interactiveLayerIds={["data-layer"]}
      onMouseMove={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
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

      {geojsonData && (
        <Source id="geojson-data" type="geojson" data={filteredGeojsonData}>
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
            left: hoveredFeature.x + 10,
            top: hoveredFeature.y + 10,
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "3px",
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem" /* 14px */,
            lineHeight: "1.25rem" /* 20px */,
            color: "black",
          }}
        >
          <div>{hoveredFeature.feature.properties.Project_name}</div>
        </div>
      )}
      <MapContents reference={mapRef} />
    </Map>
  );
}
