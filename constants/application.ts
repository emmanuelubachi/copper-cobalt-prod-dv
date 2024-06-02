import { Home, LineChart, Package, Package2, Users2 } from "lucide-react";

export const NAVLIST: NavItem[] = [
  {
    name: "Projects Map",
    path: "/",
    icon: Home,
  },
  {
    name: "Production",
    path: "/dashboard-01",
    icon: LineChart,
  },
  {
    name: "Project",
    path: "/dashboard-05",
    icon: Package,
  },
  {
    name: "Exports",
    path: "/dashboard-06",
    icon: Package2,
  },
  {
    name: "Companies",
    path: "#",
    icon: Users2,
  },
];
