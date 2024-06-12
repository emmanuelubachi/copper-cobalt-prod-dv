"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { NAVLIST } from "@/constants/application";

const MobileNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 z-40 w-full border-t bg-background shadow-md sm:hidden">
      <ul className="flex justify-around p-2">
        {NAVLIST.map((item) => (
          <li
            key={item.name}
            className={`flex min-w-[72px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-md p-2 ${
              pathname === item.path
                ? "bg-muted text-foreground"
                : "text-muted-foreground"
            }`}
            onClick={() => router.push(item.link)}
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
