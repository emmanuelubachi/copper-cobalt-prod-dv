import fs from "fs";
import path from "path";
import MainMap from "./map";

var csv2geojson = require("csv2geojson");
import {
  filterFeatures,
  matchAndCombineFeatures,
  processNationality,
  filterOutPoints,
} from "@/lib/geojsonProcessing";

import { GeoJSONFeatureCollection } from "@/types/geojson";

export default async function Page() {
  const csvFilePath = path.join(process.cwd(), "data/industrial_projects.csv");
  const overlayFilePath = path.join(
    process.cwd(),
    "data/democratic_republic_of_the_congo_mining_permits.geojson",
  );

  const csvData = fs.readFileSync(csvFilePath, "utf8");
  const overlayData: GeoJSONFeatureCollection = JSON.parse(
    fs.readFileSync(overlayFilePath, "utf8"),
  );

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

  geojsonData = filterFeatures(geojsonData);
  geojsonData = matchAndCombineFeatures(geojsonData, overlayData);
  geojsonData = processNationality(geojsonData, "en");
  geojsonData = filterOutPoints(geojsonData);

  return (
    <main className="relative h-screen sm:mb-0 sm:ml-0 sm:pr-16">
      <MainMap geojsonData={geojsonData} />
    </main>
  );
}
