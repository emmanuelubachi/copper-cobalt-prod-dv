"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSearchParams, useRouter } from "next/navigation";

import Map, {
  MapRef,
  Popup,
  AttributionControl,
  NavigationControl,
  FullscreenControl,
  Marker,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import useDeviceType from "@/hooks/useDeviceType";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import useMapDetailsStore from "@/store/mapDetailsStore";

import { MapPin } from "lucide-react";
import { SewingPinFilledIcon } from "@radix-ui/react-icons";
import { RiMapPin2Fill, RiMapPin3Fill } from "@remixicon/react";

import Pin from "@/components/svg/pin";
import ArtisanalSiteContent from "./components/mapDetailsContent";

import {
  active_sites,
  inactive_sites,
  processing_entities,
} from "@/data/mapData";
import { fetchTinybirdData } from "@/lib/fetchData";

import { ArtisanalSite, ProcessingEntities, PopopInfo } from "@/types";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const ACTIVE_SITES_API_URL =
  "https://api.tinybird.co/v0/pipes/artisanal_sites_active.json";
const INACTIVE_SITES_API_URL =
  "https://api.tinybird.co/v0/pipes/artisanal_sites_inactive.json";

export default function Home() {
  const { theme, systemTheme } = useTheme();
  const [mapStyle, setMapStyle] = useState("");
  const { isMobile } = useDeviceType();
  const router = useRouter();

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
  const [popupInfo, setPopupInfo] = useState<ProcessingEntities | null>(null);

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
      router.push(`/?artisanal_site_id=${site_name}`);
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
    [openMapDetails, setMapDetailsContent, router],
  );

  const handleProcessingEntityClick = useCallback(
    (
      site: ProcessingEntities,
      site_name: string,
      latitude: number,
      longitude: number,
    ) => {
      setSelectedSite(site_name);
      closeMapDetails();

      setPopupInfo(site);

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          duration: 1500,
          zoom: 11,
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
                } ${artisanal_site_id === site.site_name && ""}`}
              />
            </Marker>
          ))}

        {showInactiveSiteMarkers &&
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
                } ${artisanal_site_id === site.site_name && ""} `}
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
                  site.project_name,
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
                } ${artisanal_site_id === site.project_name && ""} `}
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
      </Map>
    </main>
  );
}

const PopupContent: React.FC<ProcessingEntities> = ({
  project_name,
  geographic_coordinates,
  latitude_longitude,
  longitude,
  latitude,
  characteristics,
  annual_production,
  owners_shareholders,
  nationality,
  iso3,
  affiliation,
  sources,
}) => {
  return (
    <div className="w-auto rounded-lg p-4">
      <h2 className="mb-2 text-lg font-bold text-black">{project_name}</h2>
      <ul className="space-y-3 text-sm text-black">
        {characteristics && (
          <li>
            <span className="font-semibold text-neutral-600">
              Characteristics:
            </span>
            <p className="text-sm font-medium">{characteristics}</p>
          </li>
        )}
        {annual_production && (
          <li>
            <span className="font-semibold text-neutral-600">
              Annual Production:
            </span>
            <p className="text-xl font-bold text-blue-600">
              {annual_production}
            </p>
          </li>
        )}
        {owners_shareholders && (
          <li>
            <span className="font-semibold text-neutral-600">
              Owners/Shareholders:
            </span>
            <p className="font-medium">{owners_shareholders}</p>
          </li>
        )}
        {nationality && (
          <li>
            <span className="font-semibold text-neutral-600">Nationality:</span>{" "}
            {nationality}
          </li>
        )}
        <li>
          <span className="font-semibold text-neutral-600">Coordinates:</span>{" "}
          {geographic_coordinates}
        </li>
        {/* <li>
          <span className="font-semibold">Lat/Long:</span>
          <p>{latitude_longitude}</p>
        </li> */}
        {/* <li>
          <span className="font-semibold">Longitude:</span> {longitude}
        </li>
        <li>
          <span className="font-semibold">Latitude:</span> {latitude}
        </li> */}

        {/* {iso3 && (
          <li>
            <span className="font-semibold">ISO3:</span> {iso3}
          </li>
        )} */}
        {/* {affiliation && (
          <li>
            <span className="font-semibold">Affiliation:</span> {affiliation}
          </li>
        )} */}
        {/* {sources && (
          <li>
            <span className="font-semibold">Sources:</span> {sources}
          </li>
        )} */}
      </ul>
    </div>
  );
};

{
  /* <Link href={`/?artisanal_site_id=${site.site_name}`}>
            <Pin
              className={`${
                selectedSite === site.site_name
                  ? "h-12 w-12 animate-bounce fill-red-400 dark:fill-red-800"
                  : "h-6 w-6 fill-neutral-700 stroke-neutral-50 dark:fill-neutral-500 dark:stroke-white"
              } ${artisanal_site_id === site.site_name && ""} `}
            />
          </Link> */
}
{
  /* <div className="flex min-w-44 flex-col">
              <p className="text-sm font-bold text-neutral-700">Name</p>
              <p className="text-lg font-black text-black">
                {popupInfo.project_name}
              </p>
            </div> */
}
