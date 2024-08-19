import React from "react";
import { SingleInteractiveBarChart } from "@/components/charts/shadcn/bar-chart/interactive-bar-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const coXhistoryChartConfig = {
  views: {
    label: "Quantity",
  },
  quantity: {
    label: "Quantity",
    color: "hsl(var(--chart-6))",
  },
};

const cuXhistoryChartConfig = {
  views: {
    label: "Quantity",
  },
  quantity: {
    label: "Quantity",
    color: "hsl(var(--chart-5))",
  },
};

export default function ProductionExports({
  selectedYear,
  coXhistory,
  cuXhistory,
}: any) {
  return (
    <Tabs defaultValue="cobalt">
      <TabsList className="rounded-md bg-muted">
        <TabsTrigger
          value="cobalt"
          className="__button_pressed rounded-md bg-muted text-foreground/70 ring-neutral-200 data-[state=active]:font-semibold"
        >
          Cobalt
        </TabsTrigger>
        <TabsTrigger
          value="copper"
          className="__button_pressed rounded-md bg-muted text-foreground/70 ring-neutral-200 data-[state=active]:font-semibold"
        >
          {" "}
          Copper
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cobalt">
        <SingleInteractiveBarChart
          title="Exports of Cobalt by Projects"
          description={`${selectedYear} Production Quantity(T)`}
          config={coXhistoryChartConfig}
          chartData={coXhistory}
          xdataKey="exporter"
          ydataKey="quantity"
        />
      </TabsContent>
      <TabsContent value="copper">
        <SingleInteractiveBarChart
          title="Exports of Copper by Projects"
          description={`${selectedYear} Production Quantity(T)`}
          config={cuXhistoryChartConfig}
          chartData={cuXhistory}
          xdataKey="exporter"
          ydataKey="quantity"
        />
      </TabsContent>
    </Tabs>
  );
}
