import React from "react";

import SideNav from "@/components/elements/sideNav";
import BigSideNav from "@/components/elements/bigSideNav";
import FilterDrawer from "@/components/elements/filterDrawer";
import MobileNav from "@/components/elements/mobileNav";
import CombinedDrawer from "@/components/m-ui/combined-drawer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex bg-background dark:bg-neutral-900 sm:flex-row">
        <aside>
          <SideNav />
          <FilterDrawer />
        </aside>

        <div className="flex min-h-screen w-screen flex-col">
          <div className="fixed z-10">
            <BigSideNav />
          </div>

          <div className="">{children}</div>

          <MobileNav />
        </div>
      </div>
      <CombinedDrawer />
    </>
  );
}
