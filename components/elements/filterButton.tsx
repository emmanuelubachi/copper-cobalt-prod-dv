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
import { Filter } from "lucide-react";

type FilterButtonProps = {
  content: ReactNode;
  label: string;
  type: "tooltip" | "button";
  tooltip?: string;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  size?: "sm" | "default" | "lg" | "icon" | null | undefined;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  content,
  label,
  type,
  tooltip,
  className,
  variant = "default",
  size = "default",
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
              variant={variant}
              size={size}
              className={cn(
                className,
                "__button_pressed __button_shadow gap-2 rounded-lg",
              )}
              onClick={handleClick}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden text-pxs sm:inline sm:text-sm">
                {label}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant="outline"
      className="__muted __button_shadow __button_pressed gap-2 rounded-lg px-4"
      onClick={handleClick}
    >
      <span className="text-pxs sm:text-sm">{label}</span>
    </Button>
  );
};

export default FilterButton;
