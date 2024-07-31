import React from "react";
import { Button } from "@/components/ui/button";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import { Toggle } from "@/components/ui/toggle";
import { Map } from "lucide-react";

export function ProcessingEntities() {
  const { isProcessingEntiteMarkerVisible, toggleProcessingEntiteMarkers } =
    useMarkerVisibilityStore();
  return (
    <div className="flex items-center justify-between gap-4 rounded-r-lg border-l-4 border-green-500 bg-muted px-4 py-3 transition-colors duration-300">
      <div>
        <h6 className="text-xs font-medium">Processing Entities</h6>
      </div>
      <div className="flex gap-2">
        <Toggle
          pressed={isProcessingEntiteMarkerVisible}
          onPressedChange={toggleProcessingEntiteMarkers}
          className={`group relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
            isProcessingEntiteMarkerVisible
              ? "hover:bg-cyan-500 data-[state=on]:bg-cyan-500"
              : "bg-neutral-400/50 hover:bg-neutral-400 dark:bg-transparent dark:ring-1 dark:ring-neutral-400/50 dark:hover:bg-neutral-400/40"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 group-hover:scale-125 ${
              isProcessingEntiteMarkerVisible
                ? "translate-x-2 dark:bg-black"
                : "-translate-x-2"
            }`}
          />
        </Toggle>
      </div>
    </div>
  );
}

export function InternationalRoutes() {
  const { isInternationalRouteVisible, toggleInternationalRoute } =
    useMarkerVisibilityStore();
  return (
    <div className="flex items-center justify-between gap-4 rounded-r-lg border-l-4 border-blue-500 bg-muted px-4 py-3 transition-colors duration-300">
      <div>
        <h6 className="text-xs font-medium">International Routes</h6>
      </div>
      <div className="flex gap-2">
        <Toggle
          pressed={isInternationalRouteVisible}
          onPressedChange={toggleInternationalRoute}
          className={`group relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
            isInternationalRouteVisible
              ? "hover:bg-cyan-500 data-[state=on]:bg-cyan-500"
              : "bg-neutral-400/50 hover:bg-neutral-400 dark:bg-transparent dark:ring-1 dark:ring-neutral-400/50 dark:hover:bg-neutral-400/40"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 group-hover:scale-125 ${
              isInternationalRouteVisible
                ? "translate-x-2 dark:bg-black"
                : "-translate-x-2"
            }`}
          />
        </Toggle>
      </div>
    </div>
  );
}

export function BorderPosts() {
  const { isBorderPostVisible, toggleBorderPost } = useMarkerVisibilityStore();
  return (
    <div className="flex items-center justify-between gap-4 rounded-r-lg border-l-4 border-orange-500 bg-muted px-4 py-3 transition-colors duration-300">
      <div>
        <h6 className="text-xs font-medium">Boreder Posts</h6>
      </div>
      <div className="flex gap-2">
        <Toggle
          pressed={isBorderPostVisible}
          onPressedChange={toggleBorderPost}
          className={`group relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
            isBorderPostVisible
              ? "hover:bg-cyan-500 data-[state=on]:bg-cyan-500"
              : "bg-neutral-400/50 hover:bg-neutral-400 dark:bg-transparent dark:ring-1 dark:ring-neutral-400/50 dark:hover:bg-neutral-400/40"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 group-hover:scale-125 ${
              isBorderPostVisible
                ? "translate-x-2 dark:bg-black"
                : "-translate-x-2"
            }`}
          />
        </Toggle>
      </div>
    </div>
  );
}

export function ExportPorts() {
  const { isExportPortVisible, toggleExportPort } = useMarkerVisibilityStore();
  return (
    <div className="flex items-center justify-between gap-4 rounded-r-lg border-l-4 border-yellow-500 bg-muted px-4 py-3 transition-colors duration-300">
      <div>
        <h6 className="text-xs font-medium">Export Ports</h6>
      </div>
      <div className="flex gap-2">
        <Toggle
          pressed={isExportPortVisible}
          onPressedChange={toggleExportPort}
          className={`group relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
            isExportPortVisible
              ? "hover:bg-cyan-500 data-[state=on]:bg-cyan-500"
              : "bg-neutral-400/50 hover:bg-neutral-400 dark:bg-transparent dark:ring-1 dark:ring-neutral-400/50 dark:hover:bg-neutral-400/40"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 group-hover:scale-125 ${
              isExportPortVisible
                ? "translate-x-2 dark:bg-black"
                : "-translate-x-2"
            }`}
          />
        </Toggle>
      </div>
    </div>
  );
}
