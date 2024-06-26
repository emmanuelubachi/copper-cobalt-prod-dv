"use client";
import { useEffect, useState } from "react";
import useMapDetailsStore from "@/store/mapDetailsStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import useDeviceType from "@/hooks/useDeviceType";

const MapDetailsDrawer = () => {
  const { isMapDetailsOpen, closeMapDetails, mapDetailsDrawerContent } =
    useMapDetailsStore();
  const { isMobile, isTablet } = useDeviceType();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOverlayClick = () => {
    if (isMapDetailsOpen) {
      closeMapDetails();
    }
  };

  return (
    <AnimatePresence>
      {isMapDetailsOpen && mounted && (
        <>
          {isMobile && (
            <div
              className="fixed inset-0 z-[45] bg-black opacity-50"
              onClick={handleOverlayClick}
            />
          )}

          <motion.div
            className="fixed right-0 top-0 z-50 h-screen w-80 bg-neutral-50 p-5 shadow-lg dark:bg-neutral-900 lg:w-[40rem]"
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
                <div className="flex h-full w-full flex-col gap-4">
                  <Button
                    variant="ghost"
                    className="mr-auto p-2"
                    onClick={closeMapDetails}
                  >
                    <X className="h-5 w-5" />
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
};

export default MapDetailsDrawer;

const getAnimationVariants = () => {
  return {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  };
};
