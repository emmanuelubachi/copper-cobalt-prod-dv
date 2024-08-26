"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitCompareArrows, ShipIcon } from "lucide-react";

const navlist = [
  {
    name: "Export Overview",
    href: "/projects?project_id=ccr",
    path: "/projects",
    icon: ShipIcon,
  },
  {
    name: "Export Flows",
    href: "/projects/export-flow",
    path: "/projects/export-flow",
    icon: GitCompareArrows,
  },
];

export default function ProjectNavigation() {
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center justify-center bg-transparent text-muted-foreground">
      {navlist.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`inline-flex h-16 items-center justify-center whitespace-nowrap px-4 text-sm font-medium text-foreground outline-none ring-offset-background transition-all hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:dark:bg-neutral-800/15 sm:px-8 md:text-p ${pathname === item.path && "border-t-4 border-t-primary bg-background font-semibold text-primary dark:bg-neutral-900 dark:text-primary"}`}
        >
          <div className="flex items-center gap-2 text-xs">
            <item.icon className="h-4 w-4" />
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
