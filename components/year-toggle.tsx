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
    <ToggleGroup
      type="single"
      unselectable="off"
      size={"sm"}
      defaultValue={defaultValue}
      onValueChange={(value) => {
        if (value) onChangeFunction(value);
      }}
      className="gap-2 rounded-md p-1"
    >
      {years.map((year) => (
        <ToggleGroupItem
          key={year}
          value={year}
          aria-label={`Toggle year ${year}`}
          className="__button_pressed bg-accent px-3 text-foreground/80 ring-1 ring-neutral-200 data-[state=on]:bg-neutral-200 data-[state=on]:font-black data-[state=on]:text-foreground dark:bg-background/15 dark:ring-0 dark:data-[state=on]:bg-background"
        >
          {year}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
