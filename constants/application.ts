import { LineChart, Map, Pickaxe, Ship } from "lucide-react";
import { NavItem } from "@/types";

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
  {
    name: "Exports",
    path: "/export-flow",
    link: "/export-flow",
    icon: Ship,
  },
];
