"use client";
import React, { ReactNode, useEffect } from "react";
import useFilterStore from "@/store/filterstore";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Button } from "../ui/button";
import { FilterX } from "lucide-react";

const Drawer = () => {
  const { isFilterOpen, closeFilter } = useFilterStore();

  return (
    <AnimatePresence>
      {isFilterOpen && (
        <>
          <motion.div
            className="fixed top-0 z-50 left-0 p-5 h-screen w-96 bg-neutral-50 dark:bg-neutral-900 shadow-lg 
            overflow-y-auto lg:w-96"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={getAnimationVariants()}
            transition={{
              type: isFilterOpen ? "tween" : "spring",
              duration: 0.3,
            }}
          >
            <div className="w-full h-full flex">
              {isFilterOpen && (
                <Button
                  variant="outline"
                  className="gap-2 mb-auto"
                  onClick={closeFilter}
                >
                  <FilterX className="h-5 w-5" />
                  <span className="">Close</span>
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;

const getAnimationVariants = () => {
  return {
    initial: { x: "-100%" }, // Start off-screen to the left
    animate: { x: 0 }, // Move to the on-screen position
    exit: { x: "-100%" }, // Move back off-screen to the left
  };
};
