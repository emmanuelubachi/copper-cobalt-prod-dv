import React from "react";

import SideNav from "@/components/elements/sideNav";
import BigSideNav from "@/components/elements/bigSideNav";
import FilterDrawer from "@/components/elements/filterDrawer";
import MobileNav from "@/components/elements/mobileNav";
import CombinedDrawer from "@/components/m-ui/combined-drawer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex bg-foreground/5 dark:bg-muted/40 sm:flex-row">
        <aside>
          <SideNav />
          <FilterDrawer />
        </aside>

        <div className="flex min-h-screen w-screen flex-col">
          <div className="relative">
            <BigSideNav />
          </div>

          {children}

          <MobileNav />
        </div>
      </div>
      <CombinedDrawer />
    </>
  );
}
