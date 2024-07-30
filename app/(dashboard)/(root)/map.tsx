"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
import { IndustrialProjectsContent } from "./components/mining-activites/industral-content";
import { GeoJSONFeatureCollection } from "@/types/geojson";
import { IndustralProjectDetailsProps } from "@/types/miningActivities";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { parseCoordinates } from "@/lib/geojsonProcessing";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";

type MapProps = {
  geojsonData: GeoJSONFeatureCollection;
  intRoutesData: any;
  // borderPostsData: any;
  // exportPorts: any;
};

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MainMap({
  geojsonData,
  intRoutesData,
  // borderPostsData,
}: MapProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isMobile } = useDeviceType();
  const { theme, systemTheme } = useTheme();
  const mapRef = useRef<MapRef | null>(null);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/outdoors-v11",
  );
  const [intRoute, setIntRoute] = useState<any>([]);
  const [borderPost, setBorderPost] = useState<any>(null);
  const [viewState, setViewState] = useState(
    isMobile
      ? {
          longitude: 23.52741376552,
          latitude: -3.050471588628,
          zoom: 3,
          bearing: 0,
          pitch: 0,
        }
      : {
          longitude: 23.52741376552,
          latitude: -3.050471588628,
          zoom: 3,
          bearing: 0,
          pitch: 0,
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
  const {
    isInternationalRouteVisible,
    isBorderPostVisible,
    isExportPortVisible,
  } = useMarkerVisibilityStore();

  const InternationalRoutesData = intRoutesData;

  // useEffect(() => {
  //   if (mapRef.current) {
  //     mapRef.current.on("load", () => {
  //       setIntRoute(InternationalRoutesData);
  //       // setBorderPost(borderPostsData);
  //     });
  //   }
  // });

  useEffect(() => {
    if (isInternationalRouteVisible) {
      setIntRoute(InternationalRoutesData);
    }
  }, [isInternationalRouteVisible, InternationalRoutesData]);

  useEffect(() => {
    // console.log("border", isBorderPostVisible);
    // console.log("export", isExportPortVisible);
    console.log("intData", InternationalRoutesData);
  }, [isBorderPostVisible, isExportPortVisible, InternationalRoutesData]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (mapRef.current) {
  //       mapRef.current.on("load", () => {
  //         if (
  //           theme === "dark" ||
  //           (theme === "system" && systemTheme === "dark")
  //         ) {
  //           setMapStyle("mapbox://styles/mapbox/dark-v10");
  //         } else {
  //           setMapStyle("mapbox://styles/mapbox/outdoors-v11");
  //         }
  //       });
  //     }
  //   }, 1000); // 1 second delay

  //   return () => clearTimeout(timeout);
  // }, [theme, systemTheme]);

  // Trigger zoom-in animation on map load
  useEffect(() => {
    const handleZoomIn = () => {
      if (mapRef.current) {
        isMobile
          ? mapRef.current.flyTo({
              center: [26.321, -11.366],
              zoom: 6,
              duration: 6000,
            })
          : mapRef.current.flyTo({
              center: [25.413, -10.5],
              zoom: 6.5,
              duration: 8000,
            });
      }
    };

    const timeoutId = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.on("load", handleZoomIn);
      }
    }, 500); // 1 second delay

    return () => clearTimeout(timeoutId);
  }, [isMobile]);

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
      checkedLayers.includes(feature.properties._project_id),
    ),
  };

  const onClick = useCallback(
    (event: any) => {
      const { point } = event;
      const features = mapRef.current?.queryRenderedFeatures(point);
      const clickedFeature = features && features[0];
      if (clickedFeature && clickedFeature.properties) {
        if (clickedFeature.properties.Code) {
          const site_name = clickedFeature.properties._project_id;
          router.push(
            pathname +
              "?" +
              createQueryString("selected_site", site_name.toString()),
          );

          // set selected site
          setSelectedSite(clickedFeature.properties._project_id);
          openMapDetails();
          setMapDetailsContent(
            <IndustrialProjectsContent
              data={clickedFeature.properties as IndustralProjectDetailsProps}
            />,
          );

          const { latitude, longitude } = parseCoordinates(
            clickedFeature.properties.latitude_longitude,
          );

          if (mapRef.current) {
            isMobile
              ? mapRef.current.flyTo({
                  center: [longitude, latitude - 0.3],
                  duration: 1500,
                  zoom: 9,
                })
              : mapRef.current.flyTo({
                  center: [longitude, latitude - 0.1],
                  duration: 1500,
                  zoom: 10,
                });
          }
        }
      }
    },
    [
      router,
      isMobile,
      pathname,
      openMapDetails,
      setSelectedSite,
      createQueryString,
      setMapDetailsContent,
    ],
  );

  const fr_countriesWithColors = [
    { country: "australie", color: "#546475" },
    { country: "canada", color: "#13B8B1" },
    { country: "chine", color: "#F16067" },
    { country: "rdcongo", color: "#ADBCDD" },
    { country: "inde", color: "#ECC0A7" },
    { country: "kazakhstan", color: "#A28882" },
    { country: "suisse", color: "#FB9635" },
    { country: "unknown", color: "#033550" }, // Placeholder for the unmatched color
  ];
  const countriesWithColors = [
    { country: "Australia", color: "#546475" },
    { country: "Canada", color: "#13B8B1" },
    { country: "China", color: "#F16067" },
    { country: "DR Congo", color: "#ADBCDD" },
    { country: "India", color: "#ECC0A7" },
    { country: "Kazakhstan", color: "#A28882" },
    { country: "Switzerland", color: "#FB9635" },
    { country: "Unknown", color: "#033550" }, // Placeholder for the unmatched color
  ];

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
            style={{ position: "absolute", bottom: "64px", left: "0px" }}
            position="bottom-left"
            customAttribution={
              '<a href="https://www.ubachi.com/" target="_blank">© Ubachi</a>'
            }
          />
          <FullscreenControl
            position="bottom-left"
            style={{ position: "absolute", bottom: "192px", left: "0px" }}
          />
          <NavigationControl
            position="bottom-left"
            style={{ position: "absolute", bottom: "96px", left: "0px" }}
          />
        </>
      ) : (
        <>
          <AttributionControl
            position="bottom-left"
            style={{
              bottom: "12px",
              left: "3px",
              fontFamily: "var(--font-sans)",
            }}
            compact={true}
            customAttribution={
              '<a href="https://www.ubachi.com/" target="_blank">© Ubachi</a>'
            }
          />
          <NavigationControl position="bottom-left" />
          <FullscreenControl position="bottom-left" />
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

      {isInternationalRouteVisible && (
        <Source id="intRoute" type="geojson" data={intRoute}>
          <Layer
            id="intRoute"
            type="line"
            paint={{
              "line-color": [
                "match",
                ["get", "infrastructure_type"],
                "Route",
                "#1761A8",
                "#F05624",
              ],
              "line-width": ["interpolate", ["linear"], ["zoom"], 0, 2, 22, 9],
            }}
            // interactive={true}
          />
        </Source>
      )}

      {borderPost && (
        <Source id="borderPost" type="geojson" data={borderPost}>
          <Layer
            id="borderPost"
            type="symbol"
            source="posts"
            layout={{
              visibility: "none",
              "icon-image": "posts", // reference the image
              "icon-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                3,
                0.15,
                21,
                0.45,
              ],
              "icon-allow-overlap": true,
              "icon-ignore-placement": true,
              "text-allow-overlap": true,
            }}
            paint={{
              "icon-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                2,
                0.5,
                5,
                1,
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
      <div className="absolute bottom-20 right-4 rounded-lg bg-background/40 p-2 sm:bottom-4">
        <div className="flex-wrap">
          {countriesWithColors.map(({ country, color }) => (
            <div
              key={country}
              className="m-1 flex items-center space-x-2 p-0.5 lg:m-2 lg:p-1"
            >
              <div
                className="h-3 w-3 rounded-full xl:h-4 xl:w-4"
                style={{ backgroundColor: color }}
              ></div>
              <span className="font-sans text-pxs font-semibold text-foreground/80 lg:text-sm">
                {country}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Map>
  );
}
