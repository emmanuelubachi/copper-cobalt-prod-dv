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
      className="rounded-md bg-accent p-1"
    >
      {years.map((year) => (
        <ToggleGroupItem
          key={year}
          value={year}
          aria-label={`Toggle year ${year}`}
          className="data-[state=on]:bg-background"
        >
          {year}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
