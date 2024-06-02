"use client";
import React from "react";
import Link from "next/link";

import { Package2, Languages } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import useNavStore from "@/store/navstore";
import { AnimatePresence, motion } from "framer-motion";
import { NAVLIST } from "@/constants/application";

export default function Nav() {
  const isNavOpen = useNavStore((state) => state.isNavOpen);

  return (
    <AnimatePresence>
      <motion.div
        className="h-screen w-16  inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:sticky sm:flex"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={getAnimationVariants()}
        transition={{
          type: isNavOpen ? "tween" : "spring",
          duration: 0.3,
        }}
      >
        <div
          className={`flex flex-col gap-6 px-4 sm:py-2 ${
            isNavOpen ? "items-start" : ""
          }`}
        >
          <div
            className={`flex w-full items-center h-14 ${
              isNavOpen ? "justify-between" : "justify-center"
            }`}
          >
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 
            rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
          </div>

          {NAVLIST.map((item) => (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.path}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    {<item.icon />}
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div
          className={`mt-auto flex flex-col gap-4 px-4 sm:py-4 ${
            isNavOpen ? "items-start" : "items-center"
          }`}
        ></div>
      </motion.div>
    </AnimatePresence>
  );
}

const getAnimationVariants = () => {
  return {
    initial: { x: "-100%" }, // Start off-screen to the left
    animate: { x: 0 }, // Move to the on-screen position
    exit: { x: "-100%" }, // Move back off-screen to the left
  };
};
