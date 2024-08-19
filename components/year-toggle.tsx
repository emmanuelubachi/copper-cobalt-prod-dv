import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

type YearToggleProps = {
  defaultValue: string;
  onChangeFunction: (value: string) => void;
  years: string[];
};

export default function YearToggle({
  defaultValue,
  onChangeFunction,
  years,
}: YearToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <h3 className="text-pxs text-foreground/70">Year:</h3>
      <ToggleGroup
        type="single"
        unselectable="off"
        size={"sm"}
        defaultValue={defaultValue}
        onValueChange={(value) => {
          if (value) onChangeFunction(value);
        }}
        className="gap-2 rounded-md bg-muted p-1"
      >
        {years.map((year) => (
          <ToggleGroupItem
            key={year}
            value={year}
            aria-label={`Toggle year ${year}`}
            className="__button_pressed rounded-md bg-neutral-100 px-3 text-foreground/80 ring-neutral-200 data-[state=on]:bg-white data-[state=on]:font-black data-[state=on]:text-foreground data-[state=on]:ring-1 dark:bg-muted/80 dark:ring-0 dark:data-[state=on]:bg-background"
          >
            {year}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
