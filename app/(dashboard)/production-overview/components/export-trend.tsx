import { Card } from "@/components/ui/card";
import { LegendAreaChart } from "@/components/charts/shadcn/area-chart/legend-area-chart";
import { exportTrendChartConfig } from "@/constants/chart";

export default function ExportTrend({
  exportQuantityData,
  exportTransactionData,
}: any) {
  return (
    <section className="space-y-4">
      <Card className="__card">
        <LegendAreaChart
          title="Export Trend"
          description="Total quantity of exported products."
          config={exportTrendChartConfig}
          chartData={exportQuantityData}
          xAxisDataKey="date"
          firstDataKey="Cobalt"
          secondDataKey="Copper"
          formatter="quantityFormatter"
        />

        <LegendAreaChart
          title="Export Trend"
          description="Total quantity of exported products."
          config={exportTrendChartConfig}
          chartData={exportTransactionData}
          xAxisDataKey="date"
          firstDataKey="Cobalt"
          secondDataKey="Copper"
          formatter="quantityFormatter"
        />
      </Card>
    </section>
  );
}
