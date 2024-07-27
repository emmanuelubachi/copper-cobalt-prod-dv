"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import useMapDetailsStore from "@/store/mapDetailsStore";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LargeScreenDrawer() {
  const {
    isMapDetailsOpen,
    setSelectedSite,
    closeMapDetails,
    mapDetailsDrawerContent,
  } = useMapDetailsStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div
          className={`slide-right fixed bottom-0 z-40 h-2/4 w-screen rounded-t-2xl bg-neutral-50 shadow-lg dark:bg-neutral-900 sm:right-0 sm:top-0 sm:h-screen sm:w-[25rem] sm:rounded-none xl:w-[30rem] ${isMapDetailsOpen ? "open" : ""}`}
        >
          <div className="flex h-full w-full">
            {isMapDetailsOpen && (
              <div className="flex h-full w-full flex-col gap-4">
                <Button
                  variant="secondary"
                  className="__button_pressed group absolute left-0 top-1/2 z-[60] -m-[25px] h-16 w-6 -translate-y-1/2 transform rounded-none rounded-l-md bg-background/70 p-0 shadow-md"
                  onClick={() => {
                    closeMapDetails();
                    setSelectedSite(null); // Reset selected site (Map Marker active state)
                  }}
                >
                  <ChevronRight className="h-6 w-6 text-foreground/60 group-hover:animate-[pulse_2s_infinite]" />
                  <span className="sr-only">Close</span>
                </Button>
                <ScrollArea className="h-full">
                  {mapDetailsDrawerContent}
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
