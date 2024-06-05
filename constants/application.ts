import { LineChart, Map, Pickaxe, Ship } from "lucide-react";

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
    path: "/projects",
    icon: Pickaxe,
  },
  {
    name: "Exports",
    path: "/dashboard-06",
    icon: Ship,
  },
];
