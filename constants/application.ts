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

export const IndustralProjectsNode = [
  {
    value: "Australia",
    label: "Australia",
    children: [
      {
        value: "SEK",
        label: "SOCIETE D'EXPLOITATION DE KIPOI",
      },
    ],
  },
  {
    value: "Canada",
    label: "Canada",
    children: [
      {
        value: "KAMOA",
        label: "KAMOA COPPER SA",
      },
    ],
  },
  {
    value: "China",
    label: "China",
    children: [
      {
        value: "ANVIL",
        label: "ANVIL MINING CONGO SARL",
      },
      {
        value: "CCR",
        label: "CHENGTUN CONGO RESSOURCES SARL",
      },
      {
        value: "CDM",
        label: "CONGO DONGFANG INTERNATIONAL MINING",
      },
      {
        value: "CJCMC",
        label: "CONGO JINJUN CHENG",
      },
      {
        value: "CNMC CONGO",
        label: "SOCIETE CNMC CONGO COMPAGNIE MINIER",
      },
      {
        value: "COMIKA",
        label: "COMPAGNIE MINIERE DE KAMBOVE SPRL",
      },
      {
        value: "COMILU",
        label: "COMPAGNIE MINIERE DE LUISHA",
      },
      {
        value: "COMMUS",
        label: "LA COMPAGNIE MINIERE DE MUSONOIE GL",
      },
      {
        value: "DIVINE LAND",
        label: "DIVINE LAND MINING SARL",
      },
      {
        value: "EVERBRIGHT",
        label: "EVERBRIGHT MINING SARL",
      },
      {
        value: "EXCELLEN",
        label: "JIN XUN CONGO MINING SARL",
      },
      {
        value: "HANRUI METAL",
        label: "SABWE MINING SARLSABWE MINING SARL",
      },
      {
        value: "HUACHIN MABENDE",
        label: "CNMC HUACHIN MABENDE MINING SPRL",
      },
      {
        value: "HUACHIN METAL",
        label: "HUACHIN METAL LEACH SPRL",
      },
      {
        value: "JXCOM",
        label: "JIN XUN CONGO MINING SARL",
      },
      {
        value: "KAI PENG",
        label: "SOCIETE KAI PENG MINING",
      },
      {
        value: "KAMBOVE MINING",
        label: "KAMBOVE MINING SAS",
      },
      {
        value: "KFM",
        label: "KISANFU MINING",
      },
      {
        value: "KICC",
        label: "KINSENDA COPPER COMPANY SARL",
      },
      {
        value: "LAMIKAL",
        label: "LA MINIERE DE KALUNKUNDI",
      },
      {
        value: "LCS",
        label: "LUALABA COPPER SMELTER SAS",
      },
      {
        value: "LR SAS",
        label: "LUILU RESSOURCES SAS",
      },
      {
        value: "MM",
        label: "METAL MINES SPRL",
      },
      {
        value: "MIKAS",
        label: "LA  MINIERE  DE  KASOMBO",
      },
      {
        value: "MJM",
        label: "MACROLINK JIAYUAN MINING SPRL",
      },
      {
        value: "MKM SAS",
        label: "LA MINIERE DE KALUNBWE MYUNGA",
      },
      {
        value: "MMG",
        label: "MMG KINSEVERE SARL",
      },
      {
        value: "NEW MINERALS",
        label: "NEW MINERALS",
      },
      {
        value: "RUASHI MINING",
        label: "RUASHI MINING SPRL",
      },
      {
        value: "SHITURU MINING",
        label: "SHITURU MINING CORPORATION SPRL",
      },
      {
        value: "SICOMINES",
        label: "SINO CONGOLAISE DES MINES SARL",
      },
      {
        value: "SOMIDEZ",
        label: "SOCIETE MINIERE DE DEZIWA SAS",
      },
      {
        value: "TCC",
        label: "TENGYUAN COBALT & COPPER RESOURCES",
      },
      {
        value: "TFM",
        label: "TENKE FUNGURUME MINING",
      },
      {
        value: "THOMAS",
        label: "THOMAS MINING SARL",
      },
    ],
  },
  {
    value: "DR Congo",
    label: "DR Congo",
    children: [
      {
        value: "GECAMINES",
        label: "KISANFU MINING",
      },
      {
        value: "KALONGWE",
        label: "KALONGWE MINING S.A",
      },
      {
        value: "MMT",
        label: "MINERAL METAL TECHNOLOGY SARL",
      },
      {
        value: "STL",
        label: "SOCIETE POUR LE TRAITEMENT DU TERRIL DE LUBUMBASHI",
      },
      {
        value: "CHEMAF",
        label: "CHEMICAL OF AFRICA SPRL",
      },
    ],
  },
  {
    value: "India",
    label: "India",
    children: [
      {
        value: "GOLDEN AFRICAN",
        label: "MINERAL METAL TECHNOLOGY SARL",
      },
      {
        value: "KIMIN",
        label: "KISANFU MINING SPRL",
      },
      {
        value: "OMR",
        label: "OM METAL RESSOURCES SPRL",
      },
      {
        value: "RUBAMIN",
        label: "RUBAMIN SARL",
      },
      {
        value: "SOMIKA",
        label: "SOCIETE MINIERE DU KATANGA",
      },
      {
        value: "KATANGA STRATEGIC",
        label: "KATANGA STRATEGIC RESOURCES",
      },
    ],
  },
  {
    value: "Kazakhstan",
    label: "Kazakhstan",
    children: [
      {
        value: "BOSS MINING",
        label: "BOSS MINING SPRL",
      },
      {
        value: "COMIDE",
        label: "LA CONGOLAISE DES MINES ET DE DEVEL",
      },
      {
        value: "FRONTIER",
        label: "KALONGWE MINING S.A",
      },
      {
        value: "METALKOL",
        label: "COMPAGNIE DE TRAITEMENT DES REJETS KINGYAMBO",
      },
    ],
  },
  {
    value: "South Africa",
    label: "South Africa",
    children: [
      {
        value: "MPC",
        label: "MINING PROGRESS COMPAGNY SARL",
      },
    ],
  },
  {
    value: "Switzerland",
    label: "Switzerland",
    children: [
      {
        value: "KCC",
        label: "KAMOTO COPPER COMPANY SARL",
      },
      {
        value: "MUTANDA",
        label: "MUTANDA MINING",
      },
    ],
  },
  {
    value: "Unknown",
    label: "Unknown",
    children: [
      {
        value: "AMICAL KAKANA",
        label: "AMICAL KAKANA MINING SPRL",
      },
      {
        value: "CONGO MOON",
        label: "CONGO MOON MINING",
      },
    ],
  },
  {
    value: "USA",
    label: "USA",
    children: [
      {
        value: "SABWE",
        label: "SABWE MINING SARLSABWE MINING SARL",
      },
    ],
  },
];

