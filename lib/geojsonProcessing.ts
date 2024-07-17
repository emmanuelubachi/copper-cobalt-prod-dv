import { featureCollection, combine } from "@turf/turf";
import { GeoJSONFeature, GeoJSONFeatureCollection } from "../types/geojson";

export const filterFeatures = (
  data: GeoJSONFeatureCollection,
): GeoJSONFeatureCollection => {
  return {
    ...data,
    features: data.features.filter((d) => d.properties.Code !== ""),
  };
};

export const matchAndCombineFeatures = (
  data: GeoJSONFeatureCollection,
  overlayData: GeoJSONFeatureCollection,
): GeoJSONFeatureCollection => {
  const toMatch = overlayData.features.map((d) => d.properties.code);

  data.features = data.features.map((d, index) => {
    d.id = index;
    const split = d.properties.Code.split("&");

    let gigi: GeoJSONFeature | undefined;
    let exist = "";

    let turfed: GeoJSONFeature[] = [];
    split.forEach((element: string) => {
      const i = toMatch.indexOf(element);
      if (i !== -1) {
        gigi = overlayData.features[i];
        turfed.push(gigi);
        exist = i.toString();
      }
    });

    if (exist !== "") {
      const fc = featureCollection(turfed);
      const combined = combine(fc);
      d.geometry = combined.features[0].geometry;
    }

    return d;
  });

  return data;
};

export const processNationality = (
  data: GeoJSONFeatureCollection,
  lang: string,
): GeoJSONFeatureCollection => {
  const nationalityLabel =
    lang === "en" ? "Nationality" : "Nationalité des actionnaires";
  data.features = data.features.map((d) => {
    const split = d.properties[nationalityLabel].split("/");

    split.forEach((element: string, index: number) => {
      d.properties[`nat-${index}`] = element.toLowerCase();
    });

    return d;
  });

  return data;
};

export const filterOutPoints = (
  data: GeoJSONFeatureCollection,
): GeoJSONFeatureCollection => {
  return {
    ...data,
    features: data.features.filter((d) => d.geometry.type !== "Point"),
  };
};
