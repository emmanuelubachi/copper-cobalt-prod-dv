import React from "react";

import Nav from "@/components/elements/nav";
import Header from "@/components/elements/header";
import Drawer from "@/components/elements/drawer";
import MobileNav from "@/components/elements/mobileNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex bg-muted/40">
        <aside>
          <Nav />
          <Drawer />
        </aside>
        <MobileNav />
        <div className="flex min-h-screen w-screen flex-col ">
          <div className="relative">
            <Header />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
