import { LineChart, Map, Pickaxe, Building } from "lucide-react";
import { NavItem } from "@/types";
import {
  IndustralProjectDetailsProps,
  ArtisanalSiteDetailsProps,
} from "@/types/map";

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
    link: "/projects?project_id=ccr",
    icon: Pickaxe,
  },
  {
    name: "Companies",
    path: "/companies",
    link: "/companies",
    icon: Building,
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
  { key: "N°", label: "Number" },
  { key: "Project_name", label: "Project Name" },
  { key: "Short_name", label: "Short Name" },
  { key: "Permit_ID", label: "Permit ID" },
  { key: "Code", label: "Code" },
  { key: "Ownership", label: "Ownership" },
  { key: "Nationality", label: "Nationality" },
  {
    key: "Copper/Cobalt_annual_production_(2022)",
    label: "Annual Production 2022",
  },
  { key: "ISO_A3", label: "ISO A3" },
  { key: "Province", label: "Province" },
  { key: "Geographical_coordinates", label: "Geographical Coordinates" },
  { key: "latitude_longitude", label: "Latitude, Longitude" },
  {
    key: "Geographical_description_project_description",
    label: "Geographical Description",
  },
  { key: "Project_size", label: "Project Size" },
  { key: "Deposit_size_(official_reserves)", label: "Deposit Size" },
  { key: "Mine_life/permit_validity", label: "Mine Life/Permit Validity" },
  { key: "Mine_type", label: "Mine Type" },
  { key: "Contract_type", label: "Contract Type" },
  { key: "Share_allocation", label: "Share Allocation" },
  { key: "Project_background", label: "Project Background" },
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
        value: "sek",
        label: "Societe D'Exploitation De Kipoi",
      },
    ],
  },
  {
    value: "Canada",
    label: "Canada & China",
    children: [
      {
        value: "kamoa",
        label: "Kamoa Copper SA",
      },
    ],
  },
  {
    value: "China",
    label: "China",
    children: [
      {
        value: "anvil",
        label: "Anvil Mining Congo SARL",
      },
      {
        value: "ccr",
        label: "Chengtun Congo Ressources SARL",
      },
      {
        value: "cdm",
        label: "Congo Dongfang International Mining",
      },
      {
        value: "cjcmc",
        label: "Congo Jinjun Cheng",
      },
      {
        value: "cnmc",
        label: "Societe Cnmc Congo Compagnie Minier",
      },
      {
        value: "comika",
        label: "Compagnie Miniere De Kambove SPRL",
      },
      {
        value: "comilu",
        label: "Compagnie Miniere De Luisha",
      },
      {
        value: "commus",
        label: "La Compagnie Miniere De Musonoie Gl",
      },
      {
        value: "divine",
        label: "Divine Land Mining SARL",
      },
      {
        value: "everbright",
        label: "Everbright Mining SARL",
      },
      {
        value: "excellen",
        label: "Excelent Minerals SARL",
      },
      {
        value: "hanrui_metal",
        label: "Hanuri Metal Congo",
      },
      {
        value: "huachin_mabende",
        label: "CNMC Huachin Mabende Mining SPRL",
      },
      {
        value: "huachin metal",
        label: "Huachin Metal Leach SPRL",
      },
      {
        value: "jxcom",
        label: "Jin Xun Congo Mining SARL",
      },
      {
        value: "kaipeng",
        label: "Societe Kai Peng Mining",
      },
      {
        value: "kambove",
        label: "Kambove Mining SAS",
      },
      {
        value: "kfm",
        label: "Kisanfu Mining",
      },
      {
        value: "kicc",
        label: "Kinsenda Copper Company SARL",
      },
      {
        value: "lamikal",
        label: "La Miniere De Kalunkundi",
      },
      {
        value: "lcs",
        label: "Lualaba Copper Smelter SAS",
      },
      {
        value: "lr_sas",
        label: "Luilu Ressources SAS",
      },
      {
        value: "mm",
        label: "Metal Mines SPRL",
      },
      {
        value: "mikas",
        label: "La Miniere De Kasombo",
      },
      {
        value: "mjm",
        label: "Macrolink Jiayuan Mining SPRL",
      },
      {
        value: "mkm",
        label: "La Miniere De Kalunbwe Myunga",
      },
      {
        value: "mmg",
        label: "MMG Kinsevere SARL",
      },
      {
        value: "new_minerals",
        label: "New Minerals",
      },
      {
        value: "ruashi",
        label: "Ruashi Mining SPRL",
      },
      {
        value: "shituru",
        label: "Shituru Mining Corporation SPRL",
      },
      {
        value: "sicomines",
        label: "Sino Congolaise Des Mines SARL",
      },
      {
        value: "somidez",
        label: "Societe Miniere De Deziwa SAS",
      },
      {
        value: "tcc",
        label: "Tengyuan Cobalt & Copper Resources",
      },
      {
        value: "tfm",
        label: "Tenke Fungurume Mining",
      },
      {
        value: "thomas",
        label: "Thomas Mining SARL",
      },
    ],
  },
  {
    value: "DR Congo",
    label: "DR Congo",
    children: [
      {
        value: "gcm",
        label: "GECAMINES",
      },
      {
        value: "kalongwe",
        label: "Kalongwe Mining S.A",
      },
      {
        value: "mmt",
        label: "Mineral Metal Technology SARL",
      },
      {
        value: "stl",
        label: "Societe Pour Le Traitement Du Terril De Lubumbashi",
      },
    ],
  },
  {
    value: "India",
    label: "India",
    children: [
      {
        value: "chemaf",
        label: "Chemical Of Africa SPRL",
      },
      {
        value: "golden",
        label: "Golden Africa Resources SPRL",
      },
      {
        value: "kimin",
        label: "Kisanfu Mining SPRL",
      },
      {
        value: "omr",
        label: "Om Metal Ressources SPRL",
      },
      {
        value: "rubamin",
        label: "Rubamin SARL",
      },
      {
        value: "somika",
        label: "Societe Miniere Du Katanga",
      },
      {
        value: "kastro",
        label: "Katanga Strategic Resources",
      },
    ],
  },
  {
    value: "Kazakhstan",
    label: "Kazakhstan",
    children: [
      {
        value: "boss",
        label: "Boss Mining SPRL",
      },
      {
        value: "comide",
        label: "La Congolaise Des Mines Et De Devel",
      },
      {
        value: "frontier",
        label: "Kalongwe Mining S.A",
      },
      {
        value: "metalkol",
        label: "Compagnie De Traitement Des Rejets KingyamBo",
      },
    ],
  },
  {
    value: "South Africa",
    label: "South Africa",
    children: [
      {
        value: "mpc",
        label: "Mining Progress Company SARL",
      },
    ],
  },
  {
    value: "Switzerland",
    label: "Switzerland",
    children: [
      {
        value: "kcc",
        label: "Kamoto Copper Company SARL",
      },
      {
        value: "mumi",
        label: "Mutanda Mining SARL",
      },
    ],
  },
  {
    value: "Unknown",
    label: "Unknown",
    children: [
      {
        value: "amical",
        label: "Amical Kakana Mining SPRL",
      },
      {
        value: "congo_moon",
        label: "Congo Moon Mining SARL",
      },
      {
        value: "societe_kasonta",
        label: "Societe Miniere De Kasonta",
      },
    ],
  },
  {
    value: "USA",
    label: "USA",
    children: [
      {
        value: "sabwe",
        label: "Sabwe Mining SARL",
      },
    ],
  },
];

