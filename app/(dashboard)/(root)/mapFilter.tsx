"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MapFilterProps = {
  defaultValue: "mining-activities" | "additional-information";
};

export default function MapFilter({ defaultValue }: MapFilterProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="mining-activities">Mining Activities</TabsTrigger>
        <TabsTrigger value="additional-information">
          Additional Information
        </TabsTrigger>
      </TabsList>
      <TabsContent value="mining-activities" className="px-2">
        Mining activities filter content will go here.
      </TabsContent>
      <TabsContent value="additional-information" className="px-2">
        Additional information filter content will go here.
      </TabsContent>
    </Tabs>
  );
}
