import React from "react";
import { Button } from "@/components/ui/button";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import ProjectTree from "./ProjectTree";

export function ArtisanalMiningActivities() {
  const {
    showActiveSiteMarkers,
    showInactiveSiteMarkers,
    toggleActiveSiteMarkers,
    toggleInactiveSiteMarkers,
  } = useMarkerVisibilityStore();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h6 className="text-h6">Artisanal Mining Activities</h6>
        <p className="text-xs italic text-foreground/40">
          Beatae quia excepturi dignissimos autem natus inventore quas amet
          praesentium earum iste, perspiciatis dolores, ea ipsam.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={toggleActiveSiteMarkers}
          className={`__button_pressed w-full rounded-full px-4 py-2 ${
            showActiveSiteMarkers
              ? "bg-cyan-500/80 hover:bg-cyan-500/90 dark:bg-cyan-600 dark:hover:bg-cyan-600/90"
              : "bg-accent text-cyan-500 ring-2 ring-cyan-500 hover:bg-accent hover:ring-cyan-500/90"
          }`}
        >
          Active Sites
        </Button>

        <Button
          onClick={toggleInactiveSiteMarkers}
          className={`__button_pressed w-full rounded-full px-4 py-2 ${
            showInactiveSiteMarkers
              ? "bg-neutral-500/80 hover:bg-neutral-500/90 dark:bg-neutral-400 dark:hover:bg-neutral-400/90"
              : "bg-accent text-foreground ring-2 ring-neutral-500 hover:bg-accent hover:ring-neutral-500/90"
          }`}
        >
          Inactive Sites
        </Button>
      </div>
    </div>
  );
}

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

export function IndustralProjects() {
  return (
    <div className="flex flex-col gap-4">
      Industral Projects
      <ProjectTree />
    </div>
  );
}