export const CheckAllIndustralProjects = [
  "amical",
  "anvil",
  "benco",
  "boss",
  "ccr",
  "cdm",
  "chemaf",
  "cjcmc",
  "cnmc",
  "comide",
  "comika",
  "comilu",
  "commus",
  "congo_moon",
  "divine",
  "everbright",
  "excellen",
  "frontier",
  "gcm",
  "golden",
  "hanrui_metal",
  "huachin_mabende",
  "huachin metal",
  "jxcom",
  "kaipeng",
  "kalongwe",
  "kambove",
  "kamoa",
  "kansonga",
  "kastro",
  "kcc",
  "kfm",
  "kicc",
  "kimin",
  "lamikal",
  "lcs",
  "lr_sas",
  "metalkol",
  "mikas",
  "mjm",
  "mkm",
  "mm",
  "mmg",
  "mmt",
  "mpc",
  "msl",
  "mumi",
  "new_minerals",
  "omr",
  "ruashi",
  "rubamin",
  "sabwe",
  "sek",
  "semhkat",
  "shituru",
  "sicomines",
  "societe_kasonta",
  "somidez",
  "somika",
  "stl",
  "tcc",
  "tfm",
  "thomas",
];

export const countriesWithColors = [
  { country: "Australia", color: "#546475" },
  { country: "Canada", color: "#13B8B1" },
  { country: "China", color: "#F16067" },
  { country: "DR Congo", color: "#ADBCDD" },
  { country: "India", color: "#ECC0A7" },
  { country: "Kazakhstan", color: "#A28882" },
  { country: "Switzerland", color: "#FB9635" },
  { country: "Unknown", color: "#033550" }, // Placeholder for the unmatched color
];

