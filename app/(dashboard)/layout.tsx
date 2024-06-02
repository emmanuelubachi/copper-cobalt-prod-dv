import React from "react";

import Nav from "@/components/elements/nav";
import Header from "@/components/elements/header";
import Drawer from "@/components/elements/drawer";
import MobileNav from "@/components/elements/mobileNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        <aside className="flex flex-row">
          <Nav />
          <Drawer />
          <MobileNav />
        </aside>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="relative">
            <Header />
          </div>
          <div className="flex flex-col">{children}</div>
        </div>
      </div>
    </>
  );
}
