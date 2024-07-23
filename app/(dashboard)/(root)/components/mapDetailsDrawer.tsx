// not used any more
"use client";
import { useEffect, useState } from "react";
import useMapDetailsStore from "@/store/mapDetailsStore";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import useDeviceType from "@/hooks/useDeviceType";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MapDetailsDrawer() {
  const {
    isMapDetailsOpen,
    setSelectedSite,
    closeMapDetails,
    mapDetailsDrawerContent,
  } = useMapDetailsStore();
  const { isMobile } = useDeviceType();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div
          className={`fixed bottom-0 z-40 h-2/4 w-screen rounded-t-2xl bg-neutral-50 shadow-lg dark:bg-neutral-900 sm:right-0 sm:top-0 sm:h-screen sm:w-[25rem] sm:rounded-none xl:w-[30rem] ${
            isMobile ? "slide-up" : "slide-right"
          } ${isMapDetailsOpen ? "open" : ""}`}
        >
          <div className="flex h-full w-full">
            {isMapDetailsOpen && (
              <div className="mt-10 flex h-full w-full flex-col gap-4 sm:mt-0">
                <Button
                  variant="secondary"
                  className={`group absolute z-[60] m-0 p-0 ${
                    isMobile
                      ? "left-1/2 top-2 h-6 w-16 -translate-x-1/2 transform"
                      : "__button_pressed left-0 top-1/2 -m-[25px] h-16 w-6 -translate-y-1/2 transform rounded-none rounded-l-md bg-background/70 shadow-md" // -m-[calc(24px/2)]
                  }`}
                  onClick={() => {
                    closeMapDetails();
                    setSelectedSite(null);
                  }}
                >
                  {isMobile ? (
                    <ChevronDown className="hidden h-6 w-6 text-foreground/60" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-foreground/60 group-hover:animate-[pulse_2s_infinite]" />
                  )}
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
