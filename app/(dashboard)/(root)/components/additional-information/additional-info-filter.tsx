import React from "react";
import { Button } from "@/components/ui/button";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";

export function ProcessingEntities() {
  const { isProcessingEntiteMarkerVisible, toggleProcessingEntiteMarkers } =
    useMarkerVisibilityStore();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h6 className="text-p font-semibold">Processing Entities</h6>
        <p className="text-xs italic text-foreground/40">
          Autem natus inventore quas amet praesentium earum iste, perspiciatis
          dolores, ea ipsam.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={toggleProcessingEntiteMarkers}
          className={`__button_pressed w-full rounded-full px-4 py-2 ${
            isProcessingEntiteMarkerVisible
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

export function InternationalRoutes() {
  const { isInternationalRouteVisible, toggleInternationalRoute } =
    useMarkerVisibilityStore();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h6 className="text-p font-semibold">International Routes</h6>
        <p className="text-xs italic text-foreground/40">
          Autem natus inventore quas amet praesentium earum iste, perspiciatis
          dolores, ea ipsam.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={toggleInternationalRoute}
          className={`__button_pressed w-full rounded-full px-4 py-2 ${
            isInternationalRouteVisible
              ? "bg-blue-500/80 hover:bg-blue-500/90 dark:bg-blue-600 dark:hover:bg-blue-600/90"
              : "bg-accent text-blue-500 ring-2 ring-blue-500 hover:bg-accent hover:ring-blue-500/90"
          }`}
        >
          International Routes
        </Button>
      </div>
    </div>
  );
}

export function BorderPosts() {
  const { isBorderPostVisible, toggleBorderPost } = useMarkerVisibilityStore();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h6 className="text-p font-semibold">Boreder Posts</h6>
        <p className="text-xs italic text-foreground/40">
          Autem natus inventore quas amet praesentium earum iste, perspiciatis
          dolores, ea ipsam.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={toggleBorderPost}
          className={`__button_pressed w-full rounded-full px-4 py-2 ${
            isBorderPostVisible
              ? "bg-orange-500/80 hover:bg-orange-500/90 dark:bg-orange-600 dark:hover:bg-orange-600/90"
              : "bg-accent text-orange-500 ring-2 ring-orange-500 hover:bg-accent hover:ring-orange-500/90"
          }`}
        >
          Border Posts
        </Button>
      </div>
    </div>
  );
}

export function ExportPorts() {
  const { isExportPortVisible, toggleExportPort } = useMarkerVisibilityStore();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h6 className="text-p font-semibold">Export Ports</h6>
        <p className="text-xs italic text-foreground/40">
          Autem natus inventore quas amet praesentium earum iste, perspiciatis
          dolores, ea ipsam.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={toggleExportPort}
          className={`__button_pressed w-full rounded-full px-4 py-2 ${
            isExportPortVisible
              ? "bg-orange-500/80 hover:bg-orange-500/90 dark:bg-orange-600 dark:hover:bg-orange-600/90"
              : "bg-accent text-orange-500 ring-2 ring-orange-500 hover:bg-accent hover:ring-orange-500/90"
          }`}
        >
          Export Ports
        </Button>
      </div>
    </div>
  );
}
