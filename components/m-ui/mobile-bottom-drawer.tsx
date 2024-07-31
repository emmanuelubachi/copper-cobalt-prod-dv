"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import useMapDetailsStore from "@/store/mapDetailsStore";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MobileBottomDrawer() {
  const {
    closeMapDetails,
    setSelectedSite,
    isMapDetailsOpen,
    mapDetailsDrawerContent,
  } = useMapDetailsStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const y = useMotionValue(0);
  const height = useTransform(
    y,
    [0, -window.innerHeight * 0.4],
    ["30vh", "50vh"],
  );

  useEffect(() => {
    if (isMapDetailsOpen) {
      y.set(0);
    }
  }, [isMapDetailsOpen, y]);

  const handleDragEnd = (
    _: any,
    info: { offset: { y: number }; velocity: { y: number } },
  ) => {
    const offsetY = info.offset.y;
    const velocityY = info.velocity.y;

    if (offsetY < -window.innerHeight * 0.2 || velocityY < -100) {
      y.set(-window.innerHeight * 0.4);
      setIsExpanded(true);
    } else if (offsetY > window.innerHeight * 0.2 || velocityY > 100) {
      if (isExpanded) {
        y.set(0);
        setIsExpanded(false);
      } else {
        closeMapDetails();
        setSelectedSite(null);
      }
    } else {
      y.set(isExpanded ? -window.innerHeight * 0.4 : 0);
    }
  };

  return (
    <AnimatePresence>
      {isMapDetailsOpen && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[32]"
          style={{ height }}
          drag="y"
          dragConstraints={{ top: -window.innerHeight * 0.4, bottom: 0 }}
          onDragEnd={handleDragEnd}
          initial={{ y: window.innerHeight }}
          animate={{ y: isExpanded ? -window.innerHeight * 0.4 : 0 }}
          exit={{ y: window.innerHeight }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex h-screen w-full flex-col rounded-t-lg bg-neutral-50 shadow-lg dark:bg-neutral-900">
            <div className="flex justify-center p-3">
              <div className="h-1 w-24 rounded-full bg-gray-300/70">
                <span className="sr-only">
                  Drag up to expand details, drag down to close.
                </span>
              </div>
            </div>
            <ScrollArea className="h-full pb-32">
              {mapDetailsDrawerContent}
            </ScrollArea>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
