import { LineChart, Map, Pickaxe, Ship } from "lucide-react";
import { NavItem } from "../types/index.d";

export const NAVLIST: NavItem[] = [
  {
    name: "Map",
    path: "/",
    icon: Map,
  },
  {
    name: "Overview",
    path: "/production-overview",
    icon: LineChart,
  },
  {
    name: "Project",
    path: "/projects?project_id=shituru",
    icon: Pickaxe,
  },
  {
    name: "Exports",
    path: "/export-flow",
    icon: Ship,
  },
];
