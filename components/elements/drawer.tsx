"use client";
import useFilterStore from "@/store/filterstore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { FilterX, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Drawer = () => {
  const { isFilterOpen, closeFilter } = useFilterStore();

  return (
    <AnimatePresence>
      {isFilterOpen && (
        <>
          <motion.div
            className="fixed left-0 top-0 z-50 h-screen w-96 overflow-y-auto bg-neutral-50 p-5 shadow-lg dark:bg-neutral-900 lg:w-96"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={getAnimationVariants()}
            transition={{
              type: isFilterOpen ? "tween" : "spring",
              duration: 0.3,
            }}
          >
            <div className="flex h-full w-full">
              {isFilterOpen && (
                <div className="flex h-full w-full flex-col gap-4">
                  <Button
                    variant="ghost"
                    className="ml-auto p-2"
                    onClick={closeFilter}
                  >
                    <FilterX className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                  <div className="relative mr-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="__muted w-full rounded-lg bg-background pl-8 md:w-[320px]"
                    />
                  </div>
                </div>
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
