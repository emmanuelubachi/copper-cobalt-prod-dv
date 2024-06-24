"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { PanelLeft, Languages } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
  const { theme, systemTheme } = useTheme();

  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

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
                <Link href="/">
                  {isDark ? (
                    <Image
                      src="/logos/CGSP_dark.png"
                      alt="logo"
                      width={240}
                      height={52}
                    />
                  ) : (
                    <Image
                      src="/logos/CGSP_light.png"
                      alt="logo"
                      width={240}
                      height={52}
                    />
                  )}

                  <span className="sr-only">China Global South Project</span>
                </Link>

                {NAVLIST.map((item) => (
                  <Link key={item.name} href={item.link}>
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
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export function TranslationToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="__muted">
          <Languages className="h-5 w-5" strokeWidth={1.5} />
          <span className="sr-only">Translation</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuLabel>Translations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>English</DropdownMenuItem>
        <DropdownMenuItem>French</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
