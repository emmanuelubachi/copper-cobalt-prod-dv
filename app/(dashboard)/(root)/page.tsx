import MainMap from "./map";
var csv2geojson = require("csv2geojson");
import {
  filterFeatures,
  matchAndCombineFeatures,
  processNationality,
  filterOutPoints,
} from "@/lib/geojsonProcessing";
import { readCsvFile, readGeoJsonFile } from "@/lib/readFiles";
import { GeoJSONFeatureCollection } from "@/types/geojson";

export default async function Page() {
  // get industral projects csv data from server
  const csvData = readCsvFile("data/map/industrial_projects.csv");

  // get geojson data from server
  const overlayData = readGeoJsonFile(
    "data/map/democratic_republic_of_the_congo_mining_permits.geojson",
  );

  const intRoutes = readGeoJsonFile(
    "/data/map/additional_info/lineFiltered.geojson",
  );

  const borderPosts = readGeoJsonFile(
    "/data/map/additional_info/posts.geojson",
  );

  const exportPorts = readGeoJsonFile(
    "/data/map/additional_info/point.geojson",
  );

  // convert csv data to geojson
  let geojsonData: GeoJSONFeatureCollection = await new Promise(
    (resolve, reject) => {
      csv2geojson.csv2geojson(
        csvData,
        {
          latfield: "latitude",
          lonfield: "longitude",
          delimiter: ",",
        },
        (err: any, data: any) => {
          if (err) reject(err);
          resolve(data);
        },
      );
    },
  );

  // process geojson
  geojsonData = filterFeatures(geojsonData);
  geojsonData = matchAndCombineFeatures(geojsonData, overlayData);
  geojsonData = processNationality(geojsonData, "en");
  geojsonData = filterOutPoints(geojsonData);

  return (
    <main className="relative h-screen sm:mb-0 sm:ml-0 sm:pr-16">
      <MainMap
        geojsonData={geojsonData}
        intRoutesData={intRoutes}
        borderPostsData={borderPosts}
        exportPortsData={exportPorts}
      />
    </main>
  );
}
