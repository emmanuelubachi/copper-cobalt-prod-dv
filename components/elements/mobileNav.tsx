"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { NAVLIST } from "@/constants/application";

const MobileNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="fixed z-40 border-t bottom-0 w-full bg-background shadow-md sm:hidden">
      <ul className="flex justify-around p-2">
        {NAVLIST.map((item) => (
          <li
            key={item.name}
            className={`flex flex-col min-w-[72px] items-center justify-center gap-0.5 cursor-pointer p-2 rounded-md ${
              pathname === item.path
                ? "text-foreground bg-muted"
                : "text-muted-foreground"
            }`}
            onClick={() => router.push(item.path)}
          >
            <span className="text-2xl">
              {<item.icon className="h-4 w-4" />}
            </span>
            {pathname === item.path && (
              <span className="text-[0.7rem]">{item.name}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNav;