// export const IndustralProjectsNode = [
//   {
//     value: "Australia",
//     label: "Australia",
//     children: [
//       {
//         value: "SEK (Kipoi Mines)",
//         label: "SOCIETE D'EXPLOITATION DE KIPOI",
//       },
//     ],
//   },
//   {
//     value: "Canada",
//     label: "Canada",
//     children: [
//       {
//         value: "KAMOA-KAKULA",
//         label: "KAMOA COPPER SA",
//       },
//     ],
//   },
//   {
//     value: "China",
//     label: "China",
//     children: [
//       {
//         value: "ANVIL",
//         label: "ANVIL MINING CONGO SARL",
//       },
//       {
//         value: "CCR",
//         label: "CHENGTUN CONGO RESSOURCES SARL",
//       },
//       {
//         value: "CDM",
//         label: "CONGO DONGFANG INTERNATIONAL MINING",
//       },
//       {
//         value: "CJCMC",
//         label: "CONGO JINJUN CHENG",
//       },
//       {
//         value: "CNMC CONGO",
//         label: "SOCIETE CNMC CONGO COMPAGNIE MINIER",
//       },
//       {
//         value: "COMIKA",
//         label: "COMPAGNIE MINIERE DE KAMBOVE SPRL",
//       },
//       {
//         value: "COMILU",
//         label: "COMPAGNIE MINIERE DE LUISHA",
//       },
//       {
//         value: "COMMUS",
//         label: "LA COMPAGNIE MINIERE DE MUSONOIE GL",
//       },
//       {
//         value: "DIVINE LAND",
//         label: "DIVINE LAND MINING SARL",
//       },
//       {
//         value: "EVERBRIGHT",
//         label: "EVERBRIGHT MINING SARL",
//       },
//       {
//         value: "EXCELLEN",
//         label: "JIN XUN CONGO MINING SARL",
//       },
//       {
//         value: "HANRUI METAL",
//         label: "SABWE MINING SARLSABWE MINING SARL",
//       },
//       {
//         value: "HUACHIN MABENDE",
//         label: "CNMC HUACHIN MABENDE MINING SPRL",
//       },
//       {
//         value: "HUACHIN METAL",
//         label: "HUACHIN METAL LEACH SPRL",
//       },
//       {
//         value: "JXCOM",
//         label: "JIN XUN CONGO MINING SARL",
//       },
//       {
//         value: "KAI PENG",
//         label: "SOCIETE KAI PENG MINING",
//       },
//       {
//         value: "KAMBOVE MINING",
//         label: "KAMBOVE MINING SAS",
//       },
//       {
//         value: "KFM",
//         label: "KISANFU MINING",
//       },
//       {
//         value: "KICC",
//         label: "KINSENDA COPPER COMPANY SARL",
//       },
//       {
//         value: "LAMIKAL",
//         label: "LA MINIERE DE KALUNKUNDI",
//       },
//       {
//         value: "LCS",
//         label: "LUALABA COPPER SMELTER SAS",
//       },
//       {
//         value: "LR SAS",
//         label: "LUILU RESSOURCES SAS",
//       },
//       {
//         value: "MM",
//         label: "METAL MINES SPRL",
//       },
//       {
//         value: "MIKAS",
//         label: "LA  MINIERE  DE  KASOMBO",
//       },
//       {
//         value: "MJM",
//         label: "MACROLINK JIAYUAN MINING SPRL",
//       },
//       {
//         value: "MKM SAS",
//         label: "LA MINIERE DE KALUNBWE MYUNGA",
//       },
//       {
//         value: "MMG",
//         label: "MMG KINSEVERE SARL",
//       },
//       {
//         value: "NEW MINERALS",
//         label: "NEW MINERALS",
//       },
//       {
//         value: "RUASHI MINING",
//         label: "RUASHI MINING SPRL",
//       },
//       {
//         value: "SHITURU MINING",
//         label: "SHITURU MINING CORPORATION SPRL",
//       },
//       {
//         value: "SICOMINES",
//         label: "SINO CONGOLAISE DES MINES SARL",
//       },
//       {
//         value: "SOMIDEZ",
//         label: "SOCIETE MINIERE DE DEZIWA SAS",
//       },
//       {
//         value: "TCC",
//         label: "TENGYUAN COBALT & COPPER RESOURCES",
//       },
//       {
//         value: "TFM",
//         label: "TENKE FUNGURUME MINING",
//       },
//       {
//         value: "THOMAS",
//         label: "THOMAS MINING SARL",
//       },
//     ],
//   },
//   {
//     value: "DR Congo",
//     label: "DR Congo",
//     children: [
//       {
//         value: "GECAMINES",
//         label: "KISANFU MINING",
//       },
//       {
//         value: "KALONGWE",
//         label: "KALONGWE MINING S.A",
//       },
//       {
//         value: "MMT",
//         label: "MINERAL METAL TECHNOLOGY SARL",
//       },
//       {
//         value: "STL",
//         label: "SOCIETE POUR LE TRAITEMENT DU TERRIL DE LUBUMBASHI",
//       },
//       {
//         value: "CHEMAF",
//         label: "CHEMICAL OF AFRICA SPRL",
//       },
//     ],
//   },
//   {
//     value: "India",
//     label: "India",
//     children: [
//       {
//         value: "GOLDEN AFRICAN",
//         label: "MINERAL METAL TECHNOLOGY SARL",
//       },
//       {
//         value: "KIMIN",
//         label: "KISANFU MINING SPRL",
//       },
//       {
//         value: "OMR",
//         label: "OM METAL RESSOURCES SPRL",
//       },
//       {
//         value: "RUBAMIN",
//         label: "RUBAMIN SARL",
//       },
//       {
//         value: "SOMIKA",
//         label: "SOCIETE MINIERE DU KATANGA",
//       },
//       {
//         value: "KATANGA STRATEGIC",
//         label: "KATANGA STRATEGIC RESOURCES",
//       },
//     ],
//   },
//   {
//     value: "Kazakhstan",
//     label: "Kazakhstan",
//     children: [
//       {
//         value: "BOSS MINING",
//         label: "BOSS MINING SPRL",
//       },
//       {
//         value: "COMIDE",
//         label: "LA CONGOLAISE DES MINES ET DE DEVEL",
//       },
//       {
//         value: "FRONTIER",
//         label: "KALONGWE MINING S.A",
//       },
//       {
//         value: "METALKOL",
//         label: "COMPAGNIE DE TRAITEMENT DES REJETS KINGYAMBO",
//       },
//     ],
//   },
//   {
//     value: "South Africa",
//     label: "South Africa",
//     children: [
//       {
//         value: "MPC",
//         label: "MINING PROGRESS COMPAGNY SARL",
//       },
//     ],
//   },
//   {
//     value: "Switzerland",
//     label: "Switzerland",
//     children: [
//       {
//         value: "KCC",
//         label: "KAMOTO COPPER COMPANY SARL",
//       },
//       {
//         value: "MUTANDA",
//         label: "MUTANDA MINING",
//       },
//     ],
//   },
//   {
//     value: "Unknown",
//     label: "Unknown",
//     children: [
//       {
//         value: "AMICAL KAKANA",
//         label: "AMICAL KAKANA MINING SPRL",
//       },
//       {
//         value: "CONGO MOON",
//         label: "CONGO MOON MINING",
//       },
//     ],
//   },
//   {
//     value: "USA",
//     label: "USA",
//     children: [
//       {
//         value: "SABWE",
//         label: "SABWE MINING SARLSABWE MINING SARL",
//       },
//     ],
//   },
// ];

