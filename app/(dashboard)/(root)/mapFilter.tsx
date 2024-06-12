"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MapFilter() {
  return (
    <Tabs defaultValue="mining-activities" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="mining-activities">Mining Activities</TabsTrigger>
        <TabsTrigger value="additional-information">
          Additional Information
        </TabsTrigger>
      </TabsList>
      <TabsContent value="mining-activities" className="px-2">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="additional-information" className="px-2">
        Change your password here.
      </TabsContent>
    </Tabs>
  );
}
