"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Package2,
  PanelLeft,
  Search,
  Filter,
  Languages,
  icons,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFilterStore from "@/store/filterstore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { NAVLIST } from "@/constants/application";
import ModeToggle from "../mode-toggle";

export default function Header() {
  const pathname = usePathname();
  const { toggleFilter } = useFilterStore();

  return (
    <header className=" w-full z-30 absolute items-center gap-4 px-4 sm:px-6 sm:gap-4 py-4">
      <div className="flex flex-row w-full gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="hidden sm:flex __muted"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-4 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>

                {NAVLIST.map((item) => (
                  <Link key={item.name} href={item.path}>
                    <SheetClose
                      className={`flex items-center w-full rounded-lg p-2 gap-4 px-2.5 hover:text-foreground
                    ${
                      pathname === item.path
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground"
                    }
                    `}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </SheetClose>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Button
            variant="outline"
            className="__muted gap-2"
            onClick={toggleFilter}
          >
            <Filter className="h-5 w-5" />
            <span className="">Filter</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[320px] __muted"
            />
          </div>

          {/* <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" variant="outline" className="__muted">
                <Languages className="h-5 w-5" />
                <span className="sr-only">Translation</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Translations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>French</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
