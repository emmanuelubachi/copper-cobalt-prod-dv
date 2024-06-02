"use client";

import Map, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export function Map1({ token }: { token: string | undefined }) {
  const TOKEN = token;
  return (
    <Map
      mapboxAccessToken={TOKEN}
      mapStyle="mapbox://styles/manuel-52/clp2d747b01fx01qm9p5jhqwy"
      initialViewState={{
        longitude: 23.52741376552,
        latitude: -3.050471588628,
        zoom: 5,
      }}
      // style={{ position: "absolute" }}
      // maxZoom={15}
      // minZoom={3}
    >
      <NavigationControl position="bottom-right" />

      {/* <AttributionControl
          customAttribution='© <a href="https://www.ubachi.com/" target="_blank">Ubachi</a>'
          position="bottom-right"
        /> */}
    </Map>
  );
}

// export function Map2({ token }: { token: string | undefined }) {
//   const TOKEN = token;
//   return (
//     <Map
//       mapboxAccessToken={TOKEN}
//       mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
//       initialViewState={{
//         longitude: 26.187232,
//         latitude: -10.563779,
//         zoom: 15,
//       }}
//       style={{
//         width: 400,
//         height: 300,
//         borderRadius: "12px 12px 0px 0px",
//       }}
//       maxZoom={18}
//       minZoom={10}
//     ></Map>
//   );
// }
