"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArtisanalSites,
  IndustralProjects,
} from "./mining-activites/mining-activities-filter";
import { ProcessingEntities } from "./additional-information/AdditionalInformation";

type MapFilterProps = {
  defaultValue: "mining-activities" | "additional-information";
};

export default function MapFilter({ defaultValue }: MapFilterProps) {
  return (
    <Tabs
      defaultValue={defaultValue}
      className="sm:80 w-72 overflow-hidden pb-16 xl:w-96"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="mining-activities" className="text-pxs lg:text-xs">
          Mining Activities
        </TabsTrigger>

        <TabsTrigger
          value="additional-information"
          className="text-pxs lg:text-xs"
        >
          Additional Information
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="mining-activities"
        className="mt-5 h-full gap-8 space-y-8 overflow-y-auto px-2 pb-5"
      >
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
