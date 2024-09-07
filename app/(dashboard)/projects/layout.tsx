import React from "react";
import { ShareButton } from "@/components/elements/shareButton";
import ProjectNavigation from "./components/navigation";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <header
        className={cn(
          "left-0 right-0 z-20 flex h-16 items-center justify-between gap-6 space-y-0",
          "bg-muted/90 pr-4 backdrop-blur-sm dark:bg-background/70 sm:pr-8 md:shadow-sm",
        )}
      >
        <ProjectNavigation />

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <ShareButton />
        </div>
      </header>

      <section className="mb-24 min-h-screen w-full items-start space-y-4 px-4 sm:mb-0 sm:px-8 sm:pb-8">
        {children}
      </section>
    </main>
  );
}
