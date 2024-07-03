import React from "react";
import { ProcessingEntities } from "@/types";

export const PopupContent: React.FC<ProcessingEntities> = ({
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