export const CheckAllIndustralProjects = [
  "SEK",
  "KAMOA",
  "ANVIL",
  "CCR",
  "CDM",
  "CJCMC",
  "CNMC CONGO",
  "COMIKA",
  "COMILU",
  "COMMUS",
  "DIVINE LAND",
  "EVERBRIGHT",
  "EXCELLEN",
  "HANRUI METAL",
  "HUACHIN MABENDE",
  "HUACHIN METAL",
  "JXCOM",
  "KAI PENG",
  "KAMBOVE MINING",
  "KFM",
  "KICC",
  "LAMIKAL",
  "LCS",
  "LR SAS",
  "MM",
  "MIKAS",
  "MJM",
  "MKM SAS",
  "MMG",
  "NEW MINERALS",
  "RUASHI MINING",
  "SHITURU MINING",
  "SICOMINES",
  "SOMIDEZ",
  "TCC",
  "TFM",
  "THOMAS",
  "GECAMINES",
  "KALONGWE",
  "MMT",
  "STL",
  "CHEMAF",
  "GOLDEN AFRICAN",
  "KIMIN",
  "OMR",
  "RUBAMIN",
  "SOMIKA",
  "KATANGA STRATEGIC",
  "BOSS MINING",
  "COMIDE",
  "FRONTIER",
  "METALKOL",
  "MPC",
  "KCC",
  "MUTANDA",
  "AMICAL KAKANA",
  "CONGO MOON",
  "SABWE",
];
