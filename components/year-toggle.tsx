import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { cn } from "@/lib/utils";

type YearToggleProps = {
  defaultValue: string;
  onChangeFunction: (value: string) => void;
  years: string[];
  className?: string;
};

export default function YearToggle({
  defaultValue,
  onChangeFunction,
  years,
  className,
}: YearToggleProps) {
  return (
    <div className="flex w-full items-center justify-end gap-2">
      {/* <h3 className="text-pxs text-foreground/70">Year:</h3> */}
      <ToggleGroup
        type="single"
        unselectable="off"
        size={"sm"}
        defaultValue={defaultValue}
        onValueChange={(value) => {
          if (value) onChangeFunction(value);
        }}
        className={cn("__button_shadow gap-1 rounded-lg bg-muted p-1", {
          className,
        })}
      >
        {years.map((year) => (
          <ToggleGroupItem
            key={year}
            value={year}
            size="sm"
            aria-label={`Toggle year ${year}`}
            className="__button_pressed rounded-md bg-transparent px-2 py-0 text-xs text-foreground/70 data-[state=on]:bg-primary data-[state=on]:font-black data-[state=on]:text-white data-[state=on]:ring-1 data-[state=on]:ring-neutral-200 hover:data-[state=on]:bg-primary data-[state=off]:hover:text-primary data-[state=on]:hover:text-white dark:bg-muted/80 dark:ring-0 dark:data-[state=on]:bg-background data-[state=off]:dark:hover:text-foreground"
          >
            {year}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
