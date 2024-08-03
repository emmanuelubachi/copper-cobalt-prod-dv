"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { useTheme } from "next-themes";
import Map, {
  MapRef,
  Source,
  Marker,
  Layer,
  Popup,
  AttributionControl,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Supercluster, { AnyProps, PointFeature } from "supercluster";

import useMapDetailsStore from "@/store/mapDetailsStore";
import useDeviceType from "@/hooks/useDeviceType";
import MapContents from "./mapContents";
import { IndustrialProjectsContent } from "./components/mining-activites/industral-content";
import { GeoJSONFeatureCollection } from "@/types/geojson";
import { GeoJSONExportPort, IndustralProjectDetailsProps } from "@/types/map";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { parseCoordinates } from "@/lib/geojsonProcessing";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import { BorderPost } from "@/types/map";

import socioEconomicData from "@/data/map/additional_info/socio_economic_impact.json";
import environmantalImpactData from "@/data/map/additional_info/environmental_impact.json";
import { countriesWithColors } from "@/constants/application";
import { ArrowUpRight } from "lucide-react";

type MapProps = {
  geojsonData: GeoJSONFeatureCollection;
  intRoutesData: any;
  borderPostsData: BorderPost;
  exportPortsData: any;
};

interface SocioEconomicDataProps {
  _project_id: string;
  project_name: string;
  socio_economic_infrastructure: string;
  geographical_coordinates: string;
  latitude_longitude: string;
  longitude: string;
  latitude: string;
  province: string;
  sources: string;
}

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MainMap({
  geojsonData,
  intRoutesData,
  borderPostsData,
  exportPortsData,
}: MapProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useDeviceType();
  const { theme, systemTheme } = useTheme();
  const mapRef = useRef<MapRef | null>(null);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/outdoors-v11",
  );

  const [borderPosts, setBorderPosts] = useState<BorderPost>();
  const [intRoute, setIntRoute] = useState<any>([]);
  const [exportPorts, setExportPorts] = useState<GeoJSONExportPort>();
  const [socioEconomics, setSocioEconomicData] =
    useState<SocioEconomicDataProps[]>();
  const [environmentalImpacts, setEnvironmantalImpactData] = useState<any>();

  const [clusters, setClusters] = useState<any[]>([]);
  const [supercluster, setSupercluster] = useState<Supercluster | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

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
    isSocioEconomicVisible,
    isEnvironmentalImpactVisible,
  } = useMarkerVisibilityStore();

  const BorderPostData = borderPostsData;
  const InternationalRoutesData = intRoutesData;
  const ExportPortData = exportPortsData;
  const SociaImapctData = socioEconomicData;
  const EnvironmentalImpactData = environmantalImpactData;

  useEffect(() => {
    setBorderPosts(BorderPostData);
    setIntRoute(InternationalRoutesData);
    setExportPorts(ExportPortData);
    setSocioEconomicData(SociaImapctData);
    setEnvironmantalImpactData(EnvironmentalImpactData);
  }, [
    BorderPostData,
    InternationalRoutesData,
    ExportPortData,
    SociaImapctData,
    EnvironmentalImpactData,
  ]);

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

  const filteredGeojsonData = {
    ...geojsonData,
    features: geojsonData.features.filter((feature) =>
      checkedLayers.includes(feature.properties._project_id),
    ),
  };

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

  useEffect(() => {
    if (socioEconomics) {
      const points: PointFeature<AnyProps>[] = socioEconomics.map((data) => ({
        type: "Feature",
        properties: {
          cluster: false,
          ...data,
        },
        geometry: {
          type: "Point",
          coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
        },
      }));

      const index = new Supercluster({
        radius: 40,
        maxZoom: 16,
      });

      index.load(points);
      setSupercluster(index);
    }
  }, [socioEconomics]);

  const updateClusters = useCallback(() => {
    if (!mapRef.current || !supercluster) return;

    const bounds = mapRef.current.getMap().getBounds().toArray().flat() as [
      number,
      number,
      number,
      number,
    ];
    const zoom = Math.floor(viewState.zoom);

    const clusters = supercluster.getClusters(bounds, zoom);
    setClusters(clusters);
  }, [supercluster, viewState]);

  useEffect(() => {
    updateClusters();
  }, [updateClusters, viewState]);

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
          />
        </Source>
      )}

      {isBorderPostVisible &&
        borderPosts &&
        borderPosts.features.map((feature: any, index: number) => (
          <Marker
            key={index}
            longitude={feature.geometry.coordinates[0]}
            latitude={feature.geometry.coordinates[1]}
            color="#F97316"
            style={{ cursor: "pointer" }}
          ></Marker>
        ))}

      {isExportPortVisible &&
        exportPorts &&
        exportPorts.features.map((feature, index: number) => (
          <Marker
            key={index}
            longitude={feature.geometry.coordinates[0]}
            latitude={feature.geometry.coordinates[1]}
            color="#5E8199"
            style={{ cursor: "pointer" }}
          ></Marker>
        ))}

      {isSocioEconomicVisible &&
        clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                longitude={longitude}
                latitude={latitude}
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
                  // setViewState({
                  //   ...viewState,
                  //   longitude,
                  //   latitude,
                  //   zoom: expansionZoom,
                  // });
                }}
              >
                <div className="rounded-full bg-lime-500/50 p-2">
                  <div
                    className="bg-lime-500 p-3 text-sm font-bold text-white dark:text-black"
                    style={{
                      width: `${10 + (pointCount / 100) * 20}px`,
                      height: `${10 + (pointCount / 100) * 20}px`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
              key={`point-${cluster.properties._project_id}`}
              longitude={longitude}
              latitude={latitude}
              style={{ cursor: "pointer" }}
              color="#84cc16"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedMarker(cluster);
                if (mapRef.current) {
                  const mapzoom = mapRef.current.getZoom();
                  const newzoom = mapzoom > 10 ? mapzoom + 0.5 : 10;

                  mapRef.current.flyTo({
                    center: [longitude, latitude],
                    duration: 1500,
                    zoom: newzoom,
                  });
                }
              }}
            ></Marker>
          );
        })}

      {isEnvironmentalImpactVisible &&
        environmentalImpacts.map(
          (environmentalImpactData: any, index: number) => (
            <Marker
              key={index}
              longitude={environmentalImpactData.longitude}
              latitude={environmentalImpactData.latitude}
              color="red"
            ></Marker>
          ),
        )}

      {selectedMarker && (
        <Popup
          longitude={selectedMarker.geometry.coordinates[0]}
          latitude={selectedMarker.geometry.coordinates[1]}
          anchor="top"
          onClose={() => setSelectedMarker(null)}
          // closeOnClick={false}
          style={{
            fontFamily: "var(--font-sans)",
            minWidth: "20rem",
            maxWidth: "24rem",
            borderRadius: 50,
          }}
        >
          <div className="p-2">
            {selectedMarker.properties.project_name && (
              <h4 className="mb-2 text-p font-bold text-black">
                {selectedMarker.properties.project_name}
              </h4>
            )}

            <div className="space-y-1 text-sm font-medium text-black">
              {selectedMarker.properties.socio_economic_infrastructure && (
                <p>
                  <span className="text-black/70">Infrastructure:</span>{" "}
                  {selectedMarker.properties.socio_economic_infrastructure}
                </p>
              )}

              {selectedMarker.properties.province && (
                <p>
                  <span className="text-black/70">Province:</span>{" "}
                  {selectedMarker.properties.province}
                </p>
              )}

              {selectedMarker.properties.sources && (
                <div className="flex gap-1">
                  <span className="text-black/70">Sources: </span>
                  <Link
                    href={selectedMarker.properties.sources}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 underline"
                  >
                    Link
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Popup>
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
          <div className="space-y-1">
            <p className="xs font-bold">
              {hoveredFeature.feature.properties.Project_name}
            </p>
            <p className="xs font-medium text-black/60">
              Nationality:{" "}
              <span className="text-black">
                {hoveredFeature.feature.properties.Nationality}
              </span>
            </p>
          </div>
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
