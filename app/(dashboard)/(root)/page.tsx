// import { Map1 } from "./map";
"use client";
import { useEffect, useState } from "react";
import Map, { NavigationControl } from "react-map-gl";
import { useTheme } from "next-themes";

import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Home() {
  const { theme, systemTheme } = useTheme();
  const [mapStyle, setMapStyle] = useState("");
  const [viewState, setViewState] = useState({
    longitude: 23.52741376552,
    latitude: -3.050471588628,
    zoom: 5,
  });
  // const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      setMapStyle("mapbox://styles/mapbox/dark-v10");
    } else {
      setMapStyle("mapbox://styles/mapbox/streets-v10");
    }
  }, [theme, systemTheme]);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) {
  //   return null;
  // }

  return (
    <main className="relative h-screen sm:mb-0 sm:ml-0 sm:pr-16">
      <Map
        mapboxAccessToken={TOKEN}
        mapStyle={mapStyle}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ position: "absolute" }}
        maxZoom={15}
        minZoom={4}
        customAttribution={
          '<a href="https://www.ubachi.com/" target="_blank">© Ubachi</a>'
        }
      >
        <NavigationControl position="bottom-right" />
      </Map>
    </main>
  );
}
