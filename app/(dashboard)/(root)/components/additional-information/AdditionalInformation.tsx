import React from "react";
import { Button } from "@/components/ui/button";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";

export function ProcessingEntities() {
  const { showProcessingEntiteMarkers, toggleProcessingEntiteMarkers } =
    useMarkerVisibilityStore();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h6 className="text-h6">Processing Entities</h6>
        <p className="text-xs italic text-foreground/40">
          Autem natus inventore quas amet praesentium earum iste, perspiciatis
          dolores, ea ipsam.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={toggleProcessingEntiteMarkers}
          className={`__button_pressed w-full rounded-full px-4 py-2 ${
            showProcessingEntiteMarkers
              ? "bg-green-500/80 hover:bg-green-500/90 dark:bg-green-600 dark:hover:bg-green-600/90"
              : "bg-accent text-green-500 ring-2 ring-green-500 hover:bg-accent hover:ring-green-500/90"
          }`}
        >
          Processing Entities
        </Button>
      </div>
    </div>
  );
}