// export const IndustralProjectsNode = [
//   {
//     value: "Australia",
//     label: "Australia",
//     children: [
//       {
//         value: "SEK",
//         label: "Societe D'Exploitation De Kipoi",
//       },
//     ],
//   },
//   {
//     value: "Canada",
//     label: "Canada & China",
//     children: [
//       {
//         value: "KAMOA",
//         label: "Kamoa Copper SA",
//       },
//     ],
//   },
//   {
//     value: "China",
//     label: "China",
//     children: [
//       {
//         value: "ANVIL",
//         label: "Anvil Mining Congo SARL",
//       },
//       {
//         value: "CCR",
//         label: "Chengtun Congo Ressources SARL",
//       },
//       {
//         value: "CDM",
//         label: "Congo Dongfang International Mining",
//       },
//       {
//         value: "CJCMC",
//         label: "Congo Jinjun Cheng",
//       },
//       {
//         value: "CNMC CONGO",
//         label: "Societe Cnmc Congo Compagnie Minier",
//       },
//       {
//         value: "COMIKA",
//         label: "Compagnie Miniere De Kambove SPRL",
//       },
//       {
//         value: "COMILU",
//         label: "Compagnie Miniere De Luisha",
//       },
//       {
//         value: "COMMUS",
//         label: "La Compagnie Miniere De Musonoie Gl",
//       },
//       {
//         value: "DIVINE LAND",
//         label: "Divine Land Mining SARL",
//       },
//       {
//         value: "EVERBRIGHT",
//         label: "Everbright Mining SARL",
//       },
//       {
//         value: "EXCELLEN",
//         label: "Excelent Minerals SARL",
//       },
//       {
//         value: "HANRUI METAL",
//         label: "Hanuri Metal Congo",
//       },
//       {
//         value: "HUACHIN MABENDE",
//         label: "CNMC Huachin Mabende Mining SPRL",
//       },
//       {
//         value: "HUACHIN METAL",
//         label: "Huachin Metal Leach SPRL",
//       },
//       {
//         value: "JXCOM",
//         label: "Jin Xun Congo Mining SARL",
//       },
//       {
//         value: "KAI PENG",
//         label: "Societe Kai Peng Mining",
//       },
//       {
//         value: "KAMBOVE MINING",
//         label: "Kambove Mining SAS",
//       },
//       {
//         value: "KFM",
//         label: "Kisanfu Mining",
//       },
//       {
//         value: "KICC",
//         label: "Kinsenda Copper Company SARL",
//       },
//       {
//         value: "LAMIKAL",
//         label: "La Miniere De Kalunkundi",
//       },
//       {
//         value: "LCS",
//         label: "Lualaba Copper Smelter SAS",
//       },
//       {
//         value: "LR SAS",
//         label: "Luilu Ressources SAS",
//       },
//       {
//         value: "MM",
//         label: "Metal Mines SPRL",
//       },
//       {
//         value: "MIKAS",
//         label: "La Miniere De Kasombo",
//       },
//       {
//         value: "MJM",
//         label: "Macrolink Jiayuan Mining SPRL",
//       },
//       {
//         value: "MKM SAS",
//         label: "La Miniere De Kalunbwe Myunga",
//       },
//       {
//         value: "MMG",
//         label: "MMG Kinsevere SARL",
//       },
//       {
//         value: "NEW MINERALS",
//         label: "New Minerals",
//       },
//       {
//         value: "RUASHI MINING",
//         label: "Ruashi Mining SPRL",
//       },
//       {
//         value: "SHITURU MINING",
//         label: "Shituru Mining Corporation SPRL",
//       },
//       {
//         value: "SICOMINES",
//         label: "Sino Congolaise Des Mines SARL",
//       },
//       {
//         value: "SOMIDEZ",
//         label: "Societe Miniere De Deziwa SAS",
//       },
//       {
//         value: "TCC",
//         label: "Tengyuan Cobalt & Copper Resources",
//       },
//       {
//         value: "TFM",
//         label: "Tenke Fungurume Mining",
//       },
//       {
//         value: "THOMAS",
//         label: "Thomas Mining SARL",
//       },
//     ],
//   },
//   {
//     value: "DR Congo",
//     label: "DR Congo",
//     children: [
//       {
//         value: "GCM",
//         label: "GECAMINES",
//       },
//       {
//         value: "KALONGWE",
//         label: "Kalongwe Mining S.A",
//       },
//       {
//         value: "MMT",
//         label: "Mineral Metal Technology SARL",
//       },
//       {
//         value: "STL",
//         label: "Societe Pour Le Traitement Du Terril De Lubumbashi",
//       },
//     ],
//   },
//   {
//     value: "India",
//     label: "India",
//     children: [
//       {
//         value: "CHEMAF",
//         label: "Chemical Of Africa SPRL",
//       },
//       {
//         value: "GOLDEN AFRICAN",
//         label: "Golden Africa Resources SPRL",
//       },
//       {
//         value: "KIMIN",
//         label: "Kisanfu Mining SPRL",
//       },
//       {
//         value: "OMR",
//         label: "Om Metal Ressources SPRL",
//       },
//       {
//         value: "RUBAMIN",
//         label: "Rubamin SARL",
//       },
//       {
//         value: "SOMIKA",
//         label: "Societe Miniere Du Katanga",
//       },
//       {
//         value: "KATANGA STRATEGIC",
//         label: "Katanga Strategic Resources",
//       },
//     ],
//   },
//   {
//     value: "Kazakhstan",
//     label: "Kazakhstan",
//     children: [
//       {
//         value: "BOSS",
//         label: "Boss Mining SPRL",
//       },
//       {
//         value: "COMIDE",
//         label: "La Congolaise Des Mines Et De Devel",
//       },
//       {
//         value: "FRONTIER",
//         label: "Kalongwe Mining S.A",
//       },
//       {
//         value: "METALKOL",
//         label: "Compagnie De Traitement Des Rejets KingyamBo",
//       },
//     ],
//   },
//   {
//     value: "South Africa",
//     label: "South Africa",
//     children: [
//       {
//         value: "MPC",
//         label: "Mining Progress Company SARL",
//       },
//     ],
//   },
//   {
//     value: "Switzerland",
//     label: "Switzerland",
//     children: [
//       {
//         value: "KCC",
//         label: "Kamoto Copper Company SARL",
//       },
//       {
//         value: "MUTANDA",
//         label: "Mutanda Mining",
//       },
//     ],
//   },
//   {
//     value: "Unknown",
//     label: "Unknown",
//     children: [
//       {
//         value: "AMICAL",
//         label: "Amical Kakana Mining SPRL",
//       },
//       {
//         value: "CONGO MOON",
//         label: "Congo Moon Mining SARL",
//       },

