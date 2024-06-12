"use client";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import useFilterStore from "@/store/filterstore";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GridList from "../sections/gridList";

export default function FilterButton({
  content,
}: {
  content: React.ReactNode;
}) {
  const { toggleFilter, setFilterContent } = useFilterStore();
  const handleClick = () => {
    setFilterContent(content);
    toggleFilter();
  };

  // const handleDrawer = useCallback(
  //   (content: React.ReactNode) => {
  //     return () => {
  //       setDrawerContent(content)
  //       toggleDrawer()
  //     }
  //   },
  //   [setDrawerContent, toggleDrawer]
  // )

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="__muted gap-2 px-2"
            onClick={handleClick}
          >
            <Filter className="h-5 w-5" />
            <span className="sr-only">Filter</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Filter</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
