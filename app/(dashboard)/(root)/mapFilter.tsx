"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import { Toggle } from "@/components/ui/toggle";

type MapFilterProps = {
  defaultValue: "mining-activities" | "additional-information";
};

export default function MapFilter({ defaultValue }: MapFilterProps) {
  const {
    showActiveMarkers,
    showInactiveMarkers,
    toggleActiveMarkers,
    toggleInactiveMarkers,
  } = useMarkerVisibilityStore();

  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="mining-activities" className="text-xs lg:text-sm">
          Mining Activities
        </TabsTrigger>

        <TabsTrigger
          value="additional-information"
          className="text-xs lg:text-sm"
        >
          Additional Information
        </TabsTrigger>
      </TabsList>
      <TabsContent value="mining-activities" className="grid gap-8 px-2 py-4">
        {/* Artisanal Mining Activities */}
        <div className="flex flex-col gap-4">
          <div>
            <h6 className="text-h6">Artisanal Mining Activities</h6>
            <p className="text-xs italic text-foreground/40">
              Beatae quia excepturi dignissimos autem natus inventore quas amet
              praesentium earum iste, perspiciatis dolores, ea ipsam.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={toggleActiveMarkers}
              className={`w-full rounded px-4 py-2 ${
                showActiveMarkers
                  ? "bg-cyan-500 hover:bg-cyan-500/90 dark:bg-cyan-600 dark:hover:bg-cyan-600/80"
                  : "bg-accent text-cyan-500 ring-1 ring-cyan-500 hover:bg-accent hover:ring-2"
              }`}
            >
              Active Sites
            </Button>

            <Button
              onClick={toggleInactiveMarkers}
              className={`w-full rounded px-4 py-2 ${
                showInactiveMarkers
                  ? "bg-neutral-500 hover:bg-neutral-500/90 dark:bg-neutral-400 dark:hover:bg-neutral-400/80"
                  : "bg-accent text-foreground ring-1 ring-neutral-500 hover:bg-accent hover:ring-2"
              }`}
            >
              Inactive Sites
            </Button>
          </div>
        </div>

        {/* Processing Entities */}
        <div className="flex flex-col gap-4">
          <div>
            <h6 className="text-h6">Processing Entities</h6>
            <p className="text-xs italic text-foreground/40">
              Autem natus inventore quas amet praesentium earum iste,
              perspiciatis dolores, ea ipsam.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              // onClick={}
              className={`w-full rounded px-4 py-2 ${
                showActiveMarkers
                  ? "bg-green-500 hover:bg-green-500/90 dark:bg-green-600 dark:hover:bg-green-600/80"
                  : "bg-accent text-green-500 ring-1 ring-green-500 hover:bg-accent hover:ring-2"
              }`}
            >
              Processing Entities
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="additional-information" className="px-2 text-sm">
        Additional information filter content will go here.
      </TabsContent>
    </Tabs>
  );
}