//       {
//         value: "SOCIETE_KASONTA",
//         label: "SOCIETE MINIERE DE KASONTA",
//       },
//     ],
//   },
//   {
//     value: "USA",
//     label: "USA",
//     children: [
//       {
//         value: "SABWE",
//         label: "Sabwe Mining SARL",
//       },
//     ],
//   },
// ];

// export const CheckAllIndustralProjects = [
//   "SEK (Kipoi Mines)",
//   "KAMOA-KAKULA",
//   "ANVIL",
//   "CCR",
//   "CDM",
//   "CJCMC",
//   "CNMC CONGO",
//   "COMIKA",
//   "COMILU",
//   "COMMUS",
//   "DIVINE LAND",
//   "EVERBRIGHT",
//   "EXCELLEN",
//   "HANRUI METAL",
//   "HUACHIN MABENDE",
//   "HUACHIN METAL",
//   "JXCOM",
//   "KAI PENG",
//   "KAMBOVE MINING",
//   "KFM",
//   "KICC",
//   "LAMIKAL",
//   "LCS",
//   "LR SAS",
//   "MM",
//   "MIKAS",
//   "MJM",
//   "MKM SAS",
//   "MMG",
//   "NEW MINERALS",
//   "RUASHI MINING",
//   "SHITURU MINING",
//   "SICOMINES",
//   "SOMIDEZ",
//   "TCC",
//   "TFM",
//   "THOMAS",
//   "GECAMINES",
//   "KALONGWE",
//   "MMT",
//   "STL",
//   "CHEMAF",
//   "GOLDEN AFRICAN",
//   "KIMIN",
//   "OMR",
//   "RUBAMIN",
//   "SOMIKA",
//   "KATANGA STRATEGIC",
//   "BOSS MINING",
//   "COMIDE",
//   "FRONTIER",
//   "METALKOL",
//   "MPC",
//   "KCC",
//   "MUTANDA",
//   "AMICAL KAKANA",
//   "CONGO MOON",
//   "SABWE",
// ];
