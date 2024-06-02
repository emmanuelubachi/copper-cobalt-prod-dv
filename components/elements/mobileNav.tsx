"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { NAVLIST } from "@/constants/application";

const MobileNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="fixed z-40 border-t bottom-0 w-full bg-background shadow-md sm:hidden">
      <ul className="flex justify-around p-4">
        {NAVLIST.map((item) => (
          <li
            key={item.name}
            className={`flex flex-col min-w-16 items-center justify-center gap-0.5 cursor-pointer p-2 rounded-md ${
              pathname === item.path
                ? "text-neutral-900 dark:text-neutral-100 bg-neutral-200/70 dark:bg-muted/90"
                : "text-neutral-400 dark:text-neutral-700"
            }`}
            onClick={() => router.push(item.path)}
          >
            <span className="text-2xl">{<item.icon />}</span>
            {pathname === item.path && (
              <span className="text-xs">{item.name}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNav;
