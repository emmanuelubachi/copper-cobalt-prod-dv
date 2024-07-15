"use client";
import { useEffect, useState } from "react";
import useMapDetailsStore from "@/store/mapDetailsStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import useDeviceType from "@/hooks/useDeviceType";
import { ScrollArea } from "../../../../components/ui/scroll-area";

export default function MapDetailsDrawer() {
  const { isMapDetailsOpen, closeMapDetails, mapDetailsDrawerContent } =
    useMapDetailsStore();
  const { isMobile } = useDeviceType();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // const handleOverlayClick = () => {
  //   if (isMapDetailsOpen) {
  //     closeMapDetails();
  //   }
  // };

  return (
    <AnimatePresence>
      {isMapDetailsOpen && mounted && (
        <>
          {/* {isMobile && (
            <div
              className="fixed inset-0 z-[45] bg-black opacity-50"
              onClick={handleOverlayClick}
            />
          )} */}

          <motion.div
            className="fixed bottom-0 z-50 h-2/4 w-screen rounded-t-2xl bg-neutral-50 shadow-lg dark:bg-neutral-900 sm:right-0 sm:top-0 sm:h-screen sm:w-[25rem] sm:rounded-none xl:w-[30rem]"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={getAnimationVariants()}
            transition={{
              type: isMapDetailsOpen ? "tween" : "spring",
              duration: 0.3,
            }}
          >
            <div className="flex h-full w-full">
              {isMapDetailsOpen && (
                <div className="mt-10 flex h-full w-full flex-col gap-4 sm:mt-0">
                  <Button
                    variant="secondary"
                    className={`group absolute z-[60] m-0 p-0 ${isMobile ? "left-1/2 top-2 h-6 w-16 -translate-x-1/2 transform" : "left-0 top-1/2 -m-[calc(24px/2)] h-16 -translate-y-1/2 transform"}`}
                    onClick={closeMapDetails}
                  >
                    {isMobile ? (
                      <ChevronDown className="h-6 w-6 text-foreground/60" />
                    ) : (
                      <ChevronRight className="h-6 w-6 text-foreground/60 group-hover:animate-[pulse_2s_infinite]" />
                    )}
                    <span className="sr-only">Close</span>
                  </Button>
                  <ScrollArea className="h-full">
                    {mapDetailsDrawerContent}
                  </ScrollArea>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const getAnimationVariants = () => {
  // Check if the device width is less than or equal to 640px (mobile)
  if (window.innerWidth <= 639) {
    return {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
    };
  } else {
    // For larger screens, animate horizontally
    return {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
    };
  }
};
