"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useFilterStore from "@/store/filterStore";
import useMapDetailsStore from "@/store/mapDetailsStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NAVLIST } from "@/constants/application";
import { CGSPRedSvgIcon } from "../svg/cdsp_logo";
import ModeToggle from "../mode-toggle";

export default function SideNav() {
  const pathname = usePathname();
  const { closeFilter } = useFilterStore();
  const { closeMapDetails } = useMapDetailsStore();

  return (
    <nav className="inset-y-0 left-0 z-50 hidden h-screen w-16 flex-col bg-background shadow-xl shadow-primary/10 dark:shadow-md sm:sticky sm:flex">
      <div className="flex h-full w-full flex-col justify-between">
        <div className={`item-center flex flex-col gap-6 px-4 sm:py-2`}>
          <div className={`flex h-14 w-full items-center justify-center`}>
            <Link href="/">
              <CGSPRedSvgIcon className="h-8 w-8" />
              <span className="sr-only">China Global South Project</span>
            </Link>
          </div>

          {NAVLIST.map((item) => (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.link}
                    onClick={() => {
                      closeFilter(), closeMapDetails();
                    }}
                    className={`__button_pressed flex h-9 w-9 items-center justify-center rounded-md p-2 transition-colors md:text-sm ${
                      pathname === item.path
                        ? "bg-primary/10 text-primary shadow-lg hover:text-primary dark:bg-muted dark:shadow-primary/10"
                        : "text-muted-foreground hover:text-primary/70 dark:hover:text-foreground"
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
        <div className="flex w-full items-center justify-center sm:py-4">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
