import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

/**
 * A toggle group that allows the user to select between two products: Cobalt or Copper.
 *
 * @param {{ defaultValue: string, onValueChange: (value: string) => void }} props
 * @param {string} props.defaultValue - The default value of the toggle group.
 * @param {(value: string) => void} props.onValueChange - The callback function called when the value of the toggle group changes.
 * @returns {JSX.Element}
 */
export default function ProductToggle({
  defaultValue,
  onValueChange,
}: {
  defaultValue: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      unselectable="off"
      size={"sm"}
      defaultValue={defaultValue}
      onValueChange={(value) => {
        if (value) onValueChange(value);
      }}
      className="gap-0"
    >
      <ToggleGroupItem
        value={"Cobalt"}
        aria-label={`Toggle product Cobalt`}
        className="__button_pressed rounded-none rounded-l-md bg-background px-3 text-xs text-foreground/70 shadow-md transition-all duration-300 data-[state=on]:bg-chart6/20 data-[state=on]:font-black data-[state=on]:text-chart6 hover:bg-chart6/10 hover:text-foreground/90 data-[state=on]:hover:text-chart6 dark:bg-background/15 dark:data-[state=on]:bg-chart6/10 dark:data-[state=on]:text-blue-400 dark:data-[state=off]:hover:bg-muted"
      >
        {"Cobalt"}
      </ToggleGroupItem>
      <ToggleGroupItem
        value={"Copper"}
        aria-label={`Toggle product Copper`}
        className="__button_pressed rounded-none rounded-r-md bg-background px-3 text-xs text-foreground/70 shadow-md transition-all duration-300 data-[state=on]:bg-chart5/30 data-[state=on]:font-black data-[state=on]:text-orange-600 hover:bg-chart5/20 hover:text-foreground/90 data-[state=on]:hover:text-orange-600 dark:bg-background/15 dark:data-[state=on]:bg-chart5/10 dark:data-[state=on]:text-orange-400 dark:data-[state=off]:hover:bg-muted"
      >
        {"Copper"}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
