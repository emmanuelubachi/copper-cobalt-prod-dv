"use client";

import Map, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export function Map1({ token }: { token: string | undefined }) {
  const TOKEN = token;

  return (
    <Map
      mapboxAccessToken={TOKEN}
      mapStyle="mapbox://styles/manuel-52/clxc6qcpw00t101qq42et2qoy" // mapbox://styles/manuel-52/clp2d747b01fx01qm9p5jhqwy mapbox://styles/manuel-52/clp2hqaxu01di01pm3cw43rr6
      initialViewState={{
        longitude: 23.52741376552,
        latitude: -3.050471588628,
        zoom: 5,
      }}
      style={{ position: "absolute" }}
      maxZoom={15}
      minZoom={3}
      customAttribution={
        '<a href="https://www.ubachi.com/" target="_blank">© Ubachi</a>'
      }
    >
      <NavigationControl position="bottom-right" />
    </Map>
  );
}
