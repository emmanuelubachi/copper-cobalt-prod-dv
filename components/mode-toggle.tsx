"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { Toggle } from "@/components/ui/toggle";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const defaultTheme = "system";
  const currentTheme = theme || defaultTheme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <SunIcon
            className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
          />
          <MoonIcon
            className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={currentTheme === "light" ? "font-bold" : undefined}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={currentTheme === "dark" ? "font-bold" : undefined}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme(defaultTheme)}
          className={currentTheme === defaultTheme ? "font-bold" : undefined}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// export default function ModeToggle() {
//   const { theme, setTheme, systemTheme } = useTheme();
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const isDark =
//     theme === "dark" || (theme === "system" && systemTheme === "dark");

//   const toggleTheme = () => {
//     if (theme === "light" || (theme === "system" && systemTheme === "light")) {
//       setTheme("dark");
//     } else {
//       setTheme("light");
//     }
//   };

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <Toggle
//       size="sm"
//       className="__muted h-9"
//       variant={"__btn_outline"}
//       aria-label="Toggle theme"
//       onPressedChange={toggleTheme}
//     >
//       {isDark ? (
//         <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//       ) : (
//         <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//       )}
//     </Toggle>
//   );
// }
