"use client";
import useFilterStore from "@/store/filterStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import useDeviceType from "@/hooks/useDeviceType";
import { Cross2Icon } from "@radix-ui/react-icons";

const FilterDrawer = () => {
  const { isFilterOpen, closeFilter, filterDrawerContent } = useFilterStore();
  const { isMobile } = useDeviceType();

  const handleOverlayClick = () => {
    if (isFilterOpen) {
      closeFilter();
    }
  };

  return (
    <AnimatePresence>
      {isFilterOpen && (
        <>
          {isMobile && (
            <div
              className="fixed inset-0 z-[45] bg-black opacity-50"
              onClick={handleOverlayClick}
            />
          )}

          <motion.div
            className="fixed left-0 top-0 z-30 h-screen overflow-hidden bg-background p-8 shadow-lg dark:bg-background sm:left-16"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={getAnimationVariants()}
            transition={{
              type: isFilterOpen ? "tween" : "spring",
              duration: 0.3,
            }}
          >
            <div className="h-full w-fit">
              {isFilterOpen && (
                <div className="flex h-full w-fit flex-col gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-3 h-4 w-4 rounded-full p-0 opacity-70 ring-offset-background transition-opacity hover:bg-transparent hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
                    onClick={closeFilter}
                  >
                    <Cross2Icon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                  {/* <div className="overflow-y-auto">{filterDrawerContent}</div> */}
                  <>{filterDrawerContent}</>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterDrawer;

const getAnimationVariants = () => {
  return {
    initial: { x: "-100%" }, // Start off-screen to the left
    animate: { x: 0 }, // Move to the on-screen position
    exit: { x: "-100%" }, // Move back off-screen to the left
  };
};
