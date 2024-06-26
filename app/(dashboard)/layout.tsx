import React from "react";

import Nav from "@/components/elements/nav";
import Header from "@/components/elements/header";
import FilterDrawer from "@/components/elements/filterDrawer";
import MobileNav from "@/components/elements/mobileNav";
import MapDetailsDrawer from "@/components/elements/mapDetailsDrawer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex bg-muted/40 sm:flex-row">
        <aside>
          <Nav />
          <FilterDrawer />
        </aside>

        <div className="flex min-h-screen w-screen flex-col">
          <div className="relative">
            <Header />
          </div>

          {children}
          <MobileNav />
        </div>
      </div>
      <MapDetailsDrawer />
    </>
  );
}
