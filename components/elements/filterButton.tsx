"use client";

import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import useFilterStore from "@/store/filterstore";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FilterButton() {
  const { toggleFilter } = useFilterStore();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="__muted gap-2 px-2"
            onClick={toggleFilter}
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
