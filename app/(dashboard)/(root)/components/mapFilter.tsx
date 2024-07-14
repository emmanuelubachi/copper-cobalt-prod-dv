"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArtisanalSites, IndustralProjects } from "./MiningActivities";
import { ProcessingEntities } from "./AdditionalInformation";

type MapFilterProps = {
  defaultValue: "mining-activities" | "additional-information";
};

export default function MapFilter({ defaultValue }: MapFilterProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="mining-activities" className="text-pxs lg:text-sm">
          Mining Activities
        </TabsTrigger>

        <TabsTrigger
          value="additional-information"
          className="text-pxs lg:text-sm"
        >
          Additional Information
        </TabsTrigger>
      </TabsList>
      <TabsContent value="mining-activities" className="grid gap-8 px-2 py-4">
        <div>
          <h6 className="text-h6 font-bold">Mining Activities</h6>
          <p className="text-xs italic text-foreground/40">
            Beatae quia excepturi dignissimos autem natus inventore quas amet
            praesentium earum iste, perspiciatis dolores, ea ipsam.
          </p>
        </div>
        <ArtisanalSites />
        <IndustralProjects />
      </TabsContent>
      <TabsContent value="additional-information" className="px-2 text-sm">
        <ProcessingEntities />
      </TabsContent>
    </Tabs>
  );
}
