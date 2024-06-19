// import { Map1 } from "./map";
"use client";
import { useEffect, useState } from "react";
import Map, { NavigationControl } from "react-map-gl";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Home() {
  const { theme, systemTheme } = useTheme();
  const [mapStyle, setMapStyle] = useState("");
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
        mapboxAccessToken="pk.eyJ1IjoibWFudWVsLTUyIiwiYSI6ImNsbTlsc2RsYTBpYm0zaXM1djR6Y3hndjkifQ.eSTJ1yxIIzqz3PItuWiY1Q"
        mapStyle={mapStyle} //"mapbox://styles/manuel-52/clxc6qcpw00t101qq42et2qoy" // mapbox://styles/manuel-52/clp2d747b01fx01qm9p5jhqwy mapbox://styles/manuel-52/clp2hqaxu01di01pm3cw43rr6
        initialViewState={{
          longitude: 23.52741376552,
          latitude: -3.050471588628,
          zoom: 5,
        }}
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

  // return (
  //   <main className="relative h-screen sm:mb-0 sm:ml-0 sm:pr-16">
  //     {isDark ? (
  //       <Map
  //         mapboxAccessToken="pk.eyJ1IjoibWFudWVsLTUyIiwiYSI6ImNsbTlsc2RsYTBpYm0zaXM1djR6Y3hndjkifQ.eSTJ1yxIIzqz3PItuWiY1Q"
  //         mapStyle="mapbox://styles/mapbox/dark-v11" //"mapbox://styles/manuel-52/clxc6qcpw00t101qq42et2qoy" // mapbox://styles/manuel-52/clp2d747b01fx01qm9p5jhqwy mapbox://styles/manuel-52/clp2hqaxu01di01pm3cw43rr6
  //         initialViewState={{
  //           longitude: 23.52741376552,
  //           latitude: -3.050471588628,
  //           zoom: 5,
  //         }}
  //         style={{ position: "absolute" }}
  //         maxZoom={15}
  //         minZoom={4}
  //         customAttribution={
  //           '<a href="https://www.ubachi.com/" target="_blank">© Ubachi</a>'
  //         }
  //       >
  //         <NavigationControl position="bottom-right" />
  //       </Map>
  //     ) : (
  //       <Map
  //         mapboxAccessToken="pk.eyJ1IjoibWFudWVsLTUyIiwiYSI6ImNsbTlsc2RsYTBpYm0zaXM1djR6Y3hndjkifQ.eSTJ1yxIIzqz3PItuWiY1Q"
  //         mapStyle="mapbox://styles/mapbox/streets-v11"
  //         initialViewState={{
  //           longitude: 23.52741376552,
  //           latitude: -3.050471588628,
  //           zoom: 5,
  //         }}
  //         style={{ position: "absolute" }}
  //         maxZoom={15}
  //         minZoom={4}
  //         customAttribution={
  //           '<a href="https://www.ubachi.com/" target="_blank">© Ubachi</a>'
  //         }
  //       >
  //         <NavigationControl position="bottom-right" />
  //       </Map>
  //     )}
  //   </main>
  // );
}
