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
    <header className="absolute z-30 w-full items-center gap-4 px-4 py-4 sm:gap-4 sm:px-6">
      <div className="flex w-full flex-row justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="__muted hidden sm:flex"
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
                      className={`flex w-full items-center gap-4 rounded-lg p-2 px-2.5 hover:text-foreground ${
                        pathname === item.path
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      } `}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="__muted">
                <Languages className="h-5 w-5" strokeWidth={1.5} />
                <span className="sr-only">Translation</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Translations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>French</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
