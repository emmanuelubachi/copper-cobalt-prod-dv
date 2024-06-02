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
    <nav className="h-screen w-16 inset-y-0 left-0 z-10 hidden bg-background flex-col border-r sm:sticky sm:flex">
      <div className={`flex flex-col item-center gap-6 px-4 sm:py-2`}>
        <div className={`flex w-full items-center h-14 justify-center`}>
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 
            rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
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
                  className={`flex p-2 h-9 w-9 items-center justify-center rounded-lg 
                     transition-colors hover:text-foreground 
                    md:h-8 md:w-8 md:text-sm ${
                      pathname === item.path
                        ? "text-foreground bg-muted"
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
