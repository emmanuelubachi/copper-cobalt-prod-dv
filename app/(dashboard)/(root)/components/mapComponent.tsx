import React, { useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import Map, {
  MapRef,
  AttributionControl,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import useMapDetailsStore from "@/store/mapDetailsStore";
import MapDetailsContent from "./mapDetailsContent";
import MarkersComponent from "./markerComponent";
import { ArtisanalSite } from "@/types";

interface MapComponentProps {
  isMobile: boolean;
  artisanal_site_id: string | null;
  activeSites: ArtisanalSite[];
  inactiveSites: ArtisanalSite[];
}

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapComponent: React.FC<MapComponentProps> = ({
  isMobile,
  artisanal_site_id,
  activeSites,
  inactiveSites,
}) => {
  const mapRef = useRef<MapRef | null>(null);
  const { theme, systemTheme } = useTheme();
  const { showActiveMarkers, showInactiveMarkers } = useMarkerVisibilityStore();
  const { openMapDetails, setMapDetailsContent } = useMapDetailsStore();
  const [mapStyle, setMapStyle] = useState("");
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

  const handleMapDetailsClick = useCallback(
    (latitude: number, longitude: number) => {
      openMapDetails();
      setMapDetailsContent(<MapDetailsContent />);
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
      <MarkersComponent
        activeSites={activeSites}
        inactiveSites={inactiveSites}
        showActiveMarkers={showActiveMarkers}
        showInactiveMarkers={showInactiveMarkers}
        artisanal_site_id={artisanal_site_id}
        handleMapDetailsClick={handleMapDetailsClick}
      />
    </Map>
  );
};

export default MapComponent;
