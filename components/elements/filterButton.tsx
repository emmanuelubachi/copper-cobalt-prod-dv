"use client";
import { useCallback, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import useFilterStore from "@/store/filterStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FilterButtonProps = {
  content: ReactNode;
  label: string;
  type: "tooltip" | "button";
  tooltip?: string;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  content,
  label,
  type,
  tooltip,
}) => {
  const { toggleFilter, setFilterContent } = useFilterStore();

  const handleClick = useCallback(() => {
    setFilterContent(content);
    toggleFilter();
  }, [content, setFilterContent, toggleFilter]);

  if (type === "tooltip") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="__muted __button_pressed gap-2 rounded-2xl px-4"
              onClick={handleClick}
            >
              <span className="text-pxs sm:text-sm">{label}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant="outline"
      className="__muted __button_pressed gap-2 rounded-2xl px-4"
      onClick={handleClick}
    >
      <span className="text-pxs sm:text-sm">{label}</span>
    </Button>
  );
};

export default FilterButton;
