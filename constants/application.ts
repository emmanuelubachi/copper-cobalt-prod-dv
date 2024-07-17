import { LineChart, Map, Pickaxe, Ship } from "lucide-react";
import { NavItem } from "@/types";
import {
  IndustralProjectDetailsProps,
  ArtisanalSiteDetailsProps,
} from "@/types/miningActivities";

export const NAVLIST: NavItem[] = [
  {
    name: "Map",
    path: "/",
    link: "/",
    icon: Map,
  },
  {
    name: "Overview",
    path: "/production-overview",
    link: "/production-overview",
    icon: LineChart,
  },
  {
    name: "Project",
    path: "/projects",
    link: "/projects?project_id=anvil-mining",
    icon: Pickaxe,
  },
  // {
  //   name: "Exports",
  //   path: "/export-flow",
  //   link: "/export-flow",
  //   icon: Ship,
  // },
];

export const NATIONALITYLIST: string[] = [
  "Australia",
  "China",
  "China and Canada",
  "DR Congo",
  "India",
  "Kazakhstan",
  "South Africa",
  "Switzerland",
  "Unknown",
  "USA",
];

export const ArticanalsiteDetailsLabels: {
  key: keyof ArtisanalSiteDetailsProps;
  label: string;
}[] = [
  { key: "sources", label: "Sources" },
  { key: "visit_date", label: "Visit Date" },
  { key: "site_visit__bgr", label: "Visited by BGR" },
  { key: "site_visit__cgsp", label: "Visited by CGSP" },
  { key: "longitude", label: "Longitude" },
  { key: "latitude", label: "Latitude" },
  { key: "location_origin", label: "Location Origin" },
  { key: "province__territory", label: "Province/Territory" },
  { key: "cooperative_in_charge", label: "Cooperative in Charge" },
  { key: "employees", label: "Employees" },
  { key: "minerals_extracted", label: "Minerals Extracted" },
  { key: "point_of_sale__purchasing_station", label: "Point of Sale" },
  { key: "status_in_2023", label: "Status in 2023" },
];

export const IndustrialProjectDetailsLabels: {
  key: keyof IndustralProjectDetailsProps;
  label: string;
}[] = [
  { key: "N", label: "Number" },
  { key: "ProjectName", label: "Project Name" },
  { key: "ShortName", label: "Short Name" },
  { key: "PermitID", label: "Permit ID" },
  { key: "Code", label: "Code" },
  { key: "Ownership", label: "Ownership" },
  { key: "Nationality", label: "Nationality" },
  { key: "AnnualProduction2022", label: "Annual Production 2022" },
  { key: "ISOA3", label: "ISO A3" },
  { key: "Province", label: "Province" },
  { key: "GeographicalCoordinates", label: "Geographical Coordinates" },
  { key: "LatitudeLongitude", label: "Latitude, Longitude" },
  { key: "GeographicalDescription", label: "Geographical Description" },
  { key: "ProjectSize", label: "Project Size" },
  { key: "DepositSize", label: "Deposit Size" },
  { key: "MineLifePermitValidity", label: "Mine Life/Permit Validity" },
  { key: "MineType", label: "Mine Type" },
  { key: "ContractType", label: "Contract Type" },
  { key: "ShareAllocation", label: "Share Allocation" },
  { key: "ProjectBackground", label: "Project Background" },
  { key: "Management", label: "Management" },
  { key: "NumberOfEmployees", label: "Number of Employees" },
  { key: "SourcesLinks", label: "Sources/Links" },
  { key: "Nat0", label: "Nationality 0" },
  { key: "Nat1", label: "Nationality 1" },
];
