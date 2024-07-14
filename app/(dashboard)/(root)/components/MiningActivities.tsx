import React from "react";
import { Button } from "@/components/ui/button";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import ProjectTree from "./ProjectTree";
import CheckBoxTreeWithFilter from "@/components/m-ui/checkbox-tree";

const fileSystem = [
  {
    value: "/app",
    label: "app",
    children: [
      {
        value: "/app/Http",
        label: "Http",
        children: [
          {
            value: "/app/Http/Controllers",
            label: "Controllers",
            children: [
              {
                value: "/app/Http/Controllers/WelcomeController.js",
                label: "WelcomeController.js",
              },
            ],
          },
          {
            value: "/app/Http/routes.js",
            label: "routes.js",
          },
        ],
      },
      {
        value: "/app/Providers",
        label: "Providers",
        children: [
          {
            value: "/app/Providers/EventServiceProvider.js",
            label: "EventServiceProvider.js",
          },
        ],
      },
    ],
  },
  {
    value: "/config",
    label: "config",
    children: [
      {
        value: "/config/app.js",
        label: "app.js",
      },
      {
        value: "/config/database.js",
        label: "database.js",
      },
    ],
  },
  {
    value: "/public",
    label: "public",
    children: [
      {
        value: "/public/assets/",
        label: "assets",
        children: [
          {
            value: "/public/assets/style.css",
            label: "style.css",
          },
        ],
      },
      {
        value: "/public/index.html",
        label: "index.html",
      },
    ],
  },
  {
    value: "/.env",
    label: ".env",
  },
  {
    value: "/.gitignore",
    label: ".gitignore",
  },
  {
    value: "/README.md",
    label: "README.md",
  },
];

const industralProjectsNode = [
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
    value: "China and Canada",
    label: "China and Canada",
    children: [
      {
        value: "KAMOA",
        label: "KAMOA COPPER SA",
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

const checked = ["Australia"];

const expanded = [""];

export function ArtisanalSites() {
  const {
    showActiveSiteMarkers,
    showInactiveSiteMarkers,
    toggleActiveSiteMarkers,
    toggleInactiveSiteMarkers,
  } = useMarkerVisibilityStore();
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-p font-semibold">Artisanal Mining Sites</h6>
      <div className="flex gap-3">
        <Button
          onClick={toggleActiveSiteMarkers}
          className={`__button_pressed w-full rounded-full px-4 py-2 ${
            showActiveSiteMarkers
              ? "bg-cyan-500/80 hover:bg-cyan-500/90 dark:bg-cyan-600 dark:hover:bg-cyan-600/90"
              : "bg-accent text-cyan-500 ring-2 ring-cyan-500 hover:bg-accent hover:ring-cyan-500/90"
          }`}
        >
          Active Sites
        </Button>
        <Button
          onClick={toggleInactiveSiteMarkers}
          className={`__button_pressed w-full rounded-full px-4 py-2 ${
            showInactiveSiteMarkers
              ? "bg-neutral-500/80 hover:bg-neutral-500/90 dark:bg-neutral-400 dark:hover:bg-neutral-400/90"
              : "bg-accent text-foreground ring-2 ring-neutral-500 hover:bg-accent hover:ring-neutral-500/90"
          }`}
        >
          Inactive Sites
        </Button>
      </div>
    </div>
  );
}

export function IndustralProjects() {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-p font-semibold">Industral Projects</h6>

      <CheckBoxTreeWithFilter
        nodes={industralProjectsNode}
        checkedNodes={checked}
        expandedNodes={expanded}
      />
      {/* <ProjectTree /> */}
    </div>
  );
}
