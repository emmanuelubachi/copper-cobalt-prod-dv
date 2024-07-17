import {
  Geometry,
  FeatureCollection as TurfFeatureCollection,
} from "@turf/turf";

export interface FeatureProps {
  [key: string]: any;
}

export interface GeoJSONFeature
  extends GeoJSON.Feature<Geometry, FeatureProps> {
  id?: number;
}

export interface GeoJSONFeatureCollection
  extends TurfFeatureCollection<Geometry, FeatureProps> {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}
