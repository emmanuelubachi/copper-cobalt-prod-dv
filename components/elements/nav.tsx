"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Package2, Languages } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { NAVLIST } from "@/constants/application";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="inset-y-0 left-0 z-10 hidden h-screen w-16 flex-col border-r bg-background sm:sticky sm:flex">
      <div className={`item-center flex flex-col gap-6 px-4 sm:py-2`}>
        <div className={`flex h-14 w-full items-center justify-center`}>
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
        </div>

        {NAVLIST.map((item) => (
          <TooltipProvider key={item.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.path}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg p-2 transition-colors hover:text-foreground md:h-8 md:w-8 md:text-sm ${
                    pathname === item.path
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {<item.icon />}
                  <span className="sr-only">{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </nav>
  );
}
