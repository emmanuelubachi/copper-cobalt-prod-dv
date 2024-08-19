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
import { cn } from "@/lib/utils";

type FilterButtonProps = {
  content: ReactNode;
  label: string;
  type: "tooltip" | "button";
  tooltip?: string;
  className?: string;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  content,
  label,
  type,
  tooltip,
  className,
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
              className={cn(
                className,
                "__muted __button_pressed gap-2 rounded-lg px-4",
              )}
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
      className="__muted __button_pressed gap-2 rounded-lg px-4"
      onClick={handleClick}
    >
      <span className="text-pxs sm:text-sm">{label}</span>
    </Button>
  );
};

export default FilterButton;
