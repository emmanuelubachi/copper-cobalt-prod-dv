"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MapFilterProps = {
  defaultValue: "mining-activities" | "additional-information";
};

export default function MapFilter({ defaultValue }: MapFilterProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="mining-activities" className="text-xs sm:text-sm">
          Mining Activities
        </TabsTrigger>

        <TabsTrigger
          value="additional-information"
          className="text-xs sm:text-sm"
        >
          Additional Information
        </TabsTrigger>
      </TabsList>
      <TabsContent value="mining-activities" className="px-2 text-sm">
        Mining activities filter content will go here.
      </TabsContent>
      <TabsContent value="additional-information" className="px-2 text-sm">
        Additional information filter content will go here.
      </TabsContent>
    </Tabs>
  );
}
