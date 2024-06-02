import { LineChart, Map, Pickaxe, Ship } from "lucide-react";

export const NAVLIST: NavItem[] = [
  {
    name: "Map",
    path: "/",
    icon: Map,
  },
  {
    name: "Overview",
    path: "/dashboard-01",
    icon: LineChart,
  },
  {
    name: "Project",
    path: "/dashboard-05",
    icon: Pickaxe,
  },
  {
    name: "Exports",
    path: "/dashboard-06",
    icon: Ship,
  },
];
